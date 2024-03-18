import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { GenericManage } from '../../generic/generic.manage';
import { AssetType } from '../../../model/api/assets/asset-type';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AssetTypeHttpService } from '../../../services/http/assets/asset-type.http.service';
import {ProjectType} from '../../../model/api/assets/project-type';
import {ProjectTypeAddEditComponent} from '../project-types/project-type-add-edit/project-type-add-edit.component';
import {AssetTypeAddEditComponent} from './asset-type-add-edit/asset-type-add-edit.component';
import {MatDialog} from '@angular/material/dialog';
import { saveAs as fileSaveAs } from 'file-saver-es';

@Component({
    selector: 'app-asset-type-manage',
    templateUrl: 'asset-type.manage.html',
    providers: [ AssetTypeHttpService ]
})
export class AssetTypeManageComponent extends GenericManage<AssetType, number> {

    @ViewChild('itemDetailModal') modal: ModalDirective;

    isCollapsed: boolean = true;
    public filter: string = '';

    constructor(public assetTypeHttpService: AssetTypeHttpService,
    public dialog: MatDialog) {
        super();
    }

  public onAddNew() {
    this.onAddEditItem();
  }

  public onAddEditItem(item: AssetType | null = null) {
    const dialogRef = this.dialog.open(AssetTypeAddEditComponent, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { item: item }
    });

    dialogRef.afterClosed().subscribe((item: AssetType) => {
      // if (item !== null) this.refresh();
    });
  }

  // public onItemEdit(item: Area) {
  //   this.onAddEditItem(item);
  // }

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
      this.assetTypeHttpService
          .export(params)
          .subscribe((blob) => {
              fileSaveAs(blob.body, 'tipuri.xlsx');
      });
  }

    collapsed(event: any): void {
        // console.log(event);
      }

      expanded(event: any): void {
        // console.log(event);
      }
}
