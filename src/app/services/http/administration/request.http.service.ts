import { Param } from '../../../model/common/param';
import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../../../config';
import { map } from 'rxjs/operators';
import { RequestSave } from '../../../model/api/administration/request-save';
import { RequestValidate } from '../../../model/common/import/request-validate';
import { NeedBudget } from '../../../model/api/administration/need-budget';
import { RequestResult } from '../../../model/api/result/request-result';
import { RequestReason } from '../../../model/api/common/request-reason';
import { RequestUpdate } from '../../../model/api/administration/request-update';
import { RequestDelete } from '../../../model/api/administration/request-delete';
import { RequestBudgetForecastUpdate } from '../../../model/api/requests/request-budget-forecast-update';
@Injectable()
export class RequestHttpService extends GenericHttpService<any, number> {
  constructor(public http: HttpClient) {
    super(http, '', 'requests');
  }

  getDetailById(id: number): Observable<any> {
    return this.http
      .get(AppConfig.urlPrefix + this.url + `/detail/${id}`).pipe(
      map((data: Response) => {
        return data;
      }));
  }

  addNewRequest(item: RequestSave): Observable<RequestResult> {
    const url: string = AppConfig.urlPrefix + this.url + '/detail';
    return this.http
      .post(url, item, { headers: this.headers }).pipe(
      map((data: RequestResult) => {
        return data;
      }));
  }

  updateRequest(item: RequestUpdate): Observable<RequestResult> {
    const url: string = AppConfig.urlPrefix + this.url + '/update';
    return this.http
      .post(url, item, { headers: this.headers }).pipe(
      map((data: RequestResult) => {
        return data;
      }));
  }

  updateAsset(item: RequestSave): Observable<{}> {
    let url: string = AppConfig.urlPrefix + this.url + '/detail';
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
          return data;
      }));
  }

  public project(projectId: number, accMonthId: number): Observable<any> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/project' + `/${accMonthId}`+ `/${projectId}`, { headers: this.headers }).pipe(
    map((data: Response) => {
        return data;
    }));
}

public partner(partnerId: number, accMonthId: number): Observable<any> {
  return this.http.get(AppConfig.urlPrefix + this.url + '/partner' + `/${accMonthId}`+ `/${partnerId}`, { headers: this.headers }).pipe(
  map((data: Response) => {
      return data;
  }));
}

public masterType(masterTypeId: number, accMonthId: number): Observable<any> {
  return this.http.get(AppConfig.urlPrefix + this.url + '/masterType' + `/${accMonthId}`+ `/${masterTypeId}`, { headers: this.headers }).pipe(
  map((data: Response) => {
      return data;
  }));
}

public costCenter(costCenterId: number, accMonthId: number): Observable<any> {
  return this.http.get(AppConfig.urlPrefix + this.url + '/costCenter' + `/${accMonthId}`+ `/${costCenterId}`, { headers: this.headers }).pipe(
  map((data: Response) => {
      return data;
  }));
}

public expenceType(typeId: number, accMonthId: number): Observable<any> {
  return this.http.get(AppConfig.urlPrefix + this.url + '/expenceType' + `/${accMonthId}`+ `/${typeId}`, { headers: this.headers }).pipe(
  map((data: Response) => {
      return data;
  }));
}

public employee(employeeId: number, accMonthId: number): Observable<any> {
  return this.http.get(AppConfig.urlPrefix + this.url + '/employee' + `/${accMonthId}`+ `/${employeeId}`, { headers: this.headers }).pipe(
  map((data: Response) => {
      return data;
  }));
}

public subType(subTypeId: number, accMonthId: number): Observable<any> {
  return this.http.get(AppConfig.urlPrefix + this.url + '/subType' + `/${accMonthId}`+ `/${subTypeId}`, { headers: this.headers }).pipe(
  map((data: Response) => {
      return data;
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
          return data;
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
          return data;
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

  public budgetValidate(reco: Array<RequestValidate>): Observable<any> {
    // return super.create(reco, 'reco')
    return this.http
      .post(
        AppConfig.urlPrefix + this.url + '/budgetvalidate',
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

public validateLevel1(assetOpIds: number[]): Observable<any> {
    return super.create(assetOpIds, 'validate');
}

public reject(assetOpIds: number[]): Observable<any> {
  return super.create(assetOpIds, 'reject');
}

public validateLevel3(assetOpIds: number[] , isManagerTransfer: number): Observable<any> {
  return super.create(assetOpIds, 'validatelevel3/' + isManagerTransfer);
}

public validateLevel4(assetOpIds: number[] , isManagerTransfer: number): Observable<any> {
  return super.create(assetOpIds, 'validatelevel4/' + isManagerTransfer);
}

public getData(params: Array<Param>): Observable<any> {
  let searchParams: HttpParams = null;
  searchParams = this.getSearchParams(params);
  return this.http.get(AppConfig.urlPrefix + this.url + '/getData' , { params: searchParams, headers: this.headers }).pipe(
  map((data: Response) => {
      return data;
  }));
}

needBudget(item: NeedBudget): Observable<RequestResult> {
  const url: string = AppConfig.urlPrefix + this.url + '/needBudget';
  return this.http
    .post(url, item, { headers: this.headers }).pipe(
    map((data: RequestResult) => {
      return data;
    }));
}


rejectBudget(item: RequestReason): Observable<RequestResult> {
  const url: string = AppConfig.urlPrefix + this.url + '/rejectBudget';

  return this.http
    .post(url, item, { headers: this.headers }).pipe(
    map((data: RequestResult) => {
      return data;
    }));
}

deleteRequest(item: RequestDelete): Observable<RequestResult> {
  const url: string = AppConfig.urlPrefix + this.url + '/delete';

  return this.http
    .post(url, item, { headers: this.headers }).pipe(
    map((data: RequestResult) => {
      return data;
    }));
}

updateRequestBudgetForecast(item: RequestBudgetForecastUpdate): Observable<RequestResult> {
  const url: string = AppConfig.urlPrefix + this.url + '/updateRequestBudgetForecast';
  return this.http
    .post(url, item, { headers: this.headers }).pipe(
    map((data: RequestResult) => {
      return data;
    }));
}

}
