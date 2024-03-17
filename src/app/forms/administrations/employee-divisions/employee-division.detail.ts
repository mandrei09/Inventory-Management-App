import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CostCenter } from '../../../model/api/administration/cost-center';
import { Division } from '../../../model/api/administration/division';
import { EmployeeCostCenter } from '../../../model/api/administration/employee-cost-center';
import { EmployeeDivision } from '../../../model/api/administration/employee-division';
import { EmployeeResource } from '../../../model/api/administration/employee-resource';
import { CodeNameEntity } from '../../../model/api/common/code-name-entity';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'employee-division-detail',
    templateUrl: 'employee-division.detail.html',
    outputs: ['employeeNeeded', 'divisionNeeded']
})
export class EmployeeDivisionDetail extends GenericDetail<EmployeeDivision, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    public divisionNeeded: EventEmitter<void> = new EventEmitter<void>();
    public employeeNeeded: EventEmitter<void> = new EventEmitter<void>();

    public selectedDivision: CodeNameEntity = null;
    public selectedEmployee: EmployeeResource = null;

    setItemDefaultValues() {
        this.item = new EmployeeDivision(0, null, null, null);
    }

    public resetForm() {
        this.detailForm.reset();
    }

    public saveItem() {
      super.saveItem();
    }

    public set division(division: Division) {
        this.selectedDivision = division;
        this.item.division = division != null ? new CodeNameEntity(division.id, division.code, division.name) : null;
    }

    public askForDivision() {
        this.divisionNeeded.emit();
    }

    public set employee(employee: EmployeeResource) {
        this.selectedEmployee = employee;
        this.item.employee = employee != null ? new EmployeeResource(employee.id, employee.internalCode, employee.firstName, employee.lastName, employee.email) : null;
    }

    public askForEmployee() {
        this.employeeNeeded.emit();
    }
}
