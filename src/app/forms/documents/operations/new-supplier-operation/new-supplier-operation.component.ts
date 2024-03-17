import {Component, Inject, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {SubType} from '../../../../model/api/administration/sub-type';
import {CostCenter} from '../../../../model/api/administration/cost-center';
import {Employee} from '../../../../model/api/administration/employee';
import {InvState} from '../../../../model/api/inventory/inv-state';
import {Room} from '../../../../model/api/administration/room';
import {Department} from '../../../../model/api/administration/department';
import {AssetHttpService} from '../../../../services/http/assets/asset.http.service';
import {DocumentHttpService} from '../../../../services/http/documents/document.http.service';
import {DocumentTypeHttpService} from '../../../../services/http/documents/document-type.http.service';
import {SubTypeHttpService} from '../../../../services/http/administration/sub-type.http.service';
import {NotificationService} from '../../../../services/notification.service';
import {AppData} from '../../../../app-data';
import {DocumentUpload} from '../../../../model/api/documents/document-upload';

@Component({
  selector: 'app-new-supplier-operation',
  templateUrl: './new-supplier-operation.component.html',
  styleUrls: ['./new-supplier-operation.component.scss']
})
export class NewSupplierOperationComponent {

  private get isAdmin(): boolean { return AppData.UserIsAdmin; }

  public get getEmployee() { return this.form.get('employee')?.value }
  public get getLocation() { return this.form.get('location')?.value }
  public get getCostCenter() { return this.form.get('costCenter')?.value }
  public get getInvState() { return this.form.get('invState')?.value }
  public get getDepartment() { return this.form.get('department')?.value }
  public get operationTypes(): any | undefined { return this._operationTypes; }
  public set operationTypes(value: any | undefined) {
    this._operationTypes = value;
  }
  public get transportType(): any | undefined { return this._transportType; }
  public set transportType(value: any | undefined) {
    this._transportType = value;
  }
  // @ViewChild('assetsList') set setCommitteeMemberList(assetsList: BackAssetsMatTable) {
  //   this.assetsList = assetsList;
  //   this.refreshAssetsList();
  // }

  constructor (
    private fb: FormBuilder,
    public dialog: MatDialog,
    public dataSource: AssetHttpService,
    private documentsProvider: DocumentHttpService,
    private documentTypesProvider: DocumentTypeHttpService,
    private subTypeProvider: SubTypeHttpService,
    protected notificationSvc: NotificationService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.createForm();

    this.selectedAssets = data.selectedItems;
    // @ts-ignore
    this.selectedItems.push(data.selectedItems);
    this.tableData = this.selectedItems;
  }

  public form!: FormGroup;
  public item!: DocumentUpload | null;
  // public operationUpload!: OperationUpload | null;
  public documentTypes: any | undefined;

  public isSaved: boolean = true;
  public documentSaved: boolean = false;
  public documentDate: Date | undefined;
  public registerDate: Date | undefined;
  public documentInfo: string = '';
  public serialNumber: string = '';
  private documentId = 0;


  private selectedValue: number = 0;
  public selectedAssets: any;
  protected operationType: number = OperationType.NotSet;

  sumOfQuantity: number = 0;
  roomIdIni = 0;

  private selectedDocumentType: DocumentType | null = null;
  private selectedAssetMFs: [] = [];
  public subTypes: Array<SubType> = new Array<SubType>();

  private costCenterListSelectedItem: CostCenter | null = null;
  private employeeListSelectedItem: Employee | null = null;
  private invStateListSelectedItem: InvState | null = null;
  private roomListSelectedItem: Room | null = null;
  private departmentListSelectedItem: Department | null = null;

  public enableAdministration: boolean = false;
  public requireAdministration: boolean = false;
  public enableAssetAccState: boolean = false;
  public requireAssetAccState: boolean = false;
  public enableAssetCategory: boolean = false;
  public requireAssetCategory: boolean = false;
  public enableCostCenter: boolean = false;
  public requireCostCenter: boolean = false;
  public enableDepartment: boolean = false;
  public requireDepartment: boolean = false;
  public enableEmployee: boolean = false;
  public requireEmployee: boolean = false;
  public enableInvState: boolean = false;
  public requireInvState: boolean = false;
  public enableRoom: boolean = false;
  public requireRoom: boolean = false;
  public enableValue: boolean = false;
  public requireValue: boolean = false;
  public validData: boolean = false;

  public selectedItems: [] = [];
  public tableData: any;
  displayedColumns: string[] = ['company', 'erp_code', 'asset', 'description', 'brand', 'model'];

  private _operationTypes: any | undefined;

  private _transportType: any | undefined;

  // public assetsList!: BackAssetsMatTable;

  public onOperationTypesChange(documentTypes: DocumentType) {
    // this.operationTypes = event;
    this.isSaved = true;
    this.selectedDocumentType = (documentTypes != null) ? documentTypes : null;
    this.updateRequiredData(this.selectedDocumentType!);
  }

  public onTransportTypesChange(event: string) {
    this.transportType = event;
    // tslint:disable-next-line:no-non-null-assertion
    this.updateRequiredData(this.selectedDocumentType!);
  }

  ngOnInit(): void {
    this.getAsset();
    this.getDocumentTypes();
    this.watchForInputsChange();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.addItem();
    }, 0);
  }

  public refreshAssetsList() {
    // let params: Array<Param> = new Array<Param>();
    //
    // this.assetsList.refresh(params);
    // this.assetsList.refreshItems();
  }

  private watchForInputsChange() {
    // this.form.controls['location'].valueChanges.subscribe(change => {
    //   if (this.selectedAssets.length > 0) {
    //     // @ts-ignore
    //     this.subTypeProvider.subtypesGET2(this.selectedAssets[0].subType.id).subscribe( (subType: SubType) => {
    //       // @ts-ignore
    //       this.subTypeProvider.getCountByRoom(this.selectedAssets[0].room.id,  this.selectedAssets[0]?.subType?.id!).subscribe( (res) => {
    //         // @ts-ignore
    //         const result = this.subTypes.filter(item => item.id === this.selectedAssets[0].subType?.id)[0];
    //         if (result == undefined) {
    //           // subType.assetCount = res;
    //           // @ts-ignore
    //           this.roomIdIni = this.selectedAssets[0].room.id;
    //           this.subTypes.push(subType);
    //         }
    //       })
    //     })
    //   }
    //
    //   this.enableDepartment = this.getLocation.length > 0 && (this.getLocation[0].id === 2961 || this.getLocation[0].id === 2962);
    // });
  }

  public addItem() {
    this.item = new DocumentUpload();
    this.item.id = 0;
    this.form.patchValue(this.item);
  }

  public getAsset() {
    // this.dataSource.detailGET(this.asset?.id!, undefined).subscribe((item: any) => {
    //   this.item = item
    // });
  }

  public getDocumentTypes() {
    // this.documentTypesProvider.filtered4('ASSET').subscribe((item: any) => {
    //   if (item) {
    //     this.documentTypes = item;
    //   }
    // });
  }

  private createForm() {
    this.form = this.fb.group({
      employee: [null],
      location: [null],
      costCenter: [null],
      invState: [null],
      department: [null],


      documentTypeId: [null],
      docNo1: [null],
      docNo2: [null],
      documentDate: [null],
      registerDate: [null],
      validated: [null],
      details: [null],
      serialNumber: [null],
      transportType: [null],
      transportDoc: [null],
      transportPerson: [null],
      quantity: [null],
    });
  }

  private updateRequiredData(documentType: DocumentType) {
    // this.resetOptions();
    // if (documentType != null) {
    //   let maskParts: string[] = documentType.mask?.split(';')!;
    //
    //   maskParts.forEach((maskPart: string) => {
    //     if (!this.enableAdministration && maskPart.startsWith(AppConfig.DOCUMENTTYPE_MASK_ADMINISTRATION)) {
    //       this.enableAdministration = true;
    //       this.requireAdministration = maskPart.endsWith(AppConfig.DOCUMENTTYPE_MASK_REQUIRED);
    //     }
    //
    //     if (!this.enableAssetAccState && maskPart.startsWith(AppConfig.DOCUMENTTYPE_MASK_ASSETACCSTATE)) {
    //       this.enableAssetAccState = true;
    //       this.requireAssetAccState = maskPart.endsWith(AppConfig.DOCUMENTTYPE_MASK_REQUIRED);
    //     }
    //
    //     if (!this.enableAssetCategory && maskPart.startsWith(AppConfig.DOCUMENTTYPE_MASK_ASSETCATEGORY)) {
    //       this.enableAssetCategory = true;
    //       this.requireAssetCategory = maskPart.endsWith(AppConfig.DOCUMENTTYPE_MASK_REQUIRED);
    //     }
    //
    //     if (!this.enableCostCenter && maskPart.startsWith(AppConfig.DOCUMENTTYPE_MASK_COSTCENTER)) {
    //       this.enableCostCenter = true;
    //       this.requireCostCenter = maskPart.endsWith(AppConfig.DOCUMENTTYPE_MASK_REQUIRED);
    //     }
    //
    //     if (!this.enableDepartment && maskPart.startsWith(AppConfig.DOCUMENTTYPE_MASK_DEPARTMENT)) {
    //       this.enableDepartment = true;
    //       this.requireDepartment = maskPart.endsWith(AppConfig.DOCUMENTTYPE_MASK_REQUIRED);
    //     }
    //
    //     if (!this.enableEmployee && maskPart.startsWith(AppConfig.DOCUMENTTYPE_MASK_EMPLOYEE)) {
    //       this.enableEmployee = true;
    //       this.requireEmployee = maskPart.endsWith(AppConfig.DOCUMENTTYPE_MASK_REQUIRED);
    //     }
    //
    //     // if (!this.enableInvState && maskPart.startsWith(AppConfig.DOCUMENTTYPE_MASK_INVSTATE) && this.isAdmin) {
    //     if (!this.enableInvState && maskPart.startsWith(AppConfig.DOCUMENTTYPE_MASK_INVSTATE)) {
    //       this.enableInvState = true;
    //       this.requireInvState = maskPart.endsWith(AppConfig.DOCUMENTTYPE_MASK_REQUIRED);
    //     }
    //
    //     if (maskPart.startsWith(AppConfig.DOCUMENT_TYPE_VALIDATE) && !this.isAdmin) {
    //       this.enableInvState = false;
    //       this.isSaved = false;
    //     }
    //
    //     if (!this.enableRoom && maskPart.startsWith(AppConfig.DOCUMENTTYPE_MASK_ROOM)) {
    //       this.enableRoom = true;
    //       this.requireRoom = maskPart.endsWith(AppConfig.DOCUMENTTYPE_MASK_REQUIRED);
    //     }
    //
    //     if (!this.enableValue && maskPart.startsWith(AppConfig.DOCUMENTTYPE_MASK_VALUE)) {
    //       this.enableValue = true;
    //       this.requireValue = maskPart.endsWith(AppConfig.DOCUMENTTYPE_MASK_REQUIRED);
    //     }
    //
    //     if (!this.enableValue && maskPart.startsWith(AppConfig.DOCUMENTTYPE_MASK_ALL)) {
    //       this.enableEmployee = true;
    //       this.enableInvState = true;
    //       this.enableRoom = true;
    //       this.enableValue = true;
    //     }
    //   });
    // }
    //
    // this.updateValidData();
  }

  private updateValidData(): void {
    // this.validData = (this.selectedItems != null) && (this.selectedItems.length > 0) && (!this.documentSaved) && (this.selectedDocumentType != null) &&
    //   ((this.getCostCenter != null) || (this.getEmployee != null) || (this.getLocation != null) || (this.getInvState != null) || (this.selectedValue !== 0))
    //
    //   && ((!this.requireCostCenter) || ((this.requireCostCenter) && (this.getCostCenter != null)))
    //   && ((!this.requireEmployee) || ((this.requireEmployee) && (this.getEmployee != null)))
    //   && ((!this.requireInvState) || ((this.requireInvState) && (this.getInvState != null)))
    //   && ((!this.requireRoom) || ((this.requireRoom) && (this.getLocation != null)))
    //   && ((!this.requireDepartment) || ((this.requireDepartment) && (this.getDepartment != null)))
    //   && ((!this.requireValue) || ((this.requireValue) && (this.selectedValue !== 0)));
    //
    // if (!this.validData) this.validData = (this.validData || (this.operationTypes.code === AppConfig.DOCUMENT_TYPE_CASS)
    //   || (this.operationTypes.code === AppConfig.DOCUMENT_TYPE_VALIDATE)
    //   || (this.operationTypes.code === AppConfig.DOCUMENT_REACTIVATE_LABEL)
    //   || (this.operationTypes.code === AppConfig.DOCUMENT_TYPE_SELL));
    //
    // if (this.operationTypes.code === AppConfig.DOCUMENT_REACTIVATE_LABEL) {
    //   this.transportType = '-';
    // }
    //
    // this.validData = true;
  }

  public generateDocument(type: string, documentId: number) {
    this.documentId = documentId;
    window.open(`https://inventare.ro/faisreportingsuperbet/Report.aspx/?report=${type}&documentId=${this.documentId}`);
    this.router.navigate(['/operations/employee']);
  }

  private generateBook () {
    this.operationType = OperationType.Operation;
    this.onDocumentGenerate();
  }

  public onDocumentGenerate() {
    // let dialogRef = this.dialog.open(DocumentGeneratorSelectorComponent, {
    //   panelClass: 'center-middle-modal', disableClose: true, width: '600px', maxHeight: '90%', height: 'auto', position: { top: '10rem' },
    // });
    //
    // dialogRef.afterClosed().subscribe((item: string) => {
    //   /*this.selectedDocumentType = item;*/
    //   if (item) this.generateDocument(item, this.documentId);
    // });
  }

  private resetOptions() {
    this.enableAdministration = false;
    this.enableAssetAccState = false;
    this.enableAssetCategory = false;
    this.enableCostCenter = false;
    this.enableDepartment = false;
    this.enableEmployee = false;
    this.enableInvState = false;
    this.enableRoom = false;
    this.enableValue = false;

    this.requireAdministration = false;
    this.requireAssetAccState = false;
    this.requireAssetCategory = false;
    this.requireCostCenter = false;
    this.requireDepartment = false;
    this.requireEmployee = false;
    this.requireInvState = false;
    this.requireRoom = false;
    this.requireValue = false;

    this.validData = false;
  }

  protected save() {
    // const formModel = this.form.value;
    //
    // this.isSaved = false;
    // let document: Document | null = null;
    // let operation: OperationUpload | null = null;
    // let operations: Array<OperationUpload> | null = null;
    // let documentUpload: DocumentUpload | null = null;
    // let employeeId: number | null = null;
    // let roomId: number | null = null;
    // let departmentId: number | null = null;
    // let costCenterId: number | null = null;
    // let invStateId: number | null = null;
    //
    // this.documentDate = new Date();
    // this.registerDate = new Date();
    //
    // document = new Document(0, this.selectedDocumentType?.id!, '', '', this.documentDate, this.registerDate, false, this.documentInfo, this.serialNumber);
    //
    // if (this.enableEmployee && this.getEmployee != null) employeeId = this.getEmployee.id;
    // if (this.enableInvState && this.getInvState != null) invStateId = this.getInvState.id;
    // if (this.enableRoom && this.getLocation != null) roomId = this.getLocation.id;
    // if (this.enableDepartment && this.getDepartment != null) departmentId = this.getDepartment.id;
    // if (this.enableCostCenter && this.getCostCenter != null) costCenterId = this.getCostCenter.id;
    // if (this.selectedDocumentType?.code === AppConfig.DOCUMENT_TYPE_CASS) invStateId = AppConfig.INVSTATE_CASS_ID;
    // if (this.selectedDocumentType?.code === AppConfig.DOCUMENT_TYPE_SELL) invStateId = AppConfig.INVSTATE_SELL_ID;
    //
    // operations = new Array<OperationUpload>();
    // this.selectedAssets.forEach((asset: any) => {
    //   console.log(asset)
    //   this.operationUpload = new OperationUpload();
    //   this.operationUpload.id = 0;
    //   this.operationUpload.assetId = asset['id'];
    //   this.operationUpload.administrationId = undefined;
    //   this.operationUpload.costCenterId = costCenterId!;
    //   this.operationUpload.employeeId = employeeId!;
    //   this.operationUpload.assetAccStateId = invStateId!;
    //   this.operationUpload.assetCategoryId = undefined;
    //   this.operationUpload.departmentId = departmentId!;
    //   this.operationUpload.subTypeId = undefined;
    //   this.operationUpload.roomId = roomId!;
    //   this.operationUpload.roomIdIni = this.roomIdIni;
    //   this.operationUpload.isDeleted = false;
    //   this.operationUpload.partnerId = undefined;
    //   this.operationUpload.subTypeRoomId = asset['id'];
    //   operations?.push(this.operationUpload);
    // });
    //
    // this.item = new DocumentUpload();
    // this.item.id = document.id;
    // this.item.documentTypeId = document.documentTypeId;
    // this.item.docNo1 = document.docNo1;
    // this.item.docNo2 = document.docNo2;
    // this.item.documentDate = document.documentDate;
    // this.item.registerDate = document.registerDate;
    // this.item.validated = document.validated;
    // this.item.details = document.details;
    // this.item.serialNumber = document.serialNumber;
    // this.item.transportType = this.transportType;
    // this.item.transportDoc = formModel.transportDoc;
    // this.item.transportPerson = formModel.transportPerson;
    // this.item.quantity = formModel.quantity;
    // this.item.parentAssetId! = this.assetsList.selectedItems.length > 0 ? this.assetsList.selectedItems[0].id : null;
    // this.item.operations = operations;
    //
    // switch (this.operationTypes.code) {
    //   case 'VALIDATEASSET':
    //     // @ts-ignore
    //     this.documentsProvider.validate(this.item!).toPromise().then((data: any) => {
    //       // this.isAdmin ? this.isSaved = true : this.isSaved = false;
    //       this.notificationSvc.success('Operatia a fost validata cu success!');
    //       setTimeout(() => {
    //         this.router.navigate(['/assetinvdetails']);
    //       }, 2000);
    //     }, (error: any) => {
    //       this.notificationSvc.error('Eroare server');
    //     });
    //     break;
    //
    //   case 'Reactivare':
    //     // @ts-ignore
    //     this.documentsProvider.reactivate(this.item!).toPromise().then((data) => {
    //       // this.isAdmin ? this.isSaved = true : this.isSaved = false;
    //       this.notificationSvc.success('Operatia a fost validata cu success!');
    //       setTimeout(() => {
    //         this.router.navigate(['/assetinvdetails']);
    //       }, 2000);
    //     }, (error) => {
    //       this.notificationSvc.error('Eroare server');
    //     });
    //     break;
    //
    //   default:
    //     // @ts-ignore
    //     this.documentsProvider.full(this.item!).toPromise().then((data: any) => {
    //       this.isSaved = true;
    //       this.documentId = data;
    //       this.generateBook();
    //       this.notificationSvc.error('Success');
    //     }, (error: any) => {
    //       this.notificationSvc.error('Eroare server');
    //     });
    //     break;
    // }
  }
}

enum OperationType {
  NotSet = 1,
  Operation = 2,
  Transfer = 3,
}

