import { Component } from '@angular/core';
import { DeviceType } from '../../../model/api/common/device-type';
import { GenericDropDownList } from '../../generic/generic.drop-down.list';

@Component({
    selector: 'device-type-drop-down-list',
    templateUrl: '../../generic/generic.drop-down.list.html'
})
export class DeviceTypeDropDownList extends GenericDropDownList<DeviceType, number> {
    constructor() {
        super('name', 'asc');
    }
}