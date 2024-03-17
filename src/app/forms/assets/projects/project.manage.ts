import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { GenericManage } from '../../generic/generic.manage';
import { ProjectHttpService } from '../../../services/http/assets/project.http.service';
import { Project } from '../../../model/api/assets/project';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {ProjectAddEditComponent} from './project-add-edit/project-add-edit.component';
import {MatDialog} from '@angular/material/dialog';
import { saveAs as fileSaveAs } from 'file-saver-es';

@Component({
    selector: 'project-manage',
    templateUrl: 'project.manage.html',
    providers: [ ProjectHttpService ],
})
export class ProjectManage extends GenericManage<Project, number> {

    @ViewChild('itemDetailModal') modal: ModalDirective;

    public filter: string = '';
    isCollapsed: boolean = true;
    showExportBtn = true;

    constructor(
      public projectHttpService: ProjectHttpService,
      public dialog: MatDialog,
    ) {
        super();
    }

    public onAddNew() {
      this.onAddEditItem();
    }

    public onAddEditItem(item: Project | null = null) {
      const dialogRef = this.dialog.open(ProjectAddEditComponent, {
        panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
        data: { item: item }
      });

      dialogRef.afterClosed().subscribe((item: Project) => {
        // if (item !== null) this.();
      });
    }

    public onItemEdit(item: Project) {
      this.onAddEditItem(item);
    }

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
      this.projectHttpService.export(params).subscribe((blob) => {
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