import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { CostCenter } from '../../../model/api/administration/cost-center';
import { CostCenterHttpService } from '../../../services/http/administration/cost-center.http.service';
// import { saveAs as fileSaveAs } from 'file-saver-es';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AdmCenterHttpService } from '../../../services/http/administration/adm-center.http.service';
import { CostCenterDetailComponent } from './cost-center.detail';
import { AdmCenterListComponent } from '../adm-centers/adm-center.list';
import { CostCenterListComponent } from './cost-center.list';
import { AdmCenter } from '../../../model/api/administration/adm-center';
import { AppConfig } from '../../../config';
import { AppUtils } from '../../../common/app.utils';
import { RegionHttpService } from '../../../services/http/administration/region.http.service';
import { RegionListComponent } from '../regions/region.list';
import { Region } from '../../../model/api/administration/region';
// import { EmployeeListComponent } from '../employees/employee.list';
// import { Employee } from '../../../model/api/administration/employee';
// import { EmployeeHttpService } from '../../../services/http/administration/employee.http.service';
import { DivisionHttpService } from '../../../services/http/administration/division.http.service';
import { DivisionListComponent } from '../divisions/division.list';
import { Division } from '../../../model/api/administration/division';
import { AdministrationHttpService } from '../../../services/http/administration/administration.http.service';
import { AdministrationListComponent } from '../administrations/administration.list';
import { Administration } from '../../../model/api/administration/administration';
import { RoomHttpService } from '../../../services/http/administration/room.http.service';
import { RoomListComponent } from '../rooms/room.list';
import { Room } from '../../../model/api/administration/room';
import alasql from 'alasql';
import { saveAs as fileSaveAs } from 'file-saver-es';
import { CostCenterImport } from '../../../model/common/import/cost-center-import';
import { NotificationService } from '../../../services/notification.service';
import { ImportCostCenterResult } from '../../../model/api/result/import-cost-center-result';
import {CostCentersAddEditDialog} from './cost-centers-add-edit/cost-centers.add-edit.dialog';
import { MatDialog } from '@angular/material/dialog';
import {DialogService} from '../../../services/dialog.service';
import {EmployeeDivision} from '../../../model/api/administration/employee-division';

@Component({
    selector: 'app-cost-center-manage',
    templateUrl: 'cost-center.manage.html',
    styleUrls: ['cost-center.manage.scss'],
    providers: [ AdmCenterHttpService, RegionHttpService, DivisionHttpService, AdministrationHttpService, RoomHttpService ]
})
export class CostCenterManageComponent extends GenericManage<CostCenter, number> {

    @ViewChild('costCenterDetail') public costCenterDetail: CostCenterDetailComponent;
    @ViewChild('costCenterList') public costCenterList: CostCenterListComponent;
    @ViewChild('costCenterDetailModal') costCenterDetailModal: ModalDirective;
    @ViewChild('admCenterListModal') admCenterListModal: ModalDirective;
    @ViewChild('admCenterList') public admCenterList: AdmCenterListComponent;
    @ViewChild('regionListModal') regionListModal: ModalDirective;
    @ViewChild('regionList') public regionList: RegionListComponent;
    @ViewChild('divisionListModal') divisionListModal: ModalDirective;
    @ViewChild('divisionList') public divisionList: DivisionListComponent;
    @ViewChild('administrationListModal') administrationListModal: ModalDirective;
    @ViewChild('administrationList') administrationList: AdministrationListComponent;
    @ViewChild('roomListModal') roomListModal: ModalDirective;
    @ViewChild('roomList') roomList: RoomListComponent;

    @ViewChild('uploadModal') public uploadModal: ModalDirective;
    @ViewChild('importDataModal') public importDataModal: ModalDirective;

    public filter: string = '';
    isCollapsed: boolean = true;
    public selectedAdmCenter: AdmCenter = null;
    public selectedRegion: Region = null;
    public selectedDivision: Division = null;

    public fileEvent: any = null;

    public importLines: Array<CostCenterImport> = new Array<CostCenterImport>();

    public noOfItems: number = 0;
    public importIndex: number = 0;

    exportCompleted = true;

    // public selectedEmployee: Employee = null;
    // public selectedEmployee2: Employee = null;
    // public selectedEmployee3: Employee = null;
    public selectedAdministration: Administration = null;
    public selectedRoom: Room = null;

    public static get USE_REGION(): boolean { return false; }

    constructor(
      public dialog: MatDialog,
      private dialogService: DialogService,
      public costCenterHttpService: CostCenterHttpService,
      // public employeeHttpService: EmployeeHttpService,
      public notificationHttpService: NotificationService,
      public admCenterHttpService: AdmCenterHttpService, public regionHttpService: RegionHttpService,
      public administrationHttpService: AdministrationHttpService, public roomHttpService: RoomHttpService,
      public divisionHttpService: DivisionHttpService
    ) {
        super();
    }

    onItemDelete(item: CostCenter) {
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
            // this.notificationSvc.success('Asset successfully deleted.');
          }
        });
    }

    public deleteItem(item: CostCenter) {
      const filters = new Array<Param>;

      this.costCenterHttpService.delete(item.id!).subscribe(() => {
        this.costCenterList.refresh(filters);
      });
    }

    public onAddNew() {
      this.onAddEditItem();
    }

    public onAddEditItem(item: CostCenter | null = null) {
      let dialogRef = this.dialog.open(CostCentersAddEditDialog, {
        panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
        data: { item: item }
      });

      dialogRef.afterClosed().subscribe((item: CostCenter) => {
        if (item !== null) this.refresh();
      });
    }

    public onItemEdit(item: CostCenter) {
      this.onAddEditItem(item);
    }

    public detailTerminate() {
        super.detailTerminate();
        this.costCenterDetailModal.hide();
    }

    public selectAdmCenter() {
        this.admCenterListModal.show();
        this.admCenterList.refresh(null);
    }

    public selectRegion() {
        this.regionListModal.show();
        this.regionList.refresh(null);
    }

    public selectDivision() {
        this.divisionListModal.show();
        this.divisionList.refresh(null);
    }

    //   public onLocationDetailEmployeeNeeded() {
    //     this.costCenterDetailModal.hide();
    //     this.selectEmployee();
    // }

    // public onEmployeeListCancel() {
    //     this.employeeListModal.hide();
    //     if (this.viewMode === GenericManageViewMode.ItemDetail) {
    //         this.costCenterDetailModal.show();
    //     }
    // }

    // public onLocationDetailEmployee2Needed() {
    //     this.costCenterDetailModal.hide();
    //     this.selectEmployee2();
    // }

    // public onEmployee2ListCancel() {
    //     this.employee2ListModal.hide();
    //     if (this.viewMode === GenericManageViewMode.ItemDetail) {
    //         this.costCenterDetailModal.show();
    //     }
    // }

    // public onLocationDetailEmployee3Needed() {
    //     this.costCenterDetailModal.hide();
    //     this.selectEmployee3();
    // }

    // public onEmployee3ListCancel() {
    //     this.employee3ListModal.hide();
    //     if (this.viewMode === GenericManageViewMode.ItemDetail) {
    //         this.costCenterDetailModal.show();
    //     }
    // }

    public onCostCenterDetailAdministrationNeeded() {
        this.costCenterDetailModal.hide();
        this.selectAdministration();
    }

    public onAdministrationListCancel() {
        this.administrationListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.costCenterDetailModal.show();
        }
    }

    public onCostCenterDetailRoomNeeded() {
        this.costCenterDetailModal.hide();
        this.selectRoom();
    }

    public onRoomListCancel() {
        this.roomListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.costCenterDetailModal.show();
        }
    }

    public getFilters(): Array<Param> {
        const params: Array<Param> = new Array<Param>();
        params.push(new Param('filter', this.filter));
        params.push(new Param('admCenterIds', AppUtils.getIdsList<AdmCenter, number>([this.selectedAdmCenter])));
        params.push(new Param('regionIds', AppUtils.getIdsList<Region, number>([this.selectedRegion])));
        params.push(new Param('divisionIds', AppUtils.getIdsList<Division, number>([this.selectedDivision])));
        // params.push(new Param('employeeIds', AppUtils.getIdsList<Employee, number>([ this.selectedEmployee ])));
        // params.push(new Param('employee2Ids', AppUtils.getIdsList<Employee, number>([ this.selectedEmployee2 ])));
        // params.push(new Param('employee3Ids', AppUtils.getIdsList<Employee, number>([ this.selectedEmployee3 ])));
        params.push(new Param('administrationIds', AppUtils.getIdsList<Administration, number>([ this.selectedAdministration ])));
        params.push(new Param('roomIds', AppUtils.getIdsList<Room, number>([ this.selectedRoom ])));


        return params;
    }

    public refresh() {
        let params: Array<Param> = null;

        params = this.getFilters();
        this.costCenterList.refresh(params);
    }

    public onCostCenterDetailAdmCenterNeeded() {
        this.costCenterDetailModal.hide();
        this.selectAdmCenter();
    }

    public onAdmCenterListCancel() {
        this.admCenterListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.costCenterDetailModal.show();
        }
    }

    public setSelectedAdmCenters() {
        switch (this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedAdmCenter = this.admCenterList.selectedItem;
                this.admCenterListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.costCenterDetail.admCenter = this.admCenterList.selectedItem;
                this.admCenterListModal.hide();
                this.costCenterDetailModal.show();
                break;
        }
    }

    public unselectAdmCenter() {
        this.selectedAdmCenter = null;
        this.refresh();
    }

    public onCostCenterDetailRegionNeeded() {
        this.costCenterDetailModal.hide();
        this.selectRegion();
    }

    public onRegionListCancel() {
        this.regionListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.costCenterDetailModal.show();
        }
    }

    public setSelectedRegions() {
        switch (this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedRegion = this.regionList.selectedItem;
                this.regionListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.costCenterDetail.region = this.regionList.selectedItem;
                this.regionListModal.hide();
                this.costCenterDetailModal.show();
                break;
        }
    }

    public unselectRegion() {
        this.selectedRegion = null;
        this.refresh();
    }

    public onCostCenterDetailDivisionNeeded() {
        this.costCenterDetailModal.hide();
        this.selectDivision();
    }

    public onDivisionListCancel() {
        this.divisionListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.costCenterDetailModal.show();
        }
    }

    public setSelectedDivisions() {
        switch (this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedDivision = this.divisionList.selectedItem;
                this.divisionListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.costCenterDetail.division = this.divisionList.selectedItem;
                this.divisionListModal.hide();
                this.costCenterDetailModal.show();
                break;
        }
    }

    public unselectDivision() {
        this.selectedDivision = null;
        this.refresh();
    }


    // public selectEmployee() {
    //     this.employeeListModal.show();
    //     this.employeeList.refresh(null);
    // }

    // public setSelectedEmployee() {
    //     switch (this.viewMode) {
    //         case GenericManageViewMode.ItemList:
    //             this.selectedEmployee = this.employeeList.selectedItem;
    //             this.employeeListModal.hide();
    //             this.refresh();
    //             break;
    //         case GenericManageViewMode.ItemDetail:
    //             this.costCenterDetail.employee = this.employeeList.selectedItem;
    //             this.employeeListModal.hide();
    //             this.costCenterDetailModal.show();
    //             break;
    //         default:
    //             break;
    //     }
    // }

    // public unselectEmployee() {
    //     this.selectedEmployee = null;
    //     this.refresh();
    // }

    // public selectEmployee2() {
    //     this.employee2ListModal.show();
    //     this.employee2List.refresh(null);
    // }

    // public setSelectedEmployee2() {
    //     switch (this.viewMode) {
    //         case GenericManageViewMode.ItemList:
    //             this.selectedEmployee2 = this.employee2List.selectedItem;
    //             this.employee2ListModal.hide();
    //             this.refresh();
    //             break;
    //         case GenericManageViewMode.ItemDetail:
    //             this.costCenterDetail.employee2 = this.employee2List.selectedItem;
    //             this.employee2ListModal.hide();
    //             this.costCenterDetailModal.show();
    //             break;
    //         default:
    //             break;
    //     }
    // }

    // public unselectEmployee2() {
    //     this.selectedEmployee2 = null;
    //     this.refresh();
    // }

    // public selectEmployee3() {
    //     this.employee3ListModal.show();
    //     this.employee3List.refresh(null);
    // }

    // public setSelectedEmployee3() {
    //     switch (this.viewMode) {
    //         case GenericManageViewMode.ItemList:
    //             this.selectedEmployee3 = this.employee3List.selectedItem;
    //             this.employee3ListModal.hide();
    //             this.refresh();
    //             break;
    //         case GenericManageViewMode.ItemDetail:
    //             this.costCenterDetail.employee3 = this.employee3List.selectedItem;
    //             this.employee3ListModal.hide();
    //             this.costCenterDetailModal.show();
    //             break;
    //         default:
    //             break;
    //     }
    // }

    // public unselectEmployee3() {
    //     this.selectedEmployee3 = null;
    //     this.refresh();
    // }

    public selectAdministration() {
        this.administrationListModal.show();
        this.administrationList.refresh(null);
    }

    public setSelectedAdministration() {
        switch (this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedAdministration = this.administrationList.selectedItem;
                this.administrationListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.costCenterDetail.administration = this.administrationList.selectedItem;
                this.administrationListModal.hide();
                this.costCenterDetailModal.show();
                break;
            default:
                break;
        }
    }

    public unselectAdministration() {
        this.selectedAdministration = null;
        this.refresh();
    }

    public selectRoom() {
        this.roomListModal.show();
        this.roomList.refresh(null);
    }

    public setSelectedRoom() {
        switch (this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedRoom = this.roomList.selectedItem;
                this.roomListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.costCenterDetail.room = this.roomList.selectedItem;
                this.roomListModal.hide();
                this.costCenterDetailModal.show();
                break;
            default:
                break;
        }
    }

    public unselectRoom() {
        this.selectedRoom = null;
        this.refresh();
    }

    public export() {
      let params: Array<Param> = null;
      params = this.getFilters();
      this.costCenterHttpService
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

      public uploadFile() {

        this.uploadModal.show();
      }

      public loadFile(ev) {
        this.uploadModal.hide();

        this.fileEvent = ev;

        if (this.fileEvent === null) { return; }

        // @ts-ignore
        alasql.fn.datetime = function sheetDateToJSDate(n) {
          const d = new Date(1899, 11, 30);
          d.setDate(d.getDate() + n);
          // Rounds milliseconds to seconds
          d.setSeconds(d.getSeconds() + Math.round(d.getMilliseconds() / 1000));
          d.setMilliseconds(0);
          return d;
        };

        alasql.promise(`select
                            *
                            from FILE(?, {headers: true})`, [this.fileEvent])
            .then((importLines: Array<CostCenterImport>) => {
                const newArray = new Array<CostCenterImport>();

                for (let index = 0; index < importLines.length; index++) {
                  const element = importLines[index];
                  const data = new CostCenterImport();
                  data.CompanyCode = element['Company Code'];
                  data.CostCenterCode = element['Cost Center'];
                  data.CostCenterName = element['Description'];
                  data.AdmCenterCode = element['Profit Center'];
                  newArray.push(data);
                }
                // const newArray = importLines.filter(value => value.CompanyCode !== undefined);
                 // console.log(JSON.stringify(newArray));
                // importLines = this.removeUndefinedFromArray(importLines);
                // console.log(JSON.stringify(importLines));
                // this.importDataModal.show();

                this.importIndex = 1;
                this.importLines = newArray;
                this.noOfItems = newArray.length;

                this.doImport();
        });
      }

      public doImport() {
        if (this.importIndex < this.importLines.length) {
          this.importLines[this.importIndex].countLines = this.importLines.length;
          this.importLines[this.importIndex].currentIndex = this.importIndex;
            this.costCenterHttpService.import(this.importLines[this.importIndex]).subscribe((data: ImportCostCenterResult) => {
                if (data.success) {
                  this.notificationHttpService.showSuccess(data.message, 'Linia ' + this.importIndex + '/' + this.importLines.length, 3000, true, 3000);

                  this.importIndex = this.importIndex + 1;
                  this.doImport();
                } else {
                  this.notificationHttpService.showError(data.message, 'Linia ' + this.importIndex + '/' + this.importLines.length, 0, true, 0);
                }
            });
        } else {
            this.fileEvent = null;
            this.importDataModal.hide();
            this.importIndex = 1;
            this.importLines = new Array<CostCenterImport>();
            this.refresh();
        }
      }

      public exportTemplate() {
        this.exportCompleted = false;
        this.costCenterHttpService
            .template()
            .subscribe((blob) => {
                fileSaveAs(blob.body, 'model-import-buget.xlsx');
                this.exportCompleted = true;
            });
      }
}
