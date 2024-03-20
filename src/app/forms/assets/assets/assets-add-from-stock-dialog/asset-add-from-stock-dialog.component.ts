import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {EmployeeDetailComponent} from '../../../administrations/employees/employee.detail';
import {EmployeeListComponent} from '../../../administrations/employees/employee.list';
import {CostCenterDetailComponent} from '../../../administrations/cost-centers/cost-center.detail';
import {CostCenterListComponent} from '../../../administrations/cost-centers/cost-center.list';
import {StockListComponent} from '../../../administrations/stocks/stock.list';
import {AddStockAsset} from '../../../../model/api/assets/add-stock-asset';

import {CodeNameEntity} from '../../../../model/api/common/code-name-entity';
import {Employee} from '../../../../model/api/administration/employee';
import {Stock} from '../../../../model/api/administration/stock';
import {Location as NgLocation} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {AssetHttpService} from '../../../../services/http/assets/asset.http.service';
import {EmployeeHttpService} from '../../../../services/http/administration/employee.http.service';
import {CostCenterHttpService} from '../../../../services/http/administration/cost-center.http.service';
import {StockHttpService} from '../../../../services/http/administration/stock.http.service';
import {NotificationService} from '../../../../services/notification.service';
import {HttpClient} from '@angular/common/http';
import {Param} from '../../../../model/common/param';
import {AppUtils} from '../../../../common/app.utils';
import {CostCenter} from '../../../../model/api/administration/cost-center';
import {CreateAssetSAPResult} from '../../../../model/api/result/create-asset-SAP-result';


@Component({
  selector: 'app-asset-sap-operation-dialog',
  templateUrl: './asset-add-from-stock-dialog.component.html',
  styleUrls: ['./asset-add-from-stock-dialog.component.scss']
})
export class AssetAddFromStockDialogComponent implements AfterViewInit {

  
  

  @ViewChild('employeeDetail') public employeeDetail: EmployeeDetailComponent;
  @ViewChild('employeeList') public employeeList: EmployeeListComponent;
  @ViewChild('employeeDetailModal') public employeeDetailModal: ModalDirective;
  @ViewChild('employeeListModal') public employeeListModal: ModalDirective;

  @ViewChild('costCenterDetail') public costCenterDetail: CostCenterDetailComponent;
  @ViewChild('costCenterList') public costCenterList: CostCenterListComponent;
  @ViewChild('costCenterDetailModal') public costCenterDetailModal: ModalDirective;
  @ViewChild('costCenterListModal') public costCenterListModal: ModalDirective;

  @ViewChild('stockList') public stockList: StockListComponent;

  public asset: AddStockAsset = new AddStockAsset();
  public isSaved: boolean = true;
  public checkUniqueSN = false;
  public showStock = false;

  // public _subCategory: SubCategory | null = null;
  // public get subCategory(): SubCategory | null { return this._subCategory; }
  // public set subCategory(value: SubCategory) {
  //   this._subCategory = value;
  // }

  public get allowSaving(): boolean {
    return this.asset != null &&
      this.checkUniqueSN &&
      //this.subCategory != null 
      this.asset.name2 != null && this.asset.name2.trim().length > 0;
  }
  
  // //public subCategory: SubCategory = null;
  public costCenter: CodeNameEntity = null;
  public employee: Employee = null;
  public stock: Stock = null;
  public initialInvNo: string = '';

  constructor(
    public ngLocation: NgLocation,
    public route: ActivatedRoute,
    public router: Router,
    public assetHttpService: AssetHttpService,
    public employeeHttpService: EmployeeHttpService,
    public costCenterHttpService: CostCenterHttpService,
    
    public stockHttpService: StockHttpService,
    private notificationService : NotificationService,
    public http: HttpClient) {
  }

  ngAfterViewInit() {
  }

 


  /*begin employee*/
  public selectEmployee() {
    this.employeeList.refresh(null);
    this.employeeListModal.show();
  }

  public setSelectedEmployee() {
    const items: Array<Employee> = this.employeeList.selectedItems;
    this.employee = ((items != null) && (items.length === 1)) ? items[0] : null;
    this.employeeListModal.hide();
  }

  public employeeAddCanceled() {
    this.employeeDetailModal.hide();
  }
  /*end employee*/

  /* begin costcenter */

  public selectCostCenter() {
    // const params = new Array<Param>();
    // params.push(new Param('fromStock', 'true'));
    this.costCenterList.refresh(null);
    this.costCenterListModal.show();
  }
  public setSelectedCostCenter() {
    const items: Array<CostCenter> = this.costCenterList.selectedItems;
    this.costCenter = ((items != null) && (items.length === 1)) ? items[0] : null;
    this.costCenterListModal.hide();
  }

  public costCenterAddCanceled() {
    this.costCenterDetailModal.hide();
  }

  /*end costcenter */


  public cancelChanges() {
    // this.ngLocation.back();
    this.router.navigate(['/asset/inuse']);
  }

  public saveAsset() {
    this.isSaved = false;
    // this.asset.costCenterId = this.costCenter != null ? this.costCenter.id : null;
    // this.asset.employeeId = this.employee != null ? this.employee.id : null;
    this.asset.name = this.stock != null ? this.stock.name : this.asset.name;
    this.asset.name2 = this.asset.name2;
    //this.asset.subCategoryId = this.subCategory != null ? this.subCategory.id : null;
    this.asset.stockId = this.stockList.selectedItems.length > 0 ? this.stockList.selectedItems[0].id : 0;


    this.assetHttpService.addAssetStock(this.asset)
      .subscribe((result: CreateAssetSAPResult) => {
        // console.log(JSON.stringify(result));
        // if (result.meta.code === 200) {
        //     this.notifyService.showSuccess(result.data.return_Message, result.data.asset);
        //     this.router.navigate(['/asset/inuse']);
        // } else if (result.meta.code === 400) {
        //     this.notifyService.showError('', 'Eroare salvare date.Motiv: ' + result.errors[0].meta.original_sap_response);
        // }
        if (result.success) {
          this.notificationService.showSuccess('Operatia a fost finalizata cu success!', 'Adaugare asset din stock', 0, false, 0);
          this.router.navigate(['/asset/stockit']);
        } else if (!result.success) {
          this.notificationService.showError('Motiv: ' + result.errorMessage + '!', 'Eroare salvare date', 0, false, 0);
        }
      });
  }

  public checkUniqueSerialNumber(event: any) {
    console.log(this.asset.serialNumber);
    if (this.asset != null && this.asset.serialNumber !== '' && this.asset.serialNumber != null && this.asset.serialNumber !== undefined && this.asset.serialNumber.trim().length > 3) {
      this.checkUniqueSN = false;
      this.assetHttpService.checkUniqueSerialNumber(this.asset.serialNumber)
        .subscribe((result: any) => {
          console.log(JSON.stringify(result));
          if (!result) {
            this.notificationService.showSuccess('OK', 'Verificare unicitate serie', 0, false, 0);
            this.checkUniqueSN = true;
          } else if (result) {
            this.notificationService.showError('NOT OK', 'Verificare unicitate serie', 0, false, 0);
            this.checkUniqueSN = false;
          }
        });
    } else {
      this.notificationService.showInfo('Lungimea seriei este prea scurta pentru verificare!', 'Verificare unicitate serie', 0, false, 0);
      return;
    }
  }

  public onStockListSelectionChanged(assetOpDetails: Array<any>) {
    this.stock = this.stockList.selectedItem != null ? this.stockList.selectedItem : null;
    this.asset.name2 = this.stock != null ? this.stock.longName : '';
  }

  // getStockByCategoryID() {
  //   this.showStock = false;
  //   const categoryCode = this.subCategory != null && this.subCategory.category != null ? this.subCategory.category.code : 'NOCODE';
  //   this.assetHttpService.getStockByCategoryID(categoryCode).subscribe( (res) => {
  //     // console.log(JSON.stringify(res));
  //     if (res) {
  //       this.showStock = true;
  //       const params = new Array<Param>();
  //       params.push(new Param('categoryIds', AppUtils.getIdsList<CodeNameEntity, number>([ this.category != null  ? this.category : null ])));
  //       params.push(new Param('showStock', this.showStock === true ? 'true' : 'false'));
  //       this.stockList.refresh(params);
  //     }
  //   });
  // }
}
