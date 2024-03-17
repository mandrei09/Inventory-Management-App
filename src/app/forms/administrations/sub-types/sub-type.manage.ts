
import { Param } from './../../../model/common/param';
import { Component, ViewChild } from '@angular/core';
import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { saveAs as fileSaveAs } from 'file-saver-es';
import { SubTypeList } from './sub-type.list';
import { SubTypeDetail } from './sub-type.detail';
import { TypeList } from '../types/type.list';
import { SubType } from '../../../model/api/administration/sub-type';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TypeHttpService } from '../../../services/http/administration/type.http.service';
import { SubTypeHttpService } from '../../../services/http/administration/sub-type.http.service';
import { Type } from '../../../model/api/administration/type';
import { AppUtils } from '../../../common/app.utils';
import {MatDialog} from '@angular/material/dialog';
import {TypeAddEditComponent} from '../types/type-add-edit/type-add-edit.component';
import {SubTypeAddEditComponent} from './sub-type-add-edit/sub-type-add-edit.component';

@Component({
    selector: 'sub-type-manage',
    templateUrl: 'sub-type.manage.html',
    styleUrls: ['sub-type.manage.scss'],
    providers: [ SubTypeHttpService, TypeHttpService ]
})
export class SubTypeManage extends GenericManage<SubType, number> {

    @ViewChild('subTypeDetailModal') subTypeDetailModal: ModalDirective;
    @ViewChild('subTypeList') subTypeList: SubTypeList;
    @ViewChild('subTypeDetail') subTypeDetail: SubTypeDetail;
    @ViewChild('typeListModal') typeListModal: ModalDirective;
    @ViewChild('typeList') typeList: TypeList;

    public filter: string = '';
    public selectedType: Type = null;
    isCollapsed: boolean = true;

    constructor(
        public subTypeHttpService: SubTypeHttpService,
        public typeHttpService: TypeHttpService,
        public dialog: MatDialog) {
        super();
    }

  public onAddNew() {
    this.onAddEditItem();
  }

  public onAddEditItem(item: SubType | null = null) {
    const dialogRef = this.dialog.open(SubTypeAddEditComponent, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { item: item }
    });

    dialogRef.afterClosed().subscribe((item: SubType) => {
      // if (item !== null) this.refresh();
    });
  }

  public onItemEdit(item: SubType) {
    this.onAddEditItem(item);
  }

    public detailInitialize() {
        super.detailInitialize();
        this.subTypeDetailModal.show();
    }

    public detailTerminate() {
        super.detailTerminate();
        this.subTypeDetailModal.hide();
    }

    public onSubTypeDetailTypeNeeded() {
        this.subTypeDetailModal.hide();
        this.selectType();
    }

    public onTypeListCancel() {
        this.typeListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.subTypeDetailModal.show();
        }
    }



    public refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param("typeIds", AppUtils.getIdsList<Type, number>([ this.selectedType ])));

        this.subTypeList.refresh(params);
    }

    public selectType() {
        this.typeListModal.show();
        this.typeList.refresh(null);
    }

    public setSelectedType() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedType = this.typeList.selectedItem;
                this.typeListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.subTypeDetail.type = this.typeList.selectedItem;
                this.typeListModal.hide();
                this.subTypeDetailModal.show();
                break;
            default:
                break;
        }
    }

    public unselectType() {
        this.selectedType = null;
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
        let params: Array<Param> = new Array<Param>();
        params.push(new Param('filter', this.filter));
        params.push(new Param('typeIds', AppUtils.getIdsList<Type, number>([this.selectedType])));

        return params;
    }

    public exportToExcel() {

        let params: Array<Param> = null;

        params = this.getFilters();
        this.subTypeHttpService
            .export(params)
            .subscribe((blob) => {
                fileSaveAs(blob, 'SubTypes.xlsx');
            });
    }

    collapsed(event: any): void {
        // console.log(event);
      }

      expanded(event: any): void {
        // console.log(event);
      }
}
