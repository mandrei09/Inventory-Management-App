import { Param } from './../../../model/common/param';
import { Component, ViewChild } from '@angular/core';
import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { saveAs as fileSaveAs } from 'file-saver-es';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Brand } from '../../../model/api/assets/brand';
import { BrandList } from './brand.list';
import { BrandDetail } from './brand.detail';
import { BrandHttpService } from '../../../services/http/assets/brand.http.service';
import { DictionaryItemHttpService } from '../../../services/http/administration/dictionary-item.http.service';
import { DictionaryItemListComponent } from '../../administrations/dictionary-item/dictionary-item.list';
import { DictionaryItem } from '../../../model/api/administration/dictionary-item';
import {Model} from '../../../model/api/assets/model';
import {ModelAddEditComponent} from '../models/model-item-add-edit/model-add-edit.component';
import {MatDialog} from '@angular/material/dialog';
import {BrandAddEditComponent} from './brand-item-add-edit/brand-add-edit.component';

@Component({
    selector: 'brand-manage',
    templateUrl: 'brand.manage.html',
    styleUrls: ['./brand.manage.scss'],
    providers: [DictionaryItemHttpService]
})
export class BrandManage extends GenericManage<Brand, number> {

    @ViewChild('brandDetailModal') brandDetailModal: ModalDirective;
    @ViewChild('brandList') brandList: BrandList;
    @ViewChild('brandDetail') brandDetail: BrandDetail;

    @ViewChild('dictionaryItemListModal') dictionaryItemListModal: ModalDirective;
    @ViewChild('dictionaryItemList') dictionaryItemList: DictionaryItemListComponent;

    public selectedDictionaryItem: DictionaryItem = null;

    public filter: string = '';
    isCollapsed: boolean = true;
    constructor(
        public dialog: MatDialog,
        public brandHttpService: BrandHttpService, public dictionaryItemHttpService: DictionaryItemHttpService) {
        super();
    }

    public onAddNew() {
      this.onAddEditItem();
    }

    public onAddEditItem(item: Brand | null = null) {
      const dialogRef = this.dialog.open(BrandAddEditComponent, {
        panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
        data: { item: item }
      });

      dialogRef.afterClosed().subscribe((item: Brand) => {
        if (item !== null) this.brandList.refreshItems();
      });
    }

    public onItemEdit(item: Brand) {
      this.onAddEditItem(item);
    }

    public detailInitialize() {
        super.detailInitialize();
        this.brandDetailModal.show();
    }

    public detailTerminate() {
        super.detailTerminate();
        this.brandDetailModal.hide();
    }

    public onBrandDetailDictionaryItemNeeded() {
        this.brandDetailModal.hide();
        this.selectDictionaryItem();
    }

    public onDictionaryItemListCancel() {
        this.dictionaryItemListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.brandDetailModal.show();
        }
    }


    public refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));

        this.brandList.refresh(params);
    }

    public selectDictionaryItem() {
        this.dictionaryItemListModal.show();
        this.dictionaryItemList.refresh(null);
    }

    public setSelectedDictionaryItem() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedDictionaryItem = this.dictionaryItemList.selectedItem;
                this.dictionaryItemListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.brandDetail.dictionaryItem = this.dictionaryItemList.selectedItem;
                this.dictionaryItemListModal.hide();
                this.brandDetailModal.show();
                break;
        }
    }


    // public exportToExcel(){

    //      let params: Array<Param> = null;

    //     if ((this.filter != null) && (this.filter.length > 0)) {
    //         params = new Array<Param>();
    //         params.push(new Param('filter', this.filter));
    //     }

    //     this.locationHttpService.get(1, 10000000, 'code', 'asc', params, null).subscribe(
    //         (data: PagedResult<Location>) => {

    //             let options = {
    //                 sheetid: 'Buildings',
    //                 headers: true,
    //                 column: { style: { Font: { Bold: '1' } } },
    //                 rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
    //                 cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
    //             };

    //             alasql(`SELECT id as [Id],
    //                 code as [Cod],
    //                 name as [Denumire],
    //                 region->name as [Judet],
    //                 admCenter->name as [Regiune]
    //                 INTO XLSX("Buildings.xlsx",?) FROM ?`, [ options, data.items ]);

    //         });

    // }

    public getFilters(): Array<Param> {
        let params: Array<Param> = new Array<Param>();
        params.push(new Param('filter', this.filter));

        return params;
    }

    public exportToExcel() {

        let params: Array<Param> = null;

        params = this.getFilters();
        this.brandHttpService
            .export(params)
            .subscribe((blob) => {
                fileSaveAs(blob, 'brands.xlsx');
            });
    }

    collapsed(event: any): void {
        // console.log(event);
      }

      expanded(event: any): void {
        // console.log(event);
      }
}
