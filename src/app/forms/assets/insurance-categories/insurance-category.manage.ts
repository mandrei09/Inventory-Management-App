import { Param } from './../../../model/common/param';
import { Component, ViewChild } from '@angular/core';
import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { saveAs as fileSaveAs } from 'file-saver-es';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { AppUtils } from '../../../common/app.utils';
import { InsuranceCategory } from '../../../model/api/assets/insurance-category';
import { InsuranceCategoryList } from './insurance-category.list';
import { InsuranceCategoryDetail } from './insurance-category.detail';
import { InsuranceCategoryHttpService } from '../../../services/http/assets/insurance-category.http.service';
import {MatDialog} from '@angular/material/dialog';
import {Article} from '../../../model/api/assets/article';
import {ArticleAddEditComponent} from '../../administrations/article/article-add-edit/article-add-edit.component';
import {InsuranceCategoryAddEditComponent} from './insurance-category-add-edit/insurance-category-add-edit.component';

@Component({
    selector: 'insurance-category-manage',
    templateUrl: 'insurance-category.manage.html',
})
export class InsuranceCategoryManage extends GenericManage<InsuranceCategory, number> {

    @ViewChild('insuranceCategoryDetailModal') insuranceCategoryDetailModal: ModalDirective;
    @ViewChild('insuranceCategoryList') insuranceCategoryList: InsuranceCategoryList;
    @ViewChild('insuranceCategoryDetail') insuranceCategoryDetail: InsuranceCategoryDetail;

    public filter: string = '';
    isCollapsed: boolean = true;
    constructor(
        public insuranceCategoryHttpService: InsuranceCategoryHttpService,
        public dialog: MatDialog) {
        super();
    }

  public onAddNew() {
    this.onAddEditItem();
  }

  public onAddEditItem(item: InsuranceCategory | null = null) {
    const dialogRef = this.dialog.open(InsuranceCategoryAddEditComponent, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { item: item }
    });

    dialogRef.afterClosed().subscribe((item: InsuranceCategory) => {
      // if (item !== null) this.refresh();
    });
  }

  public onItemEdit(item: InsuranceCategory) {
    this.onAddEditItem(item);
  }

    public detailInitialize() {
        super.detailInitialize();
        this.insuranceCategoryDetailModal.show();
    }

    public detailTerminate() {
        super.detailTerminate();
        this.insuranceCategoryDetailModal.hide();
    }


    public refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));

        this.insuranceCategoryList.refresh(params);
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

    public export() {

        let params: Array<Param> = null;

        params = this.getFilters();
        this.insuranceCategoryHttpService
            .export(params)
            .subscribe((blob) => {
                fileSaveAs(blob.body, 'InterCategories.xlsx');
            });
    }

    collapsed(event: any): void {
        // console.log(event);
      }

      expanded(event: any): void {
        // console.log(event);
      }
}
