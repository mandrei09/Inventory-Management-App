import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { GenericManage } from '../../generic/generic.manage';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ProjectTypeHttpService } from '../../../services/http/assets/project-type.http.service';
import { ProjectType } from '../../../model/api/assets/project-type';
import {MatDialog} from '@angular/material/dialog';
import {ProjectTypeAddEditComponent} from './project-type-add-edit/project-type-add-edit.component';
import { saveAs as fileSaveAs } from 'file-saver-es';

@Component({
    selector: 'app-project-type-manage',
    templateUrl: 'project-type.manage.html',
    providers: [ ProjectTypeHttpService ]
})
export class ProjectTypeManageComponent extends GenericManage<ProjectType, number> {

    @ViewChild('itemDetailModal') modal: ModalDirective;

    public filter: string = '';
    isCollapsed: boolean = true;
    showExportBtn = true;

    constructor(public projectTypeHttpService: ProjectTypeHttpService,
    public dialog: MatDialog) {
        super();
    }

  public onAddNew() {
    this.onAddEditItem();
  }

  public onAddEditItem(item: ProjectType | null = null) {
    const dialogRef = this.dialog.open(ProjectTypeAddEditComponent, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { item: item }
    });

    dialogRef.afterClosed().subscribe((item: ProjectType) => {
      // if (item !== null) this.refresh();
    });
  }

  // public onItemEdit(item: Area) {
  //   this.onAddEditItem(item);
  // }

    public detailInitialize() {
        this.modal.show();
    }

    public detailTerminate() {
        this.modal.hide();
    }

    public getFilters(): Array<Param> {
      const params: Array<Param> = new Array<Param>();
      params.push(new Param('filter', this.filter));

      return params;
  }

    public export() {
      this.showExportBtn = false;
      let params: Array<Param> = null;

      params = this.getFilters();
      this.projectTypeHttpService.export(params).subscribe((blob) => {
        fileSaveAs(blob.body, 'Export.xlsx');
        this.showExportBtn = true;
      });
    }

    collapsed(event: any): void {
        // console.log(event);
      }

      expanded(event: any): void {
        // console.log(event);
      }
}
