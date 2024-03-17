import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ExpAccount } from '../../../model/api/administration/exp-account';
import { PagedResult } from '../../../model/common/paged-result';
import { Param } from '../../../model/common/param';
import { AdmCenterHttpService } from '../../../services/http/administration/adm-center.http.service';
import { ExpAccountHttpService } from '../../../services/http/administration/exp-account.http.service';
import { GenericManage } from '../../generic/generic.manage';
import {InterCompanyEN} from '../../../model/api/assets/inter-company-en';
import {InterCompanyEnAddEditComponent} from '../../assets/inter-companies-en/inter-company-en-add-edit/inter-company-en-add-edit.component';
import {Area} from '../../../model/api/administration/area';
import {ExpAccountAddEditComponent} from './exp-account-add-edit/exp-account-add-edit.component';
import {MatDialog} from '@angular/material/dialog';
import { ExpAccountList } from './exp-account.list';
import { saveAs as fileSaveAs } from 'file-saver-es';


@Component({
    selector: 'exp-account-manage',
    templateUrl: 'exp-account.manage.html',
    providers: [ AdmCenterHttpService ]
})
export class ExpAccountManage extends GenericManage<ExpAccount, number> {

     @ViewChild('itemDetailModal') modal: ModalDirective;
     @ViewChild('expAccountList')  expAccountList: ExpAccountList;

    public filter: string = '';
    isCollapsed: boolean = true;

    constructor(public expAccountHttpService: ExpAccountHttpService,
    public dialog: MatDialog) {
        super();
    }
  public onAddNew() {
    this.onAddEditItem();
  }

  public onAddEditItem(item: ExpAccount | null = null) {
    const dialogRef = this.dialog.open(ExpAccountAddEditComponent, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { item: item }
    });

    dialogRef.afterClosed().subscribe((item: ExpAccount) => {
      // if (item !== null) this.refresh();
    });
  }

  public onItemEdit(item: ExpAccount) {
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
      this.expAccountHttpService
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
