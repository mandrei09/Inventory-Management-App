import { Param } from './../../../model/common/param';
import { Component, ViewChild } from '@angular/core';
import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { Division } from '../../../model/api/administration/division';
import { Administration } from '../../../model/api/administration/administration';

import { AdministrationHttpService } from '../../../services/http/administration/administration.http.service';
import { AdministrationDetailHttpService } from '../../../services/http/administration/administration-detail.http.service';
import { AdministrationDetailComponent as AdministrationDetailUI } from './administration.detail';
import { DivisionHttpService } from '../../../services/http/administration/division.http.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AdministrationListComponent } from './administration.list';
import { DivisionListComponent } from '../divisions/division.list';
import { AppUtils } from '../../../common/app.utils';
import {MatDialog} from '@angular/material/dialog';
import {AdministrationAddEditComponent} from './administration-add-edit/administration-add-edit.component';
import { saveAs as fileSaveAs } from 'file-saver-es';

@Component({
    selector: 'app-administration-manage',
    templateUrl: 'administration.manage.html',
    providers: [ DivisionHttpService, AdministrationHttpService, AdministrationDetailHttpService ]
})
export class AdministrationManageComponent extends GenericManage<Administration, number> {

    @ViewChild('administrationDetailModal') administrationDetailModal: ModalDirective;
    @ViewChild('administrationList') administrationList: AdministrationListComponent;
    @ViewChild('administrationDetail') administrationDetail: AdministrationDetailUI;
    @ViewChild('divisionListModal') divisionListModal: ModalDirective;
    @ViewChild('divisionList') divisionList: DivisionListComponent;

    isCollapsed: boolean = true;
    public filter: string = '';
    public selectedDivision: Division = null;

    constructor(public divisionHttpService: DivisionHttpService, public administrationHttpService: AdministrationHttpService,
        public administrationDetailHttpService: AdministrationDetailHttpService,
        public dialog: MatDialog) {

        super();
    }

  public onAddNew() {
    this.onAddEditItem();
  }

  public onAddEditItem(item: Administration | null = null) {
    const dialogRef = this.dialog.open(AdministrationAddEditComponent, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { item: item }
    });

    dialogRef.afterClosed().subscribe((item: Administration) => {
      // if (item !== null) this.refresh();
    });
  }

  public onItemEdit(item: Administration) {
    this.onAddEditItem(item);
  }

    public detailInitialize() {
        super.detailInitialize();
        this.administrationDetailModal.show();
    }

    public detailTerminate() {
        super.detailTerminate();
        this.administrationDetailModal.hide();
    }

    public onAdministrationDetailDivisionNeeded() {
        this.administrationDetailModal.hide();
        this.selectDivision();
    }

    public onDivisionListCancel() {
        this.divisionListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.administrationDetailModal.show();
        }
    }

    public refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param("divisionIds", AppUtils.getIdsList<Division, number>([ this.selectedDivision ])));

        this.administrationList.refresh(params);
    }

    public selectDivision() {
        this.divisionListModal.show();
        this.divisionList.refresh(null);
    }

    public setSelectedDivision() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedDivision = this.divisionList.selectedItem;
                this.divisionListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.administrationDetail.division = this.divisionList.selectedItem;
                this.divisionListModal.hide();
                this.administrationDetailModal.show();
                break;
        }
    }

    public unselectDivision() {
        this.selectedDivision = null;
        this.refresh();
    }

    public getFilters(): Array<Param> {
      const params: Array<Param> = new Array<Param>();
      return params;
  }

    public export() {
      let params: Array<Param> = null;
      params = this.getFilters();
      this.administrationHttpService
          .export(params)
          .subscribe((blob) => {
              fileSaveAs(blob.body, 'tax.xlsx');
      });
  }


    collapsed(event: any): void {
        // console.log(event);
      }

      expanded(event: any): void {
        // console.log(event);
      }
}
