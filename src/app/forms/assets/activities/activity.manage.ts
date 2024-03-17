import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { GenericManage } from '../../generic/generic.manage';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Activity } from '../../../model/api/assets/activity';
import { ActivityHttpService } from '../../../services/http/assets/activity.http.service';

@Component({
    selector: 'activity-manage',
    templateUrl: 'activity.manage.html',
    providers: [ ActivityHttpService ]
})
export class ActivityManage extends GenericManage<Activity, number> {

    @ViewChild('itemDetailModal') modal: ModalDirective;

    public filter: string = '';
    isCollapsed: boolean = true;
    constructor(public activityHttpService: ActivityHttpService) {
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

        this.activityHttpService.get(1, 10000000, 'code', 'asc', params, null).subscribe(
            (data: PagedResult<Activity>) => {

                let options = {
                    sheetid: 'projects',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                // alasql.promise(`SELECT id as [Id],
                //                     code as [Cod],
                //                     name as [Description]
                //                     INTO XLSX("projects.xlsx", ?) FROM ?`, [ options, data.items ]);

            });
    }

    collapsed(event: any): void {
        // console.log(event);
      }
    
      expanded(event: any): void {
        // console.log(event);
      }
}
