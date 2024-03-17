import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';
import { Division } from '../../../model/api/administration/division';
import { AppConfig } from '../../../config';
import { Department } from '../../../model/api/administration/department';


@Component({
    selector: 'app-division-detail',
    templateUrl: 'division.detail.html',
    outputs: ['departmentNeeded']
})
export class DivisionDetailComponent extends GenericDetail<Division, number> {

    @ViewChild('detailForm') detailForm: FormGroup;
    public departmentNeeded: EventEmitter<void> = new EventEmitter<void>();

    public selectedDepartment: Department;

    setItemDefaultValues() {
        this.item = new Division(0, '', '');
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



    public saveItem() {
        if ((AppConfig.LOCATION_REGION_REQUIRED) ) {
            alert('Regiunea este obligatorie!');
        } else {
            super.saveItem();
        }
    }
}