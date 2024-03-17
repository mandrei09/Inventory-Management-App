import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AdmCenter } from '../../../model/api/administration/adm-center';
import { Area } from '../../../model/api/administration/area';
import { PagedResult } from '../../../model/common/paged-result';
import { Param } from '../../../model/common/param';
import { AreaHttpService } from '../../../services/http/administration/area.http.service';
import { GenericManage } from '../../generic/generic.manage';
import { AreaDetailComponent } from './area.detail';
import { AreaListComponent } from './area.list';
import {Level} from '../../../model/api/administration/level';
import {LevelAddEditComponent} from '../level/level-add-edit/level-add-edit.component';
import {Project} from '../../../model/api/assets/project';
import {AreaAddEditComponent} from './area-add-edit/area-add-edit.component';
import {MatDialog} from '@angular/material/dialog';
import { saveAs as fileSaveAs } from 'file-saver-es';


@Component({
    selector: 'app-area-manage',
    templateUrl: 'area.manage.html',
    providers: [ AreaHttpService]
})
export class AreaManageComponent extends GenericManage<Area, number> {

     @ViewChild('areaDetailModal') areaDetailModal: ModalDirective;
     @ViewChild('areaList') areaList: AreaListComponent;
     @ViewChild('areaDetail') areaDetail: AreaDetailComponent;

     isCollapsed: boolean = true;
    public filter: string = '';

    constructor(
        public areaHttpService: AreaHttpService,
        public dialog: MatDialog) {
        super();
    }


  public onAddNew() {
    this.onAddEditItem();
  }

  public onAddEditItem(item: Area | null = null) {
    const dialogRef = this.dialog.open(AreaAddEditComponent, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { item: item }
    });

    dialogRef.afterClosed().subscribe((item: Area) => {
      if (item !== null) this.refresh();
    });
  }

  public onItemEdit(item: Area) {
    this.onAddEditItem(item);
  }

     public detailInitialize() {
        this.areaDetailModal.show();
    }

    public detailTerminate() {
        this.areaDetailModal.hide();
    }

    public refresh() {
        const params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));

        this.areaList.refresh(params);
    }

    public getFilters(): Array<Param> {
      const params: Array<Param> = new Array<Param>();
      params.push(new Param('filter', this.filter));


      return params;
  }


    public export() {

      let params: Array<Param> = null;

      params = this.getFilters();
      this.areaHttpService
          .export(params)
          .subscribe((blob) => {
              fileSaveAs(blob.body, 'area.xlsx');
          });
  }

    collapsed(event: any): void {
        // console.log(event);
      }
      expanded(event: any): void {
        // console.log(event);
      }
}
