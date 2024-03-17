import { Component, ElementRef } from '@angular/core';
import { AppData } from '../../app-data';
import { GenericTableList } from '../../forms/generic/generic.table.list';
import { AssetDepTotal } from '../../model/api/assets/asset-dep-total';
import { Param } from '../../model/common/param';

@Component({
    selector: 'app-dashboard-entity-list',
    templateUrl: 'dashboard-entity.list.html',
    inputs: [ 'listTemplate' ],
})
export class DashboardEntityListComponent extends GenericTableList<any, number> {
    public query = '';
    public filteredList = [];
    public elementRef;
    public listTemplate: string = 'DASBOARDENTITIES';
    public loadType: string = '';
    public totals: AssetDepTotal = null;
    public filterSearch: string;


    constructor(public myElement: ElementRef) {
        super('invNo', 'asc');

        this.columns = AppData.ColumnDefinitions[this.listTemplate];
        this.elementRef = myElement;
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listTemplate];
        super.refresh(filters);
    }

    public setCurrentPageData(pageData: any) {
        this.totals = pageData.totals;
        super.setCurrentPageData(pageData);
    }

    public filter() {
        if (this.query !== ''){
            this.filteredList = this.tableItems.filter(function(el){
                return el.item.invNo.toString().toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        }else{
            this.filteredList = [];
        }
    }

    public select(item){
        this.query = item;
        this.filteredList = [];
        if(item != null){
            this.tableItems = this.tableItems.filter(function(el){
                return el.item.invNo.toString().toLowerCase().indexOf(item.toLowerCase()) > -1;
            })
        }
    }
}
