import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppState } from '../../../model/api/common/app-state';
import { GenericDetail } from '../../generic/generic.detail';


@Component({
    selector: 'app-state-detail',
    templateUrl: 'app-state.detail.html'
})
export class AppStateDetailComponent extends GenericDetail<AppState, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new AppState(0, '', '', '', '', '');
    }

    public resetForm() {
        this.detailForm.reset();
    }
}
