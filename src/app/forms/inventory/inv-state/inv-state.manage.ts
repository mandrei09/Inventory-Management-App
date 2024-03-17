import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { InvState } from '../../../model/api/inventory/inv-state';
import { PagedResult } from '../../../model/common/paged-result';
import { Param } from '../../../model/common/param';
import { InvStateHttpService } from '../../../services/http/inventory/inv-state.http.service';
import { GenericManage } from '../../generic/generic.manage';
import {InvStateAddEditComponent} from './inv-state-add-edit/inv-state-add-edit.component';
import {MatDialog} from '@angular/material/dialog';
import { saveAs as fileSaveAs } from 'file-saver-es';

@Component({
    selector: 'inv-state-manage',
    templateUrl: 'inv-state.manage.html',
    providers: [ InvStateHttpService ]
})
export class InvStateManage extends GenericManage<InvState, number> {

     @ViewChild('itemDetailModal') modal: ModalDirective;

    public filter: string = '';
    isCollapsed: boolean = true;

    constructor(
      public dialog: MatDialog,
      public invStateHttpService: InvStateHttpService
    ) {
        super();
    }

     public detailInitialize() {
        this.modal.show();
    }

    public detailTerminate() {
        this.modal.hide();
    }

    public onAddNew() {
      this.onAddEditItem();
    }

    public onAddEditItem(item: InvState | null = null) {
      let dialogRef = this.dialog.open(InvStateAddEditComponent, {
        panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
        data: { item: item }
      });

      dialogRef.afterClosed().subscribe((item: InvState) => {
        // if (item !== null) this.itemList.refreshItems();
      });
    }

    public onItemEdit(item: InvState) {
      this.onAddEditItem(item);
    }

    public getFilters(): Array<Param> {
      const params: Array<Param> = new Array<Param>();
      return params;
  }

    public export() {
      let params: Array<Param> = null;
      params = this.getFilters();
      this.invStateHttpService
          .export(params)
          .subscribe((blob) => {
              fileSaveAs(blob.body, 'stari.xlsx');
      });
  }




    collapsed(event: any): void {
      // console.log(event);
    }

    expanded(event: any): void {
      // console.log(event);
    }
}
