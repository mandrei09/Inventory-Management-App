import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';

import { Department } from '../../../model/api/administration/department';
import { Employee } from '../../../model/api/administration/employee';

@Component({
    selector: 'app-department-detail',
    templateUrl: 'department.detail.html',
    inputs: [ 'teamLeaderLink', 'employeeSelectedEvent' ],
    outputs: ['employeeNeeded']
})
export class DepartmentDetailComponent extends GenericDetail<Department, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    public teamLeaderFullName: string = '';
    public employeeSelectedEvent: EventEmitter<Employee>;
    public employeeNeeded: EventEmitter<void> = new EventEmitter<void>();

    public teamLeaderLink: boolean = false;

    ngOnInit() {
        super.ngOnInit();

        if (this.employeeSelectedEvent != null) {
            this.employeeSelectedEvent.subscribe(
                (employee: Employee) => {
                    this.item.teamLeaderId = employee.id;
                    this.teamLeaderFullName = employee.firstName + ', ' + employee.lastName;
                });
        }
    }

    setItemDefaultValues() {
        this.item = new Department(0, '', '', null);
    }

    public askForEmployee() {
        this.employeeNeeded.emit(null);
    }

    public resetForm() {
        this.detailForm.reset();
    }
}