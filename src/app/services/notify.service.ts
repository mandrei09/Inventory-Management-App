import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AssetResult } from "../model/api/result/asset-result";
import { CreateAssetSAPResult } from "../model/api/result/create-asset-SAP-result";
import { WFHResult } from "../model/api/result/wfh-result";
import { FileUploadProgress } from "../model/common/notify";
import { NotificationService } from "./notification.service";

@Injectable()
export class NotifyService {

    private createNewAsset = new Subject<CreateAssetSAPResult>();
    public createNewAsset$ = this.createNewAsset.asObservable();

    private retireNewAsset = new Subject<CreateAssetSAPResult>();
    public retireNewAsset$ = this.retireNewAsset.asObservable();

    private stornoNewAsset = new Subject<CreateAssetSAPResult>();
    public stornoNewAsset$ = this.stornoNewAsset.asObservable();

    private stornoNewAssetAcquisition = new Subject<CreateAssetSAPResult>();
    public stornoNewAssetAcquisition$ = this.stornoNewAssetAcquisition.asObservable();

    private transferNewAsset = new Subject<CreateAssetSAPResult>();
    public transferNewAsset$ = this.transferNewAsset.asObservable();

    private newAssetInvMinus = new Subject<CreateAssetSAPResult>();
    public newAssetInvMinus$ = this.newAssetInvMinus.asObservable();

    private newAssetInvPlus = new Subject<CreateAssetSAPResult>();
    public newAssetInvPlus$ = this.newAssetInvPlus.asObservable();

    private orderItemDelete = new Subject<AssetResult>();
    public orderItemDelete$ = this.orderItemDelete.asObservable();

    private editAsset = new Subject<CreateAssetSAPResult>();
    public editAsset$ = this.editAsset.asObservable();

    private createAssetSAP = new Subject<CreateAssetSAPResult>();
    public createAssetSAP$ = this.createAssetSAP.asObservable();

    private changeAssetSAP = new Subject<CreateAssetSAPResult>();
    public changeAssetSAP$ = this.changeAssetSAP.asObservable();

    private acquisitionAssetSAP = new Subject<CreateAssetSAPResult>();
    public acquisitionAssetSAP$ = this.acquisitionAssetSAP.asObservable();

    private wfhValidate = new Subject<WFHResult>();
    public wfhValidate$ = this.wfhValidate.asObservable();

    private fileUploadProgressUpdate = new Subject<FileUploadProgress>();
    public fileUploadProgressUpdate$ = this.fileUploadProgressUpdate.asObservable();

    constructor(public notification: NotificationService) {
    }

    public notifyDataCreateAssetAsync(result: CreateAssetSAPResult) {
        this.createNewAsset.next(result);
        // console.log('new asset created - notify service');
        this.notification.showInfo(result.errorMessage, 'Creare activ nou', 5000, false, 0);
    }

    public notifyDataRetireAssetAsync(result: CreateAssetSAPResult) {
        this.retireNewAsset.next(result);
        // onsole.log('new asset retire - notify service');
        this.notification.showInfo(result.errorMessage, 'Casare', 5000, false, 0);
    }

    public notifyDataStornoAssetAsync(result: CreateAssetSAPResult) {
        this.stornoNewAsset.next(result);
        // onsole.log('new asset retire - notify service');
        this.notification.showInfo(result.errorMessage, 'Stornare', 5000, false, 0);
    }

    public notifyDataStornoAssetAcquisitionAsync(result: CreateAssetSAPResult) {
        this.stornoNewAssetAcquisition.next(result);
        // onsole.log('new asset retire - notify service');
        this.notification.showInfo(result.errorMessage, 'Stornare', 5000, false, 0);
    }

    public notifyDataTransferAssetAsync(result: CreateAssetSAPResult) {
        this.transferNewAsset.next(result);
        // onsole.log('new asset retire - notify service');
        this.notification.showInfo(result.errorMessage, 'Transfer', 5000, false, 0);
    }

    public notifyDataAssetInvMinusAsync(result: CreateAssetSAPResult) {
        this.newAssetInvMinus.next(result);
        // onsole.log('new asset retire - notify service');
        this.notification.showInfo(result.errorMessage, 'Minus inventar', 5000, false, 0);
    }

    public notifyDataAssetInvPlusAsync(result: CreateAssetSAPResult) {
        this.newAssetInvPlus.next(result);
        // onsole.log('new asset retire - notify service');
        this.notification.showInfo(result.errorMessage, 'Plus inventar', 5000, false, 0);
    }

    public notifyDataOrderItemDeleteAsync(result: AssetResult) {
        this.orderItemDelete.next(result);
        this.notification.showInfo(result.errorMessage, 'Stergere produs comanda', 5000, false, 0);
    }

    public notifyDataEditAssetAsync(result: CreateAssetSAPResult) {
        this.editAsset.next(result);
        // console.log('new asset created - notify service');
        this.notification.showInfo(result.errorMessage, 'Actualizare date', 5000, false, 0);
    }

    public notifyDataCreateAssetSAPAsync(result: CreateAssetSAPResult) {
        this.createAssetSAP.next(result);
        // console.log('new asset created - notify service');
        this.notification.showInfo(result.errorMessage, 'SAP CREATE', 5000, false, 0);
    }

    public notifyDataChangeAssetSAPAsync(result: CreateAssetSAPResult) {
        this.changeAssetSAP.next(result);
        // console.log('new asset created - notify service');
        this.notification.showInfo(result.errorMessage, 'SAP CHANGE', 5000, false, 0);
    }

    public notifyDataAcquisitionAssetSAPAsync(result: CreateAssetSAPResult) {
      this.acquisitionAssetSAP.next(result);
      // console.log('new asset created - notify service');
      this.notification.showInfo(result.errorMessage, 'SAP ACQUISITION', 5000, false, 0);
  }

  public notifyDataWFHValidateAsync(result: WFHResult) {
    this.wfhValidate.next(result);
    // console.log('new asset created - notify service');
    this.notification.showInfo(result.employee, 'WFH', 5000, false, 0);
}

    public notifyFileUploadProgressUpdate(fileUploadProgress: FileUploadProgress) {
        this.fileUploadProgressUpdate.next(fileUploadProgress);
    }
}
