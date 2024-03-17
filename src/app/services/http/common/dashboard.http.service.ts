import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../../../config';
import { map, shareReplay } from 'rxjs/operators';
import { Param } from '../../../model/common/param';
import { AssetStatusDashboard } from '../../../model/api/common/asset-status-dashboard';
import { LocationStatus } from '../../../model/api/common/location-status';
import { Customer } from '../../../model/api/assets/customer';
import { Product } from '../../../model/api/assets/product';
import { RequestKanban } from '../../../model/kanban/request-kanban';
import { UserStatus } from '../../../model/api/dashboard/user-status';
import { UserRequestPerMonthStatus } from '../../../model/api/dashboard/user-request-per-month-status';
@Injectable()
export class DashboardHttpService extends GenericHttpService<any, number> {

  status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];

  productNames: string[] = [
      "Bamboo Watch",
      "Black Watch",
      "Blue Band",
      "Blue T-Shirt",
      "Bracelet",
      "Brown Purse",
      "Chakra Bracelet",
      "Galaxy Earrings",
      "Game Controller",
      "Gaming Set",
      "Gold Phone Case",
      "Green Earbuds",
      "Green T-Shirt",
      "Grey T-Shirt",
      "Headphones",
      "Light Green T-Shirt",
      "Lime Band",
      "Mini Speakers",
      "Painted Phone Case",
      "Pink Band",
      "Pink Purse",
      "Purple Band",
      "Purple Gemstone Necklace",
      "Purple T-Shirt",
      "Shoes",
      "Sneakers",
      "Teal T-Shirt",
      "Yellow Earbuds",
      "Yoga Mat",
      "Yoga Set",
  ];

  constructor(public http: HttpClient) {
    super(http, '', 'dashboards');
  }

  public inventoryStatus(administrationId: number, inventoryId: number, departmentId: number, divisionId: number, costCenterId: number): Observable<any[]> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/inventorystatus' + `/${administrationId}` + `/${inventoryId}` + `/${departmentId}` + `/${divisionId}` + `/${costCenterId}`, { headers: this.headers }).pipe(
    map((data: any[]) => {
        return data;
    }));
}

public administrationStatus(administrationId: number, inventoryId: number, departmentId: number, divisionId: number, costCenterId: number): Observable<any[]> {
  return this.http.get(AppConfig.urlPrefix + this.url + '/administrationStatus' + `/${administrationId}` + `/${inventoryId}` + `/${departmentId}` + `/${divisionId}` + `/${costCenterId}`, { headers: this.headers }).pipe(
  map((data: any[]) => {
      return data;
  }));
}

public costCenterStatus(administrationId: number, inventoryId: number, departmentId: number, divisionId: number, costCenterId: number,sort:boolean = null): Observable<any[]> {
  return this.http.get(AppConfig.urlPrefix + this.url + '/costcenterstatus' + `/${administrationId}` + `/${inventoryId}` + `/${departmentId}` + `/${divisionId}` + `/${costCenterId}`, { headers: this.headers }).pipe(
  map((data: any[]) => {
      return data;
  }));
}
public divisionStatus(administrationId: number, inventoryId: number, departmentId: number, divisionId: number, costCenterId: number,sort:boolean = null): Observable<any[]> {
  return this.http.get(AppConfig.urlPrefix + this.url + '/divisionStatus' + `/${administrationId}` + `/${inventoryId}` + `/${departmentId}` + `/${divisionId}` + `/${costCenterId}`, { headers: this.headers }).pipe(
  map((data: any[]) => {
      return data;
  }));
}

public departmentStatus(administrationId: number, inventoryId: number, departmentId: number, divisionId: number, costCenterId: number,sort:boolean = null): Observable<any[]> {
  return this.http.get(AppConfig.urlPrefix + this.url + '/departmentStatus' + `/${administrationId}` + `/${inventoryId}` + `/${departmentId}` + `/${divisionId}` + `/${costCenterId}`, { headers: this.headers }).pipe(
  map((data: any[]) => {
      return data;
  }));
}

public exportExel(activityId:number,departmentsId:number,assetTypesId:number,divisionssId:number,admCentersId:number,projectsId:number,sort:boolean) {
  let searchParams: HttpParams = null;
  let url = AppConfig.urlPrefix + this.url + '/exportbudget'+ `/${activityId}`+ `/${departmentsId}`+ `/${assetTypesId}`+ `/${divisionssId}`+ `/${admCentersId}`+ `/${projectsId}`+ `/${sort}`;
  return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                  map(res => res));
}

public export(params: Array<Param>) {
  let searchParams: HttpParams = null;
  let url = AppConfig.urlPrefix + this.url + '/export';

  searchParams = this.getSearchParams(params);
  return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                  map(res => res));
}

public companyDynamicGroup(accMonthId: number, companyId: number, countryId: number, projectId: number, admCenterId: number,
  regionId: number, assetTypeId: number, activityId: number): Observable<any> {
  return this.http.get(AppConfig.urlPrefix + this.url + '/companyDynamicGroup' + `/${accMonthId}` + `/${companyId}` +
  `/${countryId}` + `/${projectId}` + `/${admCenterId}` + `/${regionId}` + `/${assetTypeId}` + `/${activityId}`, { headers: this.headers }).pipe(
  map((data: Response) => {
      return data;
  }));
}

public departmentDynamicGroup(accMonthId: number, companyId: number, countryId: number, projectId: number, admCenterId: number,
  regionId: number, assetTypeId: number, activityId: number, parentId: number): Observable<any> {
  return this.http.get(AppConfig.urlPrefix + this.url + '/departmentDynamicGroup' + `/${accMonthId}` + `/${companyId}` +
  `/${countryId}` + `/${projectId}` + `/${admCenterId}` + `/${regionId}` + `/${assetTypeId}` + `/${activityId}` + `/${parentId}`, { headers: this.headers }).pipe(
  map((data: Response) => {
      return data;
  }));
}

public divisionDynamicGroup(accMonthId: number, companyId: number, countryId: number, projectId: number, admCenterId: number,
  regionId: number, assetTypeId: number, activityId: number, parentId: number): Observable<any> {
  return this.http.get(AppConfig.urlPrefix + this.url + '/divisionDynamicGroup' + `/${accMonthId}` + `/${companyId}` +
  `/${countryId}` + `/${projectId}` + `/${admCenterId}` + `/${regionId}` + `/${assetTypeId}` + `/${activityId}` + `/${parentId}`, { headers: this.headers }).pipe(
  map((data: Response) => {
      return data;
  }));
}

public admCenterDynamicGroup(accMonthId: number, companyId: number, countryId: number, departmentId: number, divisionId: number, projectId: number, admCenterId: number,
  regionId: number, assetTypeId: number, activityId: number, parentId: number): Observable<any> {
  return this.http.get(AppConfig.urlPrefix + this.url + '/admCenterDynamicGroup' + `/${accMonthId}` + `/${companyId}` +
  `/${countryId}` + `/${departmentId}` + `/${divisionId}` + `/${projectId}` + `/${admCenterId}` + `/${regionId}` + `/${assetTypeId}` +
  `/${activityId}` + `/${parentId}`, { headers: this.headers }).pipe(
  map((data: Response) => {
      return data;
  }));
}

public regionDynamicGroup(accMonthId: number, companyId: number, countryId: number, departmentId: number, divisionId: number, projectId: number, admCenterId: number,
  regionId: number, assetTypeId: number, activityId: number, parentId: number): Observable<any> {
  return this.http.get(AppConfig.urlPrefix + this.url + '/regionDynamicGroup' + `/${accMonthId}` + `/${companyId}` +
  `/${countryId}` + `/${departmentId}` + `/${divisionId}` + `/${projectId}` + `/${admCenterId}` + `/${regionId}` + `/${assetTypeId}` +
  `/${activityId}` + `/${parentId}`, { headers: this.headers }).pipe(
  map((data: Response) => {
      return data;
  }));
}

public assetTypeDynamicGroup(accMonthId: number, companyId: number, countryId: number, departmentId: number, divisionId: number, projectId: number, admCenterId: number,
  regionId: number, assetTypeId: number, activityId: number, parentId: number): Observable<any> {
  return this.http.get(AppConfig.urlPrefix + this.url + '/assetTypeDynamicGroup' + `/${accMonthId}` + `/${companyId}` +
  `/${countryId}` + `/${departmentId}` + `/${divisionId}` + `/${projectId}` + `/${admCenterId}` + `/${regionId}` + `/${assetTypeId}`
   + `/${activityId}` + `/${parentId}`, { headers: this.headers }).pipe(
  map((data: Response) => {
      return data;
  }));
}

public projectDynamicGroup(accMonthId: number, companyId: number, countryId: number, projectId: number, admCenterId: number,
  regionId: number, assetTypeId: number, activityId: number, parentId: number): Observable<any> {
  return this.http.get(AppConfig.urlPrefix + this.url + '/projectDynamicGroup' + `/${accMonthId}` + `/${companyId}` +
  `/${countryId}` + `/${projectId}` + `/${admCenterId}` + `/${regionId}` + `/${assetTypeId}` + `/${activityId}` + `/${parentId}`, { headers: this.headers }).pipe(
  map((data: Response) => {
      return data;
  }));
}

public projectTypeDynamicGroup(accMonthId: number, companyId: number, countryId: number, departmentId: number, divisionId: number, projectId: number, admCenterId: number,
  regionId: number, assetTypeId: number, activityId: number, parentId: number): Observable<any> {
  return this.http.get(AppConfig.urlPrefix + this.url + '/projectTypeDynamicGroup' + `/${accMonthId}` + `/${companyId}` +
  `/${countryId}` + `/${departmentId}` + `/${divisionId}` + `/${projectId}` + `/${admCenterId}` + `/${regionId}` + `/${assetTypeId}`
   + `/${activityId}` + `/${parentId}`, { headers: this.headers }).pipe(
  map((data: Response) => {
      return data;
  }));
}

public dynamicGroupMonth(accMonthId: number, companyId: number, departmentId: number, divisionId: number, countryId: number, projectId: number, admCenterId: number,
  regionId: number, assetTypeId: number, activityId: number, projectTypeId: number): Observable<any> {
  return this.http.get(AppConfig.urlPrefix + this.url + '/dynamicGroupMonth' + `/${accMonthId}` + `/${companyId}` + `/${departmentId}` + `/${divisionId}` +
  `/${countryId}` + `/${projectId}` + `/${admCenterId}` + `/${regionId}` + `/${assetTypeId}` + `/${activityId}` + `/${projectTypeId}`, { headers: this.headers }).pipe(
  map((data: Response) => {
      return data;
  }));
}

getCustomersMedium() {
  return this.http.get<any>('../../../../assets/customers-medium.json')
      .toPromise()
      .then(res => <Customer[]>res.data)
      .then(data => data);
}

getProductsSmall() {
  return this.http.get<any>('assets/products-small.json')
  .toPromise()
  .then(res => <Product[]>res.data)
  .then(data => { return data; });
}

getProducts() {
  return this.http.get<any>('assets/products.json')
  .toPromise()
  .then(res => <Product[]>res.data)
  .then(data => { return data; });
}

getProductsWithOrdersSmall() {
  return this.http.get<any>('assets/products-orders-small.json')
  .toPromise()
  .then(res => <Product[]>res.data)
  .then(data => { return data; });
}

generatePrduct(): Product {
  const product: Product =  {
      id: this.generateId(),
      name: this.generateName(),
      description: "Product Description",
      price: this.generatePrice(),
      quantity: this.generateQuantity(),
      category: "Product Category",
      inventoryStatus: this.generateStatus(),
      rating: this.generateRating()
  };

  product.image = product.name.toLocaleLowerCase().split(/[ ,]+/).join('-')+".jpg";;
  return product;
}

generateId() {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

generateName() {
  return this.productNames[Math.floor(Math.random() * Math.floor(30))];
}

generatePrice() {
  return Math.floor(Math.random() * Math.floor(299)+1);
}

generateQuantity() {
  return Math.floor(Math.random() * Math.floor(75)+1);
}

generateStatus() {
  return this.status[Math.floor(Math.random() * Math.floor(3))];
}

generateRating() {
  return Math.floor(Math.random() * Math.floor(5)+1);
}

public employeesStatus(): Observable<any[]> {
  return this.http.get(AppConfig.urlPrefix + this.url + '/employeesstatus', { headers: this.headers }).pipe(
  map((data: any[]) => {
      return data;
  }));
}
}
