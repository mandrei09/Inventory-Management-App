import { Param } from './../../../model/common/param';
import { Component, ViewChild } from '@angular/core';
import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { saveAs as fileSaveAs } from 'file-saver-es';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Rate } from '../../../model/api/administration/rate';
import { RateListComponent } from './rate.list';
import { RateDetailComponent } from './rate.detail';
import { RateHttpService } from '../../../services/http/administration/rate.http.service';
import {MatDialog} from '@angular/material/dialog';
import {RateAddEditComponent} from './rate-add-edit/rate-add-edit.component';

@Component({
    selector: 'app-rate-manage',
    templateUrl: 'rate.manage.html',
})
export class RateManageComponent extends GenericManage<Rate, number> {

    @ViewChild('rateDetailModal') rateDetailModal: ModalDirective;
    @ViewChild('rateList') rateList: RateListComponent;
    @ViewChild('rateDetail') rateDetail: RateDetailComponent;

    public filter: string = '';
    isCollapsed: boolean = true;
    constructor(
        public rateHttpService: RateHttpService,
        public dialog: MatDialog) {
        super();
    }

  public onAddNew() {
    this.onAddEditItem();
  }

  public onAddEditItem(item: Rate | null = null) {
    const dialogRef = this.dialog.open(RateAddEditComponent, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { item: item }
    });

    dialogRef.afterClosed().subscribe((item: Rate) => {
      // if (item !== null) this.refresh();
    });
  }

  public onItemEdit(item: Rate) {
    this.onAddEditItem(item);
  }

    public detailInitialize() {
        super.detailInitialize();
        this.rateDetailModal.show();
    }

    public detailTerminate() {
        super.detailTerminate();
        this.rateDetailModal.hide();
    }


    public refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));

        this.rateList.refresh(params);
    }


    // public exportToExcel(){

    //      let params: Array<Param> = null;

    //     if ((this.filter != null) && (this.filter.length > 0)) {
    //         params = new Array<Param>();
    //         params.push(new Param('filter', this.filter));
    //     }

    //     this.locationHttpService.get(1, 10000000, 'code', 'asc', params, null).subscribe(
    //         (data: PagedResult<Location>) => {

    //             let options = {
    //                 sheetid: 'Buildings',
    //                 headers: true,
    //                 column: { style: { Font: { Bold: '1' } } },
    //                 rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
    //                 cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
    //             };

    //             alasql(`SELECT id as [Id],
    //                 code as [Cod],
    //                 name as [Denumire],
    //                 region->name as [Judet],
    //                 admCenter->name as [Regiune]
    //                 INTO XLSX("Buildings.xlsx",?) FROM ?`, [ options, data.items ]);

    //         });

    // }

    public getFilters(): Array<Param> {
        let params: Array<Param> = new Array<Param>();
        params.push(new Param('filter', this.filter));

        return params;
    }

    public exportToExcel() {

        let params: Array<Param> = null;

        // params = this.getFilters();
        // this.rateHttpService
        //     .export(params)
        //     .subscribe((blob) => {
        //         fileSaveAs(blob, 'InterCompanies.xlsx');
        //     });
    }

    collapsed(event: any): void {
        // console.log(event);
      }

      expanded(event: any): void {
        // console.log(event);
      }
}
