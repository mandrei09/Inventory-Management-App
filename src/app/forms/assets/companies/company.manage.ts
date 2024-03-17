import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { GenericManage } from '../../generic/generic.manage';
import { CompanyHttpService } from '../../../services/http/assets/company.http.service';
import { Company } from '../../../model/api/assets/company';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-company-manage',
    templateUrl: 'company.manage.html',
    providers: [ CompanyHttpService ]
})
export class CompanyManageComponent extends GenericManage<Company, number> {

     @ViewChild('itemDetailModal') modal: ModalDirective;

     public filter: string = '';
     isCollapsed: boolean = true;
    constructor(public companyHttpService: CompanyHttpService) {
        super();
    }

    public detailInitialize() {
        this.modal.show();
    }

    public detailTerminate() {
        this.modal.hide();
    }

 public exportToExcel(){

         let params: Array<Param> = null;

        if ((this.filter != null) && (this.filter.length > 0)) {
            params = new Array<Param>();
            params.push(new Param('filter', this.filter));
        }

        this.companyHttpService.get(1, 100000, 'code', 'asc', params, null).subscribe(
            (data: PagedResult<Company>) => {

                let options = {
                    sheetid: 'Categorii',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                // alasql(`SELECT id as [Id],
                //             code as [Cod],
                //             name as [Denumire]
                //             INTO XLSX("Company.xlsx", ?) FROM ?`, [ options, data.items ]);
            });

    }

   


collapsed(event: any): void {
      // console.log(event);
    }
  
    expanded(event: any): void {
      // console.log(event);
    }
}
