import { AssetStateHttpService } from '../../../services/http/assets/asset-state.http.service';
import { AssetState } from '../../../model/api/assets/asset-state';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { GenericManage } from '../../generic/generic.manage';
import { Param } from '../../../model/common/param';
import { PagedResult } from '../../../model/common/paged-result';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-asset-state-manage',
    templateUrl: 'asset-state.manage.html',
    providers: [ AssetStateHttpService ]
})
export class AssetStateManageComponent extends GenericManage<AssetState, number> {

     @ViewChild('itemDetailModal') modal: ModalDirective;

    public filter: string = '';
    isCollapsed: boolean = true;
    constructor(public assetStateHttpService: AssetStateHttpService) {
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

        this.assetStateHttpService.get(1, 1000000, 'name', 'asc', params, null).subscribe(
            (data: PagedResult<AssetState>) => {

                let options = {
                    sheetid: 'Tipuri_miscari',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                // alasql(`SELECT id as [Id],
                //     name as [Denumire]
                //     INTO XLSX("tipuri_miscari.xlsx",?) FROM ?`, [ options, data.items ]);

            });
    }



collapsed(event: any): void {
      // console.log(event);
    }
  
    expanded(event: any): void {
      // console.log(event);
    }
}
