import { AssetNiTransferSave } from './../../../model/api/assets/asset-ni-transfer-save';
import { CostCenterHttpService } from './../../../services/http/administration/cost-center.http.service';
import { CostCenter } from './../../../model/api/administration/cost-center';
import { AppConfig } from './../../../config';
import { Component, EventEmitter, ViewChild, ElementRef, Output, ViewContainerRef } from '@angular/core';
import { Param } from '../../../model/common/param';
import { AssetCategory } from '../../../model/api/assets/asset-category';
import { Department } from '../../../model/api/administration/department';
import { Employee } from '../../../model/api/administration/employee';
import { Location } from '../../../model/api/administration/location';
import { Room } from '../../../model/api/administration/room';
import { RegionHttpService } from '../../../services/http/administration/region.http.service';
import { LocationHttpService } from '../../../services/http/administration/location.http.service';
import { DepartmentHttpService } from '../../../services/http/administration/department.http.service';
import { RoomDetailHttpService } from '../../../services/http/administration/room-detail.http.service';
import { Router, NavigationEnd } from '@angular/router';
import { saveAs as fileSaveAs } from 'file-saver-es';
import { Division } from '../../../model/api/administration/division';
import { Administration } from '../../../model/api/administration/administration';
import { DivisionHttpService } from '../../../services/http/administration/division.http.service';
import { AssetType } from '../../../model/api/assets/asset-type';
import { AssetInvFullDetailListComponent } from './asset-inv-full-detail.list';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { InventoryList } from '../../inventory/inventory.list';
import { DepartmentListComponent } from '../../administrations/departments/department.list';
import { EmployeeListComponent } from '../../administrations/employees/employee.list';
import { AdmCenterListComponent } from '../../administrations/adm-centers/adm-center.list';
import { RegionListComponent } from '../../administrations/regions/region.list';
import { CountyListComponent } from '../../administrations/counties/county.list';
import { CityListComponent } from '../../administrations/cities/city.list';
import { DimensionListComponent } from '../dimensions/dimension.list';
import { LocationListComponent } from '../../administrations/locations/location.list';
import { RoomListComponent } from '../../administrations/rooms/room.list';
import { CostCenterListComponent } from '../../administrations/cost-centers/cost-center.list';
import { AdministrationListComponent } from '../../administrations/administrations/administration.list';
import { DivisionListComponent } from '../../administrations/divisions/division.list';
import { AssetTypeListComponent } from '../asset-types/asset-type.list';
import { AssetCategoryListComponent } from '../asset-categories/asset-category.list';
import { CompanyListComponent } from '../companies/company.list';
import { UomListComponent } from '../uoms/uom.list';
import { InvStateList } from '../../inventory/inv-state/inv-state.list';
import { UserListComponent } from '../../auth/user.list';
import { AssetImage, EntityFile } from '../../../model/api/common/entity-file';
import { Inventory } from '../../../model/api/inventory/inventory';
import { AdmCenter } from '../../../model/api/administration/adm-center';
import { Region } from '../../../model/api/administration/region';
import { City } from '../../../model/api/administration/city';
import { County } from '../../../model/api/administration/county';
import { Dimension } from '../../../model/api/administration/dimension';
import { Uom } from '../../../model/api/assets/uom';
import { Company } from '../../../model/api/assets/company';
import { AssetInvFullDetail } from '../../../model/api/assets/asset-inv-full-detail';
import { ApplicationUser } from '../../../model/api/identity/inventory-user';
import { InvState } from '../../../model/api/inventory/inv-state';
import { AssetInvTempDetail } from '../../../model/api/assets/asset-inv-temp-detail-list';
import { AssetNi } from '../../../model/api/assets/asset-ni';
import { AppData } from '../../../app-data';
import { AssetHttpService } from '../../../services/http/assets/asset.http.service';
import { AdministrationHttpService } from '../../../services/http/administration/administration.http.service';
import { AssetTypeHttpService } from '../../../services/http/assets/asset-type.http.service';
import { AssetCategoryHttpService } from '../../../services/http/assets/asset-category.http.service';
import { UomHttpService } from '../../../services/http/assets/uom.http.service';
import { AdmCenterHttpService } from '../../../services/http/administration/adm-center.http.service';
import { InventoryHttpService } from '../../../services/http/inventory/inventory.http.service';
import { EmployeeHttpService } from '../../../services/http/administration/employee.http.service';
import { CompanyHttpService } from '../../../services/http/assets/company.http.service';
import { CountyHttpService } from '../../../services/http/administration/county.http.service';
import { CityHttpService } from '../../../services/http/administration/city.http.service';
import { InvStateHttpService } from '../../../services/http/inventory/inv-state.http.service';
import { DimensionHttpService } from '../../../services/http/administration/dimension.http.service';
import { IdentityService } from '../../../services/http/identity/identity.service';
import { AssetTempRecoSave } from '../../../model/api/assets/asset-temp-reco-save';
import { AppUtils } from '../../../common/app.utils';
import { PagedResult } from '../../../model/common/paged-result';
import { EntityFileHttpService } from '../../../services/http/common/entity-file.http.service';

import { AssetNatureListComponent } from '../asset-natures/asset-nature.list';
import { AssetNature } from '../../../model/api/assets/asset-nature';
import { AssetNatureHttpService } from '../../../services/http/assets/asset-nature.http.service';
import { SaveAssetInvMinus } from '../../../model/api/assets/asset-minus-inventory-sap';
import { CreateAssetSAPResult } from '../../../model/api/result/create-asset-SAP-result';
import { NotificationService } from '../../../services/notification.service';
import { SaveAssetInvPlus } from '../../../model/api/assets/asset-plus-inventory-sap';
import {MatDialog} from '@angular/material/dialog';
import {ReconciliationModalComponent} from '../../inventory/reconciliation-modal/reconciliation-modal.component';
import {Asset} from '../../../model/api/assets/asset';
import alasql from 'alasql';

@Component({
    selector: 'app-asset-inventory-manage',
    templateUrl: 'asset-inventory.manage.html',
    styleUrls: ['asset-inventory.manage.scss'],
    providers: [
        AdmCenterHttpService,
        AssetHttpService,
        DepartmentHttpService,
        InventoryHttpService,
        UomHttpService,
        AdministrationHttpService,
        DivisionHttpService,
        AssetTypeHttpService,
        AssetCategoryHttpService,
        EntityFileHttpService,
        LocationHttpService,
        RegionHttpService,
        RoomDetailHttpService,
        EmployeeHttpService,
        CompanyHttpService,
        CountyHttpService,
        CityHttpService,
        DimensionHttpService,
        InvStateHttpService,
        IdentityService,
        CostCenterHttpService ]
})
export class AssetInventoryManageComponent {
    public _selectedCostCentersIni: CostCenter[] = [];
    public get selectedCostCentersIni(): CostCenter[] { return this._selectedCostCentersIni; }
    public set selectedCostCentersIni(value: CostCenter[]) {
      this._selectedCostCentersIni = value;
      this.checkForRefresh();
    }

    public _selectedDivisionsIni: Division[] = [];
    public get selectedDivisionsIni(): Division[] { return this._selectedDivisionsIni; }
    public set selectedDivisionsIni(value: Division[]) {
      this._selectedDivisionsIni = value;
      this.checkForRefresh();
    }

    public _selectedDepartmentsIni: Department[] = [];
    public get selectedDepartmentsIni(): Department[] { return this._selectedDepartmentsIni; }
    public set selectedDepartmentsIni(value: Department[]) {
      this._selectedDepartmentsIni = value;
      this.checkForRefresh();
    }

    public _selectedAdministrationsIni: Administration[] = [];
    public get selectedAdministrationsIni(): Administration[] { return this._selectedAdministrationsIni; }
    public set selectedAdministrationsIni(value: Administration[]) {
      this._selectedAdministrationsIni = value;
      this.checkForRefresh();
    }

    public _selectedAdmCentersIni: AdmCenter[] = [];
    public get selectedAdmCentersIni(): AdmCenter[] { return this._selectedAdmCentersIni; }
    public set selectedAdmCentersIni(value: AdmCenter[]) {
      this._selectedAdmCentersIni = value;
      this.checkForRefresh();
    }

    public _selectedInvStatesIni: InvState[] = [];
    public get selectedInvStatesIni(): InvState[] { return this._selectedInvStatesIni; }
    public set selectedInvStatesIni(value: InvState[]) {
      this._selectedInvStatesIni = value;
      this.checkForRefresh();
    }


    public _selectedCostCentersFin: CostCenter[] = [];
    public get selectedCostCentersFin(): CostCenter[] { return this._selectedCostCentersFin; }
    public set selectedCostCentersFin(value: CostCenter[]) {
      this._selectedCostCentersFin = value;
      this.checkForRefresh();
    }

    public _selectedDivisionsFin: Division[] = [];
    public get selectedDivisionsFin(): Division[] { return this._selectedDivisionsFin; }
    public set selectedDivisionsFin(value: Division[]) {
      this._selectedDivisionsFin = value;
      this.checkForRefresh();
    }

    public _selectedDepartmentsFin: Department[] = [];
    public get selectedDepartmentsFin(): Department[] { return this._selectedDepartmentsFin; }
    public set selectedDepartmentsFin(value: Department[]) {
      this._selectedDepartmentsFin = value;
      this.checkForRefresh();
    }

    public _selectedAdministrationsFin: Administration[] = [];
    public get selectedAdministrationsFin(): Administration[] { return this._selectedAdministrationsFin; }
    public set selectedAdministrationsFin(value: Administration[]) {
      this._selectedAdministrationsFin = value;
      this.checkForRefresh();
    }

    public _selectedAdmCentersFin: AdmCenter[] = [];
    public get selectedAdmCentersFin(): AdmCenter[] { return this._selectedAdmCentersFin; }
    public set selectedAdmCentersFin(value: AdmCenter[]) {
      this._selectedAdmCentersFin = value;
      this.checkForRefresh();
    }

    public _selectedInvStatesFin: InvState[] = [];
    public get selectedInvStatesFin(): InvState[] { return this._selectedInvStatesFin; }
    public set selectedInvStatesFin(value: InvState[]) {
      this._selectedInvStatesFin = value;
      this.checkForRefresh();
    }

    public _selectedCostCentersAll: CostCenter[] = [];
    public get selectedCostCentersAll(): CostCenter[] { return this._selectedCostCentersAll; }
    public set selectedCostCentersAll(value: CostCenter[]) {
      this._selectedCostCentersAll = value;
      this.checkForRefresh();
    }

    public _selectedDivisionsAll: Division[] = [];
    public get selectedDivisionsAll(): Division[] { return this._selectedDivisionsAll; }
    public set selectedDivisionsAll(value: Division[]) {
      this._selectedDivisionsAll = value;
      this.checkForRefresh();
    }

    public _selectedDepartmentsAll: Department[] = [];
    public get selectedDepartmentsAll(): Department[] { return this._selectedDepartmentsAll; }
    public set selectedDepartmentsAll(value: Department[]) {
      this._selectedDepartmentsAll = value;
      this.checkForRefresh();
    }

    public _selectedAdministrationsAll: Administration[] = [];
    public get selectedAdministrationsAll(): Administration[] { return this._selectedAdministrationsAll; }
    public set selectedAdministrationsAll(value: Administration[]) {
      this._selectedAdministrationsAll = value;
      this.checkForRefresh();
    }

    public _selectedAdmCentersAll: AdmCenter[] = [];
    public get selectedAdmCentersAll(): AdmCenter[] { return this._selectedAdmCentersAll; }
    public set selectedAdmCentersAll(value: AdmCenter[]) {
      this._selectedAdmCentersAll = value;
      this.checkForRefresh();
    }

    public _selectedInvStatesAll: InvState[] = [];
    public get selectedInvStatesAll(): InvState[] { return this._selectedInvStatesAll; }
    public set selectedInvStatesAll(value: InvState[]) {
      this._selectedInvStatesAll = value;
      this.checkForRefresh();
    }

    @ViewChild('assetInvFullDetailList') public assetInvFullDetailList: AssetInvFullDetailListComponent;
    @ViewChild('assetInvFullDetailListTemp') public assetInvTempDetailListTemp: AssetInvFullDetailListComponent;

    @ViewChild('departmentsModal') public departmentsModal: ModalDirective;
    @ViewChild('confirmationModal') public confirmationModal: ModalDirective;
    @ViewChild('confirmationMinusModal') public confirmationMinusModal: ModalDirective;
    @ViewChild('confirmationPlusModal') public confirmationPlusModal: ModalDirective;

    @ViewChild('inventoryList') public inventoryList: InventoryList;
    @ViewChild('inventoryListModal') public inventoryListModal: ModalDirective;

    @ViewChild('departmentList') public departmentList: DepartmentListComponent;
    @ViewChild('departmentListModal') public departmentListModal: ModalDirective;

    @ViewChild('departmentListNi') public departmentListNi: DepartmentListComponent;
    @ViewChild('departmentListNiModal') public departmentListNiModal: ModalDirective;

    @ViewChild('employeeList') public employeeList: EmployeeListComponent;
    @ViewChild('employeeListModal') public employeeListModal: ModalDirective;

    @ViewChild('employeeListNi') public employeeListNi: EmployeeListComponent;
    @ViewChild('employeeListNiModal') public employeeListNiModal: ModalDirective;

    @ViewChild('admCenterList') public admCenterList: AdmCenterListComponent;
    @ViewChild('admCenterListModal') public admCenterListModal: ModalDirective;

    @ViewChild('admCenterListNi') public admCenterListNi: AdmCenterListComponent;
    @ViewChild('admCenterListNiModal') public admCenterListNiModal: ModalDirective;

    @ViewChild('regionList') public regionList: RegionListComponent;
    @ViewChild('regionListModal') public regionListModal: ModalDirective;

    @ViewChild('regionListNi') public regionListNi: RegionListComponent;
    @ViewChild('regionListNiModal') public regionListNiModal: ModalDirective;

    @ViewChild('countyList') public countyList: CountyListComponent;
    @ViewChild('countyListModal') public countyListModal: ModalDirective;

    @ViewChild('cityList') public cityList: CityListComponent;
    @ViewChild('cityListModal') public cityListModal: ModalDirective;

    @ViewChild('dimensionList') public dimensionList: DimensionListComponent;
    @ViewChild('dimensionListModal') public dimensionListModal: ModalDirective;

    @ViewChild('dimensionListTemp') public dimensionListTemp: DimensionListComponent;
    @ViewChild('dimensionListTempModal') public dimensionListTempModal: ModalDirective;


    @ViewChild('locationList') public locationList: LocationListComponent;
    @ViewChild('locationListModal') public locationListModal: ModalDirective;

    @ViewChild('locationListNi') public locationListNi: LocationListComponent;
    @ViewChild('locationListNiModal') public locationListNiModal: ModalDirective;

    @ViewChild('roomList') public roomList: RoomListComponent;
    @ViewChild('roomListModal') public roomListModal: ModalDirective;

    @ViewChild('roomListNi') public roomListNi: RoomListComponent;
    @ViewChild('roomListNiModal') public roomListNiModal: ModalDirective;

    @ViewChild('costCenterList') public costCenterList: CostCenterListComponent;
    @ViewChild('costCenterListModal') public costCenterListModal: ModalDirective;

    @ViewChild('costCenterListNi') public costCenterListNi: CostCenterListComponent;
    @ViewChild('costCenterListNiModal') public costCenterListNiModal: ModalDirective;

    @ViewChild('imageListModal') public imageListModal: ModalDirective;

    @ViewChild('administrationList') public administrationList: AdministrationListComponent;
    @ViewChild('administrationListModal') public administrationListModal: ModalDirective;

    @ViewChild('divisionList') public divisionList: DivisionListComponent;
    @ViewChild('divisionListModal') public divisionListModal: ModalDirective;

    @ViewChild('assetTypeList') public assetTypeList: AssetTypeListComponent;
    @ViewChild('assetTypeListModal') public assetTypeListModal: ModalDirective;

    @ViewChild('assetCategoryList') public assetCategoryList: AssetCategoryListComponent;
    @ViewChild('assetCategoryListModal') public assetCategoryListModal: ModalDirective;

    @ViewChild('companyList') public companyList: CompanyListComponent;
    @ViewChild('companyListModal') public companyListModal: ModalDirective;

    @ViewChild('companyListNi') public companyListNi: CompanyListComponent;
    @ViewChild('companyListNiModal') public companyListNiModal: ModalDirective;

    
    

    @ViewChild('assetNatureList') public assetNatureList: AssetNatureListComponent;
    @ViewChild('assetNatureListModal') public assetNatureListModal: ModalDirective;


    @ViewChild('tempCompanyList') public tempCompanyList: CompanyListComponent;
    @ViewChild('tempCompanyListModal') public tempCompanyListModal: ModalDirective;

    @ViewChild('tempAssetNatureList') public tempAssetNatureList: AssetNatureListComponent;
    @ViewChild('tempAssetNatureListModal') public tempAssetNatureListModal: ModalDirective;

    @ViewChild('tempDimensionList') public tempDimensionList: DimensionListComponent;
    @ViewChild('tempDimensionListModal') public tempDimensionListModal: ModalDirective;

    @ViewChild('uomList') public uomList: UomListComponent;
    @ViewChild('uomListModal') public uomListModal: ModalDirective;

    @ViewChild('uomListTemp') public uomListTemp: UomListComponent;
    @ViewChild('uomListTempModal') public uomListTempModal: ModalDirective;

    @ViewChild('invStateList') public invStateList: InvStateList;
    @ViewChild('invStateListModal') public invStateListModal: ModalDirective;

    @ViewChild('invStateListNi') public invStateListNi: InvStateList;
    @ViewChild('invStateListNiModal') public invStateListNiModal: ModalDirective;

    @ViewChild('fileInput') fileInput: ElementRef;
    @ViewChild('uploadModal') public uploadModal: ModalDirective;

    @ViewChild('userList') public userList: UserListComponent;
    @ViewChild('userListModal') public userListModal: ModalDirective;

    @ViewChild('userTempList') public userTempList: UserListComponent;
    @ViewChild('userTempListModal') public userTempListModal: ModalDirective;

    @Output() public uploadFinished = new EventEmitter<void>();
    public operationType: number = OperationType.NotSet;

    public imageCount: number = 0;
    public imageIndex: number = 0;
    public imageLoading: boolean = false;
    public assetImages: Array<AssetImage> = new Array<AssetImage>();
    public assetFiles: Array<EntityFile> = new Array<EntityFile>();
    public existingAssetImages: Array<AssetImage> = new Array<AssetImage>();

    public selectedEmployee: Employee = null;
    public selectedLocation: Location = null;
    public selectedRoom: Room = null;

    public confirmationMessage: string = '';
    public confirmationMinusMessage: string = '';
    public confirmationPlusMessage: string = '';
    public filter: string = '';
    public smallPageSize: number = 10;
    public largePageSize: number = 10;

    public notIdentifiedFilter: string = '';
    public conditionType: string = 'SI';
    public wordCount: number = 0;
    public wordMinLength: number = 3;
    public letterCount: number = 0;
    public reportTypeCode: string = 'TOATE';
    public assetStateCode: string = 'TOATE';
    public reportTypeName: string = 'Toate';
    public assetStateName: string = 'Stari gestiune';
    public custody: string = '-';
    public isPrinted: string = '-';
    public isDuplicate: string = '-';
    public isPrintedTemp: string = '-';
    public isDuplicateTemp: string = '-';
    isCollapsed: boolean = true;
    isCollapsedTemp: boolean = true;
    public showFilters: boolean = true;
    public showSearchButtoIconClass: string = 'fa fa-search-minus';
    hideExportBtn = false;

    itemText = '';
    refDocNo = '';

    public showInitialFiltersContent: boolean = false;
    public showFinalFiltersContent: boolean = false;
    public showAllFiltersContent: boolean = false;

    public pageSizeUpdatedEvent: EventEmitter<number> = new EventEmitter<number>();
    // public requestInvCompOpRefreshEvent: EventEmitter<Array<Param>> = new EventEmitter<Array<Param>>();
    // public requestInvCompDetailRefreshEvent: EventEmitter<Array<Param>> = new EventEmitter<Array<Param>>();
    public selectedInventory: Inventory = null;
    public selectedDepartments: Array<Department> = new Array<Department>();
    public selectedEmployeesFin: Array<Employee> = new Array<Employee>();
    // public selectedCostCentersFin: Array<CostCenter> = new Array<CostCenter>();
    // public selectedDivisionsFin: Array<Division> = new Array<Division>();
    // public selectedDepartmentsFin: Array<Department> = new Array<Department>();
    // public selectedAdmCentersFin: Array<AdmCenter> = new Array<AdmCenter>();
    public selectedRegionsFin: Array<Region> = new Array<Region>();
    public selectedLocationsFin: Array<Location> = new Array<Location>();
    public selectedCitiesFin: Array<City> = new Array<City>();
    public selectedCountiesFin: Array<County> = new Array<County>();
    public selectedRoomsFin: Array<Room> = new Array<Room>();
    // public selectedAdministrationsFin: Array<Administration> = new Array<Administration>();
    public selectedEmployeesAll: Array<Employee> = new Array<Employee>();
    public selectedRegionsAll: Array<Region> = new Array<Region>();
    // public selectedAdmCentersAll: Array<AdmCenter> = new Array<AdmCenter>();
    public selectedLocationsAll: Array<Location> = new Array<Location>();
    public selectedCitiesAll: Array<City> = new Array<City>();
    public selectedCountiesAll: Array<County> = new Array<County>();
    public selectedRoomsAll: Array<Room> = new Array<Room>();
    // public selectedDivisionsAll: Array<Division> = new Array<Division>();
    // public selectedCostCentersAll: Array<CostCenter> = new Array<CostCenter>();
    // public selectedDepartmentsAll: Array<Department> = new Array<Department>();
    // public selectedAdministrationsAll: Array<Administration> = new Array<Administration>();
    public selectedEmployeesIni: Array<Employee> = new Array<Employee>();
    // public selectedCostCentersIni: Array<CostCenter> = new Array<CostCenter>();
    // public selectedDepartmentsIni: Array<Department> = new Array<Department>();
    // public selectedAdmCentersIni: Array<AdmCenter> = new Array<AdmCenter>();
    public selectedRegionsIni: Array<Region> = new Array<Region>();
    public selectedCitiesIni: Array<City> = new Array<City>();
    public selectedCountiesIni: Array<County> = new Array<County>();
    public selectedLocationsIni: Array<Location> = new Array<Location>();
    public selectedRoomsIni: Array<Room> = new Array<Room>();
    // public selectedDivisionsIni: Array<Division> = new Array<Division>();
    // public selectedAdministrationsIni: Array<Administration> = new Array<Administration>();
    public selectedAssetTypes: Array<AssetType> = new Array<AssetType>();
    public selectedAssetCategories: Array<AssetCategory> = new Array<AssetCategory>();
    public selectedDimensions: Array<Dimension> = new Array<Dimension>();
    public selectedUoms: Array<Uom> = new Array<Uom>();
    public selectedDimensionTemps: Array<Dimension> = new Array<Dimension>();
    public selectedUomTemps: Array<Uom> = new Array<Uom>();
    public selectedDepartmentNis: Array<Department> = new Array<Department>();
    public selectedCompanyNis: Array<Company> = new Array<Company>();
    public selectedEmployeesNi: Array<Employee> = new Array<Employee>();
    public selectedAdmCentersNi: Array<AdmCenter> = new Array<AdmCenter>();
    public selectedRegionsNi: Array<Region> = new Array<Region>();
    public selectedLocationsNi: Array<Location> = new Array<Location>();
    public selectedCitiesNi: Array<City> = new Array<City>();
    public selectedCountiesNi: Array<County> = new Array<County>();
    public selectedRoomsNi: Array<Room> = new Array<Room>();
    public selectedCostCentersNi: Array<CostCenter> = new Array<CostCenter>();
    public selectedDivisionsNi: Array<Division> = new Array<Division>();
    public selectedDepartmentsNi: Array<Department> = new Array<Department>();
    public selectedAssets: Array<AssetInvFullDetail> = new Array<AssetInvFullDetail>();
    public selectedCompanies: Array<Company> = new Array<Company>();
    public selectedUsers: Array<ApplicationUser> = new Array<ApplicationUser>();
    public selectedUserTemps: Array<ApplicationUser> = new Array<ApplicationUser>();

    
    public selectedAssetNatures: Array<AssetNature> = new Array<AssetNature>();

    public selectedTempCompanies: Array<Company> = new Array<Company>();
    
    public selectedTempAssetNatures: Array<AssetNature> = new Array<AssetNature>();
    public selectedTempDimensions: Array<Dimension> = new Array<Dimension>();

    // public selectedInvStatesIni: Array<InvState> = new Array<InvState>();
    // public selectedInvStatesAll: Array<InvState> = new Array<InvState>();
    // public selectedInvStatesFin: Array<InvState> = new Array<InvState>();
    public selectedInvStatesNi: Array<InvState> = new Array<InvState>();
    // public selectedDivisionsNi: Array<Division> = new Array<Division>();
    public selectedAsset: AssetInvFullDetail = null;
    public selectedAssetTemp: AssetInvTempDetail = null;
    public selectedAssetNi: AssetNi = null;
    public assetInvNos: Array<string> = new Array<string>();
    public isReconcile: string = '-';
    public filtersType: string = '';
    public get isAdmin(): boolean { return AppData.UserIsAdmin; }

    public get notScannedViewMode(): boolean { return (this.reportTypeCode === 'NOT_SCANNED'); }
    // public get notScannedViewMode(): boolean { return false; }
    public get allowReconciliation(): boolean { return ((this.reportTypeCode === 'NOT_SCANNED') && (this.selectedAsset != null) && (this.selectedAssetTemp != null)); }
    // public get allowReconciliation(): boolean { return false; }
    public get showFinalFilters(): boolean { return (this.reportTypeCode !== 'NOT_SCANNED'); }

    // public showDepartmentDetails: boolean = AppConfig.SHOW_DEPARTMENT_DETAILS;
    public get useAdmCenter(): boolean { return AppConfig.USE_ADM_CENTER; }
    public get useCostCenter(): boolean { return AppConfig.USE_COST_CENTER; }
    public get useDepartment(): boolean { return AppConfig.USE_DEPARTMENT; }
    public get useRegion(): boolean { return AppConfig.USE_REGION; }
    public get useEmployee(): boolean { return AppConfig.USE_EMPLOYEE; }
    public get useRoom(): boolean { return AppConfig.USE_ROOM; }
    public get useAdministration(): boolean { return AppConfig.USE_ADMINISTRATION; }
    public get useAssetType(): boolean { return AppConfig.USE_ASSETTYPE; }
    public get useAssetCategory(): boolean { return AppConfig.USE_ASSETCATEGORY; }
    public useAssetStates: boolean = AppConfig.USE_ASSET_STATE;
    public fileEvent: any = null;
    public isSaved: boolean = true;

    public _inventories: Inventory = null;
    public get inventories(): Inventory { return this._inventories; }
    public set inventories(value: Inventory) {
      this._inventories = value;
      this.selectedInventory = value;
      this.setSelectedInventory(value);

      this.checkForRefresh();
    }

    public _users: any = null;
    public get users(): any { return this._users; }
    public set users(value: any) {
      this._users = value;
      this.selectedUsers = value;
      this.setSelectedUsers(value);

      this.checkForRefresh();
    }

  public _costCentersIni: CostCenter[] = null;
  public get costCentersIni(): CostCenter[] { return this._costCentersIni; }
  public set costCentersIni(value: CostCenter[]) {
    this._costCentersIni = value;
    this.selectedCostCentersIni = value;
    // this.selectCostCenters('INI');
    this.setSelectedCostCenters( 'INI', value);

    this.checkForRefresh();
  }

  public _divisionsIni: Division[] = null;
  public get divisionsIni(): Division[] { return this._divisionsIni; }
  public set divisionsIni(value: Division[]) {
    this._divisionsIni = value;
    this.selectedDivisionsIni = value;
    // this.setSelectedDivisions( 'INI', value);

    this.checkForRefresh();
  }

    constructor(
        public router: Router,
        public assetHttpService: AssetHttpService,
        public administrationDetailHttpService: AdministrationHttpService,
        public assetTypeHttpService: AssetTypeHttpService,
        public assetCategoryHttpService: AssetCategoryHttpService,
        public entityFileHttpService: EntityFileHttpService,
        public uomHttpService: UomHttpService,
        public admCenterHttpService: AdmCenterHttpService,
        public departmentHttpService: DepartmentHttpService,
        public inventoryHttpService: InventoryHttpService,
        public divisionHttpService: DivisionHttpService,
        
        public assetNatureHttpService: AssetNatureHttpService,
        public locationHttpService: LocationHttpService,
        public regionHttpService: RegionHttpService,
        public roomDetailHttpService: RoomDetailHttpService,
        public employeeHttpService: EmployeeHttpService,
        public costCenterHttpService: CostCenterHttpService,
        public companyHttpService: CompanyHttpService,
        public countyHttpService: CountyHttpService,
        public cityHttpService: CityHttpService,
        public invStateHttpService: InvStateHttpService,
        public dimensionHttpService: DimensionHttpService,
        public identityHttpService: IdentityService,
        public notificationService: NotificationService,
        public dialog: MatDialog,
        public vcr: ViewContainerRef) {
            // // this.toastr.setRootViewContainerRef(vcr);
             // console.log('constructor');

        this.router.events.subscribe((evt) => {
            if (evt instanceof NavigationEnd) {
                if (evt.urlAfterRedirects === '/inventory/status') {
                    setTimeout(() => {
                        this.refreshAssets();
                      }, 100);
                }
            }
        });
    }

  public onReconciliation() {
    const dialogRef = this.dialog.open(ReconciliationModalComponent, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { asset: this.assetInvFullDetailList.selectedItems[0], inventoy: 10, assetId: this.assetInvFullDetailList.selectedItems[0].id, inventoryId: 10 ? 10 : 10 }
    });

    dialogRef.afterClosed().subscribe((item: Asset) => {
      //
    });
  }

  public doSimpleSearch(filter: string) {
    this.filter = filter;
    this.checkForRefresh();
  }

    public onInitialSelectionChanged(arg: boolean) {
      this.showInitialFiltersContent = arg;
    }

    public onFinalSelectionChanged(arg: any) {
      this.showFinalFiltersContent = arg;
    }

    public onAllSelectionChanged(arg: any) {
      this.showAllFiltersContent = arg;
    }

  // tslint:disable-next-line:use-lifecycle-interface
    ngAfterViewInit() {
        // this.refreshAssets();
        // console.log('ngAfterViewInit');
    }

    ngOnInit() {
        // console.log('ngOnInit');
    }

    // public onAllMode() {
    //     this.reportType = 'ALL';
    //     this.pageSizeUpdatedEvent.emit(this.largePageSize);
    //     this.refreshAssets();
    // }

    public deleteTempOperation() {
        this.operationType = OperationType.CancelTempScanned;
        this.confirmationMessage = 'Anulati scanarea selectata?';
        this.confirmationModal.show();
    }

    public deletePhoto(id: number) {
        if (confirm('Esti sigur ca vrei sa stergi acesta poza?')) {
            this.entityFileHttpService.deletePhoto(id).subscribe((res) => {});
        }

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


    public onIsPrintedTempUpdate(isPrintedTemp: string) {
        this.isPrintedTemp = isPrintedTemp;
        this.refreshNotIdentified();
    }


    public onIsDuplicateTempUpdate(isDuplicateTemp: string) {
        this.isDuplicateTemp = isDuplicateTemp;
        this.refreshNotIdentified();
    }


    public recoverAssetTemp() {

        this.operationType = OperationType.RecoverTemp;
        this.confirmationMessage = 'Anulati reconcilierea selectata?';
        this.confirmationModal.show();

    }

    public onReconcileUpdate(reco: string) {
        this.isReconcile = reco;
        this.checkForRefresh();
    }

    public showAssetDetail($event, selectedItem: any) {
        const inventoryId: number = this.selectedInventory != null ? this.selectedInventory.id : 0;
            // this.assetHttpMemoryService.setDataSource(AppData.AssetInvList);
            // this.assetHttpMemoryService.get(null, null, '', '', new Array<Param>()).subscribe((assets) => {
            //     this.selectedAsset.uom = assets.uom;
            // });

            selectedItem  != null ?  this.router.navigate(['/asset/', selectedItem.id,
            {
                'uomId' : selectedItem.uomFinal != null ? selectedItem.uomFinal.id : 0,
                'dimensionId': selectedItem.dimensionFinal != null ? selectedItem.dimensionFinal.id : 0,
                'info2019': selectedItem.info2019,
                'serialNumberFinal': selectedItem.serialNumberFinal
            }])
            : alert('Va rugam selectati cel putin un numar de inventar!'); return;
     }

    public uploadAssetInv() {
        this.uploadModal.show();
    }

    public loadFile(ev) {
        this.fileEvent = ev;
    }

    public upload() {
        // let fi = this.fileInput.nativeElement;
        // if (fi.files && fi.files[0]) {
        //     let fileToUpload = fi.files[0];
        //     this.assetHttpService
        //         .importInventory(fileToUpload)
        //         .subscribe(res => {
        //             this.uploadFinished.emit(null);
        //         });
        // }
    }

    public recoverTemp() {
        const inventoryId: number = this.selectedInventory.id;
        this.assetHttpService.recoverAssetTemp(this.assetInvFullDetailList.selectedItem.id, inventoryId).subscribe((res) => {

            if (res.statusCode === 200) {
                // this.toastr.success('Reconciliere anulata cu success!');
            } else {
                // this.toastr.error('Eroare anulare reconciliere!');
            }
        }, (error) => {
            // this.toastr.error('Eroare server!');
        });
        this.checkForRefresh();
    }

    public onConfirmationApproved() {

        switch (this.operationType) {
            case OperationType.Reconciliation:
                this.reconcile();
                break;
            case OperationType.Transfer:
                this.transfer();
                break;
            case OperationType.CancelScanned:
                this.assetHttpService.deleteAssetOp(this.selectedAsset.id,
                this.inventoryList.selectedItem.id).subscribe((res) => { });
                this.checkForRefresh();
                break;
            case OperationType.RecoverTemp:
                this.recoverTemp();
                this.refreshNotIdentified();
                break;
            case OperationType.CancelTempScanned:
                this.assetHttpService.deleteAssetOp(this.assetInvTempDetailListTemp.selectedItem.id,
                this.inventoryList.selectedItem.id).subscribe((res) => { });
                this.refreshNotIdentified();
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

    public onAssetInvFullDetailSelectionChanged(assets: Array<AssetInvFullDetail>) {
        this.selectedAsset = ((assets != null) && (assets.length === 1)) ? assets[0] : null;

        this.notIdentifiedFilter = this.selectedAsset != null ? this.selectedAsset.name : '';
        // this.filter = this.selectedAsset != null ? this.selectedAsset.name : '';
        this.refreshNotIdentified();
    }

    public onAssetNiListSelectionChanged(assetsNi: Array<AssetNi>) {
        this.selectedAssetNi = ((assetsNi != null) && (assetsNi.length === 1)) ? assetsNi[0] : null;
    }

    public clearSelection() {
        this.selectedAssets = new Array<AssetInvFullDetail>();
        this.assetInvFullDetailList.selectedItems = this.selectedAssets;
    }

    // public onNotScannedMode() {
    //     this.reportType = 'NOT_SCANNED';
    //     this.pageSizeUpdatedEvent.emit(this.smallPageSize);
    //     this.refreshAssets();
    // }

    // public onScannedMode() {
    //     this.reportType = 'SCANNED';
    //     this.pageSizeUpdatedEvent.emit(this.largePageSize);
    //     this.refreshAssets();
    // }

    public onReconcile() {
        this.assetInvNos = new Array<string>();
        this.assetInvNos.push(this.selectedAsset.invNo + '-->'  + this.selectedAssetTemp.invNo);
        this.operationType = OperationType.Reconciliation;
        this.confirmationMessage = 'Reconciliati inregistrarile selectate?';
        this.confirmationModal.show();
    }

    public onAssetNiTransform() {
        this.operationType = OperationType.Transfer;
        this.confirmationMessage = 'Transferati temporarele selectate?';
        this.confirmationModal.show();
    }

    public onReportTypeUpdate(reportTypeCode: string) {
        this.reportTypeCode = reportTypeCode;

        switch (this.reportTypeCode) {
            case 'ALL':
                this.reportTypeName = 'Toate';
                break;
            case 'SCANNED':
                this.reportTypeName = 'Scanate';
                break;
            case 'NOT_SCANNED':
                this.reportTypeName = 'Nescanate';
                break;
            case 'TRANSFER_ROOM':
                this.reportTypeName = 'Transferuri intre agentii';
                break;
            case 'TRANSFER_ROOM_SAME_LOCATION':
                this.reportTypeName = 'Transferuri intre agentii din acelasi oras';
                break;
            case 'TRANSFER_ROOM_DIFF_LOCATION':
                this.reportTypeName = ' Transferuri intre agentii in orase diferite';
                break;
            case 'TRANSFER_ROOM_SAME_REGION':
                this.reportTypeName = 'Transferuri intre agentii din acelasi judet ';
                break;
            case 'TRANSFER_ROOM_DIFF_REGION':
                this.reportTypeName = 'Transferuri intre agentii din judete diferite';
                break;
            case 'TRANSFER_EMPLOYEE':
                this.reportTypeName = 'Transferuri intre Gestionari';
                break;
            case 'TRANSFER_COSTCENTER':
                this.reportTypeName = 'Transferuri intre Centre de cost';
                break;
            case 'TRANSFER_SAME_ADMCENTER':
                this.reportTypeName = 'Transferuri in aceasi Regiune';
                break;
            case 'TRANSFER_DIFF_ADMCENTER':
                this.reportTypeName = 'Transferuri intre regiuni';
                break;
            default :
                break;
        }

        this.checkForRefresh();
    }

    public onAssetStateUpdate(assetStateCode: string) {
        this.assetStateCode = assetStateCode;

        switch (this.assetStateCode) {

        case 'ALL':
                 this.assetStateName = 'Toate starile';
            break;
        case 'Standard':
                this.assetStateName = 'Standard';
                break;
        case 'Service/reparatii':
                this.assetStateName = 'Service/reparatii';
                break;
        case 'Casare':
                this.assetStateName = 'Casare';
                break;
        case 'Achizitie':
                this.assetStateName = 'Achizitie';
                break;
        case 'Transfer':
                this.assetStateName = 'Transfer';
                break;
        case 'Non Transfer':
                this.assetStateName = 'Non Transfer';
                break;
        case 'Altele /forta majora':
                this.assetStateName = 'Altele /forta majora';
                break;
            default:
            break;
        }

        this.checkForRefresh();
    }



    public reconcile() {
        const assetTempRecoSave: AssetTempRecoSave = new AssetTempRecoSave();
        assetTempRecoSave.inventoryId = this.selectedInventory.id;
        assetTempRecoSave.assetTempId = this.selectedAssetTemp.id;
        assetTempRecoSave.assetId = this.selectedAsset.id;
        this.assetHttpService.saveReco(assetTempRecoSave).subscribe((res) => {

            if (res.statusCode === 200) {
                // this.toastr.success('Reconciliere finalizata cu success!');
            } else {
                // this.toastr.error('Eroare reconciliere!');
            }

            this.selectedAssetTemp = null;
            this.selectedAsset = null;
            this.assetInvNos = null;

            this.checkForRefresh();
            this.refreshNotIdentified();
        }, (error) => {
            // this.toastr.error('Eroare server!');
        });
    }
    public transfer() {
        const assetNiTransferSave: AssetNiTransferSave = new AssetNiTransferSave();
        assetNiTransferSave.inventoryId = this.selectedInventory.id;
        assetNiTransferSave.assetNiId = this.selectedAssetNi.id;
        // this.assetNiHttpService.transfer(assetNiTransferSave).subscribe(() => {
        //     this.selectedAssetNi = null;
        //     this.selectedAsset = null;

        //     this.checkForRefresh();
        //     this.refreshNotIdentified();
        // });
    }

    public updateConditionType(conditionType: string) {
        this.conditionType = conditionType;
        this.refreshNotIdentified();
    }

    public updateLetterCount(letterCount: number) {
        this.letterCount = letterCount;
        this.refreshNotIdentified();
    }

    public updateWordCount(wordCount: number) {
        this.wordCount = wordCount;
        this.refreshNotIdentified();
    }

    public updateWordMinLength(wordMinLength: number) {
        this.wordMinLength = wordMinLength;
        this.refreshNotIdentified();
    }

   /* begin inventory */
    public selectInventory() {
        this.inventoryListModal.show();
        this.inventoryList.selectedItems = new Array<Inventory>();
        this.inventoryList.refresh(null);
    }

    public setSelectedInventory(item: Inventory) {
        // this.selectedInventory = this.inventoryList.selectedItems != null && this.inventoryList.selectedItems.length > 0 ? this.inventoryList.selectedItems[0] : null;
        this.selectedInventory = item;
        // this.inventoryListModal.hide();
        this.checkForRefresh();
    }
    /* end inventory */

    /* begin costcenter */
    public selectCostCenters(filtersType: string) {
        this.filtersType = filtersType;
        const params = new Array<Param>();

        switch (this.filtersType) {
            case 'INI':
                this.costCenterListModal.show();
                this.costCenterList.selectedItems = this.selectedCostCentersIni;
                this.costCenterList.refresh(params);
                break;
            case 'FIN':
                this.costCenterListModal.show();
                this.costCenterList.selectedItems = this.selectedCostCentersFin;
                this.costCenterList.refresh(params);
                break;
            case 'ALL':
                this.costCenterListModal.show();
                this.costCenterList.selectedItems = this.selectedCostCentersAll;
                this.costCenterList.refresh(params);
                break;
            case 'NI':
                this.costCenterListNiModal.show();
                this.costCenterListNi.selectedItems = this.selectedCostCentersNi;
                this.costCenterListNi.refresh(params);
                break;
            default:
                break;
        }

    }

    public removeFromCostCenterSelection(filtersType: string, costCenter: CostCenter) {

        let selectedCostCenters: Array<CostCenter> = null;
        // let list: Array<Room> = filtersType === 'INI' ? this.selectedRoomsIni : filtersType === 'NI' ?
        // this.selectedRoomsNi :  filtersType === 'ALL' ? this.selectedRoomsAll : this.selectedRoomsFin;

        switch (filtersType) {
            case 'INI':
            selectedCostCenters = this.selectedCostCentersIni;
                break;
            case 'FIN':
            selectedCostCenters = this.selectedCostCentersFin;
                break;
            case 'ALL':
            selectedCostCenters = this.selectedCostCentersAll;
                    break;
            case 'NI':
            selectedCostCenters = this.selectedCostCentersNi;
                break;
            default:
                break;
        }
        const index: number = selectedCostCenters.indexOf(costCenter);
        selectedCostCenters.splice(index, 1);
        this.checkForRefresh(filtersType);
    }

    public clearCostCenterSelection(filtersType: string) {

        switch (filtersType) {
            case 'INI':
                this.selectedCostCentersIni = new Array<CostCenter>();
                break;
            case 'FIN':
                this.selectedCostCentersFin = new Array<CostCenter>();
                break;
            case 'ALL':
            this.selectedCostCentersAll = new Array<CostCenter>();
            break;
            case 'NI':
                this.selectedCostCentersNi = new Array<CostCenter>();
                break;
            default:
                break;
        }

        this.checkForRefresh(filtersType);
    }

    public setSelectedCostCenters(filterType, value) {

            switch (this.filtersType) {
                case 'INI':
                    this.selectedCostCentersIni = value;
                    // this.costCenterListModal.hide();
                    break;
                case 'FIN':
                    this.selectedCostCentersFin = value;
                    // this.costCenterListModal.hide();
                    break;
                case 'ALL':
                this.selectedCostCentersAll = value;
                // this.costCenterListModal.hide();
                    break;
                case 'NI':
                    this.selectedCostCentersNi = value;
                    // this.costCenterListNiModal.hide();
                    break;
                default:
                    break;
            }

        this.checkForRefresh(this.filtersType);
    }
    /* end costcenter */


    /* begin department */

    public selectDepartments(filtersType: string) {
      this.filtersType = filtersType;
      const params = new Array<Param>();

      switch (this.filtersType) {
          case 'INI':
              this.departmentListModal.show();
              this.departmentList.selectedItems = this.selectedDepartmentsIni;
              this.departmentList.refresh(params);
              break;
          case 'FIN':
              this.departmentListModal.show();
              this.departmentList.selectedItems = this.selectedDepartmentsFin;
              this.departmentList.refresh(params);
              break;
          case 'ALL':
              this.departmentListModal.show();
              this.departmentList.selectedItems = this.selectedDepartmentsAll;
              this.departmentList.refresh(params);
              break;
          case 'NI':
              this.departmentListNiModal.show();
              this.departmentListNi.selectedItems = this.selectedDepartmentsNi;
              this.departmentListNi.refresh(params);
              break;
          default:
              break;
      }

  }

  public removeFromDepartmentSelection(filtersType: string, department: Department) {

      let selectedDepartments: Array<Department> = null;
      // let list: Array<Room> = filtersType === 'INI' ? this.selectedRoomsIni : filtersType === 'NI' ?
      // this.selectedRoomsNi :  filtersType === 'ALL' ? this.selectedRoomsAll : this.selectedRoomsFin;

      switch (filtersType) {
          case 'INI':
          selectedDepartments = this.selectedDepartmentsIni;
              break;
          case 'FIN':
          selectedDepartments = this.selectedDepartmentsFin;
              break;
          case 'ALL':
          selectedDepartments = this.selectedDepartmentsAll;
                  break;
          case 'NI':
          selectedDepartments = this.selectedDepartmentsNi;
              break;
          default:
              break;
      }
      const index: number = selectedDepartments.indexOf(department);
      selectedDepartments.splice(index, 1);
      this.checkForRefresh(filtersType);
  }

  public clearDepartmentSelection(filtersType: string) {

      switch (filtersType) {
          case 'INI':
              this.selectedDepartmentsIni = new Array<Department>();
              break;
          case 'FIN':
              this.selectedDepartmentsFin = new Array<Department>();
              break;
          case 'ALL':
          this.selectedDepartmentsAll = new Array<Department>();
          break;
          case 'NI':
              this.selectedDepartmentsNi = new Array<Department>();
              break;
          default:
              break;
      }

      this.checkForRefresh(filtersType);
  }

  public setSelectedDepartments() {

          switch (this.filtersType) {
              case 'INI':
                  this.selectedDepartmentsIni = this.departmentList.selectedItems;
                  this.departmentListModal.hide();
                  break;
              case 'FIN':
                  this.selectedDepartmentsFin = this.departmentList.selectedItems;
                  this.departmentListModal.hide();
                  break;
              case 'ALL':
              this.selectedDepartmentsAll = this.departmentList.selectedItems;
              this.departmentListModal.hide();
                  break;
              case 'NI':
                  this.selectedDepartmentsNi = this.departmentListNi.selectedItems;
                  this.departmentListNiModal.hide();
                  break;
              default:
                  break;
          }

      this.checkForRefresh(this.filtersType);
  }
  /* end department */

//     /*begin department*/
//     public selectDepartments() {
//         this.departmentListModal.show();
//         this.departmentList.selectedItems = this.selectedDepartments;
//         this.departmentList.refresh(null);
//     }

//     public removeFromDepartmentSelection(department: Department) {
//         let index: number = this.selectedDepartments.indexOf(department);
//         this.selectedDepartments.splice(index, 1);
//         this.checkForRefresh();
//     }

//     public clearDepartmentSelection() {
//         this.selectedDepartments = new Array<Department>();
//         this.checkForRefresh();
//     }

//     public setSelectedDepartments() {
//         this.selectedDepartments = this.departmentList.selectedItems;
//         this.departmentListModal.hide();
//         this.checkForRefresh();
//     }
//     /*end department*/

      /* begin employee */
      public selectEmployees(filtersType: string) {
        this.filtersType = filtersType;
        let selectedEmployees: Array<Employee> = null;

        switch (this.filtersType) {
            case 'INI':
                selectedEmployees = this.selectedEmployeesIni;
                this.employeeListModal.show();
                this.employeeList.selectedItems = selectedEmployees;
                this.employeeList.refresh(null);
                break;
            case 'FIN':
                selectedEmployees = this.selectedEmployeesFin;
                this.employeeListModal.show();
                this.employeeList.selectedItems = selectedEmployees;
                this.employeeList.refresh(null);
                break;
            case 'ALL':
                selectedEmployees = this.selectedEmployeesAll;
                this.employeeListModal.show();
                this.employeeList.selectedItems = selectedEmployees;
                this.employeeList.refresh(null);
                break;
            case 'NI':
                selectedEmployees = this.selectedEmployeesNi;
                this.employeeListNiModal.show();
                this.employeeListNi.selectedItems = selectedEmployees;
                this.employeeListNi.refresh(null);
                break;
            default:
                break;
        }
    }

    public removeFromEmployeeSelection(filtersType: string, employee: Employee) {
        let selectedEmployees: Array<Employee> = null;

        switch (filtersType) {
            case 'INI':
                selectedEmployees = this.selectedEmployeesIni;
                break;
            case 'FIN':
                selectedEmployees = this.selectedEmployeesFin;
                break;
            case 'ALL':
                selectedEmployees = this.selectedEmployeesAll;
                break;
            case 'NI':
                selectedEmployees = this.selectedEmployeesNi;
                break;
            default:
                 break;
        }
        const index: number = selectedEmployees.indexOf(employee);
        selectedEmployees.splice(index, 1);
        this.checkForRefresh(filtersType);
    }

    public clearEmployeeSelection(filtersType: string) {
        switch (filtersType) {
            case 'INI':
                this.selectedEmployeesIni = new Array<Employee>();
                break;
            case 'FIN':
                this.selectedEmployeesFin = new Array<Employee>();
                break;
            case 'ALL':
                this.selectedEmployeesAll = new Array<Employee>();
                break;
            case 'NI':
                this.selectedEmployeesNi = new Array<Employee>();
                break;
            default:
                break;
        }

        this.checkForRefresh(filtersType);
    }

    public setSelectedEmployees(filtersType: string) {
        switch (this.filtersType) {
            case 'INI':
                this.selectedEmployeesIni = this.employeeList.selectedItems;
                this.employeeListModal.hide();
                break;
            case 'FIN':
                this.selectedEmployeesFin = this.employeeList.selectedItems;
                this.employeeListModal.hide();
                break;
            case 'ALL':
                this.selectedEmployeesAll = this.employeeList.selectedItems;
                this.employeeListModal.hide();
                break;
            case 'NI':
                this.selectedEmployeesNi = this.employeeListNi.selectedItems;
                this.employeeListNiModal.hide();
                break;
            default:
                break;
        }

        this.checkForRefresh(this.filtersType);
    }

    /*end employee*/

  /* begin admcenter */
  public selectAdmCenters(filtersType: string) {
    this.filtersType = filtersType;

    let selectedAdmCenters: Array<AdmCenter> = null;

    switch (this.filtersType) {
        case 'INI':
            selectedAdmCenters = this.selectedAdmCentersIni;
            this.admCenterListModal.show();
            this.admCenterList.selectedItems = selectedAdmCenters;
            this.admCenterList.refresh(null);
            break;
        case 'FIN':
            selectedAdmCenters = this.selectedAdmCentersFin;
            this.admCenterListModal.show();
            this.admCenterList.selectedItems = selectedAdmCenters;
            this.admCenterList.refresh(null);
            break;
        case 'ALL':
            selectedAdmCenters = this.selectedAdmCentersAll;
            this.admCenterListModal.show();
            this.admCenterList.selectedItems = selectedAdmCenters;
            this.admCenterList.refresh(null);
            break;
        case 'NI':
            selectedAdmCenters = this.selectedAdmCentersNi;
            this.admCenterListNiModal.show();
            this.admCenterListNi.selectedItems = selectedAdmCenters;
            this.admCenterListNi.refresh(null);
            break;
        default:
            break;
    }
}

public removeFromAdmCenterSelection(filtersType: string, admCenter: AdmCenter) {
    let selectedAdmCenters: Array<AdmCenter> = null;

    switch (filtersType) {
        case 'INI':
            selectedAdmCenters = this.selectedAdmCentersIni;
            break;
        case 'FIN':
            selectedAdmCenters = this.selectedAdmCentersFin;
            break;
        case 'ALL':
            selectedAdmCenters = this.selectedAdmCentersAll;
            break;
        case 'NI':
            selectedAdmCenters = this.selectedAdmCentersNi;
            break;
        default:
            break;
    }

    const index: number = selectedAdmCenters.indexOf(admCenter);
    selectedAdmCenters.splice(index, 1);
    this.checkForRefresh(filtersType);
}

public clearAdmCenterSelection(filtersType: string) {
    switch (filtersType) {
        case 'INI':
            this.selectedAdmCentersIni = new Array<AdmCenter>();
            break;
        case 'FIN':
            this.selectedAdmCentersFin = new Array<AdmCenter>();
            break;
        case 'ALL':
            this.selectedAdmCentersAll = new Array<AdmCenter>();
        break;
        case 'NI':
            this.selectedAdmCentersNi = new Array<AdmCenter>();
            break;
        default:
            break;
    }

    this.checkForRefresh(filtersType);
}

public setSelectedAdmCenters() {
    switch (this.filtersType) {
        case 'INI':
            this.selectedAdmCentersIni = this.admCenterList.selectedItems;
            this.admCenterListModal.hide();
            break;
        case 'FIN':
            this.selectedAdmCentersFin = this.admCenterList.selectedItems;
            this.admCenterListModal.hide();
            break;
        case 'ALL':
        this.selectedAdmCentersAll = this.admCenterList.selectedItems;
        this.admCenterListModal.hide();
            break;
        case 'NI':
            this.selectedAdmCentersNi = this.admCenterList.selectedItems;
            this.admCenterListNiModal.hide();
            break;
        default:
            break;
    }

    this.checkForRefresh(this.filtersType);
}
/* end admcenter */


  /* begin USER */
  public selectUsers() {
    const params: Array<Param> = new Array<Param>();
    params.push(new Param('filter', this.filter));
    params.push(new Param('role', 'all'));

    let selectedUsers: Array<ApplicationUser> = null;
    selectedUsers = this.selectedUsers;

    this.userListModal.show();
    this.userList.selectedItems = selectedUsers;
    this.userList.refresh(params);
}

public removeFromUserSelection(user: ApplicationUser) {
    const list: Array<ApplicationUser> = this.selectedUsers;
    const index: number = list.indexOf(user);
    list.splice(index, 1);
    this.checkForRefresh();
}
public clearUserSelection() {

    this.selectedUsers = new Array<ApplicationUser>();
    this.checkForRefresh();
}

public setSelectedUsers(value) {
    // this.selectedUsers = this.userList.selectedItems;
    this.selectedUsers = value;
    // this.userListModal.hide();
    this.checkForRefresh();
}
/* end USER */


  /* begin USER */
  public selectUserTemps() {
    const params: Array<Param> = new Array<Param>();
    params.push(new Param('filter', this.filter));
    params.push(new Param('role', 'all'));

    let selectedUserTemps: Array<ApplicationUser> = null;
    selectedUserTemps = this.selectedUserTemps;

    this.userTempListModal.show();
    this.userTempList.selectedItems = selectedUserTemps;
    this.userTempList.refresh(params);
}

public removeFromUserTempSelection(user: ApplicationUser) {
    const list: Array<ApplicationUser> = this.selectedUserTemps;
    const index: number = list.indexOf(user);
    list.splice(index, 1);
    this.refreshNotIdentified();
}
public clearUserTempSelection() {

    this.selectedUserTemps = new Array<ApplicationUser>();
    this.refreshNotIdentified();
}

public setSelectedUserTemps() {
    this.selectedUserTemps = this.userTempList.selectedItems;
    this.userTempListModal.hide();
    this.refreshNotIdentified();
}
/* end USER */

   /* begin region */
   public selectRegions(filtersType: string) {
    this.filtersType = filtersType;

    let selectedRegions: Array<Region> = null;

    switch (this.filtersType) {
        case 'INI':
            selectedRegions = this.selectedRegionsIni;
            this.regionListModal.show();
            this.regionList.selectedItems = selectedRegions;
            this.regionList.refresh(null);
            break;
        case 'FIN':
            selectedRegions = this.selectedRegionsFin;
            this.regionListModal.show();
            this.regionList.selectedItems = selectedRegions;
            this.regionList.refresh(null);
            break;
        case 'ALL':
            selectedRegions = this.selectedRegionsAll;
            this.regionListModal.show();
            this.regionList.selectedItems = selectedRegions;
            this.regionList.refresh(null);
            break;
        case 'NI':
            selectedRegions = this.selectedRegionsNi;
            this.regionListNiModal.show();
            this.regionListNi.selectedItems = selectedRegions;
            this.regionListNi.refresh(null);
            break;
        default:
            break;
    }

}

public removeFromRegionSelection(filtersType: string, region: Region) {
    let selectedRegions: Array<Region> = null;

    switch (filtersType) {
        case 'INI':
            selectedRegions = this.selectedRegionsIni;
            break;
        case 'FIN':
            selectedRegions = this.selectedRegionsFin;
            break;
        case 'ALL':
            selectedRegions = this.selectedRegionsAll;
            break;
        case 'NI':
            selectedRegions = this.selectedRegionsNi;
            break;
        default:
             break;
    }
    const index: number = selectedRegions.indexOf(region);
    selectedRegions.splice(index, 1);
    this.checkForRefresh(filtersType);
}

public clearRegionSelection(filtersType: string) {
    switch (filtersType) {
        case 'INI':
            this.selectedRegionsIni = new Array<Region>();
            break;
        case 'FIN':
            this.selectedRegionsFin = new Array<Region>();
            break;
        case 'ALL':
            this.selectedRegionsAll = new Array<Region>();
            break;
        case 'NI':
            this.selectedRegionsNi = new Array<Region>();
            break;
        default:
            break;
    }

    this.checkForRefresh(filtersType);
}

public setSelectedRegions() {
    switch (this.filtersType) {
        case 'INI':
            this.selectedRegionsIni = this.regionList.selectedItems;
            this.regionListModal.hide();
            break;
        case 'FIN':
            this.selectedRegionsFin = this.regionList.selectedItems;
            this.regionListModal.hide();
            break;
        case 'ALL':
            this.selectedRegionsAll = this.regionList.selectedItems;
            this.regionListModal.hide();
            break;
        case 'NI':
            this.selectedRegionsNi = this.regionListNi.selectedItems;
            this.regionListNiModal.hide();
            break;
        default:
            break;
    }

    this.checkForRefresh(this.filtersType);
}
    /* end region */

    /* COUNTIES */
  public selectCounties(filtersType: string) {
    this.filtersType = filtersType;

    let selectedCounties: Array<County> = null;

    switch (this.filtersType) {
        case 'INI':
            selectedCounties = this.selectedCountiesIni;
            break;
        case 'FIN':
            selectedCounties = this.selectedCountiesFin;
            break;
        case 'ALL':
            selectedCounties = this.selectedCountiesAll;
            break;
        case 'NI':
            selectedCounties = this.selectedCountiesNi;
            break;
        default:
            break;
    }


    this.countyListModal.show();
    this.countyList.selectedItems = selectedCounties;
    this.countyList.refresh(null);
}

public removeFromCountySelection(filtersType: string, county: County) {
    let selectedCounties: Array<County> = null;

    switch (filtersType) {
        case 'INI':
            selectedCounties = this.selectedCountiesIni;
            break;
        case 'FIN':
            selectedCounties = this.selectedCountiesFin;
            break;
        case 'ALL':
            selectedCounties = this.selectedCountiesAll;
                break;
        case 'NI':
            selectedCounties = this.selectedCountiesNi;
            break;
        default:
            break;
    }
    const index: number = selectedCounties.indexOf(county);
    selectedCounties.splice(index, 1);
    this.checkForRefresh(filtersType);
}

public clearCountySelection(filtersType: string) {
    switch (filtersType) {
        case 'INI':
            this.selectedCountiesIni = new Array<County>();
            break;
        case 'FIN':
            this.selectedCountiesFin = new Array<County>();
            break;
        case 'ALL':
        this.selectedCountiesAll = new Array<County>();
        break;
        case 'NI':
            this.selectedCountiesNi = new Array<County>();
            break;
        default:
            break;
    }

    this.checkForRefresh(filtersType);
}

public setSelectedCounties() {
    switch (this.filtersType) {
        case 'INI':
            this.selectedCountiesIni = this.countyList.selectedItems;
            break;
        case 'FIN':
            this.selectedCountiesFin = this.countyList.selectedItems;
            break;
        case 'ALL':
        this.selectedCountiesAll = this.countyList.selectedItems;
            break;
        case 'NI':
            this.selectedCountiesNi = this.countyList.selectedItems;
            break;
        default:
            break;
    }

    this.countyListModal.hide();
    this.checkForRefresh(this.filtersType);
}
/* COUNTIES */

  /* CITY */
  public selectCities(filtersType: string) {
    this.filtersType = filtersType;

    let selectedCounties: Array<County> = null;
    let selectedCities: Array<City> = null;

    switch (this.filtersType) {
        case 'INI':
            selectedCities = this.selectedCitiesIni;
            selectedCounties = this.selectedCountiesIni;
            break;
        case 'FIN':
            selectedCities = this.selectedCitiesFin;
            selectedCounties = this.selectedCountiesFin;
            break;
        case 'ALL':
            selectedCities = this.selectedCitiesAll;
            selectedCounties = this.selectedCountiesAll;
            break;
        case 'NI':
            selectedCities = this.selectedCitiesNi;
            selectedCounties = this.selectedCountiesNi;
            break;
        default:
            break;
    }

    const params = new Array<Param>();
    params.push(new Param('countyIds', AppUtils.getIdsList<County, number>(selectedCounties)));


    this.cityListModal.show();
    this.cityList.selectedItems = selectedCities;
    this.cityList.refresh(params);
}

public removeFromCitySelection(filtersType: string, city: City) {
    let selectedCities: Array<City> = null;

    switch (filtersType) {
        case 'INI':
            selectedCities = this.selectedCitiesIni;
            break;
        case 'FIN':
            selectedCities = this.selectedCitiesFin;
            break;
        case 'ALL':
            selectedCities = this.selectedCitiesAll;
            break;
        case 'NI':
            selectedCities = this.selectedCitiesNi;
            break;
        default:
            break;
    }
    const index: number = selectedCities.indexOf(city);
    selectedCities.splice(index, 1);
    this.checkForRefresh(filtersType);
}

public clearCitySelection(filtersType: string) {
    switch (filtersType) {
        case 'INI':
            this.selectedCitiesIni = new Array<City>();
            break;
        case 'FIN':
            this.selectedCitiesFin = new Array<City>();
            break;
        case 'ALL':
        this.selectedCitiesAll = new Array<City>();
        break;
        case 'NI':
            this.selectedCitiesNi = new Array<City>();
            break;
        default:
            break;
    }

    this.checkForRefresh(filtersType);
}

public setSelectedCities() {
    switch (this.filtersType) {
        case 'INI':
            this.selectedCitiesIni = this.cityList.selectedItems;
            break;
        case 'FIN':
            this.selectedCitiesFin = this.cityList.selectedItems;
            break;
        case 'ALL':
        this.selectedCitiesAll = this.cityList.selectedItems;
            break;
        case 'NI':
            this.selectedCitiesNi = this.cityList.selectedItems;
            break;
        default:
            break;
    }

    this.cityListModal.hide();
    this.checkForRefresh(this.filtersType);
}
/* CITY */

   /*begin dimension*/
   public selectDimensions() {

    let selectedAssetCategories: Array<AssetCategory> = null;

    selectedAssetCategories = this.selectedAssetCategories;

    const params = new Array<Param>();
    params.push(new Param('assetCategoryIds', AppUtils.getIdsList<AssetCategory, number>(selectedAssetCategories)));

    this.dimensionListModal.show();
    this.dimensionList.selectedItems = this.selectedDimensions;
    this.dimensionList.refresh(null);
}
public removeFromDimensionSelection(dimension: Dimension) {
    const index: number = this.selectedDimensions.indexOf(dimension);
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

 /*begin TEMP dimension*/
 public selectTempDimensions() {

    this.tempDimensionListModal.show();
    this.tempDimensionList.selectedItems = this.selectedTempDimensions;
    this.tempDimensionList.refresh(null);
}
public removeFromTempDimensionSelection(dimension: Dimension) {
    const index: number = this.selectedTempDimensions.indexOf(dimension);
    this.selectedTempDimensions.splice(index, 1);
    this.refreshNotIdentified();
}

public clearTempDimensionSelection() {
    this.selectedTempDimensions = new Array<Dimension>();
    this.refreshNotIdentified();
}

public setSelectedTempDimensions() {
    this.selectedTempDimensions = this.tempDimensionList.selectedItems;
    this.tempDimensionListModal.hide();
    this.refreshNotIdentified();
}

/*end TEMP dimension*/


   /*begin dimension*/
   public selectDimensionTemps() {

    let selectedAssetCategories: Array<AssetCategory> = null;

    selectedAssetCategories = this.selectedAssetCategories;

    const params = new Array<Param>();
    params.push(new Param('assetCategoryIds', AppUtils.getIdsList<AssetCategory, number>(selectedAssetCategories)));

    this.dimensionListTempModal.show();
    this.dimensionListTemp.selectedItems = this.selectedDimensionTemps;
    this.dimensionListTemp.refresh(null);
}
public removeFromDimensionTempSelection(dimensionTemp: Dimension) {
    const index: number = this.selectedDimensionTemps.indexOf(dimensionTemp);
    this.selectedDimensionTemps.splice(index, 1);
    this.refreshNotIdentified();
}

public clearDimensionTempSelection() {
    this.selectedDimensionTemps = new Array<Dimension>();
    this.refreshNotIdentified();
}

public setSelectedDimensionTemps() {
    this.selectedDimensionTemps = this.dimensionListTemp.selectedItems;
    this.dimensionListTempModal.hide();
    this.refreshNotIdentified();
}

/*end dimension*/

/* begin location */
public selectLocations(filtersType: string) {
    this.filtersType = filtersType;

    let selectedCities: Array<City> = null;
    let selectedLocations: Array<Location> = null;

    const params = new Array<Param>();

    switch (this.filtersType) {
        case 'INI':
            selectedLocations = this.selectedLocationsIni;
            selectedCities = this.selectedCitiesIni;
            params.push(new Param('cityIds', AppUtils.getIdsList<City, number>(selectedCities)));
            this.locationListModal.show();
            this.locationList.selectedItems = selectedLocations;
            this.locationList.refresh(params);
            break;
        case 'FIN':
            selectedLocations = this.selectedLocationsFin;
            selectedCities = this.selectedCitiesFin;
            params.push(new Param('cityIds', AppUtils.getIdsList<City, number>(selectedCities)));
            this.locationListModal.show();
            this.locationList.selectedItems = selectedLocations;
            this.locationList.refresh(params);
            break;
        case 'ALL':
            selectedLocations = this.selectedLocationsAll;
            selectedCities = this.selectedCitiesAll;
            params.push(new Param('cityIds', AppUtils.getIdsList<City, number>(selectedCities)));
            this.locationListModal.show();
            this.locationList.selectedItems = selectedLocations;
            this.locationList.refresh(params);
            break;
        case 'NI':
            selectedLocations = this.selectedLocationsNi;
            selectedCities = this.selectedCitiesNi;
            params.push(new Param('cityIds', AppUtils.getIdsList<City, number>(selectedCities)));
            this.locationListNiModal.show();
            this.locationListNi.selectedItems = selectedLocations;
            this.locationListNi.refresh(params);
            break;
        default:
            break;
    }

}

public removeFromLocationSelection(filtersType: string, location: Location) {
    let selectedLocations: Array<Location> = null;

    switch (filtersType) {
        case 'INI':
            selectedLocations = this.selectedLocationsIni;
            break;
        case 'FIN':
            selectedLocations = this.selectedLocationsFin;
            break;
        case 'ALL':
            selectedLocations = this.selectedLocationsAll;
            break;
        case 'NI':
            selectedLocations = this.selectedLocationsNi;
            break;
        default:
             break;
    }
    const index: number = selectedLocations.indexOf(location);
    selectedLocations.splice(index, 1);
    this.checkForRefresh(filtersType);
}

public clearLocationSelection(filtersType: string) {
    switch (filtersType) {
        case 'INI':
            this.selectedLocationsIni = new Array<Location>();
            break;
        case 'FIN':
            this.selectedLocationsFin = new Array<Location>();
            break;
        case 'ALL':
            this.selectedLocationsAll = new Array<Location>();
            break;
        case 'NI':
            this.selectedLocationsNi = new Array<Location>();
            break;
        default:
            break;
    }

    this.checkForRefresh(filtersType);
}

public setSelectedLocations() {
    switch (this.filtersType) {
        case 'INI':
            this.selectedLocationsIni = this.locationList.selectedItems;
            this.locationListModal.hide();
            break;
        case 'FIN':
            this.selectedLocationsFin = this.locationList.selectedItems;
            this.locationListModal.hide();
            break;
        case 'ALL':
            this.selectedLocationsAll = this.locationList.selectedItems;
            this.locationListModal.hide();
            break;
        case 'NI':
            this.selectedLocationsNi = this.locationListNi.selectedItems;
            this.locationListNiModal.hide();
            break;
        default:
            break;
    }
    this.checkForRefresh(this.filtersType);
}
/* end location */

    /* begin Division */
    public selectDivisions(filtersType: string) {
        this.filtersType = filtersType;

       // let selectedRegions: Array<Region> = null;
        let selectedDivisions: Array<Division> = null;

        switch (this.filtersType) {
            case 'INI':
                selectedDivisions = this.selectedDivisionsIni;
            //    selectedRegions = this.selectedRegionsIni;
                break;
            case 'FIN':
                selectedDivisions = this.selectedDivisionsFin;
             //   selectedRegions = this.selectedRegionsFin;
                break;
            case 'ALL':
            selectedDivisions = this.selectedDivisionsAll;
            //   selectedRegions = this.selectedRegionsFin;
            break;
           default:
                break;
        }

        const params = new Array<Param>();
      //  params.push(new Param('regionIds', AppUtils.getIdsList<Region, number>(selectedRegions)));

        this.divisionListModal.show();
        this.divisionList.selectedItems = selectedDivisions;
        this.divisionList.refresh(params);
    }

    public removeFromDivisionSelection(filtersType: string, division: Division) {
        let selectedDivisions: Array<Division> = null;

        switch (filtersType) {
            case 'INI':
                selectedDivisions = this.selectedDivisionsIni;
                break;
            case 'FIN':
                selectedDivisions = this.selectedDivisionsFin;
                break;
            case 'ALL':
                selectedDivisions = this.selectedDivisionsAll;
                break;
            default:
                break;
        }
        const index: number = selectedDivisions.indexOf(division);
        selectedDivisions.splice(index, 1);
        this.checkForRefresh(filtersType);
    }

    public clearDivisionSelection(filtersType: string) {
        switch (filtersType) {
            case 'INI':
                this.selectedDivisionsIni = new Array<Division>();
                break;
            case 'FIN':
                this.selectedDivisionsFin = new Array<Division>();
                break;
            case 'ALL':
                this.selectedDivisionsAll = new Array<Division>();
                break;
            default:
                break;
        }

        this.checkForRefresh(filtersType);
    }

    public setSelectedDivisions(filtersType: string, value: Division[]) {
        switch (filtersType) {
            case 'INI':
                this.selectedDivisionsIni = value;
                break;
            case 'FIN':
                this.selectedDivisionsFin = value;
                break;
            case 'ALL':
                this.selectedDivisionsAll = value;
                break;
            default:
                break;
        }

        this.divisionListModal.hide();
        this.checkForRefresh(this.filtersType);
    }
    /* end division */

    /* begin room */
    public selectRooms(filtersType: string) {
        this.filtersType = filtersType;

        let selectedRegions: Array<Region> = null;
        let selectedAdmCenters: Array<AdmCenter> = null;
        let selectedRooms: Array<Room> = null;
        const params = new Array<Param>();

        switch (this.filtersType) {
            case 'INI':
                selectedRooms = this.selectedRoomsIni;
                selectedRegions = this.selectedRegionsIni;
                selectedAdmCenters = this.selectedAdmCentersIni;
                params.push(new Param('regionIds', AppUtils.getIdsList<Region, number>(selectedRegions)));
                params.push(new Param('admCenterIds', AppUtils.getIdsList<AdmCenter, number>(selectedAdmCenters)));
                this.roomListModal.show();
                this.roomList.selectedItems = this.selectedRoomsIni;
                this.roomList.refresh(params);
                break;
            case 'FIN':
                selectedRooms = this.selectedRoomsFin;
                selectedRegions = this.selectedRegionsFin;
                selectedAdmCenters = this.selectedAdmCentersFin;
                params.push(new Param('regionIds', AppUtils.getIdsList<Region, number>(selectedRegions)));
                params.push(new Param('admCenterIds', AppUtils.getIdsList<AdmCenter, number>(selectedAdmCenters)));
                this.roomListModal.show();
                this.roomList.selectedItems = this.selectedRoomsFin;
                this.roomList.refresh(params);
                break;
            case 'ALL':
                selectedRooms = this.selectedRoomsAll;
                selectedRegions = this.selectedRegionsAll;
                selectedAdmCenters = this.selectedAdmCentersAll;
                params.push(new Param('regionIds', AppUtils.getIdsList<Region, number>(selectedRegions)));
                params.push(new Param('admCenterIds', AppUtils.getIdsList<AdmCenter, number>(selectedAdmCenters)));
                this.roomListModal.show();
                this.roomList.selectedItems = this.selectedRoomsAll;
                this.roomList.refresh(params);
                break;
            case 'NI':
                selectedRooms = this.selectedRoomsNi;
                selectedRegions = this.selectedRegionsNi;
                selectedAdmCenters = this.selectedAdmCentersNi;
                params.push(new Param('regionIds', AppUtils.getIdsList<Region, number>(selectedRegions)));
                params.push(new Param('admCenterIds', AppUtils.getIdsList<AdmCenter, number>(selectedAdmCenters)));
                this.roomListNiModal.show();
                this.roomListNi.selectedItems = this.selectedRoomsNi;
                this.roomListNi.refresh(params);
                break;
            default:
                break;
        }

    }

    public removeFromRoomSelection(filtersType: string, room: Room) {

        let selectedRooms: Array<Room> = null;
        // let list: Array<Room> = filtersType === 'INI' ? this.selectedRoomsIni : filtersType === 'NI' ?
        // this.selectedRoomsNi :  filtersType === 'ALL' ? this.selectedRoomsAll : this.selectedRoomsFin;

        switch (filtersType) {
            case 'INI':
            selectedRooms = this.selectedRoomsIni;
                break;
            case 'FIN':
            selectedRooms = this.selectedRoomsFin;
                break;
            case 'ALL':
            selectedRooms = this.selectedRoomsAll;
                    break;
            case 'NI':
            selectedRooms = this.selectedRoomsNi;
                break;
            default:
                break;
        }
        const index: number = selectedRooms.indexOf(room);
        selectedRooms.splice(index, 1);
        this.checkForRefresh(filtersType);
    }

    public clearRoomSelection(filtersType: string) {

        switch (filtersType) {
            case 'INI':
                this.selectedRoomsIni = new Array<Room>();
                break;
            case 'FIN':
                this.selectedRoomsFin = new Array<Room>();
                break;
            case 'ALL':
            this.selectedRoomsAll = new Array<Room>();
            break;
            case 'NI':
                this.selectedRoomsNi = new Array<Room>();
                break;
            default:
                break;
        }

        this.checkForRefresh(filtersType);
    }

    public setSelectedRooms() {

            switch (this.filtersType) {
                case 'INI':
                    this.selectedRoomsIni = this.roomList.selectedItems;
                    this.roomListModal.hide();
                    break;
                case 'FIN':
                    this.selectedRoomsFin = this.roomList.selectedItems;
                    this.roomListModal.hide();
                    break;
                case 'ALL':
                this.selectedRoomsAll = this.roomList.selectedItems;
                this.roomListModal.hide();
                    break;
                case 'NI':
                    this.selectedRoomsNi = this.roomListNi.selectedItems;
                    this.roomListNiModal.hide();
                    break;
                default:
                    break;
            }

        this.checkForRefresh(this.filtersType);
    }
    /* end room */

     /* begin AssetState */
     public selectInvStates(filtersType: string) {
        this.filtersType = filtersType;

        let selectedInvStates: Array<InvState> = null;
        let selectedInvStatesNi: Array<InvState> = null;

        switch (this.filtersType) {
            case 'INI':
                selectedInvStates = this.selectedInvStatesIni;
                this.invStateListModal.show();
                this.invStateList.selectedItems = selectedInvStates;
                this.invStateList.refresh(null);
                break;
            case 'FIN':
                selectedInvStates = this.selectedInvStatesFin;
                this.invStateListModal.show();
                this.invStateList.selectedItems = selectedInvStates;
                this.invStateList.refresh(null);
                break;
            case 'ALL':
                selectedInvStates = this.selectedInvStatesAll;
                this.invStateListModal.show();
                this.invStateList.selectedItems = selectedInvStates;
                this.invStateList.refresh(null);
                break;
            case 'NI':
               selectedInvStatesNi = this.selectedInvStatesNi;
                this.invStateListNiModal.show();
                this.invStateListNi.selectedItems = selectedInvStatesNi;
                this.invStateListNi.refresh(null);
                break;
          default:
               break;
        }

    }

    public removeFromInvStateSelection(filtersType: string, assetState: InvState) {

        let selectedInvStates: Array<InvState> = null;
        let selectedInvStatesNi: Array<InvState> = null;

        switch (filtersType) {
            case 'INI':
                selectedInvStates = this.selectedInvStatesIni;
                const indexIni: number = selectedInvStates.indexOf(assetState);
                selectedInvStates.splice(indexIni, 1);
                this.checkForRefresh(filtersType);
                break;
            case 'FIN':
                selectedInvStates = this.selectedInvStatesFin;
                const indexFin: number = selectedInvStates.indexOf(assetState);
                selectedInvStates.splice(indexFin, 1);
                this.checkForRefresh(filtersType);
                break;
            case 'ALL':
                selectedInvStates = this.selectedInvStatesAll;
                const indexAll: number = selectedInvStates.indexOf(assetState);
                selectedInvStates.splice(indexAll, 1);
                this.checkForRefresh(filtersType);
                break;
            case 'NI':
                selectedInvStatesNi = this.selectedInvStatesNi;
                const indexNi: number = selectedInvStatesNi.indexOf(assetState);
                this.selectedInvStatesNi.splice(indexNi, 1);
                this.checkForRefresh(filtersType);
                break;
           default:
                break;
        }

    }

    public clearInvStateSelection(filtersType: string) {

        switch (filtersType) {
            case 'INI':
                this.selectedInvStatesIni = new Array<InvState>();
                break;
            case 'FIN':
                this.selectedInvStatesFin = new Array<InvState>();
                break;
            case 'ALL':
                this.selectedInvStatesAll = new Array<InvState>();
                break;
            case 'NI':
                this.selectedInvStatesNi = new Array<InvState>();
                break;
           default:
                break;
        }

        this.checkForRefresh(filtersType);
    }

    public setSelectedInvStates() {

        switch (this.filtersType) {
            case 'INI':
                this.selectedInvStatesIni = this.invStateList.selectedItems;
                this.invStateListModal.hide();
                this.checkForRefresh(this.filtersType);
                break;
            case 'FIN':
                this.selectedInvStatesFin = this.invStateList.selectedItems;
                this.invStateListModal.hide();
                this.checkForRefresh(this.filtersType);
                break;
            case 'ALL':
                this.selectedInvStatesAll = this.invStateList.selectedItems;
                this.invStateListModal.hide();
                this.checkForRefresh(this.filtersType);
                break;
            case 'NI':
                this.selectedInvStatesNi = this.invStateList.selectedItems;
                this.invStateListNiModal.hide();
                this.checkForRefresh(this.filtersType);
                break;
            default:
                break;
        }

    }
          /* end Administration */

     /* begin Administration */
     public selectAdministrations(filtersType: string) {
        this.filtersType = filtersType;

      //  let selectedRegions: Array<Region> = null;
        let selectedDivisions: Array<Division> = null;
        let selectedAdministrations: Array<Administration> = null;

        switch (this.filtersType) {
            case 'INI':
                selectedDivisions = this.selectedDivisionsIni;
             //   selectedRegions = this.selectedRegionsIni;
                selectedAdministrations = this.selectedAdministrationsIni;
                break;
            case 'FIN':
                selectedDivisions = this.selectedDivisionsFin;
               // selectedRegions = this.selectedRegionsFin;
                selectedAdministrations = this.selectedAdministrationsFin;
                break;
            case 'ALL':
            selectedDivisions = this.selectedDivisionsAll;
            // selectedRegions = this.selectedRegionsFin;
            selectedAdministrations = this.selectedAdministrationsAll;
                break;
          default:
               break;
        }

        const params = new Array<Param>();
      //  params.push(new Param('regionIds', AppUtils.getIdsList<Region, number>(selectedRegions)));
        params.push(new Param('divisionIds', AppUtils.getIdsList<Division, number>(selectedDivisions)));

        this.administrationListModal.show();
        this.administrationList.selectedItems = selectedAdministrations;
        this.administrationList.refresh(params);
    }

    public removeFromAdministrationSelection(filtersType: string, administration: Administration) {

        let selectedAdministrations: Array<Administration> = null;

        switch (filtersType) {
            case 'INI':
            selectedAdministrations = this.selectedAdministrationsIni;
                break;
            case 'FIN':
            selectedAdministrations = this.selectedAdministrationsFin;
                break;
            case 'ALL':
            selectedAdministrations = this.selectedAdministrationsAll;
                break;
           default:
                break;
        }
        const index: number = selectedAdministrations.indexOf(administration);
        selectedAdministrations.splice(index, 1);
        this.checkForRefresh(filtersType);
    }

    public clearAdministrationSelection(filtersType: string) {

        switch (filtersType) {
            case 'INI':
                this.selectedAdministrationsIni = new Array<Administration>();
                break;
            case 'FIN':
                this.selectedAdministrationsFin = new Array<Administration>();
                break;
            case 'ALL':
            this.selectedAdministrationsAll = new Array<Administration>();
            break;
           default:
                break;
        }

        this.checkForRefresh(filtersType);
    }

    public setSelectedAdministrations() {

        switch (this.filtersType) {
            case 'INI':
                this.selectedAdministrationsIni = this.administrationList.selectedItems;
                break;
            case 'FIN':
                this.selectedAdministrationsFin = this.administrationList.selectedItems;
                break;
            case 'ALL':
            this.selectedAdministrationsAll = this.administrationList.selectedItems;
                break;
            default:
                break;
        }

        this.administrationListModal.hide();
        this.checkForRefresh(this.filtersType);
    }
          /* end Administration */


         /* begin AssetType */
         public selectAssetTypes() {

            let selectedAssetTypes: Array<AssetType> = null;

            selectedAssetTypes = this.selectedAssetTypes;

            const params = new Array<Param>();

            this.assetTypeListModal.show();

            this.assetTypeList.selectedItems = selectedAssetTypes;
            this.assetTypeList.refresh(params);
        }

        public removeFromAssetTypeSelection(assetType: AssetType) {
            const list: Array<AssetType> = this.selectedAssetTypes;
            const index: number = list.indexOf(assetType);
            list.splice(index, 1);
            this.checkForRefresh();
        }

        public clearAssetTypeSelection() {

            this.selectedAssetTypes = new Array<AssetType>();
            this.checkForRefresh();
        }

        public setSelectedAssetTypes() {

            this.selectedAssetTypes = this.assetTypeList.selectedItems;

            this.assetTypeListModal.hide();
            this.checkForRefresh(this.filtersType);
        }
        /* end AssetType */

            /* begin AssetCategory */
            public selectAssetCategories() {
            let selectedAssetCategories: Array<AssetCategory> = null;
            selectedAssetCategories = this.selectedAssetCategories;

            this.assetCategoryListModal.show();
            this.assetCategoryList.selectedItems = selectedAssetCategories;
            this.assetCategoryList.refresh(null);
        }

        public removeFromAssetCategorySelection(assetCategory: AssetCategory) {
            const list: Array<AssetCategory> = this.selectedAssetCategories;
            const index: number = list.indexOf(assetCategory);
            list.splice(index, 1);
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
        /* end AssetCategory */

         /*begin uom*/
         public selectUoms() {
            let selectedUoms: Array<Uom> = null;
            selectedUoms = this.selectedUoms;
            this.uomListModal.show();
            this.uomList.selectedItems = this.selectedUoms;
            this.uomList.refresh(null);
        }

        public removeFromUomSelection(uom: Uom) {
            const index: number = this.selectedUoms.indexOf(uom);
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


        


            /*begin uom*/
            public selectUomTemps() {
                let selectedUomTemps: Array<Uom> = null;
                selectedUomTemps = this.selectedUomTemps;
                this.uomListTempModal.show();
                this.uomListTemp.selectedItems = this.selectedUomTemps;
                this.uomListTemp.refresh(null);
            }

            public removeFromUomTempSelection(uomTemp: Uom) {
                const index: number = this.selectedUomTemps.indexOf(uomTemp);
                this.selectedUomTemps.splice(index, 1);
                this.refreshNotIdentified();
            }

            public clearUomTempSelection() {
                this.selectedUomTemps = new Array<Uom>();
                this.refreshNotIdentified();
            }

            public setSelectedUomTemps() {
                this.selectedUomTemps = this.uomListTemp.selectedItems;
                this.uomListTempModal.hide();
                this.refreshNotIdentified();
            }


            

          /*begin COMPANY */
          public selectCompanies() {
            this.companyListModal.show();
            this.companyList.selectedItems = this.selectedCompanies;
            this.companyList.refresh(null);
        }

        public removeFromCompanySelection(company: Company) {
            const index: number = this.selectedCompanies.indexOf(company);
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
            const index: number = this.selectedAssetNatures.indexOf(assetNature);
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


          /*begin TEMP COMPANY */
          public selectTempCompanies() {
            this.tempCompanyListModal.show();
            this.tempCompanyList.selectedItems = this.selectedTempCompanies;
            this.tempCompanyList.refresh(null);
        }

        public removeFromTempCompanySelection(company: Company) {
            const index: number = this.selectedTempCompanies.indexOf(company);
            this.selectedTempCompanies.splice(index, 1);
            this.refreshNotIdentified();
        }

        public clearTempCompanySelection() {
            this.selectedTempCompanies = new Array<Company>();
            this.refreshNotIdentified();
        }

        public setSelectedTempCompanies() {
            this.selectedTempCompanies = this.tempCompanyList.selectedItems;
            this.tempCompanyListModal.hide();
            this.refreshNotIdentified();
        }

         

         /*begin TEMP ASSET NATURE */
         public selectTempAssetNatures() {
            this.tempAssetNatureListModal.show();
            this.tempAssetNatureList.selectedItems = this.selectedTempAssetNatures;
            this.tempAssetNatureList.refresh(null);
        }

        public removeFromTempAssetNatureSelection(assetNature: AssetNature) {
            const index: number = this.selectedTempAssetNatures.indexOf(assetNature);
            this.selectedTempAssetNatures.splice(index, 1);
            this.refreshNotIdentified();
        }

        public clearTempAssetNatureSelection() {
            this.selectedTempAssetNatures = new Array<AssetNature>();
            this.refreshNotIdentified();
        }

        public setSelectedTempAssetNatures() {
            this.selectedTempAssetNatures = this.tempAssetNatureList.selectedItems;
            this.tempAssetNatureListModal.hide();
            this.refreshNotIdentified();
        }


        /*end TEMP ASSET NATURE */


          /*begin COMPANY */
          public selectCompaniesNi() {
            this.companyListNiModal.show();
            this.companyListNi.selectedItems = this.selectedCompanyNis;
            this.companyListNi.refresh(null);
        }

        public removeFromCompanyNiSelection(companyNi: Company) {
            const index: number = this.selectedCompanyNis.indexOf(companyNi);
            this.selectedCompanyNis.splice(index, 1);
            this.refreshNotIdentified();
        }

        public clearCompanyNiSelection() {
            this.selectedCompanyNis = new Array<Company>();
            this.refreshNotIdentified();
        }

        public setSelectedCompaniesNi() {
            this.selectedCompanyNis = this.companyListNi.selectedItems;
            this.companyListNiModal.hide();
            this.refreshNotIdentified();
        }


        


        //   /*begin DEPARTMENT */
        //   public selectDepartments() {
        //     this.departmentListModal.show();
        //     this.departmentList.selectedItems = this.selectedDepartments;
        //     this.departmentList.refresh(null);
        // }

        // public removeFromDepartmentSelection(department: Department) {
        //     let index: number = this.selectedDepartments.indexOf(department);
        //     this.selectedDepartments.splice(index, 1);
        //     this.checkForRefresh();
        // }

        // public clearDepartmentSelection() {
        //     this.selectedDepartments = new Array<Department>();
        //     this.checkForRefresh();
        // }

        // public setSelectedDepartments() {
        //     this.selectedDepartments = this.departmentList.selectedItems;
        //     this.departmentListModal.hide();
        //     this.checkForRefresh();
        // }


        // /*end DEPARTMENT */


        //    /*begin DEPARTMENT */
        //    public selectDepartmentsNi() {
        //     this.departmentListNiModal.show();
        //     this.departmentListNi.selectedItems = this.selectedDepartmentNis;
        //     this.departmentListNi.refresh(null);
        // }

        // public removeFromDepartmentNiSelection(departmentNi: Department) {
        //     let index: number = this.selectedDepartmentNis.indexOf(departmentNi);
        //     this.selectedDepartmentNis.splice(index, 1);
        //     this.refreshNotIdentified();
        // }

        // public clearDepartmentNiSelection() {
        //     this.selectedDepartmentNis = new Array<Department>();
        //     this.refreshNotIdentified();
        // }

        // public setSelectedDepartmentNis() {
        //     this.selectedDepartmentNis = this.departmentListNi.selectedItems;
        //     this.departmentListNiModal.hide();
        //     this.refreshNotIdentified();
        // }


        // /*end DEPARTMENT */


    public onCustodyUpdate(custody: any) {
        console.log(custody.value);
        this.custody = custody;
        this.checkForRefresh();
    }

    public onToolbarButtonClicked(button: string) {
        this.showFilters = !this.showFilters;
        this.showSearchButtoIconClass = this.showFilters ? 'fa fa-search-minus' : 'fa fa-search-plus';
    }

    public checkForRefresh(filtersType?: string) {
        if ((filtersType) && (filtersType === 'NI')) {
            this.refreshNotIdentified();
        } else {
            this.refreshAssets();
        }
    }

    public refreshAssets() {
        const params: Array<Param> = this.getFilters();
        this.assetInvFullDetailList.refresh(params);
    }

    public getFilters(): Array<Param> {
        const params = new Array<Param>();

        params.push(new Param('inventoryId', this.selectedInventory != null ? this.selectedInventory.id.toString() : '16'));
        params.push(new Param('costCenterIdsIni', AppUtils.getIdsList<CostCenter, number>(this.selectedCostCentersIni)));
        params.push(new Param('divisionIdsIni', AppUtils.getIdsList<Division, number>(this.selectedDivisionsIni)));
        params.push(new Param('departmentIdsIni', AppUtils.getIdsList<Department, number>(this.selectedDepartmentsIni)));
        params.push(new Param('administrationIdsIni', AppUtils.getIdsList<Administration, number>(this.selectedAdministrationsIni)));
        params.push(new Param('admCenterIdsIni', AppUtils.getIdsList<AdmCenter, number>(this.selectedAdmCentersIni)));
        params.push(new Param('invStateIdsIni', AppUtils.getIdsList<InvState, number>(this.selectedInvStatesIni)));

        params.push(new Param('costCenterIdsFin', AppUtils.getIdsList<CostCenter, number>(this.selectedCostCentersFin)));
        params.push(new Param('divisionIdsFin', AppUtils.getIdsList<Division, number>(this.selectedDivisionsFin)));
        params.push(new Param('departmentIdsFin', AppUtils.getIdsList<Department, number>(this.selectedDepartmentsFin)));
        params.push(new Param('administrationIdsFin', AppUtils.getIdsList<Administration, number>(this.selectedAdministrationsFin)));
        params.push(new Param('admCenterIdsFin', AppUtils.getIdsList<AdmCenter, number>(this.selectedAdmCentersFin)));
        params.push(new Param('invStateIdsFin', AppUtils.getIdsList<InvState, number>(this.selectedInvStatesFin)));

        params.push(new Param('costCenterIdsAll', AppUtils.getIdsList<CostCenter, number>(this.selectedCostCentersAll)));
        params.push(new Param('divisionIdsAll', AppUtils.getIdsList<Division, number>(this.selectedDivisionsAll)));
        params.push(new Param('departmentIdsAll', AppUtils.getIdsList<Department, number>(this.selectedDepartmentsFin)));
        params.push(new Param('administrationIdsAll', AppUtils.getIdsList<Administration, number>(this.selectedAdministrationsAll)));
        params.push(new Param('admCenterIdsAll', AppUtils.getIdsList<AdmCenter, number>(this.selectedAdmCentersAll)));
        params.push(new Param('invStateIdsAll', AppUtils.getIdsList<InvState, number>(this.selectedInvStatesAll)));

        // params.push(new Param('regionIdsIni', AppUtils.getIdsList<Region, number>(this.selectedRegionsIni)));
        // params.push(new Param('costCenterIdsIni', JSON.stringify(this.selectedCostCentersIni.map(p => p.id))));
        // params.push(new Param('divisionIdsIni', AppUtils.getIdsList<Division, number>(this.selectedDivisionsIni)));
        // params.push(new Param('departmentIdsIni', AppUtils.getIdsList<Department, number>(this.selectedDepartmentsIni)));
        // params.push(new Param('employeeIdsIni', AppUtils.getIdsList<Employee, number>(this.selectedEmployeesIni)));
        // params.push(new Param('admCenterIdsIni', AppUtils.getIdsList<AdmCenter, number>(this.selectedAdmCentersIni)));
        params.push(new Param('countyIdsIni', AppUtils.getIdsList<County, number>(this.selectedCountiesIni)));
        params.push(new Param('cityIdsIni', AppUtils.getIdsList<City, number>(this.selectedCitiesIni)));
        params.push(new Param('locationIdsIni', AppUtils.getIdsList<Location, number>(this.selectedLocationsIni)));
        params.push(new Param('roomIdsIni', AppUtils.getIdsList<Room, number>(this.selectedRoomsIni)));
        // params.push(new Param('administrationIdsIni', AppUtils.getIdsList<Administration, number>(this.selectedAdministrationsIni)));

        // params.push(new Param('assetTypeIds', AppUtils.getIdsList<AssetType, number>(this.selectedAssetTypes)));
        params.push(new Param('dimensionIds', AppUtils.getIdsList<Dimension, number>(this.selectedDimensions)));
        // params.push(new Param('uomIds', AppUtils.getIdsList<Uom, number>(this.selectedUoms)));
        params.push(new Param('companyIds', AppUtils.getIdsList<Company, number>(this.selectedCompanies)));
       
        
        params.push(new Param('assetNatureIds', AppUtils.getIdsList<AssetNature, number>(this.selectedAssetNatures)));
        // params.push(new Param('assetCategoryIds', AppUtils.getIdsList<AssetCategory, number>(this.selectedAssetCategories)));
        // params.push(new Param('regionIdsFin', AppUtils.getIdsList<Region, number>(this.selectedRegionsFin)));
        // params.push(new Param('costCenterIdsFin', AppUtils.getIdsList<CostCenter, number>(this.selectedCostCentersFin)));
        // params.push(new Param('divisionIdsFin', AppUtils.getIdsList<Division, number>(this.selectedDivisionsFin)));
        // params.push(new Param('departmentIdsFin', AppUtils.getIdsList<Department, number>(this.selectedDepartmentsFin)));
        // params.push(new Param('employeeIdsFin', AppUtils.getIdsList<Employee, number>(this.selectedEmployeesFin)));
        // params.push(new Param('admCenterIdsFin', AppUtils.getIdsList<AdmCenter, number>(this.selectedAdmCentersFin)));
        // params.push(new Param('countyIdsFin', AppUtils.getIdsList<County, number>(this.selectedCountiesFin)));
        // params.push(new Param('cityIdsFin', AppUtils.getIdsList<City, number>(this.selectedCitiesFin)));
        // params.push(new Param('locationIdsFin', AppUtils.getIdsList<Location, number>(this.selectedLocationsFin)));
        // params.push(new Param('roomIdsFin', AppUtils.getIdsList<Room, number>(this.selectedRoomsFin)));
        // params.push(new Param('administrationIdsFin', AppUtils.getIdsList<Administration, number>(this.selectedAdministrationsFin)));

        // params.push(new Param('employeeIdsAll', AppUtils.getIdsList<Employee, number>(this.selectedEmployeesAll)));
        params.push(new Param('countyIdsAll', AppUtils.getIdsList<County, number>(this.selectedCountiesAll)));
        params.push(new Param('cityIdsAll', AppUtils.getIdsList<City, number>(this.selectedCitiesAll)));
        params.push(new Param('locationIdsAll', AppUtils.getIdsList<Location, number>(this.selectedLocationsAll)));
        params.push(new Param('roomIdsAll', AppUtils.getIdsList<Room, number>(this.selectedRoomsAll)));

        // params.push(new Param('invStateIdsIni', AppUtils.getIdsList<InvState, number>(this.selectedInvStatesIni)));
        // params.push(new Param('invStateIdsFin', AppUtils.getIdsList<InvState, number>(this.selectedInvStatesFin)));
        // params.push(new Param('invStateIdsAll', AppUtils.getIdsList<InvState, number>(this.selectedInvStatesAll)));
        // params.push(new Param('costCenterIdsAll', AppUtils.getIdsList<CostCenter, number>(this.selectedCostCentersAll)));
        params.push(new Param('userIds', AppUtils.getIdsList<ApplicationUser, number>(this.selectedUsers)));
        params.push(new Param('departmentIds', AppUtils.getIdsList<Department, number>(this.selectedDepartments)));
        // params.push(new Param('regionIdsAll', AppUtils.getIdsList<Region, number>(this.selectedRegionsAll)));
        // params.push(new Param('admCenterIdsAll', AppUtils.getIdsList<AdmCenter, number>(this.selectedAdmCentersAll)));
        // params.push(new Param('divisionIdsAll', AppUtils.getIdsList<Division, number>(this.selectedDivisionsAll)));
        // params.push(new Param('administrationIdsAll', AppUtils.getIdsList<Administration, number>(this.selectedAdministrationsAll)));

        params.push(new Param('filter', this.filter));
        params.push(new Param('reportType', this.reportTypeCode));
        params.push(new Param('assetState', this.assetStateCode));
        params.push(new Param('custody', ((this.custody === '-') ? 'null' : (this.custody === 'DA' ? 'true' : 'false'))));
        params.push(new Param('reconcile', ((this.isReconcile === '-') ? 'null' : (this.isReconcile === 'YES' ? 'true' : 'false'))));
        params.push(new Param('printed', ((this.isPrinted === '-') ? 'null' : (this.isPrinted === 'DA' ? 'true' : 'false'))));
        params.push(new Param('duplicate', ((this.isDuplicate === '-') ? 'null' : (this.isDuplicate === 'DA' ? 'true' : 'false'))));
        return params;
    }

    public refreshNotIdentified() {
        const params: Array<Param> = this.getNotIdentifiedFilters();

        if (this.assetInvTempDetailListTemp != undefined) {
          this.assetInvTempDetailListTemp.refresh(params);
        }

        // this.assetNiList.refresh(params);
    }

    public onAssetInvTempDetailTempSelectionChanged(assets: Array<AssetInvTempDetail>) {
        this.selectedAssetTemp = ((assets != null) && (assets.length === 1)) ? assets[0] : null;

        // this.notIdentifiedFilter = this.selectedAssetTemp != null ? this.selectedAssetTemp.name : '';
        // this.refreshNotIdentified();
    }

    public showPhoto(type: string) {

        this.imageListModal.show();
            switch (type) {
                case 'ASSET':
                    this.refreshEntityFiles(this.assetInvFullDetailList.selectedItem.id, true);
                    break;
                // case 'ASSETNI':
                //     this.refreshEntityFiles(this.assetNiList.selectedItem.id, true);
                //     break;
                case 'LOCATION':
                    const locationIni = this.selectedLocationsIni.length > 0 ? this.selectedLocationsIni[0].id : 0;
                    const locationFin = this.selectedLocationsFin.length > 0 ? this.selectedLocationsFin[0].id : 0;
                    const locationAll = this.selectedLocationsAll.length > 0 ? this.selectedLocationsAll[0].id : 0;
                    this.refreshLocationsEntityFiles(locationIni > 0 ? locationIni : locationFin > 0 ? locationFin : locationAll > 0 ? locationAll : 0, true);
                        break;
                case 'ASSETTEMP':
                    this.refreshEntityFiles(this.assetInvTempDetailListTemp.selectedItem.id, true);
                    break;
                default:
                    break;
            }
    }

    public refreshLocationsEntityFiles(assetId: number, loadAssetImages: boolean) {
        this.entityFileHttpService.getByEntity('LOCATION', assetId, '', 0)
        .subscribe((entityFiles: Array<EntityFile>) => {
            this.existingAssetImages.splice(0, this.existingAssetImages.length);
            this.assetImages.forEach((assetImage: AssetImage) => this.existingAssetImages.push(assetImage));
            this.assetImages.splice(0, this.assetImages.length);
            this.assetFiles.splice(0, this.assetFiles.length);
            // this.entityFileMemoryDataSource.clear();
            entityFiles.forEach((entityFile: EntityFile) => {
                if (entityFile.fileType.startsWith('image/')) {
                    let fileContent: any = null;
                    this.existingAssetImages.forEach((assetImage: AssetImage) => {
                        if (assetImage.entityFile.id === entityFile.id) {
                            fileContent = assetImage.fileContent;
                        }
                    });
                    this.assetImages.push(new AssetImage(entityFile, fileContent));
                } else {
                    this.assetFiles.push(entityFile);
                    // this.entityFileMemoryDataSource.addItem(entityFile);
                }
            });
            // this.fileList.refresh(null);
            if (loadAssetImages) { this.loadAssetImages(); }
        });
    }

    public clearFilters() {
        this.selectedAdmCentersIni = new Array<AdmCenter>();
        this.selectedCostCentersIni = new Array<CostCenter>();
        this.selectedDivisionsIni = new Array<Division>();
        this.selectedDepartmentsIni = new Array<Department>();
        this.selectedDepartmentsFin = new Array<Department>();
        this.selectedDepartments = new Array<Department>();
        this.selectedEmployeesIni = new Array<Employee>();
        this.selectedRegionsIni = new Array<Region>();
        this.selectedCountiesIni = new Array<County>();
        this.selectedCitiesIni = new Array<City>();
        this.selectedLocationsIni = new Array<Location>();
        this.selectedRoomsIni = new Array<Room>();
        this.selectedAdministrationsIni = new Array<Administration>();
        this.selectedInvStatesIni = new Array<InvState>();
        this.selectedDimensions = new Array<Dimension>();
        this.selectedAssetTypes = new Array<AssetType>();
        this.selectedUoms = new Array<Uom>();
        this.selectedCompanies = new Array<Company>();
        this.selectedAssetCategories = new Array<AssetCategory>();

        this.selectedAdmCentersFin = new Array<AdmCenter>();
        this.selectedCostCentersFin = new Array<CostCenter>();
        // this.selectedDepartmentsFin = new Array<Department>();
        this.selectedEmployeesFin = new Array<Employee>();
        this.selectedRegionsFin = new Array<Region>();
        this.selectedCountiesFin = new Array<County>();
        this.selectedCitiesFin = new Array<City>();
        this.selectedLocationsFin = new Array<Location>();
        this.selectedRoomsFin = new Array<Room>();
        this.selectedDivisionsFin = new Array<Division>();
        this.selectedAdministrationsFin = new Array<Administration>();
        this.selectedInvStatesFin = new Array<InvState>();

        this.selectedRegionsAll = new Array<Region>();
        this.selectedAdmCentersAll = new Array<AdmCenter>();
        this.selectedCostCentersAll = new Array<CostCenter>();
        this.selectedCountiesAll = new Array<County>();
        this.selectedCitiesAll = new Array<City>();
        this.selectedLocationsAll = new Array<Location>();
        this.selectedDivisionsAll = new Array<Division>();
        this.selectedDepartmentsAll = new Array<Department>();
        this.selectedAdministrationsAll = new Array<Administration>();
        this.selectedEmployeesAll = new Array<Employee>();
        this.selectedRoomsAll = new Array<Room>();
        this.selectedInvStatesAll = new Array<InvState>();
        this.filter = '';
        this.selectedUsers = new Array<ApplicationUser>();

        this.checkForRefresh();
    }

    public clearTempFilters() {
        this.selectedAdmCentersNi = new Array<AdmCenter>();
        this.selectedDepartmentNis = new Array<Department>();
        this.selectedRegionsNi = new Array<Region>();
        this.selectedCountiesNi = new Array<County>();
        this.selectedCitiesNi = new Array<City>();
        this.selectedLocationsNi = new Array<Location>();
        this.selectedRoomsNi = new Array<Room>();
        this.selectedInvStatesNi = new Array<InvState>();
        this.selectedDimensionTemps = new Array<Dimension>();
        this.selectedUomTemps = new Array<Uom>();
        this.selectedCompanyNis = new Array<Company>();

        this.selectedTempCompanies = new Array<Company>();
        
        
        this.selectedTempAssetNatures = new Array<AssetNature>();
        this.selectedTempDimensions = new Array<Dimension>();



        this.notIdentifiedFilter = '';
        this.selectedUserTemps = new Array<ApplicationUser>();

        this.refreshNotIdentified();
    }

    // public deleteOperation(){

    //         this.assetHttpService.deleteAssetOp(this.selectedAsset.id, this.inventoryList.selectedItem.id).subscribe((res) => { console.log('REZULTAT: ', res)});
    //         console.log('INVENTAR', this.inventoryList.selectedItem.id);

    // }

    public deleteOperation() {
        this.operationType = OperationType.CancelScanned;
        this.confirmationMessage = 'Anulati scanarea selectata?';
        this.confirmationModal.show();
 }

    public getSearchFilters(filter: string, wordCount: number, letterCount: number, wordMinLength: number): string[] {
        const result: Array<string> = new Array<string>();
        let filters: string[] = null;

        filter = filter.replace('-', ' ').replace('+', ' ').replace('.', ' ').replace(',', ' ').replace('/', ' ').replace('\\', ' ');
        while (filter.includes('  ')) { filter = filter.replace('  ', ' '); }
        filters = filter.split(' ');

        // console.log('filters: ' + JSON.stringify(filters));

        filters.forEach((f) => {
            if ((f.length >= wordMinLength) && ((wordCount <= 0) || (result.length < wordCount))) {
                result.push(letterCount > 0 ? (f.length <= letterCount ? f : f.substring(0, letterCount)) : f);
            }
        });

        return result;
    }

    public getNotIdentifiedFilters(): Array<Param> {
        const params = new Array<Param>();
        const filters: string[] = this.getSearchFilters(this.notIdentifiedFilter, this.wordCount, this.letterCount, this.wordMinLength);
        // console.log(JSON.stringify(filters));

        params.push(new Param('inventoryId', JSON.stringify(this.selectedInventory != null ? this.selectedInventory.id : '16')));
        // params.push(new Param('filter', this.notIdentifiedFilter.replace('-', ' ').replace('+', ' ').replace('.', ' ').replace(',', ' ').replace('/', ' ').replace('\\', ' ')));
        params.push(new Param('filters', JSON.stringify(filters)));
        // params.push(new Param('wordCount', JSON.stringify(this.wordCount)));
	    // params.push(new Param('letterCount', JSON.stringify(this.letterCount)));
        // params.push(new Param('regionIds', AppUtils.getIdsList<Region, number>(this.selectedRegionsNi)));
        params.push(new Param('costCenterIds', AppUtils.getIdsList<CostCenter, number>(this.selectedCostCentersNi)));
        params.push(new Param('divisionIds', AppUtils.getIdsList<Division, number>(this.selectedDivisionsNi)));
        params.push(new Param('departmentIds', AppUtils.getIdsList<Department, number>(this.selectedDepartmentsNi)));
        // params.push(new Param('employeeIds', AppUtils.getIdsList<Employee, number>(this.selectedEmployeesNi)));
        // params.push(new Param('admCenterIds', AppUtils.getIdsList<AdmCenter, number>(this.selectedAdmCentersNi)));
        params.push(new Param('countyIds', AppUtils.getIdsList<County, number>(this.selectedCountiesNi)));
        params.push(new Param('cityIds', AppUtils.getIdsList<City, number>(this.selectedCitiesNi)));
        params.push(new Param('locationIds', AppUtils.getIdsList<Location, number>(this.selectedLocationsNi)));
        params.push(new Param('invStateIds', AppUtils.getIdsList<InvState, number>(this.selectedInvStatesNi)));
        // params.push(new Param('roomIds', AppUtils.getIdsList<Room, number>(this.selectedRoomsNi)));
        params.push(new Param('conditionType', this.conditionType));
        params.push(new Param('userIds', AppUtils.getIdsList<ApplicationUser, number>(this.selectedUserTemps)));
        params.push(new Param('uomIds', AppUtils.getIdsList<Uom, number>(this.selectedUomTemps)));
        params.push(new Param('dimensionIds', AppUtils.getIdsList<Dimension, number>(this.selectedDimensionTemps)));
        params.push(new Param('companyIds', AppUtils.getIdsList<Company, number>(this.selectedCompanyNis)));

        params.push(new Param('printed', ((this.isPrintedTemp === '-') ? 'null' : (this.isPrintedTemp === 'DA' ? 'true' : 'false'))));
        params.push(new Param('duplicate', ((this.isDuplicateTemp === '-') ? 'null' : (this.isDuplicateTemp === 'DA' ? 'true' : 'false'))));

        return params;
    }

    public reportInventoryList() {
        if ((this.selectedInventory != null) && (this.selectedRegionsFin != null) && (this.selectedRegionsFin.length > 0)) {
            const reportType = 'inventorylistv2PRB';
            const inventoryId: number = this.selectedInventory.id;
            const regionId: number = this.selectedRegionsFin[0].id;
            const custody: boolean = ((this.custody === '-') ? null : (this.custody === 'YES' ? true : false));
            let url = '';

            url = `${AppConfig.reportingServer}Report.aspx/?report=${reportType}&inventoryId=${inventoryId}&regionId=${regionId}&reportType=${this.reportTypeCode}`;

            if ((this.selectedEmployeesFin != null) && (this.selectedEmployeesFin.length > 0)) {
                const reportTypeV3 = 'inventorylistv3';
                const employeeId: number = this.selectedEmployeesFin[0].id;

                url = `${AppConfig.reportingServer}Report.aspx/?report=${reportTypeV3}&inventoryId=${inventoryId}&regionId=${regionId}&reportType=${this.reportTypeCode}`;

                url += `&employeeId=${employeeId}`;
            }

            if (this.selectedLocationsFin != null && (this.selectedLocationsFin.length > 0)) {
                const locationId: number = this.selectedLocationsFin[0].id;
                url += `&locationId=${locationId}`;
            }

            if (custody != null) {
                url += `&custody=${custody}`;
            }


            // console.log(url);
            window.open(url);
        } else {
            alert('Verificati data ati selectat cel putin un inventar si o regiune!');
        }
    }

    public reportTransferIn() {
        if ((this.selectedInventory != null) && (this.selectedRegionsFin != null) && (this.selectedRegionsFin.length > 0)) {
            const reportType = 'transferinv1';
            const inventoryId: number = this.selectedInventory.id;
            const regionId: number = this.selectedRegionsFin[0].id;
            let url = '';

            url = `${AppConfig.reportingServer}Report.aspx/?report=${reportType}&inventoryId=${inventoryId}&regionId=${regionId}&reportType=${this.reportTypeCode}`;

            if (this.selectedLocationsFin != null && (this.selectedLocationsFin.length > 0)) {
                const locationId: number = this.selectedLocationsFin[0].id;
                url += `&locationId=${locationId}`;
            }

            window.open(url);
        } else {
            alert('Verificati data ati selectat cel putin un inventar si o regiune!');
        }
    }

    public reportTransferOut() {
        if ((this.selectedInventory != null) && (this.selectedRegionsFin != null) && (this.selectedRegionsFin.length > 0)) {
            const reportType = 'transferoutv1';
            const inventoryId: number = this.selectedInventory.id;
            const regionId: number = this.selectedRegionsFin[0].id;
            let url = '';

            url = `${AppConfig.reportingServer}Report.aspx/?report=${reportType}&inventoryId=${inventoryId}&regionId=${regionId}`;

            if (this.selectedLocationsFin != null && (this.selectedLocationsFin.length > 0)) {
                const locationId: number = this.selectedLocationsFin[0].id;
                url += `&locationId=${locationId}`;
            }

            window.open(url);
        } else {
            alert('Verificati data ati selectat un inventar si o regiune!');
        }
    }

  // public exportToExcel() {
  //   let params: Array<Param> = null;
  //   params = this.getFilters();
  //   this.assetHttpService
  //     .export(params)
  //     .subscribe((blob) => {
  //       fileSaveAs(blob.body, 'mijloace_fixe.xlsx');
  //     });
  // }
    public exportToExcel() {
                const params: Array<Param> = this.getFilters();
                this.assetHttpService.get(1, 1000000, 'asset.invNo', 'asc', params, null, 'inventory').subscribe(
                    (assetInvDetails: PagedResult<AssetInvFullDetail>) => {
                        // console.log(JSON.stringify(assetInvDetails));
                        const options = {
                            sheetid: 'mijloace fixe',
                            headers: true,
                            column: { style: { Font: { Bold: '1' } } },
                            rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                            cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                        };
                        alasql(`SELECT id as [Id],
                                invNo as [Numar inventar],
                                name as [Denumire],
                                assetCategory->name as [Categorie]
                                INTO XLSX('mijloace_fixe.xlsx',?) FROM ?`, [ options, assetInvDetails.items ]);
                    });
            }

            //

            // locationInitial->code as [Cladire initiala],
            // costCenterInitial->code as [Centru de cost initial],
            // costCenterInitial->name as [Denumire centru de cost initial],
            // employeeInitial->internalCode as [Marca],
            // employeeInitial->firstName as [Prenume],
            // employeeInitial->lastName as [Nume],
            // qIntial as [Cantitate initiala],
            // locationFinal->code as [Cladire finala],
            // costCenterFinal->code as [Centru de cost finala],
            // costCenterFinal->name as [Denumire centru de cost finala],
            // employeeIFinal->internalCode as [Marca finala],
            // employeeFinal->firstName as [Prenume final],
            // employeeFinal->lastName as [Nume final],
            // qFinal as [Cantitate finala]

            //

            public exportEmag() {

                this.hideExportBtn = true;
                let params: Array<Param> = null;

                params = this.getFilters();
                this.assetHttpService
                    .exportInventoryEmag(params)
                    .subscribe((blob) => {
                fileSaveAs(blob.body, 'Export.xlsx');
                this.hideExportBtn = false;
              });
            }

            public exportAllEmag() {

              this.hideExportBtn = true;
              let params: Array<Param> = null;

              params = this.getFilters();
              this.assetHttpService
                  .exportAllInventoryEmag(params)
                  .subscribe((blob) => {
              fileSaveAs(blob.body, 'Export-toate.xlsx');
              this.hideExportBtn = false;
            });
          }

            public exportToExcelAZ() {

                const params: Array<Param> = this.getFilters();

                this.assetHttpService.get(1, 1000000, 'asset.invNo', 'asc', params, null, 'inventory').subscribe(
                    (assetInvDetails: PagedResult<AssetInvFullDetail>) => {


                        // alasql.fn.datetime = function(dateStr) {
                        //                 let date = new Date(dateStr);
                        //                 date.toISOString().substring(0, 10);
                        //                 return date.toLocaleDateString();
                        // };

                        const options = {
                            sheetid: 'Raport',
                            headers: true,
                            column: { style: { Font: { Bold: '1' } } },
                            rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                            cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                        };

                        // alasql(`SELECT id as [Id],
                        //         company->name as [Companie],
                        //         department->name as [Departament],
                        //         info as [Angajat],
                        //         datetime(modifiedAt) as [Data scanare],
                        //         invNo as [Numar inventar],
                        //         name as [Denumire],
                        //         erpCode as [Denumire eticheta],
                        //         case when allowLabel = true then 'Etichetabil' else 'Neetichetabil' end as [Etichetabil?],
                        //         locationInitial->code as [Cod Agentie Initial],
                        //         locationInitial->address as [Cod Adresa Agentie Initial],
                        //         cityInitial->name as [Oras Initial],
                        //         countyInitial->name as [Judet Initial],
                        //         invStateInitial->name as [Stare Initial],
                        //         qIntial as [Cantitate initiala],
                        //         locationFinal->code as [Cod Agentie Inventar],
                        //         locationFinal->address as [Adresa Inventar],
                        //         cityFinal->name as [Oras Inventar],
                        //         countyFinal->name as [Judet Inventar],
                        //         invStateFinal->name as [Stare Inventar],
                        //         qFinal as [Cantitate Inventar],
                        //         uomFinal->name as [Model Inventar],
                        //         dimensionFinal->length as [Dimensiune Inventar],
                        //         serialNumberFinal AS [SN inventar],
                        //         info2019 as [Observatii Inventar]
                        //         INTO XLSX('Raport Inventar.xlsx',?) FROM ?`, [ options, assetInvDetails.items ]);
                    });
            }


            public exportTemp() {

                const params: Array<Param> = this.getNotIdentifiedFilters();

                this.assetHttpService.get(1, 1000000, 'asset.invNo', 'asc', params, null, 'temp').subscribe(
                    (assetInvDetails: PagedResult<AssetInvFullDetail>) => {


                        // alasql.fn.datetime = function(dateStr) {
                        //                 let date = new Date(dateStr);
                        //                 date.toISOString().substring(0, 10);
                        //                 return date.toLocaleDateString();
                        // };

                        const options = {
                            sheetid: 'Raport',
                            headers: true,
                            column: { style: { Font: { Bold: '1' } } },
                            rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                            cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                        };

                        // alasql(`SELECT id as [Id],
                        //         company->name as [Companie],
                        //         department->name as [Departament],
                        //         info as [Angajat],
                        //         datetime(modifiedAt) as [Data scanare],
                        //         invNo as [Numar inventar],
                        //         name as [Denumire],
                        //         erpCode as [Denumire eticheta],
                        //         case when allowLabel = true then 'Etichetabil' else 'Neetichetabil' end as [Etichetabil?],
                        //         locationInitial->code as [Cod Agentie Initial],
                        //         locationInitial->address as [Cod Adresa Agentie Initial],
                        //         cityInitial->name as [Oras Initial],
                        //         countyInitial->name as [Judet Initial],
                        //         invStateInitial->name as [Stare Initial],
                        //         qIntial as [Cantitate initiala],
                        //         locationFinal->code as [Cod Agentie Inventar],
                        //         locationFinal->address as [Adresa Inventar],
                        //         cityFinal->name as [Oras Inventar],
                        //         countyFinal->name as [Judet Inventar],
                        //         invStateFinal->name as [Stare Inventar],
                        //         qFinal as [Cantitate Inventar],
                        //         uomFinal->name as [Model Inventar],
                        //         dimensionFinal->length as [Dimensiune Inventar],
                        //         serialNumberFinal AS [SN inventar],
                        //         info2019 as [Observatii Inventar]
                        //         INTO XLSX('Raport Inventar.xlsx',?) FROM ?`, [ options, assetInvDetails.items ]);
                    });
            }
//   CAST([valueDep] AS NUMBER) as [Valoare neta],
// datetime(purchaseDate) as [Data achizitie],
// employeeInitial->internalCode as [Detinator initial],
// regionInitial->name as [Judet initial],
// locationInitial->name as [Gestiune initiala],

// roomInitial->code as [Adresa initial],
// invStateFinal->code as [Stare inventar],
// CAST([valueInv] AS NUMBER) as [Valoare achizitie],
// regionFinal->name as [Judet inventar],
// locationFinal->name as [Gestiune inventar],

// roomFinal->code as [Adresa inventar],
// assetCategory->name as [Clasa],
// invStateInitial->code as [Stare initial],
// qFinal as [Cantitate inventar],
// serialNumber as [SN Inventar],
            public exportToExcelOtp() {

                const params: Array<Param> = this.getFilters();

                this.assetHttpService.get(1, 1000000, 'asset.invNo', 'asc', params, null, 'inventory').subscribe(
                    (assetInvDetails: PagedResult<AssetInvFullDetail>) => {

                        // console.log(JSON.stringify(assetInvDetails));

                        const options = {
                            sheetid: 'Lista inventar',
                            headers: true,
                            column: { style: { Font: { Bold: '1' } } },
                            rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                            cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                        };

                        // alasql(`SELECT id as [Id],
                        //         invNo as [Numar inventar],
                        //         name as [Denumire],
                        //         serialNumber as [Numar serie],
                        //         locationInitial->code as [Cod cladire initiala],
                        //         locationInitial->name as [Cladire initiala],
                        //         roomInitial->code as [Cod centru de cost initial],
                        //         roomInitial->name as [Centru de cost initial],
                        //         locationFinal->code as [Cod cladire finala],
                        //         locationFinal->name as [Cladire finala],
                        //         roomFinal->code as [Cod centru de cost final],
                        //         roomFinal->name as [Centru de cost final],
                        //         info as [Info]
                        //         INTO XLSX('Lista inventar.xlsx',?) FROM ?`, [ options, assetInvDetails.items ]);

                    });
            }

            public exportToExcelGeneralOtp() {

                const params: Array<Param> = this.getFilters();

                this.assetHttpService.get(1, 1000000, 'asset.invNo', 'asc', params, null, 'inventory').subscribe(
                    (assetInvDetails: PagedResult<AssetInvFullDetail>) => {
                        console.log(JSON.stringify(assetInvDetails));
                        const options = {
                            sheetid: 'Centralizator',
                            headers: true,
                            column: { style: { Font: { Bold: '1' } } },
                            rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                            cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                        };
                        // alasql(`SELECT id as [Id],
                        //         invNo as [Numar inventar],
                        //         name as [Denumire],
                        //         serialNumber as [Numar serie],
                        //         locationInitial->code as [Cod cladire initiala],
                        //         locationInitial->name as [Denumire cladire initiala],
                        //         roomInitial->code as [Cod centru de cost initial],
                        //         roomInitial->name as [Centru de cost initial],
                        //         CASE WHEN locationFinal = null THEN locationInitial->code ELSE locationFinal->code END as [Cod locatie finala],
                        //         locationFinal->name as [Denumire locatie finala],
                        //         roomFinal->code as [Cod camera finala],
                        //         roomFinal->name as [Denumire camera finala],
                        //         info as [Info]
                        //         INTO XLSX('Raport general.xlsx',?) FROM ?`, [ options, assetInvDetails.items ]);

                    });
            }

            public exportToExcelAssetNiOtp() {

                const params: Array<Param> = null;

            //     params = this.getFilters();
            //     this.assetNiHttpService
            //         .exportAssetNiOtp(params)
            //         .subscribe((blob) => {
            //     fileSaveAs(blob, 'Temporare.xlsx');
            // });
            }

    public exportToExcelATZ() {

                const params: Array<Param> = this.getFilters();

                this.assetHttpService.get(1, 1000000, 'asset.invNo', 'asc', params, null, 'inventory').subscribe(
                    (assetInvDetails: PagedResult<AssetInvFullDetail>) => {

                        // console.log(JSON.stringify(assetInvDetails));

                        const options = {
                            sheetid: 'mijloace fixe',
                            headers: true,
                            column: { style: { Font: { Bold: '1' } } },
                            rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                            cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                        };

                        // alasql(`SELECT id as [Id],
                        //         invNo as [Numar inventar],
                        //         name as [Denumire],
                        //         locationInitial->name as [Locatie initiala],
                        //         costCenterInitial->code as [Centru de cost initial],
                        //         employeeInitial->firstName as [Gestiune initiala],
                        //         qIntial as [Cantitate initiala],
                        //         locationFinal->name as [Locatie finala],
                        //         costCenterFinal->code as [Centru de cost final],
                        //         employeeFinal->firstName as [Gestiune finala],
                        //         qFinal as [Cantitate finala]
                        //         INTO XLSX('mijloace_fixe.xlsx',?) FROM ?`, [ options, assetInvDetails.items ]);
                    });
            }

            // public exportToExcel() {
            //             let params: Array<Param> = this.getFilters();
            //             this.assetHttpService.get(1, 1000000, 'asset.invNo', 'asc', params, null, 'inventory').subscribe(
            //                 (assetInvDetails: PagedResult<AssetInvFullDetail>) => {
            //                     //console.log(JSON.stringify(assetInvDetails));
            //                     let options = {
            //                         sheetid: 'mijloace fixe',
            //                         headers: true,
            //                         column: { style: { Font: { Bold: '1' } } },
            //                         rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
            //                         cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
            //                     };
            //                     alasql(`SELECT id as [Id],
            //                             invNo as [Numar inventar],
            //                             name as [Denumire],
            //                             locationInitial->code as [Cladire initiala],
            //                             costCenterInitial->code as [Centru de cost initial],
            //                             costCenterInitial->name as [Denumire centru de cost initial],
            //                             employeeInitial->internalCode as [Marca],
            //                             employeeInitial->firstName as [Prenume],
            //                             employeeInitial->lastName as [Nume],
            //                             qIntial as [Cantitate initiala],
            //                             locationFinal->code as [Cladire finala],
            //                             costCenterFinal->code as [Centru de cost finala],
            //                             costCenterFinal->name as [Denumire centru de cost finala],
            //                             employeeIFinal->internalCode as [Marca finala],
            //                             employeeFinal->firstName as [Prenume final],
            //                             employeeFinal->lastName as [Nume final],
            //                             qFinal as [Cantitate finala]
            //                             INTO XLSX('mijloace_fixe.xlsx',?) FROM ?`, [ options, assetInvDetails.items ]);
            //                 });
            //         }
            // public imageCount: number = 0;
            // public imageIndex: number = 0;
            // public imageLoading: boolean = false;
            // public entityFileMemoryDataSource: MemoryDataSource<EntityFile> = new MemoryDataSource();

    public refreshEntityFiles(assetId: number, loadAssetImages: boolean) {
                this.entityFileHttpService.getByEntity('ASSET', assetId, '', 0)
                .subscribe((entityFiles: Array<EntityFile>) => {
                    this.existingAssetImages.splice(0, this.existingAssetImages.length);
                    this.assetImages.forEach((assetImage: AssetImage) => this.existingAssetImages.push(assetImage));
                    this.assetImages.splice(0, this.assetImages.length);
                    this.assetFiles.splice(0, this.assetFiles.length);
                    // this.entityFileMemoryDataSource.clear();
                    entityFiles.forEach((entityFile: EntityFile) => {
                        if (entityFile.fileType.startsWith('image/')) {
                            let fileContent: any = null;
                            this.existingAssetImages.forEach((assetImage: AssetImage) => {
                                if (assetImage.entityFile.id === entityFile.id) {
                                    fileContent = assetImage.fileContent;
                                }
                            });
                            this.assetImages.push(new AssetImage(entityFile, fileContent));
                        } else {
                         this.assetFiles.push(entityFile);
                            // this.entityFileMemoryDataSource.addItem(entityFile);
                        }
                    });
                   // this.fileList.refresh(null);
                    if (loadAssetImages) { this.loadAssetImages(); }
                });
            }

    public loadAssetImages() {
                if ((this.assetImages !== null) && (this.assetImages.length > 0)) {
                    this.imageCount = this.assetImages.length;
                    this.imageIndex = 0;
                    this.imageLoading = true;
                    this.loadAssetImageLoop();
                }
            }

    public loadAssetImageLoop() {
                if (this.assetImages.length > this.imageIndex) {
                    const assetImage: AssetImage = this.assetImages[this.imageIndex];
                    if (assetImage.fileContent === null) {
                        this.entityFileHttpService.download(assetImage.entityFile.id).subscribe((image) => {
                            this.createImageFromBlob(assetImage, image);
                            this.loadNextAssetImage();
                        });
                    } else {
                        this.loadNextAssetImage();
                    }
                }
            }

    public createImageFromBlob(assetImage: AssetImage, image: Blob) {
                const reader = new FileReader();
                reader.addEventListener('load', () => {
                   // this.images.push(reader.result);
                   assetImage.fileContent = reader.result;
                   console.log(assetImage);
                }, false);
                if (image) {
                   reader.readAsDataURL(image);
                }
            }

    public loadNextAssetImage() {
                if (this.imageIndex < (this.assetImages.length - 1)) {
                    this.imageIndex++;
                    this.loadAssetImageLoop();
                } else {
                    this.imageLoading = false;
                }
            }

        collapsed(event: any): void {
        // console.log(event);
        }
        expanded(event: any): void {
        // console.log(event);
        }

        collapsedTemp(event: any): void {
            // console.log(event);
            }
        expandedTemp(event: any): void {
        // console.log(event);
        }

        public get ItemText(): boolean {
            return this.itemText != null && this.itemText !== '' && this.itemText.trim().length > 3;
        }

        public get RefDocNo(): boolean {
            return this.refDocNo != null && this.refDocNo !== '' && this.refDocNo.trim().length > 3;
        }

        public onMinus() {
            this.itemText = '';
            this.refDocNo = '';
            this.operationType = OperationType.Minus;
            this.confirmationMinusMessage = 'Validati activul selectat ca minus de inventar?';
            this.confirmationMinusModal.show();
        }

        public onConfirmationMinusCanceled() {
            this.itemText = '';
            this.refDocNo = '';
            this.operationType = OperationType.NotSet;
            this.confirmationMinusModal.hide();
        }

        public get allowMinusSaving(): boolean {
            return this.assetInvFullDetailList != null && this.assetInvFullDetailList.selectedItems.length > 0 && this.selectedInventory != null;
        }

        public get allowPlusSaving(): boolean {
            return this.assetInvTempDetailListTemp != null && this.assetInvTempDetailListTemp.selectedItem != null && this.selectedInventory != null;
        }


        public saveMinusAsset() {
            this.operationType = OperationType.NotSet;
            this.confirmationMinusModal.hide();
            this.isSaved = false;
            const saveAsset = new SaveAssetInvMinus();
            saveAsset.assetId = this.assetInvFullDetailList.selectedItems.length > 0 ? this.assetInvFullDetailList.selectedItems[0].id : 0;
            saveAsset.inventoryId = this.selectedInventory != null ? this.selectedInventory.id : 0;
            saveAsset.itemText = this.itemText;
            saveAsset.refDocNo = this.refDocNo;
            if (saveAsset != null) {
                this.assetHttpService.newAssetInvMinus(saveAsset)
               .subscribe((result: CreateAssetSAPResult) => {
                   if (result.success) {
                       // this.notificationService.showSuccess('Casare', result.success);
                       this.isSaved = true;
                       this.itemText = '';
                       this.refDocNo = '';
                       this.assetInvFullDetailList.refresh(null);
                   } else if (!result.success) {
                       this.notificationService.showError('Motiv: ' + result.errorMessage + '!', 'Eroare salvare date', 0, false, 0);
                   }
               });
           }
        }

        public onPlus() {
            this.operationType = OperationType.Plus;
            this.confirmationPlusMessage = 'Validati activul selectat ca plus de inventar?';
            this.confirmationPlusModal.show();
        }

        public onConfirmationPlusCanceled() {
            this.operationType = OperationType.NotSet;
            this.confirmationPlusModal.hide();
        }

        public savePlusAsset() {
            this.operationType = OperationType.NotSet;
            this.confirmationPlusModal.hide();
            this.isSaved = false;
            const saveAsset = new SaveAssetInvPlus();
            saveAsset.assetId = this.assetInvTempDetailListTemp.selectedItem != null ? this.assetInvTempDetailListTemp.selectedItem.id : 0;
            saveAsset.inventoryId = this.selectedInventory != null ? this.selectedInventory.id : 0;
            if (saveAsset != null) {
                this.assetHttpService.newAssetInvPlus(saveAsset)
               .subscribe((result: CreateAssetSAPResult) => {
                   if (result.success) {
                       // this.notificationService.showSuccess('Casare', result.success);
                       this.isSaved = true;
                       this.assetInvTempDetailListTemp.refresh(null);
                   } else if (!result.success) {
                       this.notificationService.showError('Motiv: ' + result.errorMessage + '!', 'Eroare salvare date', 0, false, 0);
                   }
               });
           }
        }
}



enum OperationType {
    NotSet = 1,
    Reconciliation = 2,
    Transfer = 3,
    CancelScanned = 4,
    RecoverTemp = 5,
    CancelTempScanned = 6,
    Minus = 7,
    Plus = 8
}
