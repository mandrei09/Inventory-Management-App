import { AppConfig } from './../../../config';
import { EmployeeHttpService } from './../../../services/http/administration/employee.http.service';
import { Component, EventEmitter, ViewChild, ElementRef, Output, ViewContainerRef } from '@angular/core';
import { Param } from '../../../model/common/param';
import { AssetCategory } from '../../../model/api/assets/asset-category';
import { Employee } from '../../../model/api/administration/employee';
import { Location } from '../../../model/api/administration/location';
import { Room } from '../../../model/api/administration/room';
import { RegionHttpService } from '../../../services/http/administration/region.http.service';
import { LocationHttpService } from '../../../services/http/administration/location.http.service';
import { RoomDetailHttpService } from '../../../services/http/administration/room-detail.http.service';
import { Router, NavigationEnd, ActivatedRoute, Params } from '@angular/router';
import { saveAs as fileSaveAs } from 'file-saver-es';
import { AdministrationHttpService } from '../../../services/http/administration/administration.http.service';
import { Division } from '../../../model/api/administration/division';
import { Administration } from '../../../model/api/administration/administration';
import { DivisionHttpService } from '../../../services/http/administration/division.http.service';
import { AssetType } from '../../../model/api/assets/asset-type';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AssetInvFullDetailListComponent } from './asset-inv-full-detail.list';
import { InventoryList } from '../../inventory/inventory.list';
import { EmployeeListComponent } from '../../administrations/employees/employee.list';
import { AdmCenterListComponent } from '../../administrations/adm-centers/adm-center.list';
import { RegionListComponent } from '../../administrations/regions/region.list';
import { CountyListComponent } from '../../administrations/counties/county.list';
import { CityListComponent } from '../../administrations/cities/city.list';
import { LocationListComponent } from '../../administrations/locations/location.list';
import { RoomListComponent } from '../../administrations/rooms/room.list';
import { AdministrationListComponent } from '../../administrations/administrations/administration.list';
import { DivisionListComponent } from '../../administrations/divisions/division.list';
import { AssetTypeListComponent } from '../asset-types/asset-type.list';
import { AssetCategoryListComponent } from '../asset-categories/asset-category.list';
import { CompanyListComponent } from '../companies/company.list';
import { InvStateList } from '../../inventory/inv-state/inv-state.list';
import { AssetEntityListComponent } from './asset-entity.list';
import { AssetImage, EntityFile } from '../../../model/api/common/entity-file';
import { EmployeeValidate } from '../../../model/common/import/employee-validate';
import { Inventory } from '../../../model/api/inventory/inventory';
import { AdmCenter } from '../../../model/api/administration/adm-center';
import { Region } from '../../../model/api/administration/region';
import { City } from '../../../model/api/administration/city';
import { County } from '../../../model/api/administration/county';
import { AssetInvFullDetail } from '../../../model/api/assets/asset-inv-full-detail';
import { InvState } from '../../../model/api/inventory/inv-state';
import { Company } from '../../../model/api/assets/company';
import { AppData } from '../../../app-data';
import { AssetHttpService } from '../../../services/http/assets/asset.http.service';
import { AssetTypeHttpService } from '../../../services/http/assets/asset-type.http.service';
import { AssetCategoryHttpService } from '../../../services/http/assets/asset-category.http.service';
import { EntityFileHttpService } from '../../../services/http/common/entity-file.http.service';
import { AdmCenterHttpService } from '../../../services/http/administration/adm-center.http.service';
import { InventoryHttpService } from '../../../services/http/inventory/inventory.http.service';
import { CompanyHttpService } from '../../../services/http/assets/company.http.service';
import { CountyHttpService } from '../../../services/http/administration/county.http.service';
import { CityHttpService } from '../../../services/http/administration/city.http.service';
import { InvStateHttpService } from '../../../services/http/inventory/inv-state.http.service';
import { IdentityService } from '../../../services/identity.service';
import { DocumentTypeHttpService } from '../../../services/http/documents/document-type.http.service';
import { TableItem } from '../../../model/common/table-item';
import { DocumentType } from '../../../model/api/documents/document-type';
import { AppUtils } from '../../../common/app.utils';

@Component({
    selector: 'asset-inventory-employee-validate-manage',
    templateUrl: 'asset-inventory-employee-validate.manage.html',
    styleUrls: ['asset-inventory-employee-validate.manage.scss'],
    providers: [IdentityService]
})
export class AssetInventoryEmployeeValidateManage  {

    @ViewChild('assetInvFullDetailList') public assetInvFullDetailList: AssetInvFullDetailListComponent;

    @ViewChild('departmentsModal') public departmentsModal: ModalDirective;
    @ViewChild('confirmationModal') public confirmationModal: ModalDirective;

    @ViewChild('inventoryList') public inventoryList: InventoryList;
    @ViewChild('inventoryListModal') public inventoryListModal: ModalDirective;

    @ViewChild('employeeList') public employeeList: EmployeeListComponent;
    @ViewChild('employeeListModal') public employeeListModal: ModalDirective;

    @ViewChild('admCenterList') public admCenterList: AdmCenterListComponent;
    @ViewChild('admCenterListModal') public admCenterListModal: ModalDirective;


    @ViewChild('regionList') public regionList: RegionListComponent;
    @ViewChild('regionListModal') public regionListModal: ModalDirective;

    @ViewChild('countyList') public countyList: CountyListComponent;
    @ViewChild('countyListModal') public countyListModal: ModalDirective;

    @ViewChild('cityList') public cityList: CityListComponent;
    @ViewChild('cityListModal') public cityListModal: ModalDirective;


    @ViewChild('locationList') public locationList: LocationListComponent;
    @ViewChild('locationListModal') public locationListModal: ModalDirective;


    @ViewChild('roomList') public roomList: RoomListComponent;
    @ViewChild('roomListModal') public roomListModal: ModalDirective;

    @ViewChild('administrationList') public administrationList: AdministrationListComponent;
    @ViewChild('administrationListModal') public administrationListModal: ModalDirective;

    @ViewChild('divisionList') public divisionList: DivisionListComponent;
    @ViewChild('divisionListModal') public divisionListModal: ModalDirective;

    @ViewChild('assetTypeList') public assetTypeList: AssetTypeListComponent;
    @ViewChild('assetTypeListModal') public assetTypeListModal: ModalDirective;

    @ViewChild('assetCategoryList') public assetCategoryList: AssetCategoryListComponent;
    @ViewChild('assetCategoryListModal') public assetCategoryListModal: ModalDirective;

    @ViewChild('companyList') public companyList: CompanyListComponent;
    @ViewChild('companyListModal') public companyListModal: ModalDirective;

    @ViewChild('invStateList') public invStateList: InvStateList;
    @ViewChild('invStateListModal') public invStateListModal: ModalDirective;

    @ViewChild('assetEntityListModal') assetEntityListModal: ModalDirective;
    @ViewChild('assetEntityList') assetEntityList: AssetEntityListComponent;

    @ViewChild('fileInput') fileInput: ElementRef;
    @ViewChild('uploadModal') public uploadModal: ModalDirective;

    @ViewChild('imageListModal') public imageListModal: ModalDirective;


    @Output() public uploadFinished = new EventEmitter<void>();
    public operationType: number = OperationType.NotSet;
    public documentTypes: Array<DocumentType> = new Array<DocumentType>();
    public imageCount: number = 0;
    public imageIndex: number = 0;
    public imageLoading: boolean = false;
    public assetImages: Array<AssetImage> = new Array<AssetImage>();
    public assetFiles: Array<EntityFile> = new Array<EntityFile>();
    public existingAssetImages: Array<AssetImage> = new Array<AssetImage>();
    public assetToUpdate = new Array<EmployeeValidate>();
    public assetToAllUpdate = new Array<EmployeeValidate>();
    public selectedEmployee: Employee = null;
    public selectedLocation: Location = null;
    public selectedRoom: Room = null;

    public confirmationMessage: string = 'Confirmati intreaga lista ?';

    public filter: string = '';
    public smallPageSize: number = 5;
    public largePageSize: number = 10;

    public reportTypeCode: string = 'ALL';
    public reportChangeTypeCode: string = 'ALL';
    public assetStateCode: string = 'ALL';
    public reportTypeName: string = 'Toate';
    public reportChangeTypeName: string = 'Toate';
    public assetStateName: string = 'Stari gestiune';
    public custody: string = '-';
    public isPrinted: string = '-';
    public isDuplicate: string = '-';
    public isPrintedTemp: string = '-';
    public isDuplicateTemp: string = '-';
    public documentType: string = 'Transferuri';
    public showFilters: boolean = true;
    public showSearchButtoIconClass: string = 'fa fa-search-minus';

    public pageSizeUpdatedEvent: EventEmitter<number> = new EventEmitter<number>();
    // public requestInvCompOpRefreshEvent: EventEmitter<Array<Param>> = new EventEmitter<Array<Param>>();
    // public requestInvCompDetailRefreshEvent: EventEmitter<Array<Param>> = new EventEmitter<Array<Param>>();
    public selectedInventory: Inventory = null;
    public selectedEmployeesFin: Array<Employee> = new Array<Employee>();
    public selectedAdmCentersFin: Array<AdmCenter> = new Array<AdmCenter>();
    public selectedRegionsFin: Array<Region> = new Array<Region>();
    public selectedLocationsFin: Array<Location> = new Array<Location>();
    public selectedCitiesFin: Array<City> = new Array<City>();
    public selectedCountiesFin: Array<County> = new Array<County>();
    public selectedRoomsFin: Array<Room> = new Array<Room>();
    public selectedDivisionsFin: Array<Division> = new Array<Division>();
    public selectedAdministrationsFin: Array<Administration> = new Array<Administration>();
    public selectedAssetTypes: Array<AssetType> = new Array<AssetType>();
    public selectedAssetCategories: Array<AssetCategory> = new Array<AssetCategory>();
    public selectedAssets: Array<AssetInvFullDetail> = new Array<AssetInvFullDetail>();
    public selectedCompanies: Array<Company> = new Array<Company>();

    public selectedInvStatesFin: Array<InvState> = new Array<InvState>();
    public selectedAsset: AssetInvFullDetail = null;
    public isReconcile: string = '-';
    public filtersType: string = '';
    public allowLabel: string = '-';
    public get isAdmin(): boolean { return AppData.UserIsAdmin; }

    public get notScannedViewMode(): boolean { return (this.reportTypeCode === 'NOT_SCANNED'); }
    public get showFinalFilters(): boolean { return (this.reportTypeCode !== 'NOT_SCANNED'); }

    // public showDepartmentDetails: boolean = AppConfig.SHOW_DEPARTMENT_DETAILS;
    public get useAdmCenter(): boolean { return AppConfig.USE_ADM_CENTER; }
    public get useDepartment(): boolean { return AppConfig.USE_DEPARTMENT; }
    public get useRegion(): boolean { return AppConfig.USE_REGION; }
    public get useEmployee(): boolean { return AppConfig.USE_EMPLOYEE; }
    public get useRoom(): boolean { return AppConfig.USE_ROOM; }
    public get useAdministration(): boolean { return AppConfig.USE_ADMINISTRATION; }
    public get useAssetType(): boolean { return AppConfig.USE_ASSETTYPE; }
    public get useAssetCategory(): boolean { return AppConfig.USE_ASSETCATEGORY; }
    public useAssetStates: boolean= AppConfig.USE_ASSET_STATE;
    public fileEvent: any = null;
    public selectedDocumentType: DocumentType = null;
    guid: string = '';

    constructor(
        public router: Router,
        public assetHttpService: AssetHttpService,
        public administrationDetailHttpService: AdministrationHttpService,
        public assetTypeHttpService: AssetTypeHttpService,
        public assetCategoryHttpService: AssetCategoryHttpService,
        public entityFileHttpService: EntityFileHttpService,
        public admCenterHttpService: AdmCenterHttpService,
        public inventoryHttpService: InventoryHttpService,
        public divisionHttpService: DivisionHttpService,
        public locationHttpService: LocationHttpService,
        public regionHttpService: RegionHttpService,
        public roomDetailHttpService: RoomDetailHttpService,
        public employeeHttpService: EmployeeHttpService,
        public companyHttpService: CompanyHttpService,
        public countyHttpService: CountyHttpService,
        public cityHttpService: CityHttpService,
        public invStateHttpService: InvStateHttpService,
        public identityHttpService: IdentityService,
        public documentTypeHttpService: DocumentTypeHttpService,
        public route: ActivatedRoute) {
             // console.log('constructor');
             this.route.params.subscribe((params: Params) => {
                if (params['id']) {
                    this.guid = params['id'];

                    // this.refreshAssets();
                }
            });

            // this.router.events.subscribe((evt) => {
            //     if (evt instanceof NavigationEnd) {
            //         if (evt.urlAfterRedirects === '/employeevalidates/' + this.guid) {
            //             this.refreshAssets();
            //         }
            //     }
            // });


    }

    ngAfterViewInit() {
            // this.documentTypeHttpService.getDetailByParentCode('INVENTORYASSET').subscribe((res: any) => { this.documentTypes = res; });
            // this.checkForRefresh();
            // this.clearFilters();
            setTimeout(() => {
                 this.clearFilters();
            }, 3000);
    }


    ngOnInit() {
    }

    public selectAsset() {
        this.assetEntityListModal.show();
        this.assetEntityList.refresh(null);
    }

    public setSelectedAsset() {
        // this.selectedAsset = this.assetEntityList.selectedItem;
        if (this.assetEntityList.selectedItems.length > 0) {

            if (this.assetInvFullDetailList.TableItems.length > 0) {
                const result = this.assetInvFullDetailList.TableItems.filter(a => a.item.id == this.assetEntityList.selectedItems[0].id);

                if (result.length === 0) {
                   this.assetInvFullDetailList.TableItems.push(new TableItem(this.assetEntityList.selectedItem, true));
                }
            } else {
                this.assetInvFullDetailList.TableItems.push(new TableItem(this.assetEntityList.selectedItem, true));
            }



        }
        this.assetEntityListModal.hide();
    }


    public onAssetListCancel() {
        this.assetEntityListModal.hide();
    }

    public clearSelectedAsset() {
        this.assetInvFullDetailList.TableItems.push(new TableItem(this.assetEntityList.selectedItem, true));
    }

    public onAllowLabelUpdate(allowLabel: string) {
        this.allowLabel = allowLabel;
        this.checkForRefresh();
    }

    public onDocumentTypeUpdate(documentTypeId: number, documentTypeName: string) {

        if (documentTypeId !== -1) {
            this.selectedDocumentType = new DocumentType(documentTypeId, documentTypeName, documentTypeName, 'INVENTORYASSET', '', true, '', '');
        } else {
            this.selectedDocumentType = null;
        }

        this.documentType = documentTypeName;
        this.checkForRefresh();
    }


    public saveValidated(){

        this.assetToUpdate = new Array<EmployeeValidate>();
        //this.assetToUpdate.asetIds = new Array<number>();
        //this.assetToUpdate.accepted = new Array<boolean>();
        //this.assetToUpdate.reason = new Array<string>();

        this.assetInvFullDetailList.TableItems.forEach(element => {
            this.assetToUpdate.push(new EmployeeValidate(element.item.id, element.item.isMinus, element.item.infoMinus, this.guid));
        });

        // this.assetInvFullDetailList.selectedItems.forEach(element => {

        //     // let index = this.assetToUpdate.filter(a => a.assetId == element.assetId);

        //     // if (index.length < 1) {
        //     //     this.assetToUpdate.push(element.id, element.isMinus, element.infoMinus);
        //     //     // this.assetToUpdate.accepted.push(element.isMinus);
        //     //     // this.assetToUpdate.reason.push(element.infoMinus);
        //     // }

        //     console.log(JSON.stringify(element.invNo));

        //     this.assetToUpdate.push(new EmployeeValidate(element.id, element.isMinus, element.infoMinus));


        // });
        // console.log(JSON.stringify(this.assetToUpdate));
        this.assetHttpService.employeeValidate(this.assetToUpdate).subscribe((res) => {

            if (res.statusCode === 200){
                alert('Validation completed successfully!');
            }else{
                alert('Validation error!');
            }

            this.checkForRefresh();
        }, (error) => {
            alert('Server error!');
        });

        // alert(JSON.stringify(this.assetToUpdate));
    }


    public saveValidatedAll(){

        this.operationType = OperationType.EmployeeValidateAll;
        this.confirmationModal.show();




        // alert(JSON.stringify(this.assetToUpdate));
    }

    validateAll() {
        this.assetHttpService.employeeValidateAll(this.guid).subscribe((res) => {

            if (res.statusCode === 200){
                alert('Validarea a fost finalizata cu success!');
            }else{
                alert('Eroare validare!');
            }

            this.checkForRefresh();
        }, (error) => {
            alert('Eroare server!');
        });
    }


    public onConfirmationApproved() {

        switch (this.operationType) {
            case OperationType.EmployeeValidate:
                this.saveValidated();
                break;
            case OperationType.EmployeeValidateAll:
                this.validateAll();
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

    public onAssetInvFullDetailSelectionChanged(assets: Array<AssetInvFullDetail>) {

        this.selectedAsset = ((assets != null) && (assets.length === 1)) ? assets[0] : null;
    }

    onAssetEmployeeValidateListAfterViewInit() {
        // setTimeout(() => {
        //     this.refreshAssets();
        // }, 100);
    }

    public clearSelection() {
        this.selectedAssets = new Array<AssetInvFullDetail>();
        this.assetInvFullDetailList.selectedItems = this.selectedAssets;
    }

   /* begin inventory */
    public selectInventory() {
        this.inventoryListModal.show();
        this.inventoryList.selectedItems = new Array<Inventory>();
        this.inventoryList.refresh(null);
    }

    public setSelectedInventory() {
        this.selectedInventory = this.inventoryList.selectedItems != null && this.inventoryList.selectedItems.length > 0 ? this.inventoryList.selectedItems[0] : null;
        this.inventoryListModal.hide();
        this.checkForRefresh();
    }
    /* end inventory */

      /* begin employee */
      public selectEmployees(filtersType: string) {
        this.filtersType = filtersType;
        let selectedEmployees: Array<Employee> = null;

        switch (this.filtersType) {
            case 'FIN':
                selectedEmployees = this.selectedEmployeesFin;
                this.employeeListModal.show();
                this.employeeList.selectedItems = selectedEmployees;
                this.employeeList.refresh(null);
                break;
            default:
                break;
        }
    }

    public removeFromEmployeeSelection(filtersType: string, employee: Employee) {
        let selectedEmployees: Array<Employee> = null;

        switch (filtersType) {
            case 'FIN':
                selectedEmployees = this.selectedEmployeesFin;
                break;
            default:
                 break;
        }
        let index: number = selectedEmployees.indexOf(employee);
        selectedEmployees.splice(index, 1);
        this.checkForRefresh(filtersType);
    }

    public clearEmployeeSelection(filtersType: string) {
        switch (filtersType) {
            case 'FIN':
                this.selectedEmployeesFin = new Array<Employee>();
                break;
            default:
                break;
        }

        this.checkForRefresh(filtersType);
    }

    public setSelectedEmployees(filtersType: string) {
        switch (this.filtersType) {
            case 'FIN':
                this.selectedEmployeesFin = this.employeeList.selectedItems;
                this.employeeListModal.hide();
                break;
            default:
                break;
        }

        this.checkForRefresh(this.filtersType);
    }

    /*end employee*/

  /* begin admcenter */
  public selectAdmCenters(filtersType: string) {
    this.filtersType = filtersType;

    let selectedAdmCenters: Array<AdmCenter> = null;

    let selectedRegions: Array<Region> = null;
    selectedRegions = this.selectedRegionsFin;
    let params = new Array<Param>();
    params.push(new Param("regionIds", AppUtils.getIdsList<Region, number>(selectedRegions)));

    switch (this.filtersType) {
        case 'FIN':
            selectedAdmCenters = this.selectedAdmCentersFin;
            this.admCenterListModal.show();
            this.admCenterList.selectedItems = selectedAdmCenters;
            this.admCenterList.refresh(null);
            break;
        default:
            break;
    }
}

public removeFromAdmCenterSelection(filtersType: string, admCenter: AdmCenter) {
    let selectedAdmCenters: Array<AdmCenter> = null;

    switch (filtersType) {
        case 'FIN':
            selectedAdmCenters = this.selectedAdmCentersFin;
            break
        default:
            break;
    }

    let index: number = selectedAdmCenters.indexOf(admCenter);
    selectedAdmCenters.splice(index, 1);
    this.checkForRefresh(filtersType);
}

public clearAdmCenterSelection(filtersType: string) {
    switch (filtersType) {
        case 'FIN':
            this.selectedAdmCentersFin = new Array<AdmCenter>();
            break;
        default:
            break;
    }

    this.checkForRefresh(filtersType);
}

public setSelectedAdmCenters() {
    switch (this.filtersType) {
        case 'FIN':
            this.selectedAdmCentersFin = this.admCenterList.selectedItems;
            this.admCenterListModal.hide();
            break;
        default:
            break;
    }

    this.checkForRefresh(this.filtersType);
}
/* end admcenter */


   /* begin region */
   public selectRegions(filtersType: string) {
    this.filtersType = filtersType;

    let selectedRegions: Array<Region> = null;


    switch (this.filtersType) {
        case 'FIN':
            selectedRegions = this.selectedRegionsFin;
            this.regionListModal.show();
            this.regionList.selectedItems = selectedRegions;
            this.regionList.refresh(null);
            break;
        default:
            break;
    }

}

public removeFromRegionSelection(filtersType: string, region: Region) {
    let selectedRegions: Array<Region> = null;

    switch (filtersType) {
        case 'FIN':
            selectedRegions = this.selectedRegionsFin;
            break;
        default:
             break;
    }
    let index: number = selectedRegions.indexOf(region);
    selectedRegions.splice(index, 1);
    this.checkForRefresh(filtersType);
}

public clearRegionSelection(filtersType: string) {
    switch (filtersType) {
        case 'FIN':
            this.selectedRegionsFin = new Array<Region>();
            break;
        default:
            break;
    }

    this.checkForRefresh(filtersType);
}

public setSelectedRegions() {
    switch (this.filtersType) {
        case 'FIN':
            this.selectedRegionsFin = this.regionList.selectedItems;
            this.regionListModal.hide();
            break;
        default:
            break;
    }

    this.checkForRefresh(this.filtersType);
}
    /* end region */

    /* COUNTIES */
  public selectCounties(filtersType: string) {
    this.filtersType = filtersType;

    let selectedCounties: Array<County> = null;

    switch (this.filtersType) {
        case 'FIN':
            selectedCounties = this.selectedCountiesFin;
            break;
        default:
            break;
    }


    this.countyListModal.show();
    this.countyList.selectedItems = selectedCounties;
    this.locationList.refresh(null);
}

public removeFromCountySelection(filtersType: string, county: County) {
    let selectedCounties: Array<County> = null;

    switch (filtersType) {
        case 'FIN':
            selectedCounties = this.selectedCountiesFin;
            break;
        default:
            break;
    }
    let index: number = selectedCounties.indexOf(county);
    selectedCounties.splice(index, 1);
    this.checkForRefresh(filtersType);
}

public clearCountySelection(filtersType: string) {
    switch (filtersType) {
        case 'FIN':
            this.selectedCountiesFin = new Array<County>();
            break;
        default:
            break;
    }

    this.checkForRefresh(filtersType);
}

public setSelectedCounties() {
    switch (this.filtersType) {
        case 'FIN':
            this.selectedCountiesFin = this.countyList.selectedItems;
            break;
        default:
            break;
    }

    this.countyListModal.hide();
    this.checkForRefresh(this.filtersType);
}
/* COUNTIES */

  /* CITY */
  public selectCities(filtersType: string) {
    this.filtersType = filtersType;

    let selectedCounties: Array<County> = null;
    let selectedCities: Array<City> = null;

    switch (this.filtersType) {
        case 'FIN':
            selectedCities = this.selectedCitiesFin;
            selectedCounties = this.selectedCountiesFin;
            break;
        default:
            break;
    }

    let params = new Array<Param>();
    params.push(new Param('countyIds', AppUtils.getIdsList<County, number>(selectedCounties)));


    this.cityListModal.show();
    this.cityList.selectedItems = selectedCities;
    this.cityList.refresh(params);
}

public removeFromCitySelection(filtersType: string, city: City) {
    let selectedCities: Array<City> = null;

    switch (filtersType) {
        case 'FIN':
            selectedCities = this.selectedCitiesFin;
            break;
        default:
            break;
    }
    let index: number = selectedCities.indexOf(city);
    selectedCities.splice(index, 1);
    this.checkForRefresh(filtersType);
}

public clearCitySelection(filtersType: string) {
    switch (filtersType) {
        case 'FIN':
            this.selectedCitiesFin = new Array<City>();
            break;
        default:
            break;
    }

    this.checkForRefresh(filtersType);
}

public setSelectedCities() {
    switch (this.filtersType) {
        case 'FIN':
            this.selectedCitiesFin = this.cityList.selectedItems;
            break;
        default:
            break;
    }

    this.cityListModal.hide();
    this.checkForRefresh(this.filtersType);
}
/* CITY */

/* begin location */
public selectLocations(filtersType: string) {
    this.filtersType = filtersType;

    let selectedCities: Array<City> = null;
    let selectedLocations: Array<Location> = null;
    let selectedAdmCenters: Array<AdmCenter> = null;

    let params = new Array<Param>();

    switch (this.filtersType) {
        case 'FIN':
            selectedLocations = this.selectedLocationsFin;
            selectedCities = this.selectedCitiesFin;
            selectedAdmCenters = this.selectedAdmCentersFin;
            params.push(new Param('cityIds', AppUtils.getIdsList<City, number>(selectedCities)));
            // params.push(new Param('regionIds', AppUtils.getIdsList<Region, number>(selectedRegionsFin)));
            params.push(new Param("admCenterIds", AppUtils.getIdsList<AdmCenter, number>(selectedAdmCenters)));
            // params.push(new Param("companyIds", AppUtils.getIdsList<Company, number>(selectedCompaniesFin)));

            this.locationListModal.show();
            this.locationList.selectedItems = selectedLocations;
            this.locationList.refresh(params);
            break;
        default:
            break;
    }

}

public removeFromLocationSelection(filtersType: string, location: Location) {
    let selectedLocations: Array<Location> = null;

    switch (filtersType) {
        case 'FIN':
            selectedLocations = this.selectedLocationsFin;
            break;
        default:
             break;
    }
    let index: number = selectedLocations.indexOf(location);
    selectedLocations.splice(index, 1);
    this.checkForRefresh(filtersType);
}

public clearLocationSelection(filtersType: string) {
    switch (filtersType) {
        case 'FIN':
            this.selectedLocationsFin = new Array<Location>();
            break;
        default:
            break;
    }

    this.checkForRefresh(filtersType);
}

public setSelectedLocations() {
    switch (this.filtersType) {
        case 'FIN':
            this.selectedLocationsFin = this.locationList.selectedItems;
            this.locationListModal.hide();
            break;
        default:
            break;
    }
    this.checkForRefresh(this.filtersType);
}
/* end location */

    /* begin Division */
    public selectDivisions(filtersType: string) {
        this.filtersType = filtersType;

        let selectedDivisions: Array<Division> = null;

        switch (this.filtersType) {
            case 'FIN':
                selectedDivisions = this.selectedDivisionsFin;
                break;
           default:
                break;
        }

        let params = new Array<Param>();

        this.divisionListModal.show();
        this.divisionList.selectedItems = selectedDivisions;
        this.divisionList.refresh(params);
    }

    public removeFromDivisionSelection(filtersType: string, division: Division) {
        let selectedDivisions: Array<Division> = null;

        switch (filtersType) {
            case 'FIN':
                selectedDivisions = this.selectedDivisionsFin;
                break;
            default:
                break;
        }
        let index: number = selectedDivisions.indexOf(division);
        selectedDivisions.splice(index, 1);
        this.checkForRefresh(filtersType);
    }

    public clearDivisionSelection(filtersType: string) {
        switch (filtersType) {
            case 'FIN':
                this.selectedDivisionsFin = new Array<Division>();
                break;
            default:
                break;
        }

        this.checkForRefresh(filtersType);
    }

    public setSelectedDivisions() {
        switch (this.filtersType) {
            case 'FIN':
                this.selectedDivisionsFin = this.divisionList.selectedItems;
                break;
            default:
                break;
        }

        this.divisionListModal.hide();
        this.checkForRefresh(this.filtersType);
    }
    /* end division */

    /* begin room */
    public selectRooms(filtersType: string) {
        this.filtersType = filtersType;

        let selectedLocationsIni: Array<Location> = null;
        let selectedLocationsFin: Array<Location> = null;
        let selectedLocationsAll: Array<Location> = null;
        let selectedLocationsNi: Array<Location> = null;
        let selectedRooms: Array<Room> = null;
        let params = new Array<Param>();

        switch (this.filtersType) {
            case 'FIN':
                selectedRooms = this.selectedRoomsFin;
                selectedLocationsFin = this.selectedLocationsFin;
                params.push(new Param('locationIds', AppUtils.getIdsList<Location, number>(selectedLocationsFin)));
                this.roomListModal.show();
                this.roomList.selectedItems = this.selectedRoomsFin;
                this.roomList.refresh(params);
                break;
            default:
                break;
        }

    }

    public removeFromRoomSelection(filtersType: string, room: Room) {

        let selectedRooms: Array<Room> = null;
        // let list: Array<Room> = filtersType === 'INI' ? this.selectedRoomsIni : filtersType === 'NI' ?
        // this.selectedRoomsNi :  filtersType === 'ALL' ? this.selectedRoomsAll : this.selectedRoomsFin;

        switch (filtersType) {
            case 'FIN':
            selectedRooms = this.selectedRoomsFin;
                break;
            default:
                break;
        }
        let index: number = selectedRooms.indexOf(room);
        selectedRooms.splice(index, 1);
        this.checkForRefresh(filtersType);
    }

    public clearRoomSelection(filtersType: string) {

        switch (filtersType) {
            case 'FIN':
                this.selectedRoomsFin = new Array<Room>();
                break;
            default:
                break;
        }

        this.checkForRefresh(filtersType);
    }

    public setSelectedRooms() {

            switch (this.filtersType) {
                case 'FIN':
                    this.selectedRoomsFin = this.roomList.selectedItems;
                    this.roomListModal.hide();
                    break;
                default:
                    break;
            }

        this.checkForRefresh(this.filtersType);
    }
    /* end room */

     /* begin AssetState */
     public selectInvStates(filtersType: string) {
        this.filtersType = filtersType;

        let selectedInvStates: Array<InvState> = null;
        let selectedInvStatesNi: Array<InvState> = null;

        switch (this.filtersType) {
            case 'FIN':
                selectedInvStates = this.selectedInvStatesFin;
                this.invStateListModal.show();
                this.invStateList.selectedItems = selectedInvStates;
                this.invStateList.refresh(null);
                break;
          default:
               break;
        }

    }

    public removeFromInvStateSelection(filtersType: string, assetState: InvState) {

        let selectedInvStates: Array<InvState> = null;
        let selectedInvStatesNi: Array<InvState> = null;

        switch (filtersType) {
            case 'FIN':
                selectedInvStates = this.selectedInvStatesFin;
                let indexFin: number = selectedInvStates.indexOf(assetState);
                selectedInvStates.splice(indexFin, 1);
                this.checkForRefresh(filtersType);
                break;
           default:
                break;
        }

    }

    public clearInvStateSelection(filtersType: string) {

        switch (filtersType) {
            case 'FIN':
                this.selectedInvStatesFin = new Array<InvState>();
                break;
           default:
                break;
        }

        this.checkForRefresh(filtersType);
    }

    public setSelectedInvStates() {

        switch (this.filtersType) {
            case 'FIN':
                this.selectedInvStatesFin = this.invStateList.selectedItems;
                this.invStateListModal.hide();
                this.checkForRefresh(this.filtersType);
                break;
            default:
                break;
        }

    }
          /* end Administration */

     /* begin Administration */
     public selectAdministrations(filtersType: string) {
        this.filtersType = filtersType;

      //  let selectedRegions: Array<Region> = null;
        let selectedDivisions: Array<Division> = null;
        let selectedAdministrations: Array<Administration> = null;

        switch (this.filtersType) {
            case 'FIN':
                selectedDivisions = this.selectedDivisionsFin;
               // selectedRegions = this.selectedRegionsFin;
                selectedAdministrations = this.selectedAdministrationsFin;
                break;
          default:
               break;
        }

        let params = new Array<Param>();
      //  params.push(new Param('regionIds', AppUtils.getIdsList<Region, number>(selectedRegions)));
        params.push(new Param('divisionIds', AppUtils.getIdsList<Division, number>(selectedDivisions)));

        this.administrationListModal.show();
        this.administrationList.selectedItems = selectedAdministrations;
        this.administrationList.refresh(params);
    }

    public removeFromAdministrationSelection(filtersType: string, administration: Administration) {

        let selectedAdministrations: Array<Administration> = null;

        switch (filtersType) {
            case 'FIN':
            selectedAdministrations = this.selectedAdministrationsFin;
                break;
           default:
                break;
        }
        let index: number = selectedAdministrations.indexOf(administration);
        selectedAdministrations.splice(index, 1);
        this.checkForRefresh(filtersType);
    }

    public clearAdministrationSelection(filtersType: string) {

        switch (filtersType) {
            case 'FIN':
                this.selectedAdministrationsFin = new Array<Administration>();
                break;
           default:
                break;
        }

        this.checkForRefresh(filtersType);
    }

    public setSelectedAdministrations() {

        switch (this.filtersType) {
            case 'FIN':
                this.selectedAdministrationsFin = this.administrationList.selectedItems;
                break;
            default:
                break;
        }

        this.administrationListModal.hide();
        this.checkForRefresh(this.filtersType);
    }
          /* end Administration */


         /* begin AssetType */
         public selectAssetTypes() {

            let selectedAssetTypes: Array<AssetType> = null;

            selectedAssetTypes = this.selectedAssetTypes;

            let params = new Array<Param>();

            this.assetTypeListModal.show();

            this.assetTypeList.selectedItems = selectedAssetTypes;
            this.assetTypeList.refresh(params);
        }

        public removeFromAssetTypeSelection(assetType: AssetType) {
            let list: Array<AssetType> = this.selectedAssetTypes;
            let index: number = list.indexOf(assetType);
            list.splice(index, 1);
            this.checkForRefresh();
        }

        public clearAssetTypeSelection() {

            this.selectedAssetTypes = new Array<AssetType>();
            this.checkForRefresh();
        }

        public setSelectedAssetTypes() {

            this.selectedAssetTypes = this.assetTypeList.selectedItems;

            this.assetTypeListModal.hide();
            this.checkForRefresh(this.filtersType);
        }
        /* end AssetType */

            /* begin AssetCategory */
            public selectAssetCategories() {
            let selectedAssetCategories: Array<AssetCategory> = null;
            selectedAssetCategories = this.selectedAssetCategories;

            this.assetCategoryListModal.show();
            this.assetCategoryList.selectedItems = selectedAssetCategories;
            this.assetCategoryList.refresh(null);
        }

        public removeFromAssetCategorySelection(assetCategory: AssetCategory) {
            let list: Array<AssetCategory> = this.selectedAssetCategories;
            let index: number = list.indexOf(assetCategory);
            list.splice(index, 1);
            this.checkForRefresh();
        }
        public clearAssetCategorySelection() {

                this.selectedAssetCategories = new Array<AssetCategory>();
            this.checkForRefresh();
        }

        public setSelectedAssetCategories() {
            this.selectedAssetCategories = this.assetCategoryList.selectedItems;
            this.assetCategoryListModal.hide();
            this.checkForRefresh();
        }
        /* end AssetCategory *





        /*end ASSET CLASSIFICATION */


    public onCustodyUpdate(custody: string) {
        this.custody = custody;
        this.checkForRefresh();
    }

    public onToolbarButtonClicked(button: string) {
        this.showFilters = !this.showFilters;
        this.showSearchButtoIconClass = this.showFilters ? 'fa fa-search-minus' : 'fa fa-search-plus';
    }

    public checkForRefresh(filtersType?: string) {
        this.refreshAssets();
    }

    public refreshAssets() {
        let params: Array<Param> = this.getFilters();
        this.assetInvFullDetailList.refresh(params);
    }

    public getFilters(): Array<Param> {
        let params = new Array<Param>();

        // const token = localStorage.getItem('id_token');
        // const tokenPayload = decode(token);
        // const userId = tokenPayload.sub;

        params.push(new Param('inventoryId', this.selectedInventory != null ? this.selectedInventory.id.toString() : '5'));

        params.push(new Param('documentTypeId', this.selectedDocumentType != null ? this.selectedDocumentType.id.toString() : '0'));
        params.push(new Param('filter', this.filter));
        params.push(new Param('userId', this.guid));
        params.push(new Param('reportType', this.reportTypeCode));
        params.push(new Param('custody', ((this.custody === '-') ? 'null' : (this.custody === 'YES' ? 'true' : 'false'))));
        params.push(new Param('allowLabel', ((this.allowLabel === '-') ? 'null' : (this.allowLabel === 'DA' ? 'true' : 'false'))));
        return params;
    }


    public showPhoto(type: string){

        this.imageListModal.show();
            switch (type) {
                case 'ASSET':
                    this.refreshEntityFiles(this.assetInvFullDetailList.selectedItem.id, true);
                    break;
                default:
                    break;
            }
    }

    public refreshLocationsEntityFiles(assetId: number, loadAssetImages: boolean) {
        this.entityFileHttpService.getByEntity('LOCATION', assetId, '', 0)
        .subscribe((entityFiles: Array<EntityFile>) => {
            this.existingAssetImages.splice(0, this.existingAssetImages.length);
            this.assetImages.forEach((assetImage: AssetImage) => this.existingAssetImages.push(assetImage));
            this.assetImages.splice(0, this.assetImages.length);
            this.assetFiles.splice(0, this.assetFiles.length);
            // this.entityFileMemoryDataSource.clear();
            entityFiles.forEach((entityFile: EntityFile) => {
                if (entityFile.fileType.startsWith('image/')) {
                    let fileContent: any = null;
                    this.existingAssetImages.forEach((assetImage: AssetImage) => {
                        if (assetImage.entityFile.id === entityFile.id) {
                            fileContent = assetImage.fileContent;
                        }
                    });
                    this.assetImages.push(new AssetImage(entityFile, fileContent));
                }
                else {
                    this.assetFiles.push(entityFile);
                    // this.entityFileMemoryDataSource.addItem(entityFile);
                }
            });
            // this.fileList.refresh(null);
            if (loadAssetImages) this.loadAssetImages();
        });
    }

    public clearFilters() {

        this.selectedAssetTypes = new Array<AssetType>();
        this.selectedCompanies = new Array<Company>();
        this.selectedAssetCategories = new Array<AssetCategory>();
        this.selectedAdmCentersFin = new Array<AdmCenter>();
        this.selectedEmployeesFin = new Array<Employee>();
        this.selectedRegionsFin = new Array<Region>();
        this.selectedCountiesFin = new Array<County>();
        this.selectedCitiesFin = new Array<City>();
        this.selectedLocationsFin = new Array<Location>();
        this.selectedRoomsFin = new Array<Room>();
        this.selectedDivisionsFin = new Array<Division>();
        this.selectedAdministrationsFin = new Array<Administration>();
        this.selectedInvStatesFin = new Array<InvState>()
        this.filter = '';


        this.checkForRefresh();
    }

            public exportAll() {

                let params: Array<Param> = null;

                params = this.getFilters();
                this.assetHttpService
                    .exportAll(params)
                    .subscribe((blob) => {
                fileSaveAs(blob, 'Lista inventar 2020.xlsx');
            });
            }

    public refreshEntityFiles(assetId: number, loadAssetImages: boolean) {
                this.entityFileHttpService.getByEntity('ASSET', assetId, '', 0)
                .subscribe((entityFiles: Array<EntityFile>) => {
                    this.existingAssetImages.splice(0, this.existingAssetImages.length);
                    this.assetImages.forEach((assetImage: AssetImage) => this.existingAssetImages.push(assetImage));
                    this.assetImages.splice(0, this.assetImages.length);
                    this.assetFiles.splice(0, this.assetFiles.length);
                    // this.entityFileMemoryDataSource.clear();
                    entityFiles.forEach((entityFile: EntityFile) => {
                        if (entityFile.fileType.startsWith('image/')) {
                            let fileContent: any = null;
                            this.existingAssetImages.forEach((assetImage: AssetImage) => {
                                if (assetImage.entityFile.id === entityFile.id) {
                                    fileContent = assetImage.fileContent;
                                }
                            });
                            this.assetImages.push(new AssetImage(entityFile, fileContent));
                        }
                        else {
                            this.assetFiles.push(entityFile);
                            // this.entityFileMemoryDataSource.addItem(entityFile);
                        }
                    });
                   // this.fileList.refresh(null);
                    if (loadAssetImages) this.loadAssetImages();
                });
            }

    public loadAssetImages() {
                if ((this.assetImages !== null) && (this.assetImages.length > 0)) {
                    this.imageCount = this.assetImages.length;
                    this.imageIndex = 0;
                    this.imageLoading = true;
                    this.loadAssetImageLoop();
                }
            }

    public loadAssetImageLoop() {
                if (this.assetImages.length > this.imageIndex) {
                    let assetImage: AssetImage = this.assetImages[this.imageIndex];
                    if (assetImage.fileContent === null) {
                        this.entityFileHttpService.download(assetImage.entityFile.id).subscribe((image) => {
                            this.createImageFromBlob(assetImage, image);
                            this.loadNextAssetImage();
                        });
                    }
                    else {
                        this.loadNextAssetImage();
                    }
                }
            }

    public createImageFromBlob(assetImage: AssetImage, image: Blob) {
                let reader = new FileReader();
                reader.addEventListener('load', () => {
                   // this.images.push(reader.result);
                   assetImage.fileContent = reader.result;
                   console.log(assetImage);
                }, false);
                if (image) {
                   reader.readAsDataURL(image);
                }
            }

    public loadNextAssetImage() {
                if (this.imageIndex < (this.assetImages.length - 1)) {
                    this.imageIndex++;
                    this.loadAssetImageLoop();
                }
                else {
                    this.imageLoading = false;
                }
            }

            public showInventoryList() :void {
                let url: string = '';
                let internalCode: string = '';

                // console.log(this.empIntCode);

                internalCode = this.guid;

                url = `${AppConfig.reportingServer}Report.aspx/?report=employeeReport&reportType=employeeReport&internalCode=${internalCode}`;

                window.open(url);
              }
}



enum OperationType {
    NotSet = 1,
    EmployeeValidate = 2,
    EmployeeValidateAll = 3
}
