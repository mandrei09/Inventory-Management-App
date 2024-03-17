import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { CityHttpService } from '../../../services/http/administration/city.http.service';
import { CountyHttpService } from '../../../services/http/administration/county.http.service';
import { City } from '../../../model/api/administration/city';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CityListComponent } from './city.list';
import { CityDetailComponent } from './city.detail';
import { CountyListComponent } from '../counties/county.list';
import { County } from '../../../model/api/administration/county';
import { AppUtils } from '../../../common/app.utils';
import {CountyAddEditComponent} from '../counties/county-add-edit/county-add-edit.component';
import {MatDialog} from '@angular/material/dialog';
import {DialogService} from '../../../services/dialog.service';
import { saveAs as fileSaveAs } from 'file-saver-es';

@Component({
    selector: 'app-city-manage',
    templateUrl: 'city.manage.html',
    styleUrls: ['city.manage.scss'],
    providers: [ CityHttpService, CountyHttpService ]
})
export class CityManageComponent extends GenericManage<City, number> {

    @ViewChild('cityDetailModal') public cityDetailModal: ModalDirective;
    @ViewChild('cityList') public cityList: CityListComponent;
    @ViewChild('cityDetail') public cityDetail: CityDetailComponent;
    @ViewChild('countyListModal') public countyListModal: ModalDirective;
    @ViewChild('countyList') public countyList: CountyListComponent;

    public filter: string = '';
    public selectedCounty: City = null;

    constructor(
        public dialog: MatDialog,
        private dialogService: DialogService,
        public cityHttpService: CityHttpService,
        public countyHttpService: CountyHttpService) {
        super();
    }

  public onAddNew() {
    this.onAddEditItem();
  }

  public onItemEdit(item: City) {
    this.onAddEditItem(item);
  }

  public onAddEditItem(item: City | null = null) {
    let dialogRef = this.dialog.open(CountyAddEditComponent, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { item: item }
    });

    dialogRef.afterClosed().subscribe((item: City) => {
      if (item !== null) this.refresh();
    });
  }

  public onItemDelete(item: City) {
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

  public deleteItem(item: City) {
    // this.dataSource.delete(item.id!).subscribe(() => {
    //   this.refresh();
    // });
  }


    public refresh() {
        const params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        // params.push(new Param('countyIds', AppUtils.getIdsList<County, number>([ this.selectedCounty ])));
        this.cityList.refresh(params);
    }

    public getFilters(): Array<Param> {
      const params: Array<Param> = new Array<Param>();
      return params;
  }

    public export() {
      let params: Array<Param> = null;
      params = this.getFilters();
      this.cityHttpService
          .export(params)
          .subscribe((blob) => {
              fileSaveAs(blob.body, 'city.xlsx');
      });
  }
}
