
import { Component, EventEmitter } from '@angular/core';
import { ConfigValue } from '../../model/api/common/config-value';
import { RoleEntity } from '../../model/api/common/role-entity';
import { GenericDetail } from '../generic/generic.detail';

@Component({
    selector: 'config-values-detail',
    templateUrl: 'config-values.detail.html',
    outputs: ['admCenterNeeded', 'roleNeeded']
})
export class ConfigValuesDetail extends GenericDetail<ConfigValue, number> {

    public isNumeric: boolean= false;
    public isDate: boolean= false;
    public isText: boolean= false;
    public isBoolean: boolean= false;

    public configValueType: string = '';
    public roleNeeded: EventEmitter<void> = new EventEmitter<void>();
    public selectedRole: RoleEntity = null;
    
    setItemDefaultValues() {
        this.item = new ConfigValue();
    }

    public edit(item: ConfigValue) {
        super.edit(item);

        //this.configValueType = item.valueType === 'T'
    }

    public onConfigValueTypeUpdate(configValueType: string) {
        this.configValueType = configValueType;

        this.isNumeric = false;
        this.isDate = false;
        this.isText = false;
        this.isBoolean = false;

        switch(this.configValueType) {
            case 'TEXT':
                this.configValueType = 'Text';
                this.isText = true;
                this.item.valueType = 'T';
                break;
            case 'NUMERIC':
                this.configValueType = 'Numeric';
                this.isNumeric = true;
                this.item.valueType = 'N';
                break;
            case 'DATE':
                this.configValueType = 'Data';
                this.isDate = true;
                this.item.valueType = 'D';
                break;
            case 'BOOLEAN':
                this.configValueType = 'Da/nu';
                this.isBoolean = true;
                this.item.valueType = 'B';
                break;
        }
    }

    public set role(role: RoleEntity) {
        this.selectedRole = role;
        this.item.roleId = role != null ? role.id : null;
    }

    public askForRole() {
        this.roleNeeded.emit();
    }

    public saveItem() {
        if ((this.selectedRole == null)) {
            alert('Rolul este obligatoriu!');
        }
        else {
            super.saveItem();
        }
    }
}