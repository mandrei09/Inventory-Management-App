import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssetInvFullDetail } from '../../model/api/assets/asset-inv-full-detail';
import { AssetInvTempDetail } from '../../model/api/assets/asset-inv-temp-detail-list';
import { AssetNi } from '../../model/api/assets/asset-ni';
import { DialogService } from '../../services/dialog.service';
import {AssetHttpService} from '../../services/http/assets/asset.http.service';
import {AssetTempRecoSave} from '../../model/api/assets/asset-temp-reco-save';
import {AssetNiTransferSave} from '../../model/api/assets/asset-ni-transfer-save';
import {Asset} from '../../model/api/assets/asset';
@Component({
  selector: 'app-confirm-reconciliation-modal',
  templateUrl: './confirm-reconciliation-modal.component.html',
  styleUrls: ['./confirm-reconciliation-modal.component.scss']
})

export class ConfirmReconciliationModalComponent implements OnInit {

  public item!: Asset;
  public tempAssetItem!: Asset;
  public inventoryId: number = 0;

  private selectedAsset: AssetInvFullDetail | null = null;
  private selectedAssetTemp: AssetInvTempDetail | null = null;
  private selectedAssetNi: AssetNi | null = null;

  public reportTypeCode: string = 'ALL';
  public operationType: number = OperationType.NotSet;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ConfirmReconciliationModalComponent>,
    public assetsTempProvider: AssetHttpService,
    public assetsProvider: AssetHttpService,
    public assetsNiProvider: AssetHttpService,
    private dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.inventoryId = this.data.inventoryId;
    this.item = data.asset;
    this.tempAssetItem = data.assetTemp;
    this.operationType = data.operationType;
  }

  ngOnInit(): void {

  }

  public onSave() {
    switch (this.operationType) {
      case OperationType.Reconciliation:
        this.reconcile();
        break;
      case OperationType.Transfer:
        this.transfer();
        break;
      case OperationType.CancelScanned:
        this.assetsProvider.deleteAssetOp(this.selectedAsset?.id!, this.inventoryId).subscribe((res: any) => { });
        // this.checkForRefresh();
        break;
      case OperationType.RecoverTemp:
        this.recoverTemp();
        // this.refreshNotIdentified();
        break;
      case OperationType.CancelTempScanned:
        this.assetsProvider.deleteAssetOp(this.tempAssetItem?.id!, this.inventoryId).subscribe((res: any) => { });
        // this.refreshNotIdentified();
        break;
      default:
        break;
    }

    this.operationType = OperationType.NotSet;
  }

  private reconcile(): void {
    let assetTempRecoSave: AssetTempRecoSave = new AssetTempRecoSave();

    assetTempRecoSave.inventoryId = this.inventoryId;
    assetTempRecoSave.assetTempId = this.tempAssetItem?.id;
    assetTempRecoSave.assetId = this.item?.id;

    // this.assetsProvider.proposalreco(assetTempRecoSave).subscribe(
    //   (data: any) => {
    //     this.notificationSvc.success('Propunere reconciliere finalizata cu success!');
    //     // if (queryParams.statusCode === 200) {
    //     //   this.notificationSvc.success('Propunere reconciliere finalizata cu success!');
    //     // } else {
    //     //   this.notificationSvc.error('Eroare propunere reconciliere!');
    //     // }
    //
    //     this.selectedAssetTemp = null;
    //     this.selectedAsset = null;
    //
    //     this.dialogRef.close();
    //     // this.checkForRefresh();
    //     // this.refreshNotIdentified();
    //   },
    //     (error: any) => {
    //       this.notificationSvc.error('Eroare server!');
    //     }
    // );
  }

  private transfer() {
    let assetNiTransferSave: AssetNiTransferSave = new AssetNiTransferSave();

    assetNiTransferSave.inventoryId = this.inventoryId;
    assetNiTransferSave.assetNiId = 0;

    // this.assetsNiProvider.transfer(assetNiTransferSave).subscribe(() => {
    //   this.selectedAssetNi = null;
    //   this.selectedAsset = null;
    //
    //   // this.checkForRefresh();
    //   // this.refreshNotIdentified();
    // });
  }

  private recoverTemp() {
    let inventoryId: number = this.inventoryId;
    // this.assetsProvider.recoverAssetTemp(this.assetInvFullDetailList.selectedItem.id, inventoryId).subscribe((res) => {
    //
    //   if (res.statusCode === 200) {
    //     this.notificationSvc.success('Reconciliere anulata cu success!');
    //   }else{
    //     this.notificationSvc.error('Eroare anulare reconciliere!');
    //   }
    // }, (error) => {
    //   this.notificationSvc.error('Eroare server!');
    // });
    // this.checkForRefresh();
  }
}

enum OperationType {
  NotSet = 1,
  Reconciliation = 2,
  Transfer = 3,
  CancelScanned = 4,
  RecoverTemp = 5,
  CancelTempScanned = 6
}
