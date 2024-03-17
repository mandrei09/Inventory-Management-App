import { AccMonthHttpService } from './../../../services/http/accounting/acc-month.http.service';
import { AccMonth } from './../../../model/api/accounting/acc-month';
import { CostCenterHttpService } from './../../../services/http/administration/cost-center.http.service';
import { AppConfig } from './../../../config';
import { Component, EventEmitter, ViewChild} from '@angular/core';
import { Param } from '../../../model/common/param';
import { Department } from '../../../model/api/administration/department';
import { Employee } from '../../../model/api/administration/employee';
import { Location } from '../../../model/api/administration/location';
import { Room } from '../../../model/api/administration/room';
import { RegionHttpService } from '../../../services/http/administration/region.http.service';
import { LocationHttpService } from '../../../services/http/administration/location.http.service';
import { DepartmentHttpService } from '../../../services/http/administration/department.http.service';
import { RoomDetailHttpService } from '../../../services/http/administration/room-detail.http.service';
import { AdmCenterHttpService } from '../../../services/http/administration/adm-center.http.service';
import { AssetHttpService } from '../../../services/http/assets/asset.http.service';
import { InventoryHttpService } from '../../../services/http/inventory/inventory.http.service';
import { DivisionHttpService } from '../../../services/http/administration/division.http.service';
import { EmployeeHttpService } from '../../../services/http/administration/employee.http.service';
import { AssetInvFullDetailListComponent } from './asset-inv-full-detail.list';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DepartmentListComponent } from '../../administrations/departments/department.list';
import { EmployeeListComponent } from '../../administrations/employees/employee.list';
import { AdmCenterListComponent } from '../../administrations/adm-centers/adm-center.list';
import { RegionListComponent } from '../../administrations/regions/region.list';
import { LocationListComponent } from '../../administrations/locations/location.list';
import { RoomListComponent } from '../../administrations/rooms/room.list';
import { CostCenterListComponent } from '../../administrations/cost-centers/cost-center.list';
import { DivisionListComponent } from '../../administrations/divisions/division.list';
import { Inventory } from '../../../model/api/inventory/inventory';
import { CostCenter } from '../../../model/api/administration/cost-center';
import { AdmCenter } from '../../../model/api/administration/adm-center';
import { Division } from '../../../model/api/administration/division';
import { Region } from '../../../model/api/administration/region';
import { AppUtils } from '../../../common/app.utils';
import { InventoryList } from '../../inventory/inventory.list';
import { NotificationService } from '../../../services/notification.service';
import { saveAs as fileSaveAs } from 'file-saver-es';
import { EntityFile } from '../../../model/api/common/entity-file';
import { EntityFileListComponent } from '../../common/entity-file.list';
import { AdministrationHttpService } from '../../../services/http/administration/administration.http.service';
import { EntityFileHttpService } from '../../../services/http/common/entity-file.http.service';
import { MatDialog } from '@angular/material/dialog';
import { UploadInventoryListModalComponent } from '../../common/upload-inventory-list-modal.component';
import { Administration } from '../../../model/api/administration/administration';
import { ReportFilter } from '../../../model/api/inventory/report.filter';
import { EntityFileInventoryListDelete } from '../../common/entity-file-inventory-list-delete';
import { DateRange } from '../../../common/event-emitter';
import { param } from 'jquery';
import { number } from 'echarts';

@Component({
    selector: 'app-asset-inventory-report',
    templateUrl: 'asset-inventory-report.html',
    styleUrls: ['asset-inventory-report.scss'],
    providers: [ AdmCenterHttpService, AssetHttpService, DepartmentHttpService, InventoryHttpService, DivisionHttpService,
        LocationHttpService, RegionHttpService, RoomDetailHttpService, EmployeeHttpService, CostCenterHttpService, AccMonthHttpService ]
})
export class AssetInventoryReportComponent {

    public _selectedInventory: Inventory = null;
    public get selectedInventory(): Inventory { return this._selectedInventory }
    public set selectedInventory(value: Inventory) {
      this._selectedInventory = value;
    }

    public _selectedDepartments: Department[] = [];
    public get selectedDepartments(): Department[] { return this._selectedDepartments }
    public set selectedDepartments(value: Department[]) {
      this._selectedDepartments = value;
    }

    public _selectedCostCenters: CostCenter[] = [];
    public get selectedCostCenters(): CostCenter[] { return this._selectedCostCenters }
    public set selectedCostCenters(value: CostCenter[]) {
      this._selectedCostCenters = value;
      this._selectedCostCenters.length ? 
        this.selectedCostCenterID=this._selectedCostCenters[0].id : 
        this.selectedCostCenterID=null
      this.showEntityFiles()
    }

    public _inventoryDateStart: Date | null = null;
    public get inventoryDateStart(): Date | null { return this._inventoryDateStart; }
    public set inventoryDateStart(value: Date | null) {
      this._inventoryDateStart = value;

    }
  
    public _inventoryDateEnd: Date | null = null;
    public get inventoryDateEnd(): Date | null { return this._inventoryDateEnd; }
    public set inventoryDateEnd(value: Date | null) {
      this._inventoryDateEnd = value;
    }
    public _selectedEmployees: Employee[] = [];
    public get selectedEmployees(): Employee[] { return this._selectedEmployees }
    public set selectedEmployees(value: Employee[]) {
      this._selectedEmployees = value;
      this._selectedEmployees.length ? 
        this.selectedEmployeeId=this._selectedEmployees[0].id : 
        this.selectedEmployeeId=null
      this.showEntityFiles()
    }

    public _selectedDivisions: Division[] = [];

    public get selectedDivisions(): Division[] { return this._selectedDivisions }

    public set selectedDivisions(value: Division[]) {
      this._selectedDivisions = value;
    }

    public get costCenterParams(): Array<Param> {
        let selectedAdministrations: Array<Administration> = null;
        selectedAdministrations = this.selectedAdministrations;
        const params = new Array<Param>();
        params.push(new Param('administrationIds', AppUtils.getIdsList<Administration, number>(selectedAdministrations)));
        return params;
      }

    @ViewChild('assetInvFullDetailList') public assetInvFullDetailList: AssetInvFullDetailListComponent;
    @ViewChild('departmentsModal') public departmentsModal: ModalDirective;
    @ViewChild('confirmationModal') public confirmationModal: ModalDirective;

    @ViewChild('inventoryList') public inventoryList: InventoryList;
    @ViewChild('inventoryListModal') public inventoryListModal: ModalDirective;

    @ViewChild('departmentList') public departmentList: DepartmentListComponent;
    @ViewChild('departmentListModal') public departmentListModal: ModalDirective;

    @ViewChild('employeeList') public employeeList: EmployeeListComponent;
    @ViewChild('employeeListModal') public employeeListModal: ModalDirective;

    @ViewChild('admCenterList') public admCenterList: AdmCenterListComponent;
    @ViewChild('admCenterListModal') public admCenterListModal: ModalDirective;

    @ViewChild('regionList') public regionList: RegionListComponent;
    @ViewChild('regionListModal') public regionListModal: ModalDirective;

    @ViewChild('locationList') public locationList: LocationListComponent;
    @ViewChild('locationListModal') public locationListModal: ModalDirective;

    @ViewChild('roomList') public roomList: RoomListComponent;
    @ViewChild('roomListModal') public roomListModal: ModalDirective;

    @ViewChild('costCenterList') public costCenterList: CostCenterListComponent;
    @ViewChild('costCenterListModal') public costCenterListModal: ModalDirective;

    @ViewChild('divisionList') public divisionList: DivisionListComponent;
    @ViewChild('divisionListModal') public divisionListModal: ModalDirective;

    @ViewChild('EntityFileListComponent') public entityFileList: EntityFileListComponent;

    public entityTypeCode: string = 'INVENTORYBOOK';
    public entityFile: EntityFile = null;


    public selectedEmployee: Employee = null;
    public selectedLocation: Location = null;
    public selectedRoom: Room = null;

    public confirmationMessage: string = "";
    public operationType: number = OperationType.NotSet;

    public filter: string = "";
    public smallPageSize: number = 5;
    public largePageSize: number = 10;

    public notIdentifiedFilter: string = "";
    public conditionType: string = "AND";
    public wordCount: number = 0;
    public wordMinLength: number = 3;
    public letterCount: number = 0;
    public reportTypeCode: string = 'ALL';
    public reportTypeName: string = 'Toate';
    public custody: string = '-';
    public showFilters: boolean = true;
    public showSearchButtoIconClass: string = 'fa fa-search-minus';
    public transferStartDate: Date;
    public transferEndDate: Date;
    public filterPurchaseDate: string;
    public isLoading: boolean = false;
    public selectedCostCenterID : number ;
    public selectedEmployeeId : number ;

    public isPrinted: string = '-';
    public isDuplicate: string = '-';
    public isTemp: string = '-';

    public pageSizeUpdatedEvent: EventEmitter<number> = new EventEmitter<number>();
    public requestInvCompOpRefreshEvent: EventEmitter<Array<Param>> = new EventEmitter<Array<Param>>();
    public requestInvCompDetailRefreshEvent: EventEmitter<Array<Param>> = new EventEmitter<Array<Param>>();

    public reportTypes = [
        { 
            text: 'Lista inventariere', 
            code: 'INVENTORY_LIST', 
            action: () => this.exportA('A') 
        },
        { 
            text: 'Anexa 1 (neinventariate inventar)', 
            code: 'INVENTORY_LIST', 
            action: () => this.exportAMinus('A') 
        },
        { 
            text: 'Anexa 2 (plusuri inventar)', 
            code: 'INVENTORY_LIST', 
            action: () => this.exportAPlus('A') 
        },
        { 
            text: 'Registru neetichetabile', 
            code: 'INVENTORY_LIST', 
            action: () => this.exportAllowLabel() 
        },
        { 
            text: 'Declaratie inainte', 
            code: 'BOOK_BEFORE', 
            action: () => this.exportBookBefore() 
        },
        { 
            text: 'Declaratie dupa', 
            code: 'BOOK_AFTER', 
            action: () => this.exportBookAfter() 
        },
        { 
            text: 'Proces verbal', 
            code: 'PV_BOOK', 
            action: () => this.exportPV() 
        },
      ];

    public selectedAdmCenters: Array<AdmCenter> = new Array<AdmCenter>();
    public selectedRegions: Array<Region> = new Array<Region>();
    public selectedLocations: Array<Location> = new Array<Location>();
    public selectedRooms: Array<Room> = new Array<Room>();
    public months: Array<string> = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'];
    public selectedMonth: number = 0;
    public selectedYear: number = 0;
    public selectedAccMonth: AccMonth = null;
    public inventoryId: number = 0;
    public waitResponse: boolean = false;
    public selectedAdministrations: Array<Administration> = new Array<Administration>();
    public get notScannedViewMode(): boolean { return false; }
    public get useAdmCenter(): boolean { return AppConfig.USE_ADM_CENTER; }
    public get useCostCenter(): boolean { return AppConfig.USE_COST_CENTER; }
    public get useEmployee(): boolean { return AppConfig.USE_EMPLOYEE; }
    public get useDepartment(): boolean { return AppConfig.USE_DEPARTMENT; }
    public get useRegion(): boolean { return AppConfig.USE_REGION; }

    constructor(public assetHttpService: AssetHttpService, public admCenterHttpService: AdmCenterHttpService, public notification: NotificationService,
        public departmentHttpService: DepartmentHttpService, public inventoryHttpService: InventoryHttpService, public divisionHttpService: DivisionHttpService,
        public locationHttpService: LocationHttpService, public regionHttpService: RegionHttpService, public roomDetailHttpService: RoomDetailHttpService,
        public employeeHttpService: EmployeeHttpService, public costCenterHttpService: CostCenterHttpService,  public accMonthHttpService: AccMonthHttpService,
        public dialog: MatDialog, public entityFileHttpService: EntityFileHttpService, public administrationHttpService: AdministrationHttpService) {
    }

ngAfterViewInit() {

        let currentDate: Date = new Date();
        this.selectedMonth = currentDate.getMonth();
        this.selectedYear = currentDate.getFullYear();

        this.updateSelectedAccMonth();
        this.refreshAssets();
    }

    public onReportTypeUpdate(reportTypeCode: string) {
        this.reportTypeCode = reportTypeCode;

        switch(this.reportTypeCode) {
            case 'ALL':
                this.reportTypeName = 'Toate';
                break;
            case 'PLUS':
                this.reportTypeName = 'Plusuri';
                break;
            case 'MINUS':
                this.reportTypeName = 'Minusuri';
                break;
            case 'NOT_IDENTIFIED':
                this.reportTypeName = 'Plusuri etichete temporare';
                break;
            case 'TRANSFER_ROOM_SAME_LOCATION':
                this.reportTypeName = 'Transferuri in Cladire';
                break;
            case 'TRANSFER_LOCATION_SAME_ADMCENTER':
                this.reportTypeName = 'Transferuri in Regiune';
                break;
            case 'TRANSFER_LOCATION_DIFF_ADMCENTER':
                this.reportTypeName = 'Transferuri intre Regiuni';
                break;
        }

        // // this.checkForRefresh();
    }

   /* begin inventory */
    public selectInventory() {
        this.inventoryListModal.show();
        this.inventoryList.selectedItems = new Array<Inventory>();
        this.inventoryList.refresh(null);
    }

    public setSelectedInventory() {
        this.selectedInventory = this.inventoryList.selectedItems != null && this.inventoryList.selectedItems.length > 0 ? this.inventoryList.selectedItems[0] : null;
        this.inventoryListModal.hide();
        // // this.checkForRefresh();
    }
    /* end inventory */

     /*begin costcenter*/
    public selectCostCenters() {

        let selectedAdmCenters: Array<AdmCenter> = null;
        let selectedCostCenters: Array<CostCenter> = null;

        selectedCostCenters = this.selectedCostCenters;
        this.selectedCostCenterID = selectedCostCenters[0].id

        selectedAdmCenters = this.selectedAdmCenters;

        let params = new Array<Param>();
        params.push(new Param("admCenterIds", AppUtils.getIdsList<AdmCenter, number>(selectedAdmCenters)));

        this.costCenterListModal.show();
        this.costCenterList.selectedItems = selectedCostCenters;
        this.costCenterList.refresh(params);
    }

    public removeFromCostCenterSelection(costCenter: CostCenter) {
        let list: Array<CostCenter> = this.selectedCostCenters;
        let index: number = list.indexOf(costCenter);
        list.splice(index, 1);
        // // this.checkForRefresh();
    }

    public clearCostCenterSelection(filtersType: string) {

        this.selectedCostCenters = new Array<CostCenter>();
        this.selectedCostCenterID = null; 
        // this.checkForRefresh();
    }

    
    public setSelectedCostCenters() {
        this.selectedCostCenters = this.costCenterList.selectedItems;
        this.costCenterListModal.hide();
        this.refreshEntityFiles();


        // // this.checkForRefresh();
    }
    /*end costcenter*/

     /*begin asset type*/
     public selectDivisions() {
        this.divisionListModal.show();
        this.divisionList.selectedItems = this.selectedDivisions;
        // console.log('ASSETCLASS: ', this.assetTypeList.selectedItems);
        this.divisionList.refresh(null);
    }

    public removeFromDivisionSelection(division: Division) {
        let index: number = this.selectedDivisions.indexOf(division);
        this.selectedDivisions.splice(index, 1);
        // this.checkForRefresh();
    }

    public clearDivisionSelection() {
        this.selectedDivisions = new Array<Division>();
        // this.checkForRefresh();
    }

    public setSelectedDivisions() {
        this.selectedDivisions = this.divisionList.selectedItems;
        this.divisionListModal.hide();
        // this.checkForRefresh();
    }

    /* end ASSET TYPE */

      /*begin Department */
      public selectDepartments() {
        this.departmentListModal.show();
        this.departmentList.selectedItems = this.selectedDepartments;
        this.departmentList.refresh(null);
    }

    public removeFromDepartmentSelection(department: Department) {
        let index: number = this.selectedDepartments.indexOf(department);
        this.selectedDepartments.splice(index, 1);
        // this.checkForRefresh();
    }

    public clearDepartmentSelection() {
        this.selectedDepartments = new Array<Department>();
        // this.checkForRefresh();
    }

    public setSelectedDepartments() {
        this.selectedDepartments = this.departmentList.selectedItems;
        this.departmentListModal.hide();
        // this.checkForRefresh();
    }

    /* end Department */

     /* begin employee */
    public selectEmployees() {

        let selectedCostCenters: Array<CostCenter> = null;
        let selectedEmployees: Array<Employee> = null;

        selectedCostCenters = this.selectedCostCenters;
        selectedEmployees = this.selectedEmployees;

        let params = new Array<Param>();
        params.push(new Param("costCenterIds", AppUtils.getIdsList<CostCenter, number>(selectedCostCenters)));

        this.employeeListModal.show();
        this.employeeList.selectedItems = this.selectedEmployees;
        this.employeeList.refresh(params);
    }

    public removeFromEmployeeSelection(employee: Employee) {
        let list: Array<Employee> = this.selectedEmployees;
        let index: number = list.indexOf(employee);
        list.splice(index, 1);
        // this.checkForRefresh();
    }

    public clearEmployeeSelection(filtersType: string) {
        this.selectedEmployees = new Array<Employee>();
        // this.checkForRefresh();
    }

    public setSelectedEmployees() {

        this.selectedEmployees = this.employeeList.selectedItems;
        this.employeeListModal.hide();
        // this.checkForRefresh();
    }

    /*end employee*/

   /* begin admCenter */
    public selectAdmCenters() {

        this.admCenterListModal.show();
        this.admCenterList.selectedItems = this.selectedAdmCenters;
        this.admCenterList.refresh(null);
    }

    public removeFromAdmCenterSelection(admCenter: AdmCenter) {
        let list: Array<AdmCenter> = this.selectedAdmCenters;
        let index: number = list.indexOf(admCenter);
        list.splice(index, 1);
        // this.checkForRefresh();
    }

    public clearAdmCenterSelection() {

        this.selectedAdmCenters = new Array<AdmCenter>();
        // this.checkForRefresh();
    }

    public setSelectedAdmCenters() {

        this.selectedAdmCenters = this.admCenterList.selectedItems;
        this.admCenterListModal.hide();
        // this.checkForRefresh();
    }
    /* end admCenter */

   /* begin region */
    public selectRegions() {
        this.regionListModal.show();
        this.regionList.selectedItems = this.selectedRegions;
        this.regionList.refresh(null);
    }

    public removeFromRegionSelection(region: Region) {
        let list: Array<Region> = this.selectedRegions;
        var index: number = list.indexOf(region);
        list.splice(index, 1);
        // this.checkForRefresh();
    }

    public clearRegionSelection() {
        this.selectedRegions = new Array<Region>();
        // this.checkForRefresh();
    }

    public setSelectedRegions() {

        this.selectedRegions = this.regionList.selectedItems;
        this.regionListModal.hide();
        // this.checkForRefresh();
    }
    /* end region */

    /* begin location */
    public selectLocations() {

        let selectedRegions: Array<Region> = null;
        let selectedLocations: Array<Location> = null;
        selectedLocations = this.selectedLocations;
        selectedRegions = this.selectedRegions;
        let params = new Array<Param>();
        params.push(new Param("regionIds", AppUtils.getIdsList<Region, number>(selectedRegions)));

        this.locationListModal.show();
        this.locationList.selectedItems = selectedLocations;
        this.locationList.refresh(params);
    }

    public removeFromLocationSelection(location: Location) {
        let list: Array<Location> = this.selectedLocations;
        var index: number = list.indexOf(location);
        list.splice(index, 1);
        // this.checkForRefresh();
    }

    public clearLocationSelection() {

        this.selectedLocations = new Array<Location>();
        // this.checkForRefresh();
    }

    public setSelectedLocations() {

        this.selectedLocations = this.locationList.selectedItems;
        this.locationListModal.hide();
        // this.checkForRefresh();
    }
    /* end location */

    /* begin room */
    public selectRooms() {
        let selectedRegions: Array<Region> = null;
        let selectedLocations: Array<Location> = null;
        let selectedRooms: Array<Room> = null;
        selectedLocations = this.selectedLocations;
        selectedRegions = this.selectedRegions;
        selectedRooms = this.selectedRooms;

        let params = new Array<Param>();
        params.push(new Param("regionIds", AppUtils.getIdsList<Region, number>(selectedRegions)));
        params.push(new Param("locationIds", AppUtils.getIdsList<Location, number>(selectedLocations)));

        this.roomListModal.show();
        this.roomList.selectedItems = selectedRooms;
        this.roomList.refresh(params);
    }

    public removeFromRoomSelection(room: Room) {
        let list: Array<Room> = this.selectedRooms;
        var index: number = list.indexOf(room);
        list.splice(index, 1);
        // this.checkForRefresh();
    }

    public clearRoomSelection() {
        this.selectedRooms = new Array<Room>();
        // this.checkForRefresh();
    }

    public setSelectedRooms() {
        this.selectedRooms = this.roomList.selectedItems;
        this.roomListModal.hide();
        // this.checkForRefresh();
    }
    /* end room */

    public onCustodyUpdate(custody: string) {
        this.custody = custody;
        // this.checkForRefresh();
    }

    public onToolbarButtonClicked(button: string) {
        this.showFilters = !this.showFilters;
        this.showSearchButtoIconClass = this.showFilters ? 'fa fa-search-minus' : 'fa fa-search-plus';
    }

    public refreshAssets() {
        let params: Array<Param> = this.getFilters();
    }

    public getFilters(): Array<Param> {
      const params = new Array<Param>();
      const reportFilter: ReportFilter = new ReportFilter(this.inventoryDateStart, this.inventoryDateEnd);

      if (this.selectedDivisions != null) {
          reportFilter.divisionIds = new Array<number>();
          this.selectedDivisions.forEach((division) => {
              reportFilter.divisionIds.push(division.id);
          });
      }

      if (this.selectedAdministrations != null) {
        reportFilter.administrationIds = new Array<number>();
          this.selectedAdministrations.forEach((administration) => {
            reportFilter.administrationIds.push(administration.id);
          });
      }

      if (this.selectedDepartments != null) {
          reportFilter.departmentIds = new Array<number>();
          this.selectedDepartments.forEach((department) => {
              reportFilter.departmentIds.push(department.id);
          });
      }

    if (this.selectedCostCenters.length > 0) {
        reportFilter.costCenterIds = new Array<number>();
        this.selectedCostCenterID = this.selectedCostCenters[0].id;
        reportFilter.costCenterIds.push(this.selectedCostCenterID);
    }

    if (this.selectedEmployees != null) {
        reportFilter.employeeIds = new Array<number>();
          this.selectedEmployees.forEach((employee) => {
            reportFilter.employeeIds.push(employee.id);
          });
      }

    reportFilter.isPrinted = ((this.isPrinted === '-') ? null : (this.isPrinted === 'DA' ? true : false));
    reportFilter.isDuplicate = ((this.isDuplicate === '-') ? null : (this.isDuplicate === 'DA' ? true : false));
    reportFilter.isTemp = ((this.isTemp === '-') ? null : (this.isTemp === 'DA' ? true : false));
    reportFilter.inventoryDateEnd = this.inventoryDateEnd;
    reportFilter.inventoryDateStart = this.inventoryDateStart;

    params.push(new Param('inventoryId', this.selectedInventory != null ? this.selectedInventory.id.toString() : '14'));
    params.push(new Param('jsonFilter', JSON.stringify(reportFilter)));
    return params;
}

    public onIsDuplicateUpdate(isDuplicate: string) {
      this.isDuplicate = isDuplicate;
    }

    public refreshNotIdentified() {
        let params: Array<Param> = this.getNotIdentifieFilters();
        this.requestInvCompDetailRefreshEvent.emit(params);
    }

    public clearFilters() {

        this.selectedCostCenterID = null;
        this.selectedInventory = null
        this.selectedRegions = new Array<Region>();
        this.selectedAdmCenters= new Array<AdmCenter>();
        this.selectedCostCenterID = null;
        this.selectedCostCenters = new Array<CostCenter>();
        this.selectedDepartments = new Array<Department>();
        this.selectedEmployees = new Array<Employee>();
        this.selectedRooms = new Array<Room>();
        this.selectedDivisions = new Array<Division>();
        this.selectedLocations = new Array<Location>();
        this.selectedAdministrations = new Array<Administration>();
        this.waitResponse = false;
        this.inventoryDateStart = null;
        this.inventoryDateEnd = null;
        this.showEntityFiles();
        this.filter = '';
    }

    public parseStartDate(dateString: string): Date {
        if (dateString) {
            this.transferStartDate = new Date(dateString);
            this.transferEndDate = new Date();
            // this.checkForRefresh();
            return new Date(dateString);
        } else {
            return null;
        }
    }
    public parseEndDate(dateString: string): Date {
        if (dateString) {
            this.transferEndDate = new Date(dateString);
            // this.checkForRefresh();
            return new Date(dateString);
        } else {
            return null;
        }
    }

    public exportToExcelApaNova() {

        let inventoryId: number = this.selectedInventory.id;
        let location: Location = this.selectedLocations[0];

        if (confirm(`Descarcati datele pentru Gestiune ${location.code}?`)) {
            this.isLoading = true;

            // this.assetHttpService
            //     .exportApaNova(inventoryId , location.id)
            //     .subscribe((blob) => {
            //         fileSaveAs(blob, this.selectedLocations[0].code + '.zip');
            //         this.isLoading = false;
            //     });
        }
    }

    public getSearchFilters(filter: string, wordCount: number, letterCount: number, wordMinLength: number): string[] {
        let result: Array<string> = new Array<string>();
        let filters: string[] = null;

        filter = filter.replace("-", " ").replace("+", " ").replace(".", " ").replace(",", " ").replace("/", " ").replace("\\", " ");
        while (filter.includes("  ")) filter = filter.replace("  ", " ");
        filters = filter.split(" ");

        //console.log('filters: ' + JSON.stringify(filters));

        filters.forEach((f) => {
            if ((f.length >= wordMinLength) && ((wordCount <= 0) || (result.length < wordCount))) {
                result.push(letterCount > 0 ? (f.length <= letterCount ? f : f.substring(0, letterCount)) : f);
            }
        });

        return result;
    }

    public getNotIdentifieFilters(): Array<Param> {
        let params = new Array<Param>();
        let filters: string[] = this.getSearchFilters(this.notIdentifiedFilter, this.wordCount, this.letterCount, this.wordMinLength);
        //console.log(JSON.stringify(filters));

        params.push(new Param("inventoryId", JSON.stringify(1)));
        params.push(new Param("filters", JSON.stringify(filters)));
	    params.push(new Param("conditionType", this.conditionType));

        return params;
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
        if (this.selectedMonth == 12) {
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
        if (this.selectedMonth == 1) {
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
            // this.checkForRefresh();
        });
    }

    public reportInventoryList(reportTypeCode: string) {
            let reportType: string = "";
            let inventoryId: number = this.selectedInventory.id;
            let url: string = '';

            reportType = "inventorylistthales";

            url = `${AppConfig.reportingServer}Report.aspx/?report=${reportType}&inventoryId=${inventoryId}&reportType=${reportTypeCode}`;

            if (this.selectedLocations != null && (this.selectedLocations.length > 0)){
                let locationId: number = this.selectedLocations[0].id;
                url += `&locationId=${locationId}`;
            }
             window.open(url);
    }

    public reportTransferIn(reportTypeCode: string) {
        //if ((this.selectedInventory != null) && (this.selectedRegions != null) && (this.selectedRegions.length > 0)) {
            let reportType: string = "transferinv1";
            let inventoryId: number = this.selectedInventory.id;
            let url: string = '';

            url = `${AppConfig.reportingServer}Report.aspx/?report=${reportType}&inventoryId=${inventoryId}&reportType=${reportTypeCode}`

            if (this.selectedAdmCenters != null && (this.selectedAdmCenters.length > 0)){
                let admCenterId: number = this.selectedAdmCenters[0].id;
                url += `&admCenterId=${admCenterId}`;
            }

            if (this.selectedCostCenters != null && (this.selectedCostCenters.length > 0)){
                let costCenterId: number = this.selectedCostCenters[0].id;
                url += `&costCenterId=${costCenterId}`;
            }

            if (this.selectedRegions != null && (this.selectedRegions.length > 0)){
                let regionId: number = this.selectedRegions[0].id;
                url += `&regionId=${regionId}`;
            }

            if (this.selectedLocations != null && (this.selectedLocations.length > 0)){
                let locationId: number = this.selectedLocations[0].id;
                url += `&locationId=${locationId}`;
            }

            let custody: boolean = ((this.custody === '-') ? null : (this.custody === 'YES' ? true : false));
            if (custody != null)
            {
                url += `&custody=${custody}`;
            }

            window.open(url);
        // }
        // else {
        //     alert('Verificati data ati selectat cel putin un inventar si o regiune!');
        // }
    }

    public reportGeneral(reportTypeCode: string) {
        //if ((this.selectedInventory != null) && (this.selectedRegions != null) && (this.selectedRegions.length > 0)) {
            let reportType: string = "general";
            let inventoryId: number = this.selectedInventory.id;
            let accMonthId: number = this.selectedAccMonth.id;
            let url: string = '';

            url = `${AppConfig.reportingServer}Report.aspx/?report=${reportType}&accMonthId=${accMonthId}&inventoryId=${inventoryId}&reportType=${reportTypeCode}`

            if (this.selectedAdmCenters != null && (this.selectedAdmCenters.length > 0)){
                let admCenterId: number = this.selectedAdmCenters[0].id;
                url += `&admCenterId=${admCenterId}`;
            }

            if (this.selectedCostCenters != null && (this.selectedCostCenters.length > 0)){
                let costCenterId: number = this.selectedCostCenters[0].id;
                url += `&costCenterId=${costCenterId}`;
            }

            if (this.selectedRegions != null && (this.selectedRegions.length > 0)){
                let regionId: number = this.selectedRegions[0].id;
                url += `&regionId=${regionId}`;
            }

            if (this.selectedLocations != null && (this.selectedLocations.length > 0)){
                let locationId: number = this.selectedLocations[0].id;
                url += `&locationId=${locationId}`;
            }

            let custody: boolean = ((this.custody === '-') ? null : (this.custody === 'YES' ? true : false));
            if (custody != null)
            {
                url += `&custody=${custody}`;
            }

            window.open(url);
        // }
        // else {
        //     alert('Verificati data ati selectat cel putin un inventar si o regiune!');
        // }
    }

    public reportTransferOut() {
        //if ((this.selectedInventory != null) && (this.selectedRegions != null) && (this.selectedRegions.length > 0)) {
            let reportType: string = "transferoutv1";
            let inventoryId: number = this.selectedInventory.id;
            let url: string = '';

            url = `${AppConfig.reportingServer}Report.aspx/?report=${reportType}&inventoryId=${inventoryId}`;

            if (this.selectedAdmCenters != null && (this.selectedAdmCenters.length > 0)){
                let admCenterId: number = this.selectedAdmCenters[0].id;
                url += `&admCenterId=${admCenterId}`;
            }

            if (this.selectedCostCenters != null && (this.selectedCostCenters.length > 0)){
                let costCenterId: number = this.selectedCostCenters[0].id;
                url += `&costCenterId=${costCenterId}`;
            }

            if (this.selectedRegions != null && (this.selectedRegions.length > 0)){
                let regionId: number = this.selectedRegions[0].id;
                url += `&regionId=${regionId}`;
            }

            if (this.selectedLocations != null && (this.selectedLocations.length > 0)){
                let locationId: number = this.selectedLocations[0].id;
                url += `&locationId=${locationId}`;
            }

            let custody: boolean = ((this.custody === '-') ? null : (this.custody === 'YES' ? true : false));
            if (custody != null)
            {
                url += `&custody=${custody}`;
            }

            window.open(url);
        // }
        // else {
        //     alert('Verificati data ati selectat un inventar si o regiune!');
        // }
    }

    public reportInventoryListEmag() {


        let inventoryId: number = this.selectedInventory.id;
        let url: string = '';
            if (this.selectInventory.length > 0 || this.selectedCostCenters.length !== 1){
                return;
            }

            let reportType = 'INVENTORYLISTEMAG';

            url = `${AppConfig.reportingServer}Report.aspx/?report=${reportType}&inventoryId=${inventoryId}`;

        if (this.selectedAdmCenters != null && (this.selectedAdmCenters.length > 0)){
            let admCenterId: number = this.selectedAdmCenters[0].id;
            url += `&admCenterId=${admCenterId}`;
        }

        // if (this.selectedCompanies != null && (this.selectedCompanies.length > 0)){
        //     let companyId: number = this.selectedCompanies[0].id;
        //     url += `&companyId=${companyId}`;
        // }

        // if (this.selectedAdministrations != null && (this.selectedAdministrations.length > 0)){
        //     let administrationId: number = this.selectedAdministrations[0].id;
        //     url += `&administrationId=${administrationId}`;
        // }

        if (this.selectedCostCenters != null && (this.selectedCostCenters.length > 0)){
            let costCenterId: number = this.selectedCostCenters[0].id;
            url += `&costCenterId=${costCenterId}`;
        }

        if (this.selectedRegions != null && (this.selectedRegions.length > 0)){
            let regionId: number = this.selectedRegions[0].id;
            url += `&regionId=${regionId}`;
        }

        if (this.selectedLocations != null && (this.selectedLocations.length > 0)){
            let locationId: number = this.selectedLocations[0].id;
            url += `&locationId=${locationId}`;
        }

        if (this.selectedRooms != null && (this.selectedRooms.length > 0)){
            let roomId: number = this.selectedRooms[0].id;
            url += `&roomId=${roomId}`;
        }

        // if (this.selectedAccAccounts != null && (this.selectedAccAccounts.length > 0)){
        //     let accAccountId: number = this.selectedAccAccounts[0].id;
        //     url += `&accAccountId=${accAccountId}`;
        // }

        // if (this.reportFilter === 'Imobilizari in curs') {
        //     let param = 'A';
        //     url += `&reportFilter=${param}`;
        // } else if (this.reportFilter === 'Imobilizari corporale') {
        //     let param = 'B';
        //     url += `&reportFilter=${param}`;
        // } else if (this.reportFilter === 'Imobilizari necorporale') {
        //     let param = 'C';
        //     url += `&reportFilter=${param}`;
        // } else {
        //     let param = 'D';
        //     url += `&reportFilter=${param}`;
        // }

        window.open(url);

    return;
}

public reportInventoryListEmpPetrom() {


    let inventoryId: number = this.selectedInventory.id;
    let url: string = '';
        if (this.selectInventory.length > 0 || this.selectedCostCenters.length !== 1){
            return;
        }

        let reportType = 'INVENTORYLISTEMPEMAG';

        url = `${AppConfig.reportingServer}Report.aspx/?report=${reportType}&inventoryId=${inventoryId}`;

    if (this.selectedAdmCenters != null && (this.selectedAdmCenters.length > 0)){
        let admCenterId: number = this.selectedAdmCenters[0].id;
        url += `&admCenterId=${admCenterId}`;
    }

    // if (this.selectedCompanies != null && (this.selectedCompanies.length > 0)){
    //     let companyId: number = this.selectedCompanies[0].id;
    //     url += `&companyId=${companyId}`;
    // }

    // if (this.selectedAdministrations != null && (this.selectedAdministrations.length > 0)){
    //     let administrationId: number = this.selectedAdministrations[0].id;
    //     url += `&administrationId=${administrationId}`;
    // }

    if (this.selectedCostCenters != null && (this.selectedCostCenters.length > 0)){
        let costCenterId: number = this.selectedCostCenters[0].id;
        url += `&costCenterId=${costCenterId}`;
    }

    if (this.selectedRegions != null && (this.selectedRegions.length > 0)){
        let regionId: number = this.selectedRegions[0].id;
        url += `&regionId=${regionId}`;
    }

    if (this.selectedLocations != null && (this.selectedLocations.length > 0)){
        let locationId: number = this.selectedLocations[0].id;
        url += `&locationId=${locationId}`;
    }

    if (this.selectedRooms != null && (this.selectedRooms.length > 0)){
        let roomId: number = this.selectedRooms[0].id;
        url += `&roomId=${roomId}`;
    }

    // if (this.selectedAccAccounts != null && (this.selectedAccAccounts.length > 0)){
    //     let accAccountId: number = this.selectedAccAccounts[0].id;
    //     url += `&accAccountId=${accAccountId}`;
    // }
    window.open(url);

return;
}

public reportInventoryListEmpFinalPetrom() {


    let inventoryId: number = this.selectedInventory.id;
    let url: string = '';
        if (this.selectInventory.length > 0 || this.selectedCostCenters.length !== 1){
            return;
        }

        let reportType = 'INVENTORYLISTEMPFINALEMAG';

        url = `${AppConfig.reportingServer}Report.aspx/?report=${reportType}&inventoryId=${inventoryId}`;

    if (this.selectedAdmCenters != null && (this.selectedAdmCenters.length > 0)){
        let admCenterId: number = this.selectedAdmCenters[0].id;
        url += `&admCenterId=${admCenterId}`;
    }

    // if (this.selectedCompanies != null && (this.selectedCompanies.length > 0)){
    //     let companyId: number = this.selectedCompanies[0].id;
    //     url += `&companyId=${companyId}`;
    // }

    // if (this.selectedAdministrations != null && (this.selectedAdministrations.length > 0)){
    //     let administrationId: number = this.selectedAdministrations[0].id;
    //     url += `&administrationId=${administrationId}`;
    // }

    if (this.selectedCostCenters != null && (this.selectedCostCenters.length > 0)){
        let costCenterId: number = this.selectedCostCenters[0].id;
        url += `&costCenterId=${costCenterId}`;
    }

    if (this.selectedRegions != null && (this.selectedRegions.length > 0)){
        let regionId: number = this.selectedRegions[0].id;
        url += `&regionId=${regionId}`;
    }

    if (this.selectedLocations != null && (this.selectedLocations.length > 0)){
        let locationId: number = this.selectedLocations[0].id;
        url += `&locationId=${locationId}`;
    }

    if (this.selectedRooms != null && (this.selectedRooms.length > 0)){
        let roomId: number = this.selectedRooms[0].id;
        url += `&roomId=${roomId}`;
    }

    // if (this.selectedAccAccounts != null && (this.selectedAccAccounts.length > 0)){
    //     let accAccountId: number = this.selectedAccAccounts[0].id;
    //     url += `&accAccountId=${accAccountId}`;
    // }
    window.open(url);

return;
}

public reportInventoryListResultEmag() {


    let inventoryId: number = this.selectedInventory.id;
    let url: string = '';
        if (this.selectInventory.length > 0 || this.selectedCostCenters.length !== 1){
            return;
        }

        let reportType = 'INVENTORYRESULT';

        url = `${AppConfig.reportingServer}Report.aspx/?report=${reportType}&inventoryId=${inventoryId}`;

    if (this.selectedAdmCenters != null && (this.selectedAdmCenters.length > 0)){
        let admCenterId: number = this.selectedAdmCenters[0].id;
        url += `&admCenterId=${admCenterId}`;
    }

    // if (this.selectedCompanies != null && (this.selectedCompanies.length > 0)){
    //     let companyId: number = this.selectedCompanies[0].id;
    //     url += `&companyId=${companyId}`;
    // }

    // if (this.selectedAdministrations != null && (this.selectedAdministrations.length > 0)){
    //     let administrationId: number = this.selectedAdministrations[0].id;
    //     url += `&administrationId=${administrationId}`;
    // }

    if (this.selectedCostCenters != null && (this.selectedCostCenters.length > 0)){
        let costCenterId: number = this.selectedCostCenters[0].id;
        url += `&costCenterId=${costCenterId}`;
    }

    if (this.selectedRegions != null && (this.selectedRegions.length > 0)){
        let regionId: number = this.selectedRegions[0].id;
        url += `&regionId=${regionId}`;
    }

    if (this.selectedLocations != null && (this.selectedLocations.length > 0)){
        let locationId: number = this.selectedLocations[0].id;
        url += `&locationId=${locationId}`;
    }

    if (this.selectedRooms != null && (this.selectedRooms.length > 0)){
        let roomId: number = this.selectedRooms[0].id;
        url += `&roomId=${roomId}`;
    }

    // if (this.selectedAccAccounts != null && (this.selectedAccAccounts.length > 0)){
    //     let accAccountId: number = this.selectedAccAccounts[0].id;
    //     url += `&accAccountId=${accAccountId}`;
    // }

    window.open(url);

return;
}

public inventoryLabel() {
    let reportType: string = 'inventorylabel';
    let inventoryId: number = this.selectedInventory.id;
    let url: string = '';

    url = `${AppConfig.reportingServer}Report.aspx/?report=${reportType}&inventoryId=${inventoryId}`;

    if (this.selectedCostCenters != null && (this.selectedCostCenters.length > 0)){
        let costCenterId: number = this.selectedCostCenters[0].id;
        url += `&costCenterId=${costCenterId}`;
    }

    // if (this.selectedAssetTypes != null && (this.selectedAssetTypes.length > 0)){
    //     let roomId: number = this.selectedAssetTypes[0].id;
    //     url += `&assetTypeId=${roomId}`;
    // }

    window.open(url);
// }
// else {
//     alert('Verificati data ati selectat cel putin un inventar si o regiune!');
// }
}

// exportA(reportType: string) {
//   if (this.selectedInventory == null) {
//     this.notification.showWarning('Va rugam selectati un inventar!!', '', 0, false, 0)
//       return;
//   }

//   if (this.selectedCostCenters.length === 0) {
//     this.notification.showWarning('Va rugam selectati un centru de cost!!', '', 0, false, 0)
//       return;
//   }

//   let inventoryId: number | null = -1;
//   let costCenterId: number | null = -1;
//   this.waitResponse = true;

//   if ((this.selectedInventory !== null) && (this.selectedInventory !== undefined)) {
//     inventoryId = this.selectedInventory.id;
//   }

//   if (this.selectedCostCenters.length > 0) {
//     costCenterId = this.selectedCostCenters[0].id;
//   }

//   this.inventoryHttpService.viewList(inventoryId, costCenterId).subscribe((res)=> {
//     // if(res.success){
//     //   this.waitResponse = false;
//     // }
//     // console.log(res);
//     // tslint:disable-next-line:no-non-null-assertion
//     fileSaveAs(res!.body, this.selectedCostCenters[0].code + '_Lista inventar.pdf');
//     this.waitResponse = false;
//   });
// }

// exportAMinus(reportType: string) {
//   if (this.selectedInventory == null) {
//     this.notification.showWarning('Va rugam selectati un inventar!!', '', 0, false, 0)
//       return;
//   }

//   if (this.selectedCostCenters.length === 0) {
//     this.notification.showWarning('Va rugam selectati un centru de cost!!', '', 0, false, 0)
//       return;
//   }
//   let inventoryId: number | null = -1;
//   let costCenterId: number | null = -1;
//   this.waitResponse = true;

//   if ((this.selectedInventory !== null) && (this.selectedInventory !== undefined)) {
//     inventoryId = this.selectedInventory.id;
//   }

//   if (this.selectedCostCenters.length > 0) {
//     costCenterId = this.selectedCostCenters[0].id;
//   }

//   this.inventoryHttpService.viewListMinus(inventoryId, costCenterId).subscribe((res)=> {
//     // if(res.success){
//     //   this.waitResponse = false;
//     // }
//     // console.log(res);
//     fileSaveAs(res!.body, this.selectedCostCenters[0].code + '_Lista inventar.pdf');
//     this.waitResponse = false;
//   })
// }

// exportAPlus(reportType: string) {
//   if (this.selectedInventory == null) {
//     this.notification.showWarning('Va rugam selectati un inventar!!', '', 0, false, 0)
//       return;
//   }

//   if (this.selectedCostCenters.length === 0) {
//     this.notification.showWarning('Va rugam selectati un centru de cost!!', '', 0, false, 0)
//       return;
//   }
//   let inventoryId: number | null = -1;
//   let costCenterId: number | null = -1;
//   this.waitResponse = true;

//   if ((this.selectedInventory !== null) && (this.selectedInventory !== undefined)) {
//     inventoryId = this.selectedInventory.id;
//   }

//   if (this.selectedCostCenters.length > 0) {
//     costCenterId = this.selectedCostCenters[0].id;
//   }

//   this.inventoryHttpService.viewListPlus(inventoryId, costCenterId).subscribe((res)=> {
//     // if(res.success){
//     //   this.waitResponse = false;
//     // }
//     // console.log(res);
//     fileSaveAs(res!.body, this.selectedCostCenters[0].code + '_Lista inventar.pdf');
//     this.waitResponse = false;
//   })
// }

// exportBookBefore() {
//   if (this.selectedInventory == null) {
//     this.notification.showWarning('Va rugam selectati un inventar!!', '', 0, false, 0)
//       return;
//   }

//   if (this.selectedCostCenters.length === 0) {
//     this.notification.showWarning('Va rugam selectati un centru de cost!!', '', 0, false, 0)
//       return;
//   }
//   let inventoryId: number | null = -1;
//   let costCenterId: number | null = -1;
//   this.waitResponse = true;

//   if ((this.selectedInventory !== null) && (this.selectedInventory !== undefined)) {
//     inventoryId = this.selectedInventory.id;
//   }

//   if (this.selectedCostCenters.length > 0) {
//     costCenterId = this.selectedCostCenters[0].id;
//   }

//   this.inventoryHttpService.bookBefore(inventoryId, costCenterId).subscribe((res)=> {
//     // if(res.success){
//     //   this.waitResponse = false;
//     // }
//     // console.log(res);
//     fileSaveAs(res!.body, this.selectedCostCenters[0].code + '_Declaratie inainte de inventar.pdf');
//     this.waitResponse = false;
//   })
// }

// exportBookAfter() {
//   if (this.selectedInventory == null) {
//     this.notification.showWarning('Va rugam selectati un inventar!!', '', 0, false, 0)
//       return;
//   }

//   if (this.selectedCostCenters.length === 0) {
//     this.notification.showWarning('Va rugam selectati un centru de cost!!', '', 0, false, 0)
//       return;
//   }
//   let inventoryId: number | null = -1;
//   let costCenterId: number | null = -1;
//   this.waitResponse = true;

//   if ((this.selectedInventory !== null) && (this.selectedInventory !== undefined)) {
//     inventoryId = this.selectedInventory.id;
//   }

//   if (this.selectedCostCenters.length > 0) {
//     costCenterId = this.selectedCostCenters[0].id;
//   }

//   this.inventoryHttpService.bookAfter(inventoryId, costCenterId).subscribe((res)=> {
//     // if(res.success){
//     //   this.waitResponse = false;
//     // }
//     // console.log(res);
//     fileSaveAs(res!.body, this.selectedCostCenters[0].code + '_Declaratie dupa inventar.pdf');
//     this.waitResponse = false;
//   })
// }

// exportPV() {
//   if (this.selectedInventory == null) {
//     this.notification.showWarning('Va rugam selectati un inventar!!', '', 0, false, 0)
//       return;
//   }

//   if (this.selectedCostCenters.length === 0) {
//     this.notification.showWarning('Va rugam selectati un centru de cost!!', '', 0, false, 0)
//       return;
//   }
//   let inventoryId: number | null = -1;
//   let costCenterId: number | null = -1;
//   this.waitResponse = true;

//   if ((this.selectedInventory !== null) && (this.selectedInventory !== undefined)) {
//     inventoryId = this.selectedInventory.id;
//   }

//   if (this.selectedCostCenters.length > 0) {
//     costCenterId = this.selectedCostCenters[0].id;
//   }

//   this.inventoryHttpService.bookPV(inventoryId, costCenterId).subscribe((res)=> {
//     // if(res.success){
//     //   this.waitResponse = false;
//     // }
//     // console.log(res);
//     fileSaveAs(res!.body, this.selectedCostCenters[0].code + '_Proces verbal inventariere.pdf');
//     this.waitResponse = false;
//   })
// }

// exportAllowLabel() {
//   if (this.selectedInventory == null) {
//     this.notification.showWarning('Va rugam selectati un inventar!!', '', 0, false, 0)
//       return;
//   }

//   if (this.selectedCostCenters.length === 0) {
//     this.notification.showWarning('Va rugam selectati un centru de cost!!', '', 0, false, 0)
//       return;
//   }
//   let inventoryId: number | null = -1;
//   let costCenterId: number | null = -1;
//   this.waitResponse = true;

//   if ((this.selectedInventory !== null) && (this.selectedInventory !== undefined)) {
//     inventoryId = this.selectedInventory.id;
//   }

//   if (this.selectedCostCenters.length > 0) {
//     costCenterId = this.selectedCostCenters[0].id;
//   }

//   this.inventoryHttpService.allowLabelList(inventoryId, costCenterId).subscribe((res)=> {
//     // if(res.success){
//     //   this.waitResponse = false;
//     // }
//     // console.log(res);
//     fileSaveAs(res!.body, this.selectedCostCenters[0].code + '_Registru neetichetabile.pdf');
//     this.waitResponse = false;
//   })
// }

exportA(reportType: string) {

    let params: Array<Param> = null;
    params = this.getFilters();

    if (this.selectedInventory == null) {
        this.notification.showWarning('Va rugam selectati un inventar!', '', 0, false, 0)
        return;
    }

    this.waitResponse = true;
    
    let suffix: string = "_lista_inventar.pdf";

    let prefix: string = this.selectedInventory.description + "_"
    if (this.selectedCostCenters.length > 0) prefix += this.selectedCostCenters[0].code;
    else if (this.selectedDivisions.length > 0) prefix += this.selectedDivisions[0].name;
    else if (this.selectedDepartments.length > 0) prefix += this.selectedDepartments[0].name
    else prefix += this.selectedAdministrations[0].name;

    let fileName = prefix + suffix;

    this.notification.showSuccess('Se genereaza documentul solicitat!', '',1000, 0, 0)
    this.inventoryHttpService.viewList(params)
    .subscribe(
        (res)=>{
            fileSaveAs(res!.body, fileName);
            this.waitResponse = false;
        },
        (error) => {                             
            this.notification.showError('Nu exista date in raportul generat!', '',3000, 0, 0)
            this.waitResponse = false;
            return;
          }
    )

}

exportAMinus(reportType: string) {

    let params: Array<Param> = null;
    params = this.getFilters();

    if (this.selectedInventory == null) {
    this.notification.showWarning('Va rugam selectati un inventar!!', '', 0, false, 0)
        return;
    }

    if (this.selectedCostCenters.length === 0 && this.selectedDivisions.length === 0 && this.selectedDepartments.length === 0 && this.selectedAdministrations.length === 0) {
    this.notification.showWarning('Va rugam selectati un centru de cost , un departament un B.U. sau o locatie!!', '', 0, false, 0)
        return;
    }

    this.waitResponse = true;

    let suffix: string = '_Lista inventar_minusuri.pdf';

    let prefix: string = this.selectedInventory.description + "_"
    if (this.selectedCostCenters.length > 0) prefix += this.selectedCostCenters[0].code;
    else if (this.selectedDivisions.length > 0) prefix += this.selectedDivisions[0].name;
    else if (this.selectedDepartments.length > 0) prefix += this.selectedDepartments[0].name
    else prefix += this.selectedAdministrations[0].name;

    let fileName = prefix + suffix;

    this.notification.showSuccess('Se genereaza documentul solicitat!', '',1000, 0, 0)

    this.inventoryHttpService.viewListMinus(params)
    .subscribe(
        (res)=>{
            fileSaveAs(res!.body, fileName);
            this.waitResponse = false;
        },
        (error) => {                             
            this.notification.showError('Nu exista date in raportul generat!', '',3000, 0, 0)
            this.waitResponse = false;
            return;
          }
    )
}

exportAPlus(reportType: string) {

    let params: Array<Param> = null;
    params = this.getFilters();

    if (this.selectedInventory == null) {
    this.notification.showWarning('Va rugam selectati un inventar!!', '', 0, false, 0)
        return;
    }

    if (this.selectedCostCenters.length === 0 && this.selectedDivisions.length === 0 && this.selectedDepartments.length === 0 && this.selectedAdministrations.length === 0) {
    this.notification.showWarning('Va rugam selectati un centru de cost , un departament un B.U. sau o locatie!!', '', 0, false, 0)
        return;
    }

    this.waitResponse = true;

    let suffix: string = '_Lista inventar_plusuri.pdf';

    let prefix: string = this.selectedInventory.description + "_"
    if (this.selectedCostCenters.length > 0) prefix += this.selectedCostCenters[0].code;
    else if (this.selectedDivisions.length > 0) prefix += this.selectedDivisions[0].name;
    else if (this.selectedDepartments.length > 0) prefix += this.selectedDepartments[0].name
    else prefix += this.selectedAdministrations[0].name;

    let fileName = prefix + suffix;

    this.notification.showSuccess('Se genereaza documentul solicitat!', '',1000, 0, 0)

    this.inventoryHttpService.viewListPlus(params)
    .subscribe(
        (res)=>{
            fileSaveAs(res!.body, fileName);
            this.waitResponse = false;
        },
        (error) => {                             
            this.notification.showError('Nu exista date in raportul generat!', '',3000, 0, 0)
            this.waitResponse = false;
            return;
          }
    )
}

exportBookBefore() {

    let params: Array<Param> = null;
        params = this.getFilters();

    if (this.selectedInventory == null) {
        this.notification.showWarning('Va rugam selectati un inventar!!', '', 0, false, 0)
        return;
    }

    if (this.selectedCostCenters.length === 0 && this.selectedDivisions.length === 0 && this.selectedDepartments.length === 0 && this.selectedAdministrations.length === 0) {
        this.notification.showWarning('Va rugam selectati un centru de cost , un departament un B.U. sau o locatie!!', '', 0, false, 0)
        return;
    }
    
    this.waitResponse = true;

    let suffix: string = '_Declaratie_gestionar_inainte.pdf';

    let prefix: string = this.selectedInventory.description + "_"
    if (this.selectedCostCenters.length > 0) prefix += this.selectedCostCenters[0].code;
    else if (this.selectedDivisions.length > 0) prefix += this.selectedDivisions[0].name;
    else if (this.selectedDepartments.length > 0) prefix += this.selectedDepartments[0].name
    else prefix += this.selectedAdministrations[0].name;

    let fileName = prefix + suffix;

    this.notification.showSuccess('Se genereaza documentul solicitat!', '',1000, 0, 0)

    this.inventoryHttpService.bookBefore(params)
    .subscribe(
        (res)=>{
            fileSaveAs(res!.body, fileName);
            this.waitResponse = false;
        },
        (error) => {                             
            this.notification.showError('Nu exista date in raportul generat!', '',3000, 0, 0)
            this.waitResponse = false;
            return;
          }
    )
}

exportBookAfter() {

    let params: Array<Param> = null;
    params = this.getFilters();

    if (this.selectedInventory == null) {
    this.notification.showWarning('Va rugam selectati un inventar!!', '', 0, false, 0)
        return;
    }

    if (this.selectedCostCenters.length === 0 && this.selectedDivisions.length === 0 && this.selectedDepartments.length === 0 && this.selectedAdministrations.length === 0) {
    this.notification.showWarning('Va rugam selectati un centru de cost , un departament un B.U. sau o locatie!!', '', 0, false, 0)
        return;
    }

    this.waitResponse = true;

    let suffix: string = '_Declaratie_gestionar_dupa.pdf';

    let prefix: string = this.selectedInventory.description + "_"
    if (this.selectedCostCenters.length > 0) prefix += this.selectedCostCenters[0].code;
    else if (this.selectedDivisions.length > 0) prefix += this.selectedDivisions[0].name;
    else if (this.selectedDepartments.length > 0) prefix += this.selectedDepartments[0].name
    else prefix += this.selectedAdministrations[0].name;

    let fileName = prefix + suffix;

    this.notification.showSuccess('Se genereaza documentul solicitat!', '',1000, 0, 0)

    this.inventoryHttpService.bookAfter(params)
    .subscribe(
        (res)=>{
            fileSaveAs(res!.body, fileName);
            this.waitResponse = false;
        },
        (error) => {                             
            this.notification.showError('Nu exista date in raportul generat!', '',3000, 0, 0)
            this.waitResponse = false;
            return;
          }
    )
}

exportPV() {

    let params: Array<Param> = null;
    params = this.getFilters();


    if (this.selectedInventory == null) {
    this.notification.showWarning('Va rugam selectati un inventar!!', '', 0, false, 0)
        return;
    }

    if (this.selectedCostCenters.length === 0 && this.selectedDivisions.length === 0 && this.selectedDepartments.length === 0 && this.selectedAdministrations.length === 0) {
    this.notification.showWarning('Va rugam selectati un centru de cost , un departament un B.U. sau o locatie!!', '', 0, false, 0)
        return;
    }

    this.waitResponse = true;

    let suffix: string = '_Proces_verbal_inventariere.pdf';

    let prefix: string = this.selectedInventory.description + "_"
    if (this.selectedCostCenters.length > 0) prefix += this.selectedCostCenters[0].code;
    else if (this.selectedDivisions.length > 0) prefix += this.selectedDivisions[0].name;
    else if (this.selectedDepartments.length > 0) prefix += this.selectedDepartments[0].name
    else prefix += this.selectedAdministrations[0].name;

    let fileName = prefix + suffix;

    this.notification.showSuccess('Se genereaza documentul solicitat!', '',1000, 0, 0)

    this.inventoryHttpService.bookPV(params)
    .subscribe(
        (res)=>{
            fileSaveAs(res!.body, fileName);
            this.waitResponse = false;
        },
        (error) => {                             
            this.notification.showError('Nu exista date in raportul generat!', '',3000, 0, 0)
            this.waitResponse = false;
            return;
          }
    )
}

exportPVFinal() {

    let params: Array<Param> = null;
    params = this.getFilters();

    if (this.selectedInventory == null) {
    this.notification.showWarning('Va rugam selectati un inventar!!', '', 0, false, 0)
        return;
    }

    this.waitResponse = true;

    let fileName: string = 'Proces_verbal_inventariere_final.pdf';

    this.notification.showSuccess('Se genereaza documentul solicitat!', '',1000, 0, 0)

    this.inventoryHttpService.bookPVFinal(params)
    .subscribe(
        (res)=>{
            fileSaveAs(res!.body, fileName);
            this.waitResponse = false;
        },
        (error) => {                             
            this.notification.showError('Nu exista date in raportul generat!', '',3000, 0, 0)
            this.waitResponse = false;
            return;
          }
    )
}

exportAllowLabel() {

    let params: Array<Param> = null;
    params = this.getFilters();

    if (this.selectedInventory == null) {
    this.notification.showWarning('Va rugam selectati un inventar!!', '', 0, false, 0)
        return;
    }

    if (this.selectedCostCenters.length === 0 && this.selectedDivisions.length === 0 && this.selectedDepartments.length === 0 && this.selectedAdministrations.length === 0) {
    this.notification.showWarning('Va rugam selectati un centru de cost , un departament un B.U. sau o locatie!!', '', 0, false, 0)
        return;
    }
    
    this.waitResponse = true;

    let suffix: string = '_Registru_neetichetabile.pdf';

    let prefix: string = this.selectedInventory.description + "_"
    if (this.selectedCostCenters.length > 0) prefix += this.selectedCostCenters[0].code;
    else if (this.selectedDivisions.length > 0) prefix += this.selectedDivisions[0].name;
    else if (this.selectedDepartments.length > 0) prefix += this.selectedDepartments[0].name
    else prefix += this.selectedAdministrations[0].name;

    let fileName = prefix + suffix;

    this.notification.showSuccess('Se genereaza documentul solicitat!', '',1000, 0, 0)

    this.inventoryHttpService.allowLabelList(params)
    .subscribe(
        (res)=>{
            fileSaveAs(res!.body, fileName);
            this.waitResponse = false;
        },
        (error) => {                             
            this.notification.showError('Nu exista date in raportul generat!', '',3000, 0, 0)
            this.waitResponse = false;
            return;
          }
    )
}

onAssetFileUpload() {
  const dialogRef = this.dialog.open(UploadInventoryListModalComponent, {
    panelClass: 'centered-middle-modal', height: '100%', maxHeight: '100%', disableClose: true, width: '700px', position: { bottom: '15%', top: 'auto'},
    data: { uploadType: 'INVENTORY_BOOK', uploadFolder: 'INVENTORYBOOK', costCenterId: this.selectedCostCenterID, inventory : this.selectedInventory}
  });
  dialogRef.afterClosed().subscribe(() => {
    this.showEntityFiles();
  });
}

public refreshEntityFiles(){
    const params: Array<Param> = new Array<Param>();

    params.push(new Param('entityTypeCode', this.entityTypeCode));
    params.push(new Param('entityId', this.selectedCostCenters.length > 0 ? this.selectedCostCenters[0].id.toString() : this.selectedCostCenters.length > 0  ? this.selectedCostCenters[0].id.toString() : null));
    this.entityFile = null;
    this.entityFileList.refresh(params);
}

@ViewChild(EntityFileListComponent) entityFileListComponent : EntityFileListComponent

public showEntityFiles(){
    this.entityFile = null;
    this.entityFileListComponent.showEntityFiles(this.selectedCostCenterID, this.selectedInventory ? this.selectedInventory.id : null)
}

public onEntityFileListSelectionChanged(entityFiles: Array<EntityFile>) {
  this.entityFile = ((entityFiles != null) && (entityFiles.length === 1)) ? entityFiles[0] : null;
}

public onIsPrintedUpdate(isPrinted: string) {
  this.isPrinted = isPrinted;
}

public onIsTempUpdate(isTemp: string) {
this.isTemp = isTemp;
}

  onClearFilters() {

  }

  filterByDateRange(event: DateRange) {
    this._inventoryDateStart = event.startDate;
    this._inventoryDateEnd = event.endDate;
  }
  
}

enum OperationType {
    NotSet = 1,
    Reconciliation = 2
}

