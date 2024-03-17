import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Country } from '../../../model/api/administration/country';
import { PagedResult } from '../../../model/common/paged-result';
import { Param } from '../../../model/common/param';
import { CountryHttpService } from '../../../services/http/administration/contry.http.service';
import { GenericManage } from '../../generic/generic.manage';

@Component({
    selector: 'app-country-manage',
    templateUrl: 'country.manage.html',
    providers: [ CountryHttpService ]
})
export class CountryManageComponent extends GenericManage<Country, number> {

     @ViewChild('itemDetailModal') modal: ModalDirective;

    public filter: string = '';
    isCollapsed: boolean = true;
    constructor(public countryHttpService: CountryHttpService) {
        super();
    }

     public detailInitialize() {
        this.modal.show();
    }

    public detailTerminate() {
        this.modal.hide();
    }

    public exportToExcel() {

        // let params: Array<Param> = null;

        // if ((this.filter != null) && (this.filter.length > 0)) {
        //     params = new Array<Param>();
        //     params.push(new Param('filter', this.filter));
        // }

        // this.countryHttpService.get(1, 1000000, 'name', 'asc', params, null).subscribe(
        //     (data: PagedResult<Country>) => {

        //         let options = {
        //             sheetid: 'Tari',
        //             headers: true,
        //             column: { style: { Font: { Bold: '1' } } },
        //             rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
        //             cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
        //         };

        //         alasql(`SELECT id as [Id],
        //             name as [Denumire]
        //             INTO XLSX('tari.xlsx',?) FROM ?`, [ options, data.items ]);

        //     });
    }


    collapsed(event: any): void {
        // console.log(event);
      }
    
      expanded(event: any): void {
        // console.log(event);
      }
}

