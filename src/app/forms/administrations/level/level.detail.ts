import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Level } from '../../../model/api/administration/level';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'app-level-detail',
    templateUrl: 'level.detail.html',
})
export class LevelDetailComponent extends GenericDetail<Level, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new Level(0, '', '');
    }

    public resetForm() {
        this.detailForm.reset();
    }
}
