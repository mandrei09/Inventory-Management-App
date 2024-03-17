import { Component } from '@angular/core';
import { GenericDropDownList } from '../../generic/generic.drop-down.list';
import { AssetType } from '../../../model/api/assets/asset-type';

@Component({
    selector: 'app-asset-type-drop-down-list',
    templateUrl: '../../generic/generic.drop-down.list.html'
})
export class AssetTypeDropDownListComponent extends GenericDropDownList<AssetType, number> {
    constructor() {
        super('name', 'asc');
    }
}