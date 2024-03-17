import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, ViewChild } from '@angular/core';
import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { EmployeeListComponent } from '../employees/employee.list';
import { Employee } from '../../../model/api/administration/employee';
import { EmployeeHttpService } from '../../../services/http/administration/employee.http.service';
import { AppUtils } from '../../../common/app.utils';
import { EmployeeCompanyHttpService } from '../../../services/http/administration/employee-company.http.service';
import { CompanyHttpService } from '../../../services/http/assets/company.http.service';
import { EmployeeCompany } from '../../../model/api/administration/employee-company';
import { EmployeeCompanyList } from './employee-company.list';
import { Company } from '../../../model/api/assets/company';
import { CompanyListComponent } from '../../assets/companies/company.list';


@Component({
    selector: 'employee-company-manage',
    templateUrl: 'employee-company.manage.html',
    styleUrls: ['employee-company.manage.scss'],
    providers: [ EmployeeCompanyHttpService, CompanyHttpService, EmployeeHttpService ]
})
export class EmployeeCompanyManage extends GenericManage<EmployeeCompany, number> {

    @ViewChild('employeeCompanyList') employeeCompanyList: EmployeeCompanyList;
    @ViewChild('companyListModal') companyListModal: ModalDirective;
    @ViewChild('companyList') companyList: CompanyListComponent;
    @ViewChild('employeeListModal') employeeListModal: ModalDirective;
    @ViewChild('employeeList') employeeList: EmployeeListComponent;

    public filter: string = '';
    public selectedCompany: Company = null;
    public selectedEmployee: Employee = null;
    isCollapsed: boolean = true;

    constructor(public companyHttpService: CompanyHttpService,
      public employeeCompanyHttpService: EmployeeCompanyHttpService,
      public employeeHttpService: EmployeeHttpService) {

        super();
    }

    ngAfterViewInit () {
        this.refresh();
    }

    public onCompanyListCancel() {
        this.companyListModal.hide();
    }

    public onEmployeeListCancel() {
        this.employeeListModal.hide();
    }

    public refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param("companyIds", AppUtils.getIdsList<Company, number>([ this.selectedCompany ])));
        params.push(new Param("employeeIds", AppUtils.getIdsList<Employee, number>([ this.selectedEmployee ])));


        this.employeeCompanyList.refresh(params);
    }

    public selectCompany() {

        this.companyListModal.show();
        this.companyList.refresh(null);
    }

    public selectEmployee() {
        this.employeeListModal.show();
        this.employeeList.refresh(null);
    }

    public setSelectedCompany() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedCompany = this.companyList.selectedItem;
                this.companyListModal.hide();
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

    public unselectCompany() {
        this.selectedCompany = null;
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

        this.employeeCompanyHttpService.get(1, 1000000, 'code', 'asc', params, null).subscribe(
            (data: PagedResult<EmployeeCompany>) => {

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
