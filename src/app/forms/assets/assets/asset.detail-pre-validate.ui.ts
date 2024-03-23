
import { LocationHttpService } from './../../../services/http/administration/location.http.service';
import { DepartmentHttpService } from './../../../services/http/administration/department.http.service';
import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DocumentType as AppDocumentType } from '../../../model/api/documents/document-type';

// import * as jsbarcode from 'jsbarcode';

import { Param } from '../../../model/common/param';

import { AssetTypeHttpService } from '../../../services/http/assets/asset-type.http.service';
import { AssetCategoryHttpService } from '../../../services/http/assets/asset-category.http.service';
import { AssetClassHttpService } from '../../../services/http/assets/asset-class.http.service';
import { EmployeeHttpService } from '../../../services/http/administration/employee.http.service';
import { PartnerHttpService } from '../../../services/http/documents/partner.http.service';
import { RoomDetailHttpService } from '../../../services/http/administration/room-detail.http.service';
import { AssetCategory } from '../../../model/api/assets/asset-category';
import { AssetType } from '../../../model/api/assets/asset-type';
import { Employee } from '../../../model/api/administration/employee';
import { Location } from '../../../model/api/administration/location';
import { Room } from '../../../model/api/administration/room';
import { Partner } from '../../../model/api/documents/partner';
import { Department } from '../../../model/api/administration/department';
import { Location as NgLocation } from '@angular/common';
import { AssetCategoryDetailComponent } from '../asset-categories/asset-category.detail';
import { AssetCategoryListComponent } from '../asset-categories/asset-category.list';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DictionaryItemDetailComponent } from '../../administrations/dictionary-item/dictionary-item.detail';
import { DictionaryItemListComponent } from '../../administrations/dictionary-item/dictionary-item.list';
import { AssetTypeDetailComponent } from '../asset-types/asset-type.detail';
import { AssetTypeListComponent } from '../asset-types/asset-type.list';
import { EmployeeDetailComponent } from '../../administrations/employees/employee.detail';
import { EmployeeListComponent } from '../../administrations/employees/employee.list';
import { PartnerDetailComponent } from '../../documents/partners/partner.detail';
import { PartnerListComponent } from '../../documents/partners/partner.list';
import { CompanyDetailComponent } from '../companies/company.detail';
import { LocationDetailComponent } from '../../administrations/locations/location.detail';
import { LocationListComponent } from '../../administrations/locations/location.list';
import { CostCenterDetailComponent } from '../../administrations/cost-centers/cost-center.detail';
import { CostCenterListComponent } from '../../administrations/cost-centers/cost-center.list';
import { UomDetailComponent } from '../uoms/uom.detail';
import { UomListComponent } from '../uoms/uom.list';
import { DimensionListComponent } from '../dimensions/dimension.list';
import { RoomListComponent } from '../../administrations/rooms/room.list';
import { DepartmentListComponent } from '../../administrations/departments/department.list';
import { DimensionDetailComponent } from '../dimensions/dimension.detail';
import { AdministrationDetailComponent } from '../../administrations/administrations/administration.detail';
import { AdministrationListComponent } from '../../administrations/administrations/administration.list';
import { AssetOpDetailListComponent } from '../asset-ops/asset-op.detail.list';
import { AssetTypeDropDownListComponent } from '../asset-types/asset-type.drop-down.list';
import { DocumentTypeDropDownListComponent } from '../../documents/document-types/document-type.drop-down.list';
import { EntityFile } from '../../../model/api/common/entity-file';
import { AppConfig } from '../../../config';
import { AssetSave } from '../../../model/api/assets/asset-save';
import { CodeNameEntity } from '../../../model/api/common/code-name-entity';
import { Uom } from '../../../model/api/assets/uom';
import { EmployeeResource } from '../../../model/api/administration/employee-resource';
import { Dimension } from '../../../model/api/administration/dimension';
import { CodePartnerEntity } from '../../../model/api/common/code-partner-entity';
import { AppData } from '../../../app-data';
import { AssetHttpService } from '../../../services/http/assets/asset.http.service';
import { DictionaryItemHttpService } from '../../../services/http/administration/dictionary-item.http.service';
import { InvStateHttpService } from '../../../services/http/inventory/inv-state.http.service';
import { CostCenterHttpService } from '../../../services/http/administration/cost-center.http.service';
import { UomHttpService } from '../../../services/http/assets/uom.http.service';
import { AssetOpHttpService } from '../../../services/http/assets/asset-op.http.service';
import { CompanyHttpService } from '../../../services/http/assets/company.http.service';
import { DocumentTypeHttpService } from '../../../services/http/documents/document-type.http.service';
import { DimensionHttpService } from '../../../services/http/administration/dimension.http.service';
import { AdministrationHttpService } from '../../../services/http/administration/administration.http.service';
import { HttpClient } from '@angular/common/http';
import { InvState } from '../../../model/api/inventory/inv-state';
import { AppUtils } from '../../../common/app.utils';
import { DictionaryItem } from '../../../model/api/administration/dictionary-item';
import { Administration } from '../../../model/api/administration/administration';
import { Company } from '../../../model/api/assets/company';
import { CostCenter } from '../../../model/api/administration/cost-center';
import { EntityFileHttpService } from '../../../services/http/common/entity-file.http.service';
import { CompanyListComponent } from '../companies/company.list';
import { EntityFileListComponent } from '../../common/entity-file.list';
import { DepartmentDetailComponent as DepartmentUIDetail } from '../../administrations/departments/department.detail';
import { RoomDetailComponent as RoomUIDetail } from '../../administrations/rooms/room.detail';
import { InvStateDetail } from '../../inventory/inv-state/inv-state.detail';
import { InvStateList } from '../../inventory/inv-state/inv-state.list';


import { NotificationService } from '../../../services/notification.service';
import { AssetNature } from '../../../model/api/assets/asset-nature';
import { AssetNatureListComponent } from '../asset-natures/asset-nature.list';
import { AssetNatureHttpService } from '../../../services/http/assets/asset-nature.http.service';
import { Project } from '../../../model/api/assets/project';
import { Brand } from '../../../model/api/assets/brand';
import { ProjectList } from '../projects/project.list';
import { BrandList } from '../brands/brand.list';
import { ProjectHttpService } from '../../../services/http/assets/project.http.service';
import { BrandHttpService } from '../../../services/http/assets/brand.http.service';
import { Division } from '../../../model/api/administration/division';
import { DivisionListComponent } from '../../administrations/divisions/division.list';
import { DivisionHttpService } from '../../../services/http/administration/division.http.service';
import { Country } from '../../../model/api/administration/country';
import { County } from '../../../model/api/administration/county';
import { City } from '../../../model/api/administration/city';
import { CountryListComponent } from '../../administrations/countries/country.list';
import { CountyListComponent } from '../../administrations/counties/county.list';
import { CityListComponent } from '../../administrations/cities/city.list';
import { CountryHttpService } from '../../../services/http/administration/contry.http.service';
import { CountyHttpService } from '../../../services/http/administration/county.http.service';
import { CityHttpService } from '../../../services/http/administration/city.http.service';
import { BudgetManagerHttpService } from '../../../services/http/administration/budget-manager.http.service';
import { BudgetManagerList } from '../../administrations/budget-manager/budget-manager.list';
import { BudgetManager } from '../../../model/api/assets/budget-manager';
import { Type } from '../../../model/api/administration/type';
import { Material } from '../../../model/api/administration/material';
import { TypeList } from '../../administrations/types/type.list';
import { MaterialList } from '../../administrations/materials/material.list';
import { TypeHttpService } from '../../../services/http/administration/type.http.service';
import { MaterialHttpService } from '../../../services/http/administration/material.http.service';
import { SubTypeHttpService } from '../../../services/http/administration/sub-type.http.service';
import { SubTypeList } from '../../administrations/sub-types/sub-type.list';
import { AssetClassListComponent } from '../asset-classes/asset-class.list';
import { SubType } from '../../../model/api/administration/sub-type';
import { AssetClass } from '../../../model/api/assets/asset-class';
import { AdmCenter } from '../../../model/api/administration/adm-center';
import { Region } from '../../../model/api/administration/region';
import { AdmCenterListComponent } from '../../administrations/adm-centers/adm-center.list';
import { RegionListComponent } from '../../administrations/regions/region.list';
import { AdmCenterHttpService } from '../../../services/http/administration/adm-center.http.service';
import { RegionHttpService } from '../../../services/http/administration/region.http.service';
import { Order } from '../../../model/api/administration/order';
import { OrderList } from '../../administrations/order/order.list';
import { OrderHttpService } from '../../../services/http/administration/order.http.service';
import { Tax } from '../../../model/api/assets/tax';
import { TaxListComponent } from '../taxs/tax.list';
import { TaxHttpService } from '../../../services/http/assets/tax.http.service';
import { AcquisitionValidateReadOnlyOfferListComponent } from './acquisition-validate-read-only.list';
import { Rate } from '../../../model/api/administration/rate';
import { RateListComponent } from '../rates/rate.list';
import { RateHttpService } from '../../../services/http/administration/rate.http.service';
import { CreateAssetSAPResult } from '../../../model/api/result/create-asset-SAP-result';
import { PartnerRequest } from '../../../model/api/common/partner-request';
import { PartnerCorrelationResponse } from '../../../model/api/common/partner-correlation-response';
import { PartnerResponse } from '../../../model/api/common/partner-response';
import { AssetResult } from '../../../model/api/result/asset-result';
import { OfferMaterialAdd } from '../../../model/api/assets/offer-material-add';
import { OfferMaterialHttpService } from '../../../services/http/administration/offer-material.http.service';
import { UpdateAssetSAPResult } from '../../../model/api/result/update-asset-SAP-result';
// import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AquisitionAssetSAPHttpService } from '../../../services/http/sap/aquisition-asset-sap-http.service';
import { AssetFilter } from '../../../model/api/assets/asset.filter';
import { AssetReceptionFilter } from '../../../model/api/assets/asset-reception.filter';
import { RejectResult } from '../../../model/api/result/reject-result';
import { AssetPreAcquisition } from '../../../model/api/assets/asset-pre-aquisition';
@Component({
    selector: 'app-asset-detail-pre-validate-ui',
    templateUrl: 'asset.detail-pre-validate.ui.html',
    styleUrls: ['asset.detail-pre-validate.ui.scss'],
    providers: [ AssetCategoryHttpService, AssetClassHttpService, CostCenterHttpService, UomHttpService, CompanyHttpService, OrderHttpService,
        AssetTypeHttpService, EntityFileHttpService, EmployeeHttpService, PartnerHttpService, RoomDetailHttpService, AdministrationHttpService,
        DocumentTypeHttpService, LocationHttpService, DictionaryItemHttpService ]
})
export class AssetDetailUIPreValidateComponent implements AfterViewInit  {

    @ViewChild('assetCategoryDetail') public assetCategoryDetail: AssetCategoryDetailComponent;
    @ViewChild('assetCategoryList') public assetCategoryList: AssetCategoryListComponent;

    @ViewChild('assetCategoryDetailModal') public assetCategoryDetailModal: ModalDirective;
    @ViewChild('assetCategoryListModal') public assetCategoryListModal: ModalDirective;

    
    

    @ViewChild('projectList') public projectList: ProjectList;
    @ViewChild('projectListModal') public projectListModal: ModalDirective;

    @ViewChild('orderList') public orderList: OrderList;
    @ViewChild('orderListModal') public orderListModal: ModalDirective;

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

    @ViewChild('taxList') public taxList: TaxListComponent;
    @ViewChild('taxListModal') public taxListModal: ModalDirective;

    @ViewChild('rateList') public rateList: RateListComponent;
    @ViewChild('rateListModal') public rateListModal: ModalDirective;

    @ViewChild('rateNewItemList') public rateNewItemList: RateListComponent;
    @ViewChild('rateNewItemListModal') public rateNewItemListModal: ModalDirective;

    @ViewChild('companyDetail') public companyDetail: CompanyDetailComponent;
    @ViewChild('companyList') public companyList: CompanyListComponent;
    @ViewChild('companyDetailModal') public companyDetailModal: ModalDirective;
    @ViewChild('companyListModal') public companyListModal: ModalDirective;

    @ViewChild('locationDetail') public locationDetail: LocationDetailComponent;
    @ViewChild('locationList') public locationList: LocationListComponent;
    @ViewChild('locationDetailModal') public locationDetailModal: ModalDirective;
    @ViewChild('locationListModal') public locationListModal: ModalDirective;

    @ViewChild('costCenterDetail') public costCenterDetail: CostCenterDetailComponent;
    @ViewChild('costCenterList') public costCenterList: CostCenterListComponent;
    @ViewChild('costCenterDetailModal') public costCenterDetailModal: ModalDirective;
    @ViewChild('costCenterListModal') public costCenterListModal: ModalDirective;

    // @ViewChild('plantList') public plantList: PlantListComponent;
    // @ViewChild('plantListModal') public plantListModal: ModalDirective;

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


    @ViewChild('assetOpDetailList') public assetOpList: AssetOpDetailListComponent;
    @ViewChild('entityFileList') public entityFileList: EntityFileListComponent;

    @ViewChild('confirmationModal') public confirmationModal: ModalDirective;
    @ViewChild('assetTypeDropDownList') public assetTypeDropDownList: AssetTypeDropDownListComponent;
    @ViewChild('documentTypeDropDownList') public documentTypeDropDownList: DocumentTypeDropDownListComponent;
    @ViewChild('fileInput') fileInput;

    @ViewChild('rejectModal') public rejectModal: ModalDirective;

    @ViewChild('acquisitionList') public acquisitionList: AcquisitionValidateReadOnlyOfferListComponent;
    //@ViewChild('acquisitionSAPList') public acquisitionSAPList: AquisitionAssetSAPListComponent;

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
    public asset: AssetPreAcquisition = new AssetPreAcquisition();
    public filesToUpload: Array<File>;
    public selectedAssetOp: any;
    public selectedAcquisitionAsset: any;
    public isSaved: boolean = true;
    public toBeValidated = false;
    public invNoLength = 0;
    public state = 'OK';
    public allowLabel  = 'ETICHETABIL';
    public partnerSearchCUI = '';
    public partnerName = '';
    public partnerCUI = '';
    public correlationId = '';
    public hasPartner: boolean = true;
    public rejectMessage: string = '';
    reason = '';
    public checkUnique = false;
    invoiceDate = '';
    assetValueDate = '';

    public get allowSaving(): boolean {
        // return this.assetCategory != null && this.assetType != null
        // && this.employee != null && this.documentType != null
        //     && this.room != null && this.partner != null && this.asset.documentDate != null;
        // return true;
        if (this.asset.name != null) {
            // return this.assetCategory != null && this.asset.name != null && this.assetType != null && this.department != null
            // && this.location != null && this.room != null && this.partner != null && this.asset != null
            // && this.asset.invNo != null && this.asset.invNo.trim().length > 0 && this.asset.invNo.trim().length === 7 && this.asset.purchaseDate != null;
            return this.asset != null &&
            this.asset.name != null &&
            this.tax != null &&
            this.asset.headerText != null && this.asset.headerText.trim().length > 0 &&
            this.asset.docNo1 != null && this.asset.docNo1.trim().length > 0 &&
            this.asset.quantity > 0;
        } else {
            // return this.assetCategory != null && this.dictionaryItem != null && this.assetType != null && this.department != null
            // && this.location != null && this.room != null && this.partner != null && this.asset != null
            // && this.asset.invNo != null && this.asset.invNo.trim().length > 0 && this.asset.invNo.trim().length === 7 && this.asset.purchaseDate != null;
            return this.asset != null &&
            this.dictionaryItem != null &&
            this.asset.quantity > 0;
        }
    }
    public invState: CodeNameEntity = null;
    public assetCategory: AssetCategory = null;
    
    public project: Project = null;
    public order: Order = null;
    public brand: Brand = null;
    
    public dictionaryItem: CodeNameEntity = null;
    public costCenter: CodeNameEntity = null;
    public plant: CodeNameEntity = null;
    public uom: Uom = null;
    public assetNature: AssetNature = null;
    public employee: Employee = null;
    public department: CodeNameEntity = null;
    public company: CodeNameEntity = null;
    public account: CodeNameEntity = null;
    public expAccount: CodeNameEntity = null;
    public subCategory: CodeNameEntity = null;
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
    public partner: Partner = null;
    public room: Room = null;
    public assetType: CodeNameEntity = null;
    // public documentType: CodeNameEntity = null;
    public administration: CodeNameEntity = null;
    public valueInvIn: number = null;
    public valueDepYTD: number = null;
    public valueDepPU: number = null;
    public uomFinal: Uom = null;
    public dimensionFinal: Dimension = null;
    public tax: Tax = null;
    public rate: Rate = null;
    public rateNewItem: Rate = null;
    public readOnlyForm: boolean = false;
    public get isAdmin(): boolean { return AppData.UserIsAdmin; }
    // public get isSuperUser(): boolean { return AppData.UserIsSuperUser; }
    public initialInvNo: string = '';
    // public uomIdFinal: number = 0;
    // public dimensionIdFinal: number = 0;
    // public info2019: string = '';
    // public serialNumberFinal: string = '';

    // public invNo: string = '';
    // public name: string = '';
    // public serialNumber: string = '';
    // public erpCode: string = '';
    // public docNo1: string = '';
    // public docNo2: string = '';
    // public documentDate: Date;
    // public validated: boolean = false;

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
        public taxHttpService: TaxHttpService,
        public rateHttpService: RateHttpService,
        public notificationService: NotificationService,
        public aquisitionAssetSAPHttpService: AquisitionAssetSAPHttpService,
        
        // public vcr: ViewContainerRef,
        public http: HttpClient,
        public entityFileHttpService: EntityFileHttpService) {

        this.route.params.subscribe((params: Params) => {
            if (params['id']) {
                 // let id: number = +params['id'];
                 this.assetId = +params['id'];
                //  this.uomIdFinal = +params['uomId'];
                //  this.dimensionIdFinal = +params['dimensionId'];
                //  this.info2019 = params['info2019'];
                //  this.serialNumberFinal = params['serialNumberFinal'];
            } else {
                // this.asset = new AssetSave();
                // this.asset.depPeriod = 0;
                this.asset.valueInv = 0;
                this.asset.quantity = 0;

            }
        });
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

                    if (asset.validated) {
                        const docNo1 = asset.document.docNo1;
                        // this.refreshAssetOperations();
                        this.refreshEntityFiles();
                        this.refreshAcquisitions(docNo1);
                    } else {
                       // this.refreshAssetTypes();
                       // this.refreshDocumentTypes();
                    }

                    this.generateBarcode();
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

    public setSelectedState(selectedState: boolean) {
        // this.asset.allowLabel = selectedState;
        // this.allowLabel = selectedState === true ? 'DA' : 'NU';
    }

    // public updateInventoryUomDetails() {
    //     this.uomHttpService.getById(this.uomIdFinal).subscribe((uom: Uom) => {
    //         this.uomFinal = uom;
    //     });
    // }

    // public updateInventoryDimensionDetails() {
    //     this.dimensionHttpService.getById(this.dimensionIdFinal).subscribe((dimension: Dimension) => {
    //         this.dimensionFinal = dimension;
    //     });
    // }

    public setSelectedDuplicate(duplicate: boolean) {
        // this.asset.isDuplicate = duplicate;
    }


    public refreshEntityFiles() {
        const params: Array<Param> = new Array<Param>();

        params.push(new Param('entityTypeCode', 'NEWASSET'));
        params.push(new Param('entityId', this.assetId.toString()));

        this.entityFileList.refresh(params);
    }

    // public refreshAssetOperations() {
    //     const params: Array<Param> = new Array<Param>();

    //     params.push(new Param('assetId', this.assetId.toString()));
    //     this.assetOpList.refresh(params);

    //     // this.assetOpSimpleDetailMemoryService.setDataSource(new Array<AssetOpSd>());

    //     // this.assetOpHttpService.getSimpleDetailByAsset(this.assetId).subscribe((assetOps: Array<AssetOpSd>) => {
    //     //     assetOps.sort((i1, i2) => i2.id - i1.id)
    //     //     this.assetOpSimpleDetailMemoryService.setDataSource(assetOps);
    //     //     this.assetOpList.refresh(null);
    //     // });
    // }


    public refreshAcquisitions(docNo1: string){
        const params: Array<Param> = new Array<Param>();

        params.push(new Param('docNo1', docNo1));
        this.acquisitionList.refresh(params);
    }

    public refreshAssetTypes() {
       // this.assetTypeDropDownList.refresh(null);  // ORIGINAL
        // this.documentTypeDropDownList.refresh(null);  // OTP
    }

    // public refreshDocumentTypes() {
    //     const params: Array<Param> = new Array<Param>();
    //     params.push(new Param('parentCode', 'ACQUISITION'));
    //     this.documentTypeDropDownList.refresh(params);
    // }

    public updateDetails(asset: any) {
        // this.account = asset.account;
        // this.expAccount = asset.expAccount;
        // this.assetCategory = asset.assetCategory;
        // this.partner = asset.partner;
        // this.article = asset.article;
        // this.costCenter = asset.costCenter;
        // this.division = asset.division;
        // this.department = asset.department;
        // this.room = asset.room;
        // this.budgetManager = asset.budgetManager;
        // this.assetNature = asset.assetNature;
        // this.type = asset.type;
        // this.employee = asset.employee;
        this.material = asset.material;
        // this.interCompany = asset.interCompany;
        // this.subType = asset.subType;
        this.assetClass = asset.assetClass;
       // this.subCategory = asset.subCategory;
        // this.admCenter = asset.admCenter;
        // this.region = asset.region;
        // this.insuranceCategory = asset.insuranceCategory;
        // this.assetType = asset.assetType;
        // this.project = asset.project;
        this.uom = asset.uom;
        this.order = asset.order;
        this.dictionaryItem = asset.dictionaryItem;
        this.tax = asset.tax;
        this.rate = asset.rate;
        this.asset.invNo = asset.invNo;
        this.asset.subNo = asset.subNo;
        this.asset.name = asset.name;
        this.asset.quantity = asset.quantity;
        this.asset.license = asset.license;
        this.asset.docNo1 = asset.docNo1;
        this.asset.serialNumber = asset.serialNumber;
        this.asset.agreement = asset.agreement;
        this.asset.manufacturer = asset.manufacturer;
        this.asset.sapCode = asset.sapCode;
        this.asset.headerText = asset.headerText;
        this.asset.invoiceDate = asset.invoiceDate;
        this.asset.stornoValue = asset.stornoValue;
        this.asset.stornoValueRon = asset.stornoValueRon;
        this.asset.stornoQuantity = asset.stornoQuantity;
        this.asset.storno = asset.storno;
        // this.asset.depPeriodMonth = asset.depPeriodMonth;
        // this.asset.depPeriod = asset.depPeriod;
        // this.asset.depPeriodIn = asset.depPeriodIn;
        // this.asset.depPeriodRem = asset.depPeriodRem;
        // this.asset.valueInvIn = asset.valueInvIn;
        // this.asset.valueDepIn = asset.valueDepIn;
        // this.asset.valueDepPU = asset.valueDepPU;
        // this.asset.valueDepYTDIn = asset.valueDepYTDIn;
        // this.asset.valueDepYTD = asset.valueDepYTD;
        // this.asset.valueRet = asset.valueRet;
        // this.asset.valueRetIn = asset.valueRetIn;
        // this.asset.valueDepPUIn = asset.valueDepPUIn;
        // this.asset.valueTr = asset.valueTr;
        // this.asset.valueTrIn = asset.valueTrIn;
        // this.asset.valueRem = asset.valueRem;
        // this.asset.valueRemIn = asset.valueRemIn;
        // this.asset.investSupport = asset.investSupport;
        // this.asset.writeUps = asset.writeUps;
        // this.asset.valueInv = asset.valueInv;
        // this.asset.valueDep = asset.valueDep;
        this.asset.purchaseDate = asset.purchaseDate;
        // this.asset.invoiceDate = asset.invoiceDate;
        this.asset.removalDate = asset.removalDate;
        this.asset.valueInvRon = asset.valueInvRon;
        this.asset.rateValue = asset.rateValue;
        this.asset.validated = asset.validated;
        this.asset.id = asset.id;

        if (asset.document != null) {
            this.asset.docNo1 = asset.document.docNo1;
            // this.asset.docNo2 = asset.document.docNo2;
            // this.asset.documentDate = asset.purchaseDate;
            // this.asset.model = asset.document.model;
            // this.documentType = asset.document.documentType;
            this.partner = asset.document.partner;
            // this.asset.partnerDate = asset.document.creationDate;
            // this.asset.partner = asset.document.partner;
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
            // this.material = asset.adm.material;
            
            this.subType = asset.adm.subType;
            this.assetClass = asset.adm.assetClass;
            this.admCenter = asset.adm.admCenter;
            this.region = asset.adm.region;
            
            this.assetType = asset.adm.assetType;
            this.project = asset.adm.project;
            this.company = asset.adm.company;
        }

        if (asset.dep != null) {

            this.asset.depPeriodIn = asset.dep.depPeriodIn;
            this.asset.depPeriod = asset.dep.depPeriod;
            this.asset.depPeriodMonth = asset.dep.depPeriodMonth;
            this.asset.depPeriodRem = asset.dep.depPeriodRem;
            this.asset.valueInvIn = asset.dep.valueInvIn;
            this.asset.valueDepIn = asset.dep.valueDepIn;
            this.asset.valueDepPU = asset.dep.valueDepPU;
            this.asset.valueDepYTDIn = asset.dep.valueDepYTDIn;
            this.asset.valueDepYTD = asset.dep.valueDepYTD;
            this.asset.valueRet = asset.dep.valueRet;
            this.asset.valueRetIn = asset.dep.valueRetIn;
            this.asset.valueDepPUIn = asset.dep.valueDepPUIn;
            this.asset.valueTr = asset.dep.valueTr;
            this.asset.valueTrIn = asset.dep.valueTrIn;
            this.asset.valueRem = asset.dep.valueRem;
            this.asset.valueRemIn = asset.dep.valueRemIn;
            this.asset.investSupport = asset.dep.investSupport;
            this.asset.writeUps = asset.dep.writeUps;
            this.asset.valueInv = asset.dep.valueInv;
            this.asset.valueDep = asset.dep.valueDep;

        }
    }
    //  public setSelectedDocumentType(documentTypes: Array<AppDocumentType>) {
    //     this.documentType = ((documentTypes != null) && (documentTypes.length > 0)) ? documentTypes[0] : null;
    // }

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
        let items: Array<Order> = this.orderList.selectedItems;
        this.order = ((items != null) && (items.length === 1)) ? items[0] : null;
        this.orderListModal.hide();
    }

    /*end ORDER */


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
        // let selectedAssetCategories: Array<AssetCategory> = null;

        if (this.assetCategory !== null) {
            this.selectedAssetCategories = new Array<AssetCategory>();
            this.selectedAssetCategories.push(this.assetCategory);
            // this.assetCategoryList.selectedItems = this.selectedAssetCategories;
        }

        let params = new Array<Param>();

        params.push(new Param('assetCategoryIds', AppUtils.getIdsList<AssetCategory, number>(this.selectedAssetCategories)));

        this.dictionaryItemList.refresh(null);
        this.dictionaryItemListModal.show();
    }

    public setSelectedDictionaryItem() {
        let items: Array<DictionaryItem> = this.dictionaryItemList.selectedItems;
        this.dictionaryItem = ((items != null) && (items.length === 1)) ? items[0] : null;

        // this.assetType = items[0].assetType;
        this.dictionaryItemListModal.hide();
    }

    public addDictionaryItem() {
        this.dictionaryItemDetail.addNew();
        this.dictionaryItemDetailModal.show();
    }

    public dictionaryItemAdded(dictionaryItem: DictionaryItem) {
        this.dictionaryItem = dictionaryItem;
        this.dictionaryItemDetailModal.hide();
    }

    public dictionaryItemAddCanceled() {
        this.dictionaryItemDetailModal.hide();
    }
    


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
        this.employeeList.refresh(null);
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
        public addCostCenter() {
            this.costCenterDetail.addNew();
            this.costCenterDetailModal.show();
        }
        public costCenterAdded(costCenter: CostCenter) {
            this.costCenter = costCenter;
            this.costCenterDetailModal.hide();
        }

        public costCenterAddCanceled() {
            this.costCenterDetailModal.hide();
        }
        /*end costcenter */


        //   /* begin plant */
        // public selectPlant() {
        //     this.plantList.refresh(null);
        //     this.plantListModal.show();
        // }
        // public setSelectedPlant() {
        //     let items: Array<Plant> = this.plantList.selectedItems;
        //     this.plant = ((items != null) && (items.length === 1)) ? items[0] : null;
        //     this.plantListModal.hide();
        // }
        // /*end plant */

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
        // this.partnerSearchCUI = '14399840';
        const request = new PartnerRequest(this.partner.registryNumber, this.getNowDate(), this.partner.id);
        // request.push(new PartnerRequest(this.partnerSearchCUI, this.getNowDate()));
        this.partnerHttpService.requestByCUI(request).subscribe( async (res: boolean) => {
            // console.log(JSON.stringify(res));
            // this.getPartnerByCorrelationId(res.correlationId);
            if (res) {
               // this.getPartnerByCorrelationId(res.correlationId);
               this.assetHttpService.getDetailById(this.assetId)
                .subscribe((asset: any) => {
                    this.initialInvNo = asset.invNo.toString().trim();
                    this.updateDetails(asset);

                    if (asset.validated) {
                        const docNo1 = asset.document.docNo1;
                        this.refreshEntityFiles();
                        this.refreshAcquisitions(docNo1);
                    }

                    this.generateBarcode();
                });
            }
        }, error => {
            alert(JSON.stringify(error));
        });
    }

     async getPartnerByCorrelationId(correlationId: string) {
        this.partnerHttpService.requestByCorrelationId(correlationId).subscribe ( async  (response: PartnerCorrelationResponse) => {
            console.log(JSON.stringify(response));
            this.partnerName = response.found[0].denumire;
            this.partnerCUI = response.found[0].cui;

            if (this.partnerName === '') {
                alert('CUI-ul introdus nu exista!');
                this.hasPartner = false;
            }
        }, error => {
            alert(JSON.stringify(error));
        });
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
        this.router.navigate(['/asset/validate']);
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

    public deleteOrderitem() {
            this.assetHttpService.deleteOrderItem(this.selectedAcquisitionAsset.id)
            .subscribe((result: AssetResult) => {
                if (result.success) {
                    this.notificationService.showHTMLMessage('<h6>' + result.errorMessage + '!!</h6>', 'Stergere produs comanda');
                    this.acquisitionList.refreshItems();
                } else if (!result.success) {
                    this.notificationService.showError('Motiv: ' + result.errorMessage + '!', 'Eroare salvare date', 0, false, 0);
                }
            });
    }

    public onValidateAsset() {
        this.operationType = OperationType.AssetValidation;
        this.confirmationMessage = 'Validati inregistrarea curenta?';
        this.confirmationModal.show();
    }

    public validateAsset() {
        this.asset.validated = true;
        this.saveAsset();
    }

    public addNewOperation() {
        // let assets: Array<AssetSimpleDetail> = new Array<AssetSimpleDetail>();
        // assets.push(new AssetSimpleDetail(this.asset.id, this.asset.invNo, this.asset.assetName,
        //     '', this.asset.partner, this.asset.assetType, this.asset.accState, this.asset.usageStartDate, '', ''));
        // AppData.AssetList = assets;
        // this.router.navigate(['/newoperation']);
    }

        /* BEGIN TAX  */
        public selectTax() {

            this.taxList.refresh(null);
            this.taxListModal.show();
        }
        public setSelectedTax() {
            const items: Array<Tax> = this.taxList.selectedItems;
            this.tax = ((items != null) && (items.length === 1)) ? items[0] : null;
            this.taxListModal.hide();
        }
        /* END RATE  */

          /* BEGIN TAX  */
          public selectRate() {

            const params: Array<Param> = new Array<Param>();
            params.push(new Param('date', this.invoiceDate));
            // params.push(new Param('showLast', 'true'));
            this.rateList.refresh(params);
            this.rateListModal.show();
        }
        public setSelectedRate() {
            const items: Array<Rate> = this.rateList.selectedItems;
            this.rate = ((items != null) && (items.length === 1)) ? items[0] : null;
            this.rateListModal.hide();
        }
        /* END RATE  */

    checkCheckBoxInConservationvalue(event) {
        // console.log(event.checked);
        this.asset.inConservation = event.checked;
        }

        checkCheckBoxPostCapvalue(event) {
        console.log(event.checked);
        this.asset.postCap = event.checked;
        }

        changeInvoiceDate(event) {
             // console.log(event.target.value);
             this.invoiceDate = event.target.value;
             this.rate = null;
            }

        changeAssetValueDate(event) {
            // console.log(event.target.value);
            this.assetValueDate = event.target.value;
            // this.rate = null;
        }


    public updateAsset() {
        this.isSaved = false;

        this.asset.accountId =  this.account != null ? this.account.id : null;
        this.asset.expAccountId =  this.expAccount != null ? this.expAccount.id : null;
        this.asset.assetCategoryId = this.assetCategory != null ? this.assetCategory.id : null;
        this.asset.partnerId = this.partner != null ? this.partner.id : null;
        this.asset.articleId = this.article != null ? this.article.id : null;
        this.asset.costCenterId = this.costCenter != null ? this.costCenter.id : null;
        this.asset.divisionId = this.division != null ? this.division.id : null;
        this.asset.departmentId = this.department != null ? this.department.id : null;
        this.asset.roomId = this.room != null ? this.room.id : null;
        this.asset.budgetManagerId = this.budgetManager != null ? this.budgetManager.id : null;
        this.asset.assetNatureId = this.assetNature != null ? this.assetNature.id : null;
        this.asset.typeId = this.type != null ? this.type.id : null;
        this.asset.employeeId = this.employee != null ? this.employee.id : null;
        this.asset.materialId = this.material != null ? this.material.id : null;
        
        this.asset.subTypeId = this.subType != null ? this.subType.id : null;
        this.asset.assetClassId = this.assetClass != null ? this.assetClass.id : null;
        this.asset.admCenterId = this.admCenter != null ? this.admCenter.id : null;
        this.asset.regionId = this.region != null ? this.region.id : null;
            this.asset.assetTypeId = this.assetType != null ? this.assetType.id : null;
        this.asset.projectId = this.project != null ? this.project.id : null;
        this.asset.orderId = this.order != null ? this.order.id : null;
        this.asset.dictionaryItemId = this.dictionaryItem != null ? this.dictionaryItem.id : null;
        this.asset.invNo = this.asset.invNo;
        this.asset.subNo = this.asset.subNo;
        this.asset.quantity = this.asset.quantity;
        this.asset.license = this.asset.license;
        this.asset.docNo1 = this.asset.docNo1;
        this.asset.serialNumber = this.asset.serialNumber;
        this.asset.agreement = this.asset.agreement;
        this.asset.manufacturer = this.asset.manufacturer;
        this.asset.sapCode = this.asset.sapCode;
        this.asset.depPeriodMonth = this.asset.depPeriodMonth;
        this.asset.depPeriod = this.asset.depPeriod;
        this.asset.depPeriodIn = this.asset.depPeriodIn;
        this.asset.depPeriodRem = this.asset.depPeriodRem;
        this.asset.valueInvIn = this.asset.valueInvIn;
        this.asset.valueDepIn = this.asset.valueDepIn;
        this.asset.valueDepPU = this.asset.valueDepPU;
        this.asset.valueDepYTDIn = this.asset.valueDepYTDIn;
        this.asset.valueDepYTD = this.asset.valueDepYTD;
        this.asset.valueRet = this.asset.valueRet;
        this.asset.valueRetIn = this.asset.valueRetIn;
        this.asset.valueDepPUIn = this.asset.valueDepPUIn;
        this.asset.valueTr = this.asset.valueTr;
        this.asset.valueTrIn = this.asset.valueTrIn;
        this.asset.valueRem = this.asset.valueRem;
        this.asset.valueRemIn = this.asset.valueRemIn;
        this.asset.investSupport = this.asset.investSupport;
        this.asset.writeUps = this.asset.writeUps;
        this.asset.valueInv = this.asset.valueInv;
        this.asset.valueDep = this.asset.valueDep;
        this.asset.purchaseDate = this.asset.purchaseDate;
        this.asset.invoiceDate = this.asset.invoiceDate;
        this.asset.removalDate = this.asset.removalDate;
        this.asset.validated = true;

        this.asset.subCategoryId =  this.subCategory != null ? this.subCategory.id : null;


        if (this.asset.id > 0) {
             this.assetHttpService.updatePreAcquisition(this.asset)
            .subscribe((res: UpdateAssetSAPResult) => {
              if(res.success){
                this.notificationService.showSuccess(res.errorMessage, 'Actualizare date', 2000, 0, 0);
                this.isSaved = true;
                this.assetHttpService.getDetailById(this.asset.id)
                .subscribe((asset: any) => {
                    if (asset != null) {
                        this.updateDetails(asset);
                    }
                });
              }else {
                this.notificationService.showError(res.errorMessage, 'Actualizare date', 0, 0, 0);
              }
            });
        }
    }

    public approveAsset() {
      this.isSaved = false;

      if (this.asset.id > 0) {
           this.assetHttpService.approvePreReception(this.asset.id)
          .subscribe((res: UpdateAssetSAPResult) => {
            if(res.success){
              this.notificationService.showInfo(res.errorMessage, 'Aprobare pre -receptie', 2000, 0, 0);
              this.isSaved = true;
              this.router.navigate(['/asset/prevalidate']);
            }else {
              this.notificationService.showError(res.errorMessage, 'Aprobare pre -receptie', 0, 0, 0);
            }
          });
      }
  }

    public saveAsset() {
        this.isSaved = false;

        this.asset.accountId =  this.account != null ? this.account.id : null;
        this.asset.expAccountId =  this.expAccount != null ? this.expAccount.id : null;
        this.asset.assetCategoryId = this.assetCategory != null ? this.assetCategory.id : null;
        this.asset.partnerId = this.partner != null ? this.partner.id : null;
        this.asset.articleId = this.article != null ? this.article.id : null;
        this.asset.costCenterId = this.costCenter != null ? this.costCenter.id : null;
        this.asset.divisionId = this.division != null ? this.division.id : null;
        this.asset.departmentId = this.department != null ? this.department.id : null;
        this.asset.roomId = this.room != null ? this.room.id : null;
        this.asset.budgetManagerId = this.budgetManager != null ? this.budgetManager.id : null;
        this.asset.assetNatureId = this.assetNature != null ? this.assetNature.id : null;
        this.asset.typeId = this.type != null ? this.type.id : null;
        this.asset.employeeId = this.employee != null ? this.employee.id : null;
        this.asset.materialId = this.material != null ? this.material.id : null;
        
        this.asset.subTypeId = this.subType != null ? this.subType.id : null;
        this.asset.assetClassId = this.assetClass != null ? this.assetClass.id : null;
        this.asset.admCenterId = this.admCenter != null ? this.admCenter.id : null;
        this.asset.regionId = this.region != null ? this.region.id : null;
            this.asset.assetTypeId = this.assetType != null ? this.assetType.id : null;
        this.asset.projectId = this.project != null ? this.project.id : null;
        this.asset.orderId = this.order != null ? this.order.id : null;
        this.asset.dictionaryItemId = this.dictionaryItem != null ? this.dictionaryItem.id : null;
        this.asset.invNo = this.asset.invNo;
        this.asset.subNo = this.asset.subNo;
        this.asset.quantity = this.asset.quantity;
        this.asset.license = this.asset.license;
        this.asset.docNo1 = this.asset.docNo1;
        this.asset.serialNumber = this.asset.serialNumber;
        this.asset.agreement = this.asset.agreement;
        this.asset.manufacturer = this.asset.manufacturer;
        this.asset.sapCode = this.asset.sapCode;
        this.asset.depPeriodMonth = this.asset.depPeriodMonth;
        this.asset.depPeriod = this.asset.depPeriod;
        this.asset.depPeriodIn = this.asset.depPeriodIn;
        this.asset.depPeriodRem = this.asset.depPeriodRem;
        this.asset.valueInvIn = this.asset.valueInvIn;
        this.asset.valueDepIn = this.asset.valueDepIn;
        this.asset.valueDepPU = this.asset.valueDepPU;
        this.asset.valueDepYTDIn = this.asset.valueDepYTDIn;
        this.asset.valueDepYTD = this.asset.valueDepYTD;
        this.asset.valueRet = this.asset.valueRet;
        this.asset.valueRetIn = this.asset.valueRetIn;
        this.asset.valueDepPUIn = this.asset.valueDepPUIn;
        this.asset.valueTr = this.asset.valueTr;
        this.asset.valueTrIn = this.asset.valueTrIn;
        this.asset.valueRem = this.asset.valueRem;
        this.asset.valueRemIn = this.asset.valueRemIn;
        this.asset.investSupport = this.asset.investSupport;
        this.asset.writeUps = this.asset.writeUps;
        this.asset.valueInv = this.asset.valueInv;
        this.asset.valueDep = this.asset.valueDep;
        this.asset.purchaseDate = this.asset.purchaseDate;
        // this.asset.invoiceDate = this.asset.invoiceDate;
        this.asset.removalDate = this.asset.removalDate;
        this.asset.validated = true;


        if (this.asset.id > 0) {
             this.assetHttpService.validateAsset(this.asset)
            .subscribe(() => {
                this.assetHttpService.getDetailById(this.asset.id)
                    .subscribe((asset: any) => {
                        if (asset != null) {
                            this.notificationService.showSuccess('', 'Datele au fost validate cu succes!', 0, false, 0);
                            this.isSaved = true;
                            this.updateDetails(asset);
                        }
                    });
            });
        }
    }

    public acqizitionAsset() {
        this.isSaved = false;

        this.asset.accountId =  this.account != null ? this.account.id : null;
        this.asset.expAccountId =  this.expAccount != null ? this.expAccount.id : null;
        this.asset.assetCategoryId = this.assetCategory != null ? this.assetCategory.id : null;
        this.asset.partnerId = this.partner != null ? this.partner.id : null;
        this.asset.articleId = this.article != null ? this.article.id : null;
        this.asset.costCenterId = this.costCenter != null ? this.costCenter.id : null;
        this.asset.divisionId = this.division != null ? this.division.id : null;
        this.asset.departmentId = this.department != null ? this.department.id : null;
        this.asset.roomId = this.room != null ? this.room.id : null;
        this.asset.budgetManagerId = this.budgetManager != null ? this.budgetManager.id : null;
        this.asset.assetNatureId = this.assetNature != null ? this.assetNature.id : null;
        this.asset.typeId = this.type != null ? this.type.id : null;
        this.asset.employeeId = this.employee != null ? this.employee.id : null;
        this.asset.materialId = this.material != null ? this.material.id : null;
        
        this.asset.subTypeId = this.subType != null ? this.subType.id : null;
        this.asset.assetClassId = this.assetClass != null ? this.assetClass.id : null;
        this.asset.admCenterId = this.admCenter != null ? this.admCenter.id : null;
        this.asset.regionId = this.region != null ? this.region.id : null;
            this.asset.assetTypeId = this.assetType != null ? this.assetType.id : null;
        this.asset.projectId = this.project != null ? this.project.id : null;
        this.asset.orderId = this.order != null ? this.order.id : null;
        this.asset.dictionaryItemId = this.dictionaryItem != null ? this.dictionaryItem.id : null;
        this.asset.uomId = this.uom != null ? this.uom.id : null;
        this.asset.invNo = this.asset.invNo;
        this.asset.subNo = this.asset.subNo;
        this.asset.quantity = this.asset.quantity;
        this.asset.license = this.asset.license;
        this.asset.docNo1 = this.asset.docNo1;
        this.asset.serialNumber = this.asset.serialNumber;
        this.asset.agreement = this.asset.agreement;
        this.asset.manufacturer = this.asset.manufacturer;
        this.asset.sapCode = this.asset.sapCode;
        this.asset.depPeriodMonth = this.asset.depPeriodMonth;
        this.asset.depPeriod = this.asset.depPeriod;
        this.asset.depPeriodIn = this.asset.depPeriodIn;
        this.asset.depPeriodRem = this.asset.depPeriodRem;
        this.asset.valueInvIn = this.asset.valueInvIn;
        this.asset.valueDepIn = this.asset.valueDepIn;
        this.asset.valueDepPU = this.asset.valueDepPU;
        this.asset.valueDepYTDIn = this.asset.valueDepYTDIn;
        this.asset.valueDepYTD = this.asset.valueDepYTD;
        this.asset.valueRet = this.asset.valueRet;
        this.asset.valueRetIn = this.asset.valueRetIn;
        this.asset.valueDepPUIn = this.asset.valueDepPUIn;
        this.asset.valueTr = this.asset.valueTr;
        this.asset.valueTrIn = this.asset.valueTrIn;
        this.asset.valueRem = this.asset.valueRem;
        this.asset.valueRemIn = this.asset.valueRemIn;
        this.asset.investSupport = this.asset.investSupport;
        this.asset.writeUps = this.asset.writeUps;
        this.asset.valueInv = this.asset.valueInv;
        this.asset.valueDep = this.asset.valueDep;
        this.asset.purchaseDate = this.asset.purchaseDate;
        this.asset.invoiceDate = this.asset.invoiceDate;
        this.asset.assetValueDate = this.asset.assetValueDate;
        this.asset.removalDate = this.asset.removalDate;
        this.asset.headerText = this.asset.headerText;
        this.asset.taxId = this.tax != null ? this.tax.id : null;
        this.asset.rateId = this.rate != null ? this.rate.id : null;
        this.asset.valueInvRon = this.asset.valueInvRon;
        this.asset.rateValue = this.asset.rateValue;
        this.asset.storno = this.asset.storno;
        this.asset.stornoQuantity = this.asset.stornoQuantity;
        this.asset.stornoValue = this.asset.stornoValue;
        this.asset.stornoValueRon = this.asset.stornoValueRon;
        this.asset.validated = true;




        if (this.asset.id > 0) {
          this.assetHttpService.acquizitionAsset(this.asset)
          .subscribe((result: CreateAssetSAPResult) => {
              if (result.success) {
                  this.notificationService.showSuccess('Operatia a fost finalizata cu success!', 'Validare asset', 0, false, 0);
                  this.router.navigate(['/asset/validate']);
              } else if (!result.success) {
                  this.notificationService.showError('Motiv: ' + result.errorMessage + '!', 'Eroare salvare date', 0, false, 0);
              }
          });

        }
    }


    public validateAcqizitionAsset() {
      this.isSaved = false;

      this.asset.accountId =  this.account != null ? this.account.id : null;
      this.asset.expAccountId =  this.expAccount != null ? this.expAccount.id : null;
      this.asset.assetCategoryId = this.assetCategory != null ? this.assetCategory.id : null;
      this.asset.partnerId = this.partner != null ? this.partner.id : null;
      this.asset.articleId = this.article != null ? this.article.id : null;
      this.asset.costCenterId = this.costCenter != null ? this.costCenter.id : null;
      this.asset.divisionId = this.division != null ? this.division.id : null;
      this.asset.departmentId = this.department != null ? this.department.id : null;
      this.asset.roomId = this.room != null ? this.room.id : null;
      this.asset.budgetManagerId = this.budgetManager != null ? this.budgetManager.id : null;
      this.asset.assetNatureId = this.assetNature != null ? this.assetNature.id : null;
      this.asset.typeId = this.type != null ? this.type.id : null;
      this.asset.employeeId = this.employee != null ? this.employee.id : null;
      this.asset.materialId = this.material != null ? this.material.id : null;
      
      this.asset.subTypeId = this.subType != null ? this.subType.id : null;
      this.asset.assetClassId = this.assetClass != null ? this.assetClass.id : null;
      this.asset.admCenterId = this.admCenter != null ? this.admCenter.id : null;
      this.asset.regionId = this.region != null ? this.region.id : null;
        this.asset.assetTypeId = this.assetType != null ? this.assetType.id : null;
      this.asset.projectId = this.project != null ? this.project.id : null;
      this.asset.orderId = this.order != null ? this.order.id : null;
      this.asset.dictionaryItemId = this.dictionaryItem != null ? this.dictionaryItem.id : null;
      this.asset.uomId = this.uom != null ? this.uom.id : null;
      this.asset.invNo = this.asset.invNo;
      this.asset.subNo = this.asset.subNo;
      this.asset.quantity = this.asset.quantity;
      this.asset.license = this.asset.license;
      this.asset.docNo1 = this.asset.docNo1;
      this.asset.serialNumber = this.asset.serialNumber;
      this.asset.agreement = this.asset.agreement;
      this.asset.manufacturer = this.asset.manufacturer;
      this.asset.sapCode = this.asset.sapCode;
      this.asset.depPeriodMonth = this.asset.depPeriodMonth;
      this.asset.depPeriod = this.asset.depPeriod;
      this.asset.depPeriodIn = this.asset.depPeriodIn;
      this.asset.depPeriodRem = this.asset.depPeriodRem;
      this.asset.valueInvIn = this.asset.valueInvIn;
      this.asset.valueDepIn = this.asset.valueDepIn;
      this.asset.valueDepPU = this.asset.valueDepPU;
      this.asset.valueDepYTDIn = this.asset.valueDepYTDIn;
      this.asset.valueDepYTD = this.asset.valueDepYTD;
      this.asset.valueRet = this.asset.valueRet;
      this.asset.valueRetIn = this.asset.valueRetIn;
      this.asset.valueDepPUIn = this.asset.valueDepPUIn;
      this.asset.valueTr = this.asset.valueTr;
      this.asset.valueTrIn = this.asset.valueTrIn;
      this.asset.valueRem = this.asset.valueRem;
      this.asset.valueRemIn = this.asset.valueRemIn;
      this.asset.investSupport = this.asset.investSupport;
      this.asset.writeUps = this.asset.writeUps;
      this.asset.valueInv = this.asset.valueInv;
      this.asset.valueDep = this.asset.valueDep;
      this.asset.purchaseDate = this.asset.purchaseDate;
      this.asset.invoiceDate = this.asset.invoiceDate;
      this.asset.assetValueDate = this.asset.assetValueDate;
      this.asset.removalDate = this.asset.removalDate;
      this.asset.headerText = this.asset.headerText;
      this.asset.taxId = this.tax != null ? this.tax.id : null;
      this.asset.rateId = this.rate != null ? this.rate.id : null;
      this.asset.valueInvRon = this.asset.valueInvRon;
      this.asset.rateValue = this.asset.rateValue;
      this.asset.storno = this.asset.storno;
      this.asset.stornoQuantity = this.asset.stornoQuantity;
      this.asset.stornoValue = this.asset.stornoValue;
      this.asset.stornoValueRon = this.asset.stornoValueRon;
      this.asset.validated = true;


      if (this.asset.id > 0) {
        if(this.asset.storno){
          this.assetHttpService.validateStornoAcquizitionAsset(this.asset)
          .subscribe((result: CreateAssetSAPResult) => {

              if (result.success) {
                  this.notificationService.showSuccess(result.errorMessage, 'Validare asset', 0, false, 0);

                  const assetFilter: AssetReceptionFilter = new AssetReceptionFilter();


                  if (this.acquisitionList.items.length > 0) {
                    //console.log(this.acquisitionList.items);
                    assetFilter.assetIds = new Array<number>();
                    this.acquisitionList.items.forEach((asset) => {
                        assetFilter.assetIds.push(asset.id);
                    });
                }

                  const params: Array<Param> = new Array<Param>();

                  params.push(new Param('isTesting', 'true'));
                  params.push(new Param('jsonFilter', JSON.stringify(assetFilter)));
                  //this.acquisitionSAPList.refresh(params);
                  //this.router.navigate(['/asset/validate']);
              } else if (!result.success) {
                  this.notificationService.showError('Motiv: ' + result.errorMessage + '!', 'Eroare salvare date', 0, false, 0);
              }
          });
        } else {
          this.assetHttpService.validateAcquizitionAsset(this.asset)
          .subscribe((result: CreateAssetSAPResult) => {
              // this.assetHttpService.getDetailById(this.asset.id)
              //     .subscribe((asset: any) => {
              //         if (asset != null){
              //             this.notifyService.showSuccess('', 'Datele au fost validate cu succes!');
              //             this.isSaved = true;
              //             this.updateDetails(asset);
              //         }
              //     });

              if (result.success) {
                  this.notificationService.showSuccess(result.errorMessage, 'Validare asset', 0, false, 0);

                  const assetFilter: AssetReceptionFilter = new AssetReceptionFilter();


                  if (this.acquisitionList.items.length > 0) {
                    //console.log(this.acquisitionList.items);
                    assetFilter.assetIds = new Array<number>();
                    this.acquisitionList.items.forEach((asset) => {
                        assetFilter.assetIds.push(asset.id);
                    });
                }

                  const params: Array<Param> = new Array<Param>();

                  params.push(new Param('isTesting', 'true'));
                  params.push(new Param('jsonFilter', JSON.stringify(assetFilter)));
                  //this.acquisitionSAPList.refresh(params);
                  //this.router.navigate(['/asset/validate']);
              } else if (!result.success) {
                  this.notificationService.showError('Motiv: ' + result.errorMessage + '!', 'Eroare salvare date', 0, false, 0);
              }
          });
        }

      }
  }

    public onRejectAsset() {

        this.operationType = OperationType.RejectAsset;
        this.rejectMessage = 'Respingeti assetul selectat?';
        this.rejectModal.show();
}

public onRejectCanceled() {
    this.operationType = OperationType.NotSet;
    this.rejectModal.hide();

}

public onRejectConfirmationApproved() {
    switch (this.operationType) {
        case OperationType.RejectAsset:
            this.deleteOperation();
            break;
        default:
            break;
    }

    this.operationType = OperationType.NotSet;
    this.rejectModal.hide();

}

public deleteOperation(){
    if (confirm('Esti sigur ca vrei sa respingi assetul selectat?')) {
        this.assetHttpService.rejectAsset(this.assetId, this.reason).subscribe((res: RejectResult) => {
          if(res.success){
            this.notificationService.showInfo(res.message, 'Refuz validare', 2000, true, 0);
            this.reason = '';
            this.rejectModal.hide();
            this.router.navigate(['/asset/validate']);
            // this.refreshAssetOperations();
          }else {
            this.notificationService.showError(res.message, 'Refuz validare', 0, true, 0);
            this.reason = '';
            this.rejectModal.hide();
            // this.refreshAssetOperations();
          }
        });

    }
}



    public onConfirmationApproved() {

        switch (this.operationType) {
            case OperationType.AssetValidation:
                this.validateAsset();
                break;
            case OperationType.Delete:
                this.deleteAsset();
                break;
            // case OperationType.ProcessAssetOp:
            //     this.processAssetOp();
            //     break;
            case OperationType.DeleteOrderItem:
                this.deleteOrderitem();
                break;
            default:
                break;
        }

        this.operationType = OperationType.NotSet;
        this.confirmationModal.hide();
    }

    public checkUniqueDocument(event: any) {
        console.log(this.asset.docNo1);
        if (this.asset != null && this.asset.docNo1 !== '' && this.asset.docNo1 != null && this.asset.docNo1 !== undefined && this.asset.docNo1.trim().length > 3) {
            this.checkUnique = false;
            this.assetHttpService.checkUniqueDocumentAndPartner(this.asset?.docNo1, this.partner?.id, this.budgetManager?.id)
            .subscribe((result: any) => {
                console.log(JSON.stringify(result));
                if (!result) {
                    this.notificationService.showSuccess('OK', 'Verificare unicitate factura', 0, false, 0);
                    this.checkUnique = true;
                } else if (result) {
                    this.notificationService.showError('NOT OK', 'Verificare unicitate factura', 0, false, 0);
                    this.checkUnique = false;
                }
            });
        } else {
            this.notificationService.showWarning('Lungimea factura prea scurta pentru verificare!', 'Verificare unicitate factura', 0, false, 0);
            return;
        }
    }

    public onConfirmationCanceled() {
        this.operationType = OperationType.NotSet;
        this.confirmationModal.hide();
    }

    public onAssetOpDetailListSelectionChanged(assetOpDetails: Array<any>) {
        this.selectedAssetOp = this.assetOpList.selectedItem;
    }

    public onAcquisitionListSelectionChanged(items: Array<any>) {
        this.selectedAcquisitionAsset = this.acquisitionList.selectedItem;


        if (this.selectedAcquisitionAsset != null && this.selectedAcquisitionAsset.id > 0) {
            this.assetHttpService.getDetailById(this.selectedAcquisitionAsset.id)
                .subscribe((asset: any) => {
                    // this.asset = asset;
                    this.initialInvNo = asset.invNo.toString().trim();
                    this.updateDetails(asset);
                      // this.refreshAssetTypes();
                      // this.refreshDocumentTypes();

                    if (asset.validated) {
                        const docNo1 = asset.document.docNo1;
                        // this.refreshAssetOperations();
                        this.refreshEntityFiles();
                        this.refreshAcquisitions(docNo1);
                    } else {
                       // this.refreshAssetTypes();
                       // this.refreshDocumentTypes();
                    }

                    this.generateBarcode();
                });
        }
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

    public parseDate(dateString: any): Date {
        if (dateString) {
            return new Date(dateString.value);
        } else {
            return null;
        }
    }

    public onProcessAssetOp() {
        this.operationType = OperationType.ProcessAssetOp;
        this.confirmationMessage = 'Procesati operatia selectata?';
        this.confirmationModal.show();
    }

    // public processAssetOp() {
    //     this.assetOpHttpService.process(this.assetOpList.selectedItem.id).subscribe((data) => {
    //         this.refreshAssetOperations();
    //     });
    // }

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

//      // SUBCATEGORY //

//      public selectSubCategory() {
//       this.subCategoryList.refresh(null);
//       this.subCategoryListModal.show();
//   }

//   public setSelectedSubCategory() {
//       let items: Array<SubCategory> = this.subCategoryList.selectedItems;
//       this.subCategory = ((items != null) && (items.length === 1)) ? items[0] : null;
//       this.subCategoryListModal.hide();
//   }

//   // SUBCATEGORY //

    


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
/* MATERIAL */

public selectMaterial() {
    this.materialListModal.show();
    const params: Array<Param> = Array<Param>();
    params.push(new Param('exceptMaterialIds', AppUtils.getIdsList<CodeNameEntity, number>(this.selectedMaterials())));
    params.push(new Param('hasSubCategory', 'true'));
    this.materialList.refresh(params);
}

private selectedMaterials(): Array<CodeNameEntity> {
    const mappedMaterials: Array<CodeNameEntity> = new Array<CodeNameEntity>();

    if (this.acquisitionList.items.length > 0) {
        this.acquisitionList.items.forEach(element => {
            mappedMaterials.push(element.material);
        });
    }
    return mappedMaterials;
}


public setSelectedMaterial() {
    const items: Array<any> = this.materialList.selectedItems;
    this.material = ((items != null) && (items.length === 1)) ? items[0] : null;
    this.materialListModal.hide();

    const aIds: number[] = new Array<number>();
    const materialsIds: OfferMaterialAdd = new OfferMaterialAdd();
    items.forEach(item => {
        const index: number = aIds.indexOf(item.id);
        if (index < 0) { aIds.push(item.id); }
    });

    materialsIds.materialIds = aIds;
    materialsIds.offerId = this.selectedAcquisitionAsset != null && this.selectedAcquisitionAsset.order != null && this.selectedAcquisitionAsset.order.offer != null ? this.selectedAcquisitionAsset.order.offer.id : 0;
    // materialsIds.emailManagerId = this.emailManagerList.selectedItem != null ? this.emailManagerList.selectedItem.id : 0;
    // materialsIds.rateId = this.rate.id;

    this.offerMaterialHttpService.addMaterialByOfferFromAsset(materialsIds).subscribe( (res) => {
            if (res.statusCode === 200) {
                this.notificationService.showSuccess('Datele au fost salvate cu success!', 'Adauga mapare material', 0, false, 0);
                this.materialList.refresh(null);
                this.acquisitionList.refresh(null);
                this.materialList.selectedItems = new Array<Material>();
            } else if (res.statusCode === 404) {
                this.notificationService.showError('Nu exista', 'Adauga materiale', 0, false, 0);
                this.materialList.selectedItems = new Array<Material>();
            }
    }, (error) => {
        this.notificationService.showError('Eroare salvare!', 'Adauga mapare material', 0, false, 0);
        this.materialList.selectedItems = new Array<Material>();
    });
}

public closeMaterial() {
    this.materialList.selectedItems = new Array<Material>();
    this.materialListModal.hide();
}

/* MATERIAL */

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

    public changeTab(type, e) {
        if (type === 'componente') {
            // this.showComponent = true;
        } else {
            // this.showComponent = false;
        }
     }

     public deleteOrderItem() {
        this.operationType = OperationType.DeleteOrderItem;
        this.confirmationMessage = 'Esti sigur?';
        this.confirmationModal.show();
    }

  /* BEGIN RATE  */
  public selectNewItemRate() {

    const params: Array<Param> = new Array<Param>();
    params.push(new Param('showLast', 'true'));

    this.rateNewItemList.refresh(params);
    this.rateNewItemListModal.show();
}
public setSelectedNewItemRate() {
    const items: Array<Rate> = this.rateNewItemList.selectedItems;
    this.rateNewItem = ((items != null) && (items.length === 1)) ? items[0] : null;
    this.rateNewItemListModal.hide();
}
/* END RATE  */

handleChange(e) {
  // console.log(e.index);
  var index = e.index;

  if(index === 8){
    const assetFilter: AssetReceptionFilter = new AssetReceptionFilter();


    if (this.acquisitionList.items.length > 0) {
      //console.log(this.acquisitionList.items);
      assetFilter.assetIds = new Array<number>();
      this.acquisitionList.items.forEach((asset) => {
          assetFilter.assetIds.push(asset.id);
      });
  }

    const params: Array<Param> = new Array<Param>();

    params.push(new Param('isTesting', 'true'));
    params.push(new Param('jsonFilter', JSON.stringify(assetFilter)));
    //this.acquisitionSAPList.refresh(params);
  }
}

}

enum OperationType {
    NotSet = 1,
    AssetValidation = 2,
    Delete = 3,
    ProcessAssetOp = 4,
    RejectAsset = 4,
    DeleteOrderItem = 5
}
