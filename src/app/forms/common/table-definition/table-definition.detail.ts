import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TableDefinition } from '../../../model/common/table-definition';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'app-table-definition-detail',
    templateUrl: 'table-definition.detail.html'
})
export class TableDefinitionDetailComponent extends GenericDetail<TableDefinition, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new TableDefinition();
    }

    public resetForm() {
        this.detailForm.reset();
    }
}
