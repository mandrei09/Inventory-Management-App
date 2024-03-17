import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { BudgetManager } from '../../../model/api/assets/budget-manager';
import { PagedResult } from '../../../model/common/paged-result';
import { Param } from '../../../model/common/param';
import { BudgetManagerHttpService } from '../../../services/http/administration/budget-manager.http.service';
import { GenericManage } from '../../generic/generic.manage';
import {MatDialog} from '@angular/material/dialog';
import {Administration} from '../../../model/api/administration/administration';
import {AdministrationAddEditComponent} from '../administrations/administration-add-edit/administration-add-edit.component';
import {BudgetManagerAddEditComponent} from './budget-manager-add-edit/budget-manager-add-edit.component';
import { saveAs as fileSaveAs } from 'file-saver-es';


@Component({
    selector: 'budget-manager-manage',
    templateUrl: 'budget-manager.manage.html',
    providers: []
})
export class BudgetManagerManage extends GenericManage<BudgetManager, number> {

     @ViewChild('itemDetailModal') modal: ModalDirective;

    public filter: string = '';
    isCollapsed: boolean = true;

    constructor(public budgetManagerHttpService: BudgetManagerHttpService,
    public dialog: MatDialog) {
        super();
    }

  public onAddNew() {
    this.onAddEditItem();
  }

  public onAddEditItem(item: BudgetManager | null = null) {
    const dialogRef = this.dialog.open(BudgetManagerAddEditComponent, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { item: item }
    });

    dialogRef.afterClosed().subscribe((item: BudgetManager) => {
      // if (item !== null) this.refresh();
    });
  }

  public onItemEdit(item: BudgetManager) {
    this.onAddEditItem(item);
  }

     public detailInitialize() {
        this.modal.show();
    }

    public detailTerminate() {
        this.modal.hide();
    }

    public getFilters(): Array<Param> {
      const params: Array<Param> = new Array<Param>();
      return params;
  }

    public export() {
      let params: Array<Param> = null;
      params = this.getFilters();
      this.budgetManagerHttpService
          .export(params)
          .subscribe((blob) => {
              fileSaveAs(blob.body, 'tax.xlsx');
      });
  }

    collapsed(event: any): void {
        // console.log(event);
      }

      expanded(event: any): void {
        // console.log(event);
      }
}
