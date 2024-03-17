import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Level } from '../../../model/api/administration/level';
import { PagedResult } from '../../../model/common/paged-result';
import { Param } from '../../../model/common/param';
import { LevelHttpService } from '../../../services/http/administration/level.http.service';
import { GenericManage } from '../../generic/generic.manage';
import { LevelDetailComponent } from './level.detail';
import { LevelListComponent } from './level.list';
import {Project} from '../../../model/api/assets/project';
import {ProjectAddEditComponent} from '../../assets/projects/project-add-edit/project-add-edit.component';
import {LevelAddEditComponent} from './level-add-edit/level-add-edit.component';
import {MatDialog} from '@angular/material/dialog';
import { saveAs as fileSaveAs } from 'file-saver-es';

@Component({
    selector: 'app-level-manage',
    templateUrl: 'level.manage.html',
    providers: [ LevelHttpService]
})
export class LevelManageComponent extends GenericManage<Level, number> {

     @ViewChild('levelDetailModal') levelDetailModal: ModalDirective;
     @ViewChild('levelList') levelList: LevelListComponent;
     @ViewChild('levelDetail') levelDetail: LevelDetailComponent;

     isCollapsed: boolean = true;
    public filter: string = '';

    constructor(
        public levelHttpService: LevelHttpService,
        public dialog: MatDialog) {
        super();
    }


  public onAddNew() {
    this.onAddEditItem();
  }

  public onAddEditItem(item: Level | null = null) {
    const dialogRef = this.dialog.open(LevelAddEditComponent, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { item: item }
    });

    dialogRef.afterClosed().subscribe((item: Level) => {
      if (item !== null) this.refresh();
    });
  }

  public onItemEdit(item: Project) {
    this.onAddEditItem(item);
  }

     public detailInitialize() {
        this.levelDetailModal.show();
    }

    public detailTerminate() {
        this.levelDetailModal.hide();
    }

    public refresh() {
        const params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));

        this.levelList.refresh(params);
    }

    public getFilters(): Array<Param> {
      const params: Array<Param> = new Array<Param>();
      params.push(new Param('filter', this.filter));


      return params;
  }


    public export() {

      let params: Array<Param> = null;

      params = this.getFilters();
      this.levelHttpService
          .export(params)
          .subscribe((blob) => {
              fileSaveAs(blob.body, 'level.xlsx');
          });
  }

    collapsed(event: any): void {
        // console.log(event);
      }
      expanded(event: any): void {
        // console.log(event);
      }
}
