import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, ViewChild } from '@angular/core';
import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { EmployeeListComponent } from '../employees/employee.list';
import { Employee } from '../../../model/api/administration/employee';
import { EmployeeHttpService } from '../../../services/http/administration/employee.http.service';
import { AppUtils } from '../../../common/app.utils';
import { EmployeeDivisionHttpService } from '../../../services/http/administration/employee-division.http.service';
import { DivisionHttpService } from '../../../services/http/administration/division.http.service';
import { EmployeeDivision } from '../../../model/api/administration/employee-division';
import { EmployeeDivisionList } from './employee-division.list';
import { DivisionListComponent } from '../divisions/division.list';
import { Division } from '../../../model/api/administration/division';


@Component({
    selector: 'employee-division-manage',
    templateUrl: 'employee-division.manage.html',
    styleUrls: ['employee-division.manage.scss'],
    providers: [ EmployeeDivisionHttpService, DivisionHttpService, EmployeeHttpService ]
})
export class EmployeeDivisionManage extends GenericManage<EmployeeDivision, number> {

    @ViewChild('employeeDivisionList') employeeDivisionList: EmployeeDivisionList;
    @ViewChild('divisionListModal') divisionListModal: ModalDirective;
    @ViewChild('divisionList') divisionList: DivisionListComponent;
    @ViewChild('employeeListModal') employeeListModal: ModalDirective;
    @ViewChild('employeeList') employeeList: EmployeeListComponent;

    public filter: string = '';
    public selectedDivision: Division = null;
    public selectedEmployee: Employee = null;
    isCollapsed: boolean = true;

    constructor(public divisionHttpService: DivisionHttpService,
      public employeeDivisionHttpService: EmployeeDivisionHttpService,
      public employeeHttpService: EmployeeHttpService) {

        super();
    }

    ngAfterViewInit () {
        this.refresh();
    }

    public onDivisionListCancel() {
        this.divisionListModal.hide();
    }

    public onEmployeeListCancel() {
        this.employeeListModal.hide();
    }

    public refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param("divisionIds", AppUtils.getIdsList<Division, number>([ this.selectedDivision ])));
        params.push(new Param("employeeIds", AppUtils.getIdsList<Employee, number>([ this.selectedEmployee ])));


        this.employeeDivisionList.refresh(params);
    }

    public selectDivision() {

        this.divisionListModal.show();
        this.divisionList.refresh(null);
    }

    public selectEmployee() {
        this.employeeListModal.show();
        this.employeeList.refresh(null);
    }

    public setSelectedDivision() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedDivision = this.divisionList.selectedItem;
                this.divisionListModal.hide();
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

    public unselectDivision() {
        this.selectedDivision = null;
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

        this.employeeDivisionHttpService.get(1, 1000000, 'code', 'asc', params, null).subscribe(
            (data: PagedResult<EmployeeDivision>) => {

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
