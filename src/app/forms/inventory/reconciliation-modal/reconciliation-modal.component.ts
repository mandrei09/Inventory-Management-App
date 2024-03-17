import {Component, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Lightbox} from 'ngx-lightbox';
import {Dimension} from '../../../model/api/administration/dimension';
import {Uom} from '../../../model/api/assets/uom';
import {AssetHttpService} from '../../../services/http/assets/asset.http.service';
import {Asset} from '../../../model/api/assets/asset';
import {AssetState} from '../../../model/api/assets/asset-state';
import {Room} from '../../../model/api/administration/room';
import {City} from '../../../model/api/administration/city';
import {County} from '../../../model/api/administration/county';
import {Company} from '../../../model/api/assets/company';
import {DialogService} from '../../../services/dialog.service';
import {NotificationService} from '../../../services/notification.service';
import {AssetInvFullDetail} from '../../../model/api/assets/asset-inv-full-detail';
import {AssetInvTempDetail} from '../../../model/api/assets/asset-inv-temp-detail-list';
import {AssetNi} from '../../../model/api/assets/asset-ni';
import {OfferMaterialHttpService} from '../../../services/http/administration/offer-material.http.service';
import {Param} from '../../../model/common/param';
import {AssetInvFullDetailListComponent} from '../../assets/assets/asset-inv-full-detail.list';
import {AppUtils} from '../../../common/app.utils';
import {CostCenter} from '../../../model/api/administration/cost-center';
import {Division} from '../../../model/api/administration/division';
import {Department} from '../../../model/api/administration/department';
import {Location} from '../../../model/api/administration/location';
import {InvState} from '../../../model/api/inventory/inv-state';
import {ApplicationUser} from '../../../model/api/identity/inventory-user';
import {Inventory} from '../../../model/api/inventory/inventory';
import {ConfirmReconciliationModalComponent} from '../../../common/confirm-reconciliation-modal/confirm-reconciliation-modal.component';

@Component({
  selector: 'app-reconciliation-modal',
  templateUrl: './reconciliation-modal.component.html',
  styleUrls: ['./reconciliation-modal.component.scss']
})
export class ReconciliationModalComponent {

  public pageCode: string = 'page_assets_component';
  public selectedInventoryDetail: Asset | null = null;

  // @ViewChild('assetInvFullDetailListTemp') assetInvFullDetailListTemp: AssetInvFullDetailListTemp;
  @ViewChild('assetInvFullDetailListTemp') public assetInvTempDetailListTemp: AssetInvFullDetailListComponent;

  public item!: Asset | null;
  public inventoryId: number = 10;
  public assetId: number = 0;

  public notIdentifiedFilter: string = '';
  public selectedInventory: Inventory = null;

  private assetInvNos: Array<string> = new Array<string>();
  private isReconcile: string = '-';
  private filtersType: string = '';

  private selectedAsset: AssetInvFullDetail | null = null;
  private selectedAssetTemp: AssetInvTempDetail | null = null;
  private selectedAssetNi: AssetNi | null = null;

  private reportTypeCode: string = 'ALL';
  protected operationType: number = OperationType.NotSet;

  isColumnChecked = false;
  showUploadedImages = false;
  extendedSearch = false;
  album: any = [];

  public conditionType: string = 'SI';
  public wordMinLength: number = 3;
  public selectedCostCentersNi: Array<CostCenter> = new Array<CostCenter>();
  public selectedDivisionsNi: Array<Division> = new Array<Division>();
  public selectedDepartmentsNi: Array<Department> = new Array<Department>();
  public selectedCountiesNi: Array<County> = new Array<County>();
  public selectedCitiesNi: Array<City> = new Array<City>();
  public selectedLocationsNi: Array<Location> = new Array<Location>();
  public selectedInvStatesNi: Array<InvState> = new Array<InvState>();
  public selectedUserTemps: Array<ApplicationUser> = new Array<ApplicationUser>();
  public selectedUomTemps: Array<Uom> = new Array<Uom>();
  public selectedDimensionTemps: Array<Dimension> = new Array<Dimension>();
  public selectedCompanyNis: Array<Company> = new Array<Company>();
  public isPrintedTemp: string = '-';
  public isDuplicateTemp: string = '-';

  public letterCount: number = 0;
  public wordCount: number = 0;
  public minWordLength: number = 0;
  public searchFilter = '';
  public filter: string = '';

  public get allowReconciliation(): boolean { return ((this.reportTypeCode === 'NOT_SCANNED') && (this.selectedAsset != null) && (this.selectedAssetTemp != null)); }

  // public assetsTempList!: AssetTempMatTable;
  // @ViewChild(AssetTempMatTable) set setAssetsTempList(assetsTempList: AssetTempMatTable) {
  //   this.assetsTempList = assetsTempList;
  //   this.refreshAssetsTempList();
  // }

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  public _companies: Company[] = [];
  public get companies(): Company[] { return this._companies; }
  public set companies(value: Company[]) {
    this._companies = value;
    this.refreshAssetsTempList();
  }

  public _counties: County[] = [];
  public get counties(): County[] { return this._counties; }
  public set counties(value: County[]) {
    this._counties = value;
    this.refreshAssetsTempList();
  }

  public _cities: City[] = [];
  public get cities(): City[] { return this._cities; }
  public set cities(value: City[]) {
    this._cities = value;
    this.refreshAssetsTempList();
  }

  public _shops: Room[] = [];
  public get shops(): Room[] { return this._shops; }
  public set shops(value: Room[]) {
    this._shops = value;
    this.refreshAssetsTempList();
  }

  public _states: AssetState[] = [];
  public get states(): AssetState[] { return this._states; }
  public set states(value: AssetState[]) {
    this._states = value;
    this.refreshAssetsTempList();
  }

  public _uoms: Uom[] = [];
  public get uoms(): Uom[] { return this._uoms; }
  public set uoms(value: Uom[]) {
    this._uoms = value;
    this.refreshAssetsTempList();
  }

  public _types: Dimension[] = [] ;
  public get types(): Dimension[] { return this._types; }
  public set types(value: Dimension[]) {
    this._types = value;
    this.refreshAssetsTempList();
  }

  public _users: any[] = [];
  public get users(): any[] { return this._users; }
  public set users(value: any[]) {
    this._users = value;
    this.refreshAssetsTempList();
  }

  public _condition: string = 'AND';
  // @ts-ignore
  public get condition(): string | null { return this._condition; }
  public set condition(value: string) {
    this._condition = value;
    this.refreshAssetsTempList();
  }

  private _assetState: string | undefined;
  public get assetState(): string | undefined { return this._assetState; }
  public set assetState(value: string | undefined) {
    this._assetState = value;
    this.refreshAssetsTempList();
  }

  constructor(
    public dialog: MatDialog,
    public assetsTempProvider: AssetHttpService,
    public assetsProvider: AssetHttpService,
    public assetHttpService: AssetHttpService,
    public offerMaterialHttpService: OfferMaterialHttpService,
    public assetsNiProvider: AssetHttpService,
    private dialogService: DialogService,
    private notificationSvc: NotificationService,
    private _lightbox: Lightbox,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.inventoryId  = data.inventoryId;
    this.assetId      = data.assetId;
    this.item         = data.asset;

    this.selectedAsset            = data.asset;
    this.selectedAssetTemp        = data.assetTemp;
    this.selectedInventoryDetail  = data.inventory;
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    // tslint:disable-next-line:no-non-null-assertion
    this.assetsProvider.getById(this.assetId!).subscribe((item: Asset) => {
      this.item = item;
    });
  }

  public refreshAssetsTempList() {
    // const params: Array<Param> = new Array<Param>();
    // const assetTempFilters: AssetTempFilter = this.getAssetTempFilter();
    //
    // this.assetsTempList.assetTempFilters = assetTempFilters;
    //
    // this.assetsTempList.resetFilters(params);
    // this.assetsTempList.refresh(params);
  }

  onClearFilters() {
    // @ts-ignore
    this.searchFilter = '';
    this.companies = [];
    this.counties = [];
    this.cities = [];
    this.shops = [];
    this.states = [];
    this.uoms = [];
    this.types = [];
    this.users = [];
    this.assetState = undefined;
  }

  public getAssetTempFilter(): any {
    // const filter: string | undefined;
    // const reportType: string | undefined;
    // const assetState: string | undefined;
    // const inventoryId: number | undefined;
    // const conditionType: string | undefined;
    // const employeeIds: string[] | undefined;
    // const countyIds: string[] | undefined;
    // const cityIds: string[] | undefined;
    // const locationIds: string[] | undefined;
    // const invStateIds: string[] | undefined;
    // const userIds: string[] | undefined;
    // const companyIds: string[] | undefined;
    // const departmentIds: string[] | undefined;
    // const uomIds: string[] | undefined;
    // const dimensionIds: string[] | undefined;
    // const roomIds: string[] | undefined;
    // const custody: boolean | undefined;
    // const printed: boolean | undefined;
    // const duplicate: boolean | undefined;
    //
    // let assetTempFilter: AssetTempFilter;
    //
    // // @ts-ignore
    // // if (this.companies !== null) { companyIds = JSON.stringify(this.companies.map(p => p.id.toString())); }
    // // // @ts-ignore
    // // if (this.counties) { countyIds = JSON.stringify(this.counties.map(p => p.id.toString())); }
    // // // @ts-ignore
    // // if (this.cities !== null) { cityIds = JSON.stringify(this.cities.map(p => p.id.toString())); }
    // // // @ts-ignore
    // // if (this.shops !== null) { roomIds = JSON.stringify(this.shops.map(p => p.id.toString())); }
    // // // @ts-ignore
    // // if (this.states !== null) { assetState = JSON.stringify(this.states.map(p => p.id.toString())); }
    // // // @ts-ignore
    // // if (this.uoms !== null) { uomIds = JSON.stringify(this.uoms.map(p => p.id.toString())); }
    // // // @ts-ignore
    // // if (this.types !== null) { dimensionIds = JSON.stringify(this.types.map(p => p.id.toString())); }
    // // // @ts-ignore
    // // if (this.users !== null) { userIds = JSON.stringify(this.users.map(p => p.id.toString())); }
    // //
    // // if (this.inventoryId !== null) { inventoryId = this.inventoryId; }
    // // if (this.condition !== null) { conditionType = this.condition; }
    // // if (this.searchFilter !== '') { filter = this.searchFilter.toString(); }
    // // if (this.assetState !== null) { assetState = this.assetState; }
    //
    // assetTempFilter = new AssetTempFilter(
    //   filter,
    //   reportType,
    //   assetState,
    //   inventoryId,
    //   conditionType,
    //   employeeIds,
    //   countyIds,
    //   cityIds,
    //   locationIds,
    //   invStateIds,
    //   userIds,
    //   companyIds,
    //   departmentIds,
    //   uomIds,
    //   dimensionIds,
    //   roomIds,
    //   custody,
    //   printed,
    //   duplicate,
    // );
    //
    // return assetTempFilter;
  }

  open(index: number): void {
    this._lightbox.open(this.album, index);
  }

  close(): void {
    this._lightbox.close();
  }

  checkColumn(row: any): void {
    // console.log(row);
    this.isColumnChecked = true;
  }

  showImagesBox() {
    this.showUploadedImages = !this.showUploadedImages;
  }

  extendSearch() {
    // this.extendedSearch = !this.extendedSearch;
    // this.refreshInventoryDetailList();
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit() {
    //
  }
  onWordChanged($event: any) {
    // // this.wordCount = parseInt(filter.target.value, 10);
    this.wordCount = $event.value;
    // this.refreshAssetsTempList();
    this.refreshNotIdentified();
  }

  onLetterChanged($event: any) {
    this.letterCount = $event.value;
    this.refreshAssetsTempList();
  }

  onMinimumChanged($event: any) {
    this.wordMinLength = $event.value;
    this.refreshAssetsTempList();
  }

  public updateConditionType($event: any) {
    this.conditionType = $event.value;
    this.refreshNotIdentified();
  }

  onValueChange(value: any) {
    this.searchFilter = value.target.value;
    this.filter = value.target.value;
    this.refreshAssetsTempList();
  }

  public onInventoryDetailSelectionChanged(selectedItems: Array<any>) {
    this.selectedInventoryDetail = (selectedItems.length === 1) ? selectedItems[0] : null;
  }

  public onReconcile() {
    this.operationType = OperationType.Reconciliation;

    this.dialogService
      .confirmDialog({
        title: 'Confirm Action',
        message: 'Reconciliati inregistrarile selectate?',
        confirmCaption: 'Confirm',
        cancelCaption: 'Cancel',
      })
      .subscribe((confirmed: any) => {
        if (confirmed) {
          this.onReconciliationAction();
        } else {
          // this.onConfirmationCanceled();
        }
      });
  }

  private onReconciliationAction() {
    const dialogRef = this.dialog.open(ConfirmReconciliationModalComponent, { panelClass: 'centered-middle-modal', height: '225px', width: '25%',
      data: {
        operationType:  this.operationType,
        inventoryId:    this.inventoryId,
        asset:          this.item,
        assetTemp:      this.assetInvTempDetailListTemp.selectedItems[0]
      }
    });

    dialogRef.afterClosed().subscribe(item => {
      if (item !== null) {
          // this.dialogRef.close(item);
        this.checkForRefresh();
        this.refreshNotIdentified();
      }
    });
  }

  private checkForRefresh(filtersType?: string) {
    if ((filtersType) && (filtersType === 'NI')) {
      this.refreshNotIdentified();
    } else {
      // this.assetsTempList.refreshItems();
    }
  }

  public refreshNotIdentified() {
    let params: Array<Param> = this.getNotIdentifiedFilters();

    if(this.assetInvTempDetailListTemp !== undefined) {
      this.assetInvTempDetailListTemp.refresh(params);
    }

    // this.assetNiList.refresh(params);
  }

  public doSimpleSearch(filter: string) {
    // if ((filter != null) && (filter != undefined) && (filter.length > 0)) {
    const params: Array<Param> = new Array<Param>();
    params.push(new Param('filter', filter));
    this.refreshNotIdentified();
    // this.assetInvFullDetailListTemp.emit(params);
    // }
  }

  public getSearchFilters(filter: string, wordCount: number, letterCount: number, wordMinLength: number): string[] {
    let result: Array<string> = new Array<string>();
    let filters: string[] = null;

    filter = filter.replace('-', ' ').replace('+', ' ').replace('.', ' ').replace(',', ' ').replace('/', ' ').replace('\\', ' ');
    while (filter.includes('  ')) filter = filter.replace('  ', ' ');
    filters = filter.split(' ');

    // console.log('filters: ' + JSON.stringify(filters));

    filters.forEach((f) => {
      if ((f.length >= wordMinLength) && ((wordCount <= 0) || (result.length < wordCount))) {
        result.push(letterCount > 0 ? (f.length <= letterCount ? f : f.substring(0, letterCount)) : f);
      }
    });

    return result;
  }

  public getNotIdentifiedFilters(): Array<Param> {
    let params = new Array<Param>();
    let filters: string[] = this.getSearchFilters(this.notIdentifiedFilter, this.wordCount, this.letterCount, this.wordMinLength);

    params.push(new Param('inventoryId', JSON.stringify(this.selectedInventory != null ? this.selectedInventory.id : 14)));
    params.push(new Param('filters', JSON.stringify(filters)));
    params.push(new Param('costCenterIds', AppUtils.getIdsList<CostCenter, number>(this.selectedCostCentersNi)));
    params.push(new Param('divisionIds', AppUtils.getIdsList<Division, number>(this.selectedDivisionsNi)));
    params.push(new Param('departmentIds', AppUtils.getIdsList<Department, number>(this.selectedDepartmentsNi)));
    params.push(new Param('countyIds', AppUtils.getIdsList<County, number>(this.selectedCountiesNi)));
    params.push(new Param('cityIds', AppUtils.getIdsList<City, number>(this.selectedCitiesNi)));
    params.push(new Param('locationIds', AppUtils.getIdsList<Location, number>(this.selectedLocationsNi)));
    params.push(new Param('invStateIds', AppUtils.getIdsList<InvState, number>(this.selectedInvStatesNi)));
    params.push(new Param('conditionType', this.conditionType));
    params.push(new Param('userIds', AppUtils.getIdsList<ApplicationUser, number>(this.selectedUserTemps)));
    params.push(new Param('uomIds', AppUtils.getIdsList<Uom, number>(this.selectedUomTemps)));
    params.push(new Param('dimensionIds', AppUtils.getIdsList<Dimension, number>(this.selectedDimensionTemps)));
    params.push(new Param('companyIds', AppUtils.getIdsList<Company, number>(this.selectedCompanyNis)));

    params.push(new Param('printed', ((this.isPrintedTemp === '-') ? 'null' : (this.isPrintedTemp === 'DA' ? 'true' : 'false'))));
    params.push(new Param('duplicate', ((this.isDuplicateTemp === '-') ? 'null' : (this.isDuplicateTemp === 'DA' ? 'true' : 'false'))));

    return params;
  }
}

enum OperationType {
  NotSet = 1,
  Reconciliation = 2,
  Transfer = 3,
  CancelScanned = 4,
  RecoverTemp = 5,
  CancelTempScanned = 6
}
