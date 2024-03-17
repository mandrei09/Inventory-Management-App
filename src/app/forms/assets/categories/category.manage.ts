import { Param } from './../../../model/common/param';
import { Component, ViewChild } from '@angular/core';
import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { saveAs as fileSaveAs } from 'file-saver-es';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AppUtils } from '../../../common/app.utils';
import { InterCompanyHttpService } from '../../../services/http/assets/inter-company.http.service';
import { Category } from '../../../model/api/assets/category';
import { CategoryDetailComponent } from './category.detail';
import { CategoryListComponent } from './category.list';
import { InterCompanyListComponent } from '../inter-companies/inter-company.list';
import { InterCompany } from '../../../model/api/assets/inter-company';
import { CategoryHttpService } from '../../../services/http/assets/category.http.service';
import { CategoryENHttpService } from '../../../services/http/assets/category-en.http.service';
import { CategoryENListComponent } from '../categories-en/category-en.list';
import { CategoryEN } from '../../../model/api/assets/category-en';
import {CategoriesAddEditComponent} from './categories-add-edit/categories-add-edit.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'app-category-manage',
    templateUrl: 'category.manage.html',
    providers: [ InterCompanyHttpService, CategoryENHttpService ]
})
export class CategoryManageComponent extends GenericManage<Category, number> {

    @ViewChild('categoryDetailModal') categoryDetailModal: ModalDirective;
    @ViewChild('categoryList') categoryList: CategoryListComponent;
    @ViewChild('categoryDetail') categoryDetail: CategoryDetailComponent;
    @ViewChild('interCompanyListModal') interCompanyListModal: ModalDirective;
    @ViewChild('interCompanyList') interCompanyList: InterCompanyListComponent;
    @ViewChild('categoryENListModal') categoryENListModal: ModalDirective;
    @ViewChild('categoryENList') categoryENList: CategoryENListComponent;

    public filter: string = '';
    public selectedInterCompany: InterCompany = null;
    public selectedCategoryEN: CategoryEN = null;
    isCollapsed: boolean = true;

    constructor(
        public dialog: MatDialog,
        public categoryHttpService: CategoryHttpService,
        public categoryENHttpService: CategoryENHttpService,
        public interCompanyHttpService: InterCompanyHttpService) {
        super();
    }

    public onAddNew() {
      this.onAddEditItem();
    }

    public onAddEditItem(item: Category | null = null) {
      let dialogRef = this.dialog.open(CategoriesAddEditComponent, {
        panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
        data: { item: item }
      });

      dialogRef.afterClosed().subscribe((item: Category) => {
        if (item !== null) this.refresh();
      });
    }

    public onItemEdit(item: Category) {
      this.onAddEditItem(item);
    }

    // public editItem() {
    //     super.editItem();
    //
    //     const category: Category = this.selectedItem as Category;
    //
    //     this.categoryDetail.interCompany = null;
    //     if ((category != null) && (category.interCompany != null)) {
    //         this.interCompanyHttpService
    //             .getById(category.interCompany.id)
    //             .subscribe((interCompany: InterCompany) => {
    //                 this.categoryDetail.interCompany = interCompany;
    //             });
    //     }
    //
    //
    //     this.categoryDetail.categoryEN = null;
    //     if ((category != null) && (category.categoryEN != null)) {
    //         this.categoryENHttpService
    //             .getById(category.categoryEN.id)
    //             .subscribe((categoryEN: CategoryEN) => {
    //                 this.categoryDetail.categoryEN = categoryEN;
    //             });
    //     }
    // }

    public detailInitialize() {
        super.detailInitialize();
        this.categoryDetailModal.show();
    }

    public detailTerminate() {
        super.detailTerminate();
        this.categoryDetailModal.hide();
    }

    public onCategoryDetailInterCompanyNeeded() {
        this.categoryDetailModal.hide();
        this.selectInterCompany();
    }

    public onInterCompanyListCancel() {
        this.interCompanyListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.categoryDetailModal.show();
        }
    }


    public onCategoryDetailCategoryENNeeded() {
        this.categoryDetailModal.hide();
        this.selectCategoryEN();
    }

    public onCategoryENListCancel() {
        this.categoryENListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.categoryDetailModal.show();
        }
    }



    public refresh() {
        const params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param('interCompanyIds', AppUtils.getIdsList<InterCompany, number>([ this.selectedInterCompany ])));

        this.categoryList.refresh(params);
    }

    public selectInterCompany() {
        this.interCompanyListModal.show();
        this.interCompanyList.refresh(null);
    }

    public setSelectedInterCompany() {
        switch (this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedInterCompany = this.interCompanyList.selectedItem;
                this.interCompanyListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.categoryDetail.interCompany = this.interCompanyList.selectedItem;
                this.interCompanyListModal.hide();
                this.categoryDetailModal.show();
                break;
            default:
                break;
        }
    }

    public unselectInterCompany() {
        this.selectedInterCompany = null;
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
                this.categoryDetail.categoryEN = this.categoryENList.selectedItem;
                this.categoryENListModal.hide();
                this.categoryDetailModal.show();
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
        params.push(new Param('interCompanyIds', AppUtils.getIdsList<InterCompany, number>([this.selectedInterCompany])));

        return params;
    }

    public export() {

        let params: Array<Param> = null;

        params = this.getFilters();
        this.categoryHttpService
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
