import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { GenericManage } from '../../generic/generic.manage';
import { AssetClass } from '../../../model/api/assets/asset-class';

import { AssetClassHttpService } from '../../../services/http/assets/asset-class.http.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {MatDialog} from '@angular/material/dialog';
import {Dimension} from '../../../model/api/administration/dimension';
import {DimensionAddEditComponent} from '../dimensions/dimension-add-edit/dimension-add-edit.component';
import {AssetClassAddEditComponent} from './asset-class-add-edit/asset-class-add-edit.component';
import { saveAs as fileSaveAs } from 'file-saver-es';

@Component({
    selector: 'app-asset-class-manage',
    templateUrl: 'asset-class.manage.html',
    providers: [ AssetClassHttpService ]
})
export class AssetClassManageComponent extends GenericManage<AssetClass, number> {

    @ViewChild('itemDetailModal') modal: ModalDirective;

    isCollapsed: boolean = true;
    public filter: string = '';

    constructor(public assetClassHttpService: AssetClassHttpService,
    public dialog: MatDialog) {
        super();
    }

  public onAddNew() {
    this.onAddEditItem();
  }

  public onAddEditItem(item: AssetClass | null = null) {
    const dialogRef = this.dialog.open(AssetClassAddEditComponent, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { item: item }
    });

    dialogRef.afterClosed().subscribe((item: AssetClass) => {
      // if (item !== null) this.refresh();
    });
  }

  public onItemEdit(item: AssetClass) {
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
      this.assetClassHttpService
          .export(params)
          .subscribe((blob) => {
              fileSaveAs(blob.body, 'clase.xlsx');
      });
  }

    collapsed(event: any): void {
        // console.log(event);
      }

      expanded(event: any): void {
        // console.log(event);
      }
}
