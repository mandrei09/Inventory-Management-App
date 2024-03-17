import { Param } from './../../../model/common/param';
import { Component, ViewChild } from '@angular/core';
import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { saveAs as fileSaveAs } from 'file-saver-es';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CategoryEN } from '../../../model/api/assets/category-en';
import { CategoryENHttpService } from '../../../services/http/assets/category-en.http.service';
import { SubCategoryEN } from '../../../model/api/assets/sub-category-en';
import { SubCategoryENListComponent } from './sub-category-en.list';
import { SubCategoryENDetailComponent } from './sub-category-en.detail';
import { CategoryENListComponent } from '../categories-en/category-en.list';
import { SubCategoryENHttpService } from '../../../services/http/assets/sub-category-en.http.service';
import {SubCategoryEnAddEditComponent} from './sub-category-en-add-edit/sub-category-en-add-edit.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'app-sub-category-en-manage',
    templateUrl: 'sub-category-en.manage.html',
    providers: [ CategoryENHttpService ]
})
export class SubCategoryENManageComponent extends GenericManage<SubCategoryEN, number> {

    @ViewChild('subCategoryENDetailModal') subCategoryENDetailModal: ModalDirective;
    @ViewChild('subCategoryENList') subCategoryENList: SubCategoryENListComponent;
    @ViewChild('subCategoryENDetail') subCategoryENDetail: SubCategoryENDetailComponent;
    @ViewChild('categoryENListModal') categoryENListModal: ModalDirective;
    @ViewChild('categoryENList') categoryENList: CategoryENListComponent;

    public filter: string = '';
    public selectedCategoryEN: CategoryEN = null;
    isCollapsed: boolean = true;
    constructor(
        public dialog: MatDialog,
        public categoryENHttpService: CategoryENHttpService,
        public subCategoryENHttpService: SubCategoryENHttpService) {
        super();
    }

    public onAddNew() {
      this.onAddEditItem();
    }

    public onAddEditItem(item: SubCategoryEN | null = null) {
      let dialogRef = this.dialog.open(SubCategoryEnAddEditComponent, {
        panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
        data: { item: item }
      });

      dialogRef.afterClosed().subscribe((item: SubCategoryEN) => {
        if (item !== null) this.refresh();
      });
    }

    public onItemEdit(item: SubCategoryEN) {
      this.onAddEditItem(item);
    }

    public editItem() {
        super.editItem();

        const subCategory: SubCategoryEN = this.selectedItem as SubCategoryEN;

        this.subCategoryENDetail.categoryEN = null;
        if ((subCategory != null) && (subCategory.categoryEN != null)) {
            this.categoryENHttpService
                .getById(subCategory.categoryEN.id)
                .subscribe((categoryEN: CategoryEN) => {
                    this.subCategoryENDetail.categoryEN = categoryEN;
                });
        }
    }

    public detailInitialize() {
        super.detailInitialize();
        this.subCategoryENDetailModal.show();
    }

    public detailTerminate() {
        super.detailTerminate();
        this.subCategoryENDetailModal.hide();
    }

    public onCategoryENDetailCategoryENNeeded() {
        this.subCategoryENDetailModal.hide();
        this.selectCategoryEN();
    }

    public onCategoryENListCancel() {
        this.categoryENListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.subCategoryENDetailModal.show();
        }
    }


    public onSubCategoryENDetailCategoryENNeeded() {
        this.subCategoryENDetailModal.hide();
        this.selectCategoryEN();
    }

    public onSubCategoryENListCancel() {
        this.categoryENListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.subCategoryENDetailModal.show();
        }
    }



    public refresh() {
        const params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        this.subCategoryENList.refresh(params);
    }

    public selectCategoryEN() {
        this.categoryENListModal.show();
        this.categoryENList.refresh(null);
    }

    public setSelectedCategoryEN() {
        switch (this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedCategoryEN = this.categoryENList.selectedItem;
                this.categoryENListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.subCategoryENDetail.categoryEN = this.categoryENList.selectedItem;
                this.categoryENListModal.hide();
                this.subCategoryENDetailModal.show();
                break;
            default:
                break;
        }
    }

    public unselectCategoryEN() {
        this.selectedCategoryEN = null;
        this.refresh();
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
    //                 INTO XLSX('Buildings.xlsx',?) FROM ?`, [ options, data.items ]);

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
        this.subCategoryENHttpService
            .export(params)
            .subscribe((blob) => {
                fileSaveAs(blob.body, 'categories-en.xlsx');
            });
    }

    collapsed(event: any): void {
        // console.log(event);
      }
      expanded(event: any): void {
        // console.log(event);
      }
}
