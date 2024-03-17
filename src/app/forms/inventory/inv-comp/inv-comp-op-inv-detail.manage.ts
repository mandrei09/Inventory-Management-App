import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

import { GenericManage } from '../../generic/generic.manage';
import { Param } from '../../../model/common/param';
import { AssetCategory } from '../../../model/api/assets/asset-category';
import { AssetInvDetail } from '../../../model/api/assets/asset-inv-detail';
import { Partner } from '../../../model/api/documents/partner';
import { Department } from '../../../model/api/administration/department';
import { Employee } from '../../../model/api/administration/employee';
import { Location } from '../../../model/api/administration/location';
import { Room } from '../../../model/api/administration/room';

import { InvCompOpInvDetailHttpService } from '../../../services/http/inventory/inv-comp-op-inv-detail.http.service';
import { DepartmentDetailHttpService } from '../../../services/http/administration/department-detail.http.service';
import { EmployeeDetailHttpService } from '../../../services/http/administration/employee-detail.http.service';
import { LocationHttpService } from '../../../services/http/administration/location.http.service';
import { RoomDetailHttpService } from '../../../services/http/administration/room-detail.http.service';

@Component({
    selector: 'inv-comp-op-inv-detail-manage',
    templateUrl: 'inv-comp-op-inv-detail.manage.html',
    providers: [ DepartmentDetailHttpService, EmployeeDetailHttpService, 
        InvCompOpInvDetailHttpService, LocationHttpService, RoomDetailHttpService ]
})
export class InvCompOpInvDetailManage { //extends GenericManage<AssetInvDetail> {

    public viewMode: number = InvCompOpInvDetailManageViewMode.InvCompOpInvDetailList;

    public filter: string;
    public requestInvCompOpRefreshEvent: EventEmitter<Array<Param>> = new EventEmitter<Array<Param>>();

    public selectedDepartments: Array<Department> = new Array<Department>();
    public requestDepartmentRefreshEvent: EventEmitter<Array<Param>> = new EventEmitter<Array<Param>>();
    public requestDepartmentSelectionEvent: EventEmitter<void> = new EventEmitter<void>();
    public updateDepartmentSelectionEvent: EventEmitter<Array<Department>> = new EventEmitter<Array<Department>>();

    public selectedEmployees: Array<Employee> = new Array<Employee>();
    public requestEmployeeRefreshEvent: EventEmitter<Array<Param>> = new EventEmitter<Array<Param>>();
    public requestEmployeeSelectionEvent: EventEmitter<void> = new EventEmitter<void>();
    public updateEmployeeSelectionEvent: EventEmitter<Array<Employee>> = new EventEmitter<Array<Employee>>();

    public selectedLocations: Array<Location> = new Array<Location>();
    public requestLocationRefreshEvent: EventEmitter<Array<Param>> = new EventEmitter<Array<Param>>();
    public requestLocationSelectionEvent: EventEmitter<void> = new EventEmitter<void>();
    public updateLocationSelectionEvent: EventEmitter<Array<Location>> = new EventEmitter<Array<Location>>();

    public selectedRooms: Array<Room> = new Array<Room>();
    public requestRoomRefreshEvent: EventEmitter<Array<Param>> = new EventEmitter<Array<Param>>();
    public requestRoomSelectionEvent: EventEmitter<void> = new EventEmitter<void>();
    public updateRoomSelectionEvent: EventEmitter<Array<Room>> = new EventEmitter<Array<Room>>();

    public get invCompOpInvDetailListViewMode(): boolean { return this.viewMode === InvCompOpInvDetailManageViewMode.InvCompOpInvDetailList; }
	public get departmentListViewMode(): boolean { return this.viewMode === InvCompOpInvDetailManageViewMode.DepartmentList; }
	public get employeeListViewMode(): boolean { return this.viewMode === InvCompOpInvDetailManageViewMode.EmployeeList; }
	public get locationListViewMode(): boolean { return this.viewMode === InvCompOpInvDetailManageViewMode.LocationList; }
	public get roomListViewMode(): boolean { return this.viewMode === InvCompOpInvDetailManageViewMode.RoomList; }

    constructor(public invCompOpInvDetailHttpService: InvCompOpInvDetailHttpService,
        public employeeDetailHttpService: EmployeeDetailHttpService, public departmentDetailHttpService: DepartmentDetailHttpService,
        public locationHttpService: LocationHttpService, public roomDetailHttpService: RoomDetailHttpService) {
    }

    ngAfterViewInit() {
        this.refreshInvCompOps();
    }

    /*begin department*/
    public selectDepartments() {
        this.requestDepartmentRefreshEvent.emit(null);
        this.updateDepartmentSelectionEvent.emit(this.selectedDepartments);
        this.viewMode = InvCompOpInvDetailManageViewMode.DepartmentList;
    }

    public departmentSelectionCanceled() {
        this.viewMode = InvCompOpInvDetailManageViewMode.InvCompOpInvDetailList;
    }

    public addToDepartmentSelection(departments: Array<Department>) {
        if (departments != null) {
            departments.forEach((department) => {
                let index: number = this.selectedDepartments.indexOf(department);
                if (index < 0) this.selectedDepartments.push(department);
            });

            this.checkForRefresh();
        }
    }

    public removeFromDepartmentSelection(department: Department) {
        var index: number = this.selectedDepartments.indexOf(department);
        this.selectedDepartments.splice(index, 1);

        this.checkForRefresh();
    }

    public clearDepartmentSelection() {
        this.selectedDepartments = new Array<Department>();

        this.checkForRefresh();
    }

    public updateDepartmentSelection() {
        this.requestDepartmentSelectionEvent.emit(null);
        this.viewMode = InvCompOpInvDetailManageViewMode.InvCompOpInvDetailList;
    }
    /*end department*/

    /*begin employee*/
    public selectEmployees() {
        this.requestEmployeeRefreshEvent.emit(null);
        this.updateEmployeeSelectionEvent.emit(this.selectedEmployees);
        this.viewMode = InvCompOpInvDetailManageViewMode.EmployeeList;
    }

    public employeeSelectionCanceled() {
        this.viewMode = InvCompOpInvDetailManageViewMode.InvCompOpInvDetailList;
    }

    public addToEmployeeSelection(employees: Array<Employee>) {
        if (employees != null) {
            employees.forEach((employee) => {
                let index: number = this.selectedEmployees.indexOf(employee);
                if (index < 0) this.selectedEmployees.push(employee);
            });

            this.checkForRefresh();
        }
    }

    public removeFromEmployeeSelection(employee: Employee) {
        var index: number = this.selectedEmployees.indexOf(employee);
        this.selectedEmployees.splice(index, 1);

        this.checkForRefresh();
    }

    public clearEmployeeSelection() {
        this.selectedEmployees = new Array<Employee>();

        this.checkForRefresh();
    }

    public updateEmployeeSelection() {
        this.requestEmployeeSelectionEvent.emit(null);
        this.viewMode = InvCompOpInvDetailManageViewMode.InvCompOpInvDetailList;
    }
    /*end employee*/

    /*begin location*/
    public selectLocations() {
        this.requestLocationRefreshEvent.emit(null);
        this.updateLocationSelectionEvent.emit(this.selectedLocations);
        this.viewMode = InvCompOpInvDetailManageViewMode.LocationList;
    }

    public locationSelectionCanceled() {
        this.viewMode = InvCompOpInvDetailManageViewMode.InvCompOpInvDetailList;
    }

    public addToLocationSelection(locations: Array<Location>) {
        if (locations != null) {
            locations.forEach((location) => {
                let index: number = this.selectedLocations.indexOf(location);
                if (index < 0) this.selectedLocations.push(location);
            });

            this.checkForRefresh();
        }
    }

    public removeFromLocationSelection(location: Location) {
        var index: number = this.selectedLocations.indexOf(location);
        this.selectedLocations.splice(index, 1);

        this.checkForRefresh();
    }

    public clearLocationSelection() {
        this.selectedLocations = new Array<Location>();

        this.checkForRefresh();
    }

    public updateLocationSelection() {
        this.requestLocationSelectionEvent.emit(null);
        this.viewMode = InvCompOpInvDetailManageViewMode.InvCompOpInvDetailList;
    }
    /*end location*/

    /*begin room*/
    public selectRooms() {
        this.requestRoomRefreshEvent.emit(null);
        this.updateRoomSelectionEvent.emit(this.selectedRooms);
        this.viewMode = InvCompOpInvDetailManageViewMode.RoomList;
    }

    public roomSelectionCanceled() {
        this.viewMode = InvCompOpInvDetailManageViewMode.InvCompOpInvDetailList;
    }

    public addToRoomSelection(rooms: Array<Room>) {
        if (rooms != null) {
            rooms.forEach((room) => {
                let index: number = this.selectedRooms.indexOf(room);
                if (index < 0) this.selectedRooms.push(room);
            });

            this.checkForRefresh();
        }
    }

    public removeFromRoomSelection(room: Room) {
        var index: number = this.selectedRooms.indexOf(room);
        this.selectedRooms.splice(index, 1);

        this.checkForRefresh();
    }

    public clearRoomSelection() {
        this.selectedRooms = new Array<Room>();

        this.checkForRefresh();
    }

    public updateRoomSelection() {
        this.requestRoomSelectionEvent.emit(null);
        this.viewMode = InvCompOpInvDetailManageViewMode.InvCompOpInvDetailList;
    }
    /*end room*/

    public checkForRefresh() {
        this.refreshInvCompOps();
    }

    public refreshInvCompOps() {
        let params: Array<Param> = this.getFilters();
        this.requestInvCompOpRefreshEvent.emit(params);
    }

    public getFilters(): Array<Param> {
        let params = new Array<Param>();

        let departmentIds: Array<number> = new Array<number>();
    	let employeeIds: Array<number> = new Array<number>();
        let locationIds: Array<number> = new Array<number>();
	    let roomIds: Array<number> = new Array<number>();

        if (this.selectedDepartments != null) {
            this.selectedDepartments.forEach((department) => {
                departmentIds.push(department.id);
            });
        }

        if (this.selectedEmployees != null) {
            this.selectedEmployees.forEach((employee) => {
                employeeIds.push(employee.id);
            });
        }

        if (this.selectedLocations != null) {
            this.selectedLocations.forEach((location) => {
                locationIds.push(location.id);
            });
        }

        if (this.selectedRooms != null) {
            this.selectedRooms.forEach((room) => {
                roomIds.push(room.id);
            });
        }

        params.push(new Param("departmentIds", JSON.stringify(departmentIds)));
	    params.push(new Param("employeeIds", JSON.stringify(employeeIds)));
	    params.push(new Param("locationIds", JSON.stringify(locationIds)));
        params.push(new Param("roomIds", JSON.stringify(roomIds)));
        params.push(new Param("filter", this.filter));

        return params;
    }
}

enum InvCompOpInvDetailManageViewMode {
    InvCompOpInvDetailList = 1,
    DepartmentList = 2,
    EmployeeList = 3,
    LocationList = 4,
    RoomList = 6
}