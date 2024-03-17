import { EmployeeImport } from './../../../model/common/import/employee-import';
import { Param } from './../../../model/common/param';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { Department } from '../../../model/api/administration/department';
import { Employee } from '../../../model/api/administration/employee';
import { EmployeeDetail } from '../../../model/api/administration/employee-detail';
import { EmployeeHttpService } from '../../../services/http/administration/employee.http.service';
import { EmployeeDetailHttpService } from '../../../services/http/administration/employee-detail.http.service';
import { EmployeeDetailComponent as EmployeeDetailUI } from './employee.detail';
import { Router } from '@angular/router';
import { saveAs as fileSaveAs } from 'file-saver-es';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { EmployeeListComponent } from './employee.list';
import { DepartmentListComponent } from '../departments/department.list';
import { AppData } from '../../../app-data';
import { DepartmentHttpService } from '../../../services/http/administration/department.http.service';
import { AppUtils } from '../../../common/app.utils';
import { CostCenterListComponent } from '../cost-centers/cost-center.list';
import { CostCenter } from '../../../model/api/administration/cost-center';
import { CostCenterHttpService } from '../../../services/http/administration/cost-center.http.service';
import {MatDialog} from '@angular/material/dialog';
import {EmployeeDetailsComponent} from './employee-details/employee-details.component';
import {EmployeesAddEditDialog} from './employees-add-edit/employees.add-edit.dialog';
import { DialogService } from '../../../services/dialog.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
    selector: 'app-employee-manage',
    templateUrl: 'employee.manage.html',
})
export class EmployeeManageComponent extends GenericManage<Employee, number> {

    @ViewChild('employeeDetailModal') employeeDetailModal: ModalDirective;
    @ViewChild('employeeList') employeeList: EmployeeListComponent;
    @ViewChild('employeeDetail') employeeDetail: EmployeeDetailUI;
    @ViewChild('departmentListModal') departmentListModal: ModalDirective;
    @ViewChild('departmentList') departmentList: DepartmentListComponent;
    @ViewChild('costCenterListModal') costCenterListModal: ModalDirective;
    @ViewChild('costCenterList') costCenterList: CostCenterListComponent;
    @ViewChild('importDataModal') public importDataModal: ModalDirective;
    @ViewChild('fileInput') fileInput: ElementRef;

    roleCheck = '';

    public filter: string = '';
    public selectedDepartment: Department = null;
    public selectedCostCenters: CostCenter[] = null;
    isCollapsed: boolean = true;
    pageSize = 10;
    public data;
    public importLines: Array<EmployeeImport> = new Array<EmployeeImport>();
    public importIndex: number = 0;
    public fileEvent: any = null;
    public deletedEmployees: boolean = false;
    public get isAdmin(): boolean { return AppData.UserIsAdmin; }

    constructor(
                public dialog: MatDialog,
                public departmentHttpService: DepartmentHttpService,
                public costCenterHttpService: CostCenterHttpService,
                public employeeHttpService: EmployeeHttpService,
                public router: Router,
                public employeeDetailHttpService: EmployeeDetailHttpService,
                private dialogService: DialogService,
                private notifyService: NotificationService) {

        super();
    }

    public syncEmp() {

        this.employeeHttpService.updateAllEmp().subscribe((count) => {
             alert('Au fost actualizati ' + JSON.stringify(count) + ' angajati!');
            // this.toastr.success('Au fost actualizati ' + JSON.stringify(count) + ' angajati!');
       });

}

    public showDeletedEmployees(){
        let params = new Array<Param>();
        params.push(new Param('deleted', JSON.stringify(this.deletedEmployees)));

        this.employeeList.refresh(params);
    }

    public onAddNew() {
      this.onAddEditItem();
    }

    public onAddEditItem(item: Employee | null = null) {
      let dialogRef = this.dialog.open(EmployeesAddEditDialog, {
        panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
        data: { item: item }
      });

      dialogRef.afterClosed().subscribe((item: Employee) => {
        if (item !== null) this.refresh();
      });
    }

    public onItemEdit(item: Employee) {
      this.onAddEditItem(item);
    }

    public onItemView(item: Employee) {
      let dialogRef = this.dialog.open(EmployeeDetailsComponent, {
        panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
        data: { employee: item }
      });

      dialogRef.afterClosed().subscribe((item: Employee) => {
        //
      });
    }

    public onItemDelete(item : Employee){
        this.dialogService
        .confirmDialog({
            title: 'Confirm Action',
            message: 'Esti sigur ca vrei sa stergi acest / aceste obiect(e)?',
            confirmCaption: 'Confirm',
            cancelCaption: 'Cancel',
        })
        .subscribe((confirmed: any) => 
        {
            this.employeeHttpService.deleteEmployee(item.id).subscribe(
                (res) => 
                {
                    if(res)
                    {
                        this.notifyService.showSuccess('Datele au fost actualizate cu succes!', '', 0, false, 0);
                        this.employeeHttpService.httpGet(0,1,10,'InternalCode','asc',[],'').subscribe((res) => {})
                    }
                    else this.notifyService.showError('Eroare salvare!', '', 0, false, 0);

                }, 
                (error) => {
                    this.notifyService.showError('Eroare server!', '', 0, false, 0);
                }
            );
        });
    }

    public addNewItem() {
        super.addNewItem();

        this.employeeDetail.department = null;
        this.employeeDetail.costCenter = null;
    }

    public editItem() {
        super.editItem();

        let employee: EmployeeDetail = this.selectedItem as EmployeeDetail;

        this.employeeDetail.department = null;
        if (employee != null) {
            this.departmentHttpService
                .getById(employee.departmentId)
                .subscribe((department: Department) => {
                    this.employeeDetail.department = department;
                });
        }
    }

    public detailInitialize() {
        super.detailInitialize();
        this.employeeDetailModal.show();
    }

    public detailTerminate() {
        super.detailTerminate();
        this.employeeDetailModal.hide();
    }

    public onEmployeeDetailDepartmentNeeded() {
        this.employeeDetailModal.hide();
        this.selectDepartment();
    }

    public onDepartmentListCancel() {
        this.departmentListModal.hide();
        this.employeeDetailModal.show();
    }

    public refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param('pageSize', this.pageSize.toString()));
        // params.push(new Param('departmentId', this.selectedDepartment != null ? this.selectedDepartment.id.toString() : null));
        params.push(new Param("departmentIds", AppUtils.getIdsList<Department, number>([ this.selectedDepartment ])));
        params.push(new Param('deleted', JSON.stringify(this.deletedEmployees)));

        this.employeeList.refresh(params);
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
                this.employeeDetail.department = this.departmentList.selectedItem;
                this.departmentListModal.hide();
                this.employeeDetailModal.show();
                break;
        }
    }

    public unselectDepartment() {
        this.selectedDepartment = null;
        this.refresh();
    }

    public loadFile(ev) {
        this.fileEvent = ev;
    }

    public doImportEmployees() {
        if (this.importIndex < this.importLines.length) {
            this.employeeDetailHttpService.upload(this.importLines[this.importIndex]).subscribe((data) => {
                this.importIndex = this.importIndex + 1;
                this.doImportEmployees();
            });
        }
        else {
            this.fileEvent = null;
            this.importDataModal.hide();
            this.importIndex = 0;
            this.importLines = new Array<EmployeeImport>();
        }
    }

    public importEmployees() {

        let fi = this.fileInput.nativeElement;
        if (fi.files && fi.files[0]) {
            let fileToUpload = fi.files[0];
            this.employeeHttpService
                .import(fileToUpload)
                .subscribe(res => {
                    if (res.status === 200){
                         alert('Employees have been successfully updated!');
                        // alert('Datele au fost actualizate cu success!');
                    }else{
                        alert('Error importing employees!');
                            // alert('Eroare import!');
                    }
                    this.refresh();
                }, (error) => {
                    alert('Error importing employees!');
                });
        }

    }

    // public importEmployees() {

    //     if (this.fileEvent === null) return;

    //     alasql.promise(`select
    //                         [ID] as [InternalCode],
    //                         [First Name] as [FirstName],
    //                         [Last Name] as [LastName],
    //                         [Email] as [Email],
    //                         [Supv ID] as [InternalCodeTl],
    //                         [Supervisor] as [FullNameTl],
    //                         [Dept] as [Department]
    //                         from FILE(?, {headers: true})`, [this.fileEvent])

    //         .then((importLines: Array<EmployeeImport>) => {

    //             this.importDataModal.show();

    //             this.importIndex = 0;
    //             this.importLines = importLines;

    //             this.doImportEmployees();
    //     });

    // }

    public getFilters(): Array<Param> {
        let params: Array<Param> = new Array<Param>();
        params.push(new Param('filter', this.filter));
        params.push(new Param("departmentIds", AppUtils.getIdsList<Department, number>([this.selectedDepartment])));
        params.push(new Param('deleted', JSON.stringify(this.deletedEmployees)));
        return params;
    }

    public exportToExcel() {

        let params: Array<Param> = null;

        params = this.getFilters();
        this.employeeHttpService
            .export(params)
            .subscribe((blob) => {
                fileSaveAs(blob.body, 'ExportWFH.xlsx');
            });
    }

    public editEmployee() {
        let selectedEmployeeId = this.employeeList.selectedItems.length > 0 ? this.employeeList.selectedItems[0].id : 0;
        if (selectedEmployeeId > 0) {
            this.router.navigate(['/employee', selectedEmployeeId]);
        }
    }



    collapsed(event: any): void {
        // console.log(event);
      }

      expanded(event: any): void {
        // console.log(event);
      }

      public onPageUpdate(number: number) {
        this.pageSize = number;
        this.refresh();
    }
}

// enum EmployeeManageViewMode {
//     EmployeeList = 1,
//     EmployeeDetail = 2,
//     DepartmentList = 3
// }
