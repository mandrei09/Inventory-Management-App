import { Param } from './../../../model/common/param';
import { Component, ViewChild } from '@angular/core';
import { GenericManage } from '../../generic/generic.manage';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AppStateHttpService } from '../../../services/http/common/app-state.http.service';
import { AppState } from '../../../model/api/common/app-state';
import {AppStateAddEditComponent} from './app-state-add-edit/app-state-add-edit.component';
import {MatDialog} from '@angular/material/dialog';
import { saveAs as fileSaveAs } from 'file-saver-es';
import {DialogService} from '../../../services/dialog.service';
import {AppStateListComponent} from './app-state.list';

@Component({
    selector: 'app-state-manage',
    templateUrl: 'app-state.manage.html',
    providers: [ AppStateHttpService ]
})
export class AppStateManageComponent extends GenericManage<AppState, number> {

    @ViewChild('itemDetailModal') modal: ModalDirective;
    @ViewChild('appStateList') appStateList: AppStateListComponent;

    public filter: string = '';
    isCollapsed: boolean = true;
    constructor(public appStateHttpService: AppStateHttpService,
                public dialog: MatDialog,
                public dialogService: DialogService
    ) {
        super();
    }

  public onAddNew() {
    this.onAddEditItem();
  }

  onItemDelete(item: AppState) {
    this.dialogService
      .confirmDialog({
        title: 'Confirm Action',
        message: 'Do you want to confirm this action?',
        confirmCaption: 'Confirm',
        cancelCaption: 'Cancel',
      })
      .subscribe((confirmed: any) => {
        if (confirmed) {
          this.deleteItem(item);
          // this.notificationSvc.success('Asset successfully deleted.');
        }
      });
  }

  public deleteItem(item: AppState) {
    const filters = new Array<Param>;

    this.appStateHttpService.delete(item.id!).subscribe(() => {
      this.appStateList.refresh(filters);
    });
  }

  public onAddEditItem(item: AppState | null = null) {
    const dialogRef = this.dialog.open(AppStateAddEditComponent, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { item: item }
    });

    dialogRef.afterClosed().subscribe((item: AppState) => {
      if (item !== null) {
        const filters = new Array<Param>;
        this.appStateList.refresh(filters);
      }
    });
  }

  public onItemEdit(item: AppState) {
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
      this.appStateHttpService
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
