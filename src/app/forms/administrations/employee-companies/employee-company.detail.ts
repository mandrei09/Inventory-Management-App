import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EmployeeResource } from '../../../model/api/administration/employee-resource';
import { CodeNameEntity } from '../../../model/api/common/code-name-entity';
import { GenericDetail } from '../../generic/generic.detail';
import { EmployeeCompany } from '../../../model/api/administration/employee-company';
import { Company } from '../../../model/api/assets/company';

@Component({
    selector: 'employee-company-detail',
    templateUrl: 'employee-company.detail.html',
    outputs: ['employeeNeeded', 'companyNeeded']
})
export class EmployeeCompanyDetail extends GenericDetail<EmployeeCompany, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    public companyNeeded: EventEmitter<void> = new EventEmitter<void>();
    public employeeNeeded: EventEmitter<void> = new EventEmitter<void>();

    public selectedCompany: CodeNameEntity = null;
    public selectedEmployee: EmployeeResource = null;

    setItemDefaultValues() {
        this.item = new EmployeeCompany(0, null, null);
    }

    public resetForm() {
        this.detailForm.reset();
    }

    public saveItem() {
      super.saveItem();
    }

    public set costCenter(company: Company) {
        this.selectedCompany = company;
        this.item.company = company != null ? new CodeNameEntity(company.id, company.code, company.name) : null;
    }

    public askForCompany() {
        this.companyNeeded.emit();
    }

    public set employee(employee: EmployeeResource) {
        this.selectedEmployee = employee;
        this.item.employee = employee != null ? new EmployeeResource(employee.id, employee.internalCode, employee.firstName, employee.lastName, employee.email) : null;
    }

    public askForEmployee() {
        this.employeeNeeded.emit();
    }
}
