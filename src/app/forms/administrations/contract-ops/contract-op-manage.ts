import { RoomDetailHttpService } from './../../../services/http/administration/room-detail.http.service';
import { RegionHttpService } from './../../../services/http/administration/region.http.service';
import { Region } from './../../../model/api/administration/region';
import { AssetOpHttpService } from './../../../services/http/assets/asset-op.http.service';
import { Component, EventEmitter, ViewChild, ElementRef, Output, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Param } from '../../../model/common/param';
import { Location } from '../../../model/api/administration/location';
import { saveAs as fileSaveAs } from 'file-saver-es';
import { AssetOpSimpleDetailMemoryService } from '../../../services/memory/asset-op-simple-detail.memory.service';
import { AssetInvDetailHttpService } from '../../../services/http/assets/asset-inv-detail.http.service';
import { LocationHttpService } from '../../../services/http/administration/location.http.service';
import { EmployeeHttpService } from '../../../services/http/administration/employee.http.service';
import { AdmCenterHttpService } from '../../../services/http/administration/adm-center.http.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { RegionListComponent } from '../regions/region.list';
import { AdmCenterListComponent } from '../adm-centers/adm-center.list';
import { LocationListComponent } from '../locations/location.list';
import { RoomListComponent } from '../rooms/room.list';
import { EmployeeListComponent } from '../employees/employee.list';
import { AssetCategory } from '../../../model/api/assets/asset-category';
import { AssetClass } from '../../../model/api/assets/asset-class';
import { Partner } from '../../../model/api/documents/partner';
import { CostCenter } from '../../../model/api/administration/cost-center';
import { Department } from '../../../model/api/administration/department';
import { Employee } from '../../../model/api/administration/employee';
import { Room } from '../../../model/api/administration/room';
import { AccMonth } from '../../../model/api/accounting/acc-month';
import { AssetSimpleDetail } from '../../../model/api/assets/asset-simple-detail';
import { AdmCenter } from '../../../model/api/administration/adm-center';
import { AppConfig } from '../../../config';
import { AssetOpConf } from '../../../model/common/import/asset-op-conf';
import { AppData } from '../../../app-data';
import { DocumentHttpService } from '../../../services/http/documents/document.http.service';
import { AssetOp } from '../../../model/api/assets/asset-op';
import { AssetFilter } from '../../../model/api/assets/asset.filter';
import { AssetOpExport } from '../../../model/api/assets/asset-op-export';
import { PagedResult } from '../../../model/common/paged-result';
import { AssetOpExportOtp } from '../../../model/api/assets/asset-op-exportOtp';
import { AssetOpConfirm } from '../../../model/api/assets/asset-op-confirm';
import { ContractOpDetailListComponent } from './contract-op.detail.list';
import { ContractOpHttpService } from '../../../services/http/administration/contract-op.http.service';


@Component({
    selector: 'app-contract-op-manage',
    templateUrl: 'contract-op-manage.html',
    styleUrls: ['contract-op-manage.scss'],
    providers: [
        AssetOpSimpleDetailMemoryService,
        AssetOpHttpService,
        AssetInvDetailHttpService,
        RegionHttpService,
        LocationHttpService,
        RoomDetailHttpService,
        EmployeeHttpService,
        AdmCenterHttpService ]
})
export class ContractOpManageComponent implements AfterViewInit  {

    @ViewChild('contractOpDetailList') public contractOpList: ContractOpDetailListComponent;

    @ViewChild('confirmationModal') public confirmationModal: ModalDirective;
    @ViewChild('importDataModal') public importDataModal: ModalDirective;

    @ViewChild('regionList') public regionList: RegionListComponent;
    @ViewChild('regionListModal') public regionListModal: ModalDirective;

    @ViewChild('admCenterList') public admCenterList: AdmCenterListComponent;
    @ViewChild('admCenterListModal') public admCenterListModal: ModalDirective;

    @ViewChild('locationList') public locationList: LocationListComponent;
    @ViewChild('locationListModal') public locationListModal: ModalDirective;

    @ViewChild('roomList') public roomList: RoomListComponent;
    @ViewChild('roomListModal') public roomListModal: ModalDirective;

    @ViewChild('employeeList') public employeeList: EmployeeListComponent;
    @ViewChild('employeeListModal') public employeeListModal: ModalDirective;

    @Output() public uploadFinished = new EventEmitter<void>();
    @ViewChild('fileInput') fileInput: ElementRef;

    public selectedAssetCategories: Array<AssetCategory> = new Array<AssetCategory>();
    public selectedAssetClasses: Array<AssetClass> = new Array<AssetClass>();
    public selectedPartners: Array<Partner> = new Array<Partner>();
    public selectedCostCenters: Array<CostCenter> = new Array<CostCenter>();
    public selectedDepartments: Array<Department> = new Array<Department>();
    public selectedEmployees: Array<Employee> = new Array<Employee>();
    public selectedLocations: Array<Location> = new Array<Location>();
    public selectedRooms: Array<Room> = new Array<Room>();
    public selectedAccMonth: AccMonth = null;
    public selectedAssetOps: Array<AssetSimpleDetail> = new Array<AssetSimpleDetail>();
    public selectedRegions: Array<Region> = new Array<Region>();
    public selectedAdmCenters: Array<AdmCenter> = new Array<AdmCenter>();

    public companyName: string = AppConfig.COMPANY_NAME;
    public assetId: number = 0;
    public selectedAssetOp: any;
    public transferStartDate: Date;
    public transferEndDate: Date;
    public filter: string;
    // public assetOpState: string = '-';
    public assetOpState: string = 'All';
    public custody: string = '-';


    public importLines: Array<AssetOpConf> = new Array<AssetOpConf>();
    public selectedAssetOpIds: Array<number> = new Array<number>();
    public importIndex: number = 0;
    public fileEvent: any = null;

    public operationType: OperationType = OperationType.NotSet;
    public confirmationMessage: string = '';
    public documentTypeCode: string = 'TRANSFER';
    public assetRowSelection: string = 'multiple';
    public showRegionDetails: boolean = AppConfig.SHOW_REGION_DETAILS;
    public showLocationDetails: boolean = AppConfig.SHOW_LOCATION_DETAILS;
    public showRoomsDetails: boolean = AppConfig.SHOW_ROOMS_DETAILS;
    public showEmployeesDetails: boolean = AppConfig.SHOW_EMPLOYEE_DETAILS;
    public useExportOTP: boolean = AppConfig.USE_EXPORT_OTP;
    public get isAdmin(): boolean { return AppData.UserIsAdmin; }
    public from = '';
    public to = '';


    constructor(public route: ActivatedRoute,
                public router: Router,
                public contractOpHttpService: ContractOpHttpService,
                public assetInvDetailHttpService: AssetInvDetailHttpService,
                public regionHttpService: RegionHttpService,
                public admCenterHttpService: AdmCenterHttpService,
                public locationHttpService: LocationHttpService,
                public roomDetailHttpService: RoomDetailHttpService,
                public employeeHttpService: EmployeeHttpService,
                public documentHttpService: DocumentHttpService) {
                    // this.options = new DatePickerOptions();
                }

    ngAfterViewInit() {
        this.clearFilters();
        this.refreshAssetOperations();
    }

    public onChangeFrom(event) {
        this.from = JSON.stringify(event.formatted);
        this.refreshAssetOperations();
    }

    public onChangeTo(event) {
        this.to = JSON.stringify(event.formatted);
        this.refreshAssetOperations();
    }

    public onAssetOpDetailListSelectionChanged(assetOpSimpleDetails: Array<AssetOp>) {

        this.selectedAssetOp = assetOpSimpleDetails != null && assetOpSimpleDetails.length === 1
            ? assetOpSimpleDetails[0] : null;
    }

    public refreshAssetOperations() {
        const params: Array<Param> = this.getFilters();
        this.contractOpList.refresh(params);
    }

    public showAssetDetail($event, selectedItem: any) {
       selectedItem  != null  ?  this.router.navigate(['/asset/', selectedItem.asset.id])
       : alert('Va rugam selectati cel putin o operatie!'); return;
    }


    public getFilters(): Array<Param> {
        const params = new Array<Param>();
        const assetFilter: AssetFilter = new AssetFilter();


        if (this.selectedRegions != null) {
            assetFilter.regionIds = new Array<number>();
            this.selectedRegions.forEach((region) => {
                assetFilter.regionIds.push(region.id);
            });
        }

        if (this.selectedAdmCenters != null) {
            assetFilter.admCenterIds = new Array<number>();
            this.selectedAdmCenters.forEach((admCenter) => {
                assetFilter.admCenterIds.push(admCenter.id);
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

        if (this.selectedEmployees != null) {
            assetFilter.employeeIds = new Array<number>();
            this.selectedEmployees.forEach((employee) => {
                assetFilter.employeeIds.push(employee.id);
            });
        }



        // params.push(new Param('assetOpState', ((this.assetOpState === '-') ? 'null' :
        // (this.assetOpState === 'DSTCONF' ? 'DSTCONF' : (this.assetOpState === 'REGISTERCONF') ? 'REGISTERCONF' :
        //  (this.assetOpState === 'RELEASECONF') ? 'RELEASECONF' :
        //   (this.assetOpState === 'SRCCONF') ? 'SRCCONF' :  ''))));
        assetFilter.filter = this.filter;
        assetFilter.fromDate = new Date(this.from);
        assetFilter.toDate = new Date(this.to);
        params.push(new Param('documentTypeCode', this.documentTypeCode));
        params.push(new Param('assetOpState', this.assetOpState === '-' ? null : this.assetOpState));
        // params.push(new Param('startDate', this.transferStartDate ? this.transferStartDate.toDateString() : ''));
        // params.push(new Param('endDate', this.transferEndDate ? this.transferEndDate.toDateString() : ''));
        // params.push(new Param('startDate', this.from ? new Date(this.from).toString() : ''));
        // params.push(new Param('endDate', this.to ? new Date(this.from).toString() : ''));
        params.push(new Param('jsonFilter', JSON.stringify(assetFilter)));

        return params;
    }

    public checkForRefresh() {
        this.refreshAssetOperations();
    }

    public onStateUpdate(assetOpState: string) {
        this.assetOpState = assetOpState;
        this.checkForRefresh();
    }

    public onProcessAssetOp() {
        this.operationType = OperationType.ProcessAssetOp;
        this.confirmationMessage = 'Validati transferurile selectate?';
        this.confirmationModal.show();
    }

    public processAssetOp() {
        this.contractOpList.selectedItems.forEach( item => {
            if (this.selectedAssetOpIds.indexOf(item)  === -1) {
                this.selectedAssetOpIds.push(item.id);
            }
        });

        this.contractOpHttpService.process(this.selectedAssetOpIds).subscribe((data) => {
            this.refreshAssetOperations();
        });
    }

    public onConfirmationApproved() {

        switch (this.operationType) {
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

    public clearFilters() {

      //  this.assetOpState = '-';
        this.transferStartDate = undefined;
        this.transferEndDate = undefined;

        this.selectedLocations = new Array<Location>();
        this.selectedRooms = new Array<Room>();
        this.selectedEmployees = new Array<Employee>();
        this.selectedLocations = new Array<Location>();
        this.selectedRooms = new Array<Room>();
        this.selectedRegions = new Array<Region>();
        this.selectedAdmCenters = new Array<AdmCenter>();
        this.filter = '';
        this.selectedAssetOpIds = [];
        this.contractOpList.selectedItems = [];
        this.checkForRefresh();
    }

    public changeRowSelection() {
        if (this.assetRowSelection === 'single') {
            this.assetRowSelection = 'multiple';
        } else {
             this.selectedAssetOp = new Array<AssetSimpleDetail>();
            // this.selectedAssetId = 0;
            this.assetRowSelection = 'single';
        }
    }

     /* begin region */

     public selectRegions() {
        this.regionListModal.show();
        this.regionList.selectedItems = this.selectedRegions;
        this.regionList.refresh(null);
    }

    public removeFromRegionSelection(region: Region) {
        const index: number = this.selectedRegions.indexOf(region);
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
        const index: number = this.selectedAdmCenters.indexOf(admCenter);
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
        this.locationListModal.show();
        this.locationList.selectedItems = this.selectedLocations;
        this.locationList.refresh(null);
    }

    public removeFromLocationSelection(location: Location) {
        const index: number = this.selectedLocations.indexOf(location);
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

   /* begin room */

    public selectRooms() {
        this.roomListModal.show();
        this.roomList.selectedItems = this.selectedRooms;
        this.roomList.refresh(null);
    }

    public removeFromRoomSelection(room: Room) {
        const index: number = this.selectedRooms.indexOf(room);
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

     /* begin employee */

     public selectEmployees() {
        this.employeeListModal.show();
        this.employeeList.selectedItems = this.selectedEmployees;
        this.employeeList.refresh(null);
    }

    public removeFromEmployeeSelection(employee: Employee) {
        const index: number = this.selectedEmployees.indexOf(employee);
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

    public deleteOperation() {
        if (confirm('Esti sigur ca vrei sa anulezi transferul?')) {
            this.contractOpHttpService.deleteAssetOp(this.selectedAssetOp.id).subscribe((res) => {});
            this.checkForRefresh();
        }
}

    public loadFile(ev) {
        this.fileEvent = ev;
    }

    public trackByCode(index: number, tableItem: any): string {
                return tableItem.code;
        }
}

enum OperationType {
    NotSet = 1,
    ProcessAssetOp = 2
}
