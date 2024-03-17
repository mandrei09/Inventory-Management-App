import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, ViewChild } from '@angular/core';
import { GenericManage } from '../../generic/generic.manage';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { EntityType } from '../../../model/api/administration/entity-type';
import { EntityTypeListComponent } from './entity-type.list';
import { EntityTypeDetailComponent } from './entity-type.detail';
import { EntityTypeHttpService } from '../../../services/http/administration/entity-type.http.service';

@Component({
    selector: 'app-entity-type-manage',
    templateUrl: 'entity-type.manage.html',
    styleUrls: ['entity-type.manage.scss'],
    providers: [ ]
})
export class EntityTypeManageComponent extends GenericManage<EntityType, number> {

    @ViewChild('entityTypeDetailModal') entityTypeDetailModal: ModalDirective;
    @ViewChild('entityTypeList') entityTypeList: EntityTypeListComponent;
    @ViewChild('entityTypeDetail') entityTypeDetail: EntityTypeDetailComponent;

    public filter: string = '';
    isCollapsed: boolean = true;

    constructor(public entityTypeHttpService: EntityTypeHttpService) {
        super();
    }

    public addNewItem() {
        super.addNewItem();
    }

    public editItem() {
        super.editItem();

    }

    public detailInitialize() {
        super.detailInitialize();
        this.entityTypeDetailModal.show();
    }

    public detailTerminate() {
        super.detailTerminate();
        this.entityTypeDetailModal.hide();
    }

    public refresh() {
        const params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));

        this.entityTypeList.refresh(params);
    }

    public exportToExcel(){

         let params: Array<Param> = null;

        if ((this.filter != null) && (this.filter.length > 0)) {
            params = new Array<Param>();
            params.push(new Param('filter', this.filter));
        }

        this.entityTypeHttpService.get(1, 10000000, 'code', 'asc', params, null).subscribe(
            (data: PagedResult<EntityType>) => {

                // let options = {
                //     sheetid: 'email-type',
                //     headers: true,
                //     column: { style: { Font: { Bold: '1' } } },
                //     rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                //     cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                // };

                // alasql(`SELECT id as [Id],
                //     code as [Code],
                //     name as [Type]
                //     INTO XLSX("email-type.xlsx",?) FROM ?`, [ options, data.items ]);

            });

    }

    collapsed(event: any): void {
        // console.log(event);
      }
      expanded(event: any): void {
        // console.log(event);
      }
}
