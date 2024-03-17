import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppConfig } from '../../../config';
import { RoleEntity } from '../../../model/api/common/role-entity';
import { ColumnDefinition } from '../../../model/common/column-definition';
import { TableDefinition } from '../../../model/common/table-definition';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'app-column-definition-detail',
    templateUrl: 'column-definition.detail.html',
    outputs: ['tableDefinitionNeeded', 'roleNeeded']
})
export class ColumnDefinitionDetail extends GenericDetail<ColumnDefinition, number> {

    @ViewChild('detailForm') detailForm: FormGroup;
    public tableDefinitionNeeded: EventEmitter<void> = new EventEmitter<void>();
    public roleNeeded: EventEmitter<void> = new EventEmitter<void>();

    public selectedTableDefinition: TableDefinition;
    public selectedRole: RoleEntity = null;
    
    setItemDefaultValues() {
        this.item = new ColumnDefinition('', '', '', '', 'left', '');
    }

    public resetForm() {
        this.detailForm.reset();
    }

    public saveItem() {
        if ((this.selectedTableDefinition == null) && (this.selectedRole == null)) {
            alert('Tabelul si rolul sunt obligatorii!');
        } else {
            super.saveItem();
        }
    }

    public set tableDefinition(tableDefinition: TableDefinition) {
        this.setTableDefinition(tableDefinition);
    }

    public setTableDefinition(tableDefinition: TableDefinition) {
        this.selectedTableDefinition = tableDefinition;
        this.item.tableDefinitionId = tableDefinition != null ? tableDefinition.id : null;
    }

    public askForTableDefinition() {
        this.tableDefinitionNeeded.emit();
    }

    public set role(role: RoleEntity) {
        this.selectedRole = role;
        this.item.roleId = role != null ? role.id : null;
    }

    public askForRole() {
        this.roleNeeded.emit();
    }

}
