import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, ViewChild } from '@angular/core';
import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { EmployeeListComponent } from '../employees/employee.list';
import { Employee } from '../../../model/api/administration/employee';
import { EmployeeHttpService } from '../../../services/http/administration/employee.http.service';
import { AppUtils } from '../../../common/app.utils';
import { EmployeeStorageHttpService } from '../../../services/http/administration/employee-storage.http.service';
import { StorageHttpService } from '../../../services/http/stock/storage.http.service';
import { EmployeeStorage } from '../../../model/api/administration/employee-storage';
import { EmployeeStorageList } from './employee-storage.list';
import { StorageListComponent } from '../../stock/storages/storage.list';
import { Storage } from '../../../model/api/stock/storage';


@Component({
    selector: 'employee-storage-manage',
    templateUrl: 'employee-storage.manage.html',
    styleUrls: ['employee-storage.manage.scss'],
    providers: [ EmployeeStorageHttpService, StorageHttpService, EmployeeHttpService ]
})
export class EmployeeStorageManage extends GenericManage<EmployeeStorage, number> {

    @ViewChild('employeeStorageList') employeeStorageList: EmployeeStorageList;
    @ViewChild('storageListModal') storageListModal: ModalDirective;
    @ViewChild('storageList') storageList: StorageListComponent;
    @ViewChild('employeeListModal') employeeListModal: ModalDirective;
    @ViewChild('employeeList') employeeList: EmployeeListComponent;

    public filter: string = '';
    public selectedStorage: Storage = null;
    public selectedEmployee: Employee = null;
    isCollapsed: boolean = true;

    constructor(public storageHttpService: StorageHttpService,
      public employeeStorageHttpService: EmployeeStorageHttpService,
      public employeeHttpService: EmployeeHttpService) {

        super();
    }

    ngAfterViewInit () {
        this.refresh();
    }

    public onStorageListCancel() {
        this.storageListModal.hide();
    }

    public onEmployeeListCancel() {
        this.employeeListModal.hide();
    }

    public refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param("storageIds", AppUtils.getIdsList<Storage, number>([ this.selectedStorage ])));
        params.push(new Param("employeeIds", AppUtils.getIdsList<Employee, number>([ this.selectedEmployee ])));


        this.employeeStorageList.refresh(params);
    }

    public selectStorage() {

        this.storageListModal.show();
        this.storageList.refresh(null);
    }

    public selectEmployee() {
        this.employeeListModal.show();
        this.employeeList.refresh(null);
    }

    public setSelectedStorage() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedStorage = this.storageList.selectedItem;
                this.storageListModal.hide();
                this.refresh();
                break;
            default:
                break;
        }
    }

    public setSelectedEmployee() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedEmployee = this.employeeList.selectedItem;
                this.employeeListModal.hide();
                this.refresh();
                break;
            default:
                break;
        }
    }

    public unselectStorage() {
        this.selectedStorage = null;
        this.refresh();
    }

    public unselectEmployee() {
        this.selectedEmployee = null;
        this.refresh();
    }


    public exportToExcel() {

         let params: Array<Param> = null;

        if ((this.filter != null) && (this.filter.length > 0)) {
            params = new Array<Param>();
            params.push(new Param('filter', this.filter));
        }

        this.employeeStorageHttpService.get(1, 1000000, 'code', 'asc', params, null).subscribe(
            (data: PagedResult<EmployeeStorage>) => {

                let options = {
                    sheetid: 'Administrare',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                // let res = alasql(`SELECT id as [Id],
                //                     code as [Cod],
                //                     name as [Denumire],
                //                     divisionName as [Localitate / Judet]
                //                     INTO XLSX("Centre de cost.xlsx",?) FROM ?`,[ options, data.items ]);

            });
    }

    collapsed(event: any): void {
        // console.log(event);
      }

      expanded(event: any): void {
        // console.log(event);
      }
}
