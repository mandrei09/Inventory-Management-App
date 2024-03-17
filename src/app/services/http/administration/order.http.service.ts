import { Param } from '../../../model/common/param';
import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../../../config';
import { OrderSave } from '../../../model/api/administration/order-save';
import { OrderValidate } from '../../../model/common/import/order-validate';
import { map } from 'rxjs/operators';
import { OrderContractUpdate } from '../../../model/api/administration/order-update';
import { CreateAssetSAPResult } from '../../../model/api/result/create-asset-SAP-result';
import { OrderResult } from '../../../model/api/result/order-result';
import { OrderStockSave } from '../../../model/api/administration/order-stock-save';
import { OrderDelete } from '../../../model/api/order/order-delete';
import { OrderUpdate } from '../../../model/api/order/order-update';
import { OrderBudgetForecastUpdate } from '../../../model/api/order/order-budget-forecast-update';
@Injectable()
export class OrderHttpService extends GenericHttpService<any, number> {
  constructor(public http: HttpClient) {
    super(http, '', 'orders');
  }

  getDetailById(id: number): Observable<any> {
    return this.http
      .get(AppConfig.urlPrefix + this.url + `/detail/${id}`).pipe(
      map((data: Response) => {
        return data;
      }));
  }

  addNewOrder(item: OrderSave): Observable<OrderResult> {
    const url: string = AppConfig.urlPrefix + this.url + '/detail';
    return this.http
      .post(url, item, { headers: this.headers }).pipe(
      map((data: OrderResult) => {
        return data;
      }));
  }

  addNewOrderStock(item: OrderStockSave): Observable<OrderResult> {
    const url: string = AppConfig.urlPrefix + this.url + '/detailStock';
    return this.http
      .post(url, item, { headers: this.headers }).pipe(
      map((data: OrderResult) => {
        return data;
      }));
  }

  addNewOrderCheck(item: OrderStockSave): Observable<CreateAssetSAPResult> {
    const url: string = AppConfig.urlPrefix + this.url + '/detailCheck';
    return this.http
      .post(url, item, { headers: this.headers }).pipe(
      map((data: CreateAssetSAPResult) => {
        return data;
      }));
  }

  updateAsset(item: OrderSave): Observable<{}> {
    let url: string = AppConfig.urlPrefix + this.url + '/detail';
    return this.http.put(url, item, { headers: this.headers });
  }

  public deleteAsset(assetId: number): Observable<any> {
    return this.http.delete(
      AppConfig.urlPrefix + this.url + '/deleteBudget' + `/${assetId}`
    );
  }

  public export(params: Array<Param>) {
    let searchParams: HttpParams = null;
    let url = AppConfig.urlPrefix + this.url + '/export';

    searchParams = this.getSearchParams(params);
    return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                    map(res => res));
  }

  public exportStatusPO(params: Array<Param>) {
    let searchParams: HttpParams = null;
    let url = AppConfig.urlPrefix + this.url + '/exportorderstatuspo';

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

  public budgetValidate(reco: Array<OrderValidate>): Observable<any> {
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

// public validateLevel1(assetOpIds: number[] , isManagerTransfer: number): Observable<any> {
//     return super.create(assetOpIds, 'validatelevel1/' + isManagerTransfer);
// }

validateLevel(assetOpIds: number[] , isManagerTransfer: number): Observable<CreateAssetSAPResult> {
  const url: string = AppConfig.urlPrefix + this.url + '/validatelevel/' + isManagerTransfer;
  return this.http.post(url, assetOpIds, { headers: this.headers }).pipe(
      map((data: CreateAssetSAPResult) => {
          return data;
      }));
}


validateMobileLevel4(guid: string): Observable<CreateAssetSAPResult> {
  const url: string = AppConfig.urlPrefix + this.url + '/validateMobileLevel4/' + guid;
  return this.http.post(url, { headers: this.headers }).pipe(
      map((data: CreateAssetSAPResult) => {
          return data;
      }));
}

rejectMobileLevel4(guid: string): Observable<CreateAssetSAPResult> {
  const url: string = AppConfig.urlPrefix + this.url + '/rejectMobileLevel4/' + guid;
  return this.http.post(url, { headers: this.headers }).pipe(
      map((data: CreateAssetSAPResult) => {
          return data;
      }));
}


validateMobileLevel3(guid: string): Observable<CreateAssetSAPResult> {
  const url: string = AppConfig.urlPrefix + this.url + '/validateMobileLevel3/' + guid;
  return this.http.post(url, { headers: this.headers }).pipe(
      map((data: CreateAssetSAPResult) => {
          return data;
      }));
}

rejectMobileLevel3(guid: string): Observable<CreateAssetSAPResult> {
  const url: string = AppConfig.urlPrefix + this.url + '/rejectMobileLevel3/' + guid;
  return this.http.post(url, { headers: this.headers }).pipe(
      map((data: CreateAssetSAPResult) => {
          return data;
      }));
}


validateMobileLevel2(guid: string): Observable<CreateAssetSAPResult> {
  const url: string = AppConfig.urlPrefix + this.url + '/validateMobileLevel2/' + guid;
  return this.http.post(url, { headers: this.headers }).pipe(
      map((data: CreateAssetSAPResult) => {
          return data;
      }));
}

rejectMobileLevel2(guid: string): Observable<CreateAssetSAPResult> {
  const url: string = AppConfig.urlPrefix + this.url + '/rejectMobileLevel2/' + guid;
  return this.http.post(url, { headers: this.headers }).pipe(
      map((data: CreateAssetSAPResult) => {
          return data;
      }));
}


validateMobileLevel1(guid: string): Observable<CreateAssetSAPResult> {
  const url: string = AppConfig.urlPrefix + this.url + '/validateMobileLevel1/' + guid;
  return this.http.post(url, { headers: this.headers }).pipe(
      map((data: CreateAssetSAPResult) => {
          return data;
      }));
}

rejectMobileLevel1(guid: string): Observable<CreateAssetSAPResult> {
  const url: string = AppConfig.urlPrefix + this.url + '/rejectMobileLevel1/' + guid;
  return this.http.post(url, { headers: this.headers }).pipe(
      map((data: CreateAssetSAPResult) => {
          return data;
      }));
}

validateMobileLevelS1(guid: string): Observable<CreateAssetSAPResult> {
  const url: string = AppConfig.urlPrefix + this.url + '/validateMobileLevelS1/' + guid;
  return this.http.post(url, { headers: this.headers }).pipe(
      map((data: CreateAssetSAPResult) => {
          return data;
      }));
}

rejectMobileLevelS1(guid: string): Observable<CreateAssetSAPResult> {
  const url: string = AppConfig.urlPrefix + this.url + '/rejectMobileLevelS1/' + guid;
  return this.http.post(url, { headers: this.headers }).pipe(
      map((data: CreateAssetSAPResult) => {
          return data;
      }));
}


validateMobileLevelS2(guid: string): Observable<CreateAssetSAPResult> {
  const url: string = AppConfig.urlPrefix + this.url + '/validateMobileLevelS2/' + guid;
  return this.http.post(url, { headers: this.headers }).pipe(
      map((data: CreateAssetSAPResult) => {
          return data;
      }));
}

rejectMobileLevelS2(guid: string): Observable<CreateAssetSAPResult> {
  const url: string = AppConfig.urlPrefix + this.url + '/rejectMobileLevelS2/' + guid;
  return this.http.post(url, { headers: this.headers }).pipe(
      map((data: CreateAssetSAPResult) => {
          return data;
      }));
}


validateMobileLevelS3(guid: string): Observable<CreateAssetSAPResult> {
  const url: string = AppConfig.urlPrefix + this.url + '/validateMobileLevelS3/' + guid;
  return this.http.post(url, { headers: this.headers }).pipe(
      map((data: CreateAssetSAPResult) => {
          return data;
      }));
}

rejectMobileLevelS3(guid: string): Observable<CreateAssetSAPResult> {
  const url: string = AppConfig.urlPrefix + this.url + '/rejectMobileLevelS3/' + guid;
  return this.http.post(url, { headers: this.headers }).pipe(
      map((data: CreateAssetSAPResult) => {
          return data;
      }));
}

public validatePreAmount1(assetOpIds: number[] , isManagerTransfer: number): Observable<any> {
  return super.create(assetOpIds, 'validatePreAmount1/' + isManagerTransfer);
}

public validatePreAmount2(assetOpIds: number[] , isManagerTransfer: number): Observable<any> {
  return super.create(assetOpIds, 'validatePreAmount2/' + isManagerTransfer);
}

public validateNeedContract(assetOpIds: number[] , isManagerTransfer: number): Observable<any> {
  return super.create(assetOpIds, 'validateNeedContract/' + isManagerTransfer);
}

public updateOrder(item: OrderContractUpdate): Observable<any> {
  const url: string = AppConfig.urlPrefix + this.url + '/contractUpdate';

  return this.http
    .post(url, item, { headers: this.headers }).pipe(
    map((data: Response) => {
      return data;
    }));
}

editOrder(item: OrderUpdate): Observable<OrderResult> {
  const url: string = AppConfig.urlPrefix + this.url + '/editOrder';
  return this.http
    .post(url, item, { headers: this.headers }).pipe(
    map((data: OrderResult) => {
      return data;
    }));
}

updateOrderBudgetForecast(item: OrderBudgetForecastUpdate): Observable<OrderResult> {
  const url: string = AppConfig.urlPrefix + this.url + '/updateOrderBudgetForecast';
  return this.http
    .post(url, item, { headers: this.headers }).pipe(
    map((data: OrderResult) => {
      return data;
    }));
}

deleteOrder(item: OrderDelete): Observable<OrderResult> {
  const url: string = AppConfig.urlPrefix + this.url + '/deleteOrder';

  return this.http
    .post(url, item, { headers: this.headers }).pipe(
    map((data: OrderResult) => {
      return data;
    }));
}

validateMobileLevelB1(guid: string): Observable<CreateAssetSAPResult> {
  const url: string = AppConfig.urlPrefix + this.url + '/validateMobileLevelB1/' + guid;
  return this.http.post(url, { headers: this.headers }).pipe(
      map((data: CreateAssetSAPResult) => {
          return data;
      }));
}

rejectMobileLevelB1(guid: string): Observable<CreateAssetSAPResult> {
  const url: string = AppConfig.urlPrefix + this.url + '/rejectMobileLevelB1/' + guid;
  return this.http.post(url, { headers: this.headers }).pipe(
      map((data: CreateAssetSAPResult) => {
          return data;
      }));
}

}
