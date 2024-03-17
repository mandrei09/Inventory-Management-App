import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { GenericManage } from '../../generic/generic.manage';
import { Department } from '../../../model/api/administration/department';
import { DepartmentDetail } from '../../../model/api/administration/department-detail';
import { DepartmentHttpService } from '../../../services/http/administration/department.http.service';
import { DepartmentDetailHttpService } from '../../../services/http/administration/department-detail.http.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DepartmentListComponent } from './department.list';
import {MatDialog} from '@angular/material/dialog';
import {DepartmentAddEditComponent} from './department-add-edit/department-add-edit.component';
import { saveAs as fileSaveAs } from 'file-saver-es';
import { DialogService } from '../../../services/dialog.service';

@Component({
    selector: 'app-department-manage',
    templateUrl: 'department.manage.html',
    providers: [ DepartmentHttpService, DepartmentDetailHttpService ]
})
export class DepartmentManageComponent extends GenericManage<Department, number> {

    @ViewChild('departmentDetailModal') modal: ModalDirective;
    @ViewChild('departmentList') departmentList: DepartmentListComponent;
    @ViewChild('departmentDetail') departmentDetail: DepartmentDetail;

    isCollapsed: boolean = true;
    public filter: string = '';

    constructor(public departmentHttpService: DepartmentHttpService,
        public departmentDetailHttpService: DepartmentDetailHttpService,
        public dialog: MatDialog,
        public dialogService: DialogService
    ) {

        super();
    }

  public onAddNew() {
    this.onAddEditItem();
  }

  public onAddEditItem(item: Department | null = null) {
    const dialogRef = this.dialog.open(DepartmentAddEditComponent, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { item: item }
    });

    dialogRef.afterClosed().subscribe((item: Department) => {
      const filters = new Array<Param>;
      this.departmentList.refresh(filters);
    });
  }

  public onItemEdit(item: Department) {
    this.onAddEditItem(item);
  }

  onItemDelete(item: Department) {
    this.dialogService
      .confirmDialog({
        title: 'Confirm Action',
        message: 'Do you want to confirm this action?',
        confirmCaption: 'Confirm',
        cancelCaption: 'Cancel',
      })
      .subscribe((confirmed: any) => {
        if (confirmed) {
          this.deleteItem(item);
          // this.notificationSvc.success('Asset successfully deleted.');
        }
      });
  }

  public deleteItem(item: Department) {
    const filters = new Array<Param>;

    this.departmentHttpService.delete(item.id!).subscribe(() => {
      this.departmentList.refresh(filters);
    });
  }


  public detailInitialize() {
        this.modal.show();
    }

    public detailTerminate() {
        this.modal.hide();
    }

    public refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));

        this.departmentList.refresh(params);
    }

    public getFilters(): Array<Param> {
      const params: Array<Param> = new Array<Param>();
      return params;
  }

    public export() {
      let params: Array<Param> = null;
      params = this.getFilters();
      this.departmentHttpService
          .export(params)
          .subscribe((blob) => {
              fileSaveAs(blob.body, 'tax.xlsx');
      });
  }


    collapsed(event: any): void {
        // console.log(event);
      }

      expanded(event: any): void {
        // console.log(event);
      }
}
