import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Activity } from '../../../model/api/assets/activity';
import { GenericDetail } from '../../generic/generic.detail';


@Component({
    selector: 'activity-detail',
    templateUrl: 'activity.detail.html'
})
export class ActivityDetail extends GenericDetail<Activity, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new Activity();
    }

    public resetForm() {
        this.detailForm.reset();
    }
}