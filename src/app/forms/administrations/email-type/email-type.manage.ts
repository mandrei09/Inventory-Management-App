import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, ViewChild } from '@angular/core';
import { GenericManage } from '../../generic/generic.manage';
import { EmailTypeDetail } from './email-type.detail';
import { EmailTypeList } from './email-type.list';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { EmailType } from '../../../model/api/administration/email-type';
import { EmailTypeHttpService } from '../../../services/http/administration/email-type.http.service';
import {EmailTypeAddEditComponent} from './email-type-add-edit/email-type-add-edit.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'email-type-manage',
    templateUrl: 'email-type.manage.html',
    styleUrls: ['email-type.manage.scss'],
    providers: [ ]
})
export class EmailTypeManage extends GenericManage<EmailType, number> {

    @ViewChild('emailTypeDetailModal') emailTypeDetailModal: ModalDirective;
    @ViewChild('emailTypeList') emailTypeList: EmailTypeList;
    @ViewChild('emailTypeDetail') emailTypeDetail: EmailTypeDetail;

    public filter: string = '';
    isCollapsed: boolean = true;

    constructor(
      public dialog: MatDialog,
      public emailTypeHttpService: EmailTypeHttpService
    ) {
        super();
    }

    public onAddNew() {
      this.onAddEditItem();
    }

    public onAddEditItem(item: EmailType | null = null) {
      let dialogRef = this.dialog.open(EmailTypeAddEditComponent, {
        panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
        data: { item: item }
      });

      dialogRef.afterClosed().subscribe((item: EmailType) => {
        if (item !== null) this.refresh();
      });
    }

    public onItemEdit(item: EmailType) {
      this.onAddEditItem(item);
    }

    public detailInitialize() {
        super.detailInitialize();
        this.emailTypeDetailModal.show();
    }

    public detailTerminate() {
        super.detailTerminate();
        this.emailTypeDetailModal.hide();
    }

    public refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));

        this.emailTypeList.refresh(params);
    }

    public exportToExcel(){

         let params: Array<Param> = null;

        if ((this.filter != null) && (this.filter.length > 0)) {
            params = new Array<Param>();
            params.push(new Param('filter', this.filter));
        }

        this.emailTypeHttpService.get(1, 10000000, 'code', 'asc', params, null).subscribe(
            (data: PagedResult<EmailType>) => {

                let options = {
                    sheetid: 'email-type',
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
