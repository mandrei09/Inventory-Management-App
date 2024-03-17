import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LocationType } from '../../../model/api/administration/location-type';
import { PagedResult } from '../../../model/common/paged-result';
import { Param } from '../../../model/common/param';
import { LocationTypeHttpService } from '../../../services/http/administration/location-type.http.service';
import { GenericManage } from '../../generic/generic.manage';

@Component({
    selector: 'app-location-type-manage',
    templateUrl: 'location-type.manage.html',
    providers: [ LocationTypeHttpService ]
})
export class LocationTypeManageComponent extends GenericManage<LocationType, number> {

     @ViewChild('itemDetailModal') modal: ModalDirective;

    public filter: string = '';

    constructor(public locationTypeHttpService: LocationTypeHttpService) {
        super();
    }

     public detailInitialize() {
        this.modal.show();
    }

    public detailTerminate() {
        this.modal.hide();
    }

    public exportToExcel() {

        let params: Array<Param> = null;

        if ((this.filter != null) && (this.filter.length > 0)) {
            params = new Array<Param>();
            params.push(new Param('filter', this.filter));
        }

        this.locationTypeHttpService.get(1, 1000000, 'name', 'asc', params, null).subscribe(
            (data: PagedResult<LocationType>) => {

                let options = {
                    sheetid: 'tipuri',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                // alasql(`SELECT id as [Id],
                //     name as [Denumire]
                //     INTO XLSX('tipuri.xlsx',?) FROM ?`, [ options, data.items ]);

            });
    }
}
