import { Component, EventEmitter } from '@angular/core';
import { GenericDetail } from '../../generic/generic.detail';
import { CostCenter } from '../../../model/api/administration/cost-center';
import { AdmCenter } from '../../../model/api/administration/adm-center';
import { Region } from '../../../model/api/administration/region';
import { Employee } from '../../../model/api/administration/employee';
import { Division } from '../../../model/api/administration/division';
import { Administration } from '../../../model/api/administration/administration';
// import { Location } from '../../../model/api/administration/location';
import { Room } from '../../../model/api/administration/room';

@Component({
    selector: 'app-cost-center-detail',
    templateUrl: 'cost-center.detail.html',
    outputs: ['admCenterNeeded', 'regionNeeded', 'divisionNeeded', 'administrationNeeded', 'roomNeeded',]
})
export class CostCenterDetailComponent extends GenericDetail<CostCenter, number> {

    public admCenterNeeded: EventEmitter<void> = new EventEmitter<void>();
    public regionNeeded: EventEmitter<void> = new EventEmitter<void>();
    public divisionNeeded: EventEmitter<void> = new EventEmitter<void>();

    // public employeeNeeded: EventEmitter<void> = new EventEmitter<void>();
    // public employee2Needed: EventEmitter<void> = new EventEmitter<void>();
    // public employee3Needed: EventEmitter<void> = new EventEmitter<void>();
    public administrationNeeded: EventEmitter<void> = new EventEmitter<void>();
    public roomNeeded: EventEmitter<void> = new EventEmitter<void>();

    public selectedAdmCenter: AdmCenter = null;
    public selectedRegion: Region = null;
    public selectedDivision: Division = null;

    // public selectedEmployee: Employee;
    // public selectedEmployee2: Employee;
    // public selectedEmployee3: Employee;
    public selectedAdministration: Administration;
    public selectedRoom: Room;

    public askForAdmCenter() {
        this.admCenterNeeded.emit();
    }

    public askForRegion() {
        this.regionNeeded.emit();
    }


    public askForDivision() {
        this.divisionNeeded.emit();
    }

    setItemDefaultValues() {
        this.item = new CostCenter(0, '', '', 0, null, 0, null, 0, null, 0, null, 0, null, 0, null, 0, null);
    }

    public set admCenter(admCenter: AdmCenter) {
        this.selectedAdmCenter = admCenter;
        this.item.admCenterId = admCenter != null ? admCenter.id : null;
    }

    public set region(region: Region) {
        this.selectedRegion = region;
        this.item.regionId = region != null ? region.id : null;
    }

    public set division(division: Division) {
        this.selectedDivision = division;
        this.item.divisionId = division != null ? division.id : null;
    }

    public setAdmCenter(admCenter: AdmCenter) {
        this.selectedAdmCenter = admCenter;
        this.item.admCenterId = admCenter != null ? admCenter.id : null;
    }

    public setRegion(region: Region) {
        this.selectedRegion = region;
        this.item.regionId = region != null ? region.id : null;
    }

    public setDivision(division: Division) {
        this.selectedDivision = division;
        this.item.divisionId = division != null ? division.id : null;
    }


    // public set employee(employee: Employee) {
    //     this.setEmployee(employee);
    // }

    // public setEmployee(employee: Employee) {
    //     this.selectedEmployee = employee;
    //     this.item.employeeId = employee != null ? employee.id : null;
    // }

    // public askForEmployee() {
    //     this.employeeNeeded.emit();
    // }

    // public set employee2(employee: Employee) {
    //     this.setEmployee2(employee);
    // }

    // public setEmployee2(employee: Employee) {
    //     this.selectedEmployee2 = employee;
    //     this.item.employeeId2 = employee != null ? employee.id : null;
    // }

    // public askForEmployee2() {
    //     this.employee2Needed.emit();
    // }

    // public set employee3(employee: Employee) {
    //     this.setEmployee3(employee);
    // }

    // public setEmployee3(employee: Employee) {
    //     this.selectedEmployee3 = employee;
    //     this.item.employeeId3 = employee != null ? employee.id : null;
    // }

    // public askForEmployee3() {
    //     this.employee3Needed.emit();
    // }

    public set administration(administration: Administration) {
        this.setAdministration(administration);
    }

    public setAdministration(administration: Administration) {
        this.selectedAdministration = administration;
        this.item.administrationId = administration != null ? administration.id : null;
    }

    public askForAdministration() {
        this.administrationNeeded.emit();
    }

    public set room(room: Room) {
        this.setRoom(room);
    }

    public setRoom(room: Room) {
        this.selectedRoom = room;
        this.item.roomId = room != null ? room.id : null;
    }

    public askForRoom() {
        this.roomNeeded.emit();
    }


    public saveItem() {
        // if ((AppConfig.COSTCENTER_ADMCENTER_REQUIRED) && (this.selectedAdmCenter == null)) {
        //     alert('Centrul logistic este obligatoriu!');
        // }
        // else {
        //     super.saveItem();
        // }

        super.saveItem();
    }
}
