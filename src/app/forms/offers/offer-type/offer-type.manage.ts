import { Param } from './../../../model/common/param';
import { Component, ViewChild } from '@angular/core';
import { GenericManage } from '../../generic/generic.manage';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { OfferTypeHttpService } from '../../../services/http/offfers/offer-type.http.service';
import { OfferType } from '../../../model/api/offer/offer-type';
import { OfferTypeListComponent } from './offer-type.list';
import { OfferTypeDetailComponent } from './offer-type.detail';
import {OfferTypeAddEditComponent} from './offer-type-add-edit/offer-type-add-edit.component';
import {MatDialog} from '@angular/material/dialog';
import { saveAs as fileSaveAs } from 'file-saver-es';

@Component({
    selector: 'app-offer-type-manage',
    templateUrl: 'offer-type.manage.html',
    providers: [ OfferTypeHttpService ]
})
export class OfferTypeManageComponent extends GenericManage<OfferType, number> {

    @ViewChild('offerTypeDetailModal') offerTypeDetailModal: ModalDirective;
    @ViewChild('offerTypeList') offerTypeList: OfferTypeListComponent;
    @ViewChild('offerTypeDetail') offerTypeDetail: OfferTypeDetailComponent;
    isCollapsed: boolean = true;
    public filter: string = '';
    showExportBtn = true;

    constructor(public offerTypeHttpService: OfferTypeHttpService,
    public dialog: MatDialog) {
        super();
    }

  public onAddNew() {
    this.onAddEditItem();
  }

  public deleteItem(event) {
    // this.onAddEditItem();
  }

  public onAddEditItem(item: OfferType | null = null) {
    const dialogRef = this.dialog.open(OfferTypeAddEditComponent, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { item: item }
    });

    dialogRef.afterClosed().subscribe((item: OfferType) => {
      if (item !== null) this.refresh();
    });
  }

  // public onItemEdit(item: Area) {
  //   this.onAddEditItem(item);
  // }

    public detailInitialize() {
        super.detailInitialize();
        this.offerTypeDetailModal.show();
    }

    public detailTerminate() {
        super.detailTerminate();
        this.offerTypeDetailModal.hide();
    }

    public refresh() {
        const params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));

        this.offerTypeList.refresh(params);
    }

    public getFilters(): Array<Param> {
      const params: Array<Param> = new Array<Param>();
      params.push(new Param('filter', this.filter));

      return params;
  }

    public export() {
      this.showExportBtn = false;
      let params: Array<Param> = null;

      params = this.getFilters();
      this.offerTypeHttpService.export(params).subscribe((blob) => {
        fileSaveAs(blob.body, 'Export.xlsx');
        this.showExportBtn = true;
      });
    }

    collapsed(event: any): void {
        // console.log(event);
      }
      expanded(event: any): void {
        // console.log(event);
      }
}
