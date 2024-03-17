import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EntityType } from '../../../model/api/administration/entity-type';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'app-entity-type-detail',
    templateUrl: 'entity-type.detail.html'
})
export class EntityTypeDetailComponent extends GenericDetail<EntityType, number> {

    @ViewChild('detailForm') detailForm: FormGroup;
    public enabled  = false;
    setItemDefaultValues() {
        this.item = new EntityType(0, '', '', '');
    }

    public resetForm() {
        this.detailForm.reset();
    }

    public edit(item: EntityType) {
        super.edit(item);
    }

    public saveItem() {
        super.saveItem();
    }
}
