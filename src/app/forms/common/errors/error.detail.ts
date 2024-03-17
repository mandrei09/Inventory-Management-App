import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';
import { Error } from '../../../model/api/common/error';

@Component({
    selector: 'app-error-detail',
    templateUrl: 'error.detail.html'
})
export class ErrorDetailComponent extends GenericDetail<Error, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new Error();
    }

    public resetForm() {
        this.detailForm.reset();
    }
}