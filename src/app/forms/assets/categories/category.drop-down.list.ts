import { Component } from '@angular/core';
import { Category } from '../../../model/api/assets/category';
import { GenericDropDownList } from '../../generic/generic.drop-down.list';

@Component({
    selector: 'app-category-drop-down-list',
    templateUrl: '../../generic/generic.drop-down.list.html'
})
export class CategoryDropDownListComponent extends GenericDropDownList<Category, number> {
    constructor() {
        super('name', 'asc');
    }
}