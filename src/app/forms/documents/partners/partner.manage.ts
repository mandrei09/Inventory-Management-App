import { Component, EventEmitter, ViewChild } from '@angular/core';
import { GenericManage } from '../../generic/generic.manage';
import { Partner } from '../../../model/api/documents/partner';
import { PartnerHttpService } from '../../../services/http/documents/partner.http.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Param } from '../../../model/common/param';
import { PagedResult } from '../../../model/common/paged-result';
import {MatDialog} from '@angular/material/dialog';
import {Article} from '../../../model/api/assets/article';
import {ArticleAddEditComponent} from '../../administrations/article/article-add-edit/article-add-edit.component';
import {PartnerAddEditComponent} from './partner-add-edit/partner-add-edit.component';
import { PartnerListComponent } from './partner.list';
import { saveAs as fileSaveAs } from 'file-saver-es';

@Component({
    selector: 'app-partner-manage',
    templateUrl: 'partner.manage.html',
    providers: [ PartnerHttpService ]
})
export class PartnerManageComponent extends GenericManage<Partner, number> {

     @ViewChild('itemDetailModal') modal: ModalDirective;
     @ViewChild('partnerList')  partnerList: PartnerListComponent;

    public filter: string = '';
    isCollapsed: boolean = true;

    constructor(public partnerHttpService: PartnerHttpService,
    public dialog: MatDialog) {
        super();
    }

  public onAddNew() {
    this.onAddEditItem();
  }

  public onAddEditItem(item: Partner | null = null) {
    const dialogRef = this.dialog.open(PartnerAddEditComponent, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { item: item }
    });

    dialogRef.afterClosed().subscribe((item: Partner) => {
      if (item !== null) this.partnerList.refreshItems();
    });
  }

  public onItemEdit(item: Partner) {
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
      // params.push(new Param('filter', this.filter));
      // params.push(new Param('accountIds', AppUtils.getIdsList<Account, number>([ this.selectedAccount ])));
      // params.push(new Param('expAccountIds', AppUtils.getIdsList<ExpAccount, number>([ this.selectedExpAccount ])));
      // params.push(new Param('assetCategoryIds', AppUtils.getIdsList<AssetCategory, number>([ this.selectedAssetCategory ])));
      // params.push(new Param('subCategoryIds', AppUtils.getIdsList<SubCategory, number>([ this.selectedSubCategory ])));
      // params.push(new Param('subCategoryENIds', AppUtils.getIdsList<SubCategoryEN, number>([ this.selectedSubCategoryEN ])));
      // params.push(new Param('subTypeIds', AppUtils.getIdsList<SubType, number>([ this.selectedSubType ])));

      return params;
  }

    public exportToExcel() {
      let params: Array<Param> = null;
      params = this.getFilters();
      this.partnerHttpService
          .export(params)
          .subscribe((blob) => {
              fileSaveAs(blob.body, 'furnizori.xlsx');
      });
  }

    collapsed(event: any): void {
        // console.log(event);
      }

      expanded(event: any): void {
        // console.log(event);
      }
}
