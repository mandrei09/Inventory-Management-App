import { Component } from '@angular/core';
import { InterCompanyEN } from '../../../model/api/assets/inter-company-en';
import { GenericDropDownList } from '../../generic/generic.drop-down.list';

@Component({
    selector: 'app-inter-company-en-drop-down-list',
    templateUrl: '../../generic/generic.drop-down.list.html'
})
export class InterCompanyENDropDownListComponent extends GenericDropDownList<InterCompanyEN, number> {
    constructor() {
        super('name', 'asc');
    }
}