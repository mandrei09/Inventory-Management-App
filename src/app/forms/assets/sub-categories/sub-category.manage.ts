import { Param } from './../../../model/common/param';
import { Component, ViewChild } from '@angular/core';
import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { saveAs as fileSaveAs } from 'file-saver-es';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AppUtils } from '../../../common/app.utils';
import { Category } from '../../../model/api/assets/category';
import { CategoryHttpService } from '../../../services/http/assets/category.http.service';
import { CategoryENHttpService } from '../../../services/http/assets/category-en.http.service';
import { CategoryENListComponent } from '../categories-en/category-en.list';
import { CategoryEN } from '../../../model/api/assets/category-en';
import { CategoryListComponent } from '../categories/category.list';
import { SubCategoryHttpService } from '../../../services/http/assets/sub-category.http.service';
import { SubCategoryListComponent } from './sub-category.list';
import { SubCategoryDetailComponent } from './sub-category.detail';
import { SubCategory } from '../../../model/api/assets/sub-category';
import {SubCategoryAddEditComponent} from './sub-category-add-edit/sub-category-add-edit.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'app-sub-category-manage',
    templateUrl: 'sub-category.manage.html',
    providers: [ CategoryHttpService, CategoryENHttpService ]
})
export class SubCategoryManageComponent extends GenericManage<SubCategory, number> {

    @ViewChild('subCategoryDetailModal') subCategoryDetailModal: ModalDirective;
    @ViewChild('subCategoryList') subCategoryList: SubCategoryListComponent;
    @ViewChild('subCategoryDetail') subCategoryDetail: SubCategoryDetailComponent;
    @ViewChild('categoryListModal') categoryListModal: ModalDirective;
    @ViewChild('categoryList') categoryList: CategoryListComponent;
    @ViewChild('categoryENListModal') categoryENListModal: ModalDirective;
    @ViewChild('categoryENList') categoryENList: CategoryENListComponent;

    public filter: string = '';
    public selectedCategory: Category = null;
    public selectedCategoryEN: CategoryEN = null;
    isCollapsed: boolean = true;
    constructor(
        public dialog: MatDialog,
        public subCategoryHttpService: SubCategoryHttpService,
        public categoryENHttpService: CategoryENHttpService,
        public categoryHttpService: CategoryHttpService) {
        super();
    }

    public addNewItem() {
        super.addNewItem();

        this.subCategoryDetail.category = null;
        this.subCategoryDetail.categoryEN = null;
    }

  public onAddNew() {
    this.onAddEditItem();
  }

  public onItemEdit(item: SubCategory) {
    this.onAddEditItem(item);
  }
    public onAddEditItem(item: SubCategory | null = null) {
      let dialogRef = this.dialog.open(SubCategoryAddEditComponent, {
        panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
        data: { item: item }
      });

      dialogRef.afterClosed().subscribe((item: SubCategory) => {
        if (item !== null) { this.refresh(); }
      });
    }

    public editItem() {
        super.editItem();

        const subCategory: SubCategory = this.selectedItem as SubCategory;

        this.subCategoryDetail.category = null;
        if ((subCategory != null) && (subCategory.category != null)) {
            this.categoryHttpService
                .getById(subCategory.category.id)
                .subscribe((category: Category) => {
                    this.subCategoryDetail.category = category;
                });
        }


        this.subCategoryDetail.categoryEN = null;
        if ((subCategory != null) && (subCategory.categoryEN != null)) {
            this.categoryENHttpService
                .getById(subCategory.categoryEN.id)
                .subscribe((categoryEN: CategoryEN) => {
                    this.subCategoryDetail.categoryEN = categoryEN;
                });
        }
    }

    public detailInitialize() {
        super.detailInitialize();
        this.subCategoryDetailModal.show();
    }

    public detailTerminate() {
        super.detailTerminate();
        this.subCategoryDetailModal.hide();
    }

    public onSubCategoryDetailCategoryNeeded() {
        this.subCategoryDetailModal.hide();
        this.selectCategory();
    }

    public onCategoryListCancel() {
        this.categoryListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.subCategoryDetailModal.show();
        }
    }


    public onSubCategoryDetailCategoryENNeeded() {
        this.subCategoryDetailModal.hide();
        this.selectCategoryEN();
    }

    public onCategoryENListCancel() {
        this.categoryENListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.subCategoryDetailModal.show();
        }
    }



    public refresh() {
        const params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        this.subCategoryList.refresh(params);
    }

    public selectCategory() {
        this.categoryListModal.show();
        this.categoryList.refresh(null);
    }

    public setSelectedCategory() {
        switch (this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedCategory = this.categoryList.selectedItem;
                this.categoryListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.subCategoryDetail.category = this.categoryList.selectedItem;
                this.categoryListModal.hide();
                this.subCategoryDetailModal.show();
                break;
            default:
                break;
        }
    }

    public unselectCategory() {
        this.selectedCategory = null;
        this.refresh();
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
                this.subCategoryDetail.categoryEN = this.categoryENList.selectedItem;
                this.categoryENListModal.hide();
                this.subCategoryDetailModal.show();
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
        this.subCategoryHttpService
            .export(params)
            .subscribe((blob) => {
                fileSaveAs(blob.body, 'categories.xlsx');
            });
    }

    collapsed(event: any): void {
        // console.log(event);
      }
      expanded(event: any): void {
        // console.log(event);
      }
}
