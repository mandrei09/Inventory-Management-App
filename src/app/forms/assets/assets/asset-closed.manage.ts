import { RegionHttpService } from './../../../services/http/administration/region.http.service';
import { AssetState } from './../../../model/api/assets/asset-state';
import { ConfigValuesHttpService } from './../../../services/http/common/config-values.service';
import { AssetInvDetail } from './../../../model/api/assets/asset-inv-detail';
import { PagedResult } from './../../../model/common/paged-result';
import { CostCenterHttpService } from '../../../services/http/administration/cost-center.http.service';
import { CostCenter } from './../../../model/api/administration/cost-center';
import { AssetSimpleDetail } from './../../../model/api/assets/asset-simple-detail';
import { Component, EventEmitter, ViewChild, ElementRef, Output, ViewContainerRef, AfterViewInit, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
// import * as jsPDF from 'jspdf';
// import * as jsbarcode from 'jsbarcode';
import { AppConfig } from '../../../config';
import { Param } from '../../../model/common/param';
import { AppData } from '../../../app-data';
import { SelectionResult } from '../../../model/common/selection-result';
import { AccMonth } from '../../../model/api/accounting/acc-month';
import { AssetCategory } from '../../../model/api/assets/asset-category';
import { AssetClass } from '../../../model/api/assets/asset-class';
import { AssetDepDetail } from '../../../model/api/assets/asset-dep-detail';
import { Partner } from '../../../model/api/documents/partner';
import { Department } from '../../../model/api/administration/department';
import { Employee } from '../../../model/api/administration/employee';
import { Location } from '../../../model/api/administration/location';
import { Room } from '../../../model/api/administration/room';
import { PartnerHttpService } from '../../../services/http/documents/partner.http.service';
import { AccMonthHttpService } from '../../../services/http/accounting/acc-month.http.service';
import { AssetCategoryHttpService } from '../../../services/http/assets/asset-category.http.service';
import { AssetClassHttpService } from '../../../services/http/assets/asset-class.http.service';
import { DepartmentHttpService } from '../../../services/http/administration/department.http.service';
import { EmployeeHttpService } from '../../../services/http/administration/employee.http.service';
import { LocationHttpService } from '../../../services/http/administration/location.http.service';
import { RoomDetailHttpService } from '../../../services/http/administration/room-detail.http.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AssetListComponent } from './asset.list';
import { AssetAllListComponent } from './asset-all.list';
import { DepartmentListComponent } from '../../administrations/departments/department.list';
import { EmployeeListComponent } from '../../administrations/employees/employee.list';
import { RegionListComponent } from '../../administrations/regions/region.list';
import { AdmCenterListComponent } from '../../administrations/adm-centers/adm-center.list';
import { LocationListComponent } from '../../administrations/locations/location.list';
import { RoomListComponent } from '../../administrations/rooms/room.list';
import { PartnerListComponent } from '../../documents/partners/partner.list';
import { CostCenterListComponent } from '../../administrations/cost-centers/cost-center.list';
import { AssetCategoryListComponent } from '../asset-categories/asset-category.list';
import { UomListComponent } from '../uoms/uom.list';
import { CompanyListComponent } from '../companies/company.list';
import { CountyListComponent } from '../../administrations/counties/county.list';
import { CityListComponent } from '../../administrations/cities/city.list';
import { DimensionListComponent } from '../dimensions/dimension.list';
import { AssetClassListComponent } from '../asset-classes/asset-class.list';
import { AssetTypeListComponent } from '../asset-types/asset-type.list';
import { DivisionListComponent } from '../../administrations/divisions/division.list';
import { AdministrationListComponent } from '../../administrations/administrations/administration.list';
import { DictionaryItemDetailComponent } from '../../administrations/dictionary-item/dictionary-item.detail';
import { DictionaryItemListComponent } from '../../administrations/dictionary-item/dictionary-item.list';
import { InvState } from '../../../model/api/inventory/inv-state';
import { IEntity } from '../../../model/i-entity';
import { Uom } from '../../../model/api/assets/uom';
import { Company } from '../../../model/api/assets/company';
import { County } from '../../../model/api/administration/county';
import { City } from '../../../model/api/administration/city';
import { Dimension } from '../../../model/api/administration/dimension';
import { AssetType } from '../../../model/api/assets/asset-type';
import { Division } from '../../../model/api/administration/division';
import { Region } from '../../../model/api/administration/region';
import { Administration } from '../../../model/api/administration/administration';
import { AdmCenter } from '../../../model/api/administration/adm-center';
import { AssetImportV1 } from '../../../model/common/import/asset-import-v1';
import { AssetImportV2 } from '../../../model/common/import/asset-import-v2';
import { CodeNameEntity } from '../../../model/api/common/code-name-entity';
import { AdministrationDetailHttpService } from '../../../services/http/administration/administration-detail.http.service';
import { UomHttpService } from '../../../services/http/assets/uom.http.service';
import { CompanyHttpService } from '../../../services/http/assets/company.http.service';
import { AssetHttpService } from '../../../services/http/assets/asset.http.service';
import { AssetAllHttpService } from '../../../services/http/assets/asset-all.http.service';
import { AssetStateHttpService } from '../../../services/http/assets/asset-state.http.service';
import { InvStateHttpService } from '../../../services/http/inventory/inv-state.http.service';
import { AdmCenterHttpService } from '../../../services/http/administration/adm-center.http.service';
import { AssetTypeHttpService } from '../../../services/http/assets/asset-type.http.service';
import { DivisionHttpService } from '../../../services/http/administration/division.http.service';
import { CountyHttpService } from '../../../services/http/administration/county.http.service';
import { CityHttpService } from '../../../services/http/administration/city.http.service';
import { DimensionHttpService } from '../../../services/http/administration/dimension.http.service';
import { DictionaryItemHttpService } from '../../../services/http/administration/dictionary-item.http.service';
import { DictionaryItem } from '../../../model/api/administration/dictionary-item';
import { AppUtils } from '../../../common/app.utils';
import { AssetFilter } from '../../../model/api/assets/asset.filter';
import { LocationTypeHttpService } from '../../../services/http/administration/location-type.http.service';
import { ImportThales } from '../../../model/common/import/import-thales';
import { saveAs as fileSaveAs } from 'file-saver-es';
// import { ToastsManager } from 'ng2-toastr';
import alasql from 'alasql';
import { AssetNature } from '../../../model/api/assets/asset-nature';
import { AssetNatureListComponent } from '../asset-natures/asset-nature.list';
import { AssetNatureHttpService } from '../../../services/http/assets/asset-nature.http.service';

import { Project } from '../../../model/api/assets/project';
import { Brand } from '../../../model/api/assets/brand';
import { ProjectList } from '../projects/project.list';
import { BrandList } from '../brands/brand.list';
import { ProjectHttpService } from '../../../services/http/assets/project.http.service';
import { BrandHttpService } from '../../../services/http/assets/brand.http.service';
import { NotificationService } from '../../../services/notification.service';
import { FormControl } from '@angular/forms';
@Component({
    selector: 'app-asset-closed-manage',
    templateUrl: 'asset-closed.manage.html',
    styleUrls: ['asset-closed.manage.scss'],
    providers: [
        AccMonthHttpService,
        AssetCategoryHttpService,
        AssetClassHttpService,
        AssetStateHttpService,
        InvStateHttpService,
        AdministrationDetailHttpService,
        UomHttpService,
        DepartmentHttpService,
        EmployeeHttpService,
        LocationHttpService,
        RegionHttpService,
        AssetTypeHttpService,
        DivisionHttpService,
        RoomDetailHttpService,
        PartnerHttpService,
        CostCenterHttpService,
        ConfigValuesHttpService,
        CountyHttpService,
        CityHttpService,
        DimensionHttpService,
        LocationTypeHttpService,
        DictionaryItemHttpService,
        CompanyHttpService,
        AssetHttpService,
        AssetAllHttpService,
        AdmCenterHttpService]
})
export class AssetClosedManageComponent implements AfterViewInit { // extends GenericManage<AssetInvDetail> {

    public _departmentsItemSelect: Department[] = [];
    public get departmentsItemSelect(): Department[] { return this._departmentsItemSelect; }
    public set departmentsItemSelect(value: Department[]) {
      this._departmentsItemSelect = value;

      this.selectedDepartments = value;
      this.checkForRefresh();
    }

    public _divisions: Division[] = [];
    public get divisions(): Division[] { return this._divisions; }
    public set divisions(value: Division[]) {
      this._divisions = value;

      this.selectedDivisions = value;
      this.checkForRefresh();
    }

    public _locations: Location[] = [];
    public get locations(): Location[] { return this._locations; }
    public set locations(value: Location[]) {
      this._locations = value;

      this.selectedLocations = value;
      this.checkForRefresh();
    }

    public _costCenters: CostCenter[] = [];
    public get costCenters(): CostCenter[] { return this._costCenters; }
    public set costCenters(value: CostCenter[]) {
      this._costCenters = value;

      this.selectedCostCenters = value;
      this.checkForRefresh();
    }

    public _projects: Project[] = [];
    public get projects(): Project[] { return this._projects; }
    public set projects(value: Project[]) {
      this._projects = value;

      this.selectedProjects = value;
      this.checkForRefresh();
    }

    public get divisionParams(): Array<Param> {
      let selectedDepartments: Array<Department> = null;
      let selectedLocations: Array<Location> = null;
      selectedDepartments = this.selectedDepartments;
      selectedLocations = this.selectedLocations;

      const params = new Array<Param>();
      params.push(new Param('departmentIds', AppUtils.getIdsList<Department, number>(selectedDepartments)));
      params.push(new Param('locationIds', AppUtils.getIdsList<Location, number>(selectedLocations)));

      return params;
    }

    public get locationParams(): Array<Param> {
      let selectedRegions: Array<Region> = null;
      let selectedAdmCenters: Array<AdmCenter> = null;
      selectedRegions = this.selectedRegions;
      selectedAdmCenters = this.selectedAdmCenters;

      let params = new Array<Param>();
      params.push(new Param('regionIds', AppUtils.getIdsList<Region, number>(selectedRegions)));
      params.push(new Param('admCenterIds', AppUtils.getIdsList<AdmCenter, number>(selectedAdmCenters)));
      params.push(new Param('cityIds', AppUtils.getIdsList<City, number>(this.selectedCities)));

      return params;
    }

    public get costCenterParams(): Array<Param> {
      let selectedDepartments: Array<Department> = null;
      let selectedDivisions: Array<Division> = null;
      let selectedLocations: Array<Location> = null;
      selectedDepartments = this.selectedDepartments;
      selectedDivisions = this.selectedDivisions;
      selectedLocations = this.selectedLocations;

      let params = new Array<Param>();
      params.push(new Param('departmentIds', AppUtils.getIdsList<Department, number>(selectedDepartments)));
      params.push(new Param('divisionIds', AppUtils.getIdsList<Division, number>(selectedDivisions)));
      params.push(new Param('locationIds', AppUtils.getIdsList<Location, number>(selectedLocations)));

      return params;
    }

    @ViewChild('importDataModal') public importDataModal: ModalDirective;
    @ViewChild('importDataITModal') public importDataITModal: ModalDirective;

    @ViewChild('assetList') public assetList: AssetListComponent;
    @ViewChild('assetAllList') public assetAllList: AssetAllListComponent;

    @ViewChild('departmentList') public departmentList: DepartmentListComponent;
    @ViewChild('departmentListModal') public departmentListModal: ModalDirective;

    @ViewChild('employeeList') public employeeList: EmployeeListComponent;
    @ViewChild('employeeListModal') public employeeListModal: ModalDirective;

    @ViewChild('regionList') public regionList: RegionListComponent;
    @ViewChild('regionListModal') public regionListModal: ModalDirective;

    @ViewChild('admCenterList') public admCenterList: AdmCenterListComponent;
    @ViewChild('admCenterListModal') public admCenterListModal: ModalDirective;

    @ViewChild('locationList') public locationList: LocationListComponent;
    @ViewChild('locationListModal') public locationListModal: ModalDirective;

    // @ViewChild('assetNatureList') public assetNatureList: AssetNature;
    // @ViewChild('assetNatureListModal') public assetNatureListModal: ModalDirective;

    @ViewChild('roomList') public roomList: RoomListComponent;
    @ViewChild('roomListModal') public roomListModal: ModalDirective;

    @ViewChild('partnerList') public partnerList: PartnerListComponent;
    @ViewChild('partnerListModal') public partnerListModal: ModalDirective;

    @ViewChild('costCenterList') public costCenterList: CostCenterListComponent;
    @ViewChild('costCenterListModal') public costCenterListModal: ModalDirective;

    @ViewChild('assetCategoryList') public assetCategoryList: AssetCategoryListComponent;
    @ViewChild('assetCategoryListModal') public assetCategoryListModal: ModalDirective;

    @ViewChild('uomList') public uomList: UomListComponent;
    @ViewChild('uomListModal') public uomListModal: ModalDirective;

    @ViewChild('companyList') public companyList: CompanyListComponent;
    @ViewChild('companyListModal') public companyListModal: ModalDirective;

    

    
    

    @ViewChild('assetNatureList') public assetNatureList: AssetNatureListComponent;
    @ViewChild('assetNatureListModal') public assetNatureListModal: ModalDirective;

    @ViewChild('projectList') public projectList: ProjectList;
    @ViewChild('projectListModal') public projectListModal: ModalDirective;

    @ViewChild('brandList') public brandList: BrandList;
    @ViewChild('brandListModal') public brandListModal: ModalDirective;

    @ViewChild('countyList') public countyList: CountyListComponent;
    @ViewChild('countyListModal') public countyListModal: ModalDirective;

    @ViewChild('cityList') public cityList: CityListComponent;
    @ViewChild('cityListModal') public cityListModal: ModalDirective;

    @ViewChild('dimensionList') public dimensionList: DimensionListComponent;
    @ViewChild('dimensionListModal') public dimensionListModal: ModalDirective;

    @ViewChild('assetClassList') public assetClassList: AssetClassListComponent;
    @ViewChild('assetClassListModal') public assetClassListModal: ModalDirective;

    @ViewChild('assetTypeList') public assetTypeList: AssetTypeListComponent;
    @ViewChild('assetTypeListModal') public assetTypeListModal: ModalDirective;

    @ViewChild('divisionList') public divisionList: DivisionListComponent;
    @ViewChild('divisionListModal') public divisionListModal: ModalDirective;

    @ViewChild('administrationList') public administrationList: AdministrationListComponent;
    @ViewChild('administrationListModal') public administrationListModal: ModalDirective;

    @ViewChild('fileInput') fileInput: ElementRef;
    @ViewChild('fileInputEmag') fileInputEmag: ElementRef;
    @ViewChild('fileInputIT') fileInputIT: ElementRef;
    @ViewChild('fileInputCassation') fileInputCassation: ElementRef;

    @ViewChild('dictionaryItemDetailModal') public dictionaryItemDetailModal: ModalDirective;
    @ViewChild('dictionaryItemListModal') public dictionaryItemListModal: ModalDirective;

    @ViewChild('uomListNewModal') public uomListNewModal: ModalDirective;
    @ViewChild('uomListNew') public uomListNew: UomListComponent;
    @ViewChild('dimensionListNew') public dimensionListNew: DimensionListComponent;
    @ViewChild('dimensionListNewModal') public dimensionListNewModal: ModalDirective;


    @ViewChild('dictionaryItemDetail') public dictionaryItemDetail: DictionaryItemDetailComponent;
    @ViewChild('dictionaryItemList') public dictionaryItemList: DictionaryItemListComponent;

    @ViewChild('newAssetModal') public newAssetModal: ModalDirective;

    @ViewChild('uploadModal') public uploadModal: ModalDirective;

    @Output() public uploadFinished = new EventEmitter<void>();

    public mainViewMode: number = AssetManageViewMode.AssetList;
    public viewMode: number = AssetManageViewMode.AssetList;

    public companyName: string = AppConfig.COMPANY_NAME;
    public showSupplierDetails: boolean= AppConfig.SHOW_SUPPLIER_DETAILS;
    public showCostCentersDetails: boolean= AppConfig.SHOW_COSTCENTER_DETAILS;
    public showEmployeesDetails: boolean= AppConfig.SHOW_EMPLOYEE_DETAILS;
    public showDepartmentDetails: boolean= AppConfig.SHOW_DEPARTMENT_DETAILS;
    public showAssetCategoryDetails: boolean= AppConfig.SHOW_ASSETCATEGORY_DETAILS;
    public showRegionDetails: boolean= AppConfig.SHOW_REGION_DETAILS;
    public showLocationDetails: boolean= AppConfig.SHOW_LOCATION_DETAILS;
    public showRoomsDetails: boolean= AppConfig.SHOW_ROOMS_DETAILS;
    public useAssetCategory: boolean= AppConfig.USE_ASSET_CATEGORY;
    public useAssetClasses: boolean= AppConfig.USE_ASSET_CLASS;
    public useAssetTypes: boolean = AppConfig.SHOW_ASSETTYPE_DETAILS;
    public useDivisions: boolean = AppConfig.SHOW_DIVISION_DETAILS;
    public useAdministrations: boolean = AppConfig.SHOW_ADMINISTRATION_DETAILS;
    public useDepartment: boolean= AppConfig.USE_DEPARTMENT;
    public useCustody: boolean= AppConfig.SHOW_CUSTODY_DETAILS;
    public useAssetStates: boolean= AppConfig.USE_ASSET_STATE;
    public useExportIn: boolean= AppConfig.USE_EXPORT_IN;
    public useExportPIF: boolean= AppConfig.USE_EXPORT_PIF;
    public useExportPV: boolean= AppConfig.USE_EXPORT_PV;
    public useExportOTP: boolean= AppConfig.USE_EXPORT_OTP;
    public useAssetAddButton: boolean= AppConfig.USE_ASSET_ADD_BUTTON;
    public useExportOut: boolean= AppConfig.USE_EXPORT_OUT;
    // public useDepartment: Boolean= this.configValue.;

    public assetStates: Array<AssetState> = new Array<AssetState>();
    public invStates: Array<InvState> = new Array<InvState>();
    public assetStateId: number;
    public invStateId: number;

    public filter: string;
    public filterAll: string;
    public filterName: string;
    public filterInv: string;
    public filterPurchaseDate: string;
    public custody: string = '-';
    public isPrinted: string = '-';
    public isDuplicate: string = '-';
    public isWaitingValidation: string = '-';
    public isInTransfer: string = '-';
    public isClosed: string = '-';
    public smallPageSize: number = 5;
    public largePageSize: number = 10;
    public transferStartDate: Date;
    public transferEndDate: Date;
    public pageSizeUpdatedEvent: EventEmitter<number> = new EventEmitter<number>();
    public noOfItems: number = 0;
    public months: Array<string> = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'];
    public selectedMonth: number = 0;
    public selectedYear: number = 0;
    public selectedAccMonth: AccMonth = null;
    appStateId = 0;
    pageSize = 10;
    public showAll: boolean = false;
    public showExportBtn = true;

    public assetStateName: string = 'Stari gestiune';
    public assetStateCode: string = 'ALL';
    public fileEvent: any = null;
    public fileEventEmag: any = null;
    public fileITEvent: any = null;
    public allLocations: string = 'NO';
    public requestOperationDetailRefreshEvent: EventEmitter<void> = new EventEmitter<void>();

    public requestAssetDepDetailRefreshEvent: EventEmitter<Array<Param>> = new EventEmitter<Array<Param>>();
    public updateAssetDepDetailSelectionEvent: EventEmitter<Array<AssetDepDetail>> = new EventEmitter<Array<AssetDepDetail>>();
    public requestAssetInvDetailRefreshEvent: EventEmitter<Array<Param>> = new EventEmitter<Array<Param>>();
    public updateAssetInvDetailSelectionEvent: EventEmitter<Array<AssetInvDetail>> = new EventEmitter<Array<AssetInvDetail>>();
    public addNewAssetEvent: EventEmitter<void> = new EventEmitter<void>();

    public assetDetailEntitySelectedEvent: EventEmitter<SelectionResult<IEntity<number>>> = new EventEmitter<SelectionResult<IEntity<number>>>();
    public operationDetailEntitySelectedEvent: EventEmitter<SelectionResult<IEntity<number>>> = new EventEmitter<SelectionResult<IEntity<number>>>();

    public assetCategoryRowSelection: string = 'single';
    public selectedAssetCategories: Array<AssetCategory> = new Array<AssetCategory>();
    public selectedUoms: Array<Uom> = new Array<Uom>();
    public selectedCompanies: Array<Company> = new Array<Company>();
    
    public selectedCounties: Array<County> = new Array<County>();
    public selectedCities: Array<City> = new Array<City>();
    public selectedDimensions: Array<Dimension> = new Array<Dimension>();
    public selectedAssetNatures: Array<AssetNature> = new Array<AssetNature>();
    public selectedDictionaryItems: Array<DictionaryItem> = new Array<DictionaryItem>();

    public assetClassRowSelection: string = 'single';
    public selectedAssetClasses: Array<AssetClass> = new Array<AssetClass>();
    public selectedAssetTypes: Array<AssetType> = new Array<AssetType>();
    public selectedDivisions: Array<Division> = new Array<Division>();
    public requestAssetClassRefreshEvent: EventEmitter<Array<Param>> = new EventEmitter<Array<Param>>();
    public requestAssetClassSelectionEvent: EventEmitter<void> = new EventEmitter<void>();
    public updateAssetClassSelectionEvent: EventEmitter<Array<AssetClass>> = new EventEmitter<Array<AssetClass>>();

    public partnerRowSelection: string = 'single';
    public selectedPartners: Array<Partner> = new Array<Partner>();
    public requestPartnerRefreshEvent: EventEmitter<Array<Param>> = new EventEmitter<Array<Param>>();
    public requestPartnerSelectionEvent: EventEmitter<void> = new EventEmitter<void>();
    public updatePartnerSelectionEvent: EventEmitter<Array<Partner>> = new EventEmitter<Array<Partner>>();


    public selectedCostCenters: Array<CostCenter> = new Array<CostCenter>();

    public selectedDepartments: Array<Department> = new Array<Department>();

    public employeeRowSelection: string = 'single';
    public selectedEmployees: Array<Employee> = new Array<Employee>();
    public selectedProjects: Array<Project> = new Array<Project>();
    public selectedBrands: Array<Brand> = new Array<Brand>();

    public selectedRegions: Array<Region> = new Array<Region>();

    public selectedLocations: Array<Location> = new Array<Location>();

    public roomRowSelection: string = 'single';
    public selectedRooms: Array<Room> = new Array<Room>();
    public selectedAdministrations: Array<Administration> = new Array<Administration>();
    public selectedAdmCenters: Array<AdmCenter> = new Array<AdmCenter>();
    public get isAdmin(): boolean { return AppData.UserIsAdmin; }
    public get showAllLists(): boolean { return (this.showAll === true); }
    public data;
    public importLinesV1: Array<AssetImportV1> = new Array<AssetImportV1>();
    public importLinesV2: Array<AssetImportV2> = new Array<AssetImportV2>();
    public importLinesThales: Array<ImportThales> = new Array<ImportThales>();
    public importIndex: number = 0;
    public params: Array<Param> = null;

    public title = 'Testing ng2-datepicker';
    hideExportBtn = false;

    // public fromdate: DateModel;
    public from = '';
    // public todate: DateModel;
    // public closeDate: DateModel;
    public to = '';
    public closeOnDate = '';

    public view: string;
    // public selectedAssetId: number = 0;
    public assetRowSelection: string = 'single';
    public assetAllRowSelection: string = 'single';
    public selectedAssets: Array<AssetSimpleDetail> = new Array<AssetSimpleDetail>();
    public selectedAssetAlls: Array<AssetSimpleDetail> = new Array<AssetSimpleDetail>();
    public selectedAssetInvDetails: Array<AssetInvDetail> = new Array<AssetInvDetail>();
    public selectedAssetAllInvDetails: Array<AssetInvDetail> = new Array<AssetInvDetail>();
    public mainTitle: string = '';
    public barcodeDateTime: Date = new Date();
    public invState: string = 'Stari bunuri';
    public assetState: string = 'Tipuri miscari';
    public dictionaryItem: CodeNameEntity = null;
    public uomNew: Uom = null;
    public dimensionNew: Dimension = null;
    public finishedLocations = '';

    departments = new FormControl();

//     public options: DatePickerOptions = {
//     format: 'DD-MM-YYYY',
//     todayText: 'Oggi',
//     style: 'big'
//   };

    constructor(public route: ActivatedRoute,
                public router: Router,
                public accMonthHttpService: AccMonthHttpService,
                public administrationDetailHttpService: AdministrationDetailHttpService,
                public assetCategoryHttpService: AssetCategoryHttpService,
                public uomHttpService: UomHttpService,
                public companyHttpService: CompanyHttpService,
                
                public assetNatureHttpService: AssetNatureHttpService,
                public assetClassHttpService: AssetClassHttpService,
                public assetHttpService: AssetHttpService,
                public assetAllHttpService: AssetAllHttpService,
                public assetStateHttpService: AssetStateHttpService,
                public invStateHttpService: InvStateHttpService,
                public employeeHttpService: EmployeeHttpService,
                public projectHttpService: ProjectHttpService,
                public brandHttpService: BrandHttpService,
                public departmentHttpService: DepartmentHttpService,
                public regionHttpService: RegionHttpService,
                public admCenterHttpService: AdmCenterHttpService,
                public assetTypeHttpService: AssetTypeHttpService,
                public divisionHttpService: DivisionHttpService,
                public locationHttpService: LocationHttpService,
                public roomDetailHttpService: RoomDetailHttpService,
                public partnerHttpService: PartnerHttpService,
                public costCenterHttpService: CostCenterHttpService,
                public countyHttpService: CountyHttpService,
                public cityHttpService: CityHttpService,
                public dimensionHttpService: DimensionHttpService,
                public dictionaryItemHttpService: DictionaryItemHttpService,
                private notifyService : NotificationService,
                // public vcr: ViewContainerRef,
                public configValuesHttpService: ConfigValuesHttpService) {
            //  this.options = new DatePickerOptions();
            //  // this.toastr.setRootViewContainerRef(vcr);
            this.router.events.subscribe((evt) => {
                if (evt instanceof NavigationEnd) {
                    if (evt.urlAfterRedirects === '/asset') {
                        // console.log('refreshing asset inv details');
                        // console.log(JSON.stringify(evt));
                        // this.refreshAssets();

                        setTimeout(() => {
                            this.refreshAssets();
                          }, 100);
                    }
                }
            });
    }

    ngOnInit() {
        // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    ngAfterViewInit() {

        setTimeout(() => {
            this.clearFilters();
          }, 1000);

        // let currentDate: Date = new Date();
        // this.selectedMonth = currentDate.getMonth() - 3;
        // this.selectedYear = currentDate.getFullYear();

        // this.updateSelectedAccMonth();

        // this.assetStateHttpService.get(0, 0, null, null, null).subscribe((res: any) => { this.assetStates = res; });
        // this.invStateHttpService.get(0, 0, null, null, null).subscribe((res: any) => { this.invStates = res; });

       // this.refreshAssets();
    }

    // public updateCheckMinus(checked: boolean) {
    //     if (checked) this.showAll = true; else this.showAll = false;
    //     this.checkForRefresh();
    // }

    public newAsset() {

        if (this.selectedAssets. length > 0) {
            this.selectedAssets.forEach(element => {
                    if (!element.invNo.startsWith('ROART') && !element.invNo.startsWith('ROXGT') && !element.invNo.startsWith('ROBGT')) {
                        alert('Denumirea se poate adauga doar la etichete temporare!');
                        this.clearSelection();
                        return;
                    } else {
                        //this.uomNew = new Uom(0, '', '', '', '', false, null);
                        this.dimensionNew = new Dimension(0, '', '', '', null);
                        this.newAssetModal.show();
                    }

            });
        }

    }

    public clearSelection() {
        this.selectedAssets = new Array<AssetSimpleDetail>();
        this.assetList.selectedItems = this.selectedAssets;
        // this.selectedAssetInvDetails = new Array<AssetInvDetail>();
        // this.assetList.selectedItems = this.selectedAssetInvDetails;
        // this.selectedAssets = new Array<AssetSimpleDetail>();
    }

    public clearAllSelection() {
        this.selectedAssetAlls = new Array<AssetSimpleDetail>();
        this.assetAllList.selectedItems = this.selectedAssetAlls;
        // this.selectedAssetInvDetails = new Array<AssetInvDetail>();
        // this.assetList.selectedItems = this.selectedAssetInvDetails;
        // this.selectedAssets = new Array<AssetSimpleDetail>();
    }

    public clearFilters() {

        this.selectedCounties = new Array<County>();
        this.selectedCities = new Array<City>();
        this.selectedDimensions = new Array<Dimension>();
        
        this.selectedLocations = new Array<Location>();
        this.selectedRooms = new Array<Room>();
        this.selectedCostCenters = new Array<CostCenter>();
        this.selectedDepartments = new Array<Department>();
        this.selectedEmployees = new Array<Employee>();
        this.selectedLocations = new Array<Location>();
        this.selectedRooms = new Array<Room>();
        this.selectedAssetCategories = new Array<AssetCategory>();
        this.selectedAssetNatures = new Array<AssetNature>();
        this.selectedUoms = new Array<Uom>();
        this.selectedAssetClasses = new Array<AssetClass>();
        this.selectedRegions = new Array<Region>();
        this.selectedAdmCenters = new Array<AdmCenter>();
        this.selectedAssetTypes = new Array<AssetType>();
        this.selectedDivisions = new Array<Division>();
        this.selectedAdministrations = new Array<Administration>();
        this.selectedCompanies = new Array<Company>();
        this.selectedPartners = new Array<Partner>();
        this.selectedProjects = new Array<Project>();
        this.selectedBrands = new Array<Brand>();
        this.selectedDictionaryItems = new Array<DictionaryItem>();
        this.filter = '';
        this.to =  '';
        this.from = '';
        // this.options.clearText = '';
        this.appStateId = 0;

        this.selectedAssetInvDetails = new Array<AssetInvDetail>();
        this.selectedAssets = new Array<AssetSimpleDetail>();
        // this.filterInv='';
        // this.filterName= '';
        // this.filterPurchaseDate='';
        this.checkForRefresh();
    }

    public clearAllFilters() {

        this.selectedCounties = new Array<County>();
        this.selectedCities = new Array<City>();
        this.selectedDimensions = new Array<Dimension>();
        this.selectedLocations = new Array<Location>();
        this.selectedRooms = new Array<Room>();
        this.selectedCostCenters = new Array<CostCenter>();
        this.selectedDepartments = new Array<Department>();
        this.selectedEmployees = new Array<Employee>();
        this.selectedLocations = new Array<Location>();
        this.selectedRooms = new Array<Room>();
        this.selectedAssetCategories = new Array<AssetCategory>();
        this.selectedUoms = new Array<Uom>();
        this.selectedAssetClasses = new Array<AssetClass>();
        this.selectedRegions = new Array<Region>();
        this.selectedAdmCenters = new Array<AdmCenter>();
        this.selectedAssetTypes = new Array<AssetType>();
        this.selectedDivisions = new Array<Division>();
        this.selectedAdministrations = new Array<Administration>();
        this.selectedCompanies = new Array<Company>();
        this.selectedPartners = new Array<Partner>();
        this.filterAll = '';
        this.to =  '';
        this.from = '';
        // this.options.clearText = '';
        this.appStateId = 0;

        this.selectedAssetInvDetails = new Array<AssetInvDetail>();
        this.selectedAssets = new Array<AssetSimpleDetail>();
        // this.filterInv='';
        // this.filterName= '';
        // this.filterPurchaseDate='';
        this.checkForRefresh();
    }

    public saveNewAsset (assets: Array<AssetSimpleDetail>) {
        // alert(JSON.stringify(assets));
        // let assetUpdates : Array<UpdateAssetName> = new Array<UpdateAssetName>();
        // assets.forEach(asset => {
        //     let assetUpdate: UpdateAssetName = new UpdateAssetName();
        //     assetUpdate.assetId = asset.id;
        //     assetUpdate.name = this.dictionaryItem != null ? this.dictionaryItem.name : asset.name;
        //     assetUpdate.uomNew = this.uomNew != null ? this.uomNew.name : '';
        //     assetUpdate.dimensionNew = this.dimensionNew != null ? this.dimensionNew.length : '';
        //     assetUpdates.push(assetUpdate);
        // });
        // // alert(JSON.stringify(assetUpdates));
        // this.assetHttpService.updateAssetName(assetUpdates).subscribe( (res) => {
        //     if (res === 200) {
        //         this.newAssetModal.hide();
        //         // this.toastr.success('Date au fost actualizate cu success');
        //        // this.checkForRefresh();
        //         this.dictionaryItem = null;
        //         this.clearSelection();
        //         this.refreshAssets();
        //     } else {
        //         // this.toastr.error('Eroare! Date nu au fost actualizate');
        //     }
        // }, (error) =>{
        //     // this.toastr.error('Eroare server!');
        // }) ;
    }

    //  /* BEGIN DICTIONARY ITEM */
    //  public selectDictionaryItem() {

    //     this.dictionaryItemList.refresh(null);
    //     this.dictionaryItemListModal.show();
    // }

    // public setSelectedDictionaryItem() {
    //     let items: Array<DictionaryItem> = this.dictionaryItemList.selectedItems;
    //     this.dictionaryItem = ((items != null) && (items.length === 1)) ? items[0] : null;

    //     // this.selectedAssets.forEach(asset => {
    //     //     asset.name = this.dictionaryItem.name;
    //     // });

    //     this.dictionaryItemListModal.hide();
    // }

    // public addDictionaryItem() {
    //     this.dictionaryItemDetail.addNew();
    //     this.dictionaryItemDetailModal.show();
    // }

    // public dictionaryItemAdded(dictionaryItem: DictionaryItem) {
    //     this.dictionaryItem = dictionaryItem;
    //     this.dictionaryItemDetailModal.hide();
    // }

    // public dictionaryItemAddCanceled() {
    //     this.dictionaryItemDetailModal.hide();
    // }
    // /* END DICTIONARY ITEM */

         /* begin UOM */
         public selectUomNew() {

            this.uomListNew.refresh(null);
            this.uomListNewModal.show();
        }
        public setSelectedUomNew() {
            let items: Array<Uom> = this.uomListNew.selectedItems;
            this.uomNew = ((items != null) && (items.length === 1)) ? items[0] : null;
            this.uomListNewModal.hide();
        }

        /*end UOM */

          /* begin DIMENSION */
          public selectDimensionNew() {

            this.dimensionListNew.refresh(null);
            this.dimensionListNewModal.show();
        }
        public setSelectedDimensionNew() {
            let items: Array<Dimension> = this.dimensionListNew.selectedItems;
            this.dimensionNew = ((items != null) && (items.length === 1)) ? items[0] : null;
            this.dimensionListNewModal.hide();
        }

         /*end DIMENSION */

    public addNewAsset() {
        this.router.navigate(['/asset/new']);
    }

    public addNewOperation() {
        AppData.AssetList = this.selectedAssets;
        let isInTransfer: number = 0;
        let isWaitingValidation: number = 0;
        this.selectedAssets.forEach(asset => {
            if (asset.isInTransfer){
                // this.toastr.warning('Numarul de inventar ' + asset.invNo + ' asteapta validarea transferului de catre destinatar!');
                isInTransfer++;
            }

            // if (asset.isWaitingValidation){
            //     // this.toastr.warning('Numarul de inventar ' + asset.invNo + ' asteapta validarea transferului de catre manager!');
            //     isWaitingValidation++;
            // }



            // if (asset.invNo.length < 7){
            //     // this.toastr.warning('Unul sau mai multe active selectate nu au coduri de bare alocate!');
            //     isInTransfer++;
            // }
        });

        if (isInTransfer > 0 || isWaitingValidation > 0){
            return;
        }else{
            this.router.navigate(['/asset/newoperation']);
        }
    }

    public changeRowSelection() {
        if (this.assetRowSelection === 'single') {
            this.assetRowSelection = 'multiple';
        }
        else {
            this.selectedAssets = new Array<AssetSimpleDetail>();
            // this.selectedAssetId = 0;
            this.assetRowSelection = 'single';
            this.updateAssetDepDetailSelectionEvent.emit(new Array<AssetDepDetail>());
            this.updateAssetInvDetailSelectionEvent.emit(new Array<AssetInvDetail>());
        }
    }

    public changeAllRowSelection() {
        if (this.assetAllRowSelection === 'single') {
            this.assetAllRowSelection = 'multiple';
        }
        else {
            this.selectedAssetAlls = new Array<AssetSimpleDetail>();
            // this.selectedAssetId = 0;
            this.assetAllRowSelection = 'single';
            this.updateAssetDepDetailSelectionEvent.emit(new Array<AssetDepDetail>());
            this.updateAssetInvDetailSelectionEvent.emit(new Array<AssetInvDetail>());
        }
    }

    public editAsset() {
        let selectedAssetId = this.selectedAssets.length > 0 ? this.selectedAssets[0].id : 0;
        if (selectedAssetId > 0) {
            this.router.navigate(['/asset', selectedAssetId]);
        }
    }

    public onAssetDepDetailSelectionChanged(assets: Array<AssetDepDetail>) {
        // this.selectedAssetId = assets.length === 1 ? assets[0].id : 0;
        this.selectedAssets = new Array<AssetSimpleDetail>();
        assets.forEach((asset: AssetDepDetail) => {
            this.selectedAssets.push(new AssetSimpleDetail(asset.id, asset.invNo, asset.name, '', null,
            asset.partner, '', asset.assetType, asset.assetState, 0, asset.company, asset.usageStartDate, '', '',0, null, false, false, asset.subNo, null));
        });
    }

    public onAssetSelectionChanged(assets: Array<any>) {
        this.selectedAssetInvDetails = assets;
        this.selectedAssets = new Array<any>();
        assets.forEach((asset: any) => {
            this.selectedAssets.push(asset);
        });
    }

    public onAssetAllSelectionChanged(assets: Array<any>) {
        this.selectedAssetAllInvDetails = assets;
        this.selectedAssetAlls = new Array<any>();
        assets.forEach((asset: any) => {
            this.selectedAssetAlls.push(asset);
        });
    }

    public onCustodyUpdate(custody: string) {
        this.custody = custody;
        this.checkForRefresh();
    }

    public onIsPrintedUpdate(isPrinted: string) {
        this.isPrinted = isPrinted;
        this.checkForRefresh();
    }

    public onIsDuplicateUpdate(isDuplicate: string) {
        this.isDuplicate = isDuplicate;
        this.checkForRefresh();
    }

    public onIsWaitingValidationUpdate(isWaitingValidation: string) {
        this.isWaitingValidation = isWaitingValidation;
        this.checkForRefresh();
    }

    public onIsInTransferUpdate(isInTransfer: string) {
        this.isInTransfer = isInTransfer;
        this.checkForRefresh();
    }

    public onIsInRoomUpdate(isClosed: string) {
        this.isClosed = isClosed;
        this.checkForRefresh();
    }

    public onIsInTransferUpdateBtn(appStateId: number) {
        this.appStateId = appStateId;
        this.checkForRefresh();
    }

    // public onAssetStateUpdate(assetStateCode: string) {
    //     this.assetStateCode = assetStateCode;

    //     switch(this.assetStateCode) {
    //         case 'ALL':
    //             this.assetStateName = 'Stare gestiune';
    //             break;
    //         case 'SALE':
    //             this.assetStateName = 'Vanzare';
    //             break;
    //         case 'CASSATION':
    //             this.assetStateName = 'Casare';
    //             break;
    //         case 'DONATION':
    //             this.assetStateName = 'Donatie';
    //             break;
    //         case 'OTHERS':
    //             this.assetStateName = 'Altele';
    //             break;

    //     }

    //     this.checkForRefresh();
    // }

    public onAssetStateUpdate(assetStateId: number, assetStatename: string) {
        this.assetStateId = assetStateId;
        this.assetState = assetStatename ;
        this.checkForRefresh();
    }

    public onInvStateUpdate(invStateId: number, invStateName: string) {
        this.invStateId = invStateId;
        this.invState = invStateName ;
        this.checkForRefresh();
    }

    /*begin asset*/
    public assetDetailGoBack() {
        this.mainViewMode = AssetManageMainViewMode.AssetList;
        this.viewMode = AssetManageViewMode.AssetList;
    }

    public assetDetailChangesCanceled() {
        this.assetDetailGoBack();
    }
    /*end asset*/

    public operationDetailGoBack() {
        this.mainViewMode = AssetManageMainViewMode.AssetList;
        this.viewMode = AssetManageViewMode.AssetList;
    }

    public onOperationCanceled() {
        this.operationDetailGoBack();
    }

    public onOperationSaved() {
        this.operationDetailGoBack();
        this.refreshAssets();
    }

    /*begin asset category*/
    public selectAssetCategories() {
        this.assetCategoryListModal.show();
        this.assetCategoryList.selectedItems = this.selectedAssetCategories;
        this.assetCategoryList.refresh(null);
    }

    public removeFromAssetCategorySelection(assetCategory: AssetCategory) {
        let index: number = this.selectedAssetCategories.indexOf(assetCategory);
        this.selectedAssetCategories.splice(index, 1);
        this.checkForRefresh();
    }

    public clearAssetCategorySelection() {
        this.selectedAssetCategories = new Array<AssetCategory>();
        this.checkForRefresh();
    }

    public setSelectedAssetCategories() {
        this.selectedAssetCategories = this.assetCategoryList.selectedItems;
        this.assetCategoryListModal.hide();
        this.checkForRefresh();
    }


    

        /*begin uom*/
        public selectUoms() {
            this.uomListModal.show();
            this.uomList.selectedItems = this.selectedUoms;
            this.uomList.refresh(null);
        }

        public removeFromUomSelection(uom: Uom) {
            let index: number = this.selectedUoms.indexOf(uom);
            this.selectedUoms.splice(index, 1);
            this.checkForRefresh();
        }

        public clearUomSelection() {
            this.selectedUoms = new Array<Uom>();
            this.checkForRefresh();
        }

        public setSelectedUoms() {
            this.selectedUoms = this.uomList.selectedItems;
            this.uomListModal.hide();
            this.checkForRefresh();
        }


        /*end UOM */


          /*begin COMPANY */
          public selectCompanies() {
            this.companyListModal.show();
            this.companyList.selectedItems = this.selectedCompanies;
            this.companyList.refresh(null);
        }

        public removeFromCompanySelection(company: Company) {
            let index: number = this.selectedCompanies.indexOf(company);
            this.selectedCompanies.splice(index, 1);
            this.checkForRefresh();
        }

        public clearCompanySelection() {
            this.selectedCompanies = new Array<Company>();
            this.checkForRefresh();
        }

        public setSelectedCompanies() {
            this.selectedCompanies = this.companyList.selectedItems;
            this.companyListModal.hide();
            this.checkForRefresh();
        }


        

         


            /*begin ASSET NATURE */
            public selectAssetNatures() {
                this.assetNatureListModal.show();
                this.assetNatureList.selectedItems = this.selectedAssetNatures;
                this.assetNatureList.refresh(null);
            }

            public removeFromAssetNatureSelection(assetNature: AssetNature) {
                let index: number = this.selectedAssetNatures.indexOf(assetNature);
                this.selectedAssetNatures.splice(index, 1);
                this.checkForRefresh();
            }

            public clearAssetNatureSelection() {
                this.selectedAssetNatures = new Array<AssetNature>();
                this.checkForRefresh();
            }

            public setSelectedAssetNatures() {
                this.selectedAssetNatures = this.assetNatureList.selectedItems;
                this.assetNatureListModal.hide();
                this.checkForRefresh();
            }


            /*end ASSET NATURE */


                /*begin DICTIONARY ITEM */
                public selectDictionaryItems() {
                    this.dictionaryItemListModal.show();
                    this.dictionaryItemList.selectedItems = this.selectedDictionaryItems;
                    this.dictionaryItemList.refresh(null);
                }

                public removeFromDictionaryItemSelection(dictionaryItem: DictionaryItem) {
                    let index: number = this.selectedDictionaryItems.indexOf(dictionaryItem);
                    this.selectedDictionaryItems.splice(index, 1);
                    this.checkForRefresh();
                }

                public clearDictionaryItemSelection() {
                    this.selectedDictionaryItems = new Array<DictionaryItem>();
                    this.checkForRefresh();
                }

                public setSelectedDictionaryItems() {
                    this.selectedDictionaryItems = this.dictionaryItemList.selectedItems;
                    this.dictionaryItemListModal.hide();
                    this.checkForRefresh();
                }


                /*end DICTIONARY ITEM */


    /*begin asset type*/
    public selectAssetTypes() {
        this.assetTypeListModal.show();
        this.assetTypeList.selectedItems = this.selectedAssetTypes;
        // console.log('ASSETCLASS: ', this.assetTypeList.selectedItems);
        this.assetTypeList.refresh(null);
    }

    public removeFromAssetTypeSelection(assetType: AssetType) {
        let index: number = this.selectedAssetTypes.indexOf(assetType);
        this.selectedAssetTypes.splice(index, 1);
        this.checkForRefresh();
    }

    public clearAssetTypeSelection() {
        this.selectedAssetTypes = new Array<AssetType>();
        this.checkForRefresh();
    }

    public setSelectedAssetTypes() {
        this.selectedAssetTypes = this.assetTypeList.selectedItems;
        this.assetTypeListModal.hide();
        this.checkForRefresh();
    }

    /* end ASSET TYPE */

     /*begin asset type*/
     public selectDivisions() {

        let selectedDepartments: Array<Department> = null;
        let selectedLocations: Array<Location> = null;
        selectedDepartments = this.selectedDepartments;
        selectedLocations = this.selectedLocations;

        let params = new Array<Param>();
        params.push(new Param('departmentIds', AppUtils.getIdsList<Department, number>(selectedDepartments)));
        params.push(new Param('locationIds', AppUtils.getIdsList<Location, number>(selectedLocations)));


        this.divisionListModal.show();
        this.divisionList.selectedItems = this.selectedDivisions;
        this.divisionList.refresh(params);
    }

    public removeFromDivisionSelection(division: Division) {
        let index: number = this.selectedDivisions.indexOf(division);
        this.selectedDivisions.splice(index, 1);
        this.checkForRefresh();
    }

    public clearDivisionSelection() {
        this.selectedDivisions = new Array<Division>();
        this.checkForRefresh();
    }

    public setSelectedDivisions() {
        this.selectedDivisions = this.divisionList.selectedItems;
        this.divisionListModal.hide();
        this.checkForRefresh();
    }

    /* end ASSET TYPE */

       /* BEGIN COUNTY */

       public selectCounties() {
        this.countyListModal.show();
        this.countyList.selectedItems = this.selectedCounties;
        this.countyList.refresh(null);
    }

    public removeFromCountySelection(county: County) {
        let index: number = this.selectedCounties.indexOf(county);
        this.selectedCounties.splice(index, 1);
        this.checkForRefresh();
    }

    public clearCountySelection() {
        this.selectedCounties = new Array<County>();
        this.checkForRefresh();
    }

    public setSelectedCounties() {
        this.selectedCounties = this.countyList.selectedItems;
        this.countyListModal.hide();
        this.checkForRefresh();
    }

    /* END COUNTY */

      /* BEGIN CITY */

      public selectCities() {
        let selectedCounties: Array<County> = null;
        selectedCounties = this.selectedCounties;
        let params = new Array<Param>();
        params.push(new Param('countyIds', AppUtils.getIdsList<County, number>(selectedCounties)));

        this.cityListModal.show();
        this.cityList.selectedItems = this.selectedCities;
        this.cityList.refresh(params);
    }

    public removeFromCitySelection(city: City) {
        let index: number = this.selectedCities.indexOf(city);
        this.selectedCities.splice(index, 1);
        this.checkForRefresh();
    }

    public clearCitySelection() {
        this.selectedCities = new Array<City>();
        this.checkForRefresh();
    }

    public setSelectedCities() {
        this.selectedCities = this.cityList.selectedItems;
        this.cityListModal.hide();
        this.checkForRefresh();
    }

    /* END CITY */

       /*begin dimension*/
       public selectDimensions() {

        let selectedAssetCategories: Array<AssetCategory> = null;

        selectedAssetCategories = this.selectedAssetCategories;

        let params = new Array<Param>();
        params.push(new Param('assetCategoryIds', AppUtils.getIdsList<AssetCategory, number>(selectedAssetCategories)));

        this.dimensionListModal.show();
        this.dimensionList.selectedItems = this.selectedDimensions;
        this.dimensionList.refresh(params);
    }
    public removeFromDimensionSelection(dimension: Dimension) {
        let index: number = this.selectedDimensions.indexOf(dimension);
        this.selectedDimensions.splice(index, 1);
        this.checkForRefresh();
    }

    public clearDimensionSelection() {
        this.selectedDimensions = new Array<Dimension>();
        this.checkForRefresh();
    }

    public setSelectedDimensions() {
        this.selectedDimensions = this.dimensionList.selectedItems;
        this.dimensionListModal.hide();
        this.checkForRefresh();
    }

    /*end dimension*/

    /*begin asset class*/
    public selectAssetClasses() {
        this.assetClassListModal.show();
        this.assetClassList.selectedItems = this.selectedAssetClasses;
        // console.log('ASSETCLASS: ', this.assetClassList.selectedItems);
        this.assetClassList.refresh(null);
    }

    public removeFromAssetClassSelection(assetClass: AssetClass) {
        let index: number = this.selectedAssetClasses.indexOf(assetClass);
        this.selectedAssetClasses.splice(index, 1);
        this.checkForRefresh();
    }

    public clearAssetClassSelection() {
        this.selectedAssetClasses = new Array<AssetClass>();
        this.checkForRefresh();
    }

    public setSelectedAssetClasses() {
        this.selectedAssetClasses = this.assetClassList.selectedItems;
        this.assetClassListModal.hide();
        this.checkForRefresh();
    }

    // public assetClassListGoBack() {
    //     this.viewMode = this.mainViewMode;
    // }

    // public assetClassSelectionCanceled() {
    //     this.assetClassListGoBack();
    // }

    // public onAssetClassSelectionChanged(assetClasses: Array<AssetClass>) {
    //     if (assetClasses != null) {
    //         switch(this.mainViewMode) {
    //             case AssetManageMainViewMode.AssetList:
    //                 assetClasses.forEach((assetClass) => {
    //                     let index: number = this.selectedAssetClasses.indexOf(assetClass);
    //                     if (index < 0) this.selectedAssetClasses.push(assetClass);
    //                 });

    //                 this.checkForRefresh();
    //                 break;
    //             case AssetManageMainViewMode.AssetDetail:
    //                 this.assetDetailEntitySelectedEvent.emit(new SelectionResult((assetClasses.length > 0 ? assetClasses[0] : null), 'ASSET-CLASS'));
    //                 break;
    //         }
    //     }
    // }

    // public removeFromAssetClassSelection(assetClass: AssetClass) {
    //     var index: number = this.selectedAssetClasses.indexOf(assetClass);
    //     this.selectedAssetClasses.splice(index, 1);

    //     this.checkForRefresh();
    // }

    // public clearAssetClassSelection() {
    //     this.selectedAssetClasses = new Array<AssetClass>();

    //     this.checkForRefresh();
    // }

    // public updateAssetClassSelection() {
    //     this.requestAssetClassSelectionEvent.emit(null);
    //     this.assetClassListGoBack();
    // }

    // public assetClassNeeded() {
    //     this.assetClassRowSelection = 'single';
    //     let selectedAssetClass: Array<AssetClass> = new Array<AssetClass>();
    //     //selectedAssetClass.push(new AssetClass());
    //     this.requestAssetClassRefreshEvent.emit(null);
    //     this.updateAssetClassSelectionEvent.emit(selectedAssetClass);
    //     this.viewMode = AssetManageViewMode.AssetClassList;
    // }
    /*end asset class*/

     /*begin costcenter*/
    public selectCostCenters() {

        let selectedDepartments: Array<Department> = null;
        let selectedDivisions: Array<Division> = null;
        let selectedLocations: Array<Location> = null;
        selectedDepartments = this.selectedDepartments;
        selectedDivisions = this.selectedDivisions;
        selectedLocations = this.selectedLocations;

        let params = new Array<Param>();
        params.push(new Param('departmentIds', AppUtils.getIdsList<Department, number>(selectedDepartments)));
        params.push(new Param('divisionIds', AppUtils.getIdsList<Division, number>(selectedDivisions)));
        params.push(new Param('locationIds', AppUtils.getIdsList<Location, number>(selectedLocations)));

        this.costCenterListModal.show();
        this.costCenterList.selectedItems = this.selectedCostCenters;
        this.costCenterList.refresh(params);
    }

    public removeFromCostCenterSelection(costCenter: CostCenter) {
        let index: number = this.selectedCostCenters.indexOf(costCenter);
        this.selectedCostCenters.splice(index, 1);
        this.checkForRefresh();
    }

    public clearCostCenterSelection() {
        this.selectedCostCenters = new Array<CostCenter>();
        this.checkForRefresh();
    }

    public setSelectedCostCenters() {
        this.selectedCostCenters = this.costCenterList.selectedItems;
        this.costCenterListModal.hide();
        this.checkForRefresh();
    }
    /*end costcenter*/

    /*begin partner*/
    public selectPartners() {
        this.partnerListModal.show();
        this.partnerList.selectedItems = this.selectedPartners;
        this.partnerList.refresh(null);
    }

    public removeFromPartnerSelection(partner: Partner) {
        let index: number = this.selectedPartners.indexOf(partner);
        this.selectedPartners.splice(index, 1);
        this.checkForRefresh();
    }

    public clearPartnerSelection() {
        this.selectedPartners = new Array<Partner>();
        this.checkForRefresh();
    }

    public setSelectedPartners() {
        this.selectedPartners = this.partnerList.selectedItems;
        this.partnerListModal.hide();
        this.checkForRefresh();
    }
    /*end partner*/

    /*begin department*/
    public selectDepartments() {
        this.departmentListModal.show();
        this.departmentList.selectedItems = this.selectedDepartments;
        this.departmentList.refresh(null);
    }


    public removeFromDepartmentSelection(department: Department) {
        let index: number = this.selectedDepartments.indexOf(department);
        this.selectedDepartments.splice(index, 1);
        this.checkForRefresh();
    }

    public clearDepartmentSelection() {
        this.selectedDepartments = new Array<Department>();
        this.checkForRefresh();
    }

    public setSelectedDepartments() {
        this.selectedDepartments = this.departmentList.selectedItems;
        this.departmentListModal.hide();
        this.checkForRefresh();
    }
    /*end department*/

     /* begin employee */

    public selectEmployees() {

        let selectedDivisions: Array<Division> = null;
        let selectedCostCenters: Array<CostCenter> = null;
        selectedDivisions = this.selectedDivisions;
        selectedCostCenters = this.selectedCostCenters;
        let params = new Array<Param>();
        params.push(new Param('divisionIds', AppUtils.getIdsList<Division, number>(selectedDivisions)));
        params.push(new Param('costCenterIds', AppUtils.getIdsList<CostCenter, number>(selectedCostCenters)));
        this.employeeListModal.show();
        this.employeeList.selectedItems = this.selectedEmployees;
        this.employeeList.refresh(params);
    }

    public removeFromEmployeeSelection(employee: Employee) {
        let index: number = this.selectedEmployees.indexOf(employee);
        this.selectedEmployees.splice(index, 1);
        this.checkForRefresh();
    }

    public clearEmployeeSelection() {
        this.selectedEmployees = new Array<Employee>();
        this.checkForRefresh();
    }

    public setSelectedEmployees() {
        this.selectedEmployees = this.employeeList.selectedItems;
        this.employeeListModal.hide();
        this.checkForRefresh();
    }

    /*end employee*/

     /* begin Projeect */

     public selectProjects() {

        this.projectListModal.show();
        this.projectList.selectedItems = this.selectedProjects;
        this.projectList.refresh(null);
    }

    public removeFromProjectSelection(project: Project) {
        let index: number = this.selectedProjects.indexOf(project);
        this.selectedProjects.splice(index, 1);
        this.checkForRefresh();
    }

    public clearProjectSelection() {
        this.selectedProjects = new Array<Project>();
        this.checkForRefresh();
    }

    public setSelectedProjects() {
        this.selectedProjects = this.projectList.selectedItems;
        this.projectListModal.hide();
        this.checkForRefresh();
    }

    /*end project*/

    /* begin BRrand */

    public selectBrands() {

        this.brandListModal.show();
        this.brandList.selectedItems = this.selectedBrands;
        this.brandList.refresh(null);
    }

    public removeFromBrandSelection(brand: Brand) {
        let index: number = this.selectedBrands.indexOf(brand);
        this.selectedBrands.splice(index, 1);
        this.checkForRefresh();
    }

    public clearBrandSelection() {
        this.selectedBrands = new Array<Brand>();
        this.checkForRefresh();
    }

    public setSelectedBrands() {
        this.selectedBrands = this.brandList.selectedItems;
        this.brandListModal.hide();
        this.checkForRefresh();
    }

    /*end project*/

     /* begin region */

     public selectRegions() {
        this.regionListModal.show();
        this.regionList.selectedItems = this.selectedRegions;
        this.regionList.refresh(null);
    }

    public removeFromRegionSelection(region: Region) {
        let index: number = this.selectedRegions.indexOf(region);
        this.selectedRegions.splice(index, 1);
        this.checkForRefresh();
    }

    public clearRegionSelection() {
        this.selectedRegions = new Array<Region>();
        this.checkForRefresh();
    }

    public setSelectedRegions() {
        this.selectedRegions = this.regionList.selectedItems;
        this.regionListModal.hide();
        this.checkForRefresh();
    }

    /* enf Region */

     /* begin admCenter */

     public selectAdmCenters() {
        this.admCenterListModal.show();
        this.admCenterList.selectedItems = this.selectedAdmCenters;
        this.admCenterList.refresh(null);
    }

    public removeFromAdmCenterSelection(admCenter: AdmCenter) {
        let index: number = this.selectedAdmCenters.indexOf(admCenter);
        this.selectedAdmCenters.splice(index, 1);
        this.checkForRefresh();
    }

    public clearAdmCenterSelection() {
        this.selectedAdmCenters = new Array<AdmCenter>();
        this.checkForRefresh();
    }

    public setSelectedAdmCenters() {
        this.selectedAdmCenters = this.admCenterList.selectedItems;
        this.admCenterListModal.hide();
        this.checkForRefresh();
    }

    /* enf Region */

   /* begin location */

    public selectLocations() {
        let selectedRegions: Array<Region> = null;
        let selectedAdmCenters: Array<AdmCenter> = null;
        selectedRegions = this.selectedRegions;
        selectedAdmCenters = this.selectedAdmCenters;
       // console.log(this.selectedAdmCenters);
        let params = new Array<Param>();
        params.push(new Param('regionIds', AppUtils.getIdsList<Region, number>(selectedRegions)));
        params.push(new Param('admCenterIds', AppUtils.getIdsList<AdmCenter, number>(selectedAdmCenters)));
        params.push(new Param('cityIds', AppUtils.getIdsList<City, number>(this.selectedCities)));

        this.locationListModal.show();
        this.locationList.selectedItems = this.selectedLocations;
        this.locationList.refresh(params);
    }

    public removeFromLocationSelection(location: Location) {
        let index: number = this.selectedLocations.indexOf(location);
        this.selectedLocations.splice(index, 1);
        this.checkForRefresh();
    }

    public clearLocationSelection() {
        this.selectedLocations = new Array<Location>();
        this.checkForRefresh();
    }

    public setSelectedLocations() {
        this.selectedLocations = this.locationList.selectedItems;
        this.locationListModal.hide();
        this.checkForRefresh();
    }

    /* enf location */

    // /* begin ASSET NATURE */

    // public selectAssetNatures() {
    //     this.assetNatureListModal.show();
    //     this.assetNatureList.selectedItems = this.selectedAssetNatures;
    //     this.assetNatureList.refresh(null);
    // }

    // public removeFromAssetNatureSelection(assetNature: AssetNature) {
    //     let index: number = this.selectedAssetNatures.indexOf(assetNature);
    //     this.selectedAssetNatures.splice(index, 1);
    //     this.checkForRefresh();
    // }

    // public clearAssetNatureSelection() {
    //     this.selectedAssetNatures = new Array<AssetNature>();
    //     this.checkForRefresh();
    // }

    // public setSelectedAssetNatures() {
    //     this.selectedAssetNatures = this.assetNatureList.selectedItems;
    //     this.assetNatureListModal.hide();
    //     this.checkForRefresh();
    // }

    // /* enf ASSET NATURE */

   /* begin room */

    public selectRooms() {
        let selectedLocations: Array<Location> = null;
        let selectedRegions: Array<Region> = null;
        let selectedAdmCenters: Array<AdmCenter> = null;
        selectedLocations = this.selectedLocations;
        selectedRegions = this.selectedRegions;
        selectedAdmCenters = this.selectedAdmCenters;


        let params = new Array<Param>();
        params.push(new Param('regionIds', AppUtils.getIdsList<Region, number>(selectedRegions)));
        params.push(new Param('admCenterIds', AppUtils.getIdsList<AdmCenter, number>(selectedAdmCenters)));
        params.push(new Param('locationIds', AppUtils.getIdsList<Location, number>(selectedLocations)));

        this.roomListModal.show();
        this.roomList.selectedItems = this.selectedRooms;
        this.roomList.refresh(params);
    }

    public removeFromRoomSelection(room: Room) {
        let index: number = this.selectedRooms.indexOf(room);
        this.selectedRooms.splice(index, 1);
        this.checkForRefresh();
    }

    public clearRoomSelection() {
        this.selectedRooms = new Array<Room>();
        this.checkForRefresh();
    }

    public setSelectedRooms() {
        this.selectedRooms = this.roomList.selectedItems;
        this.roomListModal.hide();
        this.checkForRefresh();
    }

    /* enf room */

    /* begin administrTION */

    public selectAdministrations() {
        let selectedAdministrations: Array<Administration> = null;
        let selectedDivisions: Array<Division> = null;
        selectedDivisions = this.selectedDivisions;


        let params = new Array<Param>();
        params.push(new Param('divisionIds', AppUtils.getIdsList<Division, number>(selectedDivisions)));

        this.administrationListModal.show();
        this.administrationList.selectedItems = this.selectedAdministrations;
        this.administrationList.refresh(params);
    }

    public removeFromAdministrationSelection(administration: Administration) {
        let index: number = this.selectedAdministrations.indexOf(administration);
        this.selectedAdministrations.splice(index, 1);
        this.checkForRefresh();
    }

    public clearAdministrationSelection() {
        this.selectedAdministrations = new Array<Administration>();
        this.checkForRefresh();
    }

    public setSelectedAdministrations() {
        this.selectedAdministrations = this.administrationList.selectedItems;
        this.administrationListModal.hide();
        this.checkForRefresh();
    }

    /* enf room */

    public checkForRefresh() {
        // this.clearSelection();

        if (this.showAllLists) {
            this.refreshAssetAll();
        } else {
            this.refreshAssets();
        }
    }

    public deleteAsset(){
//         // this.toastr.success('<br /><br /><button type='button' id='confirmationRevertYes' class='btn clear'>Da</button>', 'delete item?',
// {
//       closeButton: false,
//       allowHtml: true,
//       onShown: function (toast) {
//           $('#confirmationRevertYes').click(function(){
//             console.log('clicked yes');
//           });
//         }
//   });
        if (confirm('Esti sigur ca vrei sa stergi acest obiect?')){
            this.assetHttpService.deleteAsset(this.selectedAssets[0].id).subscribe((res) => {}, (error) => {
                // this.toastr.error('Eroare stergere activ!');
            }, () => {
                // this.toastr.success('Stergerea a fost finalizata cu success!');
            });
        }

        this.checkForRefresh();
}

    public refreshAssets() {
        const params: Array<Param> = this.getFilters();

       // if (this.depView) this.requestAssetDepDetailRefreshEvent.emit(params);
        // if (this.invView) this.requestAssetInvDetailRefreshEvent.emit(params);
        this.assetList.refresh(params);
    }

    public refreshAssetAll() {
        let params: Array<Param> = this.getFilters();

       // if (this.depView) this.requestAssetDepDetailRefreshEvent.emit(params);
        // if (this.invView) this.requestAssetInvDetailRefreshEvent.emit(params);
        this.assetAllList.refresh(params);
    }

    public getFilters(): Array<Param> {
        let params = new Array<Param>();
        let assetFilter: AssetFilter = new AssetFilter();

        // let assetCategoryIds: Array<number> = new Array<number>();
        // let assetClassIds: Array<number> = new Array<number>();
        // let partnerIds: Array<number> = new Array<number>();
        // let departmentIds: Array<number> = new Array<number>();
    	// let employeeIds: Array<number> = new Array<number>();
        // let locationIds: Array<number> = new Array<number>();
	    // let roomIds: Array<number> = new Array<number>();
        // let costCenterIds: Array<number> = new Array<number>();

        // if (this.selectedAssetCategories != null) {
        //     assetFilter.assetCategoryIds = new Array<number>();
        //     this.selectedAssetCategories.forEach((assetCategory) => {
        //         assetFilter.assetCategoryIds.push(assetCategory.id);
        //     });
        // }


        if (this.selectedAssetNatures != null) {
            assetFilter.assetNatureIds = new Array<number>();
            this.selectedAssetNatures.forEach((assetNature) => {
                assetFilter.assetNatureIds.push(assetNature.id);
            });
        }

        if (this.selectedDimensions != null) {
            assetFilter.dimensionIds = new Array<number>();
            this.selectedDimensions.forEach((dimension) => {
                assetFilter.dimensionIds.push(dimension.id);
            });
        }

        if (this.selectedProjects != null) {
            assetFilter.projectIds = new Array<number>();
            this.selectedProjects.forEach((project) => {
                assetFilter.projectIds.push(project.id);
            });
        }

        if (this.selectedBrands != null) {
            assetFilter.brandIds = new Array<number>();
            this.selectedBrands.forEach((brand) => {
                assetFilter.brandIds.push(brand.id);
            });
        }


        // if (this.selectedUoms != null) {
        //     assetFilter.uomIds = new Array<number>();
        //     this.selectedUoms.forEach((uom) => {
        //         assetFilter.uomIds.push(uom.id);
        //     });
        // }

        // if (this.selectedCounties != null) {
        //     assetFilter.countyIds = new Array<number>();
        //     this.selectedCounties.forEach((county) => {
        //         assetFilter.countyIds.push(county.id);
        //     });
        // }

        // if (this.selectedCities != null) {
        //     assetFilter.cityIds = new Array<number>();
        //     this.selectedCities.forEach((city) => {
        //         assetFilter.cityIds.push(city.id);
        //     });
        // }

        if (this.selectedCompanies != null) {
            assetFilter.companyIds = new Array<number>();
            this.selectedCompanies.forEach((company) => {
                assetFilter.companyIds.push(company.id);
            });
        }

        

        // if (this.selectedAssetClasses != null) {
        //     assetFilter.assetClassIds = new Array<number>();
        //     this.selectedAssetClasses.forEach((assetClass) => {
        //         assetFilter.assetClassIds.push(assetClass.id);
        //     });
        // }


        // if (this.selectedAssetTypes != null) {
        //     assetFilter.assetTypeIds = new Array<number>();
        //     this.selectedAssetTypes.forEach((assetType) => {
        //         assetFilter.assetTypeIds.push(assetType.id);
        //     });
        // }

        if (this.selectedDivisions != null) {
            assetFilter.divisionIds = new Array<number>();
            this.selectedDivisions.forEach((division) => {
                assetFilter.divisionIds.push(division.id);
            });
        }

        // if (this.selectedAdministrations != null) {
        //     assetFilter.administrationIds = new Array<number>();
        //     this.selectedAdministrations.forEach((administration) => {
        //         assetFilter.administrationIds.push(administration.id);
        //     });
        // }

        // if (this.selectedPartners != null) {
        //     assetFilter.partnerIds = new Array<number>();
        //     this.selectedPartners.forEach((partner) => {
        //         assetFilter.partnerIds.push(partner.id);
        //     });
        // }

        if (this.selectedDepartments != null) {
            assetFilter.departmentIds = new Array<number>();
            this.selectedDepartments.forEach((department) => {
                assetFilter.departmentIds.push(department.id);
            });
        }

        if (this.selectedCostCenters != null) {
            assetFilter.costCenterIds = new Array<number>();
            this.selectedCostCenters.forEach((costcenter) => {
                assetFilter.costCenterIds.push(costcenter.id);
            });
        }

        if (this.selectedEmployees != null) {
            assetFilter.employeeIds = new Array<number>();
            this.selectedEmployees.forEach((employee) => {
                assetFilter.employeeIds.push(employee.id);
            });
        }

        if (this.selectedLocations != null) {
            assetFilter.locationIds = new Array<number>();
            this.selectedLocations.forEach((location) => {
                assetFilter.locationIds.push(location.id);
            });
        }

        if (this.selectedRooms != null) {
            assetFilter.roomIds = new Array<number>();
            this.selectedRooms.forEach((room) => {
                assetFilter.roomIds.push(room.id);
            });
        }

        if (this.selectedDictionaryItems != null) {
            assetFilter.dictionaryItemIds = new Array<number>();
            this.selectedDictionaryItems.forEach((dictionaryItem) => {
                assetFilter.dictionaryItemIds.push(dictionaryItem.id);
            });
        }

        // if (this.selectedRegions != null) {
        //     assetFilter.regionIds = new Array<number>();
        //     this.selectedRegions.forEach((region) => {
        //         assetFilter.regionIds.push(region.id);
        //     });
        // }

        // if (this.selectedAdmCenters != null) {
        //     assetFilter.admCenterIds = new Array<number>();
        //     this.selectedAdmCenters.forEach((admCenter) => {
        //         assetFilter.admCenterIds.push(admCenter.id);
        //     });
        // }


        // params.push(new Param('assetCategoryIds', JSON.stringify(assetCategoryIds)));
        // params.push(new Param('assetClassIds', JSON.stringify(assetClassIds)));
        // params.push(new Param('partnerIds', JSON.stringify(partnerIds)));
        // params.push(new Param('departmentIds', JSON.stringify(departmentIds)));
	    // params.push(new Param('employeeIds', JSON.stringify(employeeIds)));
	    // params.push(new Param('locationIds', JSON.stringify(locationIds)));
        // params.push(new Param('roomIds', JSON.stringify(roomIds)));
        // params.push(new Param('costCenterIds', JSON.stringify(costCenterIds)));
        // params.push(new Param('filter', this.filter));
        // params.push(new Param('custody', ((this.custody === '-') ? 'null' : (this.custody === 'YES' ? 'true' : 'false'))));

        if (this.assetStateId > 0)
        {
            assetFilter.assetStateIds = new Array<number>();
            assetFilter.assetStateIds.push(this.assetStateId);
        }
        else
        {
            assetFilter.assetStateIds = null;
        }

        // if (this.appStateId > 0)
        // {
        //     assetFilter.appStateId = this.appStateId;
        // }

        if (this.invStateId > 0)
        {
            assetFilter.invStateIds = new Array<number>();
            assetFilter.invStateIds.push(this.invStateId);
        }
        else
        {
            assetFilter.invStateIds = null;
        }
        assetFilter.filter = this.filter;
        //assetFilter.filterAll = this.filterAll;
        //assetFilter.accMonthId = this.selectedAccMonth != null ? this.selectedAccMonth.id : null;
        //assetFilter.custody = ((this.custody === '-') ? null : (this.custody === 'DA' ? 'true' : 'false'));
        assetFilter.isPrinted = ((this.isPrinted === '-') ? null : (this.isPrinted === 'DA' ? true : false));
        assetFilter.isDuplicate = ((this.isDuplicate === '-') ? null : (this.isDuplicate === 'DA' ? true : false));
        //assetFilter.isWaitingValidation = ((this.isWaitingValidation === '-') ? null : (this.isWaitingValidation === 'DA' ? 'true' : 'false'));
        //assetFilter.isInTransfer = ((this.isInTransfer === '-') ? null : (this.isInTransfer === 'DA' ? 'true' : 'false'));
        //assetFilter.isClosed = ((this.isClosed === '-') ? null : (this.isClosed === 'INCHISE' ? 'true' : 'false'));
        assetFilter.filterName = this.filterName;
        assetFilter.filterInv = this.filterInv;
        assetFilter.filterPurchaseDate = this.filterPurchaseDate ? this.filterPurchaseDate : 'false' ;
        assetFilter.fromDate = new Date(this.from);
        assetFilter.toDate = new Date(this.to);
        assetFilter.toDate = new Date(this.closeOnDate);

        // params.push(new Param('pageSize', this.pageSize.toString()));
        params.push(new Param('jsonFilter', JSON.stringify(assetFilter)));
       // console.log(assetFilter);
        return params;
    }

    public onChangeFrom(event) {
        this.from = JSON.stringify(event.formatted);
        this.checkForRefresh();
    }

    public onChangeTo(event) {
        this.to = JSON.stringify(event.formatted);
        this.checkForRefresh();
    }

    public closeOn(event) {
        const year = event.year;
        const month = event.month;
        const day = event.day;
        this.locationHttpService.closeOnDay(year, month, day).subscribe((res) => {
            this.finishedLocations = JSON.stringify(res) !== '0' ? JSON.stringify(res) : '0';
        });
    }

    public showInvNoRegistryReport() {
        window.open(AppConfig.reportingServer +  'Report.aspx/?report=invnoregistry');
    }

    public doImportV1() {
        if (this.importIndex < this.importLinesV1.length) {
          //  console.log(JSON.stringify(this.importLinesV1));
            this.assetHttpService.uploadV1(this.importLinesV1[this.importIndex]).subscribe((data) => {
                this.importIndex = this.importIndex + 1;
                this.doImportV1();
            });
        }
        else {
            this.fileEvent = null;
            this.importDataModal.hide();
            this.importIndex = 0;
            this.importLinesV1 = new Array<AssetImportV1>();
        }
    }

    public doImportV2() {
        if (this.importIndex < this.importLinesV2.length) {
            this.assetHttpService.uploadV2(this.importLinesV2[this.importIndex]).subscribe((data) => {
                this.importIndex = this.importIndex + 1;
                this.doImportV2();
            });
        }
        else {
            this.fileEvent = null;
            this.importDataModal.hide();
            this.importIndex = 0;
            this.importLinesV2 = new Array<AssetImportV2>();
        }
    }

    public loadFile(ev) {
        this.fileEvent = ev;
    }

    public loadFileEmag(ev) {
        this.fileEventEmag = ev;
    }

    public loadITFile(ev) {
        this.fileITEvent = ev;
    }

    public loadFileCassation(ev) {
        this.fileEvent = ev;
    }

    public parseDate(dateString: string): Date {
        if (dateString) {
            return new Date(dateString);
        } else {
            return null;
        }
    }

    public parseStartDate(dateString: string): Date {
        if (dateString) {
            this.transferStartDate = new Date(dateString);
            this.transferEndDate = new Date();
            this.checkForRefresh();
            return new Date(dateString);
        } else {
            return null;
        }
    }
    public parseEndDate(dateString: string): Date {
        if (dateString) {
            this.transferEndDate = new Date(dateString);
            this.checkForRefresh();
            return new Date(dateString);
        } else {
            return null;
        }
    }

    public setSelectedMonth(month: number) {
        this.selectedMonth = month;

        this.updateSelectedAccMonth();
    }

    public setSelectedYear(year: number) {
        this.selectedYear = year;

        this.updateSelectedAccMonth();
    }

    public nextMonth() {
        if (this.selectedMonth === 12) {
            this.selectedMonth = 1;
            this.selectedYear = this.selectedYear + 1;
        }
        else
        {
            this.selectedMonth = this.selectedMonth + 1;
        }

        this.updateSelectedAccMonth();
    }

    public previousMonth() {
        if (this.selectedMonth === 1) {
            this.selectedMonth = 12;
            this.selectedYear = this.selectedYear - 1;
        }
        else {
            this.selectedMonth = this.selectedMonth - 1;
        }

        this.updateSelectedAccMonth();
    }

    public updateSelectedAccMonth() {
        this.accMonthHttpService.getAccMonth(this.selectedMonth, this.selectedYear).subscribe((accMonth: AccMonth) => {
            this.selectedAccMonth = accMonth;
            this.checkForRefresh();
        });
    }

    public importData() {
      //  console.log('import type: ' + AppConfig.IMPORT_TYPE);
        switch (AppConfig.IMPORT_TYPE) {
            case 'V1':
                this.importDataV1();
                break;
            case 'V2':
                this.importDataV2();
                break;
            default:
                break;
        }
    }

    public upload() {
        let fi = this.fileInputEmag.nativeElement;
        if (fi.files && fi.files[0]) {
            let fileToUpload = fi.files[0];
            this.assetHttpService
                .import(fileToUpload)
                .subscribe(res => {
                    this.uploadFinished.emit(null);
                });
        }
    }

    public uploadCassation() {
        // let fi = this.fileInputCassation.nativeElement;
        // if (fi.files && fi.files[0]) {
        //     let fileToUpload = fi.files[0];
        //     this.assetHttpService
        //         .importCassation(fileToUpload)
        //         .subscribe(res => {
        //             this.uploadFinished.emit(null);
        //         });
        // }
    }

    public showPifList(): void {
        let url: string = '';
        url = `${AppConfig.reportingServer}Report.aspx/?report=pifReport&assetId=${this.assetList.selectedItem.id}`;
        window.open(url);
      }

      public showPvList(): void {
        let url: string = '';
        url = `${AppConfig.reportingServer}Report.aspx/?report=pvReport&assetId=${this.assetList.selectedItem.id}`;
        window.open(url);
      }

    public importDataV1() {

        if (this.fileEvent === null) return;

        // alasql.promise(`select [ASSET SEQ NO-A] as InvNo1,
        //                     [ASSET SEQ NO] as InvNo2,
        //                     [ASSET COMPONENT] as InvNo3,
        //                     [GENERAL CATEGORY] as AssetCategoryCode,
        //                     [FA ACCOUNT DESCRIPTION] as AssetCategoryName,
        //                     [QUANTITY] as Quantity,
        //                     [BRANCH CODE] as LocationCode,
        //                     [COST CENTER] as CostCenterCode,
        //                     [ASSET DESCRIPTION] as AssetName,
        //                     [ACQUISITION DATE] as PurchaseDate,
        //                     CAST([ORIGINAL COST] AS NUMBER) as [ValueInv],
        //                     [SUPPLIER] as PartnerName,
        //                     [TAX NUMBER] as FiscalCode,
        //                     [DOCUMENT NUMBER] as DocNo1,
        //                     [SERIAL NUMBER] as SerialNumber,
        //                     [DISPOSITION DATE] as AssetState,
        //                     [FA ACCOUNT] as AssetType,
        //                     CAST([NET BOOK VALUE] AS NUMBER) as [ValueRem]
        //                     from FILE(?, {headers: true})`, [this.fileEvent])
        // .then((importLines: Array<AssetImportV1>) => {

        //         this.importDataModal.show();

        //         this.importIndex = 0;
        //         this.importLinesV1 = importLines;
        //         this.noOfItems = importLines.length;
        //    //  console.log(importLines);
        //         this.doImportV1();
        // });

    }

    public importDataV2() {

        if (this.fileEvent === null) return;

        // alasql.promise(`select
        //                     [Numar inventar] as [InvNo],
        //                     [Descriere mijloc fix] as [Name],
        //                     [Nr serie mijloc fix] as [SerialNumber],
        //                     [Centru de cost] as [CostCenterCode],
        //                     [Judet] as [AdmCenterName],
        //                     [Camera] as [RoomName],
        //                     [Data capitalizare] as [PurchaseDate],
        //                     [Valoare mijloc fix] as [ValueInv],
        //                     [Amortizarea acumulata] as [ValueDep],
        //                     [UM] as [Uom],
        //                     [Scriptic] as [Quantity],
        //                     [Custodie] as [Custody],
        //                     [Marca personal] as [InternalCode],
        //                     [Nume salariat] as [EmployeeFullName]
        //                     from FILE(?, {headers: true})`, [this.fileEvent])
        //     .then((importLines: Array<AssetImportV2>) => {

        //         // console.log(JSON.stringify(importLines));

        //         this.importDataModal.show();

        //         this.importIndex = 0;
        //         this.importLinesV2 = importLines;
        //         this.noOfItems = importLines.length;

        //         this.doImportV2();
        // });

    }

      public exportToExcel() {

        let params: Array<Param> = this.getFilters();

        this.assetHttpService.get(1, 1000000, 'invNo', 'asc', params, null).subscribe(
            (assetInvDetails: PagedResult<AssetInvDetail>) => {

                // console.log(JSON.stringify(assetInvDetails));

                let options = {
                    sheetid: 'mijloace fixe',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                // alasql(`SELECT id as [Id],
                //         invNo as [Numar inventar],
                //         name as [Denumire],
                //         adm->employee->internalCode as [Marca],
                //         adm->employee->firstName as [Prenume],
                //         adm->employee->lastName as [Nume],
                //         adm->location->name as [Cladire],
                //         adm->costCenter->code as [Centru de cost],
                //         adm->costCenter->name as [Denumire entru de cost]
                //         INTO XLSX('mijloace_fixe.xlsx',?) FROM ?`, [ options, assetInvDetails.items ]);

            });
    }

    public exportToExcelInOtp() {

        let params: Array<Param> = null;

    //     params = this.getFilters();
    //     this.assetHttpService
    //         .exportOtp(params)
    //         .subscribe((blob) => {
    //     fileSaveAs(blob, 'Export.xlsx');
    // });

}

public exportThales() {

    this.showExportBtn = false;
    let params: Array<Param> = null;

    params = this.getFilters();
    this.assetHttpService
        .exportThales(params)
        .subscribe((blob) => {
    fileSaveAs(blob.body, 'Thales.xlsx');
    this.showExportBtn = true;
  });
}



    public exportToExcelInBnr() {

        let params: Array<Param> = null;

    //     params = this.getFilters();
    //     this.assetHttpService
    //         .exportIn(params)
    //         .subscribe((blob) => {
    //     fileSaveAs(blob, 'Intrari.xlsx');
    // });


                // let params: Array<Param> = this.getFilters();

                // this.assetHttpService.get(1, 1000000, 'invNo', 'asc', params, null).subscribe(
                //     (assetInvDetails: PagedResult<AssetInvDetail>) => {

                //         //console.log(JSON.stringify(assetInvDetails));

                //         let options = {
                //             sheetid: 'Intrari',
                //             headers: true,
                //             column: { style: { Font: { Bold: '1' } } },
                //             rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                //             cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                //         };

                //         alasql.fn.datetime = function(dateStr) {
                //             var date = new Date(dateStr);
                //             date.toISOString().substring(0, 10);
                //             return date.toLocaleDateString();
                //         };

                //         alasql(`SELECT id as [Id],
                //                 invNo as [Numar inventar],
                //                 serialNumber as [Serie],
                //                 name as [Denumire],
                //                 quantity as [Cantitate],
                //                 CAST([valueInv] AS NUMBER) as [Valoare intrare],
                //                 CAST([valueRem] AS NUMBER) as [Valoare inventar],
                //                 datetime(purchaseDate) as [Data intrare],
                //                 adm->location->code as [Cod Cladire],
                //                 adm->location->name as [Denumire Cladire],
                //                 adm->room->name as [Camera],
                //                 adm->assetType->name as [Tip MF/OI],
                //                 adm->employee->internalCode as [Marca],
                //                 adm->employee->lastName as [Nume],
                //                 adm->employee->firstName as [Prenume],
                //                 adm->assetCategory->code as [Cod categorie],
                //                 adm->assetCategory->name as [Denumire categorie],
                //                 adm->costCenter->code as [Cod centru de cost],
                //                 adm->costCenter->name as [Denumire centru de cost]
                //                 INTO XLSX('mijloace_fixe.xlsx',?) FROM ?`, [ options, assetInvDetails.items ]);
                //     });
            }

    public exportToExcelOutBnr() {

        // let params: Array<Param> = this.getFilters();
        // this.assetHttpService.get(1, 1000000, 'invNo', 'asc', params, null).subscribe(
        //     (assetInvDetails: PagedResult<AssetInvDetail>) => {

        //         //console.log(JSON.stringify(assetInvDetails));

        //         let options = {
        //             sheetid: 'Intrari',
        //             headers: true,
        //             column: { style: { Font: { Bold: '1' } } },
        //             rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
        //             cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
        //         };

        //         alasql.fn.datetime = function(dateStr) {
        //             let date = new Date(dateStr);
        //             //date.toISOString().substring(0, 10);
        //             return date.toLocaleDateString();
        //         };

        //         alasql(`SELECT  [Nr. crt],
        //                 'iesire' as [Tip op],
        //                 datetime(document->documentDate) as [Luna],
        //                 adm->assetType->name as [Cat Cont],
        //                 invNo as [Nr. inv],
        //                 name as [Descriere],
        //                 adm->region->code + '.' + adm->location->code + '.' + adm->room->code as [Locatie],
        //                 adm->region->name as [Gestiune responsabila (1)],
        //                 adm->location->name as [Gestiune responsabila (2)],
        //                 adm->costCenter->code as [Centrul Cost],
        //                 adm->employee->lastName + ' ' + adm->employee->firstName as [Responsabil],
        //                 adm->employee->internalCode as [Numar marca],
        //                 datetime(purchaseDate) as [Data punere in functiune],
        //                 datetime(document->documentDate) as [Data scoatere din functiune],
        //                 quantity as [Unitati],
        //                 CAST([valueInv] AS NUMBER) as [Valoare],
        //                 CAST(dep->[valueDepYTD] AS NUMBER) as [Amortizare cumulata],
        //                 CAST([valueInv] AS NUMBER) - CAST(dep->[valueDepYTD] AS NUMBER) AS  [Profit/Pierdere]
        //                 INTO XLSX('Iesiri.xlsx',?) FROM ?`, [ options, assetInvDetails.items ]);

        //                 console.log(JSON.stringify(assetInvDetails.items));
        //     });


        let params: Array<Param> = null;

    //     params = this.getFilters();
    //     this.assetHttpService
    //         .exportOut(params)
    //         .subscribe((blob) => {
    //     fileSaveAs(blob, 'Iesiri.xlsx');
    // });
    }

    public exportToExcelOtp() {

        let params: Array<Param> = this.getFilters();

        this.assetHttpService.get(1, 1000000, 'invNo', 'asc', params, null).subscribe(
            (assetInvDetails: PagedResult<AssetInvDetail>) => {

                // console.log(JSON.stringify(assetInvDetails));

                let options = {
                    sheetid: 'Intrari',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                // alasql.fn.datetime = function(dateStr) {
                //     let date = new Date(dateStr);
                //     date.toISOString().substring(0, 10);
                //     return date.toLocaleDateString();
                // };

                // alasql(`SELECT id as [Id],
                //         invNo as [Numar inventar],
                //         serialNumber as [Serie],
                //         name as [Denumire],
                //         quantity as [Cantitate],
                //         adm->location->code as [Cod Cladire],
                //         adm->location->name as [Denumire Cladire],
                //         adm->assetType->name as [Tip MF/OI]
                //         INTO XLSX('mijloace_fixe.xlsx',?) FROM ?`, [ options, assetInvDetails.items ]);
            });
    }

    // public exportTransfersCCToExcel() {

    //     let params: Array<Param> = this.getFilters();

    //     this.assetInvDetailHttpService.get(1, 1000000, 'invNo', 'asc', params, null).subscribe(
    //         (assetInvDetails: PagedResult<AssetInvDetail>) => {

    //             //console.log(JSON.stringify(assetInvDetails));

    //             let options = {
    //                 sheetid: 'Template transf centru de cost',
    //                 headers: true,
    //                 column: { style: { Font: { Bold: '1' } } },
    //                 rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
    //                 cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
    //             };

    // alasql('SELECT  3 as [Property Type],[Asset Seq A],invNo as [Asset Seq No N],0 as [Asset Component],costCenterName as
    // [Cost Center],[General Category],[Category],[Sub Category],costCenterName as [Branch],1 as [Quantity] INTO XLSX('template Transfer1.xlsx',?) FROM ?   WHERE DATE(modifiedAt) > DATE('' +
    //                           this.transferStartDate + '') AND DATE(modifiedAt) < DATE(''
    //                         + this.transferEndDate + '')'
    //                         , [ options, assetInvDetails.items ]);

    //         });
    // }

    // public trackByCode(index: number, tableItem: any): string {
    //             return tableItem.code;
    //     }

    // public exportTransfersCategToExcel() {

    //     // let params: Array<Param> = this.getFilters();

    //     this.assetInvDetailHttpService.get(1, 1000000, 'invNo', 'asc', [], null).subscribe(
    //         (assetInvDetails: PagedResult<AssetInvDetail>) => {
    //             console.log(this.transferStartDate);
    //             console.log(this.transferEndDate);
    //             //console.log(JSON.stringify(assetInvDetails));

    //             let options = {
    //                 sheetid: 'Template transf categorie',
    //                 headers: true,
    //                 column: { style: { Font: { Bold: '1' } } },
    //                 rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
    //                 cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
    //             };

    //             alasql('SELECT 3 as [Property Type],[Asset Seq A],invNo as [Asset Seq No N],0 as [Asset Component],[Cost Center],33
    // as [General Category],assetCategoryId as [Category],1 as [Sub Category],[Branch],1 as [Quantity]INTO XLSX('template Transfer2.xlsx',?) FROM ?   WHERE DATE(modifiedAt) > DATE('' +
    //                         this.transferStartDate +'') AND DATE(modifiedAt) < DATE(''
    //                         + this.transferEndDate + '')'
    //                         , [ options, assetInvDetails.items ]);

    //         });
    // }

    // public generateBarcodes() {
    //     $('.barcode').each((index) => {
    //         jsbarcode($('.barcode')[index], this.selectedAssets[index].invNo, {
    //             format: 'CODE128',
    //             displayValue: false,
    //             marginTop: -1,
    //             marginRight: 0,
    //             marginBottom: -1,
    //             marginLeft: 0,
    //             width: 1,
    //             height: 48,
    //             font: 'arial'
    //             });
    //         });
    // }

    public generateBarcodes() {
        // $('.barcode').each((index) => {
        //     jsbarcode($('.barcode')[index], this.selectedAssets[index].invNo, {
        //         format: 'CODE128',
        //         displayValue: false,
        //         marginTop: -1,
        //         marginRight: 0,
        //         marginBottom: -1,
        //         marginLeft: 0,
        //         width: 2,
        //         height: 70,
        //         font: 'arial'
        //         });
        //     });
    }

    // public generateBarcodes() {
    //     $('.barcode').each((index) => {
    //         jsbarcode($('.barcode')[index], this.selectedAssets[index].invNo, {
    //             format: 'CODE128',
    //             displayValue: false,
    //             marginTop: -1,
    //             marginRight: 0,
    //             marginBottom: -1,
    //             marginLeft: 0,
    //             width: 2,
    //             height: 60,
    //             font: 'arial'
    //             });
    //         });
    // }  // ORIGINAL

    // public generateBarcode() {
    //     console.log(JSON.stringify(this.selectedAssets));
    //       $('.barcode').each((index) => {
    //         jsbarcode($('.barcode')[index], this.selectedAssets[index].invNo, {
    //         format: 'CODE128',
    //         displayValue: true,
    //         marginTop: 40,
    //         marginRight: 5,
    //         marginBottom: 40,
    //         fontSize: 44,
    //         width: 4,
    //         height: 110,
    //         font: 'arial',
    //         textAlign: 'center'
    //     });
    // });
    // }

    public printAllLabel (){
        // let label = new Array<PrintLabel>();
        // this.selectedAssetAlls.forEach(asset => {

        //     if (asset.isPrinted){
        //         // this.toastr.info('Numarul de inventar ' + asset.invNo + ' a fost printat deja!');
        //         return;
        //     } else {
        //         let labelPush = new PrintLabel();
        //         labelPush.invNo = asset.invNo;
        //         labelPush.description = asset.name;
        //         labelPush.purchaseDate = asset.purchaseDate;
        //         labelPush.sapCode = asset.sapCode;
        //         labelPush.serialNumber = asset.serialNumber
        //         label.push(labelPush);
        //     }
        // });

        // // this.assetHttpService.printLocalLabel(label).subscribe( (res: PrintLabel) => {
        // //     if (res != null && res.invNo != null) {
        // //         this.markPrintData();
        // //     }
        // // });
        // this.assetAllHttpService.printLocalLabel(label).subscribe( (res: PrintLabel) => {
        //     if (res) {
        //         this.markAllPrintData();
        //     }
        // }, (error) => {
        //     alert('Eroare server 11!');
        // });
    }

    public printBarcodeLabels() {
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

        let printLabels: Array<number> = new Array<number>();

        this.selectedAssets.forEach(asset => {
            printLabels.push(asset.id);
        });

        this.assetHttpService
        .updatePrintDateLabel(printLabels)
        .subscribe((res) => {
            if (JSON.stringify(res as any as boolean === true)) {
                // // this.toastr.success('Datele au fost actualizate cu succes!');


                let isPrinted: number = 0;
                this.selectedAssets.forEach(asset => {
                    // if (asset.isPrinted){
                    //     // this.toastr.info('Numarul de inventar ' + asset.invNo + ' a fost printat deja!');
                    //     isPrinted++;
                    // }
                });

                if (isPrinted > 0){
                    return;
                }

                this.generateBarcodes();
                //  console.log('SELECTED ASSETS', this.selectedAssets);
                  let popupWinindow: any = null;
                  let innerContents = document.getElementById('barcodes').innerHTML;
                  // let innerContents = '^XA^PW400^LL200^FO20,20^A0N,30,30^FDThis is a TEST^FS^XZ';
                  // console.log(innerContents);
                  popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
                  popupWinindow.document.open();
                  popupWinindow.document.write('<html><head><link rel="stylesheet" /></head><body onload="window.print()">' + innerContents + '</html>');
                  popupWinindow.document.close();
                  // this.markPrintData();
                  this.checkForRefresh();

            }else{
                // this.toastr.error('Eroare. Datele nu au fost actualizate!');
                return;
            }

        }, (error) => {
            // this.toastr.error('Eroare server!');
            return;
        });
    }

    public markPrintData () {
        const printLabels: Array<number> = new Array<number>();

        this.selectedAssets.forEach(asset => {
            printLabels.push(asset.id);
        });

        this.assetHttpService
        .updatePrintDateLabel(printLabels)
        .subscribe((res) => {
            if (res.statusCode === 200){
                this.notifyService.showSuccess('Datele au fost actualizate cu succes!', '', 0, false, 0);
                this.clearSelection();
                this.refreshAssets();
            } else {
                this.notifyService.showError('Datele nu au fost actualizate cu succes!', '', 0, false, 0);
            }

        }, (error) => {
            this.notifyService.showError('Eroare server!', '', 0, false, 0);
        });
    }

    public markAllPrintData () {
        let printLabels: Array<number> = new Array<number>();

        this.selectedAssetAlls.forEach(asset => {
            printLabels.push(asset.id);
        });

        this.assetAllHttpService
        .updatePrintDateLabel(printLabels)
        .subscribe((res) => {
            if (res){
                this.notifyService.showSuccess('Datele au fost actualizate cu succes!', '', 0, false, 0);
                this.clearAllSelection();
                this.refreshAssetAll();

            }else{
                this.notifyService.showSuccess('Eroare. Datele nu au fost actualizate!', '', 0, false, 0);
            }

        }, (error) => {
            this.notifyService.showError('Eroare server!', '', 0, false, 0);
        });
    }

    public showAllLocations(){

        let params = new Array<Param>();
        if (this.allLocations === 'NO'){
            this.allLocations = 'YES';
        }else {
            this.allLocations = 'NO';
        }

        params.push(new Param('showAll', this.allLocations.toString()));
        this.locationList.refresh(params);
    }

    public onPageUpdate(number: number) {
        this.pageSize = number;
        this.checkForRefresh();
    }

    public export() {
        this.showExportBtn = false;
        let params: Array<Param> = null;

        params = this.getFilters();
        this.assetHttpService
            .export(params)
            .subscribe((blob) => {
        fileSaveAs(blob.body, 'Export.xlsx');
        this.showExportBtn = true;
      });
    }

    public postAsset() {
        this.assetHttpService
            .createAsset()
            .subscribe((res) => {
                console.log(JSON.stringify(res));
      });
    }

    public uploadSN() {

        this.uploadModal.show();
    }

    public loadFileSN(ev) {
        // console.log(ev);
        this.fileEvent = ev;
    }

  doSimpleSearch($event: string) {
    this.filter = $event;
    this.checkForRefresh();
  }
}

enum AssetManageMainViewMode {
    AssetList = 1,
    AssetDetail = 2,
    OperationDetail = 3
}

enum AssetManageViewMode {
    AssetList = 1,
    AssetDetail = 2,
    OperationDetail = 3,
    AssetCategoryList = 4,
    PartnerList = 5,
    DepartmentList = 6,
    EmployeeList = 7,
    LocationList = 8,
    RoomList = 9,
    AssetClassList = 10,
    CostCenterList = 11
}


