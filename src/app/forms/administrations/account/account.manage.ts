import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Param } from '../../../model/common/param';
import { AccountHttpService } from '../../../services/http/administration/account.http.service';
import { AdmCenterHttpService } from '../../../services/http/administration/adm-center.http.service';
import { GenericManage } from '../../generic/generic.manage';
import { Account } from '../../../model/api/administration/account';
import {AccountAddEditComponent} from './account-add-edit/account-add-edit.component';
import {MatDialog} from '@angular/material/dialog';
import { AccountList } from './account.list';
import { saveAs as fileSaveAs } from 'file-saver-es';

@Component({
    selector: 'account-manage',
    templateUrl: 'account.manage.html',
    providers: [ AdmCenterHttpService ]
})
export class AccountManage extends GenericManage<Account, number> {

     @ViewChild('itemDetailModal') modal: ModalDirective;
     @ViewChild('accountList') accountList: AccountList;

    public filter: string = '';
    isCollapsed: boolean = true;

    constructor(public accountHttpService: AccountHttpService,
                public dialog: MatDialog) {
        super();
    }

  public onAddNew() {
    this.onAddEditItem();
  }

  public onAddEditItem(item: Account | null = null) {
    const dialogRef = this.dialog.open(AccountAddEditComponent, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { item: item }
    });

    dialogRef.afterClosed().subscribe((item: Account) => {
      // if (item !== null) this.refresh();
    });
  }

  public onItemEdit(item: Account) {
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
      this.accountHttpService
          .export(params)
          .subscribe((blob) => {
              fileSaveAs(blob.body, 'tax.xlsx');
      });
  }
}
