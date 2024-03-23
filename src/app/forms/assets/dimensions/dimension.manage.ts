import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { DimensionDetailComponent as DimensionDetailUI } from './dimension.detail';
import { AssetCategoryHttpService } from '../../../services/http/assets/asset-category.http.service';
import { DimensionHttpService } from '../../../services/http/administration/dimension.http.service';
import { DimensionDetailHttpService } from '../../../services/http/administration/dimension-detail.http.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Dimension } from '../../../model/api/administration/dimension';
import { DimensionListComponent } from './dimension.list';
import { AssetCategoryListComponent } from '../asset-categories/asset-category.list';
import { AssetCategory } from '../../../model/api/assets/asset-category';
import { AppUtils } from '../../../common/app.utils';
import { DimensionDetail } from '../../../model/api/administration/dimension-detail';
import {MatDialog} from '@angular/material/dialog';
import {DimensionAddEditComponent} from './dimension-add-edit/dimension-add-edit.component';
import { saveAs as fileSaveAs } from 'file-saver-es';

@Component({
    selector: 'app-dimension-manage',
    templateUrl: 'dimension.manage.html',
    providers: [ AssetCategoryHttpService, DimensionHttpService, DimensionDetailHttpService ]
})
export class DimensionManageComponent extends GenericManage<Dimension, number> {

    @ViewChild('dimensionDetailModal') dimensionDetailModal: ModalDirective;
    @ViewChild('dimensionList') dimensionList: DimensionListComponent;
    @ViewChild('dimensionDetail') dimensionDetail: DimensionDetailUI;
    @ViewChild('assetCategoryListModal') assetCategoryListModal: ModalDirective;
    @ViewChild('assetCategoryList') assetCategoryList: AssetCategoryListComponent;

    public filter: string = '';
    public selectedAssetCategory: AssetCategory = null;
    isCollapsed: boolean = true;
    constructor(
        public assetCategoryHttpService: AssetCategoryHttpService,
        public dimensionHttpService: DimensionHttpService,
        public dimensionDetailHttpService: DimensionDetailHttpService,
        public dialog: MatDialog) {

        super();
    }

  public onAddNew() {
    this.onAddEditItem();
  }

  public onAddEditItem(item: Dimension | null = null) {
    const dialogRef = this.dialog.open(DimensionAddEditComponent, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { item: item }
    });

    dialogRef.afterClosed().subscribe((item: Dimension) => {
      // if (item !== null) this.refresh();
    });
  }

  public onItemEdit(item: Dimension) {
    this.onAddEditItem(item);
  }

    public detailInitialize() {
        super.detailInitialize();
        this.dimensionDetailModal.show();
    }

    public detailTerminate() {
        super.detailTerminate();
        this.dimensionDetailModal.hide();
    }

    public onDimensionDetailAssetCategoryNeeded() {
        this.dimensionDetailModal.hide();
        this.selectAssetCategory();
    }

    public onAssetCategoryListCancel() {
        this.assetCategoryListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.dimensionDetailModal.show();
        }
    }

    public refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param('assetCategoryIds', AppUtils.getIdsList<AssetCategory, number>([ this.selectedAssetCategory ])));

        this.dimensionList.refresh(params);
    }

    public selectAssetCategory() {
        this.assetCategoryListModal.show();
        this.assetCategoryList.refresh(null);
    }

    public setSelectedAssetCategory() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedAssetCategory = this.assetCategoryList.selectedItem;
                this.assetCategoryListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.dimensionDetail.assetCategory = this.assetCategoryList.selectedItem;
                this.assetCategoryListModal.hide();
                this.dimensionDetailModal.show();
                break;
        }
    }


    public unselectAssetCategory() {
        this.selectedAssetCategory = null;
        this.refresh();
    }

    public getFilters(): Array<Param> {
      const params: Array<Param> = new Array<Param>();
      return params;
  }

    public export() {
      let params: Array<Param> = null;
      params = this.getFilters();
      this.dimensionHttpService
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
