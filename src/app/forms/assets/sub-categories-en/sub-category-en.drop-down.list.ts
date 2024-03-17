import { Component } from '@angular/core';
import { SubCategoryEN } from '../../../model/api/assets/sub-category-en';
import { GenericDropDownList } from '../../generic/generic.drop-down.list';

@Component({
    selector: 'app-category-drop-down-list',
    templateUrl: '../../generic/generic.drop-down.list.html'
})
export class SubCategoryENDropDownListComponent extends GenericDropDownList<SubCategoryEN, number> {
    constructor() {
        super('name', 'asc');
    }
}