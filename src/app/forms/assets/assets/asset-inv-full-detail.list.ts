// import { Component } from '@angular/core';
// import { AppData } from '../../../app-data';
// import { Param } from '../../../model/common/param';
// import { GenericTableList } from '../../generic/generic.table.list';

// @Component({
//     selector: 'app-asset-inv-full-detail-list',
//     templateUrl: '../../generic/generic.table.list.html'
// })
// export class AssetInvFullDetailListComponent extends GenericTableList<any, number> {

//     // public columns: Array<ColumnHeader> = [
//     //     { header: 'ASSET_INVNO', property: 'invNo', sortBy: 'Asset.InvNo' },
//     //     { header: 'ASSET_NAME', property: 'name', sortBy: 'Asset.Name' },
//     //     { header: 'ASSET_NAME', property: "employeeInitial.firstName", sortBy: 'CostCenterInitial.Name' }
//     // ];

//     // public c: Array<ColumnHeader> = new Array<ColumnHeader>() {
//     //     new ColumnHeader('ASSET_INVNO', 'invNo', 'Asset.InvNo'),
//     //     new ColumnHeader('ASSET_INVNO', 'invNo', 'Asset.InvNo')
//     // };

//     // public columns: Array<ColumnHeader> = new Array<ColumnHeader>();

//     constructor() {
//         super('asset.name', 'asc', 'inventory');

//         this.columns = AppData.ColumnDefinitions['INVENTORYASSET'];
//         // this.columns.push(new ColumnHeader('ASSET_INVNO', 'invNo', 'Asset.InvNo'));
//         // this.columns.push(new ColumnHeader('ASSET_NAME', 'name', 'Asset.Name'));
//         // this.columns.push(new ColumnHeader('ASSET_NAME', 'employeeInitial.firstName', 'EmployeeInitial.FirstName'));
//     }

//     public refresh(filters: Array<Param>) {
//         this.columns = AppData.ColumnDefinitions['INVENTORYASSET'];
//         super.refresh(filters);
//     }
// }

import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { Param } from '../../../model/common/param';
import { GenericPrimeNgDataTableList } from '../../generic/generic.prime-ng-data-table.list';
import { GenericTableList } from '../../generic/generic.table.list';

@Component({
    selector: 'app-asset-inv-full-detail-list',
    templateUrl: '../../generic/generic.table.list.html',
    styleUrls: ['./asset-inv-full-detail.list.scss']
})
 export class AssetInvFullDetailListComponent extends GenericTableList<any, number> {
// export class AssetInvFullDetailListComponent extends GenericPrimeNgDataTableList<any,number> {
    public columns: any = [];


    constructor() {
        super('asset.name', 'asc', 'inventory');

        this.columns = AppData.ColumnDefinitions['INVENTORYASSET'];
        this.initializeTable();

        // this.columns = [
        //     { field: 'asset.invNo', header: 'Nr. inv', width: '5%', textAlign: 'center' },
        //     { field: 'asset.name', header: 'Descriere', width: '15%', textAlign: 'center' },
        //     // { field: 'item.serialNumber', header: 'Serie', width: '5%', textAlign: 'center' },
        //     // { field: 'item.purchaseDate', header: 'Data achizitie', width: '6%', textAlign: 'center' },
        //     // { field: 'item.sN', header: 'Serie initial', width: '3%', textAlign: 'center' },
        //     // { field: 'item.sN', header: '', width: '3%', textAlign: 'center' },
        //     // { field: 'item.locationCodeIni', header: '', width: '5%', textAlign: 'center' },
        //     // { field: 'item.locationCodeIni', header: '', width: '5%', textAlign: 'center' },
        //     // { field: 'item.locationNameIni', header: '', width: '4%', textAlign: 'center' },
        //     // { field: 'item.roomNameIni', header: '', width: '4%', textAlign: 'center' },
        //     // { field: 'item.internalCodeIni', header: '', width: '5%', textAlign: 'center' },
        //     // { field: 'item.firstNameIni', header: '', width: '15%', textAlign: 'center' },
        //     // { field: 'item.valueInv item.firstNameIni', header: '', width: '2%', textAlign: 'center' },
        //     // { field: 'item.sN', header: '', width: '2%', textAlign: 'center' },
        //     // { field: 'item.qIntial', header: '', width: '2%', textAlign: 'center' },
        //     // { field: 'item.uom', header: '', width: '2%', textAlign: 'center' },
        //     // { field: 'item.sN', header: '', width: '2%', textAlign: 'center' },
        //     // { field: 'item.locationCodeFin', header: '', width: '4%', textAlign: 'center' },
        //     // { field: 'item.locationCodeFin', header: '', width: '4%', textAlign: 'center' },
        //     // { field: 'item.locationNameFin', header: '', width: '4%', textAlign: 'center' },
        //     // { field: 'item.roomNameFin', header: '', width: '4%', textAlign: 'center' },
        //     // { field: 'item.internalCodeFin', header: '', width: '4%', textAlign: 'center' },
        //     // { field: 'item.firstNameFin', header: '', width: '5%', textAlign: 'center' }
        // ];

        // translate.get('ASSET_INVNO').subscribe((res: string) => { this.columns[0].header = res; });
        // translate.get('ASSET_NAME').subscribe((res: string) => { this.columns[1].header = res; });
        // translate.get('ASSET_SERIALNUMBER').subscribe((res: string) => { this.columns[2].header = res; });
        // translate.get('ASSET_PURCHASEDATE').subscribe((res: string) => { this.columns[3].header = res; });
        // translate.get('ASSET_FIND').subscribe((res: string) => { this.columns[4].header = res; });
        // translate.get('ASSET_PLUS').subscribe((res: string) => { this.columns[5].header = res; });
        // translate.get('ASSET_LOCATIONCODEINI').subscribe((res: string) => { this.columns[6].header = res; });
        // translate.get('ASSET_COSTCENTERINI').subscribe((res: string) => { this.columns[7].header = res; });
        // translate.get('ASSET_LOCATIONAMEINI').subscribe((res: string) => { this.columns[8].header = res; });
        // translate.get('ASSET_ROOMNAMEINI').subscribe((res: string) => { this.columns[9].header = res; });
        // translate.get('ASSET_INTERNALCODEINI').subscribe((res: string) => { this.columns[10].header = res; });
        // translate.get('ASSET_FIRSTNAMEINI').subscribe((res: string) => { this.columns[11].header = res; });
        // translate.get('ASSET_VALUEINV').subscribe((res: string) => { this.columns[12].header = res; });
        // translate.get('ASSET_CASSATION').subscribe((res: string) => { this.columns[13].header = res; });
        // translate.get('ASSET_QUANTITY_INITIAL').subscribe((res: string) => { this.columns[14].header = res; });
        // translate.get('ASSET_UOM').subscribe((res: string) => { this.columns[15].header = res; });
        // translate.get('ASSET_CUSTODY').subscribe((res: string) => { this.columns[16].header = res; });
        // translate.get('ASSET_LOCATIONCODEFIN').subscribe((res: string) => { this.columns[17].header = res; });
        // translate.get('ASSET_COSTCENTERFIN').subscribe((res: string) => { this.columns[18].header = res; });
        // translate.get('ASSET_LOCATIONAMEFIN').subscribe((res: string) => { this.columns[19].header = res; });
        // translate.get('ASSET_ROOMNAMEFIN').subscribe((res: string) => { this.columns[20].header = res; });
        // translate.get('INTERNALCODEFIN').subscribe((res: string) => { this.columns[21].header = res; });
        // translate.get('ASSET_FIRSTNAMEFIN').subscribe((res: string) => { this.columns[22].header = res; });
    }

    public refresh(filters: Array<Param>) {
                this.columns = AppData.ColumnDefinitions['INVENTORYASSET'];
                this.initializeTable();
                super.refresh(filters);
    }
}
