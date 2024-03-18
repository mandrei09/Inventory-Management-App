import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Param } from '../../../model/common/param';
import { EmployeeHttpService } from '../../../services/http/administration/employee.http.service';
import { PartnerHttpService } from '../../../services/http/documents/partner.http.service';
import { Employee } from '../../../model/api/administration/employee';
import { Partner } from '../../../model/api/documents/partner';
import { AdministrationHttpService } from '../../../services/http/administration/administration.http.service';
import { CostCenterHttpService } from '../../../services/http/administration/cost-center.http.service';
import { MasterTypeHttpService } from '../../../services/http/assets/master-type.http.service';
import { TypeHttpService } from '../../../services/http/administration/type.http.service';
import { SubTypeHttpService } from '../../../services/http/administration/sub-type.http.service';
import { EntityFileHttpService } from '../../../services/http/common/entity-file.http.service';
import { AccMonthHttpService } from '../../../services/http/accounting/acc-month.http.service';
import { AccountHttpService } from '../../../services/http/administration/account.http.service';
import { OfferOpHttpService } from '../../../services/http/administration/offer-op.http.service';
import { MasterTypeListComponent } from '../../assets/master-types/master-type.list';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SubTypeList } from '../sub-types/sub-type.list';
import { EmployeeListComponent } from '../employees/employee.list';
import { AccMonthListComponent } from '../../accounting/acc-month.list';
import { PartnerListComponent } from '../../documents/partners/partner.list';
import { AccountList } from '../account/account.list';
import { CostCenterListComponent } from '../cost-centers/cost-center.list';
import { AdministrationListComponent } from '../administrations/administration.list';
import { CompanyListComponent } from '../../assets/companies/company.list';
import { ProjectList } from '../../assets/projects/project.list';
import { OfferOpDetailList } from '../offer-ops/offer-op.detail.list';
import { EntityFileListComponent } from '../../common/entity-file.list';
import { EntityFile } from '../../../model/api/common/entity-file';
import { OfferSave } from '../../../model/api/administration/offer-save';
import { CodeNameEntity } from '../../../model/api/common/code-name-entity';
import { MonthEntity } from '../../../model/api/common/month-entity';
import { CodePartnerEntity } from '../../../model/api/common/code-partner-entity';
import { AppData } from '../../../app-data';
import { OfferHttpService } from '../../../services/http/administration/offer.http.service';
import { ProjectHttpService } from '../../../services/http/assets/project.http.service';
import { CompanyHttpService } from '../../../services/http/assets/company.http.service';
import { MasterType } from '../../../model/api/assets/master-type';
import { Type } from '../../../model/api/administration/type';
import { SubType } from '../../../model/api/administration/sub-type';
import { Administration } from '../../../model/api/administration/administration';
import { Company } from '../../../model/api/assets/company';
import { Project } from '../../../model/api/assets/project';
import { AccMonth } from '../../../model/api/accounting/acc-month';
import { CostCenter } from '../../../model/api/administration/cost-center';
import { Account } from '../../../model/api/administration/account';
import { AppConfig } from '../../../config';
import { TypeList } from '../types/type.list';
import { Budget } from '../../../model/api/administration/budget';
import { BudgetHttpService } from '../../../services/http/administration/budget.http.service';
import { BudgetList } from '../budget/budget.list';
import { AdmCenter } from '../../../model/api/administration/adm-center';
import { Region } from '../../../model/api/administration/region';
import { AssetType } from '../../../model/api/assets/asset-type';
import { AdmCenterListComponent } from '../adm-centers/adm-center.list';
import { RegionListComponent } from '../regions/region.list';
import { AssetTypeListComponent } from '../../assets/asset-types/asset-type.list';
import { AdmCenterHttpService } from '../../../services/http/administration/adm-center.http.service';
import { RegionHttpService } from '../../../services/http/administration/region.http.service';
import { AssetTypeHttpService } from '../../../services/http/assets/asset-type.http.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Request } from '../../../model/api/administration/request';
import { RequestList } from '../request/request.list';
import { RequestHttpService } from '../../../services/http/administration/request.http.service';
import { NotificationService } from '../../../services/notification.service';
import { OfferUpload } from '../../../model/api/common/offer-upload';
import { Observable, Subject } from 'rxjs';
import { PrimeNGConfig } from 'primeng/api';
import { BudgetBase } from '../../../model/api/budget/budget-base';
import { OfferType } from '../../../model/api/offer/offer-type';
import { OfferTypeListComponent } from '../../offers/offer-type/offer-type.list';
import { OfferTypeHttpService } from '../../../services/http/offfers/offer-type.http.service';
import { BudgetForecast } from '../../../model/api/budget/budget-forecast';
import { BudgetForecastListComponent } from '../budget-forecast/budget-forecast.list';
import { OfferResult } from '../../../model/api/result/offer-result';
import { UploadRequestModalComponent } from '../../common/upload-request-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { UploadOfferModalComponent } from '../../common/upload-offer-modal.component';
import { Offer } from '../../../model/api/administration/offer';
import { OrderList } from '../order/order.list';
import { OrderHttpService } from '../../../services/http/administration/order.http.service';
import { OfferList } from './offer.list';
import { UploadRequestBudgetForecastModalComponent } from '../../common/upload-request-budget-forecast-modal.component';
import { RequestBudgetForecastListComponent } from '../request-budget-forecasts/request-budget-forecast.list';
import { RequestBudgetForecastHttpService } from '../../../services/http/requests/request-budget-forecast.http.service';
import { AppUtils } from '../../../common/app.utils';
import { EntityFileResult } from '../../../model/api/result/entity-file-result';


@Component({
    selector: 'app-offer-detail-ui',
    templateUrl: 'offer.detail.ui.html',
    styleUrls: ['offer.detail.ui.scss'],
    providers: [
        AdministrationHttpService,
        CostCenterHttpService,
        MasterTypeHttpService,
        TypeHttpService,
        SubTypeHttpService,
        EntityFileHttpService,
        EmployeeHttpService,
        AccMonthHttpService,
        AccountHttpService,
        OfferOpHttpService,
        BudgetHttpService,
        AdmCenterHttpService,
        RegionHttpService,
        AssetTypeHttpService,
        PartnerHttpService ]
})
export class OfferDetailUIComponent  implements AfterViewInit  {

    // @ViewChild('fileInputOffer') fileInputOffer: ElementRef;

    // @ViewChild('masterTypeList') public masterTypeList: MasterTypeListComponent;
    // @ViewChild('masterTypeListModal') public masterTypeListModal: ModalDirective;

    // @ViewChild('typeList') public typeList: TypeList;
    // @ViewChild('typeListModal') public typeListModal: ModalDirective;

    // @ViewChild('subTypeList') public subTypeList: SubTypeList;
    // @ViewChild('subTypeListModal') public subTypeListModal: ModalDirective;

    // @ViewChild('employeeList') public employeeList: EmployeeListComponent;
    // @ViewChild('employeeListModal') public employeeListModal: ModalDirective;

    // @ViewChild('accMonthList') public accMonthList: AccMonthListComponent;
    // @ViewChild('accMonthListModal') public accMonthListModal: ModalDirective;

    @ViewChild('partnerList') public partnerList: PartnerListComponent;
    @ViewChild('partnerListModal') public partnerListModal: ModalDirective;

    // @ViewChild('accountList') public accountList: AccountList;
    // @ViewChild('accountListModal') public accountListModal: ModalDirective;

    // @ViewChild('costCenterList') public costCenterList: CostCenterListComponent;
    // @ViewChild('costCenterListModal') public costCenterListModal: ModalDirective;

    // @ViewChild('administrationList') public administrationList: AdministrationListComponent;
    // @ViewChild('administrationListModal') public administrationListModal: ModalDirective;

    // @ViewChild('companyList') public companyList: CompanyListComponent;
    // @ViewChild('companyListModal') public companyListModal: ModalDirective;

    // @ViewChild('budgetForecastList') public budgetForecastList: BudgetForecastListComponent;
    // @ViewChild('budgetForecastListModal') public budgetForecastListModal: ModalDirective;

    @ViewChild('requestList') public requestList: RequestList;
    @ViewChild('requestListModal') public requestListModal: ModalDirective;

    @ViewChild('offerTypeList') public offerTypeList: OfferTypeListComponent;
    @ViewChild('offerTypeListModal') public offerTypeListModal: ModalDirective;

    @ViewChild('offerList') public offerList: OfferList;
    @ViewChild('offerListModal') public offerListModal: ModalDirective;

    // @ViewChild('projectList') public projectList: ProjectList;
    // @ViewChild('projectListModal') public projectListModal: ModalDirective;

    // @ViewChild('admCenterList') public admCenterList: AdmCenterListComponent;
    // @ViewChild('admCenterListModal') public admCenterListModal: ModalDirective;

    // @ViewChild('regionList') public regionList: RegionListComponent;
    // @ViewChild('regionListModal') public regionListModal: ModalDirective;

    // @ViewChild('assetTypeList') public assetTypeList: AssetTypeListComponent;
    // @ViewChild('assetTypeListModal') public assetTypeListModal: ModalDirective;

    // @ViewChild('projectTypeList') public projectTypeList: ProjectTypeList;
    // @ViewChild('projectTypeListModal') public projectTypeListModal: ModalDirective;

    // 
    // 

    @ViewChild('offerOpDetailList') public offerOpList: OfferOpDetailList;
    @ViewChild('entityFileList') public entityFileList: EntityFileListComponent;
    @ViewChild('entityFileRequestList') public entityFileRequestList: EntityFileListComponent;
    @ViewChild('entityFileOfferUIList') public entityFileOfferUIList: EntityFileListComponent;

    @ViewChild('requestBudgetForecastList') public requestBudgetForecastList: RequestBudgetForecastListComponent;

    @ViewChild('confirmationModal') public confirmationModal: ModalDirective;
    // @ViewChild('fileInput') fileInput;

    public entityTypeCode: string = 'OFFER';
    public entityTypeRequestCode: string = 'REQUEST_BUDGET_FORECAST';
    public entityTypeOfferUICode: string = 'OFFERUI_DOCUMENT';
    public entityFile: EntityFile = null;
    public entityFileRequest: EntityFile = null;
    public entityFileOfferUI: EntityFile = null;
    public confirmationMessage: string = '';
    public operationType: OperationType = OperationType.NotSet;
    public selectedRequestBudgetForecasts: Array<any> = new Array<any>();

    currentFile?: File;
    fileName = 'Select File';
    cols: any[];
    // showMsgArea = false;

    public id: number = 0;
    public offer: OfferSave = new OfferSave();
    public offerClone: Offer = null;

    // public filesToUpload: Array<OfferUpload> = new Array<OfferUpload>();
    // public filesToUpload: Array<any> = new Array<any>();
    public selectedAssetOp: any;
    public isSaved: boolean = true;
    message = '';

    public get allowSaving(): boolean {
        return this.offer != null &&
        this.request != null &&
        // (this.budgetForecast != null || this.budgetBase != null) &&
        this.selectedPartners.length > 0 &&
        // this.company != null &&
        // this.admCenter != null &&
        // this.region != null &&
        // this.assetType != null &&
        this.employee != null;
    }

    // public costCenter: CodeNameEntity = null;
    public employee: Employee = null;
    // public accMonth: MonthEntity = null;
    // public company: CodeNameEntity = null;
    // public account: CodeNameEntity = null;
    public partner: CodePartnerEntity = null;
    // public masterType: CodeNameEntity = null;
    // public project: CodeNameEntity = null;
    // public interCompany: CodeNameEntity = null;
    // public type: CodeNameEntity = null;
    // public subType: CodeNameEntity = null;
    // public administration: CodeNameEntity = null;

    // public budgetForecast: BudgetForecast = null;
    // public budgetBase: BudgetBase = null;
    public request: Request = null;
    public offerType: OfferType = null;
    // public admCenter: CodeNameEntity = null;
    // public region: CodeNameEntity = null;
    // public assetType: CodeNameEntity = null;
    // public projectType: CodeNameEntity = null;

    public readOnlyForm: boolean = false;
    public get isAdmin(): boolean { return AppData.UserIsAdmin; }

    sendTocontactInfo1  = false;
    sendTocontactInfo2  = false;
    sendTocontactInfo3  = false;

    availablePartners: Partner[] = null;
    selectedPartners: Partner[] = [];
    selectedPartnerIds: Array<number> = new Array<number>();
    selectedEntityFilePartners: EntityFile[] = [];
    guid = '';

    headerMsg = `“Stimati Parteneri,

    Va rugam sa ne trimiteti oferta Dvs. pentru produsele/echipamentele detaliate in fisierul atasat.

    Livrarea sa face in baza unui contract, iar termenul nostru de plata standard este 60 de zile.

    Termen pentru trimiterea ofertei :.....................

    Daca sunt necesare informatii suplimentare, va rugam sa ne contactati la ..................@emag.ro

    Multumesc,”
    `;

    // public _offer: OfferSave = new OfferSave();
    // public get offer(): OfferSave { return this._offer; }
    // public set offer(value: OfferSave) {
    //   this._offer = value;
    //   this.setSelectedOffer();
    // }

    // public _offerClone: Offer = null;
    // public get offerClone(): Offer { return this._offerClone; }
    // public set offerClone(value: Offer) {
    //   this._offerClone = value;
    //   this.setSelectedOffer();
    // }
    //
    // public _offerType: OfferType = null;
    // public get offerType(): OfferType { return this._offerType; }
    // public set offerType(value: OfferType) {
    //   // this._offerType = value;
    //   this.setSelectedOfferType();
    // }
    //
    // public _request: Request = null;
    // public get request(): Request { return this._request; }
    // public set request(value: Request) {
    //   this._request = value;
    //   this.setSelectedRequest(value);
    // }

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public offerHttpService: OfferHttpService,
        public masterTypeHttpService: MasterTypeHttpService,
        public accountHttpService: AccountHttpService,
        public typeHttpService: TypeHttpService,
        public subTypeHttpService: SubTypeHttpService,
        public accMonthHttpService: AccMonthHttpService,
        public budgetHttpService: BudgetHttpService,
        public requestHttpService: RequestHttpService,
        public employeeHttpService: EmployeeHttpService,
        public costCenterHttpService: CostCenterHttpService,
        public projectHttpService: ProjectHttpService,
        public companyHttpService: CompanyHttpService,
        public offerOpHttpService: OfferOpHttpService,
        public partnerHttpService: PartnerHttpService,
        public admCenterHttpService: AdmCenterHttpService,
        public regionHttpService: RegionHttpService,
        public assetTypeHttpService: AssetTypeHttpService,
        public administrationHttpService: AdministrationHttpService,
        public offerTypeHttpService: OfferTypeHttpService,
        public notificationService: NotificationService,
        private primengConfig: PrimeNGConfig,
        public entityFileHttpService: EntityFileHttpService,
        public requestBudgetForecastHttpService: RequestBudgetForecastHttpService,
        public dialog: MatDialog,
        // public entityFileHttpService: EntityFileHttpService
        ) {
        this.route.params.subscribe((params: Params) => {
            if (params['id']) {
                this.id = +params['id'];
            }
        });
    }

    ngAfterViewInit() {
        this.primengConfig.ripple = true;
        this.cols = [
            { field: 'name', header: 'Denumire' }
          ];
        // if ((this.assetFullDetail !== null) && (this.assetFullDetail.id === 0)) this.refreshDocumentTypes();
        if (this.id > 0) {
            this.offerHttpService.getDetailById(this.id)
                .subscribe((asset: any) => {
                    // this.asset = asset;
                       this.updateDetails(asset);

                    if (asset.validated) {
                        // this.refreshAssetOperations();
                        // this.refreshEntityFiles();
                    } else {
                       // this.refreshAssetTypes();
                       // this.refreshDocumentTypes();
                    }
                });
        } else {
            this.partnerHttpService.get(1, 500, 'name', 'asc', [], null, 'offer').subscribe( (res: any) => {
                this.availablePartners = [];
                // console.log(JSON.stringify(res));
                res.items.forEach(element => {
                    element.isLeftSide = true;
                    this.availablePartners.push(element);
                });
            });
        };

        this.guid = Guid.newGuid();
    }

    // public targetSelect(event: any) {
    //     // console.log(JSON.stringify(event.items));
    //     event.items.forEach(element => {
    //         this.availablePartners.push(element);
    //     });
    //     // this.showMsgArea = true;
    // }

    public moveToTarget(event: any) {
      // console.log(event.items);
        // this.notificationService.showInfo('', 'Move');
        // console.log(JSON.stringify(event));
        // this.showTemplate(1);

        event.items.isLeftSide = false;
        event.items.headerMsg = this.headerMsg;
        event.items.filesCount = 0;

        this.selectedPartners.forEach(element => {
                // console.log(element);
                // element.isLeftSide = false;
                // element.headerMsg = this.headerMsg;
                // element.filesCount = 0;
                // this.refreshOfferUIEntityFiles(element.id);
                element.entityFiles = new Array<EntityFile>();

                this.entityFileHttpService.getByEntity('REQUEST_BUDGET_FORECAST', this.request != null ? this.request.id : 0, this.guid, element.id).subscribe( (res) => {
                    if(res.length > 0){
                      element.entityFiles.push(...res);
                    }
                })

        });


    }

    public moveToSource(event: any) {
      // this.notificationService.showInfo('', 'Move');
      // console.log(JSON.stringify(event));
      // this.showTemplate(1);
      this.availablePartners.forEach(element => {
              element.isLeftSide = true;
              element.headerMsg = '';
              // element.filesCount = 0;
      });
  }

  public onTargetSelect(event: any) {
    // console.log(event.items);
      // this.notificationService.showInfo('', 'Move');
      // console.log(JSON.stringify(event));


  }

    // public refreshEntityFiles() {
    //     const params: Array<Param> = new Array<Param>();

    //     params.push(new Param('entityTypeCode', 'ASSET'));
    //     params.push(new Param('entityId', this.offer.id.toString()));

    //     this.entityFileList.refresh(params);
    // }

    // public refreshAssetOperations() {
    //     const params: Array<Param> = new Array<Param>();
    //     params.push(new Param('assetId', this.id.toString()));
    //     this.offerOpList.refresh(params);
    // }

    public updateDetails(offer: any) {
        this.offer.id = offer.id;
        // this.offer.code = offer.code;
        // this.offer.name = offer.name;
        // this.offer.companyId = offer.companyId;
        // this.offer.projectId = offer.projectId;
        // this.offer.administrationId = offer.administrationId;
        // this.offer.masterTypeId = offer.masterTypeId;
        // this.offer.typeId = offer.typeId;
        // this.offer.subTypeId = offer.subTypeId;
        this.offer.employeeId = offer.employeeId;
        // this.offer.accMonthId = offer.accMonthId;
        // this.offer.interCompanyId = offer.interCompanyId;
        // this.offer.partnerId = offer.partnerId;
        // this.offer.accountId = offer.accountId;
        // this.offer.costCenterId = offer.costCenterId;
        // this.offer.valueIni = offer.valueIni;
        // this.offer.valueFin = offer.valueFin;
        // this.offer.quantity = offer.quantity;
        // this.offer.info = offer.info;
        // this.offer.validated = offer.validated;
        // this.company = offer.company;
        // this.project = offer.project;
        // this.administration = offer.administration;
        // this.masterType = offer.masterType;
        // this.type = offer.type;
        // this.subType = offer.subType;
        this.employee = offer.employee;
        // this.accMonth = offer.accMonth;
        // this.interCompany = offer.interCompany;
        // this.partner = offer.partner;
        // this.account = offer.account;
        // this.costCenter = offer.costCenter;

        // this.admCenter = offer.admCenter;
        // this.region = offer.region;
        // this.assetType = offer.assetType;
        // this.projectType = offer.projectType;
        // this.budgetForecast = offer.budgetForecast;
    }

        //    /*begin MASTERTYPE */
        //    public selectMasterType() {

        //     this.masterTypeList.refresh(null);
        //     this.masterTypeListModal.show();
        // }

        // public setSelectedMasterType() {
        //     const items: Array<MasterType> = this.masterTypeList.selectedItems;
        //     this.masterType = ((items != null) && (items.length === 1)) ? items[0] : null;
        //     this.masterTypeListModal.hide();
        // }

        // /*end MASTERTYPE */

        //   /*begin TYPE */
        //   public selectType() {

        //     const params = new Array<Param>();

        //     params.push(new Param('masterTypeIds', this.masterType != null ? this.masterType.id.toString() : null));

        //     this.typeList.refresh(params);
        //     this.typeListModal.show();
        // }
        // public setSelectedType() {
        //     const items: Array<Type> = this.typeList.selectedItems;
        //     this.type = ((items != null) && (items.length === 1)) ? items[0] : null;
        //     this.typeListModal.hide();
        // }

        // /*end TYPE */

        //   /*begin SUBTYPE */
        //   public selectSubType() {

        //     const params = new Array<Param>();

        //     params.push(new Param('typeIds', this.type != null ? this.type.id.toString() : null));


        //     this.subTypeList.refresh(params);
        //     this.subTypeListModal.show();
        // }
        // public setSelectedSubType() {
        //     const items: Array<SubType> = this.subTypeList.selectedItems;
        //     this.subType = ((items != null) && (items.length === 1)) ? items[0] : null;
        //     this.subTypeListModal.hide();
        // }

        // /*end asset type*/

            //    /*begin ADMINISTRATION */
            //    public selectAdministration() {

            //     this.administrationList.refresh(null);
            //     this.administrationListModal.show();
            // }
            // public setSelectedAdministration() {
            //     const items: Array<Administration> = this.administrationList.selectedItems;
            //     this.administration = ((items != null) && (items.length === 1)) ? items[0] : null;
            //     this.administrationListModal.hide();
            // }

            // /*end ASSETNATURE *


            //    /*begin COMPANY */
            //    public selectCompany() {

            //     this.companyList.refresh(null);
            //     this.companyListModal.show();
            // }
            // public setSelectedCompany() {
            //     const items: Array<Company> = this.companyList.selectedItems;
            //     this.company = ((items != null) && (items.length === 1)) ? items[0] : null;
            //     this.companyListModal.hide();
            // }

            // /*end COMPANY */

            //    /*begin BUDGETFORECAST */

            //    public selectBudgetForecast() {

            //     this.budgetForecastList.refresh(null);
            //     this.budgetForecastListModal.show();
            // }
            // public setSelectedBudgetForecast() {
            //     const items: Array<BudgetForecast> = this.budgetForecastList.selectedItems;
            //     this.budgetForecast = ((items != null) && (items.length === 1)) ? items[0] : null;

            //     if (this.budgetForecast != null && this.budgetForecast.budgetBase != null && this.budgetForecast.admCenter != null) {
            //         this.admCenter = this.budgetForecast.budgetBase.admCenter;
            //     }

            //     if (this.budgetForecast != null && this.budgetForecast.budgetBase != null && this.budgetForecast.region != null) {
            //         this.region = this.budgetForecast.budgetBase.region;
            //     }

            //     if (this.budgetForecast != null && this.budgetForecast.budgetBase != null && this.budgetForecast.assetType != null) {
            //         this.assetType = this.budgetForecast.budgetBase.assetType;
            //     }

            //     if (this.budgetForecast != null && this.budgetForecast.budgetBase != null && this.budgetForecast.company != null) {
            //         this.company = this.budgetForecast.budgetBase.company;
            //     }
            //     this.budgetForecastListModal.hide();
            // }

            // /*end BUDGETFORECAST */


              /*begin REQUEST */

              public selectRequest() {

                if(this.offerType != null && this.offerType.code === 'O-E') {
                const params = new Array<Param>();
                params.push(new Param('showExisting', 'true'));
                this.requestList.refresh(params);
                this.requestListModal.show();
                } else {
                this.requestList.refresh(null);
                this.requestListModal.show();
                }
            }
            public setSelectedRequest(value) {
                const items: Array<Request> = this.requestList.selectedItems;
                // const items: Array<Request> = value;
                this.request = ((items != null) && (items.length === 1)) ? items[0] : null;

                // if (this.request != null  && this.request.costCenter != null) {
                //     this.costCenter = this.request.costCenter;
                // }

                // if (this.request != null  && this.request.budgetForecast != null) {
                //     this.budgetForecast = this.request.budgetForecast;
                // }

                // if (this.request != null  && this.request.budgetForecast != null && this.request.budgetForecast.budgetBase != null) {
                //     this.budgetBase = this.request.budgetForecast.budgetBase;
                // }

                // if (this.budget != null && this.budget.admCenter != null) {
                //     this.admCenter = this.budget.admCenter;
                // }

                // if (this.budget != null && this.budget.region != null) {
                //     this.region = this.budget.region;
                // }

                // if (this.budget != null && this.budget.assetType != null) {
                //     this.assetType = this.budget.assetType;
                // }

                // if (this.budget != null && this.budget.company != null) {
                //     this.company = this.budget.company;
                // }

                //  if (this.budgetBase != null && this.budgetBase.admCenter != null) {
                //     this.admCenter = this.budgetBase.admCenter;
                // }

                // if (this.budgetBase != null && this.budgetBase.region != null) {
                //     this.region = this.budgetBase.region;
                // }

                // if (this.budgetBase != null && this.budgetBase.assetType != null) {
                //     this.assetType = this.budgetBase.assetType;
                // }

                // if (this.budgetBase != null && this.budgetBase.company != null) {
                //     this.company = this.budgetBase.company;
                // }

                if (this.request != null  && this.request.employee != null) {
                    this.employee = this.request.employee;
                }
                this.requestListModal.hide();


                const params: Array<Param> = new Array<Param>();
                params.push(new Param('requestIds', AppUtils.getIdsList<Request, number>([ this.request != null ? this.request : null ])));

                  setTimeout(() => {
                    if(this.requestBudgetForecastList != undefined){
                      this.requestBudgetForecastList.refresh(params);
                      this.refreshRequestEntityFiles(0);
                    }
                  }, 300);
            }

            /*end REQUEST */

            /*begin OFFER TYPE */

            public selectOfferType() {

              this.offerTypeList.refresh(null);
              this.offerTypeListModal.show();
          }
          public setSelectedOfferType() {
              const items: Array<OfferType> = this.offerTypeList.selectedItems;
              this.offerType = ((items != null) && (items.length === 1)) ? items[0] : null;
              // this.offerType = value;
              this.offerTypeListModal.hide();

              if(this.offerType != null && (this.offerType.code === 'O-V' || this.offerType.code === 'O-C')){
                const params = new Array<Param>();
                params.push(new Param('showAll', 'true'));
                this.partnerHttpService.get(1, 2000, 'name', 'asc', params, null, 'offer').subscribe( (res: any) => {
                  this.availablePartners = [];
                  // console.log(JSON.stringify(res));
                  res.items.forEach(element => {
                      element.isLeftSide = true;
                      this.availablePartners.push(element);
                  });
              });
              }
          }

          /*end OFFER TYPE */


            /*begin OFFER */

            public selectOffer() {

              this.offerList.refresh(null);
              this.offerListModal.show();
          }
          public setSelectedOffer() {
              const items: Array<Offer> = this.offerList.selectedItems;
              // const items: Array<Offer> = value;
              this.offerClone = ((items != null) && (items.length === 1)) ? items[0] : null;

              this.offerListModal.hide();
          }

          /*end OFFER */

            //    /*begin PROJECT */
            //    public selectProject() {

            //     this.projectList.refresh(null);
            //     this.projectListModal.show();
            // }
            // public setSelectedProject() {
            //     const items: Array<Project> = this.projectList.selectedItems;
            //     this.project = ((items != null) && (items.length === 1)) ? items[0] : null;
            //     this.projectListModal.hide();
            // }

            // /*end PROJECT */

                // /*begin ADMCENTER */
                // public selectAdmCenter() {

                //     this.admCenterList.refresh(null);
                //     this.admCenterListModal.show();
                // }
                // public setSelectedAdmCenter() {
                //     const items: Array<AdmCenter> = this.admCenterList.selectedItems;
                //     this.admCenter = ((items != null) && (items.length === 1)) ? items[0] : null;
                //     this.admCenterListModal.hide();
                // }
                // /*end ADMCENTER */

                //  /*begin REGION */
                //  public selectRegion() {

                //     this.regionList.refresh(null);
                //     this.regionListModal.show();
                // }
                // public setSelectedRegion() {
                //     const items: Array<Region> = this.regionList.selectedItems;
                //     this.region = ((items != null) && (items.length === 1)) ? items[0] : null;
                //     this.regionListModal.hide();
                // }
                // /*end REGION */

                //   /*begin ASSETTYPE */
                //   public selectAssetType() {

                //     this.assetTypeList.refresh(null);
                //     this.assetTypeListModal.show();
                // }
                // public setSelectedAssetType() {
                //     const items: Array<AssetType> = this.assetTypeList.selectedItems;
                //     this.assetType = ((items != null) && (items.length === 1)) ? items[0] : null;
                //     this.assetTypeListModal.hide();
                // }
                // /*end PROJECTTYPE */

                //   /*begin PROJECTTYPE */
                //   public selectProjectType() {

                //     this.projectTypeList.refresh(null);
                //     this.projectTypeListModal.show();
                // }
                // public setSelectedProejctType() {
                //     let items: Array<ProjectType> = this.projectTypeList.selectedItems;
                //     this.region = ((items != null) && (items.length === 1)) ? items[0] : null;
                //     this.projectTypeListModal.hide();
                // }
                // /*end PROJECTTYPE */


            //    /*begin INTERCOMPANY */
            //    public selectInterCompany() {

            //     const params = new Array<Param>();

            //     params.push(new Param('partnerIds', this.partner != null ? this.partner.id.toString() : null));

            //     this.interCompanyList.refresh(null);
            //     this.interCompanyListModal.show();
            // }
            // public setSelectedInterCompany() {
            //     const items: Array<InterCompany> = this.interCompanyList.selectedItems;
            //     this.interCompany = ((items != null) && (items.length === 1)) ? items[0] : null;
            //     this.interCompanyListModal.hide();
            // }

            // /*end INTERCOMPANY */

    // /*begin employee*/
    // public selectEmployee() {
    //     this.employeeList.refresh(null);
    //     this.employeeListModal.show();
    // }

    // public setSelectedEmployee() {
    //     const items: Array<Employee> = this.employeeList.selectedItems;
    //     this.employee = ((items != null) && (items.length === 1)) ? items[0] : null;
    //     this.employeeListModal.hide();
    // }
    // /*end employee*/

    //  /*begin AccMonth*/
    //  public selectAccMonth() {
    //     this.accMonthList.refresh(null);
    //     this.accMonthListModal.show();
    // }

    // public setSelectedAccMonth() {
    //     const items: Array<AccMonth> = this.accMonthList.selectedItems;
    //     this.accMonth = ((items != null) && (items.length === 1)) ? items[0] : null;
    //     this.accMonthListModal.hide();
    // }
    // /*end AccMonth */


        // /* begin costcenter */
        // public selectCostCenter() {

        //     this.costCenterList.refresh(null);
        //     this.costCenterListModal.show();
        // }
        // public setSelectedCostCenter() {
        //     const items: Array<CostCenter> = this.costCenterList.selectedItems;
        //     this.costCenter = ((items != null) && (items.length === 1)) ? items[0] : null;
        //     this.costCenterListModal.hide();
        // }
        // /*end costcenter */

    /*begin partner*/
    public selectPartner() {
        this.partnerList.refresh(null);
        this.partnerListModal.show();
    }

    public setSelectedPartner() {
        const items: Array<Partner> = this.partnerList.selectedItems;
         this.partner = ((items != null) && (items.length === 1)) ? items[0] : null;

         this.availablePartners = [];

         items.forEach(element => {
             element.isLeftSide = true;
             this.availablePartners.push(element);
         });
        this.partnerListModal.hide();
    }

    /*end partner*/


        // /*begin Account*/
        // public selectAccount() {
        //     this.accountList.refresh(null);
        //     this.accountListModal.show();
        // }

        // public setSelectedAccount() {
        //     const items: Array<Account> = this.accountList.selectedItems;
        //      this.account = ((items != null) && (items.length === 1)) ? items[0] : null;
        //     this.accountListModal.hide();
        // }

        // /*end Account*/


     public cancelChanges() {
        // this.ngLocation.back();
        this.router.navigate(['/procurement/offer/status']);
    }

    public showTemplate(id: number) {
        // this.ngLocation.back();
        const partner = this.selectedPartners.filter(a => a.id === id);

            if (partner.length > 0) {
                partner[0].headerMsg = this.headerMsg;
            }
    }

    public onDeleteAsset() {
        this.operationType = OperationType.Delete;
        this.confirmationMessage = 'Stergeti inregistrarea curenta?';
        this.confirmationModal.show();
    }

    public deleteAsset() {
        this.offerHttpService.delete(this.offer.id)
            .subscribe(() => this.router.navigate(['/assetdepdetails']));
    }

    public onValidateAsset() {
        this.operationType = OperationType.AssetValidation;
        this.confirmationMessage = 'Validati inregistrarea curenta?';
        this.confirmationModal.show();
    }

    public validateOffer() {
        // this.offer.validated = true;
        this.saveOffer();
    }

    public addNewOperation() {
        // let assets: Array<AssetSimpleDetail> = new Array<AssetSimpleDetail>();
        // assets.push(new AssetSimpleDetail(this.asset.id, this.asset.invNo, this.asset.assetName,
        //     '', this.asset.partner, this.asset.assetType, this.asset.accState, this.asset.usageStartDate, '', ''));
        // AppData.AssetList = assets;
        // this.router.navigate(['/newoperation']);
    }


    // uploadFiles(index: number, guid: string): Observable<boolean> {
    //     const resultSubject = new Subject<boolean>();
    //     this.entityFileHttpService.addOfferFiles(this.filesToUpload[index].files, guid, 'NEWOFFER', this.filesToUpload[index].partnerId).subscribe( (res: any[]) => {
    //       resultSubject.next(true);
    //     }, () => { resultSubject.next(false); }, () => {});
    //     return resultSubject.asObservable();
    //   }

    // saveOffer(): Observable<boolean> {
    //     const resultSubject = new Subject<boolean>();
    //     const guid = Guid.newGuid();

    //     let index = 0;
    //     while (index < this.filesToUpload.length) {
    //       const d = this.filesToUpload.find(a => a.id === this.filesToUpload[index].id);

    //       if (d === undefined) {
    //         // this.filesToUpload.splice(index, 1);
    //         resultSubject.next(false);
    //       } else {
    //         this.entityFileHttpService.addOfferFiles(this.filesToUpload[index].files, guid, 'NEWOFFER', this.filesToUpload[index].partnerId).subscribe( (res: any) => {
    //             if (res === 251615) {
    //                 resultSubject.next(true);
    //             }
    //             index++;
    //           }, () => { resultSubject.next(false); }, () => { });
    //       }
    //     }
    //     return resultSubject.asObservable();
    //   }


    //   saveOffer(): Observable<boolean> {
    //     const resultSubject = new Subject<boolean>();

    //     if (this.filesToUpload.length > 0) {
    //       this.uploadFiles().subscribe(() => {

    //         let index = 0;
    //         while (index < this.filesToUpload.length) {
    //           const d = this.filesToUpload.find(a => a.id === this.filesToUpload[index].id);

    //           if (d === undefined) {
    //             this.filesToUpload.splice(index, 1);
    //           } else {
    //             index++;
    //           }
    //         }
    //         resultSubject.next(true);
    //       });
    //     } else {
    //       setTimeout(() => {
    //         resultSubject.next(true);
    //       }, 10);
    //     }
    //     return resultSubject.asObservable();
    //   }


    public saveOffer() {


        // if (this.filesToUpload.length > 0) {
        //     this.filesToUpload.forEach((element, idx, array) => {
        //         this.uploadFiles(idx, guid).subscribe((res) => {
        //             console.log(res);
        //             if (res) {
        //                 if (idx === (array.length - 1 )) {
        //                     this.isSaved = false;
        //                     this.offer.companyId = this.company != null ? this.company.id : null;
        //                     // this.offer.projectId = this.budget != null && this.budget.project != null ? this.budget.project.id : null;
        //                     this.offer.administrationId = this.administration != null ? this.administration.id : null;
        //                     this.offer.masterTypeId = this.masterType != null ? this.masterType.id : null;
        //                     this.offer.typeId = this.type != null ? this.type.id : null;
        //                     this.offer.subTypeId = this.subType != null ? this.subType.id : null;
        //                     this.offer.employeeId = this.employee != null ? this.employee.id : null;
        //                     this.offer.accMonthId = this.accMonth != null ? this.accMonth.id : null;
        //                     this.offer.interCompanyId = this.interCompany != null ? this.interCompany.id : null;
        //                     this.offer.partnerId = this.partner != null ? this.partner.id : null;
        //                     this.offer.accountId = this.account != null ? this.account.id : null;
        //                     // this.offer.costCenterId = this.costCenter != null ? this.costCenter.id : null;
        //                     this.offer.admCenterId = this.admCenter != null ? this.admCenter.id : null;
        //                     this.offer.regionId = this.region != null ? this.region.id : null;
        //                     // this.offer.assetTypeId = this.assetType != null ? this.assetType.id : null;
        //                     // this.offer.projectTypeId = this.projectType != null ? this.projectType.id : null;
        //                     this.offer.budgetId = this.budget != null ? this.budget.id : null;
        //                     this.offer.budgetBaseId = this.budgetBase != null ? this.budgetBase.id : null;
        //                     this.offer.requestId = this.request != null ? this.request.id : null;
        //                     this.offer.offerTypeId = this.offerType != null ? this.offerType.id : null;
        //                     this.offer.guid = guid;
        //                     this.offer.partnerIds = new Array<CodePartnerEntity>();
        //                     // this.selectedPartners.forEach( item => {
        //                     //     if (this.offer.partnerIds.indexOf(item.id) === -1) {
        //                     //         this.offer.partnerIds.push(item.id);
        //                     //     }
        //                     // });
        //                     // this.offer.fileToUpload = this.filesToUpload;
        //                     this.selectedPartners.forEach( item => {
        //                         this.offer.partnerIds.push(new CodePartnerEntity(item.id, item.headerMsg, this.sendTocontactInfo1 ? item.contactInfo : '', this.sendTocontactInfo2 ? item.bank : '', this.sendTocontactInfo3 ? item.bankAccount : ''));
        //                     });
        //                     this.offer.validated = true;
        //                     // if (this.offer.id > 0) {
        //                     //      this.offerHttpService.updateAsset(this.offer)
        //                     //     .subscribe(() => {
        //                     //         this.offerHttpService.getDetailById(this.offer.id)
        //                     //             .subscribe((asset: any) => {
        //                     //                 if (asset != null){
        //                     //                     // alert('Datele au fost modificate cu succes!');
        //                     //                     this.notificationService.showSuccess('Datele au fost salvate!', 'Oferta noua');
        //                     //                     this.isSaved = true;
        //                     //                     this.updateDetails(asset);
        //                     //                     this.refreshAssetOperations();
        //                     //                 }
        //                     //             }, (error) => {
        //                     //                 // alert('Erosre la salvarea datelor!');
        //                     //                 this.notificationService.showError('Eroare la salvarea datelor!', 'Tichet nou');
        //                     //             });
        //                     //     }, (error) => {
        //                     //         // alert('Eroare server!');
        //                     //         this.notificationService.showError('Eroare server!', 'Tichet nou');
        //                     //     });
        //                     // } else {
        //                     // }
        //                     this.offerHttpService.addNewOffer(this.offer)
        //                     .subscribe((assetId: number) => {
        //                     if (assetId > 0) {
        //                         this.id = assetId;
        //                         // alert('Datele au fost salvate!');
        //                         this.notificationService.showSuccess('Datele au fost salvate!', 'Oferta noua');
        //                         this.router.navigate(['procurement/offer/status']);
        //                         // this.refreshAssetOperations();
        //                         }
        //                      });
        //                     }
        //             }
        //         });
        // });
        // } else {
        //     this.isSaved = false;
        //     this.offer.companyId = this.company != null ? this.company.id : null;
        //     // this.offer.projectId = this.budget != null && this.budget.project != null ? this.budget.project.id : null;
        //     this.offer.administrationId = this.administration != null ? this.administration.id : null;
        //     this.offer.masterTypeId = this.masterType != null ? this.masterType.id : null;
        //     this.offer.typeId = this.type != null ? this.type.id : null;
        //     this.offer.subTypeId = this.subType != null ? this.subType.id : null;
        //     this.offer.employeeId = this.employee != null ? this.employee.id : null;
        //     this.offer.accMonthId = this.accMonth != null ? this.accMonth.id : null;
        //     this.offer.interCompanyId = this.interCompany != null ? this.interCompany.id : null;
        //     this.offer.partnerId = this.partner != null ? this.partner.id : null;
        //     this.offer.accountId = this.account != null ? this.account.id : null;
        //     // this.offer.costCenterId = this.costCenter != null ? this.costCenter.id : null;
        //     this.offer.admCenterId = this.admCenter != null ? this.admCenter.id : null;
        //     this.offer.regionId = this.region != null ? this.region.id : null;
        //     // this.offer.assetTypeId = this.assetType != null ? this.assetType.id : null;
        //     // this.offer.projectTypeId = this.projectType != null ? this.projectType.id : null;
        //     this.offer.budgetId = this.budget != null ? this.budget.id : null;
        //     this.offer.budgetBaseId = this.budgetBase != null ? this.budgetBase.id : null;
        //     this.offer.requestId = this.request != null ? this.request.id : null;
        //     this.offer.offerTypeId = this.offerType != null ? this.offerType.id : null;
        //     this.offer.guid = guid;
        //     this.offer.partnerIds = new Array<CodePartnerEntity>();
        //     // this.selectedPartners.forEach( item => {
        //     //     if (this.offer.partnerIds.indexOf(item.id) === -1) {
        //     //         this.offer.partnerIds.push(item.id);
        //     //     }
        //     // });
        //     // this.offer.fileToUpload = this.filesToUpload;
        //     this.selectedPartners.forEach( item => {
        //         this.offer.partnerIds.push(new CodePartnerEntity(item.id, item.headerMsg, this.sendTocontactInfo1 ? item.contactInfo : '', this.sendTocontactInfo2 ? item.bank : '', this.sendTocontactInfo3 ? item.bankAccount : ''));
        //     });
        //     this.offer.validated = true;
        //     // if (this.offer.id > 0) {
        //     //      this.offerHttpService.updateAsset(this.offer)
        //     //     .subscribe(() => {
        //     //         this.offerHttpService.getDetailById(this.offer.id)
        //     //             .subscribe((asset: any) => {
        //     //                 if (asset != null){
        //     //                     // alert('Datele au fost modificate cu succes!');
        //     //                     this.notificationService.showSuccess('Datele au fost salvate!', 'Oferta noua');
        //     //                     this.isSaved = true;
        //     //                     this.updateDetails(asset);
        //     //                     this.refreshAssetOperations();
        //     //                 }
        //     //             }, (error) => {
        //     //                 // alert('Erosre la salvarea datelor!');
        //     //                 this.notificationService.showError('Eroare la salvarea datelor!', 'Tichet nou');
        //     //             });
        //     //     }, (error) => {
        //     //         // alert('Eroare server!');
        //     //         this.notificationService.showError('Eroare server!', 'Tichet nou');
        //     //     });
        //     // } else {
        //     // }
        //     this.offerHttpService.addNewOffer(this.offer)
        //     .subscribe((assetId: number) => {
        //     if (assetId > 0) {
        //         this.id = assetId;
        //         // alert('Datele au fost salvate!');
        //         this.notificationService.showSuccess('Datele au fost salvate!', 'Oferta noua');
        //         this.router.navigate(['procurement/offer/status']);
        //         // this.refreshAssetOperations();
        //                 }
        //             });
        // }

        this.isSaved = false;
            // this.offer.companyId = this.company != null ? this.company.id : null;
            // this.offer.projectId = this.budget != null && this.budget.project != null ? this.budget.project.id : null;
            // this.offer.administrationId = this.administration != null ? this.administration.id : null;
            // this.offer.masterTypeId = this.masterType != null ? this.masterType.id : null;
            // this.offer.typeId = this.type != null ? this.type.id : null;
            // this.offer.subTypeId = this.subType != null ? this.subType.id : null;
            this.offer.employeeId = this.employee != null ? this.employee.id : null;
            // this.offer.accMonthId = this.accMonth != null ? this.accMonth.id : null;
            // this.offer.interCompanyId = this.interCompany != null ? this.interCompany.id : null;
            // this.offer.partnerId = this.partner != null ? this.partner.id : null;
            // this.offer.accountId = this.account != null ? this.account.id : null;
            // this.offer.costCenterId = this.costCenter != null ? this.costCenter.id : null;
            // this.offer.admCenterId = this.admCenter != null ? this.admCenter.id : null;
            // this.offer.regionId = this.region != null ? this.region.id : null;
            // this.offer.assetTypeId = this.assetType != null ? this.assetType.id : null;
            // this.offer.projectTypeId = this.projectType != null ? this.projectType.id : null;
            // this.offer.budgetForecastId = this.budgetForecast != null ? this.budgetForecast.id : null;
            // this.offer.budgetBaseId = this.budgetBase != null ? this.budgetBase.id : null;
            this.offer.requestId = this.request != null ? this.request.id : null;
            this.offer.offerCloneId = this.offerClone != null ? this.offerClone.id : null;
            this.offer.offerTypeId = this.offerType != null ? this.offerType.id : null;
            this.offer.guid = this.guid;
            this.offer.partnerIds = new Array<CodePartnerEntity>();
            // this.selectedPartners.forEach( item => {
            //     if (this.offer.partnerIds.indexOf(item.id) === -1) {
            //         this.offer.partnerIds.push(item.id);
            //     }
            // });
            // this.offer.fileToUpload = this.filesToUpload;
            this.selectedPartners.forEach( item => {
                 let entityFiles = new Array<EntityFile>();

                for (let index = 0; index < item.entityFiles.length; index++) {
                  const element = item.entityFiles[index];
                  if(element.selected){
                    entityFiles.push(element);
                  }
                }

                this.offer.partnerIds.push(new CodePartnerEntity(
                  item.id,
                  item.headerMsg,
                  this.sendTocontactInfo1 ? item.contactInfo : '',
                  this.sendTocontactInfo2 ? item.bank : '',
                  this.sendTocontactInfo3 ? item.bankAccount : '',  entityFiles));
            });
            // this.offer.validated = true;
            // if (this.offer.id > 0) {
            //      this.offerHttpService.updateAsset(this.offer)
            //     .subscribe(() => {
            //         this.offerHttpService.getDetailById(this.offer.id)
            //             .subscribe((asset: any) => {
            //                 if (asset != null){
            //                     // alert('Datele au fost modificate cu succes!');
            //                     this.notificationService.showSuccess('Datele au fost salvate!', 'Oferta noua');
            //                     this.isSaved = true;
            //                     this.updateDetails(asset);
            //                     this.refreshAssetOperations();
            //                 }
            //             }, (error) => {
            //                 // alert('Erosre la salvarea datelor!');
            //                 this.notificationService.showError('Eroare la salvarea datelor!', 'Tichet nou');
            //             });
            //     }, (error) => {
            //         // alert('Eroare server!');
            //         this.notificationService.showError('Eroare server!', 'Tichet nou');
            //     });
            // } else {
            // }
          this.offerHttpService.addNewOffer(this.offer)
          .subscribe((result: OfferResult) => {
              if (result.success) {
                this.notificationService.showSuccess(result.message, 'Oferta noua', 0, false, 0);
                this.router.navigate(['procurement/offer/status']);
              } else if (!result.success) {
                  this.notificationService.showWarning('Motiv: ' + result.message + '!', 'Oferta noua', 0, false, 0);
                  this.router.navigate(['procurement/offer/status']);
                  // this.isSaved = true;
              }
          });
    }

    public onConfirmationApproved() {

        switch (this.operationType) {
            case OperationType.AssetValidation:
                this.validateOffer();
                break;
            case OperationType.Delete:
                this.deleteAsset();
                break;
            case OperationType.ProcessAssetOp:
                this.processAssetOp();
                break;
            default:
                break;
        }

        this.operationType = OperationType.NotSet;
        this.confirmationModal.hide();
    }

    public onConfirmationCanceled() {
        this.operationType = OperationType.NotSet;
        this.confirmationModal.hide();
    }

    public onAssetOpDetailListSelectionChanged(assetOpDetails: Array<any>) {
        this.selectedAssetOp = this.offerOpList.selectedItem;
    }

    public onEntityFileListSelectionChanged(entityFiles: Array<EntityFile>) {
        this.entityFile = ((entityFiles != null) && (entityFiles.length === 1)) ? entityFiles[0] : null;
    }

    public onEntityFileRequestListSelectionChanged(entityFiles: Array<EntityFile>) {
      this.entityFileRequest = ((entityFiles != null) && (entityFiles.length === 1)) ? entityFiles[0] : null;
  }

  public onEntityFileOfferUIListSelectionChanged(entityFiles: Array<EntityFile>) {
    this.entityFileOfferUI = ((entityFiles != null) && (entityFiles.length === 1)) ? entityFiles[0] : null;
}

  public refreshRequestEntityFiles(partnerId: number){
    const params: Array<Param> = new Array<Param>();

    params.push(new Param('entityTypeCode', this.entityTypeRequestCode));
    params.push(new Param('entityId', this.selectedRequestBudgetForecasts.length > 0 ? this.selectedRequestBudgetForecasts[0].id.toString() : this.request != null ? this.request.id.toString() : null));
    params.push(new Param('partnerId', partnerId.toString()));
    params.push(new Param('guid', this.guid));

    if(this.entityFileRequestList != undefined){
      this.entityFileRequestList.refresh(params);
    }
  }

  public refreshOfferUIEntityFiles(partnerId: number){
    const params: Array<Param> = new Array<Param>();
    params.push(new Param('entityTypeCode', this.entityTypeOfferUICode));
    params.push(new Param('entityId', '0'));
    params.push(new Param('guid', this.guid));
    params.push(new Param('partnerId', partnerId.toString()));

    if(this.entityFileOfferUIList != undefined){
      this.entityFileOfferUIList.refresh(params);
    }
  }

    public showReport() {
        let reportType = '';
        let validReport = false;

        if (this.selectedAssetOp != null) {
           console.log('TIP DOCUMENT: ', this.selectedAssetOp.documentType.code);
            // switch(this.selectedAssetOp.documentTypeCode) {
                switch (this.selectedAssetOp.documentType.code) {
                case AppConfig.DOCUMENT_TYPE_TRANSFER:
                    reportType = 'movementproviding';
                    validReport = true;
                    break;
                case AppConfig.DOCUMENT_TYPE_CASS:
                    reportType = 'annulement';
                    validReport = true;
                    break;
                case AppConfig.DOCUMENT_TYPE_INVENTORY:
                    reportType = 'movementproviding';
                    validReport = true;
                    break;
                default:
                    break;
            }

            if (validReport) {
                // window.open(`${AppConfig.reportingServer}Report.aspx/?report=${reportType}&documentId=${this.selectedAssetOp.documentId}`);
               console.log(this.selectedAssetOp);
                if (AppConfig.DOCUMENT_TYPE_INVENTORY) {
                    window.open(`${AppConfig.reportingServer}Report.aspx/?report=${reportType}&documentId=${this.selectedAssetOp.document.id}&assetOpId=${this.selectedAssetOp.id}`);
                } else {
                    window.open(`${AppConfig.reportingServer}Report.aspx/?report=${reportType}&documentId=${this.selectedAssetOp.document.id}`);
                }
            }
        }
    }

    public parseDate(dateString: string): Date {
        if (dateString) {
            return new Date(dateString);
        } else {
            return null;
        }
    }

    public onProcessAssetOp() {
        this.operationType = OperationType.ProcessAssetOp;
        this.confirmationMessage = 'Procesati operatia selectata?';
        this.confirmationModal.show();
    }

    public processAssetOp() {
        this.offerOpHttpService.process(this.offerOpList.selectedItem.id).subscribe((data) => {
            // this.refreshAssetOperations();
        });
    }

    public sendBookEmail() {
        this.selectedPartners.forEach( item => {
            if (this.selectedPartnerIds.indexOf(item.id)  === -1) {
                this.selectedPartnerIds.push(item.id);
            }
        });
        this.offerHttpService.sendBookEmail(this.id, this.selectedPartnerIds) .subscribe((res) => {
            if (res === true) {
                alert('Mailul a fost trimis cu success!');
            } else if (res === false) {
                alert('Eroare trimitere mail');
            }
        }, (error) => {
            alert('Server error!!');
        });
    }

    public sendBookEmailPreview() {
      this.offerHttpService.sendBookEmailPreview(this.id).subscribe((res) => {
          this.message = res;
      }, (error) => {
        alert('Server error!!');
      });
  }

  public changeTab(type, e) {
    if (type === 'furnizori') {
        // this.showComponent = true;
        this.partnerHttpService.get(1, 200, 'name', 'asc', [], null, 'offer').subscribe( (res: any) => {
            this.availablePartners = [];
            // console.log(JSON.stringify(res));
            res.items.forEach(element => {
                element.isleftSide = true;
                this.availablePartners.push(element);
            });
        });
    } else {
        // this.showComponent = false;
    }

 }

 drop(event: CdkDragDrop<Partner[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  selectFile(event: any, id: number): void {
    // if (event.target.files && event.target.files[0]) {
    //   const file: File = event.target.files[0];
    //   this.currentFile = file;
    //   this.fileName = this.currentFile.name;
    // } else {
    //   this.fileName = 'Select File';
    // }

    // const fi = this.fileInput.nativeElement;

    // const fi = event.target;
    // Array.from(fi.files).forEach(offerUpload => {
    //     const of = new OfferUpload();
    //     of.files = new Array<FormData>();
    //     of.partnerId = id;
    //     of.files.push(offerUpload);
    //     this.filesToUpload.push(of);
    // });

    // const fi = this.fileInput.nativeElement;
    // Array.from(fi.files).forEach(fileUpload => {
    //     // const addAssetUpload = new AddAssetUpload();
    //     // addAssetUpload.files = new Array<any>();
    //     // addAssetUpload.files.push(file);
    //     // this.filesToUpload.push(addAssetUpload);
    //     // console.log(JSON.stringify(fi.files));
    //     this.filesToUpload.push(fileUpload);
    // });
  }

  /*begin partner*/
  public selectPartners() {
    this.partnerListModal.show();
    this.partnerList.selectedItems = this.selectedPartners;
    this.partnerList.refresh(null);
  }

  public removeFromPartnerSelection(partner: Partner) {
    const index: number = this.selectedPartners.indexOf(partner);
    this.selectedPartners.splice(index, 1);
  }

  public clearPartnerSelection() {
    this.selectedPartners = new Array<Partner>();

    this.partnerHttpService.get(1, 200, 'name', 'asc', [], null, 'offer').subscribe( (res: any) => {
        this.availablePartners = [];
        // console.log(JSON.stringify(res));
        res.items.forEach(element => {
            element.isleftSide= true;
            this.availablePartners.push(element);
        });
    });
  }

  public setSelectedPartners() {
    this.selectedPartners = this.partnerList.selectedItems;
    this.availablePartners = [];
    this.selectedPartners.forEach(element => {
        element.isLeftSide = true;
        this.availablePartners.push(element);
    });
    this.partnerListModal.hide();
  }
  /*end partner*/

  checkContact1(event) {
    console.log(event.checked);
    this.sendTocontactInfo1 = event.checked;
    }

checkContact2(event) {
    console.log(event.checked);
    this.sendTocontactInfo2 = event.checked;
    }

checkContact3(event) {
    console.log(event.checked);
    this.sendTocontactInfo3 = event.checked;
    }

    onAssetDocumentFileUpload() {
      const requestBudgetForecastId = this.selectedRequestBudgetForecasts.length > 0 ? this.selectedRequestBudgetForecasts[0].id : 0;
      const dialogRef = this.dialog.open(UploadRequestBudgetForecastModalComponent, {
        panelClass: 'centered-middle-modal', height: '80%', maxHeight: '80%', disableClose: true, width: '600px', position: { bottom: '15%', top: 'auto'},
        data: { uploadType: 'REQUEST_BUDGET_FORECAST', uploadFolder: 'REQUESTBUDGETFORECAST', entityId: requestBudgetForecastId }
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshRequestEntityFiles(0);
      });
    }

    onOfferDocumentFileUpload(partner: Partner) {
      const dialogRef = this.dialog.open(UploadOfferModalComponent, {
        panelClass: 'centered-middle-modal', height: '80%', maxHeight: '80%', disableClose: true, width: '600px', position: { bottom: '15%', top: 'auto'},
        data: { uploadType: 'OFFERUI_DOCUMENT', uploadFolder: 'OFFERUI', assetId: partner.id, guid: this.guid, requestId: this.request != null ? this.request.id : null }
      });
      dialogRef.afterClosed().subscribe(() => {
        // this.refreshOfferUIEntityFiles(partnerId);
        this.selectedPartners.forEach(item => {
          // // console.log('ID-->' +item.id + '|' + partner.id);
          // if(item.id == partner.id){
          //     item.filesCount++;
          // }

          item.entityFiles = new Array<EntityFile>();

          this.entityFileHttpService.getByEntity('REQUEST_BUDGET_FORECAST', this.request != null ? this.request.id : 0, this.guid, item.id).subscribe( (res) => {
              if(res.length > 0){
                // for (let index = 0; index < res.length; index++) {
                //   const e = res[index];
                // }
                item.entityFiles.push(...res);
              }
          })
        });

        this.refreshRequestEntityFiles(partner.id);
      });
    }

    public setSelectedItem(reqBF: Array<any>) {

      let params: Array<Param> = new Array<Param>();

      if (this.requestBudgetForecastList != null) {

        this.selectedRequestBudgetForecasts = new Array<any>();
        this.requestBudgetForecastList.selectedItems.forEach((requestBGF) => {
            this.selectedRequestBudgetForecasts.push(requestBGF);
        });

        this.refreshRequestEntityFiles(0);
      }
      }

      updatePartnerEntityFiles(event, entityFileId: number) {
        // console.log(event);
        // console.log(entityFileId);
        // this.entityFileHttpService.updateSkipEntityFile(event.checked, entityFileId).subscribe( (res: EntityFileResult)=> {
        //   if(res.success){
        //     this.notificationService.showSuccess(res.message, 'Update', 2000, false, 2000);
        //       for (let idx = 0; idx < this.selectedPartners.length; idx++) {
        //           for (let index = 0; index < this.selectedPartners[idx].entityFiles.length; index++) {
        //             const ef = this.selectedPartners[idx].entityFiles[index];
        //             if(ef.id == entityFileId){
        //               ef.selected = event.checked;
        //             }
        //           }
        //       }
        //   } else {
        //     this.notificationService.showError(res.message, 'Update', 2000, false, 2000);
        //     for (let idx = 0; idx < this.selectedPartners.length; idx++) {
        //       for (let index = 0; index < this.selectedPartners[idx].entityFiles.length; index++) {
        //         const ef = this.selectedPartners[idx].entityFiles[index];
        //         if(ef.id == entityFileId){
        //           ef.selected = !event.checked;
        //         }
        //       }
        //   }
        //   }
        // }, (err)=> {
        //   this.notificationService.showError('Eroare server', 'Update', 2000, false, 2000);
        //   for (let idx = 0; idx < this.selectedPartners.length; idx++) {
        //     for (let index = 0; index < this.selectedPartners[idx].entityFiles.length; index++) {
        //       const ef = this.selectedPartners[idx].entityFiles[index];
        //       if(ef.id == entityFileId){
        //         ef.selected = !event.checked;
        //       }
        //     }
        // }
        // })
        }
}

enum OperationType {
    NotSet = 1,
    AssetValidation = 2,
    Delete = 3,
    ProcessAssetOp = 4
}

class Guid {
    static newGuid() {
      return 'xxxxxxxx-xxxx-3xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0,
          v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
  }
