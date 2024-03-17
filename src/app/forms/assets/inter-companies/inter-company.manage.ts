import { Param } from './../../../model/common/param';
import { Component, ViewChild } from '@angular/core';
import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { saveAs as fileSaveAs } from 'file-saver-es';
import { InterCompanyHttpService } from '../../../services/http/assets/inter-company.http.service';
import { InterCompany } from '../../../model/api/assets/inter-company';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { InterCompanyENHttpService } from '../../../services/http/assets/inter-company-en.http.service';
import { InterCompanyENListComponent } from '../inter-companies-en/inter-company-en.list';
import { InterCompanyEN } from '../../../model/api/assets/inter-company-en';
import { InterCompanyListComponent } from './inter-company.list';
import { InterCompanyDetailComponent } from './inter-company.detail';
import {InterCompaniesAddEditComponent} from './inter-companies-add-edit/inter-companies-add-edit.component';
import {MatDialog} from '@angular/material/dialog';


@Component({
    selector: 'app-inter-company-manage',
    templateUrl: 'inter-company.manage.html',
    providers: [ InterCompanyENHttpService ]
})
export class InterCompanyManageComponent extends GenericManage<InterCompany, number> {

    @ViewChild('interCompanyDetailModal') interCompanyDetailModal: ModalDirective;
    @ViewChild('interCompanyList') interCompanyList: InterCompanyListComponent;
    @ViewChild('interCompanyDetail') interCompanyDetail: InterCompanyDetailComponent;
    @ViewChild('interCompanyENListModal') interCompanyENListModal: ModalDirective;
    @ViewChild('interCompanyENList') interCompanyENList: InterCompanyENListComponent;

    public filter: string = '';
    public selectedInterCompanyEN: InterCompanyEN = null;
    isCollapsed: boolean = true;

    constructor(
        public dialog: MatDialog,
        public interCompanyHttpService: InterCompanyHttpService,
        public interCompanyENHttpService: InterCompanyENHttpService) {
        super();
    }

    public onAddNew() {
      this.onAddEditItem();
    }

    public onAddEditItem(item: InterCompany | null = null) {
      let dialogRef = this.dialog.open(InterCompaniesAddEditComponent, {
        panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
        data: { item: item }
      });

      dialogRef.afterClosed().subscribe((item: InterCompany) => {
        if (item !== null) this.refresh();
      });
    }

    public onItemEdit(item: InterCompany) {
      this.onAddEditItem(item);
    }

    public editItem() {
        super.editItem();

        const interCompany: InterCompany = this.selectedItem as InterCompany;

        this.interCompanyDetail.interCompanyEN = null;
        if ((interCompany != null) && (interCompany.interCompanyEN != null)) {
            this.interCompanyENHttpService
                .getById(interCompany.interCompanyEN.id)
                .subscribe((interCompanyEN: InterCompanyEN) => {
                    this.interCompanyDetail.interCompanyEN = interCompanyEN;
                });
        }
    }

    public detailInitialize() {
        super.detailInitialize();
        this.interCompanyDetailModal.show();
    }

    public detailTerminate() {
        super.detailTerminate();
        this.interCompanyDetailModal.hide();
    }

    public onInterCompanyDetailInterCompanyENNeeded() {
        this.interCompanyDetailModal.hide();
        this.selectInterCompanyEN();
    }

    public onInterCompanyENListCancel() {
        this.interCompanyENListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.interCompanyDetailModal.show();
        }
    }



    public refresh() {
        const params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));

        this.interCompanyList.refresh(params);
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
                this.interCompanyDetail.interCompanyEN = this.interCompanyENList.selectedItem;
                this.interCompanyENListModal.hide();
                this.interCompanyDetailModal.show();
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
        this.interCompanyHttpService
            .export(params)
            .subscribe((blob) => {
                fileSaveAs(blob.body, 'InterCompanies.xlsx');
            });
    }

    collapsed(event: any): void {
        // console.log(event);
      }
      expanded(event: any): void {
        // console.log(event);
      }
}
