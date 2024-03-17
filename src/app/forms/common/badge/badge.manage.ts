import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, ViewChild } from '@angular/core';
import { GenericManage } from '../../generic/generic.manage';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Badge } from '../../../model/api/common/badge';
import { BadgeHttpService } from '../../../services/http/common/badge.http.service';
import { BadgeList } from './badge.list';
import { BadgeDetail } from './badge.detail';
import {BadgeAddEditComponent} from './badge-add-edit/badge-add-edit.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'badge-manage',
    templateUrl: 'badge.manage.html',
    styleUrls: ['badge.manage.scss'],
    providers: [ ]
})
export class BadgeManage extends GenericManage<Badge, number> {

    @ViewChild('badgeDetailModal') badgeDetailModal: ModalDirective;
    @ViewChild('badgeList') badgeList: BadgeList;
    @ViewChild('badgeDetail') badgeDetail: BadgeDetail;

    public filter: string = '';
    isCollapsed: boolean = true;

    constructor(
      public dialog: MatDialog,
      public badgeHttpService: BadgeHttpService
    ) {
        super();
    }

    public onAddNew() {
      this.onAddEditItem();
    }

    public onAddEditItem(item: Badge | null = null) {
      let dialogRef = this.dialog.open(BadgeAddEditComponent, {
        panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
        data: { item: item }
      });

      dialogRef.afterClosed().subscribe((item: Badge) => {
        if (item !== null) this.refresh();
      });
    }

    public onItemEdit(item: Badge) {
      this.onAddEditItem(item);
    }

    public detailInitialize() {
        super.detailInitialize();
        this.badgeDetailModal.show();
    }

    public detailTerminate() {
        super.detailTerminate();
        this.badgeDetailModal.hide();
    }

    public refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));

        this.badgeList.refresh(params);
    }

    public exportToExcel(){

         let params: Array<Param> = null;

        if ((this.filter != null) && (this.filter.length > 0)) {
            params = new Array<Param>();
            params.push(new Param('filter', this.filter));
        }

        this.badgeHttpService.get(1, 10000000, 'code', 'asc', params, null).subscribe(
            (data: PagedResult<Badge>) => {

                let options = {
                    sheetid: 'badge',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

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
