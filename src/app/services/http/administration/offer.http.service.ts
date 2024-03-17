import { Param } from './../../../model/common/param';
import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../../../config';
import { OfferSave } from '../../../model/api/administration/offer-save';
import { map } from 'rxjs/operators';
import { OfferValidate } from '../../../model/common/import/offer-validate';
import { OfferResult } from '../../../model/api/result/offer-result';
@Injectable()
export class OfferHttpService extends GenericHttpService<any, number> {
  constructor(public http: HttpClient) {
    super(http, '', 'offers');
  }

  getDetailById(id: number): Observable<any> {
    return this.http
      .get(AppConfig.urlPrefix + this.url + `/detail/${id}`).pipe(
      map((data: Response) => {
        return data;
      }));
  }

  addNewOffer(item: OfferSave): Observable<OfferResult> {
    const url: string = AppConfig.urlPrefix + this.url + '/detail';
    return this.http
      .post(url, item, { headers: this.headers }).pipe(
      map((data: OfferResult) => {
        return data;
      }));
  }

  updateAsset(item: OfferSave): Observable<{}> {
    const url: string = AppConfig.urlPrefix + this.url + '/detail';
    return this.http.put(url, item, { headers: this.headers });
  }

  //   public deleteAssetOp(assetId: number, inventoryId: number ): Observable<any> {
  //     console.log(AppConfig.urlPrefix + this.url + `/${assetId}`, inventoryId);
  //     return this.http.delete(AppConfig.urlPrefix + this.url + '/deleteAssetOp' + `/${assetId}, ${inventoryId}`);
  // }

  // public exportIn(params: Array<Param>) {
  //     let searchParams: URLSearchParams = null;
  //     let url = AppConfig.urlPrefix + this.url + '/exportIn';

  //     searchParams = this.getSearchParams(params);
  //     return this.http.get(url, { responseType: ResponseContentType.Blob, search: searchParams })
  //                     .map(res => res.blob());
  // }

  // public exportOtp(params: Array<Param>) {
  //     let searchParams: URLSearchParams = null;
  //     let url = AppConfig.urlPrefix + this.url + '/exportOtp';

  //     searchParams = this.getSearchParams(params);
  //     return this.http.get(url, { responseType: ResponseContentType.Blob, search: searchParams })
  //                     .map(res => res.blob());
  // }

  // public exportOut(params: Array<Param>) {
  //     let searchParams: URLSearchParams = null;
  //     let url = AppConfig.urlPrefix + this.url + '/exportOut';

  //     searchParams = this.getSearchParams(params);
  //     return this.http.get(url, { responseType: ResponseContentType.Blob, search: searchParams })
  //                     .map(res => res.blob());
  // }

  // public exportDemo(inventoryId: number, regionId: number, locationId: number, roomId: number) {
  //     let searchParams: URLSearchParams = null;
  //  //   let url = AppConfig.urlPrefix + 'reporting/exportMegaImage&inventoryId=${inventoryId}&locationId=${locationId}';
  //     let url = `${AppConfig.urlPrefix}reporting/locationdownload/${regionId}/${locationId}/${roomId}`;

  //     searchParams = this.getSearchParams(null);
  //     return this.http.get(url, { responseType: ResponseContentType.Blob, search: searchParams })
  //                     .map(res => res.blob());
  // }

  public deleteAsset(assetId: number): Observable<any> {
    return this.http.delete(
      AppConfig.urlPrefix + this.url + '/deleteBudget' + `/${assetId}`
    );
  }

  // public checkUniqueAsset(invNo: string) {
  //     return this.http.get(AppConfig.urlPrefix + this.url + '/checkUnique' + `/${invNo}`, { headers: this.headers })
  //     .map((data: Response) => {
  //         return data;
  //     });
  // }

  // public getLastInvNo() {
  //     return this.http.get(AppConfig.urlPrefix + this.url + '/getLastInvNo', { headers: this.headers })
  //     .map((data: Response) => {
  //         return data.json();
  //     });
  // }

  public export(params: Array<Param>) {
    let searchParams: HttpParams = null;
    let url = AppConfig.urlPrefix + this.url + '/export';

    searchParams = this.getSearchParams(params);
    return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                    map(res => res));
  }

  // public invChart(locationId: number): Observable<any> {
  //     return this.http.get(AppConfig.urlPrefix + this.url + '/inventoryChart' + `/${locationId}`, { headers: this.headers })
  //     .map((data: Response) => {
  //         return data.json();
  //     });
  // }

  // // public auditChart(locationId: number): Observable<any> {
  // //     return this.http.get(AppConfig.urlPrefix + this.url + '/auditChart' + `/${locationId}`, { headers: this.headers })
  // //     .map((data: Response) => {
  // //         return data.json();
  // //     });
  // // }

  // // public saveReco(reco: AssetRecoSave): Observable<any> {
  // //     return super.create(reco, 'reco');
  // // }

  // public exportSocGen(params: Array<Param>) {
  //     let searchParams: URLSearchParams = null;
  //     let url = AppConfig.urlPrefix + this.url + '/exportSocGen';

  //     searchParams = this.getSearchParams(params);
  //     return this.http.get(url, { responseType: ResponseContentType.Blob, search: searchParams, headers: this.headers })
  //                     .map(res => res.blob());
  // }

  // public exportSocGenEmail(params: Array<Param>) {
  //     let searchParams: URLSearchParams = null;
  //     let url = AppConfig.urlPrefix + this.url + '/exportSocGenEmail';

  //     searchParams = this.getSearchParams(params);
  //     return this.http.get(url, { responseType: ResponseContentType.Blob, search: searchParams, headers: this.headers })
  //                     .map(res => res.blob());
  // }

  // public printLabel(item: Array<PrintLabel>): Observable<void> {
  //     return this.http.post(AppConfig.urlPrefix + this.url + '/printLabel',
  //         JSON.stringify(item), { headers: this.headers })
  //         .map((data: Response) => {
  //             return data.json();
  //         });
  // }

  // public saveReco(reco: AssetTempRecoSave): Observable<any> {
  //     // return super.create(reco, 'reco')
  //     return this.http.post(AppConfig.urlPrefix + this.url + '/reco', JSON.stringify(reco), { headers: this.headers })
  //     .map((data: Response) => {
  //         return data.json();
  //     });
  // }

  // public recoverAssetTemp(assetId: number, inventoryId: number): Observable<any> {
  //     return this.http.put(AppConfig.urlPrefix + this.url + '/recoverAssetTemp' +
  //      `/${assetId}/${inventoryId}`, {})
  //      .map((data: Response) => {
  //         return data.json();
  //     });
  // }

  // public addAssetByEmployee(reco: AssetTransferAdd): Observable<any> {
  //     // return super.create(reco, 'reco')
  //     return this.http.post(AppConfig.urlPrefix + this.url + '/addTransfer', JSON.stringify(reco), { headers: this.headers })
  //     .map((data: Response) => {
  //         return data.json();
  //     });
  // }

  // public employee(inventoryId: number): Observable<any> {
  //     return this.http.get(AppConfig.urlPrefix + this.url + '/employee' + `/${inventoryId}`, { headers: this.headers })
  //     .map((data: Response) => {
  //         return data.json();
  //     });
  // }

  public company(companyId: number, accMonthId: number): Observable<any> {
      return this.http.get(AppConfig.urlPrefix + this.url + '/company' + `/${accMonthId}`+ `/${companyId}`, { headers: this.headers }).pipe(
      map((data: Response) => {
          return data.json();
      }));
  }

  public partner(partnerId: number, accMonthId: number): Observable<any> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/partner' + `/${accMonthId}`+ `/${partnerId}`, { headers: this.headers }).pipe(
    map((data: Response) => {
        return data.json();
    }));
}

public masterType(masterTypeId: number, accMonthId: number): Observable<any> {
  return this.http.get(AppConfig.urlPrefix + this.url + '/masterType' + `/${accMonthId}`+ `/${masterTypeId}`, { headers: this.headers }).pipe(
  map((data: Response) => {
      return data.json();
  }));
}

public expenceType(typeId: number, accMonthId: number): Observable<any> {
  return this.http.get(AppConfig.urlPrefix + this.url + '/expenceType' + `/${accMonthId}`+ `/${typeId}`, { headers: this.headers }).pipe(
  map((data: Response) => {
      return data.json();
  }));
}

public employee(employeeId: number, accMonthId: number): Observable<any> {
  return this.http.get(AppConfig.urlPrefix + this.url + '/employee' + `/${accMonthId}`+ `/${employeeId}`, { headers: this.headers }).pipe(
  map((data: Response) => {
      return data.json();
  }));
}

public subType(subTypeId: number, accMonthId: number): Observable<any> {
  return this.http.get(AppConfig.urlPrefix + this.url + '/subType' + `/${accMonthId}`+ `/${subTypeId}`, { headers: this.headers }).pipe(
  map((data: Response) => {
      return data.json();
  }));
}

  // public invChartperLocation(locationId): Observable<any> {
  //     return this.http.get(AppConfig.urlPrefix + this.url + '/inventoryChartPerLocation'  + `/${locationId}`, { headers: this.headers })
  //     .map((data: Response) => {
  //         return data.json();
  //     });
  // }

  // public room(locationId: number, inventoryId: number): Observable<any> {
  //     return this.http.get(AppConfig.urlPrefix + this.url + '/room'  + `/${locationId}/${inventoryId}`, { headers: this.headers })
  //     .map((data: Response) => {
  //         return data.json();
  //     });
  // }

  // public location(regionId: number, inventoryId: number): Observable<any> {
  //     return this.http.get(AppConfig.urlPrefix + this.url + '/location'  + `/${regionId}/${inventoryId}`, { headers: this.headers })
  //     .map((data: Response) => {
  //         return data.json();
  //     });
  // }

  public total(accMonthId: number): Observable<any> {
      return this.http.get(AppConfig.urlPrefix + this.url + '/total' + `/${accMonthId}`, { headers: this.headers }).pipe(
      map((data: Response) => {
          return data.json();
      }));
  }

  // public piePerLocationChart(locationId: number): Observable<any> {
  //     return this.http.get(AppConfig.urlPrefix + this.url + '/piePerLocationChart' + `/${locationId}`, { headers: this.headers })
  //     .map((data: Response) => {
  //         return data.json();
  //     });
  // }

  // public piePerCompanyTypeChartValue(typeId: number): Observable<any> {
  //     return this.http.get(AppConfig.urlPrefix + this.url + '/piePerCompanyTypeChartValue' + `/${typeId}`, { headers: this.headers })
  //     .map((data: Response) => {
  //         return data.json();
  //     });
  // }

  // public piePerTypeChartValue(typeId: number): Observable<any> {
  //     return this.http.get(AppConfig.urlPrefix + this.url + '/piePerTypeChartValue' + `/${typeId}` , { headers: this.headers })
  //     .map((data: Response) => {
  //         return data.json();
  //     });
  // }

  // public piePerCompanyChartValue(typeId: number): Observable<any> {
  //     return this.http.get(AppConfig.urlPrefix + this.url + '/piePerCompanyChartValue' + `/${typeId}`, { headers: this.headers })
  //     .map((data: Response) => {
  //         return data.json();
  //     });
  // }

  // public inventoryPieChartByDay(inventoryId: number): Observable<any> {
  //     return this.http.get(AppConfig.urlPrefix + this.url + '/inventoryPieChartByDay' + `/${inventoryId}`, { headers: this.headers })
  //     .map((data: Response) => {
  //         return data.json();
  //     });
  // }

  // public inventoryPieChartLocationFinishedByDay(inventoryId: number): Observable<any> {
  //     return this.http.get(AppConfig.urlPrefix + this.url + '/inventoryPieChartLocationFinishedByDay' + `/${inventoryId}`, { headers: this.headers })
  //     .map((data: Response) => {
  //         return data.json();
  //     });
  // }

  // public auditChart(locationId: number): Observable<any> {
  //     return this.http.get(AppConfig.urlPrefix + this.url + '/auditChart' + `/${locationId}`, { headers: this.headers })
  //     .map((data: Response) => {
  //         return data.json();
  //     });
  // }

  // public auditAdministrationChart(administrationId: number, inventoryId: number): Observable<any> {
  //     return this.http.get(AppConfig.urlPrefix + this.url + '/auditAdministrationChart' + `/${administrationId}/${inventoryId}`, { headers: this.headers })
  //     .map((data: Response) => {
  //         return data.json();
  //     });
  // }

  public auditBudgetChart(companyId: number, accMonthId: number): Observable<any> {
      return this.http.get(AppConfig.urlPrefix + this.url + '/auditLocationChart' + `/${companyId}/${accMonthId}`, { headers: this.headers }).pipe(
      map((data: Response) => {
          return data.json();
      }));
  }

  // public auditDivisionChart(divisionId: number, inventoryId: number): Observable<any> {
  //     return this.http.get(AppConfig.urlPrefix + this.url + '/auditDivisionChart' + `/${divisionId}/${inventoryId}`, { headers: this.headers })
  //     .map((data: Response) => {
  //         return data.json();
  //     });
  // }

  // public auditRegionChart(regionId: number, inventoryId: number): Observable<any> {
  //     return this.http.get(AppConfig.urlPrefix + this.url + '/auditRegionChart' + `/${regionId}/${inventoryId}`, { headers: this.headers })
  //     .map((data: Response) => {
  //         return data.json();
  //     });
  // }

  // public auditSubtypeChart(): Observable<any> {
  //     return this.http.get(AppConfig.urlPrefix + this.url + '/auditSubtypeChart', { headers: this.headers })
  //     .map((data: Response) => {
  //         return data.json();
  //     });
  // }

  // public auditTypeChart(): Observable<any> {
  //     return this.http.get(AppConfig.urlPrefix + this.url + '/auditTypeChart', { headers: this.headers })
  //     .map((data: Response) => {
  //         return data.json();
  //     });
  // }

  // public auditMasterTypeChart(): Observable<any> {
  //     return this.http.get(AppConfig.urlPrefix + this.url + '/auditMasterTypeChart', { headers: this.headers })
  //     .map((data: Response) => {
  //         return data.json();
  //     });
  // }

  public budgetValidate(reco: Array<OfferValidate>): Observable<any> {
    // return super.create(reco, 'reco')
    return this.http
      .post(
        AppConfig.urlPrefix + this.url + '/offervalidate',
        JSON.stringify(reco),
        { headers: this.headers }
      ).pipe(
      map((data: Response) => {
        return data;
      }));
  }

  // public employeeValidateAll(guid: string): Observable<any> {
  //     // return super.create(reco, 'reco')
  //     return this.http.post(AppConfig.urlPrefix + this.url + '/employeevalidateall/' + guid, { headers: this.headers })
  //     .map((data: Response) => {
  //         return data.json();
  //     });
  // }

  // public exportAll(params: Array<Param>) {
  //     let searchParams: URLSearchParams = null;
  //     let url = AppConfig.urlPrefix + this.url + '/exportAll';
  //     searchParams = this.getSearchParams(params);
  //     return this.http.get(url, { responseType: ResponseContentType.Blob, search: searchParams })
  //                     .map(res => res.blob());
  // }

   public sendBookEmailPreview(offerId: number): Observable<any> {
        return this.http.get(AppConfig.urlPrefix + this.url + `/sendBookEmailPreview/ ${offerId}`, { responseType: 'text' }).pipe(
            map((data: any) => {
                return data;
            }));
    }

    public sendBookEmail(offerId: number, partnerIds: Array<number>): Observable<any> {
      // console.log('ITEMS: ', item);
      return this.http.post(AppConfig.urlPrefix + this.url + `/sendBookEmail/${offerId}`, JSON.stringify(partnerIds),
          { headers: this.headers }).pipe(
          map((data: Response) => {
              return data;
          }));
  }

    public readEmails(): Observable<any> {
      return this.http.get(AppConfig.urlPrefix + this.url + '/getEmails', { headers: this.headers }).pipe(
      map((data: Response) => {
          return data;
      }));
  }
}
