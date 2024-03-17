import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Param } from '../../../model/common/param';
import { EmployeeHttpService } from '../../../services/http/administration/employee.http.service';
import { PartnerHttpService } from '../../../services/http/documents/partner.http.service';
import { Employee } from '../../../model/api/administration/employee';
import { Partner } from '../../../model/api/documents/partner';
import { AdministrationHttpService } from '../../../services/http/administration/administration.http.service';
import { CostCenterHttpService } from '../../../services/http/administration/cost-center.http.service';
import { MasterTypeHttpService } from '../../../services/http/assets/master-type.http.service';
import { EntityFileHttpService } from '../../../services/http/common/entity-file.http.service';
import { AccMonthHttpService } from '../../../services/http/accounting/acc-month.http.service';
import { MasterTypeListComponent } from '../../assets/master-types/master-type.list';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { EmployeeListComponent } from '../employees/employee.list';
import { AccMonthListComponent } from '../../accounting/acc-month.list';
import { PartnerListComponent } from '../../documents/partners/partner.list';
import { CostCenterListComponent } from '../cost-centers/cost-center.list';
import { AdministrationListComponent } from '../administrations/administration.list';
import { CompanyListComponent } from '../../assets/companies/company.list';
import { EntityFileListComponent } from '../../common/entity-file.list';
import { EntityFile } from '../../../model/api/common/entity-file';
import { BudgetSave } from '../../../model/api/administration/budget-save';
import { CodeNameEntity } from '../../../model/api/common/code-name-entity';
import { EmployeeResource } from '../../../model/api/administration/employee-resource';
import { CodePartnerEntity } from '../../../model/api/common/code-partner-entity';
import { AppData } from '../../../app-data';
import { BudgetHttpService } from '../../../services/http/administration/budget.http.service';
import { CompanyHttpService } from '../../../services/http/assets/company.http.service';
import { MasterType } from '../../../model/api/assets/master-type';
import { Administration } from '../../../model/api/administration/administration';
import { Company } from '../../../model/api/assets/company';
import { Project } from '../../../model/api/assets/project';
import { InterCompany } from '../../../model/api/assets/inter-company';
import { AccMonth } from '../../../model/api/accounting/acc-month';
import { CostCenter } from '../../../model/api/administration/cost-center';
import { Account } from '../../../model/api/administration/account';
import { AppConfig } from '../../../config';
import { SubType } from '../../../model/api/administration/sub-type';
import { Type } from '../../../model/api/administration/type';
import { MonthEntity } from '../../../model/api/common/month-entity';
import { BudgetOpHttpService } from '../../../services/http/administration/budget-op.http.service';
import { InterCompanyHttpService } from '../../../services/http/assets/inter-company.http.service';
import { ProjectHttpService } from '../../../services/http/assets/project.http.service';
import { SubTypeHttpService } from '../../../services/http/administration/sub-type.http.service';
import { TypeHttpService } from '../../../services/http/administration/type.http.service';
import { AccountHttpService } from '../../../services/http/administration/account.http.service';
import { TypeList } from '../types/type.list';
import { SubTypeList } from '../sub-types/sub-type.list';
import { AccountList } from '../account/account.list';
import { ProjectList } from '../../assets/projects/project.list';
import { InterCompanyListComponent } from '../../assets/inter-companies/inter-company.list';
import { BudgetOpDetailList } from '../budget-ops/budget-op.detail.list';


@Component({
    selector: 'budget-detail-ui',
    templateUrl: 'budget.detail.ui.html',
    styleUrls: ['budget.detail.ui.scss'],
    providers: [
        AdministrationHttpService,
        CostCenterHttpService,
        MasterTypeHttpService,
        EntityFileHttpService,
        EmployeeHttpService,
        AccMonthHttpService,
        PartnerHttpService ]
})
export class BudgetDetailUI  {

    @ViewChild('masterTypeList') public masterTypeList: MasterTypeListComponent;
    @ViewChild('masterTypeListModal') public masterTypeListModal: ModalDirective;

    @ViewChild('typeList') public typeList: TypeList;
    @ViewChild('typeListModal') public typeListModal: ModalDirective;

    @ViewChild('subTypeList') public subTypeList: SubTypeList;
    @ViewChild('subTypeListModal') public subTypeListModal: ModalDirective;

    @ViewChild('employeeList') public employeeList: EmployeeListComponent;
    @ViewChild('employeeListModal') public employeeListModal: ModalDirective;

    @ViewChild('accMonthList') public accMonthList: AccMonthListComponent;
    @ViewChild('accMonthListModal') public accMonthListModal: ModalDirective;

    @ViewChild('partnerList') public partnerList: PartnerListComponent;
    @ViewChild('partnerListModal') public partnerListModal: ModalDirective;

    @ViewChild('accountList') public accountList: AccountList;
    @ViewChild('accountListModal') public accountListModal: ModalDirective;

    @ViewChild('costCenterList') public costCenterList: CostCenterListComponent;
    @ViewChild('costCenterListModal') public costCenterListModal: ModalDirective;

    @ViewChild('administrationList') public administrationList: AdministrationListComponent;
    @ViewChild('administrationListModal') public administrationListModal: ModalDirective;

    @ViewChild('companyList') public companyList: CompanyListComponent;
    @ViewChild('companyListModal') public companyListModal: ModalDirective;

    @ViewChild('projectList') public projectList: ProjectList;
    @ViewChild('projectListModal') public projectListModal: ModalDirective;

    @ViewChild('interCompanyList') public interCompanyList: InterCompanyListComponent;
    @ViewChild('interCompanyListModal') public interCompanyListModal: ModalDirective;

    @ViewChild('budgetOpDetailList') public budgetOpList: BudgetOpDetailList;
    @ViewChild('entityFileList') public entityFileList: EntityFileListComponent;

    @ViewChild('confirmationModal') public confirmationModal: ModalDirective;
    @ViewChild('fileInput') fileInput;

    public entityTypeCode: string = 'BUDGET';
    public entityFile: EntityFile = null;
    public confirmationMessage: string = '';
    public operationType: OperationType = OperationType.NotSet;


    public id: number = 0;
    public budget: BudgetSave = new BudgetSave();
    public filesToUpload: Array<File>;
    public selectedAssetOp: any;
    public isSaved: boolean = true;

    public get allowSaving(): boolean {
        return this.budget != null &&
        // this.budget.quantity > 0 &&
        // this.budget.valueIni > 0 &&
        // this.budget.valueFin > 0 &&
        this.company != null &&
        this.project != null &&
        this.administration != null &&
        this.masterType != null &&
        this.type != null &&
        this.subType != null &&
        this.employee != null &&
        this.accMonth != null &&
        this.interCompany != null &&
        this.partner != null &&
        this.account != null &&
        this.costCenter != null
    }

    public costCenter: CodeNameEntity = null;
    public employee: Employee = null;
    public accMonth: AccMonth = null;
    public company: CodeNameEntity = null;
    public account: CodeNameEntity = null;
    public partner: CodePartnerEntity = null;
    public masterType: CodeNameEntity = null;
    public project: CodeNameEntity = null;
    public interCompany: CodeNameEntity = null;
    public type: CodeNameEntity = null;
    public subType: CodeNameEntity = null;
    public administration: CodeNameEntity = null;

    public readOnlyForm: boolean = false;
    public get isAdmin(): boolean { return AppData.UserIsAdmin; }

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public budgetHttpService: BudgetHttpService,
        public masterTypeHttpService: MasterTypeHttpService,
        public accountHttpService: AccountHttpService,
        public typeHttpService: TypeHttpService,
        public subTypeHttpService: SubTypeHttpService,
        public accMonthHttpService: AccMonthHttpService,
        public employeeHttpService: EmployeeHttpService,
        public costCenterHttpService: CostCenterHttpService,
        public projectHttpService: ProjectHttpService,
        public companyHttpService: CompanyHttpService,
        public interCompanyHttpService: InterCompanyHttpService,
        public budgetOpHttpService: BudgetOpHttpService,
        public partnerHttpService: PartnerHttpService,
        public administrationHttpService: AdministrationHttpService,
        public entityFileHttpService: EntityFileHttpService) {
        this.route.params.subscribe((params: Params) => {
            if (params['id']) {
                this.id = +params['id'];
            }
        });
    }

    ngAfterViewInit() {
        // if ((this.assetFullDetail !== null) && (this.assetFullDetail.id === 0)) this.refreshDocumentTypes();
        if (this.id > 0) {
            this.budgetHttpService.getDetailById(this.id)
                .subscribe((asset: any) => {
                    // this.asset = asset;
                       this.updateDetails(asset);

                    if (asset.validated) {
                        this.refreshAssetOperations();
                        this.refreshEntityFiles();
                    }
                    else {
                       // this.refreshAssetTypes();
                       // this.refreshDocumentTypes();
                    }
                });
        }
    }

    public refreshEntityFiles(){
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('entityTypeCode', 'ASSET'));
        params.push(new Param('entityId', this.budget.id.toString()));

        this.entityFileList.refresh(params);
    }

    public refreshAssetOperations(){
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('assetId', this.id.toString()));
        this.budgetOpList.refresh(params);
    }

    public updateDetails(budget: any) {
        this.budget.id = budget.id;
        this.budget.code = budget.code;
        this.budget.name = budget.name;
        // this.budget.companyId = budget.companyId;
        // this.budget.projectId = budget.projectId;
        // this.budget.administrationId = budget.administrationId;
        // this.budget.masterTypeId = budget.masterTypeId;
        // this.budget.typeId = budget.typeId;
        // this.budget.subTypeId = budget.subTypeId;
        // this.budget.employeeId = budget.employeeId;
        // this.budget.accMonthId = budget.accMonthId;
        // this.budget.interCompanyId = budget.interCompanyId;
        // this.budget.partnerId = budget.partnerId;
        // this.budget.accountId = budget.accountId;
        // this.budget.costCenterId = budget.costCenterId;
        // this.budget.valueIni = budget.valueIni;
        // this.budget.valueFin = budget.valueFin;
        // this.budget.quantity = budget.quantity;
        this.budget.info = budget.info;
        this.budget.validated = budget.validated;

        this.company = budget.company;
        this.project = budget.project;
        this.administration = budget.administration;
        this.masterType = budget.masterType;
        this.type = budget.type;
        this.subType = budget.subType;
        this.employee = budget.employee;
        this.accMonth = budget.accMonth;
        this.interCompany = budget.interCompany;
        this.partner = budget.partner;
        this.account = budget.account;
        this.costCenter = budget.costCenter;
    }

           /*begin MASTERTYPE */
           public selectMasterType() {

            this.masterTypeList.refresh(null);
            this.masterTypeListModal.show();
        }

        public setSelectedMasterType() {
            let items: Array<MasterType> = this.masterTypeList.selectedItems;
            this.masterType = ((items != null) && (items.length === 1)) ? items[0] : null;
            this.masterTypeListModal.hide();
        }

        /*end MASTERTYPE */

          /*begin TYPE */
          public selectType() {

            let params = new Array<Param>();

            params.push(new Param('masterTypeIds', this.masterType != null ? this.masterType.id.toString() : null));

            this.typeList.refresh(params);
            this.typeListModal.show();
        }
        public setSelectedType() {
            let items: Array<Type> = this.typeList.selectedItems;
            this.type = ((items != null) && (items.length === 1)) ? items[0] : null;
            this.typeListModal.hide();
        }

        /*end TYPE */

          /*begin SUBTYPE */
          public selectSubType() {

            let params = new Array<Param>();

            params.push(new Param('typeIds', this.type != null ? this.type.id.toString() : null));


            this.subTypeList.refresh(params);
            this.subTypeListModal.show();
        }
        public setSelectedSubType() {
            let items: Array<SubType> = this.subTypeList.selectedItems;
            this.subType = ((items != null) && (items.length === 1)) ? items[0] : null;
            this.subTypeListModal.hide();
        }

        /*end asset type*/

               /*begin ADMINISTRATION */
               public selectAdministration() {

                this.administrationList.refresh(null);
                this.administrationListModal.show();
            }
            public setSelectedAdministration() {
                let items: Array<Administration> = this.administrationList.selectedItems;
                this.administration = ((items != null) && (items.length === 1)) ? items[0] : null;
                this.administrationListModal.hide();
            }

            /*end ASSETNATURE *


               /*begin COMPANY */
               public selectCompany() {

                this.companyList.refresh(null);
                this.companyListModal.show();
            }
            public setSelectedCompany() {
                let items: Array<Company> = this.companyList.selectedItems;
                this.company = ((items != null) && (items.length === 1)) ? items[0] : null;
                this.companyListModal.hide();
            }

            /*end COMPANY */

               /*begin PROJECT */
               public selectProject() {

                this.projectList.refresh(null);
                this.projectListModal.show();
            }
            public setSelectedProject() {
                let items: Array<Project> = this.projectList.selectedItems;
                this.project = ((items != null) && (items.length === 1)) ? items[0] : null;
                this.projectListModal.hide();
            }

            /*end PROJECT */

               /*begin INTERCOMPANY */
               public selectInterCompany() {

                let params = new Array<Param>();

                params.push(new Param('partnerIds', this.partner != null ? this.partner.id.toString() : null));

                this.interCompanyList.refresh(null);
                this.interCompanyListModal.show();
            }
            public setSelectedInterCompany() {
                let items: Array<InterCompany> = this.interCompanyList.selectedItems;
                this.interCompany = ((items != null) && (items.length === 1)) ? items[0] : null;
                this.interCompanyListModal.hide();
            }

            /*end INTERCOMPANY */

    /*begin employee*/
    public selectEmployee() {
        this.employeeList.refresh(null);
        this.employeeListModal.show();
    }

    public setSelectedEmployee() {
        let items: Array<Employee> = this.employeeList.selectedItems;
        this.employee = ((items != null) && (items.length === 1)) ? items[0] : null;
        this.employeeListModal.hide();
    }
    /*end employee*/

     /*begin AccMonth*/
     public selectAccMonth() {
        this.accMonthList.refresh(null);
        this.accMonthListModal.show();
    }

    public setSelectedAccMonth() {
        let items: Array<AccMonth> = this.accMonthList.selectedItems;
        this.accMonth = ((items != null) && (items.length === 1)) ? items[0] : null;
        this.accMonthListModal.hide();
    }
    /*end AccMonth */


        /* begin costcenter */
        public selectCostCenter() {

            this.costCenterList.refresh(null);
            this.costCenterListModal.show();
        }
        public setSelectedCostCenter() {
            let items: Array<CostCenter> = this.costCenterList.selectedItems;
            this.costCenter = ((items != null) && (items.length === 1)) ? items[0] : null;
            this.costCenterListModal.hide();
        }
        /*end costcenter */

    /*begin partner*/
    public selectPartner() {
        this.partnerList.refresh(null);
        this.partnerListModal.show();
    }

    public setSelectedPartner() {
        let items: Array<Partner> = this.partnerList.selectedItems;
         this.partner = ((items != null) && (items.length === 1)) ? items[0] : null;
        this.partnerListModal.hide();
    }

    /*end partner*/


        /*begin Account*/
        public selectAccount() {
            this.accountList.refresh(null);
            this.accountListModal.show();
        }

        public setSelectedAccount() {
            let items: Array<Account> = this.accountList.selectedItems;
             this.account = ((items != null) && (items.length === 1)) ? items[0] : null;
            this.accountListModal.hide();
        }

        /*end Account*/


     public cancelChanges() {
        // this.ngLocation.back();
        this.router.navigate(['/budget'])
    }

    public onDeleteAsset() {
        this.operationType = OperationType.Delete;
        this.confirmationMessage = 'Stergeti inregistrarea curenta?';
        this.confirmationModal.show();
    }

    public deleteAsset() {
        this.budgetHttpService.delete(this.budget.id)
            .subscribe(() => this.router.navigate(['/assetdepdetails']));
    }

    public onValidateAsset() {
        this.operationType = OperationType.AssetValidation;
        this.confirmationMessage = 'Validati inregistrarea curenta?';
        this.confirmationModal.show();
    }

    public validateBudget() {
        this.budget.validated = true;
        this.saveBudget();
    }

    public addNewOperation() {
        // let assets: Array<AssetSimpleDetail> = new Array<AssetSimpleDetail>();
        // assets.push(new AssetSimpleDetail(this.asset.id, this.asset.invNo, this.asset.assetName,
        //     '', this.asset.partner, this.asset.assetType, this.asset.accState, this.asset.usageStartDate, '', ''));
        // AppData.AssetList = assets;
        // this.router.navigate(['/newoperation']);
    }


    public saveBudget() {
        this.isSaved = false;

        // this.budget.companyId = this.company != null ? this.company.id : null;
        // this.budget.projectId = this.project != null ? this.project.id : null;
        // this.budget.administrationId = this.administration != null ? this.administration.id : null;
        // this.budget.masterTypeId = this.masterType != null ? this.masterType.id : null;
        // this.budget.typeId = this.type != null ? this.type.id : null;
        // this.budget.subTypeId = this.subType != null ? this.subType.id : null;
        // this.budget.employeeId = this.employee != null ? this.employee.id : null;
        // this.budget.accMonthId = this.accMonth != null ? this.accMonth.id : null;
        // this.budget.interCompanyId = this.interCompany != null ? this.interCompany.id : null;
        // this.budget.partnerId = this.partner != null ? this.partner.id : null;
        // this.budget.accountId = this.account != null ? this.account.id : null;
        // this.budget.costCenterId = this.costCenter != null ? this.costCenter.id : null;

        this.budget.validated = true;

        if (this.budget.id > 0) {
             this.budgetHttpService.updateAsset(this.budget)
            .subscribe(() => {
                this.budgetHttpService.getDetailById(this.budget.id)
                    .subscribe((asset: any) => {
                        if (asset != null){
                            alert('Datele au fost modificate cu succes!');
                            this.isSaved = true;
                            this.updateDetails(asset);
                        }
                    }, (error) => {
                        alert('Eroare la salvarea datelor!');
                    });
            }, (error) => {
                alert('Eroare server!');
            });
        }
        else {

            this.budgetHttpService.addNewBudget(this.budget)
            .subscribe((assetId: number) => {
                if (assetId > 0){
                    alert('Datele au fost salvate!');
                    this.router.navigate(['/budget', assetId]);
                }
        });
        }
    }

    public onConfirmationApproved() {

        switch (this.operationType) {
            case OperationType.AssetValidation:
                this.validateBudget();
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
        this.selectedAssetOp = this.budgetOpList.selectedItem;
    }

    public onEntityFileListSelectionChanged(entityFiles: Array<EntityFile>) {
        this.entityFile = ((entityFiles != null) && (entityFiles.length === 1)) ? entityFiles[0] : null;
    }

    public showReport() {
        let reportType: string = '';
        let validReport: boolean = false;

        if (this.selectedAssetOp != null) {
           console.log('TIP DOCUMENT: ', this.selectedAssetOp.documentType.code);
            // switch(this.selectedAssetOp.documentTypeCode) {
                switch(this.selectedAssetOp.documentType.code) {
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
                }else{
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
        this.budgetOpHttpService.process(this.budgetOpList.selectedItem.id).subscribe((data) => {
            this.refreshAssetOperations();
        });
    }
}

enum OperationType {
    NotSet = 1,
    AssetValidation = 2,
    Delete = 3,
    ProcessAssetOp = 4
}
