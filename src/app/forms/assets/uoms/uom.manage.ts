import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { GenericManage } from '../../generic/generic.manage';
import { UomHttpService } from '../../../services/http/assets/uom.http.service';
import { Uom } from '../../../model/api/assets/uom';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-uom-manage',
    templateUrl: 'uom.manage.html',
    providers: [ UomHttpService ]
})
export class UomManageComponent extends GenericManage<Uom, number> {

     @ViewChild('itemDetailModal') modal: ModalDirective;

     isCollapsed: boolean = true;
     public filter: string = '';

    constructor(public uomHttpService: UomHttpService) {
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

        this.uomHttpService.get(1, 100000, 'code', 'asc', params, null).subscribe(
            (data: PagedResult<Uom>) => {

                let options = {
                    sheetid: 'clients',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                // alasql(`SELECT id as [Id],
                //             code as [Cod],
                //             name as [Description]
                //             INTO XLSX("Clients.xlsx", ?) FROM ?`, [ options, data.items ]);
            });

    }

    collapsed(event: any): void {
        // console.log(event);
      }
    
      expanded(event: any): void {
        // console.log(event);
      }
}
