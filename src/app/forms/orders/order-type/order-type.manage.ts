import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, ViewChild } from '@angular/core';
import { GenericManage } from '../../generic/generic.manage';
import { DictionaryType } from '../../../model/api/administration/dictionary-type';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { OrderTypeHttpService } from '../../../services/http/orders/order-type.http.service';
import { OrderType } from '../../../model/api/order/order-type';
import { OrderTypeListComponent } from './order-type.list';
import { OrderTypeDetailComponent } from './order-type.detail';
import {OrderTypeAddEditComponent} from './order-type-add-edit/order-type-add-edit.component';
import {MatDialog} from '@angular/material/dialog';
import { saveAs as fileSaveAs } from 'file-saver-es';


@Component({
    selector: 'app-order-type-manage',
    templateUrl: 'order-type.manage.html',
    providers: [ OrderTypeHttpService ]
})
export class OrderTypeManageComponent extends GenericManage<OrderType, number> {

    @ViewChild('orderTypeDetailModal') orderTypeDetailModal: ModalDirective;
    @ViewChild('orderTypeList') orderTypeList: OrderTypeListComponent;
    @ViewChild('orderTypeDetail') orderTypeDetail: OrderTypeDetailComponent;
    isCollapsed: boolean = true;
    public filter: string = '';
    showExportBtn = true;

    constructor(
      public orderTypeHttpService: OrderTypeHttpService,
      public dialog: MatDialog,
    ) {
        super();
    }

    public onAddNew() {
      this.onAddEditItem();
    }

    public onItemEdit(item: OrderType) {
      this.onAddEditItem(item);
    }

    public onAddEditItem(item: OrderType | null = null) {
      const dialogRef = this.dialog.open(OrderTypeAddEditComponent, {
        panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
        data: { item: item }
      });

      dialogRef.afterClosed().subscribe((item: OrderType) => {
        if (item !== null) this.orderTypeList.refreshItems();
      });
    }

    public addNewItem() {
        super.addNewItem();
    }

    public editItem() {
        super.editItem();
    }

    public detailInitialize() {
        super.detailInitialize();
        this.orderTypeDetailModal.show();
    }

    public detailTerminate() {
        super.detailTerminate();
        this.orderTypeDetailModal.hide();
    }

    public refresh() {
        const params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));

        this.orderTypeList.refresh(params);
    }

    public getFilters(): Array<Param> {
      const params: Array<Param> = new Array<Param>();
      params.push(new Param('filter', this.filter));

      return params;
  }

    public export() {
      this.showExportBtn = false;
      let params: Array<Param> = null;

      params = this.getFilters();
      this.orderTypeHttpService.export(params).subscribe((blob) => {
        fileSaveAs(blob.body, 'Export.xlsx');
        this.showExportBtn = true;
      });
    }

    collapsed(event: any): void {
        // console.log(event);
      }
      expanded(event: any): void {
        // console.log(event);
      }
}
