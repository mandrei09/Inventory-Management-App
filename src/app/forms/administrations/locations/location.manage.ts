import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { Location } from '../../../model/api/administration/location';
import { LocationHttpService } from '../../../services/http/administration/location.http.service';
import { saveAs as fileSaveAs } from 'file-saver-es';
import { RegionHttpService } from '../../../services/http/administration/region.http.service';
import { AdmCenterHttpService } from '../../../services/http/administration/adm-center.http.service';
import { CityHttpService } from '../../../services/http/administration/city.http.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LocationListComponent } from './location.list';
import { LocationDetailComponent } from './location.detail';
import { RegionListComponent } from '../regions/region.list';
import { AdmCenterListComponent } from '../adm-centers/adm-center.list';
import { CityListComponent } from '../cities/city.list';
import { Region } from '../../../model/api/administration/region';
import { AdmCenter } from '../../../model/api/administration/adm-center';
import { City } from '../../../model/api/administration/city';
import { AppUtils } from '../../../common/app.utils';
import {LocationAddEditComponent} from './location-add-edit/location-add-edit.component';
import {MatDialog} from '@angular/material/dialog';
import {DialogService} from '../../../services/dialog.service';

@Component({
    selector: 'app-location-manage',
    templateUrl: 'location.manage.html',
    styleUrls: ['location.manage.scss'],
    providers: [ LocationHttpService, RegionHttpService, AdmCenterHttpService, CityHttpService ]
})
export class LocationManageComponent extends GenericManage<Location, number> {

    @ViewChild('locationDetailModal') locationDetailModal: ModalDirective;
    @ViewChild('locationList') locationList: LocationListComponent;
    @ViewChild('locationDetail') locationDetail: LocationDetailComponent;
    @ViewChild('regionListModal') regionListModal: ModalDirective;
    @ViewChild('regionList') regionList: RegionListComponent;
    @ViewChild('admCenterListModal') admCenterListModal: ModalDirective;
    @ViewChild('admCenterList') admCenterList: AdmCenterListComponent;
    @ViewChild('cityListModal') cityListModal: ModalDirective;
    @ViewChild('cityList') cityList: CityListComponent;

    public filter: string = '';
    public selectedRegion: Region = null;
    public selectedAdmCenter: AdmCenter = null;
    public selectedCity: City = null;
    isCollapsed: boolean = true;
    constructor(
        public dialog: MatDialog,
        private dialogService: DialogService,
        public locationHttpService: LocationHttpService,
        public regionHttpService: RegionHttpService,
        public admCenterHttpService: AdmCenterHttpService,
        public cityHttpService: CityHttpService) {
        super();
    }


  public onAddNew() {
    this.onAddEditItem();
  }

  public onAddEditItem(item: Location | null = null) {
    let dialogRef = this.dialog.open(LocationAddEditComponent, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { item: item }
    });

    dialogRef.afterClosed().subscribe((item: Location) => {
      if (item !== null) this.refresh();
    });
  }

  public onItemEdit(item: Location) {
    this.onAddEditItem(item);
  }

  public onItemDelete(item: Location) {
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
          // this.notificationSvc.success('Location successfully deleted.');
        }
      });
  }

  public deleteItem(item: Location) {
    // this.dataSource.delete(item.id!).subscribe(() => {
    //   this.refreshItems();
    // });
  }

    public detailInitialize() {
        super.detailInitialize();
        this.locationDetailModal.show();
    }

    public detailTerminate() {
        super.detailTerminate();
        this.locationDetailModal.hide();
    }

    public onLocationDetailCityNeeded() {
        this.locationDetailModal.hide();
        this.selectCity();
    }

    public onCityListCancel() {
        this.cityListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.locationDetailModal.show();
        }
    }

    public onLocationDetailRegionNeeded() {
        this.locationDetailModal.hide();
        this.selectRegion();
    }

    public onRegionListCancel() {
        this.regionListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.locationDetailModal.show();
        }
    }

    public onLocationDetailAdmCenterNeeded() {
        this.locationDetailModal.hide();
        this.selectAdmCenter();
    }

    public onAdmCenterListCancel() {
        this.admCenterListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.locationDetailModal.show();
        }
    }


    public refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param("regionIds", AppUtils.getIdsList<Region, number>([ this.selectedRegion ])));
        params.push(new Param("admCenterIds", AppUtils.getIdsList<AdmCenter, number>([ this.selectedAdmCenter ])));
        params.push(new Param('cityIds', AppUtils.getIdsList<City, number>([ this.selectedCity ])));

        this.locationList.refresh(params);
    }

    public selectCity() {
        this.cityListModal.show();
        this.cityList.refresh(null);
    }

    public setSelectedCity() {
        switch (this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedCity = this.cityList.selectedItem;
                this.cityListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.locationDetail.city = this.cityList.selectedItem;
                this.cityListModal.hide();
                this.locationDetailModal.show();
                break;
            default:
                break;
        }
    }

    public unselectCity() {
        this.selectedCity = null;
        this.refresh();
    }

    public selectRegion() {
        this.regionListModal.show();
        this.regionList.refresh(null);
    }

    public setSelectedRegion() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedRegion = this.regionList.selectedItem;
                this.regionListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.locationDetail.region = this.regionList.selectedItem;
                this.regionListModal.hide();
                this.locationDetailModal.show();
                break;
            default:
                break;
        }
    }

    public unselectRegion() {
        this.selectedRegion = null;
        this.refresh();
    }


    public selectAdmCenter() {
        this.admCenterListModal.show();
        this.admCenterList.refresh(null);
    }

    public setSelectedAdmCenter() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedAdmCenter = this.admCenterList.selectedItem;
                this.admCenterListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.locationDetail.admCenter = this.admCenterList.selectedItem;
                this.admCenterListModal.hide();
                this.locationDetailModal.show();
                break;
            default:
                break;
        }
    }

    public unselectAdmCenter() {
        this.selectedAdmCenter = null;
        this.refresh();
    }

    // public exportToExcel(){

    //      let params: Array<Param> = null;

    //     if ((this.filter != null) && (this.filter.length > 0)) {
    //         params = new Array<Param>();
    //         params.push(new Param('filter', this.filter));
    //     }

    //     this.locationHttpService.get(1, 10000000, 'code', 'asc', params, null).subscribe(
    //         (data: PagedResult<Location>) => {

    //             let options = {
    //                 sheetid: 'Buildings',
    //                 headers: true,
    //                 column: { style: { Font: { Bold: '1' } } },
    //                 rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
    //                 cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
    //             };

    //             alasql(`SELECT id as [Id],
    //                 code as [Cod],
    //                 name as [Denumire],
    //                 region->name as [Judet],
    //                 admCenter->name as [Regiune]
    //                 INTO XLSX("Buildings.xlsx",?) FROM ?`, [ options, data.items ]);

    //         });

    // }

    public getFilters(): Array<Param> {
        let params: Array<Param> = new Array<Param>();
        params.push(new Param('filter', this.filter));
        params.push(new Param('admCenterIds', AppUtils.getIdsList<AdmCenter, number>([this.selectedAdmCenter])));
        params.push(new Param('regionIds', AppUtils.getIdsList<Region, number>([this.selectedRegion])));
        params.push(new Param('cityIds', AppUtils.getIdsList<City, number>([this.selectedCity])));

        return params;
    }

    public export() {

        let params: Array<Param> = null;

        params = this.getFilters();
        this.locationHttpService
            .export(params)
            .subscribe((blob) => {
                fileSaveAs(blob.body, 'Buildings.xlsx');
            });
    }

    collapsed(event: any): void {
        // console.log(event);
      }

      expanded(event: any): void {
        // console.log(event);
      }
}
