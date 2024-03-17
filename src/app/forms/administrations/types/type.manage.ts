import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { saveAs as fileSaveAs } from 'file-saver-es';
import { TypeList } from './type.list';
import { TypeDetail } from './type.detail';
import { MasterTypeHttpService } from '../../../services/http/assets/master-type.http.service';
import { TypeHttpService } from '../../../services/http/administration/type.http.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Type } from '../../../model/api/administration/type';
import { MasterTypeListComponent } from '../../assets/master-types/master-type.list';
import { MasterType } from '../../../model/api/assets/master-type';
import { AppUtils } from '../../../common/app.utils';
import {MatDialog} from '@angular/material/dialog';
import {Dimension} from '../../../model/api/administration/dimension';
import {DimensionAddEditComponent} from '../../assets/dimensions/dimension-add-edit/dimension-add-edit.component';
import {TypeAddEditComponent} from './type-add-edit/type-add-edit.component';

@Component({
    selector: 'type-manage',
    templateUrl: 'type.manage.html',
    styleUrls: ['type.manage.scss'],
    providers: [ TypeHttpService, MasterTypeHttpService ]
})
export class TypeManage extends GenericManage<Type, number> {

    @ViewChild('typeDetailModal') typeDetailModal: ModalDirective;
    @ViewChild('typeList') typeList: TypeList;
    @ViewChild('typeDetail') typeDetail: TypeDetail;
    @ViewChild('masterTypeListModal') masterTypeListModal: ModalDirective;
    @ViewChild('masterTypeList') masterTypeList: MasterTypeListComponent;

    isCollapsed: boolean = true;
    public filter: string = '';
    public selectedMasterType: MasterType = null;

    constructor(
        public typeHttpService: TypeHttpService,
        public masterTypeHttpService: MasterTypeHttpService,
        public dialog: MatDialog) {
        super();
    }

  public onAddNew() {
    this.onAddEditItem();
  }

  public onAddEditItem(item: Type | null = null) {
    const dialogRef = this.dialog.open(TypeAddEditComponent, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { item: item }
    });

    dialogRef.afterClosed().subscribe((item: Type) => {
      // if (item !== null) this.refresh();
    });
  }

  public onItemEdit(item: Type) {
    this.onAddEditItem(item);
  }

    public detailInitialize() {
        super.detailInitialize();
        this.typeDetailModal.show();
    }

    public detailTerminate() {
        super.detailTerminate();
        this.typeDetailModal.hide();
    }

    public onTypeDetailMasterTypeNeeded() {
        this.typeDetailModal.hide();
        this.selectMasterType();
    }

    public onMasterTypeListCancel() {
        this.masterTypeListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.typeDetailModal.show();
        }
    }



    public refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param("masterTypeIds", AppUtils.getIdsList<MasterType, number>([ this.selectedMasterType ])));

        this.typeList.refresh(params);
    }

    public selectMasterType() {
        this.masterTypeListModal.show();
        this.masterTypeList.refresh(null);
    }

    public setSelectedMasterType() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedMasterType = this.masterTypeList.selectedItem;
                this.masterTypeListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.typeDetail.masterType = this.masterTypeList.selectedItem;
                this.masterTypeListModal.hide();
                this.typeDetailModal.show();
                break;
            default:
                break;
        }
    }

    public unselectMasterType() {
        this.selectedMasterType = null;
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
        params.push(new Param('masterTypeIds', AppUtils.getIdsList<MasterType, number>([this.selectedMasterType])));

        return params;
    }

    public exportToExcel() {

        let params: Array<Param> = null;

        params = this.getFilters();
        this.typeHttpService
            .export(params)
            .subscribe((blob) => {
                fileSaveAs(blob, 'Types.xlsx');
            });
    }

    collapsed(event: any): void {
        // console.log(event);
      }

      expanded(event: any): void {
        // console.log(event);
      }
}
