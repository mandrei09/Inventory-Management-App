import { Param } from './../../../model/common/param';
import { Component, ViewChild } from '@angular/core';
import { GenericManage } from '../../generic/generic.manage';
import { CountryHttpService } from '../../../services/http/administration/contry.http.service';
import { CountyHttpService } from '../../../services/http/administration/county.http.service';
import { County } from '../../../model/api/administration/county';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CountyListComponent } from './county.list';
import { CountyDetailComponent } from './county.detail';
import { Country } from '../../../model/api/administration/country';
import { AppUtils } from '../../../common/app.utils';
import { CountryListComponent } from '../countries/country.list';
import {CountyAddEditComponent} from './county-add-edit/county-add-edit.component';
import {MatDialog} from '@angular/material/dialog';
import {DialogService} from '../../../services/dialog.service';
import { saveAs as fileSaveAs } from 'file-saver-es';

@Component({
    selector: 'app-county-manage',
    templateUrl: 'county.manage.html',
    styleUrls: ['county.manage.scss'],
    providers: [ CountyHttpService, CountryHttpService ]
})
export class CountyManageComponent extends GenericManage<County, number> {

    public _selectedCountry: Country = null;
    public get selectedCountry(): Country { return this._selectedCountry; }
    public set selectedCountry(value: Country) {

      this._selectedCountry = value;
      this.refresh();
      // this.setSelectedCountry(value);
    }

    @ViewChild('countyDetailModal') countyDetailModal: ModalDirective;
    @ViewChild('countyList') countyList: CountyListComponent;
    @ViewChild('countyDetail') countyDetail: CountyDetailComponent;
    @ViewChild('countryListModal') countryListModal: ModalDirective;
    @ViewChild('countryList') countryList: CountryListComponent;

    public filter: string = '';

  constructor(
        public dialog: MatDialog,
        private dialogService: DialogService,
        public countyHttpService: CountyHttpService,
        public countryHttpService: CountryHttpService) {
        super();
  }

  public onAddNew() {
    this.onAddEditItem();
  }

  public onItemEdit(item: County) {
    this.onAddEditItem(item);
  }

  public onAddEditItem(item: County | null = null) {
    let dialogRef = this.dialog.open(CountyAddEditComponent, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { item: item }
    });

    dialogRef.afterClosed().subscribe((item: County) => {
      if (item !== null) this.refresh();
    });
  }

  public onItemDelete(item: County) {
    this.dialogService
      .confirmDialog({
        title: 'Confirm Action',
        message: 'Do you want to confirm this action?',
        confirmCaption: 'Confirm',
        cancelCaption: 'Cancel',
      })
      .subscribe((confirmed: any) => {
        if (confirmed) {
          this.deleteItem(item);
          // this.notificationSvc.success('County successfully deleted.');
        }
      });
  }

  public deleteItem(item: County) {
    // this.dataSource.delete(item.id!).subscribe(() => {
    //   this.refresh();
    // });
  }

    public refresh() {
        const params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param('countryIds', AppUtils.getIdsList<Country, number>([ this.selectedCountry ])));
        this.countyList.refresh(params);
    }

    public getFilters(): Array<Param> {
      const params: Array<Param> = new Array<Param>();
      return params;
  }

    public export() {
      let params: Array<Param> = null;
      params = this.getFilters();
      this.countyHttpService
          .export(params)
          .subscribe((blob) => {
              fileSaveAs(blob.body, 'county.xlsx');
      });
  }
}
