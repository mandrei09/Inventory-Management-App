import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AdmCenter } from '../../../model/api/administration/adm-center';
import { Employee } from '../../../model/api/administration/employee';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'app-adm-center-detail',
    templateUrl: 'adm-center.detail.html',
    outputs: ['employeeNeeded']
})
export class AdmCenterDetailComponent extends GenericDetail<AdmCenter, number> {

    @ViewChild('detailForm') detailForm: FormGroup;
    public employeeNeeded: EventEmitter<void> = new EventEmitter<void>();

    public selectedEmployee: Employee;

    setItemDefaultValues() {
        this.item = new AdmCenter(0, '', '', '', null);
    }

    public resetForm() {
        this.detailForm.reset();
    }

    public set employee(employee: Employee) {
        this.setEmployee(employee);
    }

    public setEmployee(employee: Employee) {
        this.selectedEmployee = employee;
        this.item.employeeId = employee != null ? employee.id : null;
    }

    public askForEmployee() {
        this.employeeNeeded.emit();
    }
}