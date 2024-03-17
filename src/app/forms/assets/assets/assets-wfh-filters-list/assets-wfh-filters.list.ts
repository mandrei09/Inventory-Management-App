import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {GenericTableList} from '../../../generic/generic.table.list';
import {Param} from '../../../../model/common/param';
import {Company} from '../../../../model/api/assets/company';
import {Model} from 'echarts';
import {NotifyService} from '../../../../services/notify.service';
import {Brand} from '../../../../model/api/assets/brand';
import {InvState} from '../../../../model/api/inventory/inv-state';
import {AssetDepTotal} from '../../../../model/api/assets/asset-dep-total';
import {AppData} from '../../../../app-data';
import {InvStateHttpService} from '../../../../services/http/inventory/inv-state.http.service';
import {EmployeeHttpService} from '../../../../services/http/administration/employee.http.service';

@Component({
  selector: 'app-asset-wfh-filters-list',
  templateUrl: './assets-wfh-filters.list.html',
  inputs: [ 'listTemplate', 'clearFilters' ],
})

export class AssetWFHFiltersListComponent extends GenericTableList<any, number> {
  public columns: any = [];

  textFilter: {};

  public query = '';
  public filteredList = [];
  public elementRef;
  public listTemplate: string = 'ASSETS';
  public loadType: string = '';
  public totals: AssetDepTotal = null;
  constructor(public myElement: ElementRef,
              public invStateHttpService: InvStateHttpService,
              public employeeHttpService: EmployeeHttpService) {
    super('id', 'asc');

    this.columns = AppData.ColumnDefinitions[this.listTemplate];
    this.initializeTable();
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
    if (this.query !== ''){
      this.filteredList = this.tableItems.filter(function(el){
        return el.item.invNo.toString().toLowerCase().indexOf(this.query.toLowerCase()) > -1;
      }.bind(this));
    } else{
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

  public filterCust(ev) {
    console.log(JSON.stringify(ev));
  }

}
