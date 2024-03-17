import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, ViewChild } from '@angular/core';
import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { EmployeeCostCenter } from '../../../model/api/administration/employee-cost-center';
import { EmployeeCostCenterList } from './employee-cost-center.list';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CostCenterListComponent } from '../cost-centers/cost-center.list';
import { EmployeeListComponent } from '../employees/employee.list';
import { CostCenter } from '../../../model/api/administration/cost-center';
import { Employee } from '../../../model/api/administration/employee';
import { CostCenterHttpService } from '../../../services/http/administration/cost-center.http.service';
import { EmployeeHttpService } from '../../../services/http/administration/employee.http.service';
import { EmployeeCostCenterHttpService } from '../../../services/http/administration/employee-cost-center.http.service';
import { AppUtils } from '../../../common/app.utils';


@Component({
    selector: 'employee-cost-center-manage',
    templateUrl: 'employee-cost-center.manage.html',
    styleUrls: ['employee-cost-center.manage.scss'],
    providers: [ EmployeeCostCenterHttpService, CostCenterHttpService, EmployeeHttpService ]
})
export class EmployeeCostCenterManage extends GenericManage<EmployeeCostCenter, number> {

    @ViewChild('employeeCostCenterList') employeeCostCenterList: EmployeeCostCenterList;
    @ViewChild('costCenterListModal') costCenterListModal: ModalDirective;
    @ViewChild('costCenterList') costCenterList: CostCenterListComponent;
    @ViewChild('employeeListModal') employeeListModal: ModalDirective;
    @ViewChild('employeeList') employeeList: EmployeeListComponent;

    public filter: string = '';
    public selectedCostCenter: CostCenter = null;
    public selectedEmployee: Employee = null;
    isCollapsed: boolean = true;

    constructor(public costCenterHttpService: CostCenterHttpService,
      public employeeCostCenterHttpService: EmployeeCostCenterHttpService,
      public employeeHttpService: EmployeeHttpService) {

        super();
    }

    ngAfterViewInit () {
        this.refresh();
    }

    public onCostCenterListCancel() {
        this.costCenterListModal.hide();
    }

    public onEmployeeListCancel() {
        this.employeeListModal.hide();
    }

    public refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param("costCenterIds", AppUtils.getIdsList<CostCenter, number>([ this.selectedCostCenter ])));
        params.push(new Param("employeeIds", AppUtils.getIdsList<Employee, number>([ this.selectedEmployee ])));


        this.employeeCostCenterList.refresh(params);
    }

    public selectCostCenter() {

        this.costCenterListModal.show();
        this.costCenterList.refresh(null);
    }

    public selectEmployee() {
        this.employeeListModal.show();
        this.employeeList.refresh(null);
    }

    public setSelectedCostCenter() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedCostCenter = this.costCenterList.selectedItem;
                this.costCenterListModal.hide();
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

    public unselectCostCenter() {
        this.selectedCostCenter = null;
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

        this.employeeCostCenterHttpService.get(1, 1000000, 'code', 'asc', params, null).subscribe(
            (data: PagedResult<EmployeeCostCenter>) => {

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
