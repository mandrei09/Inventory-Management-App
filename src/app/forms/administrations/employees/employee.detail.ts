import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';
import { Department } from '../../../model/api/administration/department';
import { Employee } from '../../../model/api/administration/employee';
import { AppConfig } from '../../../config';
import { CostCenter } from '../../../model/api/administration/cost-center';

@Component({
    selector: 'app-employee-detail',
    templateUrl: 'employee.detail.html',
    outputs: ['departmentNeeded', 'costCenterNeeded']
})
export class EmployeeDetailComponent extends GenericDetail<Employee, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    public departmentRequired: boolean = AppConfig.EMPLOYEE_DEPARTMENT_REQUIRED;
    public departmentSelectedEvent: EventEmitter<Department>;
    public departmentNeeded: EventEmitter<void> = new EventEmitter<void>();
    public costCenterNeeded: EventEmitter<void> = new EventEmitter<void>();

    public selectedDepartment: Department;
    public selectedCostCenter: CostCenter[];
    public state  = 'INACTIV';

    setItemDefaultValues() {
        this.item = new Employee(0, '', '', '', null, '', '', false);
    }

    public edit(item: Employee) {

        super.edit(item);
        this.state = item.isDeleted === true ? 'INACTIV' : 'ACTIV';
    }

    public resetForm() {
        this.detailForm.reset();
    }

    public set department(department: Department) {
        this.setDepartment(department);
    }

    public setDepartment(department: Department) {
        this.selectedDepartment = department;
        this.item.departmentId = department != null ? department.id : null;
    }

    public askForDepartment() {
        this.departmentNeeded.emit(null);
    }

    public set costCenter(costCenter: CostCenter[]) {
        this.setCostCenter(costCenter);
    }

    public setCostCenter(costCenters: CostCenter[]) {
        this.selectedCostCenter = costCenters;
        this.item.costCenters = costCenters.length > 0 ? costCenters : null;
    }

    public askForCostCenter() {
        this.costCenterNeeded.emit(null);
    }

    public saveItem() {
        if ((this.departmentRequired) && (this.selectedDepartment == null)) {
            alert('Departamentul este obligatoriu!');
        }
        else {
            super.saveItem();
        }
    }

    public setSelectedState(selectedState: boolean) {
        this.item.isDeleted = selectedState;
        this.state = selectedState === true ? 'INACTIV' : 'ACTIV';
    }
}