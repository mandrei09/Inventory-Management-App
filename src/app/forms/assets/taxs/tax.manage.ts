import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { GenericManage } from '../../generic/generic.manage';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TaxHttpService } from '../../../services/http/assets/tax.http.service';
import { Tax } from '../../../model/api/assets/tax';
import {TaxAddEditComponent} from './tax-add-edit/tax-add-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { saveAs as fileSaveAs } from 'file-saver-es';

@Component({
    selector: 'app-tax-manage',
    templateUrl: 'tax.manage.html',
    providers: [ TaxHttpService ]
})
export class TaxManageComponent extends GenericManage<Tax, number> {

    @ViewChild('itemDetailModal') modal: ModalDirective;

    public filter: string = '';
    isCollapsed: boolean = true;
    constructor(
      public dialog: MatDialog,
      public taxHttpService: TaxHttpService
    ) {
        super();
    }

    public onAddNew() {
      this.onAddEditItem();
    }

    public onAddEditItem(item: Tax | null = null) {
      let dialogRef = this.dialog.open(TaxAddEditComponent, {
        panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
        data: { item: item }
      });

      dialogRef.afterClosed().subscribe((item: Tax) => {
        // if (item !== null) this.refresh();
      });
    }

    public onItemEdit(item: Tax) {
      this.onAddEditItem(item);
    }

    public getFilters(): Array<Param> {
      const params: Array<Param> = new Array<Param>();
      return params;
  }

    public export() {
      let params: Array<Param> = null;
      params = this.getFilters();
      this.taxHttpService
          .export(params)
          .subscribe((blob) => {
              fileSaveAs(blob.body, 'tax.xlsx');
      });
  }
}
