import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { GenericManage } from '../../generic/generic.manage';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { PlantHttpService } from '../../../services/http/assets/plant.http.service';
import { Plant } from '../../../model/api/assets/plant';

@Component({
    selector: 'app-plant-manage',
    templateUrl: 'plant.manage.html',
    providers: [ PlantHttpService ]
})
export class PlantManageComponent extends GenericManage<Plant, number> {

    @ViewChild('itemDetailModal') modal: ModalDirective;

    isCollapsed: boolean = true;
    public filter: string = '';

    constructor(public plantHttpService: PlantHttpService) {
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

        this.plantHttpService.get(1, 10000000, 'code', 'asc', params, null).subscribe(
            (data: PagedResult<Plant>) => {

                let options = {
                    sheetid: 'clase',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                // alasql.promise(`SELECT id as [Id],
                //                     code as [Cod],
                //                     name as [Denumire],
                //                     depPeriodMin as [Durata minima],
                //                     depPeriodMax as [Durata maxima],
                //                     depPeriodDefault as [Durata implicita]
                //                     INTO XLSX("clase.xlsx", ?) FROM ?`, [ options, data.items ]);

            });
    }

    collapsed(event: any): void {
        // console.log(event);
      }

      expanded(event: any): void {
        // console.log(event);
      }
}
