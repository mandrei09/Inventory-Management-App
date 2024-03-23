import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AppData } from '../../../app-data';
import { DictionaryItem } from '../../../model/api/administration/dictionary-item';
import { AssetEmployeeEdit } from '../../../model/api/assets/asset-employee-edit';
import { AssetEmployeeSave } from '../../../model/api/assets/asset-employee-save';
import { Brand } from '../../../model/api/assets/brand';
import { Model } from '../../../model/api/assets/model';
import { ColumnDefinition } from '../../../model/common/column-definition';
import { PagedResult } from '../../../model/common/paged-result';
import { Param } from '../../../model/common/param';
import { TableDefinition } from '../../../model/common/table-definition';
import { AuthenticationService } from '../../../services/authentication.service';
import { DictionaryItemHttpService } from '../../../services/http/administration/dictionary-item.http.service';
import { EmployeeHttpService } from '../../../services/http/administration/employee.http.service';
import { AssetHttpService } from '../../../services/http/assets/asset.http.service';
import { BrandHttpService } from '../../../services/http/assets/brand.http.service';
import { ModelHttpService } from '../../../services/http/assets/model.http.service';
import { ColumnDefinitionHttpService } from '../../../services/http/common/column-definition.http.service';
import { ConfigValuesHttpService } from '../../../services/http/common/config-values.service';
import { DashboardHttpService } from '../../../services/http/common/dashboard.http.service';
import { TableDefinitionHttpService } from '../../../services/http/common/table-definition.http.service';
import { NotificationService } from '../../../services/notification.service';
import { DictionaryItemDetailComponent } from '../../administrations/dictionary-item/dictionary-item.detail';
import { DictionaryItemListComponent } from '../../administrations/dictionary-item/dictionary-item.list';
import { BrandList } from '../brands/brand.list';
import { ModelList } from '../models/model.list';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FileHttpService } from '../../../services/file.service';
import { AppConfig } from '../../../config';
import { WFHResult } from '../../../model/api/result/wfh-result';
import { MobilePhoneHttpService } from '../../../services/http/common/mobile-phone.http.service';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { AssetWFHListComponent } from './asset-wfh.list';
import { formatDate } from '@angular/common';
import { DialogService } from '../../../services/dialog.service';
import { Operation } from '../../../model/api/documents/operation';
import { DocumentUpload } from '../../../model/api/documents/document-upload';
import { Document } from '../../../model/api/documents/document';
import { DocumentHttpService } from '../../../services/http/documents/document.http.service';

@Component({
    selector: 'asset-employee-detail-ui',
    templateUrl: 'asset-employee.detail.ui.html',
    styleUrls: ['asset-employee.detail.ui.scss'],
    providers: [ AssetHttpService ]
})

export class AssetEmployeeDetailUIComponent implements OnInit, AfterViewInit  {

    public _dictionaryItem: DictionaryItem = null;
    public get dictionaryItem(): DictionaryItem { return this._dictionaryItem; }

    public set dictionaryItem(value: DictionaryItem) {
      this._dictionaryItem = value;
      if (value) {
        this.setSelectedDictionaryItem(value);
      }
    }

    public _brand: Brand = null;
    public get brand(): Brand { return this._brand; }

    public set brand(value: Brand) {
      this._brand = value;
      if (value) {
        this.setSelectedBrand(value);
      }
    }

    public _model: Model = null;
    public get model(): Model { return this._model; }
    
    public set model(value: Model) {
      this._model = value;
      if (value) {
        this.setSelectedModel(value);
      }
    }

    public get dictionaryItemParams(): Array<Param> {
      const params = new Array<Param>();
      params.push(new Param('showWFH', 'true'));

      // this.dictionaryItem = null;
      // this.name = '';

      return params;
    }

    public get brandParams(): Array<Param> {
      const params = new Array<Param>();
      params.push(new Param('dictionaryItemIds', this.selectedDictionaryItem ? this.selectedDictionaryItem.id.toString() : null));
      return params;
    }

    public get modelParams(): Array<Param> {
      const params = new Array<Param>();
      params.push(new Param('brandIds', this.selectedBrand ? this.selectedBrand.id.toString() : null));

      return params;
    }

    // public brand: Brand = null;
    // public model: Model = null;
    public selectedDictionaryItem: DictionaryItem = null;
    public selectedBrand: Brand = null;
    public selectedModel: Model = null;

    @ViewChild('assetInvFullDetailList') public assetInvFullDetailList: AssetWFHListComponent;

    @ViewChild('dictionaryItemDetail') public dictionaryItemDetail: DictionaryItemDetailComponent;
    @ViewChild('dictionaryItemList') public dictionaryItemList: DictionaryItemListComponent;

    @ViewChild('dictionaryItemDetailModal') public dictionaryItemDetailModal: ModalDirective;
    @ViewChild('dictionaryItemListModal') public dictionaryItemListModal: ModalDirective;

    @ViewChild('brandList') public brandList: BrandList;
    @ViewChild('brandListModal') public brandListModal: ModalDirective;

    @ViewChild('modelList') public modelList: ModelList;
    @ViewChild('modelListModal') public modelListModal: ModalDirective;

    @ViewChild('confirmationModal') public confirmationModal: ModalDirective;

    public assetEmployee: AssetEmployeeSave = new AssetEmployeeSave();
    public selectedAsset: AssetEmployeeEdit = null;

    public info: string = '';
    public info2019: string = '';
    public name: string = '';
    public serialNumber: string = '';
    public sapCode: string = '';
    public phoneNumber: string = '';
    public imei: string = '';
    public brandName: string = '';
    public modelName: string = '';
    public wfhStateId: number = 0;

    today = new Date();
    todaysDataTime = '';
    reasonReject = '';
    numberRegexIMEI = /^\d+$/;
    numberRegexSN = /^[a-zA-Z0-9]+$/;

    public assetId = 0;
    // guid: string = '';
    isSaved = false;
    decodedToken: any;
    public token = '';
    roleName = '';
    pageBrandSize = 5;
    pageModelSize = 5;
    brandReadOnly = true;
    modelReadOnly = true;
    public checkUniquePhoneNumber = false;

    // public itemsInventory = new Array<EmployeeValidateStatus>();

    public confirmationMessage: string = '';
    public operationType: OperationType = OperationType.NotSet;

    msgs1: Message[];

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public assetHttpService: AssetHttpService,
        public dictionaryItemHttpService: DictionaryItemHttpService,
        public brandHttpService: BrandHttpService,
        public modelHttpService: ModelHttpService,
        public notificationService: NotificationService,
        public employeeHttpService: EmployeeHttpService,
        public dashboardHttpService: DashboardHttpService,
        public tableDefinitionHttpService: TableDefinitionHttpService,
        public columnDefinitionHttpService: ColumnDefinitionHttpService,
        public configValuesHttpService: ConfigValuesHttpService,
        public authenticationService: AuthenticationService,
        private jwtService: JwtHelperService,
        private fileService: FileHttpService,
        public mobilePhoneHttpService: MobilePhoneHttpService,
        private messageService: MessageService,
        private primengConfig: PrimeNGConfig,
        private dialogService: DialogService,
        private documentHttpService: DocumentHttpService,
        public http: HttpClient) {

          this.todaysDataTime = formatDate(this.today, 'dd/MM/yyyy H:mm:ss', 'en-GB');

            //this.itemsInventory.push(new EmployeeValidateStatus());

            this.token = localStorage.getItem('id_token');

            if (this.token === '' || this.token == null) {
                this.router.navigate(['/login']);
            }

            // this.route.params.subscribe((params: Params) => {
            //     if (params['id']) {
            //         this.guid = params['id'];
            //     }
            // });
    }

    ngOnInit(): void {
      //  throw new Error('Method not implemented.');
      this.msgs1 = [
       {severity:'success', summary:'Success', detail:'Message Content', closable: true, sticky: true, icon: 'fa fa-file'},
       {severity:'info', summary:'Info', detail:'Message Content', closable: true, sticky: true, icon: 'pi-file'},
       {severity:'warn', summary:'Warning', detail:'Message Content', closable: true, sticky: true, icon: 'pi-file'},
       {severity:'error', summary:'Error', detail:'Message Content', closable: true, sticky: true, icon: 'pi-file'}
   ];

   this.primengConfig.ripple = true;
   }

    ngAfterViewInit() {



        this.decodedToken = this.jwtService.decodeToken(this.token);
        // console.log(this.decodedToken );
        const index = this.decodedToken.role[1];
        if (index.length > 1) {
          this.decodedToken.role = this.decodedToken.role.slice(0 , -1);
        }

        setTimeout(() => {
            this.loadTableConfigurationData(this.decodedToken.role);
            // this.refreshAssets();
            // this.loadData();

       }, 2000);
    }

    public get allowSaving(): boolean {
        if (((this.name !== undefined && this.name !== '' && this.name.trim().length > 2) &&
        (this.serialNumber !== undefined && this.serialNumber !== '' && this.serialNumber.trim().length > 2))) {
            return true;
        } else {
            return false;
        }
    }

    public onAssetInvFullDetailSelectionChanged(assets: Array<AssetEmployeeSave>) {
      this.checkUnique('');
      this.brandReadOnly = true;
      this.modelReadOnly = true;
      this.isSaved = true;
      this.selectedAsset = this.assetInvFullDetailList.selectedItem;
      if (this.selectedAsset != null) 
      {
          this.assetId = this.selectedAsset.id;
          this.info = this.selectedAsset.info;
          this.info2019 = this.selectedAsset.info;
          this.name = this.selectedAsset.name;
          this.serialNumber = this.selectedAsset.serialNumber;
          this.sapCode = this.selectedAsset.sapCode;
          this.phoneNumber = this.selectedAsset.phoneNumber;
          this.imei = this.selectedAsset.imei;
          this.brandName = this.selectedAsset.adm != null && this.selectedAsset.adm.brand != null ? this.selectedAsset.adm.brand.name : '';
          this.modelName = this.selectedAsset.adm != null && this.selectedAsset.adm.model != null ? this.selectedAsset.adm.model.name : '';
          this.brand = this.selectedAsset.adm != null ? this.selectedAsset.adm.brand : null;
          this.model = this.selectedAsset.adm != null ? this.selectedAsset.adm.model : null;
          this.dictionaryItem = this.selectedAsset.dictionaryItem;
          this.wfhStateId = this.assetInvFullDetailList.selectedItem.wfhState.id
      } 
      else 
      {
          this.selectedAsset = new AssetEmployeeEdit();
          this.info = '';
          this.info2019 = '';
          this.name = '';
          this.serialNumber = '';
          this.sapCode = '';
          this.phoneNumber = '';
          this.imei = '';
          this.brandName = '';
          this.modelName = '';
          this.assetId = 0;
          this.brand = null;
          this.model = null;
          this.dictionaryItem = null;
          this.selectedDictionaryItem = null;
          this.selectedBrand = null;
          this.selectedModel = null;
          this.wfhStateId = 0;
      }
    }

    onAssetEmployeeValidateListAfterViewInit() {
    }

    public refreshAssets() {
        // const params: Array<Param> = new Array<Param>();
        // params.push(new Param('email', this.decodedToken.email));
        this.assetInvFullDetailList.refresh(null);
    }

     /*begin dictionary Item*/
     public selectDictionaryItem() {

        const params = new Array<Param>();
        params.push(new Param('showWFH', 'true'));

        this.dictionaryItemList.selectedItems = new Array<DictionaryItem>();

        this.dictionaryItem = null;
        this.name = '';

        // this.brand = null;
        // this.brandName = '';

        // this.model = null;
        // this.modelName = '';

        this.dictionaryItemList.refresh(params);
        this.dictionaryItemListModal.show();
    }

    public setSelectedDictionaryItem(value) {
        // let items: Array<DictionaryItem> = this.dictionaryItemList.selectedItems;
        let items = value;
        this.selectedDictionaryItem = value;
        this.name = value.name;
        // console.log(this.dictionaryItem);

        // if (this.dictionaryItem != null) {
        //     if (this.brand != null && this.brand.dictionaryItem != null && this.brand.dictionaryItem.id !== this.dictionaryItem.id ) {
        //         this.brand = null;
        //         this.brandName = '';
        //         this.model = null;
        //         this.modelName = '';
        //     }
        // } else {
        //     this.brand = null;
        //     this.brandName = '';
        //     this.model = null;
        //     this.modelName = '';
        // }


        // this.dictionaryItemListModal.hide();
    }
    


     /*begin BRAND */
     public selectBrand() {

        //  const params = new Array<Param>();
        //  params.push(new Param('pageSize', this.pageSize.toString()));
        // params.push(new Param('dictionaryItemIds', this.dictionaryItem != null ? this.dictionaryItem.id.toString() : null));
        this.brandList.selectedItems = new Array<Brand>();
        this.brand = null;
        this.brandList.refresh(null);
        this.brandListModal.show();
    }

    public setSelectedBrand(value) {
        // const items: Array<Brand> = this.brandList.selectedItems;
        this.selectedBrand = value;
        this.brandName = (value != null) ? value.name : '';
        // if (this.brand != null) {
        //     if (this.model != null && this.model.brand != null && this.model.brand.id !== this.brand.id ) {
        //         this.model = null;
        //         this.modelName = '';
        //     }
        // } else {
        //     this.model = null;
        //     this.modelName = '';
        // }

        if (this.selectedBrand != null && this.selectedBrand.code === '00') {
            this.brandReadOnly = false;
            this.selectedBrand = null;
            this.brandName = '';
        } else {
            this.brandReadOnly = true;
        }

        // console.log(this.brand.serial1Pattern.indexOf('XX'));

        // this.brandListModal.hide();
    }

    /*end BRAND */

     /*begin MODEL */
     public selectModel() {
        this.modelList.selectedItems = new Array<Model>();
        this.model = null;


        const params = new Array<Param>();
        params.push(new Param('brandIds', this.brand != null ? this.brand.id.toString() : null));

        this.modelList.refresh(params);
        this.modelListModal.show();
    }

    public setSelectedModel(value) {
        // let items: Array<Model> = this.modelList.selectedItems;
        // this.model = ((items != null) && (items.length === 1)) ? items[0] : null;
        // this.modelName = ((items != null) && (items.length === 1)) ? items[0].name : '';

         // const items: Array<Brand> = this.brandList.selectedItems;
         this.selectedModel = value;
         this.modelName = (value != null) ? value.name : '';
         // if (this.brand != null) {
         //     if (this.model != null && this.model.brand != null && this.model.brand.id !== this.brand.id ) {
         //         this.model = null;
         //         this.modelName = '';
         //     }
         // } else {
         //     this.model = null;
         //     this.modelName = '';
         // }

        if (this.selectedModel != null && this.selectedModel.code === '00') {
            this.modelReadOnly = false;
            this.selectedModel = null;
            this.modelName = '';
        } else {
            this.modelReadOnly = true;
        }


        // this.modelListModal.hide();
    }

    /*end MODEL */

    public saveAsset() {
        this.brandReadOnly = true;
        this.modelReadOnly = true;
        this.isSaved = true;
        this.assetEmployee.id = this.assetId;
        this.assetEmployee.info = this.info;
        this.assetEmployee.info2019 = this.info2019;
        this.assetEmployee.name = this.name;
        this.assetEmployee.serialNumber = this.serialNumber;
        this.assetEmployee.brandName = this.brandName;
        this.assetEmployee.modelName = this.modelName;
        this.assetEmployee.validated = true;
        this.assetEmployee.dictionaryItemId = this.selectedDictionaryItem != null ? this.selectedDictionaryItem.id : 0;
        this.assetEmployee.brandId = this.selectedBrand != null ? this.selectedBrand.id : 0;
        this.assetEmployee.modelId = this.selectedModel != null ? this.selectedModel.id : 0;
        this.assetEmployee.sapCode = this.sapCode;
        this.assetEmployee.phoneNumber = this.phoneNumber;
        this.assetEmployee.imei = this.imei;

        if (this.assetEmployee.id > 0) {
             this.assetHttpService.addNewAssetEmployee(this.assetEmployee)
             .subscribe((res: WFHResult) => {
                if (res.success) {
                    this.notificationService.showSuccess(res.message, 'Modificare echipament', 2000, false, 0);
                    this.refreshAssets();
                    this.info = '';
                    this.info2019 = '';
                    this.name = '';
                    this.serialNumber = '';
                    this.sapCode = '';
                    this.phoneNumber = '';
                    this.imei = '';
                    this.brandName = '';
                    this.modelName = '';
                    this.assetId = 0;
                    this.selectedAsset = new AssetEmployeeEdit();
                    this.dictionaryItem = null;
                    this.brand = null;
                    this.model = null;
                    this.selectedDictionaryItem = null;
                    this.selectedBrand = null;
                    this.selectedModel = null;
                    this.isSaved = false;
                    this.brandReadOnly = true;
                    this.modelReadOnly = true;
                    //this.loadData();
                } else {
                  this.notificationService.showError(res.message, 'Modificare echipament', 10000, false, 0);
                  this.isSaved = false;
                }
            });
            // .subscribe(() => {
                // this.assetHttpService.getDetailById(this.assetEmployee.id)
                //     .subscribe((assetId: number) => {
                //         if (assetId > 0){
                //             this.toastr.success('Datele au fost modificate cu succes!');
                //             this.refreshAssets();
                //             this.isSaved = true;
                //         }
                //     });
            // });
        } else {
            this.assetHttpService.addNewAssetEmployee(this.assetEmployee)
            .subscribe((res: WFHResult) => {
                if (res.success){
                    this.notificationService.showSuccess(res.message, 'Adaugare echipament', 2000, false, 0);
                    this.refreshAssets();
                    this.info = '';
                    this.info2019 = '';
                    this.name = '';
                    this.serialNumber = '';
                    this.sapCode = '';
                    this.phoneNumber = '';
                    this.imei= '';
                    this.brandName = '';
                    this.modelName = '';
                    this.assetId = 0;
                    this.dictionaryItem = null;
                    this.brand = null;
                    this.model = null;
                    this.selectedDictionaryItem = null;
                    this.selectedBrand = null;
                    this.selectedModel = null;
                    //this.loadData();
                    this.isSaved = false;
                    this.brandReadOnly = true;
                    this.modelReadOnly = true;
                    this.router.navigate(['/wfh/status']);
                }else {
                  this.notificationService.showError(res.message, 'Adaugare echipament', 10000, false, 0);
                  this.isSaved = false;
                }
            });
        }
    }

    public deleteAssetOp() {
        this.assetHttpService.deleteAssetValidation(this.assetInvFullDetailList.selectedItem.id).subscribe( (res: WFHResult) => {
            if (res.success){
                this.notificationService.showInfo(res.message, 'Stergere echipament', 2000, false, 0);
                this.refreshAssets();
                this.info = '';
                this.info2019 = '';
                this.name = '';
                this.serialNumber = '';
                this.sapCode = '';
                this.phoneNumber = '';
                this.imei = '';
                this.brandName = '';
                this.modelName = '';
                this.assetId = 0;
                this.dictionaryItem = null;
                this.selectedDictionaryItem = null;
                this.selectedBrand = null;
                this.selectedModel = null;
                this.brand = null;
                this.model = null;
                //this.loadData();
            } else {
              this.notificationService.showError(res.message, 'Stergere echipament', 10000, false, 0);
              this.isSaved = false;
            }
        });
    }

    public onDeleteAssetOp() {
        this.operationType = OperationType.Delete;
        this.confirmationMessage = 'Stergeti echipamentul selectat?';
        this.confirmationModal.show();
    }

    public onConfirmationCanceled() {
        this.operationType = OperationType.NotSet;
        this.confirmationModal.hide();
    }

    public onConfirmationApproved() {

        switch (this.operationType) {
            case OperationType.Delete:
                this.deleteAssetOp();
                break;
            default:
                break;
        }

        this.operationType = OperationType.NotSet;
        this.confirmationModal.hide();
    }

    public clearFilters() {
        // this.loadData();
        this.loadTableConfigurationData(this.decodedToken.role);
        // this.assetInvFullDetailList.refresh(null);
        this.isSaved = false;
        this.brandReadOnly = true;
        this.modelReadOnly = true;
        this.brandName = '';
        this.modelName= '';
        this.serialNumber = '';
        this.sapCode = '';
        this.phoneNumber = '';
        this.imei = '';
        this.info = '';
        this.dictionaryItem = null;
        this.model = null;
        this.brand = null;
        this.selectedDictionaryItem = null;
        this.selectedBrand = null;
        this.selectedModel = null;
        this.name= '';
    }

    // public loadData() {
    //     this.dashboardHttpService.employeesStatus().subscribe( (res: any[]) => {
    //       this.itemsInventory = res;
    //   });
    // }

    public loadTableConfigurationData(userRole: string) {
        this.tableDefinitionHttpService.get(1, 1000000, 'id', 'asc', null, null, 'allowAnonymous')
          .subscribe((tableDefinitions: PagedResult<TableDefinition>) => {

            const params: Array<Param> = new Array<Param>();
            params.push(new Param('roleName', userRole));
            this.columnDefinitionHttpService.get(1, 1000000, 'tableDefinitionId', 'asc', params, null, 'allowAnonymous')
              .subscribe((columnDefinitions: PagedResult<ColumnDefinition>) => {
                AppData.UpdateColumnDefinitions(tableDefinitions.items, columnDefinitions.items);
                this.refreshAssets();
                // this.configValuesHttpService.get(1, 1000000, 'id', 'asc', params)
                //   .subscribe((configValues: PagedResult<ConfigValue>) => {
                //     AppData.UpdateConfigValues(configValues.items);

                //   });
              });
          });
      }

    //   public get isValid() {
    //     if ((

    //         (this.name !== undefined && this.name !== '' && this.name.trim().length > 2) &&
    //         ((this.serialNumber !== undefined && this.serialNumber !== '' && this.serialNumber.trim().length > 3 && this.serialNumberPatternValidate) || (this.serialNumber === 'N/A') || (this.dictionaryItem != null && this.dictionaryItem.name === 'Telefon')) &&
    //         ((this.sapCode !== undefined && this.sapCode !== '' && this.sapCode.trim().length > 3 && this.tagPatternValidate) || (this.sapCode === 'N/A') || (this.dictionaryItem != null && this.dictionaryItem.name === 'Telefon')) &&
    //         //((this.phoneNumber !== undefined && this.phoneNumber !== '' && this.phoneNumber.trim().length > 3 && this.phoneNumberPatternValidate) || (this.phoneNumber === 'N/A') || (this.dictionaryItem != null && this.dictionaryItem.name !== 'Telefon')) &&
    //         ((this.phoneNumber !== undefined && this.phoneNumber !== '' && this.phoneNumber.trim().length > 3 && this.checkUniquePhoneNumber) || (this.phoneNumber === 'N/A') || (this.dictionaryItem != null && this.dictionaryItem.name !== 'Telefon')) &&
    //         ((this.imei !== undefined && this.imei !== '' && this.imei.trim().length > 3 && this.imeiPatternValidate) || (this.imei === 'N/A') || (this.dictionaryItem != null && this.dictionaryItem.name !== 'Telefon')) &&
    //         (this.brand != null || (!this.brandReadOnly && this.brandName.trim().length > 1)) &&
    //         (this.model != null || (!this.modelReadOnly && this.modelName.trim().length > 1))
    //         )) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }


    public get isValid() {
      if ((

          (this.name !== undefined && this.name !== '' && this.name.trim().length > 2) &&
          //((this.serialNumber !== undefined && this.serialNumber !== '' && this.serialNumber.trim().length > 3) || (this.serialNumber === 'N/A') || (this.dictionaryItem != null && this.dictionaryItem.name === 'Telefon')) &&
          //((this.sapCode !== undefined && this.sapCode !== '' && this.sapCode.trim().length > 7) || (this.sapCode === 'N/A') || (this.dictionaryItem != null && this.dictionaryItem.name === 'Telefon')) &&
          //((this.phoneNumber !== undefined && this.phoneNumber !== '' && this.phoneNumber.trim().length > 3 && this.phoneNumberPatternValidate) || (this.phoneNumber === 'N/A') || (this.dictionaryItem != null && this.dictionaryItem.name !== 'Telefon')) &&
          ((this.phoneNumber !== undefined && this.phoneNumber !== '' && this.phoneNumber.trim().length > 3 && this.checkUniquePhoneNumber) || (this.phoneNumber === 'N/A') || (this.selectedDictionaryItem != null && this.selectedDictionaryItem.name !== 'Telefon')) &&
          //((this.imei !== undefined && this.imei !== '' && this.imei.trim().length === 15) || (this.imei === 'N/A') || (this.dictionaryItem != null && this.dictionaryItem.name !== 'Telefon')) &&
          (this.selectedBrand != null || (!this.brandReadOnly && this.brandName.trim().length > 1)) &&
          (this.selectedModel != null || (!this.modelReadOnly && this.modelName.trim().length > 1))
          )) {
          return true;
      } else {
          return false;
      }
  }


    validateName(event: number) {
        // console.log(JSON.stringify(this.dictionaryItem));
        this.dictionaryItem = null;
    }

    validateBrand(event: number) {
        console.log(event);
        // this.brand = null;
    }

    validateModel(event: number) {
        console.log(event);
        // this.model = null;
    }

    public get isAdmin(): boolean {
        return this.decodedToken != null && this.decodedToken.role != null && this.decodedToken.role === 'administrator';
    }

    public getSN(): void {
        const url = `${AppConfig.urlPrefix}documents/manual/serie`;
            window.open(url);
          }

    public getIMEI(): void {
    const url = `${AppConfig.urlPrefix}documents/manual/imei`;
        window.open(url);
        }

        public onPageBrandUpdate(number: number) {
            this.pageBrandSize = number;

            const params = new Array<Param>();
            params.push(new Param('pageSize', this.pageBrandSize.toString()));
            this.brandList.refresh(params);
        }

        public onPageModelUpdate(number: number) {
            this.pageModelSize = number;

            const params = new Array<Param>();
            params.push(new Param('pageSize', this.pageModelSize.toString()));
            this.modelList.refresh(params);
        }

        public get sapCodePatternValidate(): boolean {
          let month = '00';
          let year = '';

          if(this.sapCode != null && this.sapCode.trim().length > 7){

            month = this.sapCode.trim().substring(0, 2);
            year = this.sapCode.trim().substring(2, 4);

            // console.log(month);
            // console.log(year);


            if(month !== '01' && month !== '02' && month !== '03' && month !== '04' && month !== '05' && month !== '06' &&
               month !== '07' && month !== '08' && month !== '09' && month !== '10' && month !== '11' && month !== '12'){
              return false;
            }
            if(year.toString() !== '00' && year.toString() !== '01' && year.toString() !== '02' && year.toString() !== '03' &&
               year.toString() !== '04' && year.toString() !== '05' && year.toString() !== '06' && year.toString() !== '07' &&
               year.toString() !== '08' && year.toString() !== '09' && year.toString() !== '10' && year.toString() !== '11' &&
               year.toString() !== '12' && year.toString() !== '13' && year.toString() !== '14' && year.toString() !== '15' &&
               year.toString() !== '16' && year.toString() !== '17' && year.toString() !== '18' && year.toString() !== '19' &&
               year.toString() !== '20' && year.toString() !== '21' && year.toString() !== '22' && year.toString() !== '23' &&
               year.toString() !== '24' && year.toString() !== '25' && year.toString() !== '26' && year.toString() !== '27'){
               return false;
            }

           let check1 = this.sapCode.trim().substring(4, 8).indexOf(InventoryNumber.EITR.toString()) === -1;
           let check2 = this.sapCode.trim().substring(4, 8).indexOf(InventoryNumber.CCRO.toString()) === -1;

          //  console.log(check1);
          //  console.log(check2);


          if(!check1 || !check2){
            if(((this.sapCode.trim().substring(4, 8).indexOf(InventoryNumber.CCRO.toString()) === -1) &&
            (this.sapCode.trim().substring(4, 8).indexOf(InventoryNumber.EITR.toString()) === -1)) ||
            (this.sapCode.trim().length !== 12)){
           return false;
         }
          }else {
            if(((this.sapCode.trim().substring(4, 6).indexOf(InventoryNumber.CC.toString()) === -1) &&
            (this.sapCode.trim().substring(4, 6).indexOf(InventoryNumber.FF.toString()) === -1) &&
            (this.sapCode.trim().substring(4, 6).indexOf(InventoryNumber.IT.toString()) === -1)) ||
            (this.sapCode.trim().length !== 10)){
           return false;
         }
          }

          return true;

          }else {
            return false;
          }
        }

         public get snModelPatternValidate(): boolean{
          return ((this.selectedModel != null && ((this.selectedModel.snLength > 0) || (this.selectedDictionaryItem != null && (this.selectedDictionaryItem.code === 'M' || this.selectedDictionaryItem.code === 'D') && this.selectedModel.snLength === 0 && (this.serialNumber.length > 3 || this.serialNumber === 'N/A'))) &&
                 (((this.serialNumber.length === this.selectedModel.snLength || (this.selectedDictionaryItem != null && (this.selectedDictionaryItem.code === 'M' || this.selectedDictionaryItem.code === 'D') && this.selectedModel.snLength === 0 && (this.serialNumber.length > 3  || this.serialNumber === 'N/A'))) &&
                 (
                  (this.selectedDictionaryItem != null && this.selectedDictionaryItem.code !== 'TEL') &&
                  (this.serialNumber.indexOf('0123456') == -1) &&
                  (this.serialNumber.indexOf('1234567') == -1) &&
                  (this.serialNumber.indexOf('2345678') == -1) &&
                  (this.serialNumber.indexOf('3456789') == -1) &&
                  (this.serialNumber.indexOf('4567891') == -1) &&
                  (this.serialNumber.indexOf('5678910') == -1) &&
                  (this.serialNumber.indexOf('6789101') == -1) &&
                  (this.serialNumber.indexOf('7891011') == -1) &&
                  (this.serialNumber.indexOf('8910111') == -1) &&
                  (this.serialNumber.indexOf('0000000') == -1) &&
                  (this.serialNumber.indexOf('1111111') == -1) &&
                  (this.serialNumber.indexOf('2222222') == -1) &&
                  (this.serialNumber.indexOf('3333333') == -1) &&
                  (this.serialNumber.indexOf('4444444') == -1) &&
                  (this.serialNumber.indexOf('5555555') == -1) &&
                  (this.serialNumber.indexOf('6666666') == -1) &&
                  (this.serialNumber.indexOf('7777777') == -1) &&
                  (this.serialNumber.indexOf('8888888') == -1) &&
                  (this.serialNumber.indexOf('9999999') == -1) &&
                  this.numberRegexSN.test(this.serialNumber)
                  // this.containsOnlyNumbers(this.imei)
                 ))
                 || (this.serialNumber === 'N/A'))) ||
                 (!this.brandReadOnly && this.brandName.trim().length > 1) ||
                 (!this.modelReadOnly && this.modelName.trim().length > 1)
                 )
        }

        public get imeiModelPatternValidate(): boolean{
          return ((this.selectedModel != null && this.selectedModel.imeiLength > 0 &&
                 (((this.imei.length === this.selectedModel.imeiLength) &&
                 (
                  (this.selectedDictionaryItem != null && this.selectedDictionaryItem.code === 'TEL') &&
                  (this.imei.indexOf('0123456') == -1) &&
                  (this.imei.indexOf('1234567') == -1) &&
                  (this.imei.indexOf('2345678') == -1) &&
                  (this.imei.indexOf('3456789') == -1) &&
                  (this.imei.indexOf('4567891') == -1) &&
                  (this.imei.indexOf('5678910') == -1) &&
                  (this.imei.indexOf('6789101') == -1) &&
                  (this.imei.indexOf('7891011') == -1) &&
                  (this.imei.indexOf('8910111') == -1) &&
                  (this.imei.indexOf('0000000') == -1) &&
                  (this.imei.indexOf('1111111') == -1) &&
                  (this.imei.indexOf('2222222') == -1) &&
                  (this.imei.indexOf('3333333') == -1) &&
                  (this.imei.indexOf('4444444') == -1) &&
                  (this.imei.indexOf('5555555') == -1) &&
                  (this.imei.indexOf('6666666') == -1) &&
                  (this.imei.indexOf('7777777') == -1) &&
                  (this.imei.indexOf('8888888') == -1) &&
                  (this.imei.indexOf('9999999') == -1) &&
                  this.numberRegexIMEI.test(this.imei)
                  // this.containsOnlyNumbers(this.imei)
                 ))
                 || (this.imei === 'N/A'))) ||
                  (!this.brandReadOnly && this.brandName.trim().length > 1) ||
                  (!this.modelReadOnly && this.modelName.trim().length > 1))
        }

        // public get serialNumberPatternValidate(): boolean{
        //   return this.brand != null &&
        //          (this.serialNumber.length > 3 || this.serialNumber === 'N/A') &&
        //          (
        //             (this.brand.serial1Pattern != '' && this.brand.serial1Pattern.length > 3 &&
        //           (
        //             this.serialNumber.substring(0, this.brand.serial1Pattern.indexOf('XXX')) == this.brand.serial1Pattern.substring(0, this.brand.serial1Pattern.indexOf('XXX')) &&
        //             this.serialNumber.length == this.brand.serial1Pattern.length
        //           )
        //             ) ||

        //           (this.brand.serial2Pattern != '' && this.brand.serial2Pattern.length > 3 &&
        //           (
        //             this.serialNumber.substring(0, this.brand.serial2Pattern.indexOf('XXX')) == this.brand.serial2Pattern.substring(0, this.brand.serial2Pattern.indexOf('XXX')) &&
        //             this.serialNumber.length == this.brand.serial2Pattern.length
        //           )
        //             ) ||

        //             (this.brand.serial3Pattern != '' && this.brand.serial3Pattern.length > 3 &&
        //           (
        //             this.serialNumber.substring(0, this.brand.serial3Pattern.indexOf('XXX')) == this.brand.serial3Pattern.substring(0, this.brand.serial3Pattern.indexOf('XXX')) &&
        //             this.serialNumber.length == this.brand.serial3Pattern.length
        //           )
        //             ) ||

        //             (this.brand.serial4Pattern != '' && this.brand.serial4Pattern.length > 3 &&
        //           (
        //             this.serialNumber.substring(0, this.brand.serial4Pattern.indexOf('XXX')) == this.brand.serial4Pattern.substring(0, this.brand.serial4Pattern.indexOf('XXX')) &&
        //             this.serialNumber.length == this.brand.serial4Pattern.length
        //           )
        //             ) ||

        //             (this.brand.serial5Pattern != '' && this.brand.serial5Pattern.length > 3 &&
        //           (
        //             this.serialNumber.substring(0, this.brand.serial5Pattern.indexOf('XXX')) == this.brand.serial5Pattern.substring(0, this.brand.serial5Pattern.indexOf('XXX')) &&
        //             this.serialNumber.length == this.brand.serial5Pattern.length
        //           )
        //             ) ||

        //             (this.brand.serial1Pattern.length === 0 && this.brand.serial2Pattern.length === 0 && this.brand.serial3Pattern.length === 0 && this.brand.serial4Pattern.length === 0 && this.brand.serial5Pattern.length === 0)
        //           )|| (this.serialNumber === 'N/A');
        // }

        // public get tagPatternValidate(): boolean{
        //   return this.brand != null &&
        //          (this.sapCode.length > 3 || this.sapCode === 'N/A') &&
        //          (
        //             (this.brand.tag1Pattern != '' && this.brand.tag1Pattern.length > 3 &&
        //           (
        //             this.sapCode.substring(0, this.brand.tag1Pattern.indexOf('XXX')) == this.brand.tag1Pattern.substring(0, this.brand.tag1Pattern.indexOf('XXX')) &&
        //             this.sapCode.length == this.brand.tag1Pattern.length
        //           )
        //             ) ||

        //           (this.brand.tag2Pattern != '' && this.brand.tag2Pattern.length > 3 &&
        //           (
        //             this.sapCode.substring(0, this.brand.tag2Pattern.indexOf('XXX')) == this.brand.tag2Pattern.substring(0, this.brand.tag2Pattern.indexOf('XXX')) &&
        //             this.sapCode.length == this.brand.tag2Pattern.length
        //           )
        //             ) ||

        //             (this.brand.tag3Pattern != '' && this.brand.tag3Pattern.length > 3 &&
        //           (
        //             this.sapCode.substring(0, this.brand.tag3Pattern.indexOf('XXX')) == this.brand.tag3Pattern.substring(0, this.brand.tag3Pattern.indexOf('XXX')) &&
        //             this.sapCode.length == this.brand.tag3Pattern.length
        //           )
        //             ) ||

        //             (this.brand.tag4Pattern != '' && this.brand.tag4Pattern.length > 3 &&
        //           (
        //             this.sapCode.substring(0, this.brand.tag4Pattern.indexOf('XXX')) == this.brand.tag4Pattern.substring(0, this.brand.tag4Pattern.indexOf('XXX')) &&
        //             this.sapCode.length == this.brand.tag4Pattern.length
        //           )
        //             ) ||

        //             (this.brand.tag5Pattern != '' && this.brand.tag5Pattern.length > 3 &&
        //           (
        //             this.sapCode.substring(0, this.brand.tag5Pattern.indexOf('XXX')) == this.brand.tag5Pattern.substring(0, this.brand.tag5Pattern.indexOf('XXX')) &&
        //             this.sapCode.length == this.brand.tag5Pattern.length
        //           )
        //             )||

        //             (this.brand.tag1Pattern.length === 0 && this.brand.tag2Pattern.length === 0 && this.brand.tag3Pattern.length === 0 && this.brand.tag4Pattern.length === 0 && this.brand.tag5Pattern.length === 0)
        //           )|| (this.sapCode === 'N/A');
        // }


        // public get imeiPatternValidate(): boolean{
        //   return this.brand != null &&
        //          (this.imei.length > 3 || this.imei === 'N/A')  &&
        //          (
        //             (this.brand.imei1Pattern != '' && this.brand.imei1Pattern.length > 3 &&
        //           (
        //             this.imei.substring(0, this.brand.imei1Pattern.indexOf('XXX')) == this.brand.imei1Pattern.substring(0, this.brand.imei1Pattern.indexOf('XXX')) &&
        //             this.imei.length == this.brand.imei1Pattern.length
        //           )
        //             ) ||

        //           (this.brand.imei2Pattern != '' && this.brand.imei2Pattern.length > 3 &&
        //           (
        //             this.imei.substring(0, this.brand.imei2Pattern.indexOf('XXX')) == this.brand.imei2Pattern.substring(0, this.brand.imei2Pattern.indexOf('XXX')) &&
        //             this.imei.length == this.brand.imei2Pattern.length
        //           )
        //             ) ||

        //             (this.brand.imei3Pattern != '' && this.brand.imei3Pattern.length > 3 &&
        //           (
        //             this.imei.substring(0, this.brand.imei3Pattern.indexOf('XXX')) == this.brand.imei3Pattern.substring(0, this.brand.imei3Pattern.indexOf('XXX')) &&
        //             this.imei.length == this.brand.imei3Pattern.length
        //           )
        //             ) ||

        //             (this.brand.imei4Pattern != '' && this.brand.imei4Pattern.length > 3 &&
        //           (
        //             this.imei.substring(0, this.brand.imei4Pattern.indexOf('XXX')) == this.brand.imei4Pattern.substring(0, this.brand.imei4Pattern.indexOf('XXX')) &&
        //             this.imei.length == this.brand.imei4Pattern.length
        //           )
        //             ) ||

        //             (this.brand.imei5Pattern != '' && this.brand.imei5Pattern.length > 3 &&
        //           (
        //             this.imei.substring(0, this.brand.imei5Pattern.indexOf('XXX')) == this.brand.imei5Pattern.substring(0, this.brand.imei5Pattern.indexOf('XXX')) &&
        //             this.imei.length == this.brand.imei5Pattern.length
        //           )
        //             ) ||

        //             (this.brand.imei1Pattern.length === 0 && this.brand.imei2Pattern.length === 0 && this.brand.imei3Pattern.length === 0 && this.brand.imei4Pattern.length === 0 && this.brand.imei5Pattern.length === 0)
        //           )|| (this.imei === 'N/A');
        // }


        // public get phoneNumberPatternValidate(): boolean{
        //   return this.brand != null &&
        //          (this.phoneNumber.length > 3 || this.phoneNumber === 'N/A')  &&
        //          (
        //             (this.brand.phoneNumber1Pattern != '' && this.brand.phoneNumber1Pattern.length > 3 &&
        //           (
        //             this.phoneNumber.substring(0, this.brand.phoneNumber1Pattern.indexOf('XXX')) == this.brand.phoneNumber1Pattern.substring(0, this.brand.phoneNumber1Pattern.indexOf('XXX')) &&
        //             this.phoneNumber.length == this.brand.phoneNumber1Pattern.length
        //           )
        //             ) ||

        //           (this.brand.phoneNumber2Pattern != '' && this.brand.phoneNumber2Pattern.length > 3 &&
        //           (
        //             this.phoneNumber.substring(0, this.brand.phoneNumber2Pattern.indexOf('XXX')) == this.brand.phoneNumber2Pattern.substring(0, this.brand.phoneNumber2Pattern.indexOf('XXX')) &&
        //             this.phoneNumber.length == this.brand.phoneNumber2Pattern.length
        //           )
        //             ) ||

        //             (this.brand.phoneNumber3Pattern != '' && this.brand.phoneNumber3Pattern.length > 3 &&
        //           (
        //             this.phoneNumber.substring(0, this.brand.phoneNumber3Pattern.indexOf('XXX')) == this.brand.phoneNumber3Pattern.substring(0, this.brand.phoneNumber3Pattern.indexOf('XXX')) &&
        //             this.phoneNumber.length == this.brand.phoneNumber3Pattern.length
        //           )
        //             ) ||

        //             (this.brand.phoneNumber4Pattern != '' && this.brand.phoneNumber4Pattern.length > 3 &&
        //           (
        //             this.phoneNumber.substring(0, this.brand.phoneNumber4Pattern.indexOf('XXX')) == this.brand.phoneNumber4Pattern.substring(0, this.brand.phoneNumber4Pattern.indexOf('XXX')) &&
        //             this.phoneNumber.length == this.brand.phoneNumber4Pattern.length
        //           )
        //             ) ||

        //             (this.brand.phoneNumber5Pattern != '' && this.brand.phoneNumber5Pattern.length > 3 &&
        //           (
        //             this.phoneNumber.substring(0, this.brand.phoneNumber5Pattern.indexOf('XXX')) == this.brand.phoneNumber5Pattern.substring(0, this.brand.phoneNumber5Pattern.indexOf('XXX')) &&
        //             this.phoneNumber.length == this.brand.phoneNumber5Pattern.length
        //           )
        //             ) ||

        //             (this.brand.phoneNumber1Pattern.length === 0 && this.brand.phoneNumber2Pattern.length === 0 && this.brand.phoneNumber3Pattern.length === 0 && this.brand.phoneNumber4Pattern.length === 0 && this.brand.phoneNumber5Pattern.length === 0)
        //           ) || (this.phoneNumber === 'N/A');
        // }

        public get allowDelete(): boolean {
          return this.selectedAsset != null && this.selectedAsset.invNo != null && this.selectedAsset.invNo.startsWith('WFH');
        }

        public get allowTransfer(): boolean {
          return this.selectedAsset != null && this.selectedAsset.id > 0;
        }

        public checkUnique(event: any) {

          setTimeout(() => {
              if (this.phoneNumber !== '' && this.phoneNumber != null && this.phoneNumber !== undefined && this.phoneNumber.trim().length === 10) {
                  this.checkUniquePhoneNumber = false;
                  this.mobilePhoneHttpService.checkUnique(this.phoneNumber)
                  .subscribe((result: any) => {
                      if (result) {
                          this.notificationService.showSuccess('OK', 'Verificare numar telefon', 2000, false, 0);
                          this.checkUniquePhoneNumber = true;
                      } else if (!result) {
                          this.notificationService.showError('Nu a fost gasit in baza de date', 'Verificare numar telefon', 0, false, 0);
                          this.checkUniquePhoneNumber = false;
                      }
                  });
              } else {
                this.checkUniquePhoneNumber = false;
              }
            }, 100);
      }

      public get missingDictionaryItem(): boolean {
        return !(this.selectedDictionaryItem !== null && this.name !== '');
      }

      public get missingBrand(): boolean {
        return !(this.brand !== null && this.brandName !== '');
      }

      public get missingModel(): boolean {
        return !(this.model !== null && this.modelName !== '');
      }

      public onStockTransfer() {

        // console.log(this.assetInvFullDetailList.selectedItem);

        let isInTransfer = 0;
        if (this.assetInvFullDetailList.selectedItem.isInTransfer) {
          this.notificationService.showWarning('Numarul de inventar ' + this.assetInvFullDetailList.selectedItem.invNo + ' asteapta validarea transferului!', '', 5000, false, 0);
          isInTransfer++;
      }

        if (isInTransfer > 0) {
            return;
        } else {
          this.dialogService
          .confirmDialog({
            title: 'Confirm Action',
            message: 'Doriti sa returnati catre IT echipamentul selectat (' + this.assetInvFullDetailList.selectedItem.invNo + '-' + this.assetInvFullDetailList.selectedItem.subNo + ')?',
            confirmCaption: 'Da',
            cancelCaption: 'Nu',
          })
          .subscribe((confirmed) => {
            // console.log(confirmed);
            if (confirmed) {
              this.saveDocument();
            }
          });
        }
      }


      public saveDocument() {
        this.isSaved = false;
        let document: Document = null;
        let operation: Operation = null;
        let operations: Array<Operation> = null;
        let documentUpload: DocumentUpload = null;

        document = new Document(0, 2, '', '', new Date(), new Date(), false, this.reasonReject, '', new Date(), new Date());

        operations = new Array<Operation>();

        operation = new Operation(0, this.selectedAsset.id, false, null, 949, 0, 0, 0, 0, 3275, 0, 0, 0, 0, 0, 0, 0);
        operations.push(operation);

        documentUpload = new DocumentUpload();
        documentUpload.id = document.id;
        documentUpload.documentTypeId = document.documentTypeId;
        documentUpload.docNo1 = document.docNo1;
        documentUpload.docNo2 = document.docNo2;
        documentUpload.documentDate = document.documentDate;
        documentUpload.registerDate = document.registerDate;
        documentUpload.validated = document.validated;
        documentUpload.details = document.details;
        documentUpload.serialNumber = document.serialNumber;
        documentUpload.operations = operations;

        this.documentHttpService.saveWFHFullDocument(documentUpload).toPromise().then((data) => {
          if(data.success){
            this.isSaved = true;
            this.notificationService.showInfo(data.message, 'Transfer catre IT', 2000, false, 0);
            this.refreshAssets();
            this.info = '';
            this.info2019 = '';
            this.name = '';
            this.serialNumber = '';
            this.sapCode = '';
            this.phoneNumber = '';
            this.imei = '';
            this.brandName = '';
            this.modelName = '';
            this.assetId = 0;
            this.selectedAsset = new AssetEmployeeEdit();
            this.dictionaryItem = null;
            this.brand = null;
            this.model = null;
            this.isSaved = false;
            this.brandReadOnly = true;
            this.modelReadOnly = true;
            //this.loadData();
          } else {
            this.isSaved = true;
            this.notificationService.showError(data.message, 'Transfer catre IT', 0, false, 0);
          }
      }, (error) => {
        alert('Eroare server');
      });
      }

      containsOnlyNumbers(str) {
        return /^\d+$/.test(str);
      }
}

enum OperationType {
    NotSet = 1,
    AssetValidation = 2,
    Delete = 3,
    ProcessAssetOp = 4
}

enum InventoryNumber {
  EITR = 'EITR',
  CCRO  = 'CCRO',
  CC  = 'CC',
  IT = 'IT',
  FF = 'FF',
}

// enum InventoryNumberMonth {
//   '01' = 1,
//   '02' = 2,
//   '03' = 3,
//   '04' = 4,
//   '05' = 5,
//   '06' = 6,
//   '07' = 7,
//   '08' = 8,
//   '09' = 9,
//   '10' = 10,
//   '11' = 11,
//   '12' = 12
// }
