import { Component, ElementRef } from '@angular/core';
import { AppData } from '../../../app-data';
import { AssetDepTotal } from '../../../model/api/assets/asset-dep-total';
import { Param } from '../../../model/common/param';
import { EmployeeHttpService } from '../../../services/http/administration/employee.http.service';
import { InvStateHttpService } from '../../../services/http/inventory/inv-state.http.service';
import { GenericTableList } from '../../generic/generic.table.list';
import {InvState} from '../../../model/api/inventory/inv-state';
import { AssetColumnFilter } from '../../../model/api/assets/asset-column-filter';
import {Material} from '../../../model/api/administration/material';
import {CostCenter} from '../../../model/api/administration/cost-center';
import {Location} from '../../../model/api/administration/location';
import { Partner } from '../../../model/api/documents/partner';

@Component({
    selector: 'app-asset-list',
    templateUrl: './assets-filters-list/assets-filters.list.html',
    styleUrls: ['./asset.list.scss'],
    inputs: [ 'listTemplate', 'clearFilters' ],
})

export class AssetListComponent extends GenericTableList<any, number> {

    public assetColumnFilters: AssetColumnFilter = null;

    public _invState: InvState[] = [];
    public get invState(): InvState[] { return this._invState; }
    public set invState(value: InvState[]) {
      this._invState = value;
      this.getAssetColumnFilters();
    }

    public _material: Material[] = [];
    public get material(): Material[] { return this._material; }
    public set material(value: Material[]) {
      this._material = value;
      this.getAssetColumnFilters();
    }

    public _location: Location[] = [];
    public get location(): Location[] { return this._location; }
    public set location(value: Location[]) {
      this._location = value;
      this.getAssetColumnFilters();
    }

    public _costCenter: CostCenter[] = [];
    public get costCenter(): CostCenter[] { return this._costCenter; }
    public set costCenter(value: CostCenter[]) {
      this._costCenter = value;
      this.getAssetColumnFilters();
    }

    public _emailTransfer: string = null;
    public get emailTransfer(): string { return this._emailTransfer; }
    public set emailTransfer(value: string) {
      this._emailTransfer = value;
      this.getAssetColumnFilters();
    }

    public _invNo: string = null;
    public get invNo(): string { return this._invNo; }
    public set invNo(value: string) {
      this._invNo = value;
      this.getAssetColumnFilters();
    }

    public _internalCode: string = null;
    public get internalCode(): string { return this._internalCode; }
    public set internalCode(value: string) {
      this._internalCode = value;
      this.getAssetColumnFilters();
    }

    public _serialNumber: string = null;
    public get serialNumber(): string { return this._serialNumber; }
    public set serialNumber(value: string) {
      this._serialNumber = value;
      this.getAssetColumnFilters();
    }

    public _quantity: string = null;
    public get quantity(): string { return this._quantity; }
    public set quantity(value: string) {
      this._quantity = value;
      this.getAssetColumnFilters();
    }

    public _subNumber: string = null;
    public get subNumber(): string { return this._subNumber; }
    public set subNumber(value: string) {
      this._subNumber = value;
      this.getAssetColumnFilters();
    }

    public _partner: Partner[] = [];
    public get partners(): Partner[] { return this._partner; }
    public set partners(value: Partner[]) {
      this._partner = value;
      this.getAssetColumnFilters();
    }

  public _admAccountCode: string = null;
  public get admAccountCode(): string { return this._admAccountCode; }
  public set admAccountCode(value: string) { this._admAccountCode = value; this.getAssetColumnFilters(); }

  public _admExpAccountCode: string = null;
  public get admExpAccountCode(): string { return this._admExpAccountCode; }
  public set admExpAccountCode(value: string) { this._admExpAccountCode = value; this.getAssetColumnFilters(); }

  public _admAssetCode: string = null;
  public get admAssetCode(): string { return this._admAssetCode; }
  public set admAssetCode(value: string) { this._admAssetCode = value; this.getAssetColumnFilters(); }

  public _description: string = null;
  public get description(): string { return this._description; }
  public set description(value: string) { this._description = value; this.getAssetColumnFilters(); }

  public _inventoryNumber: string = null;
  public get inventoryNumber(): string { return this._inventoryNumber; }
  public set inventoryNumber(value: string) { this._inventoryNumber = value; this.getAssetColumnFilters(); }


    // public setColumnFilterText($event) {
    //
    // }

    public columns: any = [];

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

  public getAssetColumnFilters() {
    const params = new Array<Param>();
    let invStateIds: number[] = [];
    let materialIds: number[] = [];
    let locationIds: number[] = [];
    let costCenterIds: number[] = [];
    let accountIds: number[] = [];
    let partnersIds : number[] = [];
    let admAccountCode: string;
    let admExpAccountCode: string;
    let admAssetCode: string;
    let description: string;
    let emailTransfer: string;
    let invNo: string;
    let internalCode: string;
    let serialNumber: string;
    let quantity: string;
    let subNumber: string;

    let inventoryNumber: string;

    let assetColumnFilter: AssetColumnFilter;

    if (this.invState) invStateIds = this.invState.map(p => p.id);
    if (this.material) materialIds = this.material.map(p => p.id);
    if (this.location) locationIds = this.location.map(p => p.id);
    if (this.costCenter) costCenterIds = this.costCenter.map(p => p.id);
    if (this.partners) partnersIds = this.partners.map(p => p.id);
    if (this.admAccountCode) admAccountCode = this.admAccountCode;
    if (this.admExpAccountCode) admExpAccountCode = this.admExpAccountCode;
    if (this.admAssetCode) admAssetCode = this.admAssetCode;
    if (this.description) description = this.description;
    if (this.emailTransfer) emailTransfer = this.emailTransfer;
    if (this.invNo) invNo = this.invNo;
    if (this.internalCode) internalCode = this.internalCode;
    if (this.serialNumber) serialNumber = this.serialNumber;
    if (this.quantity) quantity = this.quantity;
    if (this.subNumber) subNumber = this.subNumber;

    if (this.inventoryNumber) inventoryNumber = this.inventoryNumber;
    console.log("AssetChagend",this.partners);
    assetColumnFilter = new AssetColumnFilter(
      invStateIds,
      materialIds,
      locationIds,
      costCenterIds,
      accountIds,
      partnersIds,
      admAccountCode,
      admExpAccountCode,
      admAssetCode,
      description,
      emailTransfer,
      invNo,
      serialNumber,
      quantity,
      internalCode,
      subNumber,
      inventoryNumber
    );

    params.push(new Param('columnFilter', JSON.stringify(assetColumnFilter)));

    this.refresh(params);

    return params;
  }


  // public AssetColumnFilter(): Array<Param> {
  //
  //   const params = new Array<Param>();
  //   const assetColumnFilter: AssetColumnFilter = new AssetColumnFilter();
  //
  //   if (this.selectedAssetNatures != null) {
  //     assetFilter.assetNatureIds = new Array<number>();
  //     this.selectedAssetNatures.forEach((assetNature) => {
  //       assetFilter.assetNatureIds.push(assetNature.id);
  //     });
  //   }
  //
  //   if (this.invStates !== null) this.assetFilters.invStateIds = this.invStates.map(p => p.id);
  //
  //   params.push(new Param('pageSize', this.pageSize.toString()));
  //   params.push(new Param('jsonFilter', JSON.stringify(assetFilter)));
  //   // console.log(assetFilter);
  //   return params;
  // }
}
