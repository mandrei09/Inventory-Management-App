import { RoomDetailHttpService } from './../../../services/http/administration/room-detail.http.service';
import { RegionHttpService } from './../../../services/http/administration/region.http.service';
import { Region } from './../../../model/api/administration/region';
import { AssetOpHttpService } from './../../../services/http/assets/asset-op.http.service';
import { Component, EventEmitter, ViewChild, ElementRef, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Param } from '../../../model/common/param';
import { Location } from '../../../model/api/administration/location';
import { saveAs as fileSaveAs } from 'file-saver-es';
// import { DatePickerOptions, DateModel } from 'ng2-date-picker';
import { AssetOpSimpleDetailMemoryService } from '../../../services/memory/asset-op-simple-detail.memory.service';
import { AssetInvDetailHttpService } from '../../../services/http/assets/asset-inv-detail.http.service';
import { LocationHttpService } from '../../../services/http/administration/location.http.service';
import { EmployeeHttpService } from '../../../services/http/administration/employee.http.service';
import { AdmCenterHttpService } from '../../../services/http/administration/adm-center.http.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { RegionListComponent } from '../regions/region.list';
import { AdmCenterListComponent } from '../adm-centers/adm-center.list';
import { LocationListComponent } from '../locations/location.list';
import { RoomListComponent } from '../rooms/room.list';
import { EmployeeListComponent } from '../employees/employee.list';
import { AssetCategory } from '../../../model/api/assets/asset-category';
import { AssetClass } from '../../../model/api/assets/asset-class';
import { Partner } from '../../../model/api/documents/partner';
import { CostCenter } from '../../../model/api/administration/cost-center';
import { Department } from '../../../model/api/administration/department';
import { Employee } from '../../../model/api/administration/employee';
import { Room } from '../../../model/api/administration/room';
import { AssetSimpleDetail } from '../../../model/api/assets/asset-simple-detail';
import { AccMonth } from '../../../model/api/accounting/acc-month';
import { AdmCenter } from '../../../model/api/administration/adm-center';
import { AppConfig } from '../../../config';
import { AssetOpConf } from '../../../model/common/import/asset-op-conf';
import { AppData } from '../../../app-data';
import { DocumentHttpService } from '../../../services/http/documents/document.http.service';
import { AssetOp } from '../../../model/api/assets/asset-op';
import { AssetOpExport } from '../../../model/api/assets/asset-op-export';
import { PagedResult } from '../../../model/common/paged-result';
import { AssetOpExportOtp } from '../../../model/api/assets/asset-op-exportOtp';
import { AssetOpConfirm } from '../../../model/api/assets/asset-op-confirm';
import { RequestOpDetailList } from './request-op.detail.list';
import { RequestOpHttpService } from '../../../services/http/administration/request-op.http.service';
import { RequestFilter } from '../../../model/api/administration/request.filter';


@Component({
    selector: 'request-op-manage',
    templateUrl: 'request-op-manage.html',
    styleUrls: ['request-op-manage.scss'],
    providers: [
        AssetOpSimpleDetailMemoryService,
        AssetOpHttpService,
        AssetInvDetailHttpService,
        RegionHttpService,
        LocationHttpService,
        RoomDetailHttpService,
        EmployeeHttpService,
        AdmCenterHttpService ]
})
export class RequestOpManage  {

    @ViewChild('requestOpDetailList') public requestOpList: RequestOpDetailList;

    @ViewChild('confirmationModal') public confirmationModal: ModalDirective;
    @ViewChild('importDataModal') public importDataModal: ModalDirective;

    @ViewChild('regionList') public regionList: RegionListComponent;
    @ViewChild('regionListModal') public regionListModal: ModalDirective;

    @ViewChild('admCenterList') public admCenterList: AdmCenterListComponent;
    @ViewChild('admCenterListModal') public admCenterListModal: ModalDirective;

    @ViewChild('locationList') public locationList: LocationListComponent;
    @ViewChild('locationListModal') public locationListModal: ModalDirective;

    @ViewChild('roomList') public roomList: RoomListComponent;
    @ViewChild('roomListModal') public roomListModal: ModalDirective;

    @ViewChild('employeeList') public employeeList: EmployeeListComponent;
    @ViewChild('employeeListModal') public employeeListModal: ModalDirective;

    @Output() public uploadFinished = new EventEmitter<void>();
    @ViewChild('fileInput') fileInput: ElementRef;

    public selectedAssetCategories: Array<AssetCategory> = new Array<AssetCategory>();
    public selectedAssetClasses: Array<AssetClass> = new Array<AssetClass>();
    public selectedPartners: Array<Partner> = new Array<Partner>();
    public selectedCostCenters: Array<CostCenter> = new Array<CostCenter>();
    public selectedDepartments: Array<Department> = new Array<Department>();
    public selectedEmployees: Array<Employee> = new Array<Employee>();
    public selectedLocations: Array<Location> = new Array<Location>();
    public selectedRooms: Array<Room> = new Array<Room>();
    public selectedAccMonth: AccMonth = null;
    public selectedAssetOps: Array<AssetSimpleDetail> = new Array<AssetSimpleDetail>();
    public selectedRegions: Array<Region> = new Array<Region>();
    public selectedAdmCenters: Array<AdmCenter> = new Array<AdmCenter>();

    public companyName: string = AppConfig.COMPANY_NAME;
    public assetId: number = 0;
    public selectedAssetOp: any;
    public transferStartDate: Date;
    public transferEndDate: Date;
    public filter: string;
    // public assetOpState: string = '-';
    public assetOpState: string = 'All';
    public custody: string = '-';


    public importLines: Array<AssetOpConf> = new Array<AssetOpConf>();
    public selectedAssetOpIds: Array<number> = new Array<number>();
    public importIndex: number = 0;
    public fileEvent: any = null;

    public operationType: OperationType = OperationType.NotSet;
    public confirmationMessage: string = '';
    public documentTypeCode: string = 'TRANSFER';
    public assetRowSelection: string = 'multiple';
    public showRegionDetails: boolean= AppConfig.SHOW_REGION_DETAILS;
    public showLocationDetails: boolean= AppConfig.SHOW_LOCATION_DETAILS;
    public showRoomsDetails: boolean= AppConfig.SHOW_ROOMS_DETAILS;
    public showEmployeesDetails: boolean= AppConfig.SHOW_EMPLOYEE_DETAILS;
    public useExportOTP: boolean= AppConfig.USE_EXPORT_OTP;
    public get isAdmin(): boolean { return AppData.UserIsAdmin; }

    // public fromdate: DateModel;
    public from = '';
    // public todate: DateModel;
    public to = '';

//     public options: DatePickerOptions = {
//     format: 'MM-DD-YYYY',
//     todayText: 'Oggi',
//     style: 'big'
//   };


    constructor(public route: ActivatedRoute,
                public router: Router,
                public requestOpHttpService: RequestOpHttpService,
                public assetInvDetailHttpService: AssetInvDetailHttpService,
                public regionHttpService: RegionHttpService,
                public admCenterHttpService: AdmCenterHttpService,
                public locationHttpService: LocationHttpService,
                public roomDetailHttpService: RoomDetailHttpService,
                public employeeHttpService: EmployeeHttpService,
                public documentHttpService: DocumentHttpService)
                { 
                    // this.options = new DatePickerOptions();
                }

    ngAfterViewInit() {
        this.clearFilters();
        this.refreshAssetOperations();
    }

    public onChangeFrom(event) {
        this.from = JSON.stringify(event.formatted);
        this.refreshAssetOperations();
    }

    public onChangeTo(event) {
        this.to = JSON.stringify(event.formatted);
        this.refreshAssetOperations();
    }

    public onAssetOpDetailListSelectionChanged(assetOpSimpleDetails: Array<AssetOp>) {

        this.selectedAssetOp = assetOpSimpleDetails != null && assetOpSimpleDetails.length === 1
            ? assetOpSimpleDetails[0] : null;
    }

    public refreshAssetOperations() {
        let params: Array<Param> = this.getFilters();
        this.requestOpList.refresh(params);
    }

    public showAssetDetail($event, selectedItem: any){
       selectedItem  != null  ?  this.router.navigate(['/asset/', selectedItem.asset.id])
       : alert('Va rugam selectati cel putin o operatie!'); return;
    }


    public getFilters(): Array<Param> {
        let params = new Array<Param>();
        let assetFilter: RequestFilter = new RequestFilter();


        let assetStateOpIds: Array<number> = new Array<number>();

        let startDate: Date;
        let endDate: Date;
        let userId: number;



        // if (this.selectedRegions != null) {
        //     assetFilter.regionIds = new Array<number>();
        //     this.selectedRegions.forEach((region) => {
        //         assetFilter.regionIds.push(region.id);
        //     });
        // }

        // if (this.selectedAdmCenters != null) {
        //     assetFilter.admCenterIds = new Array<number>();
        //     this.selectedAdmCenters.forEach((admCenter) => {
        //         assetFilter.admCenterIds.push(admCenter.id);
        //     });
        // }

        // if (this.selectedLocations != null) {
        //     assetFilter.locationIds = new Array<number>();
        //     this.selectedLocations.forEach((location) => {
        //         assetFilter.locationIds.push(location.id);
        //     });
        // }

        // if (this.selectedRooms != null) {
        //     assetFilter.roomIds = new Array<number>();
        //     this.selectedRooms.forEach((room) => {
        //         assetFilter.roomIds.push(room.id);
        //     });
        // }

        if (this.selectedEmployees != null) {
            assetFilter.employeeIds = new Array<number>();
            this.selectedEmployees.forEach((employee) => {
                assetFilter.employeeIds.push(employee.id);
            });
        }



        // params.push(new Param('assetOpState', ((this.assetOpState === '-') ? 'null' :
        // (this.assetOpState === 'DSTCONF' ? 'DSTCONF' : (this.assetOpState === 'REGISTERCONF') ? 'REGISTERCONF' :
        //  (this.assetOpState === 'RELEASECONF') ? 'RELEASECONF' :
        //   (this.assetOpState === 'SRCCONF') ? 'SRCCONF' :  ''))));
        assetFilter.filter = this.filter;
        //assetFilter.fromDate = new Date(this.from);
        //assetFilter.toDate = new Date(this.to);
        params.push(new Param('documentTypeCode', this.documentTypeCode));
        params.push(new Param('assetOpState', this.assetOpState === '-' ? null : this.assetOpState));
        // params.push(new Param('startDate', this.transferStartDate ? this.transferStartDate.toDateString() : ''));
        // params.push(new Param('endDate', this.transferEndDate ? this.transferEndDate.toDateString() : ''));
        // params.push(new Param('startDate', this.from ? new Date(this.from).toString() : ''));
        // params.push(new Param('endDate', this.to ? new Date(this.from).toString() : ''));
        params.push(new Param('jsonFilter', JSON.stringify(assetFilter)));

        return params;
    }

    public checkForRefresh() {
        this.refreshAssetOperations();
    }

    public onStateUpdate(assetOpState: string) {
        this.assetOpState = assetOpState;
        this.checkForRefresh();
    }

    public onProcessAssetOp() {
        this.operationType = OperationType.ProcessAssetOp;
        this.confirmationMessage = 'Validati transferurile selectate?';
        this.confirmationModal.show();
    }

    public processAssetOp() {
        this.requestOpList.selectedItems.forEach( item => {
            if (this.selectedAssetOpIds.indexOf(item)  === -1){
                this.selectedAssetOpIds.push(item.id);
            }
        });

        this.requestOpHttpService.process(this.selectedAssetOpIds).subscribe((data) => {
            this.refreshAssetOperations();
        });
    }
    // public sendEmail() {
    //     this.assetOpHttpService.sendEmail().subscribe((data) => {

    //     });
    // }
    public onConfirmationApproved() {

        switch (this.operationType) {
            case OperationType.ProcessAssetOp:
                this.processAssetOp();
                break;
            default:
                break;
        }

        this.operationType = OperationType.NotSet;
        this.confirmationModal.hide();
    }

    public onConfirmationCanceled() {
        this.operationType = OperationType.NotSet;
        this.confirmationModal.hide();
    }

    public parseStartDate(dateString: string): Date {
        if (dateString) {
            this.transferStartDate = new Date(dateString);
            this.transferEndDate = new Date();
            this.checkForRefresh();
            return new Date(dateString);
        } else {
            return null;
        }
    }
    public parseEndDate(dateString: string): Date {
        if (dateString) {
            this.transferEndDate = new Date(dateString);
            this.checkForRefresh();
            return new Date(dateString);
        } else {
            return null;
        }
    }

    public clearFilters() {

      //  this.assetOpState = '-';
        this.transferStartDate = undefined;
        this.transferEndDate = undefined;

        this.selectedLocations = new Array<Location>();
        this.selectedRooms = new Array<Room>();
        this.selectedEmployees = new Array<Employee>();
        this.selectedLocations = new Array<Location>();
        this.selectedRooms = new Array<Room>();
        this.selectedRegions = new Array<Region>();
        this.selectedAdmCenters = new Array<AdmCenter>();
        this.filter = '';
        //this.options.clearText ;
        //this.options.maxDate = null;
        this.selectedAssetOpIds = [];
        this.requestOpList.selectedItems = [];
        this.checkForRefresh();
    }

    public changeRowSelection() {
        if (this.assetRowSelection === 'single') {
            this.assetRowSelection = 'multiple';
        }
        else {
             this.selectedAssetOp = new Array<AssetSimpleDetail>();
            // this.selectedAssetId = 0;
            this.assetRowSelection = 'single';
        }
    }

     /* begin region */

     public selectRegions() {
        this.regionListModal.show();
        this.regionList.selectedItems = this.selectedRegions;
        this.regionList.refresh(null);
    }

    public removeFromRegionSelection(region: Region) {
        let index: number = this.selectedRegions.indexOf(region);
        this.selectedRegions.splice(index, 1);
        this.checkForRefresh();
    }

    public clearRegionSelection() {
        this.selectedRegions = new Array<Region>();
        this.checkForRefresh();
    }

    public setSelectedRegions() {
        this.selectedRegions = this.regionList.selectedItems;
        this.regionListModal.hide();
        this.checkForRefresh();
    }

    /* enf Region */

      /* begin admCenter */

      public selectAdmCenters() {
        this.admCenterListModal.show();
        this.admCenterList.selectedItems = this.selectedAdmCenters;
        this.admCenterList.refresh(null);
    }

    public removeFromAdmCenterSelection(admCenter: AdmCenter) {
        let index: number = this.selectedAdmCenters.indexOf(admCenter);
        this.selectedAdmCenters.splice(index, 1);
        this.checkForRefresh();
    }

    public clearAdmCenterSelection() {
        this.selectedAdmCenters = new Array<AdmCenter>();
        this.checkForRefresh();
    }

    public setSelectedAdmCenters() {
        this.selectedAdmCenters = this.admCenterList.selectedItems;
        this.admCenterListModal.hide();
        this.checkForRefresh();
    }

    /* enf Region */

    /* begin location */

    public selectLocations() {
        this.locationListModal.show();
        this.locationList.selectedItems = this.selectedLocations;
        this.locationList.refresh(null);
    }

    public removeFromLocationSelection(location: Location) {
        let index: number = this.selectedLocations.indexOf(location);
        this.selectedLocations.splice(index, 1);
        this.checkForRefresh();
    }

    public clearLocationSelection() {
        this.selectedLocations = new Array<Location>();
        this.checkForRefresh();
    }

    public setSelectedLocations() {
        this.selectedLocations = this.locationList.selectedItems;
        this.locationListModal.hide();
        this.checkForRefresh();
    }

    /* enf location */

   /* begin room */

    public selectRooms() {
        this.roomListModal.show();
        this.roomList.selectedItems = this.selectedRooms;
        this.roomList.refresh(null);
    }

    public removeFromRoomSelection(room: Room) {
        let index: number = this.selectedRooms.indexOf(room);
        this.selectedRooms.splice(index, 1);
        this.checkForRefresh();
    }

    public clearRoomSelection() {
        this.selectedRooms = new Array<Room>();
        this.checkForRefresh();
    }

    public setSelectedRooms() {
        this.selectedRooms = this.roomList.selectedItems;
        this.roomListModal.hide();
        this.checkForRefresh();
    }

    /* enf room */

     /* begin employee */

     public selectEmployees() {
        this.employeeListModal.show();
        this.employeeList.selectedItems = this.selectedEmployees;
        this.employeeList.refresh(null);
    }

    public removeFromEmployeeSelection(employee: Employee) {
        let index: number = this.selectedEmployees.indexOf(employee);
        this.selectedEmployees.splice(index, 1);
        this.checkForRefresh();
    }

    public clearEmployeeSelection() {
        this.selectedEmployees = new Array<Employee>();
        this.checkForRefresh();
    }

    public setSelectedEmployees() {
        this.selectedEmployees = this.employeeList.selectedItems;
        this.employeeListModal.hide();
        this.checkForRefresh();
    }

    /*end employee*/

    public showReport() {
        let reportType: string = '';
        let validReport: boolean = false;

        if (this.selectedAssetOp != null) {
           console.log('TIP DOCUMENT: ', this.selectedAssetOp.documentType.code);
            //  switch(this.selectedAssetOp.documentTypeCode) {
                switch(this.selectedAssetOp.documentType.code) {
                case AppConfig.DOCUMENT_TYPE_TRANSFER:
                    reportType = 'movementproviding';
                    validReport = true;
                    break;
                case AppConfig.DOCUMENT_TYPE_CASS:
                    reportType = 'annulement';
                    validReport = true;
                    break;
                case AppConfig.DOCUMENT_TYPE_INVENTORY:
                    reportType = 'movementproviding';
                    validReport = true;
                    break;
                case AppConfig.DOCUMENT_TYPE_ALL:
                    reportType = 'movementproviding';
                    validReport = true;
                    break;
                // case AppConfig.DOCUMENT_TYPE_STATE_CHANGE:
                //     reportType = 'cassation';
                //     validReport = true;
                //     break;
                case AppConfig.DOCUMENT_TYPE_TRANSFER_EMPLOYEE:
                    reportType = 'movementproviding';
                    validReport = true;
                    break;
                // case AppConfig.DOCUMENT_TYPE_TRANSFER_ROOM:
                //     reportType = 'movementproviding';
                //     validReport = true;
                //     break;
                default:
                    break;
            }

            if (validReport) {
                // window.open(`${AppConfig.reportingServer}Report.aspx/?report=${reportType}&documentId=${this.selectedAssetOp.documentId}`);
               console.log(this.selectedAssetOp);
                if (AppConfig.DOCUMENT_TYPE_INVENTORY) {
                    window.open(`${AppConfig.reportingServer}Report.aspx/?report=${reportType}&documentId=${this.selectedAssetOp.document.id}&assetOpId=${this.selectedAssetOp.id}`);
                }else{
                    window.open(`${AppConfig.reportingServer}Report.aspx/?report=${reportType}&documentId=${this.selectedAssetOp.document.id}`);
                }
            }
        }
    }

    public showReportCassation() {
        let reportType: string = '';
        let validReport: boolean = false;

        if (this.selectedAssetOp != null) {
           console.log('TIP DOCUMENT: ', this.selectedAssetOp.documentType.code);
            //  switch(this.selectedAssetOp.documentTypeCode) {
                switch (this.selectedAssetOp.documentType.code) {

                case AppConfig.DOCUMENT_TYPE_STATE_CHANGE:
                    reportType = 'scrab';
                    validReport = true;
                    break;
                default:
                    break;
            }

            if (validReport) {
                // window.open(`${AppConfig.reportingServer}Report.aspx/?report=${reportType}&documentId=${this.selectedAssetOp.documentId}`);
               console.log(this.selectedAssetOp);
                if (AppConfig.DOCUMENT_TYPE_INVENTORY) {
                    window.open(`${AppConfig.reportingServer}Report.aspx/?report=${reportType}&documentId=${this.selectedAssetOp.document.id}&assetOpId=${this.selectedAssetOp.id}`);
                } else{
                    window.open(`${AppConfig.reportingServer}Report.aspx/?report=${reportType}&documentId=${this.selectedAssetOp.document.id}`);
                }
            }
        }
    }

    public deleteOperation(){
        if(confirm('Esti sigur ca vrei sa anulezi transferul?')){
            this.requestOpHttpService.deleteAssetOp(this.selectedAssetOp.id).subscribe((res) => {});
            this.checkForRefresh();
        }
}

public validateOperationTemp(){
    console.log(this.selectedAssetOp);
    if(this.selectedAssetOp.documentType.id != 11){
        alert('Please select a temporary transfer!');
    } else{
        if(confirm('Are you sure you want to validate the temporary transfer?')){
            this.requestOpHttpService.validateAssetOpTemp(this.selectedAssetOp.id).subscribe(() => {});
            this.checkForRefresh();
        }
    }
}

    public assetOpListExport() {

        let params: Array<Param> = this.getFilters();
        let items: Array<AssetOpExport> = new Array<AssetOpExport>();

        this.requestOpHttpService.get(1, 1000000, 'modifiedAt', 'desc', params, null, 'details').subscribe(
            (result: PagedResult<any>) => {

                // console.log(result.items);

                let options = {
                    sheetid: 'nota_transfer',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                result.items.forEach((item: any) => {
                    let assetOpExport: AssetOpExport = new AssetOpExport();
                    let index = item.asset.invNo.indexOf('/');
                    assetOpExport.assetinvNo1 = item.asset.invNo.substring(0, index);
                    assetOpExport.assetinvNo2 = item.asset.invNo.substring(index + 1);
                    assetOpExport.costCenterCode = item.roomFinal.code;
                    assetOpExport.costCenterName = item.locationFinal.code.substring(0, 4);
                    assetOpExport.quantity = item.asset.quantity;
                    assetOpExport.modifiedAt = item.modifiedAt;
                    items.push(assetOpExport);

                    this.requestOpHttpService.exportAssetOps(item.id).subscribe((data) => {
                    });
                });

                // console.log('Export Atlas', items);

                // alasql('SELECT  3 as [Property Type],[Asset Seq A], asset->invNo  as [Asset Seq No N],0 as [Asset Component], roomFinal->code as [Cost Center],[General Category],[Category],[Sub Category], SUBSTRING(locationFinal->code, 1, 4) as [Branch], asset->quantity as [Quantity] INTO XLSX('nota_transfer.xlsx',?) FROM ?   WHERE DATE(modifiedAt) > DATE('' +
                // alasql('SELECT 3 as [Property Type], ' ' as [Asset Seq A], assetinvNo1 as [Asset Seq No N], assetinvNo2 as [Asset Component], costCenterCode as [Cost Center], [General Category], [Category], [Sub Category], costCenterName as [Branch], quantity as [Quantity] INTO XLSX('nota_transfer.xlsx',?) FROM ?   ' ,
                  //               [ options, items ]);

                this.refreshAssetOperations();

    // console.log(JSON.stringify(assetInvDetails.items));

    // let alaData: Array<any> = new Array<any>();
    // assetInvDetails.items.forEach((item: any) => {
    //     let alaItem: any = {};
    //     alaItem.costCenterName = item.costCenterFinal.name;
    //     alaData.push(alaItem);
    // })

    // alasql('SELECT [costCenterName] as [Cost Center] INTO XLSX('template Transfer1.xlsx',?) FROM ?'
    //                         , [ options, alaData ]);

            });
    }

    public assetOpListExportOtp() {

        let params: Array<Param> = this.getFilters();
        let items: Array<AssetOpExportOtp> = new Array<AssetOpExportOtp>();

        this.requestOpHttpService.get(1, 1000000, 'modifiedAt', 'desc', params, null, 'details').subscribe(
            (result: PagedResult<any>) => {

                // console.log(result.items);

                let options = {
                    sheetid: 'Transferuri',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                result.items.forEach((item: any) => {
                    let assetOpExport: AssetOpExportOtp = new AssetOpExportOtp();

                    assetOpExport.documentType = item.documentType.name;
                    assetOpExport.assetName = item.asset.name;
                    assetOpExport.assetinvNo = item.asset.invNo;
                    assetOpExport.quantity = item.asset.quantity;
                    assetOpExport.assetValueInv = item.asset.valueInv;
                    assetOpExport.costCenterCodeInitial = item.roomInitial.code;
                    assetOpExport.costCenterNameInitial = item.roomInitial.name;
                    assetOpExport.costCenterCodeFinal = item.roomFinal.code;
                    assetOpExport.costCenterNameFinal = item.roomFinal.name;
                    items.push(assetOpExport);

                    this.requestOpHttpService.exportAssetOps(item.id).subscribe((data) => {
                    });
                });

                // alasql(`SELECT
                //                 documentType as [Tip Operatie],
                //                 assetName as [Denumirea mijlocului fix si caracteristici tehnice],
                //                 assetinvNo as [Numarul de inventar],
                //                 CAST([quantity] AS NUMBER) as [Buc.],
                //                 CAST([assetValueInv] AS NUMBER) as [Valoarea de inventar],
                //                 costCenterCodeInitial as [Cod Centru de cost predator],
                //                 costCenterNameInitial as [Denumire centru de cost predator],
                //                 costCenterCodeFinal as [Cod Centru de cost primitor],
                //                 costCenterNameFinal as [Centru de cost primitor]
                //                 INTO XLSX('Transferuri.xlsx',?) FROM ?   ` ,
                //                  [ options, items ]);

                this.refreshAssetOperations();

    // console.log(JSON.stringify(assetInvDetails.items));

    // let alaData: Array<any> = new Array<any>();
    // assetInvDetails.items.forEach((item: any) => {
    //     let alaItem: any = {};
    //     alaItem.costCenterName = item.costCenterFinal.name;
    //     alaData.push(alaItem);
    // })

    // alasql('SELECT [costCenterName] as [Cost Center] INTO XLSX('template Transfer1.xlsx',?) FROM ?'
    //                         , [ options, alaData ]);

            });
    }


    public openMail(){
        // var atach= '';
        // document.querySelector('#openMail').addEventListener('change', function(){
        //     var reader = new FileReader();
        //     reader.onload = function(){
        //         var arrayBuffer = this.result;
        //       console.log('BUFFER: ',arrayBuffer);
        //         document.querySelector('#openMail').innerHTML = arrayBuffer + '  '+arrayBuffer.byteLength;
        //         }
        //     this.atach= reader.readAsArrayBuffer(this.files[0]);
        //   }, false);

          var subject = 'Transferuri pentru confirmare';
          var message='';
          var message1 = 'Va rugam sa deschideti fisierul atasat.';
          var message2 = 'Verificati daca ati receptionat toate obiectele trimise si confirmati cu DA / NU.';
          var message3 = ' Salvati fisierul si trimiteti forward catre mijloacefixe@piraeusbank.ro';
          var attach='D:\\demo.xslx';
          // window.open('mailto:someone@somewhere.com?Subject=hello?Body='+ atach,'email');
          if(confirm('Esti sigur ca vrei sa trimiti mail cu operatiile selectate?')) {
        let params: Array<Param> = this.getFilters();
        let items: Array<AssetOpConfirm> = new Array<AssetOpConfirm>();
        console.log(params);
        this.requestOpHttpService.get(1, 1000000, 'modifiedAt', 'desc', params, null, 'details').subscribe(
            (result: PagedResult<any>) => {

                let options = {
                    sheetid: 'aviz_transfer',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                let index: number = 0;
                result.items.forEach((item: any) => {
                    let assetOpConfirm: AssetOpConfirm = new AssetOpConfirm();
                    index++;
                    assetOpConfirm.index = index;
                    assetOpConfirm.assetOpId = item.id;
                    assetOpConfirm.invNo = item.asset.invNo;
                    assetOpConfirm.assetName = item.asset.name;
                    assetOpConfirm.roomCodeIni = item.roomInitial.code;
                    assetOpConfirm.locationCodeIni = item.locationInitial.name;
                    assetOpConfirm.roomCodeFin = item.roomFinal.code;
                    assetOpConfirm.locationCodeFin = item.locationFinal.name;
                    assetOpConfirm.assetTypeName = item.assetType.name;
                    assetOpConfirm.purchaseDate = item.asset.purchaseDate;
                    assetOpConfirm.serialNumber = item.asset.serialNumber;
                    items.push(assetOpConfirm);
                });

                // alasql('SELECT id as [Nr. Crt], asset->invNo  as [Numar inventar plecare], asset->name  as [Denumire], roomInitial->code as [Centru de cost plecare], locationInitial->name as [Cladire plecare], roomFinal->code as [Centru de cost destinatie], locationFinal->name as [Cladire destinatie], [Confirmat], [Numar inventar primit] INTO XLSX('aviz_transfer.xlsx',?) FROM ?   WHERE DATE(modifiedAt) > DATE('' +
                //                 this.transferStartDate + '') AND DATE(modifiedAt) < DATE(''
                //             + this.transferEndDate + '')'
                //             , [ options, assetOp.items ]);
                // alasql('SELECT [index] as [Nr. Crt], assetOpId as [OptimaId],  invNo  as [Numar inventar plecare], assetName  as [Denumire], roomCodeIni as [Centru de cost plecare], locationCodeIni as [Cladire plecare], roomCodeFin as [Centru de cost destinatie], locationCodeFin as [Cladire destinatie], [Confirmat], [Numar inventar primit] INTO XLSX('aviz_transfer.xlsx',?) FROM ? ',
                //     [ options, items ]);
                //setTimeout(5000);
              //  this.assetOpHttpService.downloadMailOps(items).subscribe((data) => {  // PIRAEUS
                this.requestOpHttpService.downloadMailOpsBnr(items).subscribe((data) => {  // BNR
                    });
                  //  setTimeout(5000);
                    this.requestOpHttpService
                  //  .download()  PIRAEUS
                    .downloadBnr() // BNR
                    .subscribe((blob) => {
                        // this.downloadFinished.emit(null);
                        // console.log(JSON.stringify(res));
                        // console.log('download finished!');
                        //this.downloadFile(res);
                        fileSaveAs(blob);
                    });
            });

            location.href = 'mailto:?subject=' + subject+'&body='+message1
            + '%0D%0A' + message2 + '%0D%0A' + message3 + '&Attached=' + attach;
        }

    }

    public sendMail(): void{
          if(confirm('Esti sigur ca vrei sa exporti cu operatiile selectate?')) {
            console.log(this.selectedLocations);
            let locationId: number = this.selectedLocations.length > 0 ? this.selectedLocations[0].id : null;
             locationId == null ? locationId = 0 : locationId;
                let url = `${AppConfig.reportingServer}Report.aspx/?report=assetoperations&locationId=${locationId}&reportType=ASSETOPERATIONS`;
                 window.open(url);
        }
    }

    public assetOpListConfirm() {

        if(confirm('Esti sigur ca vrei sa trimiti mail cu operatiile selectate?')) {

        let params: Array<Param> = this.getFilters();
        let items: Array<AssetOpConfirm> = new Array<AssetOpConfirm>();
        console.log(params);
        this.requestOpHttpService.get(1, 1000000, 'modifiedAt', 'desc', params, null, 'details').subscribe(
            (result: PagedResult<any>) => {

                let options = {
                    sheetid: 'aviz_transfer',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                let index: number = 0;
                result.items.forEach((item: any) => {
                    let assetOpConfirm: AssetOpConfirm = new AssetOpConfirm();
                    index++;
                    assetOpConfirm.index = index;
                    assetOpConfirm.assetOpId = item.id;
                    assetOpConfirm.invNo = item.asset.invNo;
                    assetOpConfirm.assetName = item.asset.name;
                    assetOpConfirm.roomCodeIni = item.roomInitial.code;
                    assetOpConfirm.locationCodeIni = item.locationInitial.name;
                    assetOpConfirm.roomCodeFin = item.roomFinal.code;
                    assetOpConfirm.locationCodeFin = item.locationFinal.name;
                    assetOpConfirm.assetTypeName = item.assetType.name;
                    assetOpConfirm.purchaseDate = item.asset.purchaseDate;
                    assetOpConfirm.serialNumber = item.asset.serialNumber;
                    assetOpConfirm.quantity = item.asset.quantity;
                    assetOpConfirm.valueInv = item.asset.valueInv;
                    assetOpConfirm.employeeInternalCodeInitial = item.employeeInitial.internalCode;
                    assetOpConfirm.employeeInternalCodeFinal = item.employeeFinal.internalCode;
                    assetOpConfirm.employeeFirstNameInitial = item.employeeInitial.firstName;
                    assetOpConfirm.employeeFirstNameFinal = item.employeeFinal.firstName;
                    assetOpConfirm.employeeLastNameInitial = item.employeeInitial.lastName;
                    assetOpConfirm.employeeLastNameFinal = item.employeeFinal.lastName;
                    items.push(assetOpConfirm);
                });

                // alasql('SELECT id as [Nr. Crt], asset->invNo  as [Numar inventar plecare], asset->name  as [Denumire], roomInitial->code as [Centru de cost plecare], locationInitial->name as [Cladire plecare], roomFinal->code as [Centru de cost destinatie], locationFinal->name as [Cladire destinatie], [Confirmat], [Numar inventar primit] INTO XLSX('aviz_transfer.xlsx',?) FROM ?   WHERE DATE(modifiedAt) > DATE('' +
                //                 this.transferStartDate + '') AND DATE(modifiedAt) < DATE(''
                //             + this.transferEndDate + '')'
                //             , [ options, assetOp.items ]);
                // alasql('SELECT [index] as [Nr. Crt], assetOpId as [OptimaId],  invNo  as [Numar inventar plecare], assetName  as [Denumire], roomCodeIni as [Centru de cost plecare], locationCodeIni as [Cladire plecare], roomCodeFin as [Centru de cost destinatie], locationCodeFin as [Cladire destinatie], [Confirmat], [Numar inventar primit] INTO XLSX('aviz_transfer.xlsx',?) FROM ? ',
                //     [ options, items ]);

               //     this.assetOpHttpService.sendEmail(items).subscribe((data) => {  // PIRAEUS
                    // this.assetOpHttpService.sendEmailBnr(items).subscribe((data) => {  // BNR
                    this.requestOpHttpService.sendEmailPiraeus(items).subscribe((data) => {  // PIRAEUS

                        });


            });

        }
    }

    public loadFile(ev) {
        this.fileEvent = ev;
    }

    public doImport() {

        if (this.importIndex < this.importLines.length) {
            if (this.importLines[this.importIndex].assetOpId < 1) return
            this.requestOpHttpService.upload(this.importLines[this.importIndex]).subscribe((data) => {
                this.importIndex = this.importIndex + 1;
                this.doImport();
            });
        }
        else {
            this.fileEvent = null;
            this.importDataModal.hide();
            this.importIndex = 0;
            this.importLines = new Array<AssetOpConf>();

            this.refreshAssetOperations();
        }
    }

    public importMailOperationData() {
                console.log('FILES: ', this.fileEvent);
                if (this.fileEvent === null) return;
                // alasql.promise(`select
                //                         [OptimaId] as AssetOpId,
                //                         [Numar inventar plecare] as InvNo,
                //                         [Denumire] as Name,
                //                         [Centru de cost plecare] as CostCenterCodeInitial,
                //                         [Cladire plecare] as CostCenterNameInitial,
                //                         [Centru de cost destinatie] as CostCenterCodeFinal,
                //                         [Cladire destinatie] as CostCenterNameFinal,
                //                         [Confirmat] as Confirm

                //                     from FILE (?,  {headers: true})`, [this.fileEvent])

            //     alasql.promise(`select
            //                             [OptimaId] as AssetOpId,
            //                             [Inventory Number (Barcode if implemented)] as InvNo,
            //                             [Inventory Item ] as Name,
            //                             [Old cost center] as CostCenterCodeInitial,
            //                             [Old User] as CostCenterNameInitial,
            //                             [New cost center] as CostCenterCodeFinal,
            //                             [New User] as CostCenterNameFinal,
            //                             [Confirm] as Confirm

            // from FILE (?,  {headers: true})`, [this.fileEvent])
            //     .then((importLines: Array<AssetOpConf>) => {

            //             this.importDataModal.show();

            //             this.importIndex = 0;
            //             this.importLines = importLines;

            //             this.doImport();
            //     });

            }

        public upload() {
            let fi = this.fileInput.nativeElement;
            if (fi.files && fi.files[0]) {
                let fileToUpload = fi.files[0];
                this.requestOpHttpService
                    .import(fileToUpload)
                    .subscribe(res => {
                        this.uploadFinished.emit(null);
                    });
            }
        }


    public trackByCode(index: number, tableItem: any): string {
                return tableItem.code;
        }

    // public exportTransfersCategToExcel() {

    //     let params: Array<Param> = this.getFilters();

    //     this.assetOpHttpService.get(1, 1000000, 'modifiedAt', 'desc', params, null, 'details').subscribe(
    //         (assetOp: PagedResult<any>) => {

    //                 console.log(JSON.stringify(assetOp));

    //             let options = {
    //                 sheetid: 'Template transf categorie',
    //                 headers: true,
    //                 column: { style: { Font: { Bold: '1' } } },
    //                 rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
    //                 cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
    //             };

    //             alasql('SELECT 3 as [Property Type],[Asset Seq A],asset->invNo  as [Asset Seq No N], 0 as [Asset Component], [Cost Center], 33 as [General Category], 2 as [Category], 1 as [Sub Category], [Branch], 1 as [Quantity] INTO XLSX('template Transfer2.xlsx',?) FROM ?   WHERE DATE(modifiedAt) > DATE('' +
    //                         this.transferStartDate + '') AND DATE(modifiedAt) < DATE(''
    //                         + this.transferEndDate + '')'
    //                         , [ options, assetOp.items ]);

    //         });
    // }
}

enum OperationType {
    NotSet = 1,
    ProcessAssetOp = 2
}
