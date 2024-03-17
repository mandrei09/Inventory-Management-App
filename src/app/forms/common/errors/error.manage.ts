import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { GenericManage } from '../../generic/generic.manage';
import { Error } from '../../../model/api/common/error';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ErrorHttpService } from '../../../services/http/common/error.http.service';

@Component({
    selector: 'app-error-manage',
    templateUrl: 'error.manage.html',
    providers: [ ErrorHttpService ]
})
export class ErrorManageComponent extends GenericManage<Error, number> {

    @ViewChild('itemDetailModal') modal: ModalDirective;

    isCollapsed: boolean = true;
    public filter: string = '';

    constructor(public errorHttpService: ErrorHttpService) {
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

        this.errorHttpService.get(1, 10000000, 'code', 'asc', params, null).subscribe(
            (data: PagedResult<Error>) => {

                let options = {
                    sheetid: 'Tipuri',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                // alasql.promise(`SELECT id as [Id], 
                //                     code as [Cod], 
                //                     name as [Denumire],
                //                     INTO XLSX("Tipuri-Observatii.xlsx", ?) FROM ?`, [ options, data.items ]);

            });
    }

    collapsed(event: any): void {
        // console.log(event);
      }
    
      expanded(event: any): void {
        // console.log(event);
      }
}
