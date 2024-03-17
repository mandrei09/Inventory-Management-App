import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { GenericManage } from '../../generic/generic.manage';
import { AssetCategory } from '../../../model/api/assets/asset-category';

import { AssetCategoryHttpService } from '../../../services/http/assets/asset-category.http.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AssetTypeHttpService } from '../../../services/http/assets/asset-type.http.service';
import {MatDialog} from '@angular/material/dialog';
import {ProjectType} from '../../../model/api/assets/project-type';
import {ProjectTypeAddEditComponent} from '../project-types/project-type-add-edit/project-type-add-edit.component';
import {Area} from '../../../model/api/administration/area';
import {AssetCategoryAddEditComponent} from './asset-category-add-edit/asset-category-add-edit.component';
import { saveAs as fileSaveAs } from 'file-saver-es';

@Component({
    selector: 'app-asset-category-manage',
    templateUrl: 'asset-category.manage.html',
    providers: [ AssetCategoryHttpService ]
})
export class AssetCategoryManageComponent extends GenericManage<AssetCategory, number> {

     @ViewChild('assetCategoryDetailModal') modal: ModalDirective;

     public filter: string = '';
     isCollapsed: boolean = true;

    constructor(public assetCategoryHttpService: AssetCategoryHttpService, public assetTypeHttpService: AssetTypeHttpService,
    public dialog: MatDialog) {
        super();
    }

  public onAddNew() {
    this.onAddEditItem();
  }

  public onAddEditItem(item: AssetCategory | null = null) {
    const dialogRef = this.dialog.open(AssetCategoryAddEditComponent, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { item: item }
    });

    dialogRef.afterClosed().subscribe((item: AssetCategory) => {
      // if (item !== null) this.refresh();
    });
  }

  public onItemEdit(item: Area) {
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
      this.assetCategoryHttpService
          .export(params)
          .subscribe((blob) => {
              fileSaveAs(blob.body, 'categorii.xlsx');
      });
  }

    collapsed(event: any): void {
        // console.log(event);
      }

      expanded(event: any): void {
        // console.log(event);
      }
}
