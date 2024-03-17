import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TableDefinition } from '../../../model/common/table-definition';
import { TableDefinitionHttpService } from '../../../services/http/common/table-definition.http.service';
import { GenericManage } from '../../generic/generic.manage';
import {MatDialog} from '@angular/material/dialog';
import {ProjectType} from '../../../model/api/assets/project-type';
import {ProjectTypeAddEditComponent} from '../../assets/project-types/project-type-add-edit/project-type-add-edit.component';
import {Area} from '../../../model/api/administration/area';
import {TableDefinitionAddEditComponent} from './table-definition-add-edit/table-definition-add-edit.component';

@Component({
    selector: 'app-table-definition-manage',
    templateUrl: 'table-definition.manage.html'
})
export class TableDefinitionManageComponent extends GenericManage<TableDefinition, number> {

     @ViewChild('itemDetailModal') modal: ModalDirective;

    public filter: string = '';
    isCollapsed: boolean = true;

    constructor(public tableDefinitionHttpService: TableDefinitionHttpService,
    public dialog: MatDialog) {
        super();
    }

  public onAddNew() {
    this.onAddEditItem();
  }

  public onAddEditItem(item: TableDefinition | null = null) {
    const dialogRef = this.dialog.open(TableDefinitionAddEditComponent, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { item: item }
    });

    dialogRef.afterClosed().subscribe((item: TableDefinition) => {
      // if (item !== null) this.refresh();
    });
  }

  public onItemEdit(item: TableDefinition) {
    this.onAddEditItem(item);
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

