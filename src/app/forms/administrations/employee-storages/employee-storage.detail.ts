import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EmployeeResource } from '../../../model/api/administration/employee-resource';
import { EmployeeStorage } from '../../../model/api/administration/employee-storage';
import { CodeNameEntity } from '../../../model/api/common/code-name-entity';
import { Storage } from '../../../model/api/stock/storage';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'employee-storage-detail',
    templateUrl: 'employee-storage.detail.html',
    outputs: ['employeeNeeded', 'storageNeeded']
})
export class EmployeeStorageDetail extends GenericDetail<EmployeeStorage, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    public storageNeeded: EventEmitter<void> = new EventEmitter<void>();
    public employeeNeeded: EventEmitter<void> = new EventEmitter<void>();

    public selectedStorage: CodeNameEntity = null;
    public selectedEmployee: EmployeeResource = null;

    setItemDefaultValues() {
        this.item = new EmployeeStorage(0, null, null);
    }

    public resetForm() {
        this.detailForm.reset();
    }

    public saveItem() {
      super.saveItem();
    }

    public set storage(storage: Storage) {
        this.selectedStorage = storage;
        this.item.storage = storage != null ? new CodeNameEntity(storage.id, storage.code, storage.name) : null;
    }

    public askForStorage() {
        this.storageNeeded.emit();
    }

    public set employee(employee: EmployeeResource) {
        this.selectedEmployee = employee;
        this.item.employee = employee != null ? new EmployeeResource(employee.id, employee.internalCode, employee.firstName, employee.lastName, employee.email) : null;
    }

    public askForEmployee() {
        this.employeeNeeded.emit();
    }
}
