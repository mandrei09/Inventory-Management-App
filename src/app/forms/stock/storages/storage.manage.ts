import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Storage } from '../../../model/api/stock/storage';
import { PagedResult } from '../../../model/common/paged-result';
import { Param } from '../../../model/common/param';
import { StorageHttpService } from '../../../services/http/stock/storage.http.service';
import { GenericManage } from '../../generic/generic.manage';
import { StorageDetailComponent } from './storage.detail';
import { StorageListComponent } from './storage.list';
import {ProjectType} from '../../../model/api/assets/project-type';
import {ProjectTypeAddEditComponent} from '../../assets/project-types/project-type-add-edit/project-type-add-edit.component';
import {Area} from '../../../model/api/administration/area';
import {MatDialog} from '@angular/material/dialog';
import {StoragesAddEditComponent} from './storages-add-edit/storages-add-edit.component';
import { saveAs as fileSaveAs } from 'file-saver-es';


@Component({
    selector: 'app-storage-manage',
    templateUrl: 'storage.manage.html',
    providers: [ StorageHttpService]
})
export class StorageManageComponent extends GenericManage<Storage, number> {

     @ViewChild('storageDetailModal') storageDetailModal: ModalDirective;
     @ViewChild('storageList') storageList: StorageListComponent;
     @ViewChild('storageDetail') storageDetail: StorageDetailComponent;

     isCollapsed: boolean = true;
    public filter: string = '';

    constructor(
        public storageHttpService: StorageHttpService,
        public dialog: MatDialog) {
        super();
    }


  public onAddNew() {
    this.onAddEditItem();
  }

  public onAddEditItem(item: Storage | null = null) {
    const dialogRef = this.dialog.open(StoragesAddEditComponent, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { item: item }
    });

    dialogRef.afterClosed().subscribe((item: Storage) => {
      if (item !== null) this.refresh();
    });
  }

  public onItemEdit(item: Area) {
    this.onAddEditItem(item);
  }

     public detailInitialize() {
        this.storageDetailModal.show();
    }

    public detailTerminate() {
        this.storageDetailModal.hide();
    }

    public refresh() {
        const params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));

        this.storageList.refresh(params);
    }


    public getFilters(): Array<Param> {
      const params: Array<Param> = new Array<Param>();
      params.push(new Param('filter', this.filter));


      return params;
  }

    public export() {

      let params: Array<Param> = null;

      params = this.getFilters();
      this.storageHttpService
          .export(params)
          .subscribe((blob) => {
              fileSaveAs(blob.body, 'storage.xlsx');
          });
  }

    collapsed(event: any): void {
        // console.log(event);
      }
      expanded(event: any): void {
        // console.log(event);
      }
}
