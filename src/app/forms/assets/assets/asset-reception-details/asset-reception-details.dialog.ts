import {AfterViewInit, Component, Inject, ViewChild, ViewContainerRef} from '@angular/core';
import {AssetCategoryDetailComponent} from '../../asset-categories/asset-category.detail';
import {AssetCategoryListComponent} from '../../asset-categories/asset-category.list';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {ProjectList} from '../../projects/project.list';
import {OrderList} from '../../../administrations/order/order.list';
import {BrandList} from '../../brands/brand.list';
import {DictionaryItemDetailComponent} from '../../../administrations/dictionary-item/dictionary-item.detail';
import {DictionaryItemListComponent} from '../../../administrations/dictionary-item/dictionary-item.list';
import {AssetTypeDetailComponent} from '../../asset-types/asset-type.detail';
import {AssetTypeListComponent} from '../../asset-types/asset-type.list';
import {InvStateDetail} from '../../../inventory/inv-state/inv-state.detail';
import {InvStateList} from '../../../inventory/inv-state/inv-state.list';
import {EmployeeDetailComponent} from '../../../administrations/employees/employee.detail';
import {EmployeeListComponent} from '../../../administrations/employees/employee.list';
import {PartnerDetailComponent} from '../../../documents/partners/partner.detail';
import {PartnerListComponent} from '../../../documents/partners/partner.list';
import {CompanyDetailComponent} from '../../companies/company.detail';
import {CompanyListComponent} from '../../companies/company.list';
import {LocationDetailComponent} from '../../../administrations/locations/location.detail';
import {LocationListComponent} from '../../../administrations/locations/location.list';
import {CostCenterListComponent} from '../../../administrations/cost-centers/cost-center.list';
import {UomDetailComponent} from '../../uoms/uom.detail';
import {UomListComponent} from '../../uoms/uom.list';
import {AssetNatureListComponent} from '../../asset-natures/asset-nature.list';
import {DimensionListComponent} from '../../dimensions/dimension.list';
import {RoomDetailComponent as RoomUIDetail} from '../../../administrations/rooms/room.detail';
import {RoomListComponent} from '../../../administrations/rooms/room.list';
import {DepartmentDetailComponent as DepartmentUIDetail} from '../../../administrations/departments/department.detail';
import {DepartmentListComponent} from '../../../administrations/departments/department.list';
import {DimensionDetailComponent} from '../../dimensions/dimension.detail';
import {AdministrationDetailComponent} from '../../../administrations/administrations/administration.detail';
import {AdministrationListComponent} from '../../../administrations/administrations/administration.list';
import {DivisionListComponent} from '../../../administrations/divisions/division.list';
import {CountryListComponent} from '../../../administrations/countries/country.list';
import {CountyListComponent} from '../../../administrations/counties/county.list';
import {CityListComponent} from '../../../administrations/cities/city.list';
import {BudgetManagerList} from '../../../administrations/budget-manager/budget-manager.list';
import {TypeList} from '../../../administrations/types/type.list';
import {MaterialList} from '../../../administrations/materials/material.list';
import {SubTypeList} from '../../../administrations/sub-types/sub-type.list';
import {AdmCenterListComponent} from '../../../administrations/adm-centers/adm-center.list';
import {RegionListComponent} from '../../../administrations/regions/region.list';
import {AssetClassListComponent} from '../../asset-classes/asset-class.list';
import {AssetOpDetailListComponent} from '../../asset-ops/asset-op.detail.list';
import {EntityFileListComponent} from '../../../common/entity-file.list';
import {AssetTypeDropDownListComponent} from '../../asset-types/asset-type.drop-down.list';
import {RequestBudgetForecastListComponent} from '../../../administrations/request-budget-forecasts/request-budget-forecast.list';
import {RequestBudgetForecastMaterialListComponent} from '../../../administrations/request-budget-forecast-materials/request-budget-forecast-material.list';
import {RequestBudgetForecastMaterialCostCenterListComponent} from '../../../administrations/request-budget-forecast-material-cost-centers/request-budget-forecast-material-cost-center.list';
import {EntityFile} from '../../../../model/api/common/entity-file';
import {AppConfig} from '../../../../config';
import {AssetCategory} from '../../../../model/api/assets/asset-category';
import {Location} from '../../../../model/api/administration/location';
import {AddAsset} from '../../../../model/api/assets/add-asset';
import {CodeNameEntity} from '../../../../model/api/common/code-name-entity';
import {Project} from '../../../../model/api/assets/project';
import {Order} from '../../../../model/api/administration/order';
import {Brand} from '../../../../model/api/assets/brand';
import {Uom} from '../../../../model/api/assets/uom';
import {AssetNature} from '../../../../model/api/assets/asset-nature';
import {Employee} from '../../../../model/api/administration/employee';
import {Dimension} from '../../../../model/api/administration/dimension';
import {CodePartnerEntity} from '../../../../model/api/common/code-partner-entity';
import {Room} from '../../../../model/api/administration/room';
import {AppData} from '../../../../app-data';
import {RequestBudgetForecastMaterialCostCenterUpdate} from '../../../../model/api/requests/request-budget-forecast-material-cost-center-update';
import {RequestBudgetForecastMaterialCostCenterMultiple} from '../../../../model/api/requests/request-budget-forecast-material-cost-center-multiple';
import {Location as NgLocation} from '@angular/common';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { Param } from '../../../../model/common/param';
import {AssetHttpService } from '../../../../services/http/assets/asset.http.service';
import { AssetCategoryHttpService } from '../../../../services/http/assets/asset-category.http.service';
import {ProjectHttpService} from '../../../../services/http/assets/project.http.service';
import {OrderHttpService} from '../../../../services/http/administration/order.http.service';
import {BrandHttpService} from '../../../../services/http/assets/brand.http.service';
import {DictionaryItemHttpService} from '../../../../services/http/administration/dictionary-item.http.service';
import {InvStateHttpService} from '../../../../services/http/inventory/inv-state.http.service';
import {AssetClassHttpService} from '../../../../services/http/assets/asset-class.http.service';
import {DivisionHttpService} from '../../../../services/http/administration/division.http.service';
import {CountryHttpService} from '../../../../services/http/administration/contry.http.service';
import {CountyHttpService} from '../../../../services/http/administration/county.http.service';
import {CityHttpService} from '../../../../services/http/administration/city.http.service';
import {BudgetManagerHttpService} from '../../../../services/http/administration/budget-manager.http.service';
import {TypeHttpService} from '../../../../services/http/administration/type.http.service';
import { MaterialHttpService } from '../../../../services/http/administration/material.http.service';
import { SubTypeHttpService } from '../../../../services/http/administration/sub-type.http.service';
import {RegionHttpService} from '../../../../services/http/administration/region.http.service';
import {AdmCenterHttpService} from '../../../../services/http/administration/adm-center.http.service';
import {AssetTypeHttpService} from '../../../../services/http/assets/asset-type.http.service';
import {EmployeeHttpService} from '../../../../services/http/administration/employee.http.service';
import {CostCenterHttpService} from '../../../../services/http/administration/cost-center.http.service';
import {UomHttpService} from '../../../../services/http/assets/uom.http.service';
import {AssetNatureHttpService} from '../../../../services/http/assets/asset-nature.http.service';
import {AssetOpHttpService} from '../../../../services/http/assets/asset-op.http.service';
import {PartnerHttpService} from '../../../../services/http/documents/partner.http.service';
import {CompanyHttpService} from '../../../../services/http/assets/company.http.service';
import {DepartmentHttpService} from '../../../../services/http/administration/department.http.service';
import {DocumentTypeHttpService} from '../../../../services/http/documents/document-type.http.service';
import {DimensionHttpService} from '../../../../services/http/administration/dimension.http.service';
import {RoomDetailHttpService} from '../../../../services/http/administration/room-detail.http.service';
import {LocationHttpService} from '../../../../services/http/administration/location.http.service';
import {AdministrationHttpService} from '../../../../services/http/administration/administration.http.service';
import {RequestBudgetForecastHttpService } from '../../../../services/http/requests/request-budget-forecast.http.service';
import { OrderMaterialHttpService } from '../../../../services/http/administration/order-material.http.service';
import {OfferMaterialHttpService} from '../../../../services/http/administration/offer-material.http.service';
import { RequestBudgetForecastMaterialCostCenterHttpService } from '../../../../services/http/requests/request-budget-forecast-material-cost-center.http.service';
import { EntityFileHttpService } from '../../../../services/http/common/entity-file.http.service';
import {RequestBudgetForecastMaterialHttpService} from '../../../../services/http/requests/request-budget-forecast-material.http.service';
import { NotificationService } from '../../../../services/notification.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';
import { InvState } from '../../../../model/api/inventory/inv-state';
import { RequestFilter } from '../../../../model/api/requests/request.filter';
import { AppUtils } from '../../../../common/app.utils';
import {RequestBudgetForecastMaterial} from '../../../../model/api/requests/request-budget-forecast-material';
import {DictionaryItem} from '../../../../model/api/administration/dictionary-item';
import {AssetType} from '../../../../model/api/assets/asset-type';
import {Administration} from '../../../../model/api/administration/administration';
import {Company} from '../../../../model/api/assets/company';
import {Department} from '../../../../model/api/administration/department';
import {Partner} from '../../../../model/api/documents/partner';
import {CreateAssetSAPResult} from '../../../../model/api/result/create-asset-SAP-result';
import {Division} from '../../../../model/api/administration/division';
import {Country} from '../../../../model/api/assets/customer';
import {City} from '../../../../model/api/administration/city';
import {Material} from '../../../../model/api/administration/material';
import {SubType} from '../../../../model/api/administration/sub-type';
import {AssetClass} from '../../../../model/api/assets/asset-class';
import {AdmCenter} from '../../../../model/api/administration/adm-center';
import {Region} from '../../../../model/api/administration/region';
import {UploadModalComponent} from '../../../common/upload-modal.component';
import {EmployeeResource} from '../../../../model/api/administration/employee-resource';
import {RequestBFMaterialEmployeeUpdate} from '../../../../model/api/requests/request-budget-forecast-material-employee-update';
import {RequestBFMaterialCostCenterAdd} from '../../../../model/api/requests/request-budget-forecast-material-cost-center-add';
import { DocumentType as AppDocumentType } from '../../../../model/api/documents/document-type';
import {County} from '../../../../model/api/administration/county';
import {Type} from '../../../../model/api/administration/type';
import {BudgetManager} from '../../../../model/api/assets/budget-manager';

@Component({
    selector: 'asset-reception-details-dialog',
    templateUrl: 'asset-reception-details.dialog.html',
    styleUrls: [ 'asset-reception-details.dialog.scss' ]
})
export class AssetReceptionDetailsDialog implements AfterViewInit {

  @ViewChild('assetCategoryDetail') public assetCategoryDetail: AssetCategoryDetailComponent;
    @ViewChild('assetCategoryList') public assetCategoryList: AssetCategoryListComponent;

    @ViewChild('assetCategoryDetailModal') public assetCategoryDetailModal: ModalDirective;
    @ViewChild('assetCategoryListModal') public assetCategoryListModal: ModalDirective;

    
    

    @ViewChild('projectList') public projectList: ProjectList;
    @ViewChild('projectListModal') public projectListModal: ModalDirective;

    @ViewChild('orderList') public orderList: OrderList;
    @ViewChild('orderListModal') public orderListModal: ModalDirective;

    // @ViewChild('assetEntityList') public assetEntityList: AssetEntityListComponent;
    // @ViewChild('assetEntityListModal') public assetEntityListModal: ModalDirective;

    @ViewChild('brandList') public brandList: BrandList;
    @ViewChild('brandListModal') public brandListModal: ModalDirective;

    @ViewChild('dictionaryItemDetail') public dictionaryItemDetail: DictionaryItemDetailComponent;
    @ViewChild('dictionaryItemList') public dictionaryItemList: DictionaryItemListComponent;

    @ViewChild('dictionaryItemDetailModal') public dictionaryItemDetailModal: ModalDirective;
    @ViewChild('dictionaryItemListModal') public dictionaryItemListModal: ModalDirective;

    @ViewChild('assetTypeDetail') public assetTypeDetail: AssetTypeDetailComponent;
    @ViewChild('assetTypeList') public assetTypeList: AssetTypeListComponent;

    @ViewChild('assetTypeDetailModal') public assetTypeDetailModal: ModalDirective;
    @ViewChild('assetTypeListModal') public assetTypeListModal: ModalDirective;

    @ViewChild('assetClassListModal') public assetClassListModal: ModalDirective;

    @ViewChild('invStateDetail') public invStateDetail: InvStateDetail;
    @ViewChild('invStateList') public invStateList: InvStateList;
    @ViewChild('invStateDetailModal') public invStateDetailModal: ModalDirective;
    @ViewChild('invStateListModal') public invStateListModal: ModalDirective;

    @ViewChild('employeeDetail') public employeeDetail: EmployeeDetailComponent;
    @ViewChild('employeeList') public employeeList: EmployeeListComponent;
    @ViewChild('employeeDetailModal') public employeeDetailModal: ModalDirective;
    @ViewChild('employeeListModal') public employeeListModal: ModalDirective;

    @ViewChild('partnerDetail') public partnerDetail: PartnerDetailComponent;
    @ViewChild('partnerList') public partnerList: PartnerListComponent;
    @ViewChild('partnerDetailModal') public partnerDetailModal: ModalDirective;
    @ViewChild('partnerListModal') public partnerListModal: ModalDirective;


    @ViewChild('companyDetail') public companyDetail: CompanyDetailComponent;
    @ViewChild('companyList') public companyList: CompanyListComponent;
    @ViewChild('companyDetailModal') public companyDetailModal: ModalDirective;
    @ViewChild('companyListModal') public companyListModal: ModalDirective;

    @ViewChild('locationDetail') public locationDetail: LocationDetailComponent;
    @ViewChild('locationList') public locationList: LocationListComponent;
    @ViewChild('locationDetailModal') public locationDetailModal: ModalDirective;
    @ViewChild('locationListModal') public locationListModal: ModalDirective;

    @ViewChild('costCenterReceptionList') public costCenterReceptionList: CostCenterListComponent;
    @ViewChild('costCenterReceptionListModal') public costCenterReceptionListModal: ModalDirective;

    @ViewChild('employeeReceptionList') public employeeReceptionList: EmployeeListComponent;
    @ViewChild('employeeReceptionListModal') public employeeReceptionListModal: ModalDirective;

    @ViewChild('uomDetail') public uomDetail: UomDetailComponent;
    @ViewChild('uomList') public uomList: UomListComponent;
    @ViewChild('uomDetailModal') public uomDetailModal: ModalDirective;
    @ViewChild('uomListModal') public uomListModal: ModalDirective;


    @ViewChild('assetNatureList') public assetNatureList: AssetNatureListComponent;
    @ViewChild('assetNatureListModal') public assetNatureListModal: ModalDirective;

    @ViewChild('uomListFinalModal') public uomListFinalModal: ModalDirective;
    @ViewChild('uomListFinal') public uomListFinal: UomListComponent;
    @ViewChild('dimensionListFinal') public dimensionListFinal: DimensionListComponent;
    @ViewChild('dimensionListFinalModal') public dimensionListFinalModal: ModalDirective;

    // @ViewChild('regionDetail') public regionDetail: RegionDetail;
    // @ViewChild('regionList') public regionList: RegionList;
    @ViewChild('regionDetailModal') public regionDetailModal: ModalDirective;
    @ViewChild('regionListModal') public regionListModal: ModalDirective;

    @ViewChild('roomDetail') public roomDetail: RoomUIDetail;
    @ViewChild('roomList') public roomList: RoomListComponent;
    @ViewChild('roomDetailModal') public roomDetailModal: ModalDirective;
    @ViewChild('roomListModal') public roomListModal: ModalDirective;
    @ViewChild('departmentDetail') public departmentDetail: DepartmentUIDetail;
    @ViewChild('departmentList') public departmentList: DepartmentListComponent;
    @ViewChild('departmentDetailModal') public departmentDetailModal: ModalDirective;
    @ViewChild('departmentListModal') public departmentListModal: ModalDirective;

    @ViewChild('dimensionDetail') public dimensionDetail: DimensionDetailComponent;
    @ViewChild('dimensionList') public dimensionList: DimensionListComponent;

    @ViewChild('dimensionDetailModal') public dimensionDetailModal: ModalDirective;
    @ViewChild('dimensionListModal') public dimensionListModal: ModalDirective;

    @ViewChild('administrationDetail') public administrationDetail: AdministrationDetailComponent;
    @ViewChild('administrationList') public administrationList: AdministrationListComponent;
    @ViewChild('administrationDetailModal') public administrationDetailModal: ModalDirective;
    @ViewChild('administrationListModal') public administrationListModal: ModalDirective;

    
    

    
    

    
    

    @ViewChild('divisionList') public divisionList: DivisionListComponent;
    @ViewChild('divisionListModal') public divisionListModal: ModalDirective;

    @ViewChild('countryList') public countryList: CountryListComponent;
    @ViewChild('countryListModal') public countryListModal: ModalDirective;

    @ViewChild('countyList') public countyList: CountyListComponent;
    @ViewChild('countyListModal') public countyListModal: ModalDirective;

    @ViewChild('cityList') public cityList: CityListComponent;
    @ViewChild('cityListModal') public cityListModal: ModalDirective;

    @ViewChild('budgetManagerList') public budgetManagerList: BudgetManagerList;
    @ViewChild('budgetManagerListModal') public budgetManagerListModal: ModalDirective;

    @ViewChild('typeList') public typeList: TypeList;
    @ViewChild('typeListModal') public typeListModal: ModalDirective;

    @ViewChild('materialList') public materialList: MaterialList;
    @ViewChild('materialListModal') public materialListModal: ModalDirective;

    @ViewChild('subTypeList') public subTypeList: SubTypeList;
    @ViewChild('subTypeListModal') public subTypeListModal: ModalDirective;

    @ViewChild('admCenterList') public admCenterList: AdmCenterListComponent;
    @ViewChild('admCenterListModal') public admCenterListModal: ModalDirective;

    @ViewChild('regionList') public regionList: RegionListComponent;

    @ViewChild('assetClassList') public assetClassList: AssetClassListComponent;

    // @ViewChild('offerMaterialList') public offerMaterialList: OfferMaterialListComponent;
    // @ViewChild('orderMaterialList') public orderMaterialList: OrderMaterialListComponent;
    @ViewChild('assetOpDetailList') public assetOpList: AssetOpDetailListComponent;
    @ViewChild('entityFileList') public entityFileList: EntityFileListComponent;

    @ViewChild('confirmationModal') public confirmationModal: ModalDirective;
    @ViewChild('assetTypeDropDownList') public assetTypeDropDownList: AssetTypeDropDownListComponent;
    // @ViewChild('documentTypeDropDownList') public documentTypeDropDownList: DocumentTypeDropDownListComponent;

    @ViewChild('requestBudgetForecastList') public requestBudgetForecastList: RequestBudgetForecastListComponent;
    @ViewChild('requestBudgetForecastMaterialList') public requestBudgetForecastMaterialList: RequestBudgetForecastMaterialListComponent;
    @ViewChild('requestBFMaterialCostCenterList') public requestBFMaterialCostCenterList: RequestBudgetForecastMaterialCostCenterListComponent;
    @ViewChild('requestBFMaterialCostCenterAllList') public requestBFMaterialCostCenterAllList: RequestBudgetForecastMaterialCostCenterListComponent;



    @ViewChild('fileInput') fileInput;

    public entityTypeCode: string = 'ASSET';
    public entityFile: EntityFile = null;
    public companyName: string = AppConfig.COMPANY_NAME;
    public confirmationMessage: string = '';
    public operationType: OperationType = OperationType.NotSet;
    public assetErpCode: boolean = AppConfig.SHOW_ASSET_DETAILS_ERPCODE;
    public documentModel: boolean = AppConfig.SHOW_DOCUMENT_MODEL_DETAILS_;
    public assetAddCategory: boolean = AppConfig.SHOW_ASSET_DETAILS_ADD_CATEGORY;
    public assetSearchCategory: boolean = AppConfig.SHOW_ASSET_DETAILS_SEARCH_CATEGORY;
    public assetDocumentType: boolean = AppConfig.SHOW_ASSET_DETAILS_DOCUMENTTYPE;
    public assetEmployeeDetails: boolean = AppConfig.SHOW_EMPLOYEE_DETAILS;
    public assetTypeDetails: boolean = AppConfig.SHOW_ASSETTYPE_DETAILS;
    public assetTypeDetailsButton: boolean = AppConfig.SHOW_ASSETTYPE_DETAILS_BUTTON;
    public assetEmployeeDetailsButton: boolean = AppConfig.SHOW_EMPLOYEE_DETAILS_BUTTON;
    public assetRoomDetails: boolean = AppConfig.SHOW_ROOMS_DETAILS;
    public assetRoomDetailsButton: boolean = AppConfig.SHOW_ROOMS_DETAILS_BUTTON;
    public assetRegionDetails: boolean = AppConfig.SHOW_REGIONS_DETAILS;
    public assetRegionDetailsButton: boolean = AppConfig.SHOW_REGIONS_DETAILS_BUTTON;
    public assetCostCenterDetails: boolean = AppConfig.SHOW_COSTCENTER_DETAILS;
    public assetCostCenterDetailsButton: boolean = AppConfig.SHOW_COSTCENTER_DETAILS_BUTTON;
    public assetLocationDetails: boolean = AppConfig.SHOW_LOCATION_DETAILS;
    public assetLocationDetailsButton: boolean = AppConfig.SHOW_LOCATION_DETAILS_BUTTON;
    public assetRoomAdd: boolean = AppConfig.SHOW_ASSET_DETAILS_ROOM_DETAILS;
    public assetSupplierDetails: boolean = AppConfig.SHOW_ASSET_DETAILS_SUPPLIER;
    public assetSuppliersDetailsAdd: boolean = AppConfig.SHOW_ASSET_DETAILS_SUPPLIER_ADD;
    public assetSerieDetailsDoc1: boolean = AppConfig.SHOW_ASSET_DETAILS_SERIE_DOC1;
    public assetSerieDetailsDoc2: boolean = AppConfig.SHOW_ASSET_DETAILS_SERIE_DOC2;
    public showAssetClass: boolean = AppConfig.SHOW_ASSET_CLASS;
    public assetState: boolean = AppConfig.SHOW_ASSET_STATES;
    public readOnly: boolean = AppConfig.READ_ONLY;
    public selectedAssetCategories: Array<AssetCategory> = new Array<AssetCategory>();
    public selectedLocations: Array<Location> = new Array<Location>();

    public assetId: number = 0;
    public asset: AddAsset = new AddAsset();
    public filesToUpload: Array<any> = new Array<any>();
    public input = new FormData();
    public selectedAssetOp: any;
    public isSaved: boolean = true;
    public toBeValidated = false;
    public checkUniqueSN = false;
    public checkUniqueDoc = false;
    public invNoLength = 0;
    public state = 'OK';
    public allowLabel  = 'ETICHETABIL';
    public partnerSearchCUI = '';
    public partnerName = '';
    public partnerCUI = '';
    public correlationId = '';
    public hasPartner: boolean = true;

    public assetRowSelection: string = 'multiple';

    stateOptions: any[];

    // multipleQuantity: boolean = false;

    public get allowSaving(): boolean {
            return this.asset != null &&
            // this.checkUniqueSN &&
            this.order != null &&
            ((this.costCenter != null) || this.requestBudgetForecastList.selectedItems.length > 0) &&
            // this.employee != null &&
            // this.subCategory != null &&
            (this.requestBudgetForecastList.selectedItems.length > 0);
    }
    public invState: CodeNameEntity = null;
    public assetCategory: AssetCategory = null;
    public project: Project = null;
    public order: Order = null;
    // public assetEntity: AssetEntity = null;
    public brand: Brand = null;
    
    public dictionaryItem: CodeNameEntity = null;
    // public category: CodeNameEntity = null;
    // //public subCategory: SubCategory = null;
    public costCenter: CodeNameEntity = null;
    public uom: Uom = null;
    public assetNature: AssetNature = null;
    public employee: Employee = null;
    public department: CodeNameEntity = null;
    public company: CodeNameEntity = null;
    public account: CodeNameEntity = null;
    public expAccount: CodeNameEntity = null;
    public article: CodeNameEntity = null;
    public division: CodeNameEntity = null;
    public country: CodeNameEntity = null;
    public county: CodeNameEntity = null;
    public city: CodeNameEntity = null;
    public budgetManager: CodeNameEntity = null;
    public type: CodeNameEntity = null;
    public material: CodeNameEntity = null;
    public assetClass: CodeNameEntity = null;
    public subType: CodeNameEntity = null;
    public admCenter: CodeNameEntity = null;
    public region: CodeNameEntity = null;
    public dimension: Dimension = null;
    public location: Location = null;
    public partner: CodePartnerEntity = null;
    public room: Room = null;
    public assetType: CodeNameEntity = null;
    public documentType: CodeNameEntity = null;
    public administration: CodeNameEntity = null;
    public valueInvIn: number = null;
    public valueDepYTD: number = null;
    public valueDepPU: number = null;
    public uomFinal: Uom = null;
    public dimensionFinal: Dimension = null;

    public readOnlyForm: boolean = false;
    public get isAdmin(): boolean { return AppData.UserIsAdmin; }
    public initialInvNo: string = '';
    requestBudgetForecastMaterialCostCenterUpdate = new Array<RequestBudgetForecastMaterialCostCenterUpdate>();
    requestBudgetForecastMaterialCostCenterMultiple = new Array<RequestBudgetForecastMaterialCostCenterMultiple>();

    constructor(
        public ngLocation: NgLocation,
        public route: ActivatedRoute,
        public router: Router,
        public assetHttpService: AssetHttpService,
        public assetCategoryHttpService: AssetCategoryHttpService,
        
        public projectHttpService: ProjectHttpService,
        public orderHttpService: OrderHttpService,
        public brandHttpService: BrandHttpService,
        public dictionaryItemHttpService: DictionaryItemHttpService,
        public invStateHttpService: InvStateHttpService,
        public assetClassHttpService: AssetClassHttpService,
        
        
        
        public divisionHttpService: DivisionHttpService,
        public countryHttpService: CountryHttpService,
        public countyHttpService: CountyHttpService,
        public cityHttpService: CityHttpService,
        public budgetManagerHttpService: BudgetManagerHttpService,
        public typeHttpService: TypeHttpService,
        public materialHttpService: MaterialHttpService,
        public subTypeHttpService: SubTypeHttpService,
        public admCenterHttpService: AdmCenterHttpService,
        public regionHttpService: RegionHttpService,
        public assetTypeHttpService: AssetTypeHttpService,
        public employeeHttpService: EmployeeHttpService,
        public costCenterHttpService: CostCenterHttpService,
        public uomHttpService: UomHttpService,
        public assetNatureHttpService: AssetNatureHttpService,
        public assetOpHttpService: AssetOpHttpService,
        public partnerHttpService: PartnerHttpService,
        public roomDetailHttpService: RoomDetailHttpService,
        public departmentHttpService: DepartmentHttpService,
        public companyHttpService: CompanyHttpService,
        public documentTypeHttpService: DocumentTypeHttpService,
        public dimensionHttpService: DimensionHttpService,
        public locationHttpService: LocationHttpService,
        public administrationHttpService: AdministrationHttpService,
        public offerMaterialHttpService: OfferMaterialHttpService,
        public requestBudgetForecastHttpService: RequestBudgetForecastHttpService,
        public requestBudgetForecastMaterialHttpService: RequestBudgetForecastMaterialHttpService,
        public requestBFMaterialCostCenterHttpService: RequestBudgetForecastMaterialCostCenterHttpService,
        private notificationService: NotificationService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialog,
        public vcr: ViewContainerRef,
        public http: HttpClient,
        public entityFileHttpService: EntityFileHttpService) {

          this.stateOptions = [
            { label: 'NU', value: false },
            { label: 'DA', value: true },
          ];

          if (data && data.assetId) {
            this.assetId = data.assetId;
          }

        // this.route.params.subscribe((params: Params) => {
        //     if (params['id']) {
        //          this.assetId = +params['id'];
        //     } else {
        //         // this.asset.quantity = 0;
        //
        //     }
        // });
    }

    ngAfterViewInit() {
        // if ((this.assetFullDetail !== null) && (this.assetFullDetail.id === 0)) this.refreshDocumentTypes();
        if (this.assetId > 0) {
            this.assetHttpService.getDetailById(this.assetId)
                .subscribe((asset: any) => {
                    // this.asset = asset;
                    this.initialInvNo = asset.invNo.toString().trim();
                    this.updateDetails(asset);
                      // this.refreshAssetTypes();
                      // this.refreshDocumentTypes();
                      this.refreshAssetOperations();
                       this.refreshEntityFiles();
                    // this.generateBarcode();
                });
        } else {
            this.invStateHttpService.getById(20).subscribe((res: InvState) => {
                if (res != null) {
                    this.invState = res;
                }
            });
            // this.refreshAssetTypes();
             // this.refreshDocumentTypes();
        }

        // if(this.uomIdFinal > 0){
        //     this.updateInventoryUomDetails();
        // }
        // if(this.dimensionIdFinal > 0){
        //     this.updateInventoryDimensionDetails();
        // }
    }

    public setSelectedItem($event) {

      const requestFilter: RequestFilter = new RequestFilter();

      const selectedRequestBFMaterialCostCenters = new Array<any>();
        this.requestBFMaterialCostCenterList.selectedItems = selectedRequestBFMaterialCostCenters;

        const selectedRequestBudgetForecastMaterials = new Array<any>();
        this.requestBudgetForecastMaterialList.selectedItems = selectedRequestBudgetForecastMaterials;

      let params: Array<Param> = new Array<Param>();

      if (this.requestBudgetForecastList != null) {
        requestFilter.requestBudgetForecastIds = new Array<number>();
        this.requestBudgetForecastList.selectedItems.forEach((requestBGF) => {
            requestFilter.requestBudgetForecastIds.push(requestBGF.id);
        });
    }

       params.push(new Param('jsonFilter', JSON.stringify(requestFilter)));
       params.push(new Param('orderId', this.order != null ? this.order.id.toString() : null));
       // params.push(new Param('showAll', 'false'));
      // params.push(new Param('requestBudgetForecastIds', AppUtils.getIdsList<RequestBudgetForecast, number>([
      //   this.requestBudgetForecastList.selectedItem != null ? this.requestBudgetForecastList.selectedItem : null ])));
        this.requestBudgetForecastMaterialList.refresh(params);

        params = new Array<Param>();
        params.push(new Param('requestBudgetForecastMaterialIds', AppUtils.getIdsList<RequestBudgetForecastMaterial, number>([
        this.requestBudgetForecastMaterialList.selectedItem != null ? this.requestBudgetForecastMaterialList.selectedItem : null ])));
        this.requestBFMaterialCostCenterList.refresh(params);
  }

    public refreshEntityFiles() {
        const params: Array<Param> = new Array<Param>();

        params.push(new Param('entityTypeCode', 'RECEPTION'));
        params.push(new Param('entityId', this.assetId.toString()));

        if (this.entityFileList !== undefined) {
            this.entityFileList.refresh(params);
        }
    }

    public refreshAssetOperations(){
        const params: Array<Param> = new Array<Param>();

        params.push(new Param('assetId', this.assetId.toString()));
        if (this.assetOpList !== undefined) {
            this.assetOpList.refresh(params);
        }
        // this.assetOpSimpleDetailMemoryService.setDataSource(new Array<AssetOpSd>());

        // this.assetOpHttpService.getSimpleDetailByAsset(this.assetId).subscribe((assetOps: Array<AssetOpSd>) => {
        //     assetOps.sort((i1, i2) => i2.id - i1.id)
        //     this.assetOpSimpleDetailMemoryService.setDataSource(assetOps);
        //     this.assetOpList.refresh(null);
        // });
    }

    // public refreshDocumentTypes() {
    //     const params: Array<Param> = new Array<Param>();
    //     params.push(new Param('parentCode', 'ACQUISITION'));
    //     this.documentTypeDropDownList.refresh(params);
    // }

    // public refreshOrderMaterials() {
    //     const params: Array<Param> = new Array<Param>();
    //     params.push(new Param('orderIds', AppUtils.getIdsList<Order, number>([ this.order != null ? this.order : null ])));
    //     this.orderMaterialList.refresh(params);
    // }
    public updateDetails(asset: any) {
        this.asset.id = asset.id;
        // this.asset.invNo = asset.invNo;
        // this.asset.quantity = asset.quantity;
        // this.asset.subNo = asset.subNo;
        // this.asset.name = asset.name;
        // this.asset.name2 = asset.name;
        // this.asset.sapCode = asset.sapCode;
        // this.asset.serialNumber = asset.serialNumber;
        // this.asset.plateNo = asset.agreementNo;
        // this.asset.receptionPrice = asset.receptionPrice;
        // this.asset.erpCode = asset.erpCode;
        // this.asset.validated = asset.validated;
        // this.invState = asset.invState;
        // this.uom = asset.uom;
        this.order = asset.order;
        //// this.subCategory = asset.subCategory;
        // this.dimension = asset.dimension;
        // this.refreshOrderMaterials();

        if (asset.document != null) {
            // this.asset.docNo1 = asset.document.docNo1;
            this.documentType = asset.document.documentType;
            this.partner = asset.document.partner;
            // this.documentTypeDropDownList.selectedItems[0] = asset.document.documentType;

        }

        if (asset.adm != null) {
            this.account = asset.adm.account;
            this.expAccount = asset.adm.expAccount;
            this.assetCategory = asset.adm.assetCategory;
            this.article = asset.adm.article;
            this.costCenter = asset.adm.costCenter;
            this.department = asset.adm.department;
            this.division = asset.adm.division;
            this.room = asset.adm.room;
            this.administration = asset.adm.administration;
            this.city = asset.adm.city;
            this.county = asset.adm.county;
            this.country = asset.adm.country;
            this.budgetManager = asset.adm.budgetManager;
            this.assetNature = asset.adm.assetNature;
            this.type = asset.adm.type;
            this.employee = asset.adm.employee;
            this.material = asset.adm.material;
            this.subType = asset.adm.subType;
            this.assetClass = asset.adm.assetClass;
            this.admCenter = asset.adm.admCenter;
            this.region = asset.adm.region;
            
            this.assetType = asset.adm.assetType;
            this.project = asset.adm.project;
            this.company = asset.adm.company;
        }
    }
     public setSelectedDocumentType(documentTypes: Array<AppDocumentType>) {
        this.documentType = ((documentTypes != null) && (documentTypes.length > 0)) ? documentTypes[0] : null;
    }

    /*begin asset category*/
    public selectAssetCategory() {
        // let selectedAssetCategories: Array<AssetCategory> = null;

        // if (this.selectedAssetCategory !== null) {
        //     selectedAssetCategories = new Array<AssetCategory>();
        //     selectedAssetCategories.push(this.selectedAssetCategory);
        //     this.assetCategoryList.selectedItems = selectedAssetCategories;
        // }

        this.assetCategoryList.refresh(null);
        this.assetCategoryListModal.show();
    }

    public setSelectedAssetCategory() {
        const items: Array<AssetCategory> = this.assetCategoryList.selectedItems;
        this.assetCategory = ((items != null) && (items.length === 1)) ? items[0] : null;
        this.assetCategoryListModal.hide();
    }

    public addAssetCategory() {
        this.assetCategoryDetail.addNew();
        this.assetCategoryDetailModal.show();
    }

    public assetCategoryAdded(assetCategory: AssetCategory) {
        this.assetCategory = assetCategory;
        this.assetCategoryDetailModal.hide();
    }

    public assetCategoryAddCanceled() {
        this.assetCategoryDetailModal.hide();
    }
    


     /*begin project */
     public selectProject() {
        this.projectList.refresh(null);
        this.projectListModal.show();
    }

    public setSelectedProject() {
        let items: Array<Project> = this.projectList.selectedItems;
        this.project = ((items != null) && (items.length === 1)) ? items[0] : null;
        this.projectListModal.hide();
    }

    /*end project */

      /*begin ORDER */
      public selectOrder() {
        this.orderList.refresh(null);
        this.orderListModal.show();
    }

    public setSelectedOrder() {
        //// this.subCategory = null;
        const items: Array<Order> = this.orderList.selectedItems;
        this.order = ((items != null) && (items.length === 1)) ? items[0] : null;

        if(this.order != null && this.order.contract != null && this.order.contract.contractID === 'NO-C'){
          this.notificationService.showWarning('Comanda selectata nu are CONTRACT!', 'IMPORTANT', 0, false, 0);
          this.order = null;
        }else {
          this.orderListModal.hide();

        let params: Array<Param> = new Array<Param>();

        // params.push(new Param('orderIds', AppUtils.getIdsList<Order, number>([ this.order != null ? this.order : null ])));
        // this.orderMaterialList.refresh(params);

        // @ts-ignore
          params.push(new Param('requestIds', AppUtils.getIdsList<Request, number>([ this.order != null &&
          this.order.offer != null && this.order.offer.request != null ? this.order.offer.request : null ])));
        this.requestBudgetForecastList.refresh(params);

        params = new Array<Param>();
        params.push(new Param('orderId', this.order != null ? this.order.id.toString() : null));
        this.requestBFMaterialCostCenterAllList.refresh(params);


        }

    }

    /*end ORDER */

    //   /*begin ASSETENTITY */
    //   public selectAssetEntity() {
    //     this.assetEntityList.refresh(null);
    //     this.assetEntityListModal.show();
    // }

    // public setSelectedAssetEntity() {
    //     const items: Array<AssetEntity> = this.assetEntityList.selectedItems;
    //     this.assetEntity = ((items != null) && (items.length === 1)) ? items[0] : null;
    //     this.assetEntityListModal.hide();
    // }

    // /*end ASSETENTITY */


     /*begin brand */
     public selectBrand() {
        this.brandList.refresh(null);
        this.brandListModal.show();
    }

    public setSelectedBrand() {
        let items: Array<Brand> = this.brandList.selectedItems;
        this.brand = ((items != null) && (items.length === 1)) ? items[0] : null;
        this.brandListModal.hide();
    }

    /*end brand */

      

    

     /*begin dictionary Item*/
     public selectDictionaryItem() {

        this.dictionaryItemList.refresh(null);
        this.dictionaryItemListModal.show();
    }

    public setSelectedDictionaryItem() {
        const items: Array<DictionaryItem> = this.dictionaryItemList.selectedItems;
        this.dictionaryItem = ((items != null) && (items.length === 1)) ? items[0] : null;

        // this.assetType = items[0].assetType;
        this.dictionaryItemListModal.hide();
    }
    



     /* BEGIN CATEGORY  */
    //  public selectCategory() {

    //     const params = new Array<Param>();
    //     params.push(new Param('subCategoryIds', AppUtils.getIdsList<CodeNameEntity, number>([ this.subCategory != null  ? this.subCategory : null ])));

    //     this.categoryList.refresh(params);
    //     this.categoryListModal.show();
    // }

    // public setSelectedCategory() {
    //     const items: Array<Category> = this.categoryList.selectedItems;
    //     this.category = ((items != null) && (items.length === 1)) ? items[0] : null;

    //     const params = new Array<Param>();
    //     params.push(new Param('categoryIds', AppUtils.getIdsList<CodeNameEntity, number>([ this.category != null  ? this.category : null ])));
    //     this.offerMaterialList.refresh(params);
    //     this.categoryListModal.hide();
    // }
    /* END CATEGORY  */

    // /* BEGIN SUBCATEGORY  */
    // public selectSubCategory() {

    //     const params = new Array<Param>();
    //     params.push(new Param('assetTypeIds', AppUtils.getIdsList<CodeNameEntity, number>([ this.order != null && this.order.offer != null && this.order.offer.assetType != null  ? this.order.offer.assetType : null ])));
    //     params.push(new Param('orderId', this.order != null ? this.order.id.toString() : null));

    //     this.subCategoryList.refresh(params);
    //     this.subCategoryListModal.show();
    // }

    // public setSelectedSubCategory() {
    //     const items: Array<SubCategory> = this.subCategoryList.selectedItems;
    //     this.subCategory = ((items != null) && (items.length === 1)) ? items[0] : null;

    //     const params = new Array<Param>();
    //     params.push(new Param('categoryIds', AppUtils.getIdsList<CodeNameEntity, number>([ this.subCategory != null && this.subCategory.category != null  ? this.subCategory.category : null ])));
    //     params.push(new Param('subCategoryIds', AppUtils.getIdsList<CodeNameEntity, number>([ this.subCategory != null  ? this.subCategory : null ])));
    //     // this.orderMaterialList.refresh(params);
    //     this.subCategoryListModal.hide();
    // }
    // /* END SUBCATEGORY  */



        /*begin asset type*/
        public selectAssetType() {
            // let selectedAssetCategories: Array<AssetCategory> = null;
            // if (this.selectedAssetCategory !== null) {
            //     selectedAssetCategories = new Array<AssetCategory>();
            //     selectedAssetCategories.push(this.selectedAssetCategory);
            //     this.assetCategoryList.selectedItems = selectedAssetCategories;
            // }
            this.assetTypeList.refresh(null);
            this.assetTypeListModal.show();
        }
        public setSelectedAssetType() {
            let items: Array<AssetType> = this.assetTypeList.selectedItems;
            this.assetType = ((items != null) && (items.length === 1)) ? items[0] : null;
            this.assetTypeListModal.hide();
        }
        public addAssetType() {
            this.assetTypeDetail.addNew();
            this.assetTypeDetailModal.show();
        }
        public assetTypeAdded(assetType: AssetType) {
            this.assetType = assetType;
            this.assetTypeDetailModal.hide();
        }
        public assetTypeAddCanceled() {
            this.assetTypeDetailModal.hide();
        }
        /*end asset type*/


    /*begin invState*/
    public selectInvState() {
        // let selectedAssetCategories: Array<AssetCategory> = null;
        // if (this.selectedAssetCategory !== null) {
        //     selectedAssetCategories = new Array<AssetCategory>();
        //     selectedAssetCategories.push(this.selectedAssetCategory);
        //     this.assetCategoryList.selectedItems = selectedAssetCategories;
        // }
        this.invStateList.refresh(null);
        this.invStateListModal.show();
    }
    public setSelectedInvState() {
        let items: Array<InvState> = this.invStateList.selectedItems;
        this.invState = ((items != null) && (items.length === 1)) ? items[0] : null;
        this.invStateListModal.hide();
    }
    public addInvState() {
        this.invStateDetail.addNew();
        this.invStateDetailModal.show();
    }
    public invStateAdded(invState: InvState) {
        this.invState = invState;
        this.invStateDetailModal.hide();
    }
    public invStateAddCanceled() {
        this.invStateDetailModal.hide();
    }
        /*end invState*/

    /*begin employee*/
    public selectEmployee() {

        const params: Array<Param> = new Array<Param>();

        //params.push(new Param('companyIds', AppUtils.getIdsList<Company, number>([ this.costCenterList.selectedItem != null ? this.costCenterList.selectedItem.company : null ])));
        this.employeeList.refresh(params);
        this.employeeListModal.show();
    }

    public setSelectedEmployee() {
        let items: Array<Employee> = this.employeeList.selectedItems;
        this.employee = ((items != null) && (items.length === 1)) ? items[0] : null;
        this.employeeListModal.hide();
    }

    public addEmployee() {
        this.employeeDetail.addNew();
        // this.employeeDetail.department = this.department;
        this.employeeDetailModal.show();
    }

    public employeeAdded(employee: Employee) {
        this.employee = employee;
        this.employeeDetailModal.hide();
    }

    public employeeAddCanceled() {
        this.employeeDetailModal.hide();
    }
    /*end employee*/

     /*begin ADMINISTRATION*/
     public selectAdministration() {


        this.administrationList.refresh(null);
        this.administrationListModal.show();
    }

    public setSelectedAdministration() {
        let items: Array<Administration> = this.administrationList.selectedItems;
        this.administration = ((items != null) && (items.length === 1)) ? items[0] : null;
        this.administrationListModal.hide();
    }

    // public addAdministration() {
    //     this.administrationDetail.addNew();
    //     // this.roomDetail.location = this.location;
    //     this.administrationDetailModal.show();
    // }

    public administrationAdded(administration: Administration) {
        this.administration = administration;
        this.administrationDetailModal.hide();
    }

    public administrationAddCanceled() {
        this.administrationDetailModal.hide();
    }
    /*end room*/

       /*begin company*/
       public selectCompany() {
        this.companyList.refresh(null);
        this.companyListModal.show();
    }

    public setSelectedCompany() {
        let items: Array<Company> = this.companyList.selectedItems;
        this.company = ((items != null) && (items.length === 1)) ? items[0] : null;
        this.companyListModal.hide();
    }

    public addCompany() {
        this.companyDetail.addNew();
        // this.employeeDetail.department = this.department;
        this.companyDetailModal.show();
    }

    public companyAdded(company: Company) {
        this.company = company;
        this.companyDetailModal.hide();
    }

    public companyAddCanceled() {
        this.companyDetailModal.hide();
    }
    /*end company*/

    /* begin department */
    public selectDepartment() {
        this.departmentList.refresh(null);
        this.departmentListModal.show();
    }

    public setSelectedDepartment() {
        let items: Array<Department> = this.departmentList.selectedItems;
        this.department = ((items != null) && (items.length === 1)) ? items[0] : null;
        this.departmentListModal.hide();
    }

    public addDepartment() {
        this.departmentDetail.addNew();
        this.departmentDetailModal.show();
    }

    public departmentAdded(department: Department) {
        this.department = department;
        this.departmentDetailModal.hide();
    }

    public departmentAddCanceled() {
        this.departmentDetailModal.hide();
    }
    /*end department */

    /* begin location */
    public selectLocation() {
        this.locationList.refresh(null);
        this.locationListModal.show();
    }

    public setSelectedLocation() {
        let items: Array<Location> = this.locationList.selectedItems;
        this.location = ((items != null) && (items.length === 1)) ? items[0] : null;

        if (this.location != null) {

            if (this.room != null && this.room.location != null && this.room.location.id !== this.location.id) {
                this.room = null;
            }
        }
        this.locationListModal.hide();
    }

    public addLocation() {
        this.locationDetail.addNew();
        this.locationDetailModal.show();
    }

    public locationAdded(location: Location) {
        this.location = location;
        this.locationDetailModal.hide();
    }

    public locationAddCanceled() {
        this.locationDetailModal.hide();
    }
    /*end location */

        // /* begin costcenter */
        // public selectCostCenter() {
        //     this.costCenterList.refresh(null);
        //     this.costCenterListModal.show();
        // }
        // public setSelectedCostCenter() {
        //     let items: Array<CostCenter> = this.costCenterList.selectedItems;
        //     this.costCenter = ((items != null) && (items.length === 1)) ? items[0] : null;
        //     this.costCenterListModal.hide();
        // }
        // public addCostCenter() {
        //     this.costCenterDetail.addNew();
        //     this.costCenterDetailModal.show();
        // }
        // public costCenterAdded(costCenter: CostCenter) {
        //     this.costCenter = costCenter;
        //     this.costCenterDetailModal.hide();
        // }

        // public costCenterAddCanceled() {
        //     this.costCenterDetailModal.hide();
        // }
        // /*end costcenter */

          /* begin UOM */
          public selectUom() {
            this.uomList.refresh(null);
            this.uomListModal.show();
        }
        public setSelectedUom() {
            let items: Array<Uom> = this.uomList.selectedItems;
            this.uom = ((items != null) && (items.length === 1)) ? items[0] : null;
            this.uomListModal.hide();
        }
        public addUom() {
            this.uomDetail.addNew();
            this.uomDetailModal.show();
        }
        public costUomAdded(uom: Uom) {
            this.uom = uom;
            this.uomDetailModal.hide();
        }

        public uomAddCanceled() {
            this.uomDetailModal.hide();
        }
        /*end UOM */


           /* begin ASSETNATURE  */
           public selectAssetNature() {
            this.assetNatureList.refresh(null);
            this.assetNatureListModal.show();
        }
        public setSelectedAssetNature() {
            let items: Array<AssetNature> = this.assetNatureList.selectedItems;
            this.assetNature = ((items != null) && (items.length === 1)) ? items[0] : null;
            this.assetNatureListModal.hide();
        }
        /*end ASSETNATURE */

           /* begin UOM */
           public selectUomFinal() {

            let params = new Array<Param>();

            params.push(new Param('assetCategoryIds', this.assetCategory != null ? this.assetCategory.id.toString() : null));

            this.uomListFinal.refresh(null);
            this.uomListFinalModal.show();
        }
        public setSelectedUomFinal() {
            let items: Array<Uom> = this.uomListFinal.selectedItems;
            this.uomFinal = ((items != null) && (items.length === 1)) ? items[0] : null;
            this.uomListFinalModal.hide();
        }

        /*end UOM */

          /* begin DIMENSION */
          public selectDimensionFinal() {

            let params = new Array<Param>();

            params.push(new Param('assetCategoryIds', this.assetCategory != null ? this.assetCategory.id.toString() : null));

            this.dimensionListFinal.refresh(null);
            this.dimensionListFinalModal.show();
        }
        public setSelectedDimensionFinal() {
            let items: Array<Dimension> = this.dimensionListFinal.selectedItems;
            this.dimensionFinal = ((items != null) && (items.length === 1)) ? items[0] : null;
            this.dimensionListFinalModal.hide();
        }


            /*begin DIMENSION*/
            public selectDimension() {

                this.dimensionList.refresh(null);
                this.dimensionListModal.show();
            }

            public setSelectedDimension() {
                let items: Array<Dimension> = this.dimensionList.selectedItems;
                this.dimension = ((items != null) && (items.length === 1)) ? items[0] : null;
                this.dimensionListModal.hide();
            }

            public addDimension() {
                this.dimensionDetail.addNew();
                this.dimensionDetailModal.show();
            }

            public assetDimensionAdded(dimension: Dimension) {
                this.dimension = dimension;
                this.dimensionDetailModal.hide();
            }

            public dimensionAddCanceled() {
                this.dimensionDetailModal.hide();
            }
            /*end DIMENSION*/


        /* begin region */
        // public selectRegion() {
        //     this.regionList.refresh(null);
        //     this.regionListModal.show();
        // }
        // public setSelectedRegion() {
        //     let items: Array<Region> = this.regionList.selectedItems;
        //     this.region = ((items != null) && (items.length === 1)) ? items[0] : null;
        //     this.regionListModal.hide();
        // }
        // public addRegion() {
        //     this.regionDetail.addNew();
        //     this.regionDetailModal.show();
        // }
        // public regionAdded(location: Location) {
        //     this.region = region;
        //     this.regionDetailModal.hide();
        // }
        // public regionAddCanceled() {
        //     this.regionDetailModal.hide();
        // }
        /*end region */

    /*begin partner*/
    public selectPartner() {
        this.partnerList.refresh(null);
        this.partnerListModal.show();
    }

    public setSelectedPartner() {
        let items: Array<Partner> = this.partnerList.selectedItems;
         this.partner = ((items != null) && (items.length === 1)) ? items[0] : null;
         if (this.partner != null) {
            this.hasPartner = true;
         }
        this.partnerListModal.hide();
    }

    public addPartner() {
        this.partnerDetail.addNew();
        this.partnerDetailModal.show();
    }

    public partnerAdded(partner: Partner) {
        // this.partner = partner;
        this.partnerDetailModal.hide();
    }

    public partnerAddCanceled() {
        this.partnerDetailModal.hide();
    }

     async searchPartnerByCUI() {

        // let request = new Array<PartnerRequest>();
        //     request.push(new PartnerRequest(this.partnerSearchCUI, this.getNowDate()));


        // this.partnerHttpService.requestByCUI(request).subscribe( async (res) => {
        //     this.getPartnerByCorrelationId(res.correlationId);

        // }, error => {
        //     alert(JSON.stringify(error));
        // });
    }

     async getPartnerByCorrelationId(correlationId: string) {

        // this.partnerHttpService.requestByCorrelationId(correlationId).subscribe ( async  (response: PartnerCorrelationResponse) => {
        //     this.partnerName = response.found[0].denumire;
        //     this.partnerCUI = response.found[0].cui;

        //     if (this.partnerName === '') {
        //         alert('CUI-ul introdus nu exista!');
        //         this.hasPartner = false;
        //     }
        // }, error => {
        //     alert(JSON.stringify(error));
        // });
    }



    getNowDate() {
        //return string
        var returnDate = "";
        //get datetime now
        var today = new Date();
        //split
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //because January is 0!
        var yyyy = today.getFullYear();
        //Interpolation date

        if (mm < 10) {
            returnDate += `${yyyy}-0${mm}-`;
        } else {
            returnDate += `${yyyy}-${mm}-`;
        }

        if (dd < 10) {
            returnDate += `0${dd}`;
        } else {
            returnDate += `${dd}`;
        }

        return returnDate;
    }
    /*end partner*/

    /*begin room*/
    public selectRoom() {

        // let params = new Array<Param>();
        // params.push(new Param('locationIds', this.location != null ? this.location.id.toString() : null));

        this.roomList.refresh(null);
        this.roomListModal.show();
    }

    public setSelectedRoom() {
        let items: Array<Room> = this.roomList.selectedItems;
        this.room = ((items != null) && (items.length === 1)) ? items[0] : null;
        this.roomListModal.hide();
    }

    public addRoom() {
        this.roomDetail.addNew();
        // this.roomDetail.location = this.location;
        this.roomDetailModal.show();
    }

    public roomAdded(room: Room) {
        this.room = room;
        this.roomDetailModal.hide();
    }

    public roomAddCanceled() {
        this.roomDetailModal.hide();
    }
    /*end room*/

     public cancelChanges() {
        // this.ngLocation.back();
        this.router.navigate(['/asset/reception']);
    }

    public onDeleteAsset() {
        this.operationType = OperationType.Delete;
        this.confirmationMessage = 'Stergeti inregistrarea curenta?';
        this.confirmationModal.show();
    }

    public deleteAsset() {
        this.assetHttpService.delete(this.asset.id)
            .subscribe(() => this.router.navigate(['/assetdepdetails']));
    }

    public onValidateAsset() {
        this.operationType = OperationType.AssetValidation;
        this.confirmationMessage = 'Validati inregistrarea curenta?';
        this.confirmationModal.show();
    }

    public validateAsset() {
        // this.asset.validated = true;
        this.saveAsset();
    }

    public addNewOperation() {
        // let assets: Array<AssetSimpleDetail> = new Array<AssetSimpleDetail>();
        // assets.push(new AssetSimpleDetail(this.asset.id, this.asset.invNo, this.asset.assetName,
        //     '', this.asset.partner, this.asset.assetType, this.asset.accState, this.asset.usageStartDate, '', ''));
        // AppData.AssetList = assets;
        // this.router.navigate(['/newoperation']);
    }


      public parseDate(dateString: any): Date {
        if (dateString.value) {
            return new Date(dateString.value);
        } else {
            return null;
        }
    }

    public saveAsset() {
         this.asset.requestBudgetForecasts = new Array<number>();
         this.isSaved = false;

         this.assetHttpService.addAsset(this.asset)
         .subscribe((result: CreateAssetSAPResult) => {
             if (result.success) {
                 this.notificationService.showSuccess(result.errorMessage, 'Actualizare asset', 0, false, 0);
                 this.router.navigate(['/asset/reception']);
             } else if (!result.success) {
                 this.notificationService.showError('Motiv: ' + result.errorMessage + '!', 'Eroare salvare date', 0, false, 0);
                 this.isSaved = true;
             }
         });
    }

    public onConfirmationApproved() {

        switch (this.operationType) {
            case OperationType.AssetValidation:
                this.validateAsset();
                break;
            case OperationType.Delete:
                this.deleteAsset();
                break;
            case OperationType.ProcessAssetOp:
                this.processAssetOp();
                break;
              case OperationType.DeleteRequestBFMaterialCostCenter:
                  this.deleteRequestBFMaterialCostCenter();
                  break;
                case OperationType.DeleteRequestBFMaterialCostCenterEmployee:
                    this.deleteRequestBFMaterialCostCenterEmployee();
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

    // public onOfferMaterialListSelectionChanged(assetOpDetails: Array<any>) {
    //     // this.material = this.offerMaterialList.selectedItem != null ? this.offerMaterialList.selectedItem.material : null;
    //     this.material = this.orderMaterialList.selectedItem != null ? this.orderMaterialList.selectedItem.material : null;

    //     this.asset.name2 = this.material != null ? this.material.name : '';
    // }

    // public onOrderMaterialListSelectionChanged(assetOpDetails: Array<any>) {
    //     this.asset.name2 = '';
    //     this.asset.receptionPrice = 0;
    //     this.material = null;
    //     if (this.orderMaterialList.selectedItem != null && this.orderMaterialList.selectedItem.appState.id === 6) {
    //     // this.material = this.offerMaterialList.selectedItem != null ? this.offerMaterialList.selectedItem.material : null;
    //     this.material = this.orderMaterialList.selectedItem.material;

    //     this.asset.name2 = this.material != null ? this.material.name : '';
    //     this.asset.receptionPrice = this.orderMaterialList.selectedItem.price;
    //     } else if (this.orderMaterialList.selectedItem != null && this.orderMaterialList.selectedItem.appState.id !== 6) {
    //         this.notificationService.showWarning('Produsul ' +  this.orderMaterialList.selectedItem.material.code + ' a fost receptionat deja!', 'Stare produs din comanda');
    //     }
    // }

    public onRequestBudgetForecastMaterialListSelectionChanged(assetOpDetails: Array<any>) {
      // this.asset.name2 = '';
      // this.asset.receptionPrice = 0;
      this.material = null;
      if (this.requestBudgetForecastMaterialList.selectedItem != null && this.requestBudgetForecastMaterialList.selectedItem.appState.id === 7) {
      this.material = this.requestBudgetForecastMaterialList.selectedItem.material;

      // this.asset.name2 = this.material != null ? this.material.name : '';
      // this.asset.receptionPrice = this.requestBudgetForecastMaterialList.selectedItem.price;
      } else if (this.requestBudgetForecastMaterialList.selectedItem != null && this.requestBudgetForecastMaterialList.selectedItem.appState.id !== 7) {
          this.notificationService.showWarning('Produsul ' +  this.requestBudgetForecastMaterialList.selectedItem.material.code + ' a fost receptionat deja!', 'Stare produs din comanda', 0, false, 0);
      }

      const params: Array<Param> = new Array<Param>();
      params.push(new Param('reception', 'true'));
      params.push(new Param('requestBudgetForecastMaterialIds', AppUtils.getIdsList<RequestBudgetForecastMaterial, number>([
        this.requestBudgetForecastMaterialList.selectedItem != null ? this.requestBudgetForecastMaterialList.selectedItem : null ])));
        this.requestBFMaterialCostCenterList.refresh(params);

        // this.requestBFMaterialCostCenterAllList.refresh(params);
  }

    public onAssetOpDetailListSelectionChanged(assetOpDetails: Array<any>) {
        this.selectedAssetOp = this.assetOpList.selectedItem;
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
                } else {
                    window.open(`${AppConfig.reportingServer}Report.aspx/?report=${reportType}&documentId=${this.selectedAssetOp.document.id}`);
                }
            }
        }
    }

    public onProcessAssetOp() {
        this.operationType = OperationType.ProcessAssetOp;
        this.confirmationMessage = 'Procesati operatia selectata?';
        this.confirmationModal.show();
    }

    public processAssetOp() {
        this.assetOpHttpService.process(this.assetOpList.selectedItem.id).subscribe((data) => {
            this.refreshAssetOperations();
        });
    }

    public generateBarcode() {
        // let controlId: string = '#assetBarcodeLabel';
        // jsbarcode($(controlId)[0], this.asset.invNo, {
        //     format: 'CODE128',
        //     displayValue: true,
        //     marginTop: 0,
        //     marginRight: 5,
        //     fontSize: 16,
        //     width: 2,
        //     height: 70,
        //     font: 'arial',
        //     textAlign: 'center'
        // });
    }

    public printBarcodeLabel() {
        // let controlId: string = '#assetBarcodeLabel';
        // jsbarcode($(controlId)[0], this.assetFullDetail.invNo, {
        //     format: 'CODE128',
        //     displayValue: true,
        //     marginTop: 0,
        //     marginRight: 5,
        //     fontSize: 16,
        //     width: 2,
        //     height: 70,
        //     font: 'arial',
        //     textAlign: 'center'
        // });

        let popupWinindow: any = null;
        let innerContents = document.getElementById('barcodes').innerHTML;
        popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><link rel="stylesheet" /></head><body onload="window.print()">' +'<div>' + innerContents + '</div>' + '</html>');
        popupWinindow.document.close();
    }

    

    // ACCOUNT //

    

    // ACCOUNT //

    


    // DIVISION //

    public selectDivision() {
        this.divisionList.refresh(null);
        this.divisionListModal.show();
    }

    public setSelectedDivision() {
        let items: Array<Division> = this.divisionList.selectedItems;
        this.division = ((items != null) && (items.length === 1)) ? items[0] : null;
        this.divisionListModal.hide();
    }

    // DIVISION //

    // COUNTRY //

    public selectCountry() {
        this.countryList.refresh(null);
        this.countryListModal.show();
    }

    public setSelectedCountry() {
        let items: Array<Country> = this.countryList.selectedItems;
        // @ts-ignore
      this.country = ((items != null) && (items.length === 1)) ? items[0] : null;
        this.countryListModal.hide();
    }

    // COUNTRY //
    // COUNTY //

    public selectCounty() {
        this.countyList.refresh(null);
        this.countyListModal.show();
    }

    public setSelectedCounty() {
        let items: Array<County> = this.countyList.selectedItems;
        this.county = ((items != null) && (items.length === 1)) ? items[0] : null;
        this.countyListModal.hide();
    }

    // COUNTY //

    // CITY //

    public selectCity() {
        this.cityList.refresh(null);
        this.cityListModal.show();
    }

    public setSelectedCity() {
        let items: Array<City> = this.cityList.selectedItems;
        this.city = ((items != null) && (items.length === 1)) ? items[0] : null;
        this.cityListModal.hide();
    }

    // CITY //
    // BUDGETMANAGER //

    public selectBudgetManager() {
        this.budgetManagerList.refresh(null);
        this.budgetManagerListModal.show();
    }

    public setSelectedBudgetManager() {
        let items: Array<BudgetManager> = this.budgetManagerList.selectedItems;
        this.budgetManager = ((items != null) && (items.length === 1)) ? items[0] : null;
        this.budgetManagerListModal.hide();
    }

    // BUDGETMANAGER //
    // TYPE //

    public selectType() {
        this.typeList.refresh(null);
        this.typeListModal.show();
    }

    public setSelectedType() {
        let items: Array<Type> = this.typeList.selectedItems;
        this.type = ((items != null) && (items.length === 1)) ? items[0] : null;
        this.typeListModal.hide();
    }

    // TYPE //
    // MATERIAL //

    public selectMaterial() {
        this.materialList.refresh(null);
        this.materialListModal.show();
    }

    public setSelectedMaterial() {
        let items: Array<Material> = this.materialList.selectedItems;
        this.material = ((items != null) && (items.length === 1)) ? items[0] : null;
        this.materialListModal.hide();
    }

    // MATERIAL //

    // SUBTYPE //

    public selectSubType() {
        this.subTypeList.refresh(null);
        this.subTypeListModal.show();
    }

    public setSelectedSubType() {
        let items: Array<SubType> = this.subTypeList.selectedItems;
        this.subType = ((items != null) && (items.length === 1)) ? items[0] : null;
        this.subTypeListModal.hide();
    }

    // SUBRTYPE //

     // ASSETCLASS //

     public selectAssetClass() {
        this.assetClassList.refresh(null);
        this.assetClassListModal.show();
    }

    public setSelectedAssetClass() {
        let items: Array<AssetClass> = this.assetClassList.selectedItems;
        this.assetClass = ((items != null) && (items.length === 1)) ? items[0] : null;
        this.assetClassListModal.hide();
    }

    // ASSETCLASS //

     // ADMCENTER //

     public selectAdmCenter() {
        this.admCenterList.refresh(null);
        this.admCenterListModal.show();
    }

    public setSelectedAdmCenter() {
        let items: Array<AdmCenter> = this.admCenterList.selectedItems;
        this.admCenter = ((items != null) && (items.length === 1)) ? items[0] : null;
        this.admCenterListModal.hide();
    }

    // ADMCENTER //

     // REGION //

     public selectRegion() {
        this.regionList.refresh(null);
        this.regionListModal.show();
    }

    public setSelectedRegion() {
        let items: Array<Region> = this.regionList.selectedItems;
        this.region = ((items != null) && (items.length === 1)) ? items[0] : null;
        this.regionListModal.hide();
    }

    // REGION //

    public changeTab(type, e){
        if (type === 'componente') {
            // this.showComponent = true;
        } else{
            // this.showComponent = false;
        }

     }

     public checkUniqueSerialNumber(event: any) {

        setTimeout(() => {
            // console.log(this.asset.serialNumber);
            if (this.asset != null && this.asset.serialNumber !== '' && this.asset.serialNumber != null && this.asset.serialNumber !== undefined && this.asset.serialNumber.trim().length > 3) {
                this.checkUniqueSN = false;
                this.assetHttpService.checkUniqueSerialNumber(this.asset.serialNumber)
                .subscribe((result: any) => {
                    // console.log(JSON.stringify(result));
                    if (!result) {
                        this.notificationService.showSuccess('OK', 'Verificare unicitate serie', 0, false, 0);
                        this.checkUniqueSN = true;
                    } else if (result) {
                        this.notificationService.showError('NOT OK', 'Verificare unicitate serie', 0, false, 0);
                        this.checkUniqueSN = false;
                    }
                });
            } else {
                this.notificationService.showInfo('Lungimea seriei este prea scurta pentru verificare!', 'Verificare unicitate serie', 0, false, 0);
                return;
            }
          }, 500);
    }


    public checkUniqueDocument(event: any) {

        setTimeout(() => {
            // console.log(this.asset.docNo1);
        if (this.asset != null && this.asset.docNo1 !== '' && this.asset.docNo1 != null && this.asset.docNo1 !== undefined && this.asset.docNo1.trim().length > 3) {
            this.checkUniqueDoc = false;
            this.assetHttpService.checkUniqueDocument(this.asset.docNo1)
            .subscribe((result: any) => {
                // console.log(JSON.stringify(result));
                if (!result) {
                    this.notificationService.showSuccess('OK', 'Verificare unicitate factura', 0, false, 0);
                    this.checkUniqueDoc = true;
                } else if (result) {
                    this.notificationService.showError('NOT OK', 'Verificare unicitate factura', 0, false, 0);
                    this.checkUniqueDoc = false;
                }
            });
        } else {
            this.notificationService.showWarning('Lungimea factura prea scurta pentru verificare!', 'Verificare unicitate factura', 0, false, 0);
            return;
        }
          },500);
    }

    selectFile(event: any): void {

        const fi = this.fileInput.nativeElement;
        Array.from(fi.files).forEach(fileUpload => {
            // const addAssetUpload = new AddAssetUpload();
            // addAssetUpload.files = new Array<any>();
            // addAssetUpload.files.push(file);
            // this.filesToUpload.push(addAssetUpload);
            // console.log(JSON.stringify(fi.files));
            this.filesToUpload.push(fileUpload);
        });
      }

      onAssetFileUpload() {
        const dialogRef = this.dialog.open(UploadModalComponent, {
          panelClass: 'centered-middle-modal', height: '80%', maxHeight: '80%', disableClose: true, width: '600px', position: { bottom: '15%', top: 'auto'},
          data: { uploadType: 'ASSET', uploadFolder: 'RECEPTION', assetId: this.assetId }
        });
        dialogRef.afterClosed().subscribe(() => {
          //
        });
      }

      multipleSelection(event) {
        // console.log(JSON.stringify(event));
      }

      public selectEmployeeReception() {
        this.employeeReceptionListModal.show();
        let params:Array<Param> = Array<Param>();
        params.push(new Param('exceptEmployeeIds', AppUtils.getIdsList<EmployeeResource, number>(this.selectedEmployees())));
        // console.log(JSON.stringify(params));
        this.employeeReceptionList.refresh(params);
    }

    private selectedEmployees(): Array<EmployeeResource> {
      let mappedEmployees: Array<EmployeeResource> = new Array<EmployeeResource>();

      if(this.requestBFMaterialCostCenterList.items.length > 0) {
          this.requestBFMaterialCostCenterList.items.forEach(element => {
              mappedEmployees.push(element.employee);
          });
      }

      return mappedEmployees;
  }

  public setSelectedEmployeeReception() {
    const items: Array<any> = this.employeeReceptionList.selectedItems;
    this.employee = ((items != null) && (items.length > 0)) ? items[0] : null;
    this.employeeReceptionListModal.hide();

    if(this.employee != null){
      let data = new RequestBFMaterialEmployeeUpdate();
      data.employeeId = this.employee.id;
      data.requestBFMaterialCostCenterId = this.requestBFMaterialCostCenterList.selectedItem.id;

      this.requestBFMaterialCostCenterHttpService.updateEmployeeByRequestBudgetForecast(data)
    .subscribe((res) => {
      if (res.statusCode === 200) {
        this.notificationService.showSuccess('Operatia a fost finalizata cu success!', 'Actualizare utilizator mapat', 0, false, 0);
        this.requestBudgetForecastMaterialList.refresh(null);
        this.requestBFMaterialCostCenterList.refresh(null);

        const params: Array<Param> = new Array<Param>();
        params.push(new Param('orderId', this.order != null ? this.order.id.toString() : null));
        this.requestBFMaterialCostCenterAllList.refresh(params);

    } else if (res.statusCode === 404) {
        this.notificationService.showError('Eroare salvare', 'Actualizare utilizator mapat', 0, false, 0);
    }
    }, (error) => {
        this.notificationService.showError('Eroare server', 'Actualizare utilizator mapat', 0, false, 0);
    });
    }
  }

      public selectCostCenterReception() {
        this.costCenterReceptionListModal.show();
        let params:Array<Param> = Array<Param>();
        params.push(new Param('exceptCostCenterIds', AppUtils.getIdsList<CodeNameEntity, number>(this.selectedCostCenters())));
        // console.log(JSON.stringify(params));
        this.costCenterReceptionList.refresh(params);
    }

    private selectedCostCenters(): Array<CodeNameEntity> {
      let mappedCostCenters: Array<CodeNameEntity> = new Array<CodeNameEntity>();

      if(this.requestBFMaterialCostCenterList.items.length > 0) {
          this.requestBFMaterialCostCenterList.items.forEach(element => {
              mappedCostCenters.push(element.costCenter);
          });
      }

      return mappedCostCenters;
  }

  public setSelectedCostCenterReception() {
    const items: Array<any> = this.costCenterReceptionList.selectedItems;
    this.costCenter = ((items != null) && (items.length > 0)) ? items[0] : null;
    this.costCenterReceptionListModal.hide();

    const aIds: number[] = new Array<number>();
    const costCentersIds: RequestBFMaterialCostCenterAdd = new RequestBFMaterialCostCenterAdd();
    items.forEach(item => {
        const index: number = aIds.indexOf(item.id);
        if (index < 0) { aIds.push(item.id); }
    });

    costCentersIds.costCenterIds = aIds;
    costCentersIds.orderId = this.order != null ? this.order.id : 0;
    costCentersIds.requestBudgetForecastMaterialId = this.requestBudgetForecastMaterialList.selectedItem != null ? this.requestBudgetForecastMaterialList.selectedItem.id : 0;

    this.requestBFMaterialCostCenterHttpService.addMaterialByRequestBudgetForecast(costCentersIds).subscribe( (res) => {
            if (res.statusCode === 200) {
                this.notificationService.showSuccess('Datele au fost salvate cu success!', 'Adauga mapare centru de cost', 0, false, 0);
                this.costCenterReceptionList.refresh(null);

                let params: Array<Param> = new Array<Param>();
                params.push(new Param('requestBudgetForecastMaterialIds', AppUtils.getIdsList<RequestBudgetForecastMaterial, number>([
                  this.requestBudgetForecastMaterialList.selectedItem != null ? this.requestBudgetForecastMaterialList.selectedItem : null ])));
                this.requestBFMaterialCostCenterList.refresh(params);
                this.requestBudgetForecastMaterialList.refresh(null);
                this.materialList.selectedItems = new Array<Material>();

                params = new Array<Param>();
                params.push(new Param('orderId', this.order != null ? this.order.id.toString() : null));
                this.requestBFMaterialCostCenterAllList.refresh(params);


            } else if (res.statusCode === 404) {
                this.notificationService.showError('Nu exista', 'Adauga materiale', 0, false, 0);
                this.materialList.selectedItems = new Array<Material>();
            }
    }, (error) => {
        this.notificationService.showError('Eroare salvare!', 'Adauga mapare material', 0, false, 0);
        this.materialList.selectedItems = new Array<Material>();
    });
  }

  public onDeleteRequestBFMaterialEmployee() {
    this.operationType = OperationType.DeleteRequestBFMaterialCostCenterEmployee;
    this.confirmationMessage = 'Esti sigur?';
    this.confirmationModal.show();
  }



  public onDeleteRequestBFMaterialCostCenter() {
    this.operationType = OperationType.DeleteRequestBFMaterialCostCenter;
    this.confirmationMessage = 'Esti sigur?';
    this.confirmationModal.show();
  }

  public deleteRequestBFMaterialCostCenter() {
    this.requestBFMaterialCostCenterHttpService.deleteMaterialByRequestBudgetForecast(this.requestBFMaterialCostCenterList.selectedItem.id)
    .subscribe((res) => {
        if (res.statusCode === 200) {
            this.notificationService.showSuccess('Operatia a fost finalizata cu success!', 'Stergere CC mapat', 0, false, 0);
            this.requestBudgetForecastMaterialList.refresh(null);
            this.requestBFMaterialCostCenterList.refresh(null);

            const params: Array<Param> = new Array<Param>();
            params.push(new Param('orderId', this.order != null ? this.order.id.toString() : null));
            this.requestBFMaterialCostCenterAllList.refresh(params);

        } else if (res.statusCode === 404) {
            this.notificationService.showError('Eroare salvare', 'Stergere CC mapat', 0, false, 0);
        }
    }, (error) => {
        this.notificationService.showError('Eroare server', 'Stergere CC mapat', 0, false, 0);
    });
  }

  public deleteRequestBFMaterialCostCenterEmployee() {
    this.requestBFMaterialCostCenterHttpService.removeMaterialByRequestBudgetForecastEmployee(this.requestBFMaterialCostCenterList.selectedItem.id)
    .subscribe((res) => {
        if (res.statusCode === 200) {
            this.notificationService.showSuccess('Operatia a fost finalizata cu success!', 'Stergere utilizator mapat', 0, false, 0);
            this.requestBudgetForecastMaterialList.refresh(null);
            this.requestBFMaterialCostCenterList.refresh(null);

            const params: Array<Param> = new Array<Param>();
            params.push(new Param('orderId', this.order != null ? this.order.id.toString() : null));
            this.requestBFMaterialCostCenterAllList.refresh(params);

        } else if (res.statusCode === 404) {
            this.notificationService.showError('Eroare salvare', 'Stergere utilizator mapat', 0, false, 0);
        }
    }, (error) => {
        this.notificationService.showError('Eroare server', 'Stergere utilizator mapat', 0, false, 0);
    });
  }

  public saveCostCenterValidated() {

    this.requestBudgetForecastMaterialCostCenterUpdate = new Array<RequestBudgetForecastMaterialCostCenterUpdate>();

    this.requestBFMaterialCostCenterList.items.forEach(element => {
      // console.log(JSON.stringify(element));
        this.requestBudgetForecastMaterialCostCenterUpdate.push(new RequestBudgetForecastMaterialCostCenterUpdate(element.id, element.quantity, element.valueRon));
    });
    this.requestBFMaterialCostCenterHttpService.requestBFMaterialCostCenterUpdate(this.requestBudgetForecastMaterialCostCenterUpdate).subscribe((res) => {

        if (res.success) {
            this.notificationService.showSuccess(res.message, 'Actualizare modificari', 0, false, 0);
            this.requestBudgetForecastMaterialList.refresh(null);
            this.requestBudgetForecastList.refresh(null);
            this.requestBFMaterialCostCenterList.refresh(null);

            const params: Array<Param> = new Array<Param>();
            params.push(new Param('orderId', this.order != null ? this.order.id.toString() : null));
            this.requestBFMaterialCostCenterAllList.refresh(params);


        } else {
            this.notificationService.showError(res.message, 'Eroare salvare date!', 0, false, 0);
            this.requestBudgetForecastMaterialList.refresh(null);
            this.requestBudgetForecastList.refresh(null);
            this.requestBFMaterialCostCenterList.refresh(null);
        }
    }, (error) => {
        this.notificationService.showError('', 'Eroare server!', 0, false, 0);
        this.requestBudgetForecastMaterialList.refresh(null);
        this.requestBudgetForecastList.refresh(null);
    });
  }

  public updateCostCenterMultiple() {

    this.requestBudgetForecastMaterialCostCenterMultiple = new Array<RequestBudgetForecastMaterialCostCenterMultiple>();

    this.requestBFMaterialCostCenterList.items.forEach(element => {
      // console.log(JSON.stringify(element));
        this.requestBudgetForecastMaterialCostCenterMultiple.push(new RequestBudgetForecastMaterialCostCenterMultiple(element.id, element.multiple));
    });
    this.requestBFMaterialCostCenterHttpService.requestBFMaterialCostCenterMultiple(this.requestBudgetForecastMaterialCostCenterMultiple).subscribe((res) => {

        if (res.success) {
            this.notificationService.showSuccess(res.message, 'Actualizare multiplu', 0, false, 0);
            this.requestBudgetForecastMaterialList.refresh(null);
            this.requestBudgetForecastList.refresh(null);
            this.requestBFMaterialCostCenterList.refresh(null);

            const params: Array<Param> = new Array<Param>();
            params.push(new Param('orderId', this.order != null ? this.order.id.toString() : null));
            this.requestBFMaterialCostCenterAllList.refresh(params);

        } else {
            this.notificationService.showError(res.message, 'Eroare salvare date!', 0, false, 0);
            this.requestBudgetForecastMaterialList.refresh(null);
            this.requestBudgetForecastList.refresh(null);
            this.requestBFMaterialCostCenterList.refresh(null);
        }
    }, (error) => {
        this.notificationService.showError('', 'Eroare server!', 0, false, 0);
        this.requestBudgetForecastMaterialList.refresh(null);
        this.requestBudgetForecastList.refresh(null);
    });
  }

  public changeRowSelection() {
    if (this.assetRowSelection === 'single') {
        this.assetRowSelection = 'multiple';
    } else {

      let selectedRequestBudgetForecasts = new Array<any>();
      this.requestBudgetForecastList.selectedItems = selectedRequestBudgetForecasts;

      let selectedRequestBFMaterialCostCenters = new Array<any>();
      this.requestBFMaterialCostCenterList.selectedItems = selectedRequestBFMaterialCostCenters;

      let selectedRequestBudgetForecastMaterials = new Array<any>();
      this.requestBudgetForecastMaterialList.selectedItems = selectedRequestBudgetForecastMaterials;
        // this.selectedAssetId = 0;
        this.assetRowSelection = 'single';
    }
}

public get sumMaxMaterialCostCenters(): boolean {
  let error = 0;
  let result = [];
  if(this.requestBFMaterialCostCenterAllList != null && this.requestBFMaterialCostCenterAllList.items.length > 0){
    this.requestBFMaterialCostCenterAllList.items.reduce(function(res, value) {
      if (!res[value.requestBGTFM.id]) {
        res[value.requestBGTFM.id] = { requestBGTFMId: value.requestBGTFM.id, quantity: 0, maxQuantity: 0, valueRon: 0, maxValueRon: 0, offerTypeId: 0 };
        result.push(res[value.requestBGTFM.id])
      }
      res[value.requestBGTFM.id].quantity += value.quantity;
      res[value.requestBGTFM.id].maxQuantity = value.maxQuantity;
      res[value.requestBGTFM.id].valueRon += value.valueRon;
      res[value.requestBGTFM.id].maxValueRon = value.maxValueRon;
      res[value.requestBGTFM.id].offerTypeId = value.offerType.id;
      return res;
    }, {});

    for (let index = 0; index < result.length; index++) {
      const element = result[index];
      if(element.offerTypeId == 3){
        if(element.valueRon > element.maxValueRon){
          error++;
        }
      } else {
        if(element.quantity > element.maxQuantity){
          error++;
        }
      }
    }
    // console.log(JSON.stringify(result));
    // console.log(error);
    if(error > 0){
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
}
}

enum OperationType {
  NotSet = 1,
  AssetValidation = 2,
  Delete = 3,
  ProcessAssetOp = 4,
  DeleteRequestBFMaterialCostCenter = 5,
  DeleteRequestBFMaterialCostCenterEmployee = 6
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
