import { Param } from '../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { Division } from '../../../model/api/administration/division';
import { DivisionHttpService } from '../../../services/http/administration/division.http.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DivisionListComponent } from './division.list';
import { DivisionDetailComponent } from './division.detail';
import { DepartmentListComponent } from '../departments/department.list';
import { DepartmentHttpService } from '../../../services/http/administration/department.http.service';
import { Department } from '../../../model/api/administration/department';
import {MatDialog} from '@angular/material/dialog';
import {DivisionAddEditDialog} from './division-add-edit/division.add-edit.dialog';
import { saveAs as fileSaveAs } from 'file-saver-es';
import { DialogService } from '../../../services/dialog.service';

@Component({
    selector: 'division-manage',
    templateUrl: 'division.manage.html',
    providers: [ DivisionHttpService ]
})
export class DivisionManageComponent extends GenericManage<Division, number> {

    @ViewChild('divisionDetailModal') divisionDetailModal: ModalDirective;
    @ViewChild('divisionList') divisionList: DivisionListComponent;
    @ViewChild('divisionDetail') divisionDetail: DivisionDetailComponent;
    @ViewChild('departmentListModal') departmentListModal: ModalDirective;
    @ViewChild('departmentList') departmentList: DepartmentListComponent;

    public filter: string = '';
    isCollapsed: boolean = true;
    public selectedDepartment: Department = null;

    constructor(
      public divisionHttpService: DivisionHttpService,
      public departmentHttpService: DepartmentHttpService,
      public dialog: MatDialog,
      public dialogService: DialogService
) {
        super();
    }

  public onAddNew() {
    this.onAddEditItem();
  }

  public onAddEditItem(item: Division | null = null) {
    const dialogRef = this.dialog.open(DivisionAddEditDialog, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { item: item }
    });

    dialogRef.afterClosed().subscribe((item: Division) => {
      // if (item !== null) this.refresh();
    });
  }

  onItemDelete(item: Division) {
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

  public deleteItem(item: Division) {
    const filters = new Array<Param>;

    this.divisionHttpService.delete(item.id!).subscribe(() => {
      this.divisionList.refresh(filters);
    });
  }

  public onItemEdit(item: Division) {
    this.onAddEditItem(item);
  }

    public detailInitialize() {
        super.detailInitialize();
        this.divisionDetailModal.show();
    }

    public detailTerminate() {
        super.detailTerminate();
        this.divisionDetailModal.hide();
    }

    public onDivisionDetailDepartmentNeeded() {
        this.divisionDetailModal.hide();
        this.selectDepartment();
    }

    public onDepartmentListCancel() {
        this.departmentListModal.hide();
        this.divisionDetailModal.show();
    }


    public selectDepartment() {
        this.departmentListModal.show();
        this.departmentList.refresh(null);
    }

    public setSelectedDepartment() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedDepartment = this.departmentList.selectedItem;
                this.departmentListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.divisionDetail.department = this.departmentList.selectedItem;
                this.departmentListModal.hide();
                this.divisionDetailModal.show();
                break;
        }
    }

    public unselectDepartment() {
        this.selectedDepartment = null;
        this.refresh();
    }

    public refresh() {
        const params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));

        this.divisionList.refresh(params);
    }

    public getFilters(): Array<Param> {
      const params: Array<Param> = new Array<Param>();
      return params;
  }

    public export() {
      let params: Array<Param> = null;
      params = this.getFilters();
      this.divisionHttpService
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
