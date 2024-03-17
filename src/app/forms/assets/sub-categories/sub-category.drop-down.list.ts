import { Component } from '@angular/core';
import { SubCategory } from '../../../model/api/assets/sub-category';
import { GenericDropDownList } from '../../generic/generic.drop-down.list';

@Component({
    selector: 'app-category-drop-down-list',
    templateUrl: '../../generic/generic.drop-down.list.html'
})
export class SubCategoryDropDownListComponent extends GenericDropDownList<SubCategory, number> {
    constructor() {
        super('name', 'asc');
    }
}