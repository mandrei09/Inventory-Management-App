import { Component } from '@angular/core';
import { CategoryEN } from '../../../model/api/assets/category-en';
import { GenericDropDownList } from '../../generic/generic.drop-down.list';

@Component({
    selector: 'app-category-drop-down-list',
    templateUrl: '../../generic/generic.drop-down.list.html'
})
export class CategoryENDropDownListComponent extends GenericDropDownList<CategoryEN, number> {
    constructor() {
        super('name', 'asc');
    }
}