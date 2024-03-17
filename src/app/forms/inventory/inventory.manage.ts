import { Component, EventEmitter, ViewChild } from '@angular/core';
import { GenericManage, GenericManageViewMode } from '../generic/generic.manage';
import { InventoryList } from './inventory.list';
import { AccMonthListComponent } from '../accounting/acc-month.list';
import { InventoryDetail as InventoryDetailUI } from './inventory.detail';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AccMonth } from '../../model/api/accounting/acc-month';
import { AccMonthHttpService } from '../../services/http/accounting/acc-month.http.service';
import { InventoryHttpService } from '../../services/http/inventory/inventory.http.service';
import { InventoryDetailHttpService } from '../../services/http/inventory/inventory-detail.http.service';
import { Inventory } from '../../model/api/inventory/inventory';
import { InventoryDetail } from '../../model/api/inventory/inventory-detail';
import { Param } from '../../model/common/param';
import { AppUtils } from '../../common/app.utils';
import { PagedResult } from '../../model/common/paged-result';
import {InventoryAddEditComponent} from './inventory-add-edit/inventory-add-edit.component';
import {MatDialog} from '@angular/material/dialog';
import { saveAs as fileSaveAs } from 'file-saver-es';

@Component({
    selector: 'inventory.manage',
    templateUrl: 'inventory.manage.html',
    providers: [ AccMonthHttpService, InventoryHttpService, InventoryDetailHttpService ]
})
export class InventoryManage extends GenericManage<Inventory, number> {

    @ViewChild('inventoryDetailModal') inventoryDetailModal: ModalDirective;
    @ViewChild('inventoryList') inventoryList: InventoryList;
    @ViewChild('inventoryDetail') inventoryDetail: InventoryDetailUI;
    @ViewChild('accMonthListModal') accMonthListModal: ModalDirective;
    @ViewChild('accMonthList') accMonthList: AccMonthListComponent;

    public pageCode: string = 'page_inventory_component';
    public filter: string = '';
    public selectedAccMonth: AccMonth = null;
    isCollapsed: boolean = true;

    constructor(
        public dialog: MatDialog,
        public accMonthHttpService: AccMonthHttpService,
        public inventoryHttpService: InventoryHttpService,
        public inventoryDetailHttpService: InventoryDetailHttpService) {

        super();
    }

    onFilterChanged(filter: string) {
      this.filter = filter;
      // this.refreshItems();
    }

    public addNewItem() {
        // super.addNewItem();
        //
        // this.inventoryDetail.accMonth = null;

      this.onAddEditItem();
    }

    public onItemEdit(item: Inventory) {
      this.onAddEditItem(item);
    }

    // public editItem() {
    //     super.editItem();
    //
    //     let inventory: InventoryDetail = this.selectedItem as InventoryDetail;
    //
    //
    //     this.inventoryDetail.accMonth = null;
    //     if (inventory != null && inventory.accMonth != null) {
    //         this.accMonthHttpService
    //             .getById(inventory.accMonth.id)
    //             .subscribe((accMonth: AccMonth) => {
    //                 this.inventoryDetail.accMonth = accMonth;
    //             });
    //     }
    // }

    public detailInitialize() {
        super.detailInitialize();
        this.inventoryDetailModal.show();
    }

    public detailTerminate() {
        super.detailTerminate();
        this.inventoryDetailModal.hide();
    }

    public onInventoryDetailAccMonthNeeded() {
        this.inventoryDetailModal.hide();
        this.selectAccMonth();
    }

    public onAccMonthListCancel() {
        this.accMonthListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.inventoryDetailModal.show();
        }
    }

    public disableAccMonth(){
        this.inventoryHttpService
        .disable()
        .subscribe(() => {
        });
    }

    public refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param('accMonthIds', AppUtils.getIdsList<AccMonth, number>([ this.selectedAccMonth ])));

        this.inventoryList.refresh(params);
    }

    public selectAccMonth() {
        this.accMonthListModal.show();
        this.accMonthList.refresh(null);
    }

    public setSelectedAccMonth() {
        switch (this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedAccMonth = this.accMonthList.selectedItem;
                this.accMonthListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.inventoryDetail.accMonth = this.accMonthList.selectedItem;
                this.accMonthListModal.hide();
                this.inventoryDetailModal.show();
                break;
            default:
                break;
        }
    }
    public unselectAccMonth() {
        this.selectedAccMonth = null;
        this.refresh();
    }

    public getFilters(): Array<Param> {
      const params: Array<Param> = new Array<Param>();
      return params;
  }

    public export() {
      let params: Array<Param> = null;
      params = this.getFilters();
      this.inventoryHttpService
          .export(params)
          .subscribe((blob) => {
              fileSaveAs(blob.body, 'inventare.xlsx');
      });
  }

    collapsed(event: any): void {
        // console.log(event);
      }

      expanded(event: any): void {
        // console.log(event);
      }

    public onAddEditItem(item: Inventory | null = null) {
      let dialogRef = this.dialog.open(InventoryAddEditComponent, {
        panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
        data: { item: item }
      });

      dialogRef.afterClosed().subscribe((item: Inventory) => {
        // if (item !== null) this.checkF();
      });
    }

}

