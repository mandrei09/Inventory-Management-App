import { Param } from './../../../model/common/param';
import { Component, ViewChild } from '@angular/core';
import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { saveAs as fileSaveAs } from 'file-saver-es';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { InterCompanyENHttpService } from '../../../services/http/assets/inter-company-en.http.service';
import { CategoryEN } from '../../../model/api/assets/category-en';
import { CategoryENListComponent } from './category-en.list';
import { CategoryENDetailComponent } from './category-en.detail';
import { InterCompanyENListComponent } from '../inter-companies-en/inter-company-en.list';
import { InterCompanyEN } from '../../../model/api/assets/inter-company-en';
import { CategoryENHttpService } from '../../../services/http/assets/category-en.http.service';
import { MatDialog } from '@angular/material/dialog';
import {CategoriesEnAddEditComponent} from './categories-en-add-edit/categories-en-add-edit.component';

@Component({
    selector: 'app-category-en-manage',
    templateUrl: 'category-en.manage.html',
    providers: [ InterCompanyENHttpService ]
})
export class CategoryENManageComponent extends GenericManage<CategoryEN, number> {

    @ViewChild('categoryENDetailModal') categoryENDetailModal: ModalDirective;
    @ViewChild('categoryENList') categoryENList: CategoryENListComponent;
    @ViewChild('categoryENDetail') categoryENDetail: CategoryENDetailComponent;
    @ViewChild('interCompanyENListModal') interCompanyENListModal: ModalDirective;
    @ViewChild('interCompanyENList') interCompanyENList: InterCompanyENListComponent;

    public filter: string = '';
    public selectedInterCompanyEN: InterCompanyEN = null;
    isCollapsed: boolean = true;
    constructor(
        public dialog: MatDialog,
        public categoryENHttpService: CategoryENHttpService,
        public interCompanyENHttpService: InterCompanyENHttpService) {
        super();
    }

    public onAddNew() {
      this.onAddEditItem();
    }

    public onAddEditItem(item: CategoryEN | null = null) {
      let dialogRef = this.dialog.open(CategoriesEnAddEditComponent, {
        panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
        data: { item: item }
      });

      dialogRef.afterClosed().subscribe((item: CategoryEN) => {
        if (item !== null) this.refresh();
      });
    }

    public onItemEdit(item: CategoryEN) {
      this.onAddEditItem(item);
    }

    public editItem() {
        super.editItem();

        const category: CategoryEN = this.selectedItem as CategoryEN;

        this.categoryENDetail.interCompanyEN = null;
        if ((category != null) && (category.interCompanyEN != null)) {
            this.interCompanyENHttpService
                .getById(category.interCompanyEN.id)
                .subscribe((interCompanyEN: InterCompanyEN) => {
                    this.categoryENDetail.interCompanyEN = interCompanyEN;
                });
        }
    }

    public detailInitialize() {
        super.detailInitialize();
        this.categoryENDetailModal.show();
    }

    public detailTerminate() {
        super.detailTerminate();
        this.categoryENDetailModal.hide();
    }

    public onCategoryENDetailInterCompanyENNeeded() {
        this.categoryENDetailModal.hide();
        this.selectInterCompanyEN();
    }

    public onInterCompanyENListCancel() {
        this.interCompanyENListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.categoryENDetailModal.show();
        }
    }



    public refresh() {
        const params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        this.categoryENList.refresh(params);
    }

    public selectInterCompanyEN() {
        this.interCompanyENListModal.show();
        this.interCompanyENList.refresh(null);
    }

    public setSelectedInterCompanyEN() {
        switch (this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedInterCompanyEN = this.interCompanyENList.selectedItem;
                this.interCompanyENListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.categoryENDetail.interCompanyEN = this.interCompanyENList.selectedItem;
                this.interCompanyENListModal.hide();
                this.categoryENDetailModal.show();
                break;
            default:
                break;
        }
    }

    public unselectInterCompanyEN() {
        this.selectedInterCompanyEN = null;
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
        this.categoryENHttpService
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
