import { Param } from './../../../model/common/param';
import { Component, ViewChild } from '@angular/core';
import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { saveAs as fileSaveAs } from 'file-saver-es';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AppUtils } from '../../../common/app.utils';
import { InterCompanyEN } from '../../../model/api/assets/inter-company-en';
import { InterCompanyENListComponent } from './inter-company-en.list';
import { InterCompanyENDetailComponent } from './inter-company-en.detail';
import { InterCompanyENHttpService } from '../../../services/http/assets/inter-company-en.http.service';
import {MatDialog} from '@angular/material/dialog';
import {Area} from '../../../model/api/administration/area';
import {InterCompanyEnAddEditComponent} from './inter-company-en-add-edit/inter-company-en-add-edit.component';

@Component({
    selector: 'app-inter-company-en-manage',
    templateUrl: 'inter-company-en.manage.html',
})
export class InterCompanyENManageComponent extends GenericManage<InterCompanyEN, number> {

    @ViewChild('interCompanyENDetailModal') interCompanyENDetailModal: ModalDirective;
    @ViewChild('interCompanyENList') interCompanyENList: InterCompanyENListComponent;
    @ViewChild('interCompanyDetail') interCompanyENDetail: InterCompanyENDetailComponent;

    public filter: string = '';
    isCollapsed: boolean = true;
    constructor(
        public interCompanyENHttpService: InterCompanyENHttpService,
        public dialog: MatDialog) {
        super();
    }

public onAddNew() {
  this.onAddEditItem();
}

public onAddEditItem(item: InterCompanyEN | null = null) {
  const dialogRef = this.dialog.open(InterCompanyEnAddEditComponent, {
    panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
    data: { item: item }
  });

  dialogRef.afterClosed().subscribe((item: InterCompanyEN) => {
    if (item !== null) this.refresh();
  });
}

public onItemEdit(item: Area) {
  this.onAddEditItem(item);
}

    public detailInitialize() {
        super.detailInitialize();
        this.interCompanyENDetailModal.show();
    }

    public detailTerminate() {
        super.detailTerminate();
        this.interCompanyENDetailModal.hide();
    }



    public refresh() {
        const params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        this.interCompanyENList.refresh(params);
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
        const params: Array<Param> = new Array<Param>();
        params.push(new Param('filter', this.filter));

        return params;
    }

    public export() {

        let params: Array<Param> = null;

        params = this.getFilters();
        this.interCompanyENHttpService
            .export(params)
            .subscribe((blob) => {
                fileSaveAs(blob.body, 'InterCompanies-EN.xlsx');
            });
    }

    collapsed(event: any): void {
        // console.log(event);
      }
      expanded(event: any): void {
        // console.log(event);
      }
}
