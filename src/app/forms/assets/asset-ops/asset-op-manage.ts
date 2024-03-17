import { Region } from './../../../model/api/administration/region';
import { AssetOpHttpService } from './../../../services/http/assets/asset-op.http.service';
import { Component, EventEmitter, ViewChild, ElementRef, Output, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Param } from '../../../model/common/param';
import { Location } from '../../../model/api/administration/location';
import { AssetOpSimpleDetailMemoryService } from '../../../services/memory/asset-op-simple-detail.memory.service';
import { AssetInvDetailHttpService } from '../../../services/http/assets/asset-inv-detail.http.service';
import { RegionHttpService } from '../../../services/http/administration/region.http.service';
import { LocationHttpService } from '../../../services/http/administration/location.http.service';
import { RoomDetailHttpService } from '../../../services/http/administration/room-detail.http.service';
import { EmployeeHttpService } from '../../../services/http/administration/employee.http.service';
import { AccMonthHttpService } from '../../../services/http/accounting/acc-month.http.service';
import { AdmCenterHttpService } from '../../../services/http/administration/adm-center.http.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { RegionListComponent } from '../../administrations/regions/region.list';
import { AdmCenterListComponent } from '../../administrations/adm-centers/adm-center.list';
import { LocationListComponent } from '../../administrations/locations/location.list';
import { RoomListComponent } from '../../administrations/rooms/room.list';
import { EmployeeListComponent } from '../../administrations/employees/employee.list';
import { AccMonthListComponent } from '../../accounting/acc-month.list';
import { AssetCategory } from '../../../model/api/assets/asset-category';
import { AssetClass } from '../../../model/api/assets/asset-class';
import { Partner } from '../../../model/api/documents/partner';
import { CostCenter } from '../../../model/api/administration/cost-center';
import { Department } from '../../../model/api/administration/department';
import { Employee } from '../../../model/api/administration/employee';
import { AccMonth } from '../../../model/api/accounting/acc-month';
import { Room } from '../../../model/api/administration/room';
import { AssetSimpleDetail } from '../../../model/api/assets/asset-simple-detail';
import { AdmCenter } from '../../../model/api/administration/adm-center';
import { AppConfig } from '../../../config';
import { AssetOpConf } from '../../../model/common/import/asset-op-conf';
import { AppData } from '../../../app-data';
import { AuthenticationService } from '../../../services/authentication.service';
import { DocumentHttpService } from '../../../services/http/documents/document.http.service';
import { AssetOp } from '../../../model/api/assets/asset-op';
import { AssetFilter } from '../../../model/api/assets/asset.filter';
import { AssetOpExport } from '../../../model/api/assets/asset-op-export';
import { PagedResult } from '../../../model/common/paged-result';
import { AssetOpExportOtp } from '../../../model/api/assets/asset-op-exportOtp';
import { AssetOpConfirm } from '../../../model/api/assets/asset-op-confirm';
import { AssetOpDetailListComponent } from './asset-op.detail.list';
import { DepartmentListComponent } from '../../administrations/departments/department.list';
import { CostCenterListComponent } from '../../administrations/cost-centers/cost-center.list';
import { ProjectList } from '../projects/project.list';
import { DivisionListComponent } from '../../administrations/divisions/division.list';
import { Division } from '../../../model/api/administration/division';
import { AppUtils } from '../../../common/app.utils';
import { Project } from '../../../model/api/assets/project';
import { ProjectHttpService } from '../../../services/http/assets/project.http.service';
import { DepartmentHttpService } from '../../../services/http/administration/department.http.service';
import { DivisionHttpService } from '../../../services/http/administration/division.http.service';
import { CostCenterHttpService } from '../../../services/http/administration/cost-center.http.service';
import { saveAs as fileSaveAs } from 'file-saver-es';
import { AssetImage, EntityFile } from '../../../model/api/common/entity-file';
import { EntityFileHttpService } from '../../../services/http/common/entity-file.http.service';
import {City} from '../../../model/api/administration/city';
// import { saveAs as fileSaveAs } from 'file-saver-es';
// import { DateModel, DatePickerOptions } from 'ng2-datepicker';
// import * as decode from 'jwt-decode';
// import { ToastsManager } from 'ng2-toastr';

@Component({
    selector: 'app-asset-op-manage',
    templateUrl: 'asset-op-manage.html',
    styleUrls: ['asset-op-manage.scss'],
    providers: [
        AssetOpSimpleDetailMemoryService,
        AssetOpHttpService,
        AssetInvDetailHttpService,
        RegionHttpService,
        LocationHttpService,
        RoomDetailHttpService,
        EmployeeHttpService,
        AccMonthHttpService,
        AdmCenterHttpService ]
})
export class AssetOpManageComponent  {
    hideExportBtn = false;
    public _selectedDepartments: Department[] = [];
    public get selectedDepartments(): Department[] { return this._selectedDepartments; }
    public set selectedDepartments(value: Department[]) {
      this._selectedDepartments = value;
      this.checkForRefresh();
    }

    public _selectedDivisions: Division[] = [];
    public get selectedDivisions(): Division[] { return this._selectedDivisions; }
    public set selectedDivisions(value: Division[]) {
      this._selectedDivisions = value;
      this.checkForRefresh();
    }

    public _selectedLocations: Location[] = [];
    public get selectedLocations(): Location[] { return this._selectedLocations; }
    public set selectedLocations(value: Location[]) {
      this._selectedLocations = value;
      this.checkForRefresh();
    }

    public _selectedCostCenters: CostCenter[] = [];
    public get selectedCostCenters(): CostCenter[] { return this._selectedCostCenters; }
    public set selectedCostCenters(value: CostCenter[]) {
      this._selectedCostCenters = value;
      this.checkForRefresh();
    }

    public _selectedProjects: Project[] = [];
    public get selectedProjects(): Project[] { return this._selectedProjects; }
    public set selectedProjects(value: Project[]) {
      this._selectedProjects = value;
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

    @ViewChild('assetOpDetailList') public assetOpList: AssetOpDetailListComponent;

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

    @ViewChild('accMonthList') public accMonthList: AccMonthListComponent;
    @ViewChild('accMonthListModal') public accMonthListModal: ModalDirective;

    @ViewChild('departmentList') public departmentList: DepartmentListComponent;
    @ViewChild('departmentListModal') public departmentListModal: ModalDirective;

    @ViewChild('divisionList') public divisionList: DivisionListComponent;
    @ViewChild('divisionListModal') public divisionListModal: ModalDirective;

    @ViewChild('costCenterList') public costCenterList: CostCenterListComponent;
    @ViewChild('costCenterListModal') public costCenterListModal: ModalDirective;

    @ViewChild('projectList') public projectList: ProjectList;
    @ViewChild('projectListModal') public projectListModal: ModalDirective;


    @Output() public uploadFinished = new EventEmitter<void>();
    @ViewChild('fileInput') fileInput: ElementRef;

    public selectedAssetCategories: Array<AssetCategory> = new Array<AssetCategory>();
    public selectedAssetClasses: Array<AssetClass> = new Array<AssetClass>();
    public selectedPartners: Array<Partner> = new Array<Partner>();
    // public selectedCostCenters: Array<CostCenter> = new Array<CostCenter>();
    // public selectedDepartments: Array<Department> = new Array<Department>();
    public selectedEmployees: Array<Employee> = new Array<Employee>();
    public selectedAccMonths: Array<AccMonth> = new Array<AccMonth>();
    // public selectedLocations: Array<Location> = new Array<Location>();
    public selectedRooms: Array<Room> = new Array<Room>();
    public selectedAccMonth: AccMonth = null;
    public selectedAssetOps: Array<AssetSimpleDetail> = new Array<AssetSimpleDetail>();
    public selectedRegions: Array<Region> = new Array<Region>();
    public selectedAdmCenters: Array<AdmCenter> = new Array<AdmCenter>();
    public opsValueAdds: Array<string> = new Array<string>();
    public companyName: string = AppConfig.COMPANY_NAME;
    public assetId: number = 0;
    public selectedAssetOp: any;
    public transferStartDate: Date;
    public transferEndDate: Date;
    public filter: string;
    public allLocations: string = 'NO';
    // public assetOpState: string = '-';
    public assetOpState: string = 'Toate';
    public custody: string = '-';
    public isAdminNew: string = 'administrator';
    public assetOpsCount = 0;
    // public fromdate: DateModel;
    public from = '';
    // public todate: DateModel;
    public to = '';
    public allowExport = false;
    public showBookBtn = true;
//     public options: DatePickerOptions = {
//     format: 'MM-DD-YYYY',
//     todayText: 'Oggi',
//     style: 'big'
//   };

    // public selectedDivisions: Array<Division> = new Array<Division>();
    // public selectedProjects: Array<Project> = new Array<Project>();

    public importLines: Array<AssetOpConf> = new Array<AssetOpConf>();
    public selectedAssetOpIds: Array<number> = new Array<number>();
    public selectedAssetOpReportIds = '';
    public importIndex: number = 0;
    public fileEvent: any = null;
    public opsIds: Array<number> = new Array<number>();
    public operationType: OperationType = OperationType.NotSet;
    public confirmationMessage: string = "";
    public documentTypeCode: string = "TRANSFER";
    public assetRowSelection: string = "multiple";
    public showRegionDetails: boolean= AppConfig.SHOW_REGION_DETAILS;
    public showLocationDetails: boolean= AppConfig.SHOW_LOCATION_DETAILS;
    public showRoomsDetails: boolean= AppConfig.SHOW_ROOMS_DETAILS;
    public showEmployeesDetails: boolean= AppConfig.SHOW_EMPLOYEE_DETAILS;
    public useExportOTP: boolean= AppConfig.USE_EXPORT_OTP;
    public get isAdmin(): boolean { return AppData.UserIsAdmin; }

    public imageCount: number = 0;
    public imageIndex: number = 0;
    public imageLoading: boolean = false;
    public assetImagesPdf: Array<AssetImage> = new Array<AssetImage>();
    public assetImages: Array<AssetImage> = new Array<AssetImage>();
    public assetFiles: Array<EntityFile> = new Array<EntityFile>();
    public existingAssetImages: Array<AssetImage> = new Array<AssetImage>();


    constructor(public route: ActivatedRoute,
                public router: Router,
                public assetOpHttpService: AssetOpHttpService,
                public assetInvDetailHttpService: AssetInvDetailHttpService,
                public regionHttpService: RegionHttpService,
                public admCenterHttpService: AdmCenterHttpService,
                public locationHttpService: LocationHttpService,
                public roomDetailHttpService: RoomDetailHttpService,
                public employeeHttpService: EmployeeHttpService,
                public accMonthHttpService: AccMonthHttpService,
                public projectHttpService: ProjectHttpService,
                public departmentHttpService: DepartmentHttpService,
                public divisionHttpService: DivisionHttpService,
                public costCenterHttpService: CostCenterHttpService,
                private entityFileHttpService: EntityFileHttpService,
                public auth: AuthenticationService,
                // public toastr: ToastsManager,
                public vcr: ViewContainerRef,
                public documentHttpService: DocumentHttpService)
                {
                    // this.toastr.setRootViewContainerRef(vcr);
                    // this.options = new DatePickerOptions();


                    const token = localStorage.getItem('id_token');
                    // const tokenPayload = decode(token);
                    this.isAdminNew = this.auth.rolesSubject.value.toString();
                    if (this.isAdminNew === 'user'){
                        // this.allowExport = tokenPayload.sub === 'b87fc7b8-b409-4131-b103-fab85275b921' ? true : false;
                    } else if (this.isAdminNew === 'administrator') {
                        this.allowExport  = true;
                    }
                }

    ngAfterViewInit() {
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

    public exportToExcelBM() {

        let params: Array<Param> = null;

    //     params = this.getFilters();
    //     this.assetOpHttpService
    //         .exportBM(params)
    //         .subscribe((blob) => {
    //     fileSaveAs(blob, 'Registru Operatii.xlsx');
    // });
    }

    public onAssetOpDetailListSelectionChanged(assetOpSimpleDetails: Array<AssetOp>) {

        // this.assetOpList.selectedItems.forEach(selectedAssetOp => {
        //     if (this.opsValueAdds.indexOf(selectedAssetOp.id) === -1) this.assetOpsCount = this.assetOpsCount + 1; // this.opsValueAdds.push(selectedAssetOp.id);
        // });

        this.selectedAssetOp = assetOpSimpleDetails != null && assetOpSimpleDetails.length === 1
            ? assetOpSimpleDetails[0] : null;
    }

    public refreshAssetOperations() {
        let params: Array<Param> = this.getFilters();
      console.log(params);
        this.assetOpList.refresh(params);
    }

    public showAssetDetail($event, selectedItem: any){
       selectedItem  != null  ?  this.router.navigate(['/asset/', selectedItem.asset.id])
       : alert('Va rugam selectati cel putin o operatie!'); return;
    }

     divisionId: number;
    // ForAllFilters(divisionIds: any)
    // {
    //     if(divisionIds.length != 0){
    //         this.divisionId = divisionIds[0].id}
    //     else
    //     {this.divisionId = null}
    //       //console.log(this.divisionId);
    // }
    public getFilters(): Array<Param> {
        let params = new Array<Param>();
        let assetFilter: AssetFilter = new AssetFilter();


        let assetStateOpIds: Array<number> = new Array<number>();
        let startDate: Date;
        let endDate: Date;
        let userId: number;



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

        // if (this.selectedAccMonths != null) {
        //     assetFilter.accMonthIds = new Array<number>();
        //     this.selectedAccMonths.forEach((accMonth) => {
        //         assetFilter.accMonthIds.push(accMonth.id);
        //     });
        // }



        // params.push(new Param('assetOpState', ((this.assetOpState === '-') ? 'null' :
        // (this.assetOpState === 'DSTCONF' ? 'DSTCONF' : (this.assetOpState === 'REGISTERCONF') ? 'REGISTERCONF' :
        //  (this.assetOpState === 'RELEASECONF') ? 'RELEASECONF' :
        //   (this.assetOpState === 'SRCCONF') ? 'SRCCONF' :  ''))));
        assetFilter.filter = this.filter;
        if(this.selectedDepartments.length != 0)
        {
            assetFilter.departmentIds = [];
            var i;
            for( i=0;i<=this.selectedDepartments.length-1;i++){
            assetFilter.departmentIds[i] = this.selectedDepartments[i].id;}
        }
        else{assetFilter.departmentIds = [];}

        if(this.selectedDivisions.length != 0)
        {
            assetFilter.divisionIds = [];
            var i;
            for( i=0;i<=this.selectedDivisions.length-1;i++){
            assetFilter.divisionIds[i] = this.selectedDivisions[i].id;}}
        else{assetFilter.divisionIds = [];}

        if(this.selectedCostCenters.length != 0)
        {
            assetFilter.costCenterIds = [];
            var i;
            for( i=0;i<=this.selectedCostCenters.length-1;i++){
            assetFilter.costCenterIds[i] = this.selectedCostCenters[i].id;
            }
        }
        else{ 
            assetFilter.costCenterIds = [];
        }

        if(this.selectedProjects.length != 0)
        {
            assetFilter.projectIds = [];
            var i;
            for( i=0;i<=this.selectedProjects.length-1;i++){
            assetFilter.projectIds[i] = this.selectedProjects[i].id;
            }
        }
        else{ 
            assetFilter.projectIds = [];
        }

        
        params.push(new Param('documentTypeCode', this.documentTypeCode));
        params.push(new Param('assetOpState', this.assetOpState === '-' ? null : this.assetOpState));
        // params.push(new Param('startDate', this.transferStartDate ? this.transferStartDate.toDateString() : ''));
        // params.push(new Param('endDate', this.transferEndDate ? this.transferEndDate.toDateString() : ''));
        params.push(new Param('jsonFilter', JSON.stringify(assetFilter)));
        return params;
    }

    public checkForRefresh() {
        this.clearSelection();
        this.refreshAssetOperations();
    }

    public onStateUpdate(assetOpState: string) {
        this.assetOpState = assetOpState;
        this.checkForRefresh();
    }

    public onProcessManagerAssetOp() {
        this.operationType = OperationType.ProcessManagerAssetOp;
        this.confirmationMessage = 'Validati operatia selectata?';
        this.confirmationModal.show();
    }

    public onProcessAssetOp() {
        this.operationType = OperationType.ProcessAssetOp;
        this.confirmationMessage = 'Validati operatia selectata?';
        this.confirmationModal.show();
    }

    public processManagerAssetOp() {

        let isValid = true;
        this.assetOpList.selectedItems.forEach( item => {

            if (item.assetOpState.id != 2) {

                isValid = false;
                // this.toastr.error('Numarul de inventar ' + item.asset.invNo + ' a fost aprobat deja!');
                return;
            } else {
                if (this.selectedAssetOpIds.indexOf(item)  === -1){
                    this.selectedAssetOpIds.push(item.id);
                }
            }

        });

        if (isValid) {
            this.assetOpHttpService.process(this.selectedAssetOpIds).subscribe((data) => {
                this.refreshAssetOperations();
            });
        }

    }

    public processAssetOp() {
        let isValid = true;

        this.assetOpList.selectedItems.forEach( item => {

            if (item.assetOpState.id === 2) {

                isValid = false;
                // this.toastr.error('Numarul de inventar ' + item.asset.invNo + ' asteapta aprobarea managerului!');
                return;
            } else if (item.assetOpState.id === 4) {
                isValid = false;
                // this.toastr.error('Numarul de inventar ' + item.asset.invNo + ' a fost validat deja!');
                return;
            } else {
                if (this.selectedAssetOpIds.indexOf(item)  === -1){
                    this.selectedAssetOpIds.push(item.id);
                }
            }

        });

        if (isValid) {
            this.assetOpHttpService.process(this.selectedAssetOpIds).subscribe((data) => {
                this.refreshAssetOperations();
            });
        }


    }
    // public sendEmail() {
    //     this.assetOpHttpService.sendEmail().subscribe((data) => {

    //     });
    // }
    public onConfirmationApproved() {

        switch (this.operationType) {
            case OperationType.ProcessManagerAssetOp:
                this.processManagerAssetOp();
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
        this.selectedAccMonths = new Array<AccMonth>();
        this.filter = '';
        this.selectedAssetOpIds = [];
        this.assetOpList.selectedItems = [];
        this.opsValueAdds = [];
        this.selectedAssetOpReportIds = '';
        this.showBookBtn = true;
        this.checkForRefresh();
    }

    public clearSelection() {
        this.selectedAssetOp = new Array<AssetOp>();
        this.assetOpList.selectedItems = this.selectedAssetOp;
        this.opsIds = [];
        this.opsValueAdds = [];
        this.selectedAssetOpReportIds = '';
        this.showBookBtn = true;
    }

    public changeRowSelection() {
        if (this.assetRowSelection === "single") {
            this.assetRowSelection = "multiple";
        }
        else {
            // this.selectedAssetOp = new Array<AssetSimpleDetail>();
            //this.selectedAssetId = 0;
            this.assetRowSelection = "single";
        }
    }

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
        this.locationListModal.show();
        this.locationList.selectedItems = this.selectedLocations;
        this.locationList.refresh(null);
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

   /* begin room */

    public selectRooms() {
        this.roomListModal.show();
        this.roomList.selectedItems = this.selectedRooms;
        this.roomList.refresh(null);
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

     /* begin employee */

     public selectEmployees() {
        this.employeeListModal.show();
        this.employeeList.selectedItems = this.selectedEmployees;
        this.employeeList.refresh(null);
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


     /* begin employee */

     public selectAccMonths() {
        this.accMonthListModal.show();
        this.accMonthList.selectedItems = this.selectedAccMonths;
        this.accMonthList.refresh(null);
    }

    public removeFromAccMonthSelection(accMonth: AccMonth) {
        let index: number = this.selectedAccMonths.indexOf(accMonth);
        this.selectedAccMonths.splice(index, 1);
        this.checkForRefresh();
    }

    public clearAccMonthSelection() {
        this.selectedAccMonths = new Array<AccMonth>();
        this.checkForRefresh();
    }

    public setSelectedAccMonths() {
        this.selectedAccMonths = this.accMonthList.selectedItems;
        this.accMonthListModal.hide();
        this.checkForRefresh();
    }

    /*end employee*/

    public showReport() {
        let reportType: string = "";
        let validReport: boolean = false;

        if (this.selectedAssetOp != null) {
           // console.log('TIP DOCUMENT: ', this.selectedAssetOp.documentType.code);
            //  switch(this.selectedAssetOp.documentTypeCode) {
                switch(this.selectedAssetOp.documentType.code) {
                case AppConfig.DOCUMENT_TYPE_TRANSFER:
                    reportType = "movementproviding";
                    validReport = true;
                    break;
                case AppConfig.DOCUMENT_TYPE_CASS:
                    reportType = "annulement";
                    validReport = true;
                    break;
                case AppConfig.DOCUMENT_TYPE_INVENTORY:
                    reportType = "movementproviding";
                    validReport = true;
                    break;
                case AppConfig.DOCUMENT_TYPE_ALL:
                    reportType = "movementproviding";
                    validReport = true;
                    break;
                // case AppConfig.DOCUMENT_TYPE_STATE_CHANGE:
                //     reportType = "cassation";
                //     validReport = true;
                //     break;
                case AppConfig.DOCUMENT_TYPE_TRANSFER_EMPLOYEE:
                    reportType = "movementproviding";
                    validReport = true;
                    break;
                case AppConfig.DOCUMENT_TYPE_TRANSFER_ROOM:
                    reportType = "movementproviding";
                    validReport = true;
                    break;
                // case AppConfig.DOCUMENT_TYPE_TRANSFER_ROOM:
                //     reportType = "movementproviding";
                //     validReport = true;
                //     break;
                default:
                    break;
            }

            if (validReport) {
                // window.open(`${AppConfig.reportingServer}Report.aspx/?report=${reportType}&documentId=${this.selectedAssetOp.documentId}`);
                // console.log(this.selectedAssetOp);
                if (this.selectedAssetOp.assetOpState.id > 2) {
                    window.open(`${AppConfig.reportingServer}Report.aspx/?report=${reportType}&documentId=${this.selectedAssetOp.document.id}&assetOpId=${this.selectedAssetOp.id}`);
                    this.showBookBtn = false;
                }else{
                    //window.open(`${AppConfig.reportingServer}Report.aspx/?report=${reportType}&documentId=${this.selectedAssetOp.document.id}`);
                    // this.toastr.info('Transferul nu a fost aprobat de manager!');
                }
            }
        }
    }


    public showReportMultiple() {
        let reportType: string = "";
        let validReport: boolean = false;
        let roomInis  = new Array<number>();
        let roomFins  = new Array<number>();
        let valueAdds  = new Array<number>();

        let returnPage = false;
        let isValid = true;
        this.assetOpList.selectedItems.forEach( item => {

            if (item.assetOpState.id < 3) {

                isValid = false;
                // this.toastr.error('Numarul de inventar ' + item.asset.invNo + ' nu a fost aprobat de manager!');
                return;
            } else {

                if (roomInis.length > 0){
                    if (roomInis.indexOf(item.roomInitial.id) === -1) {
                        // this.toastr.error('Agentia ' + item.roomInitial.code + ' este diferita de restul agentiilor initiale selectate!!');
                        returnPage = true;
                    }
                } else {
                    if (roomInis.indexOf(item.roomInitial.id) === -1) roomInis.push(item.roomInitial.id);
                }


                if (roomFins.length > 0){
                    if (roomFins.indexOf(item.roomFinal.id) === -1) {
                        // this.toastr.error('Agentia ' + item.roomFinal.code + ' este diferita de restul agentiilor finale selectate!!');
                        returnPage = true;
                    }
                } else {
                    if (roomFins.indexOf(item.roomFinal.id) === -1) roomFins.push(item.roomFinal.id);
                }

                if (item.valueAdd != null) {
                    if (valueAdds.length > 0){
                        if (valueAdds.indexOf(item.valueAdd) === -1) {
                            // this.toastr.error('Numarul avizului ' + item.valueAdd + ' este diferit de restul numerelor selectate!!');
                            returnPage = true;
                        }
                    } else {
                        if (valueAdds.indexOf(item.valueAdd) === -1) valueAdds.push(item.valueAdd);
                    }
                }

                if (this.selectedAssetOpIds.indexOf(item)  === -1){
                    this.selectedAssetOpReportIds += item.id + ',';
                }
            }

        });

        if (isValid && !returnPage) {

           // console.log('TIP DOCUMENT: ', this.selectedAssetOp.documentType.code);
            //  switch(this.selectedAssetOp.documentTypeCode) {
                switch (this.assetOpList.selectedItems[0].documentType.code) {

                case AppConfig.DOCUMENT_TYPE_TRANSFER:
                    reportType = "movementprovidings";
                    validReport = true;
                    break;
                case AppConfig.DOCUMENT_TYPE_CASS:
                    reportType = "annulement";
                    validReport = true;
                    break;
                case AppConfig.DOCUMENT_TYPE_INVENTORY:
                    reportType = "movementprovidings";
                    validReport = true;
                    break;
                case AppConfig.DOCUMENT_TYPE_ALL:
                    reportType = "movementprovidings";
                    validReport = true;
                    break;
                // case AppConfig.DOCUMENT_TYPE_STATE_CHANGE:
                //     reportType = "cassation";
                //     validReport = true;
                //     break;
                case AppConfig.DOCUMENT_TYPE_TRANSFER_EMPLOYEE:
                    reportType = "movementprovidings";
                    validReport = true;
                    break;
                case AppConfig.DOCUMENT_TYPE_TRANSFER_ROOM:
                    reportType = "movementprovidings";
                    validReport = true;
                    break;
                // case AppConfig.DOCUMENT_TYPE_TRANSFER_ROOM:
                //     reportType = "movementproviding";
                //     validReport = true;
                //     break;
                default:
                    break;
            }

            if (validReport) {
                // window.open(`${AppConfig.reportingServer}Report.aspx/?report=${reportType}&documentId=${this.selectedAssetOp.documentId}`);
                // console.log(this.selectedAssetOp);
                // if (this.assetOpDetailList.assetOpState.id > 2) {
                //     window.open(`${AppConfig.reportingServer}Report.aspx/?report=${reportType}&documentId=${this.selectedAssetOp.document.id}&assetOpId=${this.selectedAssetOp.id}`);
                // }else{
                //     //window.open(`${AppConfig.reportingServer}Report.aspx/?report=${reportType}&documentId=${this.selectedAssetOp.document.id}`);
                //     this.toastr.info('Transferul nu a fost aprobat de manager!');
                // }

                window.open(`${AppConfig.reportingServer}Report.aspx/?report=${reportType}&assetOpIds=${this.selectedAssetOpReportIds}`);
                this.showBookBtn = false;
            }
        }
    }

    public showReportCassation() {
        let reportType: string = "";
        let validReport: boolean = false;

        if (this.selectedAssetOp != null) {
           console.log('TIP DOCUMENT: ', this.selectedAssetOp.documentType.code);
            //  switch(this.selectedAssetOp.documentTypeCode) {
                switch(this.selectedAssetOp.documentType.code) {

                case AppConfig.DOCUMENT_TYPE_STATE_CHANGE:
                    reportType = "cassation";
                    validReport = true;
                    break;
                default:
                    break;
            }

            if (validReport) {
                //window.open(`${AppConfig.reportingServer}Report.aspx/?report=${reportType}&documentId=${this.selectedAssetOp.documentId}`);
               console.log(this.selectedAssetOp);
                if (AppConfig.DOCUMENT_TYPE_INVENTORY) {
                    window.open(`${AppConfig.reportingServer}Report.aspx/?report=${reportType}&documentId=${this.selectedAssetOp.document.id}&assetOpId=${this.selectedAssetOp.id}`);
                }else{
                    window.open(`${AppConfig.reportingServer}Report.aspx/?report=${reportType}&documentId=${this.selectedAssetOp.document.id}`);
                }
            }
        }
    }

    public deleteOperation(){
        if(confirm('Esti sigur ca vrei sa anulezi transferul?')){
            this.assetOpHttpService.deleteAssetOp(this.selectedAssetOp != null && this.selectedAssetOp.id).subscribe((res) => {
            });
            this.checkForRefresh();
        }
}

    public assetOpListExport() {

        let params: Array<Param> = this.getFilters();
        let items: Array<AssetOpExport> = new Array<AssetOpExport>();

        this.assetOpHttpService.get(1, 1000000, 'modifiedAt', 'desc', params, null, 'details').subscribe(
            (result: PagedResult<any>) => {

                // console.log(result.items);

                let options = {
                    sheetid: 'nota_transfer',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                result.items.forEach((item: any) => {
                    let assetOpExport: AssetOpExport = new AssetOpExport();
                    let index = item.asset.invNo.indexOf('/');
                    assetOpExport.assetinvNo1 = item.asset.invNo.substring(0, index);
                    assetOpExport.assetinvNo2 = item.asset.invNo.substring(index + 1);
                    assetOpExport.costCenterCode = item.roomFinal.code;
                    assetOpExport.costCenterName = item.locationFinal.code.substring(0, 4);
                    assetOpExport.quantity = item.asset.quantity;
                    assetOpExport.modifiedAt = item.modifiedAt;
                    items.push(assetOpExport);

                    this.assetOpHttpService.exportAssetOps(item.id).subscribe((data) => {
                    });
                });

                //console.log('Export Atlas', items);

                //alasql("SELECT  3 as [Property Type],[Asset Seq A], asset->invNo  as [Asset Seq No N],0 as [Asset Component], roomFinal->code as [Cost Center],[General Category],[Category],[Sub Category], SUBSTRING(locationFinal->code, 1, 4) as [Branch], asset->quantity as [Quantity] INTO XLSX('nota_transfer.xlsx',?) FROM ?   WHERE DATE(modifiedAt) > DATE('" +
                // alasql("SELECT 3 as [Property Type], ' ' as [Asset Seq A], assetinvNo1 as [Asset Seq No N], assetinvNo2 as [Asset Component], costCenterCode as [Cost Center], [General Category], [Category], [Sub Category], costCenterName as [Branch], quantity as [Quantity] INTO XLSX('nota_transfer.xlsx',?) FROM ?   " ,
                //                  [ options, items ]);

                this.refreshAssetOperations();

    // console.log(JSON.stringify(assetInvDetails.items));

    // let alaData: Array<any> = new Array<any>();
    // assetInvDetails.items.forEach((item: any) => {
    //     let alaItem: any = {};
    //     alaItem.costCenterName = item.costCenterFinal.name;
    //     alaData.push(alaItem);
    // })

    // alasql("SELECT [costCenterName] as [Cost Center] INTO XLSX('template Transfer1.xlsx',?) FROM ?"
    //                         , [ options, alaData ]);

            });
    }

    public exportMF() {

    //     let params: Array<Param> = null;

    //     params = this.getFilters();
    //     this.assetOpHttpService
    //         .exportMF(params)
    //         .subscribe((blob) => {
    //     fileSaveAs(blob, 'Export FISA MF.xlsx');
    // });
    }

    public exportOB() {

    //     let params: Array<Param> = null;

    //     params = this.getFilters();
    //     this.assetOpHttpService
    //         .exportOB(params)
    //         .subscribe((blob) => {
    //     fileSaveAs(blob, 'Export FISA OB.xlsx');
    // });
    }


    public exportCass() {

        let params: Array<Param> = null;

    //     params = this.getFilters();
    //     this.assetOpHttpService
    //         .exportCass(params)
    //         .subscribe((blob) => {
    //     fileSaveAs(blob, 'Export FISA CASARE.xlsx');
    // });
    }

    public assetOpListExportOtp() {

        let params: Array<Param> = this.getFilters();
        let items: Array<AssetOpExportOtp> = new Array<AssetOpExportOtp>();

        this.assetOpHttpService.get(1, 1000000, 'modifiedAt', 'desc', params, null, 'details').subscribe(
            (result: PagedResult<any>) => {

                // console.log(result.items);

                let options = {
                    sheetid: 'Transferuri',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                result.items.forEach((item: any) => {
                    let assetOpExport: AssetOpExportOtp = new AssetOpExportOtp();

                    assetOpExport.documentType = item.documentType.name;
                    assetOpExport.assetName = item.asset.name;
                    assetOpExport.assetinvNo = item.asset.invNo;
                    assetOpExport.quantity = item.asset.quantity;
                    assetOpExport.assetValueInv = item.asset.valueInv;
                    assetOpExport.costCenterCodeInitial = item.roomInitial.code;
                    assetOpExport.costCenterNameInitial = item.roomInitial.name;
                    assetOpExport.costCenterCodeFinal = item.roomFinal.code;
                    assetOpExport.costCenterNameFinal = item.roomFinal.name;
                    items.push(assetOpExport);

                    this.assetOpHttpService.exportAssetOps(item.id).subscribe((data) => {
                    });
                });

                // alasql(`SELECT
                //                 documentType as [Tip Operatie],
                //                 assetName as [Denumirea mijlocului fix si caracteristici tehnice],
                //                 assetinvNo as [Numarul de inventar],
                //                 CAST([quantity] AS NUMBER) as [Buc.],
                //                 CAST([assetValueInv] AS NUMBER) as [Valoarea de inventar],
                //                 costCenterCodeInitial as [Cod Centru de cost predator],
                //                 costCenterNameInitial as [Denumire centru de cost predator],
                //                 costCenterCodeFinal as [Cod Centru de cost primitor],
                //                 costCenterNameFinal as [Centru de cost primitor]
                //                 INTO XLSX('Transferuri.xlsx',?) FROM ?   ` ,
                //                  [ options, items ]);

                this.refreshAssetOperations();

    // console.log(JSON.stringify(assetInvDetails.items));

    // let alaData: Array<any> = new Array<any>();
    // assetInvDetails.items.forEach((item: any) => {
    //     let alaItem: any = {};
    //     alaItem.costCenterName = item.costCenterFinal.name;
    //     alaData.push(alaItem);
    // })

    // alasql("SELECT [costCenterName] as [Cost Center] INTO XLSX('template Transfer1.xlsx',?) FROM ?"
    //                         , [ options, alaData ]);

            });
    }

    public exportExel() {

        this.hideExportBtn = true;
        let params: Array<Param> = null;

        params = this.getFilters();
        this.assetOpHttpService
            .exportExel(params)
            .subscribe((blob) => {
        fileSaveAs(blob.body, 'Export.xlsx');
        this.hideExportBtn = false;
      });
    }
    public openMail(){
        // var atach= '';
        // document.querySelector('#openMail').addEventListener('change', function(){
        //     var reader = new FileReader();
        //     reader.onload = function(){
        //         var arrayBuffer = this.result;
        //       console.log('BUFFER: ',arrayBuffer);
        //         document.querySelector('#openMail').innerHTML = arrayBuffer + '  '+arrayBuffer.byteLength;
        //         }
        //     this.atach= reader.readAsArrayBuffer(this.files[0]);
        //   }, false);

          var subject = "Transferuri pentru confirmare";
          var message='';
          var message1 = 'Va rugam sa deschideti fisierul atasat.';
          var message2 = 'Verificati daca ati receptionat toate obiectele trimise si confirmati cu DA / NU.';
          var message3 = ' Salvati fisierul si trimiteti forward catre mijloacefixe@piraeusbank.ro';
          var attach='D:\\demo.xslx';
          // window.open('mailto:someone@somewhere.com?Subject=hello?Body='+ atach,'email');
          if(confirm('Esti sigur ca vrei sa trimiti mail cu operatiile selectate?')) {
        let params: Array<Param> = this.getFilters();
        let items: Array<AssetOpConfirm> = new Array<AssetOpConfirm>();
        console.log(params);
        this.assetOpHttpService.get(1, 1000000, 'modifiedAt', 'desc', params, null, 'details').subscribe(
            (result: PagedResult<any>) => {

                let options = {
                    sheetid: 'aviz_transfer',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                let index: number = 0;
                result.items.forEach((item: any) => {
                    let assetOpConfirm: AssetOpConfirm = new AssetOpConfirm();
                    index++;
                    assetOpConfirm.index = index;
                    assetOpConfirm.assetOpId = item.id;
                    assetOpConfirm.invNo = item.asset.invNo;
                    assetOpConfirm.assetName = item.asset.name;
                    assetOpConfirm.roomCodeIni = item.roomInitial.code;
                    assetOpConfirm.locationCodeIni = item.locationInitial.name;
                    assetOpConfirm.roomCodeFin = item.roomFinal.code;
                    assetOpConfirm.locationCodeFin = item.locationFinal.name;
                    assetOpConfirm.assetTypeName = item.assetType.name;
                    assetOpConfirm.purchaseDate = item.asset.purchaseDate;
                    assetOpConfirm.serialNumber = item.asset.serialNumber;
                    items.push(assetOpConfirm);
                });

                // alasql("SELECT id as [Nr. Crt], asset->invNo  as [Numar inventar plecare], asset->name  as [Denumire], roomInitial->code as [Centru de cost plecare], locationInitial->name as [Cladire plecare], roomFinal->code as [Centru de cost destinatie], locationFinal->name as [Cladire destinatie], [Confirmat], [Numar inventar primit] INTO XLSX('aviz_transfer.xlsx',?) FROM ?   WHERE DATE(modifiedAt) > DATE('" +
                //                 this.transferStartDate + "') AND DATE(modifiedAt) < DATE('"
                //             + this.transferEndDate + "')"
                //             , [ options, assetOp.items ]);
                // alasql("SELECT [index] as [Nr. Crt], assetOpId as [OptimaId],  invNo  as [Numar inventar plecare], assetName  as [Denumire], roomCodeIni as [Centru de cost plecare], locationCodeIni as [Cladire plecare], roomCodeFin as [Centru de cost destinatie], locationCodeFin as [Cladire destinatie], [Confirmat], [Numar inventar primit] INTO XLSX('aviz_transfer.xlsx',?) FROM ? ",
                //     [ options, items ]);
                //setTimeout(5000);
              //  this.assetOpHttpService.downloadMailOps(items).subscribe((data) => {  // PIRAEUS
                // this.assetOpHttpService.downloadMailOpsBnr(items).subscribe((data) => {  // BNR
                //     });
                //   //  setTimeout(5000);
                //     this.assetOpHttpService
                //   //  .download()  PIRAEUS
                //     .downloadBnr() // BNR
                //     .subscribe((blob) => {
                //         // this.downloadFinished.emit(null);
                //         // console.log(JSON.stringify(res));
                //         // console.log('download finished!');
                //         //this.downloadFile(res);
                //         fileSaveAs(blob);
                //     });
            });

            location.href = 'mailto:?subject=' + subject+'&body='+message1
            + '%0D%0A' + message2 + '%0D%0A' + message3 + '&Attached=' + attach;
        }

    }

    public sendMail(): void{
          if(confirm('Esti sigur ca vrei sa exporti cu operatiile selectate?')) {
            console.log(this.selectedLocations);
            let locationId: number = this.selectedLocations.length > 0 ? this.selectedLocations[0].id : null;
             locationId == null ? locationId = 0 : locationId;
                let url = `${AppConfig.reportingServer}Report.aspx/?report=assetoperations&locationId=${locationId}&reportType=ASSETOPERATIONS`;
                 window.open(url);
        }
    }

    public assetOpListConfirm() {

        if(confirm('Esti sigur ca vrei sa trimiti mail cu operatiile selectate?')) {

        let params: Array<Param> = this.getFilters();
        let items: Array<AssetOpConfirm> = new Array<AssetOpConfirm>();
        console.log(params);
        this.assetOpHttpService.get(1, 1000000, 'modifiedAt', 'desc', params, null, 'details').subscribe(
            (result: PagedResult<any>) => {

                let options = {
                    sheetid: 'aviz_transfer',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                let index: number = 0;
                result.items.forEach((item: any) => {
                    let assetOpConfirm: AssetOpConfirm = new AssetOpConfirm();
                    index++;
                    assetOpConfirm.index = index;
                    assetOpConfirm.assetOpId = item.id;
                    assetOpConfirm.invNo = item.asset.invNo;
                    assetOpConfirm.assetName = item.asset.name;
                    assetOpConfirm.roomCodeIni = item.roomInitial.code;
                    assetOpConfirm.locationCodeIni = item.locationInitial.name;
                    assetOpConfirm.roomCodeFin = item.roomFinal.code;
                    assetOpConfirm.locationCodeFin = item.locationFinal.name;
                    assetOpConfirm.assetTypeName = item.assetType.name;
                    assetOpConfirm.purchaseDate = item.asset.purchaseDate;
                    assetOpConfirm.serialNumber = item.asset.serialNumber;
                    assetOpConfirm.quantity = item.asset.quantity;
                    assetOpConfirm.valueInv = item.asset.valueInv;
                    assetOpConfirm.employeeInternalCodeInitial = item.employeeInitial.internalCode;
                    assetOpConfirm.employeeInternalCodeFinal = item.employeeFinal.internalCode;
                    assetOpConfirm.employeeFirstNameInitial = item.employeeInitial.firstName;
                    assetOpConfirm.employeeFirstNameFinal = item.employeeFinal.firstName;
                    assetOpConfirm.employeeLastNameInitial = item.employeeInitial.lastName;
                    assetOpConfirm.employeeLastNameFinal = item.employeeFinal.lastName;
                    items.push(assetOpConfirm);
                });

                // alasql("SELECT id as [Nr. Crt], asset->invNo  as [Numar inventar plecare], asset->name  as [Denumire], roomInitial->code as [Centru de cost plecare], locationInitial->name as [Cladire plecare], roomFinal->code as [Centru de cost destinatie], locationFinal->name as [Cladire destinatie], [Confirmat], [Numar inventar primit] INTO XLSX('aviz_transfer.xlsx',?) FROM ?   WHERE DATE(modifiedAt) > DATE('" +
                //                 this.transferStartDate + "') AND DATE(modifiedAt) < DATE('"
                //             + this.transferEndDate + "')"
                //             , [ options, assetOp.items ]);
                // alasql("SELECT [index] as [Nr. Crt], assetOpId as [OptimaId],  invNo  as [Numar inventar plecare], assetName  as [Denumire], roomCodeIni as [Centru de cost plecare], locationCodeIni as [Cladire plecare], roomCodeFin as [Centru de cost destinatie], locationCodeFin as [Cladire destinatie], [Confirmat], [Numar inventar primit] INTO XLSX('aviz_transfer.xlsx',?) FROM ? ",
                //     [ options, items ]);

               //     this.assetOpHttpService.sendEmail(items).subscribe((data) => {  // PIRAEUS
                    // this.assetOpHttpService.sendEmailBnr(items).subscribe((data) => {  // BNR
                    this.assetOpHttpService.sendEmailPiraeus(items).subscribe((data) => {  // PIRAEUS

                        });


            });

        }
    }

    public loadFile(ev) {
        this.fileEvent = ev;
    }

    public doImport() {

        if (this.importIndex < this.importLines.length) {
            if (this.importLines[this.importIndex].assetOpId < 1) return
            this.assetOpHttpService.upload(this.importLines[this.importIndex]).subscribe((data) => {
                this.importIndex = this.importIndex + 1;
                this.doImport();
            });
        }
        else {
            this.fileEvent = null;
            this.importDataModal.hide();
            this.importIndex = 0;
            this.importLines = new Array<AssetOpConf>();

            this.refreshAssetOperations();
        }
    }

    public importMailOperationData() {
                console.log('FILES: ', this.fileEvent);
                if (this.fileEvent === null) return;
                // alasql.promise(`select
                //                         [OptimaId] as AssetOpId,
                //                         [Numar inventar plecare] as InvNo,
                //                         [Denumire] as Name,
                //                         [Centru de cost plecare] as CostCenterCodeInitial,
                //                         [Cladire plecare] as CostCenterNameInitial,
                //                         [Centru de cost destinatie] as CostCenterCodeFinal,
                //                         [Cladire destinatie] as CostCenterNameFinal,
                //                         [Confirmat] as Confirm

                //                     from FILE (?,  {headers: true})`, [this.fileEvent])

            //     alasql.promise(`select
            //                             [OptimaId] as AssetOpId,
            //                             [Inventory Number (Barcode if implemented)] as InvNo,
            //                             [Inventory Item ] as Name,
            //                             [Old cost center] as CostCenterCodeInitial,
            //                             [Old User] as CostCenterNameInitial,
            //                             [New cost center] as CostCenterCodeFinal,
            //                             [New User] as CostCenterNameFinal,
            //                             [Confirm] as Confirm

            // from FILE (?,  {headers: true})`, [this.fileEvent])
            //     .then((importLines: Array<AssetOpConf>) => {

            //             this.importDataModal.show();

            //             this.importIndex = 0;
            //             this.importLines = importLines;

            //             this.doImport();
            //     });

            }

        public upload() {
            let fi = this.fileInput.nativeElement;
            if (fi.files && fi.files[0]) {
                let fileToUpload = fi.files[0];
                this.assetOpHttpService
                    .import(fileToUpload)
                    .subscribe(res => {
                        this.uploadFinished.emit(null);
                    });
            }
        }


    public trackByCode(index: number, tableItem: any): string {
                return tableItem.code;
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

    // public exportTransfersCategToExcel() {

    //     let params: Array<Param> = this.getFilters();

    //     this.assetOpHttpService.get(1, 1000000, 'modifiedAt', 'desc', params, null, 'details').subscribe(
    //         (assetOp: PagedResult<any>) => {

    //                 console.log(JSON.stringify(assetOp));

    //             let options = {
    //                 sheetid: 'Template transf categorie',
    //                 headers: true,
    //                 column: { style: { Font: { Bold: '1' } } },
    //                 rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
    //                 cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
    //             };

    //             alasql("SELECT 3 as [Property Type],[Asset Seq A],asset->invNo  as [Asset Seq No N], 0 as [Asset Component], [Cost Center], 33 as [General Category], 2 as [Category], 1 as [Sub Category], [Branch], 1 as [Quantity] INTO XLSX('template Transfer2.xlsx',?) FROM ?   WHERE DATE(modifiedAt) > DATE('" +
    //                         this.transferStartDate + "') AND DATE(modifiedAt) < DATE('"
    //                         + this.transferEndDate + "')"
    //                         , [ options, assetOp.items ]);

    //         });
    // }

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

    public showPhoto(type: string){

        switch (type) {
            case 'TRANSFER':
            this.refreshAssetOpEntityFiles(this.assetOpList.selectedItems[0].valueAdd, true);
                break;
            default:
                break;
        }
}

    refreshAssetOpEntityFiles(assetId: number, loadAssetImages: boolean) {
        this.entityFileHttpService.getByEntity('TRANSFER', assetId, '', 0)
        .subscribe((entityFiles: Array<EntityFile>) => {
            this.existingAssetImages.splice(0, this.existingAssetImages.length);
            this.assetImages.forEach((assetImage: AssetImage) => this.existingAssetImages.push(assetImage));
            this.assetImages.splice(0, this.assetImages.length);
            this.assetFiles.splice(0, this.assetFiles.length);
            // this.entityFileMemoryDataSource.clear();
            entityFiles.forEach((entityFile: EntityFile) => {
                if (entityFile.fileType.startsWith('application/')) {
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
    private loadAssetImages() {
        if ((this.assetImages !== null) && (this.assetImages.length > 0)) {
            this.imageCount = this.assetImages.length;
            this.imageIndex = 0;
            this.imageLoading = true;
            this.loadAssetImageLoop();
        }
    }

    private loadAssetImageLoop() {
        if (this.assetImages.length > this.imageIndex) {
            const assetImage: AssetImage = this.assetImages[this.imageIndex];
            if (assetImage.fileContent === null) {
                this.entityFileHttpService.downloadPdf(assetImage.entityFile.id).subscribe((image) => {
                    console.log(JSON.stringify(image));
                    this.createImageFromBlob(assetImage, image as any);
                    this.loadNextAssetImage();
                });
            } else {
                this.loadNextAssetImage();
            }
        }
    }

    private createImageFromBlob(assetImage: AssetImage, image: Blob) {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
           // this.images.push(reader.result);
           assetImage.fileContent = reader.result;
           // console.log(assetImage);
        }, false);
        if (image) {
           reader.readAsDataURL(image);
           fileSaveAs(image, 'BM - ' + assetImage.entityFile.entityId + '.pdf');
        }
    }

    private loadNextAssetImage() {
        if (this.imageIndex < (this.assetImages.length - 1)) {
            this.imageIndex++;
            this.loadAssetImageLoop();
        } else {
            this.imageLoading = false;
        }
    }

    /*end project*/
  doSimpleSearch($event: string) {
    this.filter = $event;
    this.checkForRefresh();
  }
}

enum OperationType {
    NotSet = 1,
    ProcessAssetOp = 2,
    ProcessManagerAssetOp = 3
}
