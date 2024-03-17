import { Component } from '@angular/core';
import { MasterType } from '../../../model/api/assets/master-type';
import { GenericDropDownList } from '../../generic/generic.drop-down.list';

@Component({
    selector: 'app-master-type-drop-down-list',
    templateUrl: '../../generic/generic.drop-down.list.html'
})
export class MasterTypeDropDownList extends GenericDropDownList<MasterType, number> {
    constructor() {
        super('name', 'asc');
    }
}