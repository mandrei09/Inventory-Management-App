import { Component } from '@angular/core';
import { GenericDropDownList } from '../../generic/generic.drop-down.list';
import { Plant } from '../../../model/api/assets/plant';

@Component({
    selector: 'app-plant-drop-down-list',
    templateUrl: '../../generic/generic.drop-down.list.html'
})
export class PlantDropDownListComponent extends GenericDropDownList<Plant, number> {
    constructor() {
        super('name', 'asc');
    }
}
