import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AppUtils } from '../../../common/app.utils';
import { AdmCenter } from '../../../model/api/administration/adm-center';
import { Employee } from '../../../model/api/administration/employee';
import { PagedResult } from '../../../model/common/paged-result';
import { Param } from '../../../model/common/param';
import { AdmCenterHttpService } from '../../../services/http/administration/adm-center.http.service';
import { EmployeeHttpService } from '../../../services/http/administration/employee.http.service';
import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { EmployeeListComponent } from '../employees/employee.list';
import { AdmCenterDetailComponent } from './adm-center.detail';
import { AdmCenterListComponent } from './adm-center.list';
import {AdmCenterAddEditComponent} from './adm-center-add-edit/adm-center-add-edit.component';
import {MatDialog} from '@angular/material/dialog';
import { saveAs as fileSaveAs } from 'file-saver-es';
import {Division} from '../../../model/api/administration/division';
import {DialogService} from '../../../services/dialog.service';

@Component({
    selector: 'app-adm-center-manage',
    templateUrl: 'adm-center.manage.html',
    providers: [ AdmCenterHttpService,  EmployeeHttpService]
})
export class AdmCenterManageComponent extends GenericManage<AdmCenter, number> {

     // @ViewChild('itemDetailModal') modal: ModalDirective;
     @ViewChild('employeeListModal') employeeListModal: ModalDirective;
     @ViewChild('employeeList') employeeList: EmployeeListComponent;
     @ViewChild('admCenterDetailModal') admCenterDetailModal: ModalDirective;
     @ViewChild('admCenterList') admCenterList: AdmCenterListComponent;
     @ViewChild('admCenterDetail') admCenterDetail: AdmCenterDetailComponent;

     isCollapsed: boolean = true;
    public filter: string = '';
    public selectedEmployee: Employee = null;

    constructor(
        public admCenterHttpService: AdmCenterHttpService,
        public employeeHttpService: EmployeeHttpService,
        public dialog: MatDialog,
        public dialogService: DialogService
    ) {
        super();
    }


  public onAddNew() {
    this.onAddEditItem();
  }

  onItemDelete(item: AdmCenter) {
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

  public deleteItem(item: AdmCenter) {
    const filters = new Array<Param>;

    this.admCenterHttpService.delete(item.id!).subscribe(() => {
      this.admCenterList.refresh(filters);
    });
  }

  public onAddEditItem(item: AdmCenter | null = null) {
    const dialogRef = this.dialog.open(AdmCenterAddEditComponent, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { item: item }
    });

    dialogRef.afterClosed().subscribe((item: AdmCenter) => {
      if (item !== null) {
        const filters = new Array<Param>;
        this.admCenterList.refresh(filters);
      }
    });
  }

  public onItemEdit(item: AdmCenter) {
    this.onAddEditItem(item);
  }


  public detailInitialize() {
        this.admCenterDetailModal.show();
    }

    public detailTerminate() {
        this.admCenterDetailModal.hide();
    }

    public refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param('employeeIds', AppUtils.getIdsList<Employee, number>([ this.selectedEmployee ])));

        this.admCenterList.refresh(params);
    }


    public onAdmCenterDetailEmployeeNeeded() {
        this.admCenterDetailModal.hide();
        this.selectEmployee();
    }

    public onEmployeeListCancel() {
        this.employeeListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.admCenterDetailModal.show();
        }
    }

    public selectEmployee() {
        this.employeeListModal.show();
        this.employeeList.refresh(null);
    }

    public setSelectedEmployee() {
        this.viewMode = 2;
        switch(this.viewMode) {

            case GenericManageViewMode.ItemList:
                this.selectedEmployee = this.employeeList.selectedItem;
                this.employeeListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.admCenterDetail.employee = this.employeeList.selectedItem;
                this.employeeListModal.hide();
                this.admCenterDetailModal.show();
                break;
            default:
                break;
        }
    }

    public unselectEmployee() {
        this.selectedEmployee = null;
        this.refresh();
    }



    public getFilters(): Array<Param> {
      const params: Array<Param> = new Array<Param>();
      return params;
  }

    public export() {
      let params: Array<Param> = null;
      params = this.getFilters();
      this.admCenterHttpService
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
