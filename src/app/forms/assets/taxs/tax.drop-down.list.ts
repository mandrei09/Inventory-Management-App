import { Component } from '@angular/core';
import { Tax } from '../../../model/api/assets/tax';
import { GenericDropDownList } from '../../generic/generic.drop-down.list';

@Component({
    selector: 'app-tax-drop-down-list',
    templateUrl: '../../generic/generic.drop-down.list.html'
})
export class TaxDropDownListComponent extends GenericDropDownList<Tax, number> {
    constructor() {
        super('name', 'asc');
    }
}
