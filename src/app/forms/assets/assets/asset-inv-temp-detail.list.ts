import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';


@Component({
    selector: 'app-asset-inv-temp-detail-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class AssetInvTempDetailListComponent extends GenericTableList<any, number> {

    // public columns: Array<ColumnHeader> = [
    //     { header: 'ASSET_INVNO', property: 'invNo', sortBy: 'Asset.InvNo' },
    //     { header: 'ASSET_NAME', property: 'name', sortBy: 'Asset.Name' },
    //     { header: 'ASSET_NAME', property: 'employeeInitial.firstName', sortBy: 'CostCenterInitial.Name' }
    // ];

    // public c: Array<ColumnHeader> = new Array<ColumnHeader>() {
    //     new ColumnHeader('ASSET_INVNO', 'invNo', 'Asset.InvNo'),
    //     new ColumnHeader('ASSET_INVNO', 'invNo', 'Asset.InvNo')
    // };

    // public columns: Array<ColumnHeader> = new Array<ColumnHeader>();

    constructor() {
        super('asset.invNo', 'asc', 'temp');

        this.columns = AppData.ColumnDefinitions['INVENTORYTEMP'];
        this.initializeTable();
        // this.columns.push(new ColumnHeader('ASSET_INVNO', 'invNo', 'Asset.InvNo'));
        // this.columns.push(new ColumnHeader('ASSET_NAME', 'name', 'Asset.Name'));
        // this.columns.push(new ColumnHeader('ASSET_NAME', 'employeeInitial.firstName', 'EmployeeInitial.FirstName'));
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions['INVENTORYTEMP'];
        this.initializeTable();
        super.refresh(filters);
    }
}


// import { AssetInvFullDetail } from '../../../model/api/assets/asset-inv-full-detail';
// import { Component } from '@angular/core';
// import { GenericAgGridList } from '../../generic/generic.ag-grid.list';
// import { Param } from '../../../model/common/param';
// import { AppData } from '../../../app-data';


// @Component({
//     selector: 'asset-ag-grid-list',
//     templateUrl: '../../../forms/generic/generic.ag-grid.list.html',
//     styleUrls: ['asset-inv-temp-detail.list.scss']
// })
// export class AssetAgGridList extends GenericAgGridList<AssetInvFullDetail, number> {

//   public listTemplate: string = 'ASSETS';

//     constructor() {
//         super('asset.invNo', 'asc', 'stockhistory');

//         this.columnDefs = [
//             { field: 'invNo', headerName: 'Nr. inv.', width: 100, resizable: true },
//             { field: 'name', headerName: 'Denumire', width: 100, resizable: true },
//             { field: 'serialNumber', headerName: 'SN', width: 100, resizable: true },
//             { field: 'purchaseDate', headerName: 'Data ach.', width: 100 },
//             { field: 'sN', headerName: 'SN', width: 100 },
//             { field: 'sN', headerName: 'SN', width: 100 },
//             { field: 'locationCodeIni', headerName: 'Column 1', width: 100 },
//             { field: 'locationCodeIni', headerName: 'Column 1', width: 100 },
//             { field: 'locationNameIni', headerName: 'Column 1', width: 100 },
//             { field: 'roomNameIni', headerName: 'Column 1', width: 100 },
//             { field: 'internalCodeIni', headerName: 'Column 1', width: 100 },
//             { field: 'firstNameIni', headerName: 'Column 1', width: 100 },
//             { field: 'valueInv item.firstNameIni', headerName: 'Column 1', width: 100 },
//             { field: 'sN', headerName: 'Column 1', width: 100 },
//             { field: 'qIntial', headerName: 'Column 1', width: 100 },
//             { field: 'uom', headerName: 'Column 1', width: 100 },
//             { field: 'sN', headerName: 'Column 1', width: 100 },
//             { field: 'locationCodeFin', headerName: 'Column 1', width: 100 },
//             { field: 'locationCodeFin', headerName: 'Column 1', width: 100 },
//             { field: 'locationNameFin', headerName: 'Column 1', width: 100 },
//             { field: 'roomNameFin', headerName: 'Column 1', width: 100 },
//             { field: 'internalCodeFin', headerName: 'Column 1', width: 100 },
//             { field: 'firstNameFin', headerName: 'Column 1', width: 100 }
//         ];
//     }

//     public refresh(filters: Array<Param>) {
//       this.columns = AppData.ColumnDefinitions[this.listTemplate];
//       super.refresh(filters);
//   }
// }

// import { TranslateService } from '@ngx-translate/core';
// import { Component } from '@angular/core';

// import { AssetInvFullDetail } from '../../../model/api/assets/asset-inv-full-detail';
// import { GenericPrimeNgDataTableList } from 'app/forms/generic/generic.prime-ng-data-table.list';

// @Component({
//     selector: 'asset-inv-full-detail-list',
//     templateUrl: '../../../forms/generic/generic.prime-ng-data-table.list.html'
// })
// export class AssetInvFullDetailList extends GenericPrimeNgDataTableList<AssetInvFullDetail> {
//     public columns: any = [];

//     constructor(public translate: TranslateService) {
//         super('name', 'asc', 'inventory');

//         this.columns = [
//             { field: 'item.invNo', header: '', width: '5%', textAlign: 'center' },
//             { field: 'item.name', header: '', width: '15%', textAlign: 'center' },
//             { field: 'item.serialNumber', header: '', width: '5%', textAlign: 'center' },
//             { field: 'item.purchaseDate', header: '', width: '6%', textAlign: 'center' },
//             { field: 'item.sN', header: '', width: '3%', textAlign: 'center' },
//             { field: 'item.sN', header: '', width: '3%', textAlign: 'center' },
//             { field: 'item.locationCodeIni', header: '', width: '5%', textAlign: 'center' },
//             { field: 'item.locationCodeIni', header: '', width: '5%', textAlign: 'center' },
//             { field: 'item.locationNameIni', header: '', width: '4%', textAlign: 'center' },
//             { field: 'item.roomNameIni', header: '', width: '4%', textAlign: 'center' },
//             { field: 'item.internalCodeIni', header: '', width: '5%', textAlign: 'center' },
//             { field: 'item.firstNameIni', header: '', width: '15%', textAlign: 'center' },
//             { field: 'item.valueInv item.firstNameIni', header: '', width: '2%', textAlign: 'center' },
//             { field: 'item.sN', header: '', width: '2%', textAlign: 'center' },
//             { field: 'item.qIntial', header: '', width: '2%', textAlign: 'center' },
//             { field: 'item.uom', header: '', width: '2%', textAlign: 'center' },
//             { field: 'item.sN', header: '', width: '2%', textAlign: 'center' },
//             { field: 'item.locationCodeFin', header: '', width: '4%', textAlign: 'center' },
//             { field: 'item.locationCodeFin', header: '', width: '4%', textAlign: 'center' },
//             { field: 'item.locationNameFin', header: '', width: '4%', textAlign: 'center' },
//             { field: 'item.roomNameFin', header: '', width: '4%', textAlign: 'center' },
//             { field: 'item.internalCodeFin', header: '', width: '4%', textAlign: 'center' },
//             { field: 'item.firstNameFin', header: '', width: '5%', textAlign: 'center' }
//         ];

//         translate.get('ASSET_INVNO').subscribe((res: string) => { this.columns[0].header = res; });
//         translate.get('ASSET_NAME').subscribe((res: string) => { this.columns[1].header = res; });
//         translate.get('ASSET_SERIALNUMBER').subscribe((res: string) => { this.columns[2].header = res; });
//         translate.get('ASSET_PURCHASEDATE').subscribe((res: string) => { this.columns[3].header = res; });
//         translate.get('ASSET_FIND').subscribe((res: string) => { this.columns[4].header = res; });
//         translate.get('ASSET_PLUS').subscribe((res: string) => { this.columns[5].header = res; });
//         translate.get('ASSET_LOCATIONCODEINI').subscribe((res: string) => { this.columns[6].header = res; });
//         translate.get('ASSET_COSTCENTERINI').subscribe((res: string) => { this.columns[7].header = res; });
//         translate.get('ASSET_LOCATIONAMEINI').subscribe((res: string) => { this.columns[8].header = res; });
//         translate.get('ASSET_ROOMNAMEINI').subscribe((res: string) => { this.columns[9].header = res; });
//         translate.get('ASSET_INTERNALCODEINI').subscribe((res: string) => { this.columns[10].header = res; });
//         translate.get('ASSET_FIRSTNAMEINI').subscribe((res: string) => { this.columns[11].header = res; });
//         translate.get('ASSET_VALUEINV').subscribe((res: string) => { this.columns[12].header = res; });
//         translate.get('ASSET_CASSATION').subscribe((res: string) => { this.columns[13].header = res; });
//         translate.get('ASSET_QUANTITY_INITIAL').subscribe((res: string) => { this.columns[14].header = res; });
//         translate.get('ASSET_UOM').subscribe((res: string) => { this.columns[15].header = res; });
//         translate.get('ASSET_CUSTODY').subscribe((res: string) => { this.columns[16].header = res; });
//         translate.get('ASSET_LOCATIONCODEFIN').subscribe((res: string) => { this.columns[17].header = res; });
//         translate.get('ASSET_COSTCENTERFIN').subscribe((res: string) => { this.columns[18].header = res; });
//         translate.get('ASSET_LOCATIONAMEFIN').subscribe((res: string) => { this.columns[19].header = res; });
//         translate.get('ASSET_ROOMNAMEFIN').subscribe((res: string) => { this.columns[20].header = res; });
//         translate.get('INTERNALCODEFIN').subscribe((res: string) => { this.columns[21].header = res; });
//         translate.get('ASSET_FIRSTNAMEFIN').subscribe((res: string) => { this.columns[22].header = res; });
//     }
// }
