import { Component } from '@angular/core';
import { InterCompany } from '../../../model/api/assets/inter-company';
import { GenericDropDownList } from '../../generic/generic.drop-down.list';

@Component({
    selector: 'app-inter-company-drop-down-list',
    templateUrl: '../../generic/generic.drop-down.list.html'
})
export class InterCompanyDropDownListComponent extends GenericDropDownList<InterCompany, number> {
    constructor() {
        super('name', 'asc');
    }
}