import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Badge } from '../../../model/api/common/badge';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'badge-detail',
    templateUrl: 'badge.detail.html'
})
export class BadgeDetail extends GenericDetail<Badge, number> {

    @ViewChild('detailForm') detailForm: FormGroup;
    public enabled  = false;
    setItemDefaultValues() {
        this.item = new Badge(0, '', '', false);
    }

    public resetForm() {
        this.detailForm.reset();
    }

    public edit(item: Badge) {
        super.edit(item);
    }

    public saveItem() {
        super.saveItem();
    }
}