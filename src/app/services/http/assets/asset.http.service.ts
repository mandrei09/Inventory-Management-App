import { Param } from './../../../model/common/param';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericHttpService } from '../generic.http.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppConfig } from '../../../config';
import { map } from 'rxjs/operators';
import { AssetTempRecoSave } from '../../../model/api/assets/asset-temp-reco-save';
import { AssetImportV2 } from '../../../model/common/import/asset-import-v2';
import { AssetImportV1 } from '../../../model/common/import/asset-import-v1';
import { AssetSave } from '../../../model/api/assets/asset-save';
import { AssetTransferAdd } from '../../../model/api/assets/asset-transfer-add';
import { EmployeeValidate } from '../../../model/common/import/employee-validate';
import { ImportThales } from '../../../model/common/import/import-thales';
import { AddAsset } from '../../../model/api/assets/add-asset';
import { AddStockAsset } from '../../../model/api/assets/add-stock-asset';
import { AssetChange } from '../../../model/api/assets/asset-change';
import { AssetAcquizition } from '../../../model/api/assets/asset-aquizition';
import { SaveAssetCloneTransfer, SaveAssetTransfer } from '../../../model/api/assets/asset-transfer';
import { SaveRetireAsset, SaveStornoAsset, SaveStornoAssetMFX } from '../../../model/api/assets/asset-out';
import { AssetEmployeeSave } from '../../../model/api/assets/asset-employee-save';
import { CreateAssetSAPResult } from '../../../model/api/result/create-asset-SAP-result';
import { NotifyService } from '../../notify.service';
import { SaveAssetInvMinus } from '../../../model/api/assets/asset-minus-inventory-sap';
import { SaveAssetInvPlus } from '../../../model/api/assets/asset-plus-inventory-sap';
import { UpdateAssetInvPlus } from '../../../model/api/assets/update-asset-inv-plus';
import { AddAssetInvPlus } from '../../../model/api/assets/add-asset-inv-plus';
import { AssetResult } from '../../../model/api/result/asset-result';
import { SaveAssetAcquisitionStorno } from '../../../model/api/assets/asset-acquisition-storno';
import { AssetEditChange } from '../../../model/api/assets/asset-edit-change';
import { AssetClone } from '../../../model/api/assets/asset-clone';
import { ImportITMFX } from '../../../model/common/import/import-it-mfx';
import { ImprotITMFXResult } from '../../../model/api/result/import-it-mfx-result';
import { ImportPrintLabel } from '../../../model/common/import/import-print-label';
import { ImportPrintResult } from '../../../model/api/result/import-print-result';
import { AppendixResult } from '../../../model/api/result/appendix-result';
import { WFHResult } from '../../../model/api/result/wfh-result';
import { UpdateAssetSAPResult } from '../../../model/api/result/update-asset-SAP-result';
// import { AuthHttp } from 'angular2-jwt';
import { RequestBudgetForecastMaterialCostCenterStorno } from '../../../model/api/requests/request-budget-forecast-material-cost-center-storno';
import { RequestResult } from '../../../model/api/result/request-result';
import { AssetPreAcquisition} from '../../../model/api/assets/asset-pre-aquisition';
import { RejectResult } from '../../../model/api/result/reject-result';
import { AssetMultipleDelete } from '../../../model/api/assets/asset-multipledelete';
import { AssetSapValidationSave } from '../../../model/api/assets/asset-sap-validation';

@Injectable()
export class AssetHttpService extends GenericHttpService<any, number> {
    constructor(public http: HttpClient, public notify: NotifyService) {
        super(http, '', 'assets');
    }

    getDetailById(id: number): Observable<any> {
        return this.http.get(AppConfig.urlPrefix + this.url + `/detail/${id}`).pipe(
            map((data: Response) => {
                // console.log(JSON.stringify(data));
                return data;
            }));
    }

    addNewAsset(item: AssetSave): Observable<any> {
        const url: string = AppConfig.urlPrefix + this.url + '/detail';

        return this.http.post(url, item, { headers: this.headers }).pipe(
            map((data) => {
                return data;
            }));
    }

    cloneAsset(item: AssetClone): Observable<any> {
        const url: string = AppConfig.urlPrefix + this.url + '/clone';

        return this.http.post(url, item, { headers: this.headers }).pipe(
            map((data) => {
                return data;
            }));
    }

    addAsset(item: AddAsset): Observable<CreateAssetSAPResult> {

        const url: string = AppConfig.urlPrefix + this.url + '/add';

        return this.http.post(url, item, { headers: this.headers }).pipe(
            map((data: CreateAssetSAPResult) => {
                return data;
            }));
    }

    addAssetInvPlus(item: AddAssetInvPlus): Observable<CreateAssetSAPResult> {

        const url: string = AppConfig.urlPrefix + this.url + '/addAssetInvPlus';

        return this.http.post(url, item, { headers: this.headers }).pipe(
            map((data: CreateAssetSAPResult) => {
                return data;
            }));
    }

    addAssetStock(item: AddStockAsset): Observable<CreateAssetSAPResult> {
        const url: string = AppConfig.urlPrefix + this.url + '/addStock';

        return this.http.post(url, item, { headers: this.headers }).pipe(
            map((data: CreateAssetSAPResult) => {
                return data;
            }));
    }

    updateAsset(item: AssetSave): Observable<any> {
        const url: string = AppConfig.urlPrefix + this.url + '/detail';
        return this.http.put(url, item, { headers: this.headers });
    }

    updateAssetSapValidation(item: AssetSapValidationSave): Observable<any> {
        const url: string = AppConfig.urlPrefix + this.url + '/assetSapValidation';
        return this.http.put(url, item, { headers: this.headers });
    }

    updateAcquisition(item: AssetAcquizition): Observable<UpdateAssetSAPResult> {
        const url: string = AppConfig.urlPrefix + this.url + '/updateAcquisition';
        return this.http.post(url, item, { headers: this.headers }).pipe(
          map((data: UpdateAssetSAPResult) => {
              return data;
          }));
    }


    updateAssetChange(item: AssetEditChange): Observable<CreateAssetSAPResult> {
        const url: string = AppConfig.urlPrefix + this.url + '/updateAssetChange';
        return this.http.post(url, item, { headers: this.headers }).pipe(
            map((data: CreateAssetSAPResult) => {
                return data;
            }));
    }


    validateAsset(item: AssetChange): Observable<any> {
        const url: string = AppConfig.urlPrefix + this.url + '/validate';
        return this.http.post(url, item, { headers: this.headers });
    }

    acquizitionAsset(item: AssetAcquizition): Observable<CreateAssetSAPResult> {
        const url: string = AppConfig.urlPrefix + this.url + '/acquisition';
        return this.http.post(url, item, { headers: this.headers }).pipe(
            map((data: CreateAssetSAPResult) => {
                return data;
            }));
    }

    validateAcquizitionAsset(item: AssetAcquizition): Observable<CreateAssetSAPResult> {
      const url: string = AppConfig.urlPrefix + this.url + '/validateacquisition';
      return this.http.post(url, item, { headers: this.headers }).pipe(
          map((data: CreateAssetSAPResult) => {
              return data;
          }));
  }

    updateAssetInvPlus(item: UpdateAssetInvPlus): Observable<CreateAssetSAPResult> {
        const url: string = AppConfig.urlPrefix + this.url + '/updateassetInvPlus';
        return this.http.post(url, item, { headers: this.headers }).pipe(
            map((data: CreateAssetSAPResult) => {
                return data;
            }));
    }

    newTransferAsset(item: SaveAssetTransfer): Observable<CreateAssetSAPResult> {
        const url: string = AppConfig.urlPrefix + this.url + '/newTransferAsset';
        return this.http.post(url, item, { headers: this.headers }).pipe(
            map((data: CreateAssetSAPResult) => {
                return data;
            }));
    }

    newTransferCloneAsset(item: SaveAssetCloneTransfer): Observable<CreateAssetSAPResult> {
        const url: string = AppConfig.urlPrefix + this.url + '/newTransferCloneAsset';
        return this.http.post(url, item, { headers: this.headers }).pipe(
            map((data: CreateAssetSAPResult) => {
                return data;
            }));
    }

    newRetireAsset(item: SaveRetireAsset): Observable<CreateAssetSAPResult> {
        const url: string = AppConfig.urlPrefix + this.url + '/newRetireAsset';
        return this.http.post(url, item, { headers: this.headers }).pipe(
            map((data: CreateAssetSAPResult) => {
                return data;
            }));
    }

    newStornoAsset(item: SaveStornoAsset): Observable<CreateAssetSAPResult> {
        const url: string = AppConfig.urlPrefix + this.url + '/newStornoAsset';
        return this.http.post(url, item, { headers: this.headers }).pipe(
            map((data: CreateAssetSAPResult) => {
                return data;
            }));
    }

    newStornoAssetMFX(item: SaveStornoAssetMFX): Observable<CreateAssetSAPResult> {
      const url: string = AppConfig.urlPrefix + this.url + '/newStornoAssetMFX';
      return this.http.post(url, item, { headers: this.headers }).pipe(
          map((data: CreateAssetSAPResult) => {
              return data;
          }));
  }

    newAssetAcquisitionStorno(item: SaveAssetAcquisitionStorno): Observable<CreateAssetSAPResult> {
        const url: string = AppConfig.urlPrefix + this.url + '/newAssetAcquisitionStorno';
        return this.http.post(url, item, { headers: this.headers }).pipe(
            map((data: CreateAssetSAPResult) => {
                return data;
            }));
    }

    newAssetInvMinus(item: SaveAssetInvMinus): Observable<any> {
        const url: string = AppConfig.urlPrefix + this.url + '/newAssetInvMinus';
        return this.http.post(url, item, { headers: this.headers }).pipe(
            map((data) => {
                return data;
            }));
    }

    newAssetInvPlus(item: SaveAssetInvPlus): Observable<any> {
        const url: string = AppConfig.urlPrefix + this.url + '/newAssetInvPlus';
        return this.http.post(url, item, { headers: this.headers }).pipe(
            map((data) => {
                return data;
            }));
    }

    public uploadV1(item: AssetImportV1): Observable<any> {
        console.log(JSON.stringify(item));
        return this.http.post(AppConfig.urlPrefix + this.url + '/importv1',
            JSON.stringify(item), { headers: this.headers }).pipe(
            map((data) => {
                return data;
            }));
    }
    public uploadV2(item: AssetImportV2): Observable<any> {
        return this.http.post(AppConfig.urlPrefix + this.url + '/importv2',
            JSON.stringify(item), { headers: this.headers }).pipe(
            map((data) => {
                return data;
            }));
    }

    public uploadThales(item: ImportThales): Observable<any> {
        return this.http.post(AppConfig.urlPrefix + this.url + '/importthales',
            JSON.stringify(item)).pipe(
            map((data) => {
                return data;
            }));
    }

  public deleteAssetOp(assetId: number, inventoryId: number ): Observable<any> {
    console.log(AppConfig.urlPrefix + this.url + `/${assetId}`, inventoryId);
    return this.http.delete(AppConfig.urlPrefix + this.url + '/deleteAssetOp' + `/${assetId}, ${inventoryId}`);
}

public exportIn(params: Array<Param>) {
    let searchParams: HttpParams = null;
    let url = AppConfig.urlPrefix + this.url + '/exportIn';

    searchParams = this.getSearchParams(params);
    return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                    map(res => res));
}

public exportOtp(params: Array<Param>) {
    let searchParams: HttpParams = null;
    let url = AppConfig.urlPrefix + this.url + '/exportOtp';

    searchParams = this.getSearchParams(params);
    return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                    map(res => res));
}

public exportOut(params: Array<Param>) {
    let searchParams: HttpParams = null;
    let url = AppConfig.urlPrefix + this.url + '/exportOut';

    searchParams = this.getSearchParams(params);
    return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                    map(res => res));
}

public getFarTemplate() {
    let url = AppConfig.urlPrefix + this.url + '/templateImportEmag';
    return this.http.get(url, {observe: 'response', responseType: 'blob' }).pipe(
                    map(res => res));
}

public import(file: any) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(AppConfig.urlPrefix + this.url + '/upload', formData);
}

public importCassation(file: any) {
    // let input = new FormData();
    // input.append('file', file);
    // this.progressBarService.startTracking().subscribe(progress => console.log(progress));
    // return this.http
    //     .post(AppConfig.urlPrefix + this.url + '/uploadCassation', input);
}

public importInventory(file: any) {
    // let input = new FormData();
    // input.append('file', file);
    // this.progressBarService.startTracking().subscribe(progress => console.log(progress));
    // return this.http
    //     .post(AppConfig.urlPrefix + this.url + '/uploadInv', input);
}

public importEmployeeTransferITMFX(item: ImportITMFX): Observable<ImprotITMFXResult> {
  return this.http.post(AppConfig.urlPrefix + this.url + '/importITMFX', item).pipe(
      map((data: ImprotITMFXResult) => {
          return data;
      }));
}

public exportApaNova(inventoryId: number, locationId: number) {
    let searchParams: HttpParams = null;
 //   let url = AppConfig.urlPrefix + 'reporting/exportMegaImage&inventoryId=${inventoryId}&locationId=${locationId}';
    let url = `${AppConfig.urlPrefix}reporting/locationdownload/${locationId}`;

    searchParams = this.getSearchParams(null);
    return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                    map(res => res));
}

public deleteAsset(assetId: number): Observable<any> {
    return this.http.post(AppConfig.urlPrefix + this.url + '/deleteAsset/', assetId, { headers: this.headers }).pipe(
    map((data: any) => {
        return data;
    }));
}

public deleteMultipleAsset(assetId: AssetMultipleDelete): Observable<any> {
    // console.log(AppConfig.urlPrefix + this.url + '/deleteMultipleAsset/')
    return this.http.post(AppConfig.urlPrefix + this.url + '/deleteMultipleAsset/', assetId, { headers: this.headers }).pipe(
    map((data: any) => {
        return data;
    }));
}


public blockAsset(assetId: number): Observable<any> {
    return this.http.post(AppConfig.urlPrefix + this.url + '/blockAsset', assetId, { headers: this.headers }).pipe(
    map((data: any) => {
        return data;
    }));
}


public checkUniqueAsset(invNo: string) {
    return this.http.get(AppConfig.urlPrefix + this.url + '/checkUnique' + `/${invNo}`, { headers: this.headers }).pipe(
    map((data: Response) => {
        return data;
    }));
}

public checkUniqueSerialNumber(serialNumber: string) {
    return this.http.get(AppConfig.urlPrefix + this.url + '/checkUniqueSerialNumber' + `/${serialNumber}`, { headers: this.headers }).pipe(
    map((data: number) => {
        return data;
    }));
}

public checkUniqueDocument(document: string) {
    return this.http.get(AppConfig.urlPrefix + this.url + '/checkUniqueDocument' + `/${document}`, { headers: this.headers }).pipe(
    map((data: number) => {
        return data;
    }));
}

public checkUniqueDocumentAndPartner(document: string, partnerId: number, budgetManagerId: number) {
    return this.http.get(AppConfig.urlPrefix + this.url + '/checkUniqueDocumentByPartnerAndYear' + `/${document}` + `/${partnerId}` + `/${budgetManagerId}`, { headers: this.headers }).pipe(
    map((data: number) => {
        return data;
    }));
}


// public export(params: Array<Param>) {
//     let searchParams: HttpParams = null;
//     let url = AppConfig.urlPrefix + this.url + '/export';

//     searchParams = this.getSearchParams(params);
//     return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
//                     map(res => res))
// }

public exportThales(params: Array<Param>) {
    let searchParams: HttpParams = null;
    let url = AppConfig.urlPrefix + this.url + '/exportThales';

    searchParams = this.getSearchParams(params);
    return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                    map(res => res))
}

public exportPrereception(params: Array<Param>) {
    let searchParams: HttpParams = null;
    let url = AppConfig.urlPrefix + this.url + '/exportprereception';

    searchParams = this.getSearchParams(params);
    return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                    map(res => res))
}


public saveReco(reco: AssetTempRecoSave): Observable<any> {
    // return super.create(reco, 'reco')
    return this.http.post(AppConfig.urlPrefix + this.url + '/reco', reco, { headers: this.headers }).pipe(
    map((data: Response) => {
        return data;
    }));
}

public recoverAssetTemp(assetId: number, inventoryId: number): Observable<any> {
    return this.http.put(AppConfig.urlPrefix + this.url + '/recoverAssetTemp' +
     `/${assetId}/${inventoryId}`, {}).pipe(
     map((data: Response) => {
        return data;
    }));
}

public updatePrintDateLabel(assets: Array<any>) {
    return this.http
        .post(AppConfig.urlPrefix + this.url + '/uploadPrintDate', assets).pipe(
        map((data: any) => {
            return data;
        }));
}

public updateAssetName(assets: Array<any>) {
    return this.http
        .post(AppConfig.urlPrefix + this.url + '/updateAssetName', assets).pipe(
        map(res => res));
}

public employeeValidate(reco: Array<EmployeeValidate>): Observable<any> {
    // return super.create(reco, 'reco')
    return this.http.post(AppConfig.urlPrefix + this.url + '/employeevalidate', JSON.stringify(reco), { headers: this.headers }).pipe(
    map((data: Response) => {
        return data;
    }));
}

public employeeValidateAll(guid: string): Observable<any> {
    // return super.create(reco, 'reco')
    return this.http.post(AppConfig.urlPrefix + this.url + '/employeevalidateall/' + guid, { headers: this.headers }).pipe(
    map((data: Response) => {
        return data;
    }));
}

public exportAll(params: Array<Param>) {
    let searchParams: HttpParams = null;
    let url = AppConfig.urlPrefix + this.url + '/exportAll';
    searchParams = this.getSearchParams(params);
    return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                    map(res => res))
}


public addAssetByEmployee(reco: AssetTransferAdd): Observable<any> {
    // return super.create(reco, 'reco')
    return this.http.post(AppConfig.urlPrefix + this.url + '/addTransfer', JSON.stringify(reco), { headers: this.headers }).pipe(
    map((data: Response) => {
        return data;
    }));
}


public exportSocGenEmail(params: Array<Param>) {
    let searchParams: HttpParams = null;
    let url = AppConfig.urlPrefix + this.url + '/exportSocGenEmail';

    searchParams = this.getSearchParams(params);
    return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                    map(res => res));
}

public exportInventoryEmag(params: Array<Param>) {
    let searchParams: HttpParams = null;
    let url = AppConfig.urlPrefix + this.url + '/exportInventoryEmag';

    searchParams = this.getSearchParams(params);
    return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                    map(res => res));
}

public exportAllInventoryEmag(params: Array<Param>) {
  let searchParams: HttpParams = null;
  let url = AppConfig.urlPrefix + this.url + '/exportAllInventoryEmag';

  searchParams = this.getSearchParams(params);
  return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                  map(res => res));
}

// public printLocalLabel(item: Array<PrintLabel>): Observable<any> {
//     return this.http.post(AppConfig.urlPrefixPrint + 'printing',
//         JSON.stringify(item), { headers: this.headers }).pipe(
//         map((data) => {
//             return data;
//         }));
// }

public total(inventoryId: number): Observable<any> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/total' + `/${inventoryId}`, { headers: this.headers }).pipe(
    map((data: Response) => {
        return data;
    }));
}

public auditLocationChart(locationId: number, inventoryId: number): Observable<any> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/auditLocationChart' + `/${locationId}/${inventoryId}`, { headers: this.headers }).pipe(
    map((data: Response) => {
        return data;
    }));
}

public auditRegionChart(regionId: number, inventoryId: number): Observable<any> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/auditRegionChart' + `/${regionId}/${inventoryId}`, { headers: this.headers }).pipe(
    map((data: Response) => {
        return data;
    }));
}

public inventoryPieChartByDay(inventoryId: number): Observable<any> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/inventoryPieChartByDay' + `/${inventoryId}`, { headers: this.headers }).pipe(
    map((data: Response) => {
        return data;
    }));
}

public inventoryPieChartLocationFinishedByDay(inventoryId: number): Observable<any> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/inventoryPieChartLocationFinishedByDay' + `/${inventoryId}`, { headers: this.headers }).pipe(
    map((data: Response) => {
        return data;
    }));
}

public inventoryPieChartUserScans(inventoryId: number): Observable<any> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/inventoryPieChartUserScans' + `/${inventoryId}`, { headers: this.headers }).pipe(
    map((data: Response) => {
        return data;
    }));
}

public region(inventoryId: number): Observable<any> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/region' + `/${inventoryId}`, { headers: this.headers }).pipe(
    map((data: Response) => {
        return data;
    }));
}

public location(regionId: number, inventoryId: number): Observable<any> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/location'  + `/${regionId}/${inventoryId}`, { headers: this.headers }).pipe(
    map((data: Response) => {
        return data;
    }));
}

public mapAssetTemp(model: any): Observable<any> {

    //let body: string = JSON.stringify(model);

    return this.http.post(AppConfig.urlPrefix + this.url + '/mapassettemp', model, { headers: this.headers }).pipe(
        map((res: Response) => {
            return res;
        }));
}

public export(params: Array<Param>) {
    let searchParams: HttpParams = null;
    let url = AppConfig.urlPrefix + this.url + '/exportEmag';

    searchParams = this.getSearchParams(params);
    return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                    map(res => res));
}

public exportAccounting(params: Array<Param>) {
    let searchParams: HttpParams = null;
    let url = AppConfig.urlPrefix + this.url + '/exportAccounting';

    searchParams = this.getSearchParams(params);
    return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                    map(res => res));
}

public exportStockIT(params: Array<Param>) {
    let searchParams: HttpParams = null;
    const url = AppConfig.urlPrefix + this.url + '/exportStockIT';

    searchParams = this.getSearchParams(params);
    return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                    map(res => res));
}

public exportStockITMFX(params: Array<Param>) {
  let searchParams: HttpParams = null;
  const url = AppConfig.urlPrefix + this.url + '/exportStockITMFX';

  searchParams = this.getSearchParams(params);
  return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                  map(res => res));
}

public exportStockITToEmployee(params: Array<Param>) {
  let searchParams: HttpParams = null;
  const url = AppConfig.urlPrefix + this.url + '/exportStockITToEmployee';

  searchParams = this.getSearchParams(params);
  return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                  map(res => res));
}

public exportStockITFromEmployee(params: Array<Param>) {
  let searchParams: HttpParams = null;
  const url = AppConfig.urlPrefix + this.url + '/exportStockITFromEmployee';

  searchParams = this.getSearchParams(params);
  return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                  map(res => res));
}

public exportImportStockITMFX(params: Array<Param>) {
  let searchParams: HttpParams = null;
  const url = AppConfig.urlPrefix + this.url + '/exportImportStockITMFX';

  searchParams = this.getSearchParams(params);
  return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                  map(res => res));
}

public exportWFH(params: Array<Param>) {
    let searchParams: HttpParams = null;
    let url = AppConfig.urlPrefix + this.url + '/exportWFH';

    searchParams = this.getSearchParams(params);
    return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                    map(res => res));
}

public createAsset(): Observable<any> {
    return this.http.post(AppConfig.urlPrefix + this.url + '/createAsset', { headers: this.headers }).pipe(
        map((data) => {
            return data;
        }));
}

public getStockByCategoryID(categoryID: string): Observable<any> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/getStockByCategoryID' + `/${categoryID}`, { headers: this.headers }).pipe(
    map((data: Response) => {
        return data;
    }));
  }



public rejectAsset(assetId: number, reason: string): Observable<RejectResult> {
    return this.http.post(AppConfig.urlPrefix + this.url + '/rejectAsset' + `/${assetId}/${reason}`, { headers: this.headers }).pipe(
        map((data: RejectResult) => {
            return data;
        }));
}

addNewAssetEmployee(item: AssetEmployeeSave): Observable<WFHResult> {
    const url: string = AppConfig.urlPrefix + this.url + '/employeedetail';

    return this.http.post(url, item, { headers: this.headers }).pipe(
        map((data: WFHResult) => {
            return data;
        }));
}

updateAssetEmployee(item: AssetEmployeeSave): Observable<number> {
    const url: string = AppConfig.urlPrefix + this.url + '/employeedetail';
    return this.http.put(url,item, { headers: this.headers }).pipe(
    map((data: number) => {
        return data;
    }));
}

public deleteAssetValidation(assetId: number): Observable<WFHResult> {
    return this.http.post(AppConfig.urlPrefix + this.url + '/deleteValidationAsset' + `/${assetId}`, { headers: this.headers }).pipe(
      map((data: WFHResult) => {
          return data;
      }));;
}

deleteOrderItem(assetId: number): Observable<AssetResult> {
    const url: string = AppConfig.urlPrefix + this.url + '/deleteOrderItem';
    return this.http.post(url, assetId, { headers: this.headers }).pipe(
        map((data: AssetResult) => {
            return data;
        }));
}

public exportImportPrintLabel(params: Array<Param>) {
  let searchParams: HttpParams = null;
  const url = AppConfig.urlPrefix + this.url + '/exportPrintTemplate';

  searchParams = this.getSearchParams(params);
  return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                  map(res => res));
}

public importPrintLabel(item: ImportPrintLabel): Observable<ImportPrintResult> {
  return this.http.post(AppConfig.urlPrefix + this.url + '/importprintlabel', item).pipe(
      map((data: ImportPrintResult) => {
          return data;
      }));
}

public generateMF(item: number): Observable<any> {
  const url = AppConfig.urlPrefix + this.url + '/generateMF/' + item;
  return this.http.get(url, { observe: 'response', responseType: 'blob' }).pipe(
    map(res => res));
}

public exportReceptionHistory(params: Array<Param>) {
  let searchParams: HttpParams = null;
  let url = AppConfig.urlPrefix + this.url + '/exportReceptionHistory';

  searchParams = this.getSearchParams(params);
  return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                  map(res => res));
}

public updateStorno(reco: Array<RequestBudgetForecastMaterialCostCenterStorno>): Observable<RequestResult> {
  // return super.create(reco, 'reco')
  return this.http.post(AppConfig.urlPrefix + this.url + '/updatestorno', reco, { headers: this.headers }).pipe(
  map((data: RequestResult) => {
      return data;
  }));
}

public stornoMF(ids: Array<number>): Observable<RequestResult> {
  return this.http
      .post(AppConfig.urlPrefix + this.url + '/stornoMF', ids).pipe(
      map((data: RequestResult) => {
          return data;
      }));
}

addPreReceptionAsset(item: AddAsset): Observable<CreateAssetSAPResult> {

  const url: string = AppConfig.urlPrefix + this.url + '/addPreReception';

  return this.http.post(url, item, { headers: this.headers }).pipe(
      map((data: CreateAssetSAPResult) => {
          return data;
      }));
}

publicRetireAsset(item: SaveRetireAsset): Observable<CreateAssetSAPResult> {
  const url: string = AppConfig.urlPrefix + this.url + '/publicRetireAsset';
  return this.http.post(url, item, { headers: this.headers }).pipe(
      map((data: CreateAssetSAPResult) => {
          return data;
      }));
}

validateStornoAcquizitionAsset(item: AssetAcquizition): Observable<CreateAssetSAPResult> {
  const url: string = AppConfig.urlPrefix + this.url + '/validatestornoacquisition';
  return this.http.post(url, item, { headers: this.headers }).pipe(
      map((data: CreateAssetSAPResult) => {
          return data;
      }));
}

  approvePreReception(item: number): Observable<UpdateAssetSAPResult> {
    const url: string = AppConfig.urlPrefix + this.url + '/approvePreReception';
    return this.http.post(url, item, { headers: this.headers }).pipe(
      map((data: UpdateAssetSAPResult) => {
          return data;
      }));
}

updatePreAcquisition(item: AssetPreAcquisition): Observable<UpdateAssetSAPResult> {
    const url: string = AppConfig.urlPrefix + this.url + '/updatePreAcquisition';
    return this.http.post(url, item, { headers: this.headers }).pipe(
    map((data: UpdateAssetSAPResult) => {
        return data;
    }));
}

updateParentNumber(item: AssetPreAcquisition): Observable<UpdateAssetSAPResult> {
    const url: string = AppConfig.urlPrefix + this.url + '/updateParentNumber';
    return this.http.post(url, item, { headers: this.headers }).pipe(
    map((data: UpdateAssetSAPResult) => {
        return data;
    }));
}

}
