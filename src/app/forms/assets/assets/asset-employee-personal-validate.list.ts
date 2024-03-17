import { Component, ElementRef } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';
import * as _ from 'underscore';
import { AssetDepTotal } from '../../../model/api/assets/asset-dep-total';
import { AppData } from '../../../app-data';
import { Param } from '../../../model/common/param';

@Component({
    selector: 'app-asset-employee-personal-validate-list',
    // templateUrl: '../../assets/assets/asset-employee-personal-validate.list.html',
    templateUrl: '../../generic/generic.table.list.html',
})
export class AssetEmployeePersonalValidateListComponent extends GenericTableList<any, number> {
    public query = '';
    public filteredList = [];
    public elementRef;
    public listTemplate: string = 'ASSETS';
    public loadType: string = '';
    public totals: AssetDepTotal = null;

    constructor(public myElement: ElementRef) {
        super('invNo', 'asc');

        this.columns = AppData.ColumnDefinitions[this.listTemplate];
        if (this.columns) {
          this.initializeTable();
        }
        this.elementRef = myElement;
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listTemplate];
        this.initializeTable();
        super.refresh(filters);
    }

    public setCurrentPageData(pageData: any) {
        this.totals = pageData.totals;
        super.setCurrentPageData(pageData);
    }

    public filter() {
        if (this.query !== '') {
            this.filteredList = this.tableItems.filter(function(el) {
                return el.item.invNo.toString().toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        } else {
            this.filteredList = [];
        }
    }

    public select(item) {
        this.query = item;
        this.filteredList = [];
        if (item != null) {
            this.tableItems = this.tableItems.filter(function(el) {
                return el.item.invNo.toString().toLowerCase().indexOf(item.toLowerCase()) > -1;
            });
        }
    }
}
