import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CostCenter } from '../../../model/api/administration/cost-center';
import { EmployeeCostCenter } from '../../../model/api/administration/employee-cost-center';
import { EmployeeResource } from '../../../model/api/administration/employee-resource';
import { CodeNameEntity } from '../../../model/api/common/code-name-entity';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'employee-cost-center-detail',
    templateUrl: 'employee-cost-center.detail.html',
    outputs: ['employeeNeeded', 'costCenterNeeded']
})
export class EmployeeCostCenterDetail extends GenericDetail<EmployeeCostCenter, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    public costCenterNeeded: EventEmitter<void> = new EventEmitter<void>();
    public employeeNeeded: EventEmitter<void> = new EventEmitter<void>();

    public selectedCostCenter: CodeNameEntity = null;
    public selectedEmployee: EmployeeResource = null;

    setItemDefaultValues() {
        this.item = new EmployeeCostCenter(0, null, null);
    }

    public resetForm() {
        this.detailForm.reset();
    }

    public saveItem() {
      super.saveItem();
    }

    public set costCenter(costCenter: CostCenter) {
        this.selectedCostCenter = costCenter;
        this.item.costCenter = costCenter != null ? new CodeNameEntity(costCenter.id, costCenter.code, costCenter.name) : null;
    }

    public askForCostCenter() {
        this.costCenterNeeded.emit();
    }

    public set employee(employee: EmployeeResource) {
        this.selectedEmployee = employee;
        this.item.employee = employee != null ? new EmployeeResource(employee.id, employee.internalCode, employee.firstName, employee.lastName, employee.email) : null;
    }

    public askForEmployee() {
        this.employeeNeeded.emit();
    }
}
