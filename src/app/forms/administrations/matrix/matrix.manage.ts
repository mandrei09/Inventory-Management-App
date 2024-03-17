import { Param } from './../../../model/common/param';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { CostCenter } from '../../../model/api/administration/cost-center';
import { CostCenterHttpService } from '../../../services/http/administration/cost-center.http.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AdministrationListComponent } from '../administrations/administration.list';
import { AssetTypeHttpService } from '../../../services/http/assets/asset-type.http.service';
import { CountryHttpService } from '../../../services/http/administration/contry.http.service';
import { CompanyHttpService } from '../../../services/http/assets/company.http.service';
import { ProjectHttpService } from '../../../services/http/assets/project.http.service';
import { Matrix } from '../../../model/api/administration/matrix';
import { MatrixDetailComponent } from './matrix.detail';
import { MatrixListComponent } from './matrix.list';
import { AssetTypeListComponent } from '../../assets/asset-types/asset-type.list';
import { CountryListComponent } from '../countries/country.list';
import { ProjectList } from '../../assets/projects/project.list';
import { AssetType } from '../../../model/api/assets/asset-type';
import { Country } from '../../../model/api/administration/country';
import { Company } from '../../../model/api/assets/company';
import { Project } from '../../../model/api/assets/project';
import { MatrixHttpService } from '../../../services/http/administration/matrix.http.service';
import { AreaHttpService } from '../../../services/http/administration/area.http.service';
import { AreaListComponent } from '../areas/area.list';
import { CostCenterListComponent } from '../cost-centers/cost-center.list';
import { Area } from '../../../model/api/administration/area';
import { MatrixLevelHttpService } from '../../../services/http/administration/matrix-level.http.service';
import { MatrixLevelListComponent } from '../matrix-level/matrix-level.list';
import { AppUtils } from '../../../common/app.utils';
import alasql from 'alasql';
import { MatrixImport } from '../../../model/common/import/matrix-import';
import { Employee } from '../../../model/api/administration/employee';
import { EmployeeListComponent } from '../employees/employee.list';
import { EmployeeHttpService } from '../../../services/http/administration/employee.http.service';
import { EmployeeResource } from '../../../model/api/administration/employee-resource';
import { DivisionHttpService } from '../../../services/http/administration/division.http.service';
import { CompanyListComponent } from '../../assets/companies/company.list';
import { DivisionListComponent } from '../divisions/division.list';
import { Division } from '../../../model/api/administration/division';
import {MatrixAddEditComponent} from './matrix-add-edit/matrix-add-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { saveAs as fileSaveAs } from 'file-saver-es';


@Component({
    selector: 'app-matrix-manage',
    templateUrl: 'matrix.manage.html',
    providers: [ AreaHttpService, AssetTypeHttpService, CountryHttpService, CompanyHttpService, CostCenterHttpService, ProjectHttpService, DivisionHttpService ]
})
export class MatrixManageComponent extends GenericManage<Matrix, number> {

    @ViewChild('matrixDetail') public matrixDetail: MatrixDetailComponent;
    @ViewChild('matrixList') public matrixList: MatrixListComponent;
    @ViewChild('matrixDetailModal') matrixDetailModal: ModalDirective;
    // @ViewChild('areaListModal') areaListModal: ModalDirective;
    // @ViewChild('areaList') public areaList: AreaListComponent;
    // @ViewChild('assetTypeListModal') assetTypeListModal: ModalDirective;
    // @ViewChild('assetTypeList') public assetTypeList: AssetTypeListComponent;
    // @ViewChild('countryListModal') countryListModal: ModalDirective;
    // @ViewChild('countryList') public countryList: CountryListComponent;
    @ViewChild('companyListModal') companyListModal: ModalDirective;
    @ViewChild('companyList') companyList: CompanyListComponent;
    @ViewChild('divisionListModal') divisionListModal: ModalDirective;
    @ViewChild('divisionList') divisionList: DivisionListComponent;
    // @ViewChild('costCenterListModal') costCenterListModal: ModalDirective;
    // @ViewChild('costCenterList') costCenterList: CostCenterListComponent;
    // @ViewChild('projectListModal') projectListModal: ModalDirective;
    // @ViewChild('projectList') projectList: ProjectList;

    @ViewChild('employeeL1List') public employeeL1List: EmployeeListComponent;
    @ViewChild('employeeL1ListModal') public employeeL1ListModal: ModalDirective;

    @ViewChild('employeeL2List') public employeeL2List: EmployeeListComponent;
    @ViewChild('employeeL2ListModal') public employeeL2ListModal: ModalDirective;

    @ViewChild('employeeL3List') public employeeL3List: EmployeeListComponent;
    @ViewChild('employeeL3ListModal') public employeeL3ListModal: ModalDirective;

    @ViewChild('employeeL4List') public employeeL4List: EmployeeListComponent;
    @ViewChild('employeeL4ListModal') public employeeL4ListModal: ModalDirective;

    @ViewChild('employeeS1List') public employeeS1List: EmployeeListComponent;
    @ViewChild('employeeS1ListModal') public employeeS1ListModal: ModalDirective;

    @ViewChild('employeeS2List') public employeeS2List: EmployeeListComponent;
    @ViewChild('employeeS2ListModal') public employeeS2ListModal: ModalDirective;

    @ViewChild('employeeS3List') public employeeS3List: EmployeeListComponent;
    @ViewChild('employeeS3ListModal') public employeeS3ListModal: ModalDirective;

    // @ViewChild('matrixLevelListModal') public matrixLevelListModal: ModalDirective;
    // @ViewChild('matrixLevelList') public matrixLevelList: MatrixLevelListComponent;

    @ViewChild('confirmationModal') public confirmationModal: ModalDirective;

    @ViewChild('uploadModal') public uploadModal: ModalDirective;

    @ViewChild('fileInputMatrix') fileInputMatrix: ElementRef;
    @ViewChild('importDataMatrixModal') public importDataMatrixModal: ModalDirective;

    public importMatrixLines: Array<MatrixImport> = new Array<MatrixImport>();

    public noOfItems: number = 0;
    public importIndex: number = 0;

    public fileEventMatrix: any = null;

    public filter: string = '';
    // public selectedArea: Area = null;
    // public selectedAssetType: AssetType = null;
    // public selectedCountry: Country = null;
    public selectedCompany: Company = null;
    public selectedDivision: Division = null;
    // public selectedCostCenter: CostCenter = null;
    // public selectedProject: Project = null;



    // public selectedEmployeeL1: Employee = null;
    // public selectedEmployeeL2: Employee = null;
    // public selectedEmployeeL3: Employee = null;
    // public selectedEmployeeL4: Employee = null;
    // public selectedEmployeeS1: Employee = null;
    // public selectedEmployeeS2: Employee = null;
    // public selectedEmployeeS3: Employee = null;


    public selectedL1Employees: Array<Employee> = new Array<Employee>();
    public selectedL2Employees: Array<Employee> = new Array<Employee>();
    public selectedL3Employees: Array<Employee> = new Array<Employee>();
    public selectedL4Employees: Array<Employee> = new Array<Employee>();
    public selectedS1Employees: Array<Employee> = new Array<Employee>();
    public selectedS2Employees: Array<Employee> = new Array<Employee>();
    public selectedS3Employees: Array<Employee> = new Array<Employee>();
    public selectedProjects: Array<Project> = new Array<Project>();
    public selectedCostCenters: Array<CostCenter> = new Array<CostCenter>();
    public selectedDivisions: Array<Division> = new Array<Division>();

    public selectedMatrixLevel: any;
    public confirmationMessage: string = '';
    public operationType: OperationType = OperationType.NotSet;

    public _divisions: Division[] = [];
    public get divisions(): Division[] { return this._divisions; }
    public set divisions(value: Division[]) {
      this._divisions = value;
      this.selectedDivisions = value;
      this.setSelectedDivisions(value);

      this.refresh();
    }

    public _selectedEmployeeL1: Employee = null;
    public get selectedEmployeeL1(): Employee { return this._selectedEmployeeL1; }
    public set selectedEmployeeL1(value: Employee) {
      this._selectedEmployeeL1 = value;

      this.refresh();
    }

    public _selectedEmployeeL2: Employee = null;
    public get selectedEmployeeL2(): Employee { return this._selectedEmployeeL2; }
    public set selectedEmployeeL2(value: Employee) {
      this._selectedEmployeeL2 = value;

      this.refresh();
    }

    public _selectedEmployeeL3: Employee = null;
    public get selectedEmployeeL3(): Employee { return this._selectedEmployeeL3; }
    public set selectedEmployeeL3(value: Employee) {
      this._selectedEmployeeL3 = value;

      this.refresh();
    }

    public _selectedEmployeeL4: Employee = null;
    public get selectedEmployeeL4(): Employee { return this._selectedEmployeeL4; }
    public set selectedEmployeeL4(value: Employee) {
      this._selectedEmployeeL4 = value;

      this.refresh();
    }

    public _selectedEmployeeS1: Employee = null;
    public get selectedEmployeeS1(): Employee { return this._selectedEmployeeS1; }
    public set selectedEmployeeS1(value: Employee) {
      this._selectedEmployeeS1 = value;

      this.refresh();
    }

    public _selectedEmployeeS2: Employee = null;
    public get selectedEmployeeS2(): Employee { return this._selectedEmployeeS2; }
    public set selectedEmployeeS2(value: Employee) {
      this._selectedEmployeeS2 = value;

      this.refresh();
    }

    public _selectedEmployeeS3: Employee = null;
    public get selectedEmployeeS3(): Employee { return this._selectedEmployeeS2; }
    public set selectedEmployeeS3(value: Employee) {
      this._selectedEmployeeS3 = value;

      this.refresh();
    }

    constructor(public costCenterHttpService: CostCenterHttpService,
                public matrixLevelHttpService: MatrixLevelHttpService,
                public areaHttpService: AreaHttpService,
                public dialog: MatDialog,
                public matrixHttpService: MatrixHttpService,
                public assetTypeHttpService: AssetTypeHttpService,
                public countryHttpService: CountryHttpService,
                public companyHttpService: CompanyHttpService,
                public employeeHttpService: EmployeeHttpService,
                public projectHttpService: ProjectHttpService,
                public divisionHttpService: DivisionHttpService) {
        super();
    }

    public addNewItem() {
        super.addNewItem();

        // this.matrixDetail.area = null;
        // this.matrixDetail.assetType = null;
        //this.matrixDetail.country = null;
        this.matrixDetail.company = null;
        this.matrixDetail.division = null;
        // this.matrixDetail.costCenter = null;
        // this.matrixDetail.project = null;
        this.matrixDetail.employeeL1 = null;
        this.matrixDetail.employeeL2 = null;
        this.matrixDetail.employeeL3 = null;
        this.matrixDetail.employeeL4 = null;
        this.matrixDetail.employeeS1 = null;
        this.matrixDetail.employeeS2 = null;
        this.matrixDetail.employeeS3 = null;
    }

    public editItem() {
        super.editItem();

        const matrix: Matrix = this.selectedItem as Matrix;

       // this.matrixDetail.assetType = null;

        // if (matrix != null && matrix.assetType != null) {
        //     this.assetTypeHttpService
        //         .getById(matrix.assetType.id)
        //         .subscribe((assetType: AssetType) => {
        //             this.matrixDetail.assetType = assetType;
        //         });
        // }

        // this.matrixDetail.area = null;

        // if (matrix != null && matrix.area != null) {
        //     this.areaHttpService
        //         .getById(matrix.area.id)
        //         .subscribe((area: Area) => {
        //             this.matrixDetail.area = area;
        //         });
        // }

        // this.matrixDetail.country = null;

        // if (matrix != null && matrix.country != null) {
        //     this.countryHttpService
        //         .getById(matrix.country.id)
        //         .subscribe((country: Country) => {
        //             this.matrixDetail.country = country;
        //         });
        // }

        this.matrixDetail.company = null;

        if ((matrix != null) && (matrix.company != null)) {
            this.companyHttpService
                .getById(matrix.company.id)
                .subscribe((company: Company) => {
                    this.matrixDetail.company = company;
                });
        }

        this.matrixDetail.division = null;

        if ((matrix != null) && (matrix.division != null)) {
            this.divisionHttpService
                .getById(matrix.division.id)
                .subscribe((division: Division) => {
                    this.matrixDetail.division = division;
                });
        }

        // this.matrixDetail.costCenter = null;

        // if ((matrix != null) && (matrix.costCenter != null)) {
        //     this.costCenterHttpService
        //         .getById(matrix.costCenter.id)
        //         .subscribe((costCenter: CostCenter) => {
        //             this.matrixDetail.costCenter = costCenter;
        //         });
        // }

        // this.matrixDetail.project = null;

        // if ((matrix != null) && (matrix.project != null)) {
        //     this.projectHttpService
        //         .getById(matrix.project.id)
        //         .subscribe((project: Project) => {
        //             this.matrixDetail.project = project;
        //         });
        // }

        this.matrixDetail.employeeL1 = null;

        if ((matrix != null) && (matrix.employeeL1 != null)) {
            this.employeeHttpService
                .getById(matrix.employeeL1.id)
                .subscribe((employeeL1: EmployeeResource) => {
                    this.matrixDetail.employeeL1 = employeeL1;
                });
        }

        this.matrixDetail.employeeL2 = null;

        if ((matrix != null) && (matrix.employeeL2 != null)) {
            this.employeeHttpService
                .getById(matrix.employeeL2.id)
                .subscribe((employeeL2: EmployeeResource) => {
                    this.matrixDetail.employeeL2 = employeeL2;
                });
        }

        this.matrixDetail.employeeL3 = null;

        if ((matrix != null) && (matrix.employeeL3 != null)) {
            this.employeeHttpService
                .getById(matrix.employeeL3.id)
                .subscribe((employeeL3: EmployeeResource) => {
                    this.matrixDetail.employeeL3 = employeeL3;
                });
        }

        this.matrixDetail.employeeL4 = null;

        if ((matrix != null) && (matrix.employeeL4 != null)) {
            this.employeeHttpService
                .getById(matrix.employeeL4.id)
                .subscribe((employeeL4: EmployeeResource) => {
                    this.matrixDetail.employeeL4 = employeeL4;
                });
        }

        this.matrixDetail.employeeS1 = null;

        if ((matrix != null) && (matrix.employeeS1 != null)) {
            this.employeeHttpService
                .getById(matrix.employeeS1.id)
                .subscribe((employeeS1: EmployeeResource) => {
                    this.matrixDetail.employeeS1 = employeeS1;
                });
        }

        this.matrixDetail.employeeS2 = null;

        if ((matrix != null) && (matrix.employeeS2 != null)) {
            this.employeeHttpService
                .getById(matrix.employeeS2.id)
                .subscribe((employeeS2: EmployeeResource) => {
                    this.matrixDetail.employeeS2 = employeeS2;
                });
        }

        this.matrixDetail.employeeS3 = null;

        if ((matrix != null) && (matrix.employeeS3 != null)) {
            this.employeeHttpService
                .getById(matrix.employeeS3.id)
                .subscribe((employeeS3: EmployeeResource) => {
                    this.matrixDetail.employeeS3 = employeeS3;
                });
        }
    }

    // public onMatrixLevelListSelectionChanged(offerMaterials: Array<any>) {
    //     this.selectedMatrixLevel = this.matrixLevelList.selectedItem;
    // }

    public onClearFilters() {
      this.divisions = new Array<Division>();
      this.selectedEmployeeL1 = null;
      this.selectedEmployeeL2 = null;
      this.selectedEmployeeL3 = null;
      this.selectedEmployeeL4 = null;
      this.selectedEmployeeS1 = null;
      this.selectedEmployeeS2 = null;
      this.selectedEmployeeS3 = null;

      this.refresh();
    }

    public detailInitialize() {
        super.detailInitialize();
        this.matrixDetailModal.show();
    }

    public detailTerminate() {
        super.detailTerminate();
        this.matrixDetailModal.hide();
    }

    // public selectArea() {
    //     this.areaListModal.show();
    //     this.areaList.refresh(null);
    // }

    // public selectAssetType() {
    //     this.assetTypeListModal.show();
    //     this.assetTypeList.refresh(null);
    // }

    // public selectCountry() {
    //     this.countryListModal.show();
    //     this.countryList.refresh(null);
    // }

    public selectCompany() {
        this.companyListModal.show();
        this.companyList.refresh(null);
    }

    public selectDivision() {
      this.divisionListModal.show();
      this.divisionList.refresh(null);
  }

    // public selectCostCenter() {
    //     this.costCenterListModal.show();
    //     this.costCenterList.refresh(null);
    // }

    // public selectProject() {
    //     this.projectListModal.show();
    //     this.projectList.refresh(null);
    // }

    public selectEmployeeL1() {
        this.employeeL1ListModal.show();
        this.employeeL1List.refresh(null);
    }

    public selectEmployeeL2() {
        this.employeeL2ListModal.show();
        this.employeeL2List.refresh(null);
    }

    public selectEmployeeL3() {
        this.employeeL3ListModal.show();
        this.employeeL3List.refresh(null);
    }

    public selectEmployeeL4() {
        this.employeeL4ListModal.show();
        this.employeeL4List.refresh(null);
    }

    public selectEmployeeS1() {
        this.employeeS1ListModal.show();
        this.employeeS1List.refresh(null);
    }

    public selectEmployeeS2() {
        this.employeeL2ListModal.show();
        this.employeeL2List.refresh(null);
    }

    public selectEmployeeS3() {
        this.employeeS3ListModal.show();
        this.employeeS3List.refresh(null);
    }

    // public onMatrixDetailAssetTypeNeeded() {
    //     this.matrixDetailModal.hide();
    //     this.selectAssetType();
    // }

    // public onAssetTypeListCancel() {
    //     this.assetTypeListModal.hide();
    //     if (this.viewMode === GenericManageViewMode.ItemDetail) {
    //         this.matrixDetailModal.show();
    //     }
    // }

    // public onMatrixDetailAreaNeeded() {
    //     this.matrixDetailModal.hide();
    //     this.selectArea();
    // }

    // public onAreaListCancel() {
    //     this.areaListModal.hide();
    //     if (this.viewMode === GenericManageViewMode.ItemDetail) {
    //         this.matrixDetailModal.show();
    //     }
    // }

    // public onMatrixDetailCountryNeeded() {
    //     this.matrixDetailModal.hide();
    //     this.selectCountry();
    // }

    // public onCountryListCancel() {
    //     this.countryListModal.hide();
    //     if (this.viewMode === GenericManageViewMode.ItemDetail) {
    //         this.matrixDetailModal.show();
    //     }
    // }

    public onAddNew() {
      this.onAddEditItem();
    }

    public onAddEditItem(item: Matrix | null = null) {
      let dialogRef = this.dialog.open(MatrixAddEditComponent, {
        panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
        data: { item: item }
      });

      dialogRef.afterClosed().subscribe((item: Matrix) => {
        if (item !== null) this.refresh();
      });
    }

    public onItemEdit(item: Matrix) {
      this.onAddEditItem(item);
    }

    public onMatrixDetailCompanyNeeded() {
        this.matrixDetailModal.hide();
        this.selectCompany();
    }

    public onCompanyListCancel() {
        this.companyListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.matrixDetailModal.show();
        }
    }


    public onMatrixDetailDivisionNeeded() {
      this.matrixDetailModal.hide();
      this.selectDivision();
  }

  public onDivisionListCancel() {
      this.divisionListModal.hide();
      if (this.viewMode === GenericManageViewMode.ItemDetail) {
          this.matrixDetailModal.show();
      }
  }


    // public onMatrixDetailCostCenterNeeded() {
    //     this.matrixDetailModal.hide();
    //     this.selectCostCenter();
    // }

    // public onCostCenterListCancel() {
    //     this.costCenterListModal.hide();
    //     if (this.viewMode === GenericManageViewMode.ItemDetail) {
    //         this.matrixDetailModal.show();
    //     }
    // }

    // public onMatrixDetailProjectNeeded() {
    //     this.matrixDetailModal.hide();
    //     this.selectProject();
    // }

    // public onProjectListCancel() {
    //     this.projectListModal.hide();
    //     if (this.viewMode === GenericManageViewMode.ItemDetail) {
    //         this.matrixDetailModal.show();
    //     }
    // }

    public onMatrixDetailEmployeeL1Needed() {
        this.matrixDetailModal.hide();
        this.selectEmployeeL1();
    }

    public onEmployeeL1ListCancel() {
        this.employeeL1ListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.matrixDetailModal.show();
        }
    }

    public onMatrixDetailEmployeeL2Needed() {
        this.matrixDetailModal.hide();
        this.selectEmployeeL2();
    }

    public onEmployeeL2ListCancel() {
        this.employeeL2ListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.matrixDetailModal.show();
        }
    }

    public onMatrixDetailEmployeeL3Needed() {
        this.matrixDetailModal.hide();
        this.selectEmployeeL3();
    }

    public onEmployeeL3ListCancel() {
        this.employeeL3ListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.matrixDetailModal.show();
        }
    }

    public onMatrixDetailEmployeeL4Needed() {
        this.matrixDetailModal.hide();
        this.selectEmployeeL4();
    }

    public onEmployeeL4ListCancel() {
        this.employeeL4ListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.matrixDetailModal.show();
        }
    }

    public onMatrixDetailEmployeeS1Needed() {
        this.matrixDetailModal.hide();
        this.selectEmployeeS1();
    }

    public onEmployeeS1ListCancel() {
        this.employeeS1ListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.matrixDetailModal.show();
        }
    }

    public onMatrixDetailEmployeeS2Needed() {
        this.matrixDetailModal.hide();
        this.selectEmployeeS2();
    }

    public onEmployeeS2ListCancel() {
        this.employeeS2ListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.matrixDetailModal.show();
        }
    }

    public onMatrixDetailEmployeeS3Needed() {
        this.matrixDetailModal.hide();
        this.selectEmployeeS3();
    }

    public onEmployeeS3ListCancel() {
        this.employeeS3ListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.matrixDetailModal.show();
        }
    }

    public getFilters(): Array<Param> {
        const params: Array<Param> = new Array<Param>();
        params.push(new Param('filter', this.filter));
        // params.push(new Param('costCenterIds', AppUtils.getIdsList<CostCenter, number>([this.selectedCostCenter])));
        // params.push(new Param('projectIds', AppUtils.getIdsList<Project, number>([this.selectedProject])));
        params.push(new Param('divisionIds', AppUtils.getIdsList<Division, number>([this.selectedDivision])));
        params.push(new Param('employeeL1Ids', AppUtils.getIdsList<Employee, number>([this.selectedEmployeeL1])));
        params.push(new Param('employeeL2Ids', AppUtils.getIdsList<Employee, number>([this.selectedEmployeeL2])));
        params.push(new Param('employeeL3Ids', AppUtils.getIdsList<Employee, number>([this.selectedEmployeeL3])));
        params.push(new Param('employeeL4Ids', AppUtils.getIdsList<Employee, number>([this.selectedEmployeeL4])));
        params.push(new Param('employeeS1Ids', AppUtils.getIdsList<Employee, number>([this.selectedEmployeeS1])));
        params.push(new Param('employeeS2Ids', AppUtils.getIdsList<Employee, number>([this.selectedEmployeeS2])));
        params.push(new Param('employeeS3Ids', AppUtils.getIdsList<Employee, number>([this.selectedEmployeeS3])));
        params.push(new Param('matrixIds', AppUtils.getIdsList<Matrix, number>([ this.matrixList.selectedItem != null ? this.matrixList.selectedItem : null ])));
        // params.push(new Param('regionIds', AppUtils.getIdsList<Region, number>([this.selectedRegion])));
        // params.push(new Param('divisionIds', AppUtils.getIdsList<Division, number>([this.selectedDivision])));
        // // params.push(new Param('employeeIds', AppUtils.getIdsList<Employee, number>([ this.selectedEmployee ])));
        // // params.push(new Param('employee2Ids', AppUtils.getIdsList<Employee, number>([ this.selectedEmployee2 ])));
        // // params.push(new Param('employee3Ids', AppUtils.getIdsList<Employee, number>([ this.selectedEmployee3 ])));
        // params.push(new Param('administrationIds', AppUtils.getIdsList<Administration, number>([ this.selectedAdministration ])));
        // params.push(new Param('roomIds', AppUtils.getIdsList<Room, number>([ this.selectedRoom ])));


        return params;
    }

    public refresh() {
        let params: Array<Param> = null;

        params = this.getFilters();
        this.matrixList.refresh(params);
        // this.matrixLevelList.refresh(params);
    }

    // public setSelectedAssetTypes() {
    //     switch (this.viewMode) {
    //         case GenericManageViewMode.ItemList:
    //             this.selectedAssetType = this.assetTypeList.selectedItem;
    //             this.assetTypeListModal.hide();
    //             this.refresh();
    //             break;
    //         case GenericManageViewMode.ItemDetail:
    //             this.matrixDetail.assetType = this.assetTypeList.selectedItem;
    //             this.assetTypeListModal.hide();
    //             this.matrixDetailModal.show();
    //             break;
    //     }
    // }

    // public unselectAssetType() {
    //     this.selectedAssetType = null;
    //     this.refresh();
    // }


    // public setSelectedAreas() {
    //     switch (this.viewMode) {
    //         case GenericManageViewMode.ItemList:
    //             this.selectedArea = this.areaList.selectedItem;
    //             this.areaListModal.hide();
    //             this.refresh();
    //             break;
    //         case GenericManageViewMode.ItemDetail:
    //             this.matrixDetail.area = this.areaList.selectedItem;
    //             this.areaListModal.hide();
    //             this.matrixDetailModal.show();
    //             break;
    //     }
    // }

    // public unselectArea() {
    //     this.selectedArea = null;
    //     this.refresh();
    // }

    // public setSelectedCountries() {
    //     switch (this.viewMode) {
    //         case GenericManageViewMode.ItemList:
    //             this.selectedCountry = this.countryList.selectedItem;
    //             this.countryListModal.hide();
    //             this.refresh();
    //             break;
    //         case GenericManageViewMode.ItemDetail:
    //             this.matrixDetail.country = this.countryList.selectedItem;
    //             this.countryListModal.hide();
    //             this.matrixDetailModal.show();
    //             break;
    //     }
    // }

    // public unselectCountry() {
    //     this.selectedCountry = null;
    //     this.refresh();
    // }


    public setSelectedCompanies() {
        switch (this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedCompany = this.companyList.selectedItem;
                this.companyListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.matrixDetail.company = this.companyList.selectedItem;
                this.companyListModal.hide();
                this.matrixDetailModal.show();
                break;
            default:
                break;
        }
    }

    public unselectCompany() {
        this.selectedCompany = null;
        this.refresh();
    }


    public setSelectedDivisions(value) {
      switch (this.viewMode) {
          case GenericManageViewMode.ItemList:
            this.selectedDivision = value[0];
            this.selectedDivisions = value;
              // this.selectedDivision = this.divisionList.selectedItem;
              // this.selectedDivisions = this.divisionList.selectedItems;
              // this.divisionListModal.hide();
              this.refresh();
              break;
          case GenericManageViewMode.ItemDetail:
              this.matrixDetail.division = value[0];
              // this.matrixDetail.division = this.divisionList.selectedItem;
              // this.divisionListModal.hide();
              // this.matrixDetailModal.show();
              break;
          default:
              break;
      }
  }

  public unselectDivision() {
      this.selectedDivision = null;
      this.refresh();
  }


    // public setSelectedCostCenter() {
    //     switch (this.viewMode) {
    //         case GenericManageViewMode.ItemList:
    //             this.selectedCostCenter = this.costCenterList.selectedItem;
    //             this.costCenterListModal.hide();
    //             this.refresh();
    //             break;
    //         case GenericManageViewMode.ItemDetail:
    //             this.matrixDetail.costCenter = this.costCenterList.selectedItem;
    //             this.costCenterListModal.hide();
    //             this.matrixDetailModal.show();
    //             break;
    //         default:
    //             break;
    //     }
    // }

    // public unselectCostCenter() {
    //     this.selectedCostCenter = null;
    //     this.refresh();
    // }

    // public setSelectedProject() {
    //     switch (this.viewMode) {
    //         case GenericManageViewMode.ItemList:
    //             this.selectedProject = this.projectList.selectedItem;
    //             this.projectListModal.hide();
    //             this.refresh();
    //             break;
    //         case GenericManageViewMode.ItemDetail:
    //             this.matrixDetail.project = this.projectList.selectedItem;
    //             this.projectListModal.hide();
    //             this.matrixDetailModal.show();
    //             break;
    //         default:
    //             break;
    //     }
    // }

    // public unselectProject() {
    //     this.selectedProject = null;
    //     this.refresh();
    // }

    public setSelectedEmployeeL1(value) {
        switch (this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedEmployeeL1 = value;
                // this.selectedEmployeeL1 = this.employeeL1List.selectedItem;
                // this.employeeL1ListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.matrixDetail.employeeL1 = value;
                // this.employeeL1ListModal.hide();
                // this.matrixDetailModal.show();
                break;
            default:
                break;
        }
    }

    public unselectEmployeeL1() {
        this.selectedEmployeeL1 = null;
        this.refresh();
    }

    public setSelectedEmployeeL2() {
        switch (this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedEmployeeL2 = this.employeeL2List.selectedItem;
                this.employeeL2ListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.matrixDetail.employeeL2 = this.employeeL2List.selectedItem;
                this.employeeL2ListModal.hide();
                this.matrixDetailModal.show();
                break;
            default:
                break;
        }
    }

    public unselectEmployeeL2() {
        this.selectedEmployeeL2 = null;
        this.refresh();
    }

    public setSelectedEmployeeL3() {
        switch (this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedEmployeeL3 = this.employeeL3List.selectedItem;
                this.employeeL3ListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.matrixDetail.employeeL3 = this.employeeL3List.selectedItem;
                this.employeeL3ListModal.hide();
                this.matrixDetailModal.show();
                break;
            default:
                break;
        }
    }

    public unselectEmployeeL3() {
        this.selectedEmployeeL3 = null;
        this.refresh();
    }

    public setSelectedEmployeeL4() {
        switch (this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedEmployeeL4 = this.employeeL4List.selectedItem;
                this.employeeL4ListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.matrixDetail.employeeL4 = this.employeeL4List.selectedItem;
                this.employeeL4ListModal.hide();
                this.matrixDetailModal.show();
                break;
            default:
                break;
        }
    }

    public unselectEmployeeL4() {
        this.selectedEmployeeL4 = null;
        this.refresh();
    }

    public setSelectedEmployeeS1() {
        switch (this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedEmployeeS1 = this.employeeS1List.selectedItem;
                this.employeeS1ListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.matrixDetail.employeeS1 = this.employeeS1List.selectedItem;
                this.employeeS1ListModal.hide();
                this.matrixDetailModal.show();
                break;
            default:
                break;
        }
    }

    public unselectEmployeeS1() {
        this.selectedEmployeeS1 = null;
        this.refresh();
    }

    public setSelectedEmployeeS2() {
        switch (this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedEmployeeS2 = this.employeeS2List.selectedItem;
                this.employeeS2ListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.matrixDetail.employeeS2 = this.employeeS2List.selectedItem;
                this.employeeS2ListModal.hide();
                this.matrixDetailModal.show();
                break;
            default:
                break;
        }
    }

    public unselectEmployeeS2() {
        this.selectedEmployeeS2 = null;
        this.refresh();
    }

    public setSelectedEmployeeS3() {
        switch (this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedEmployeeS3 = this.employeeS3List.selectedItem;
                this.employeeS3ListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.matrixDetail.employeeS3 = this.employeeS3List.selectedItem;
                this.employeeS3ListModal.hide();
                this.matrixDetailModal.show();
                break;
            default:
                break;
        }
    }

    public unselectEmployeeS3() {
        this.selectedEmployeeS3 = null;
        this.refresh();
    }

    public export() {

      let params: Array<Param> = null;

      params = this.getFilters();
      this.matrixHttpService
          .export(params)
          .subscribe((blob) => {
              fileSaveAs(blob.body, 'matrice.xlsx');
          });
  }

public onDeleteMatrixLevel() {
    this.operationType = OperationType.DeleteMatrixLevel;
    this.confirmationMessage = 'Esti sigur?';
    this.confirmationModal.show();
}

public onConfirmationApproved() {

    switch (this.operationType) {
        case OperationType.DeleteMatrixLevel:
            this.onDeleteMatrixLevel();
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

// public clearFilters() {

//     this.matrixLevelList.refresh(null);
// }

// public setSelectedItem($event) {
//     const params: Array<Param> = new Array<Param>();

//     params.push(new Param('matrixIds', AppUtils.getIdsList<Matrix, number>([ this.matrixList.selectedItem != null ? this.matrixList.selectedItem : null ])));
//     this.matrixLevelList.refresh(params);
// }


// /*begin costcenter*/
// public selectCostCenters() {
//     this.costCenterListModal.show();
//     this.costCenterList.selectedItems = this.selectedCostCenters;
//     this.costCenterList.refresh(null);
//   }

//   public removeFromCostCenterSelection(costCenter: CostCenter) {
//     const index: number = this.selectedCostCenters.indexOf(costCenter);
//     this.selectedCostCenters.splice(index, 1);
//     this.refresh();
//   }

//   public clearCostCenterSelection() {
//     this.selectedCostCenters = new Array<CostCenter>();
//     this.refresh();
//   }

//   public setSelectedCostCenters() {
//     this.selectedCostCenters = this.costCenterList.selectedItems;
//     this.costCenterListModal.hide();
//     this.refresh();
//   }
//   /*end costcenter*/


  /*begin costcenter*/
public selectDivisions() {
  this.divisionListModal.show();
  this.divisionList.selectedItems = this.selectedDivisions;
  this.divisionList.refresh(null);
}

public removeFromDivisionSelection(division: Division) {
  const index: number = this.selectedDivisions.indexOf(division);
  this.selectedDivisions.splice(index, 1);
  this.selectedDivision = null;
  this.refresh();
}

public clearDivisionSelection() {
  console.log('clearing...');
  this.selectedDivisions = [];
  this.refresh();
  console.log('finished clearing');
}

public setSelectedDivision() {
  this.selectedDivisions = this.divisionList.selectedItems;
  this.divisionListModal.hide();
  this.refresh();
}
/*end costcenter*/

  public uploadMatrixFile() {

    this.uploadModal.show();
  }

  // public loadFileMatrix(ev) {
  //   this.fileEventMatrix = ev;
  // }

  public uploadMatrix() {
    this.uploadModal.hide();
    // this.importDataMatrix();
  }

  public loadFileMatrix(ev) {
    // console.log(JSON.stringify(ev));
    this.fileEventMatrix = ev;
    if (this.fileEventMatrix === null) { return; }

    // [Company Code] as [CompanyCode],
    // [Company Code Name] as [CompanyName],
    // [Cost Center] as [CostCenterCode],
    // [Description] as [CostCenterName],
    // [Profit Center] as [AdmCenter],
    // [Functional Area] as [Area],
    // [Tara Name] as [CountryName],
    // [Tara Code] as [CountryCode],
    // [Business Unit Name] as [DepartmentName],
    // [Business Unit Code] as [DepartmentCode],
    // [Departament Name] as [DivisionName],
    // [Departament Code] as [DivisionCode],
    // [Cost Type Name] as [AssetTypeName],
    // [Cost Type Code] as [AssetTypeCode],
    // [WBS] as [Project],
    // [L1 user id] as [L1UserId],
    // [L2 user id] as [L2UserId],
    // [L3 user id] as [L3UserId],
    // [L4 user id] as [L4UserId],
    // [S1 user id] as [S1UserId],
    // [S2 user id] as [S2UserId],
    // [S3 user id] as [S3UserId],
    // CAST([Suma L1] as NUMBER) as [L1UserIdSum],
    // CAST([Suma L2] as NUMBER) as [L2UserIdSum],
    // CAST([Suma L3] as NUMBER) as [L3UserIdSum],
    // CAST([Suma L4] as NUMBER) as [L4UserIdSum],
    // CAST([Suma S L1] as NUMBER) as [S1UserIdSum],
    // CAST([Suma S L2] as NUMBER) as [S2UserIdSum],
    // CAST([Suma S L3] as NUMBER) as [S3UserIdSum]

    alasql.promise(`select
                        [Business Unit Name] as [DepartmentName],
                        [Business Unit Code] as [DepartmentCode],
                        [Departament Name] as [DivisionName],
                        [Departament Code] as [DivisionCode],
                        [L1] as [L1UserId],
                        [L2] as [L2UserId],
                        [L3] as [L3UserId],
                        [L4] as [L4UserId],
                        [Supra1] as [S1UserId],
                        [Supra2] as [S2UserId],
                        [Supra3] as [S3UserId],
                        CAST([Suma L1] as NUMBER) as [L1UserIdSum],
                        CAST([Suma L2] as NUMBER) as [L2UserIdSum],
                        CAST([Suma L3] as NUMBER) as [L3UserIdSum],
                        CAST([Suma L4] as NUMBER) as [L4UserIdSum],
                        CAST([Suma S L1] as NUMBER) as [S1UserIdSum],
                        CAST([Suma S L2] as NUMBER) as [S2UserIdSum],
                        CAST([Suma S L3] as NUMBER) as [S3UserIdSum]
                        from FILE(?, {headers: true})`, [this.fileEventMatrix])
        .then((importLines: Array<MatrixImport>) => {
          console.log(JSON.stringify(importLines));
            const newArray = importLines.filter(value => value.DepartmentCode !== undefined);
            console.log(JSON.stringify(newArray));

            // console.log(JSON.stringify(importLines));
            // importLines = this.removeUndefinedFromArray(importLines);
            // console.log(JSON.stringify(importLines));
            this.importDataMatrixModal.show();

            this.importIndex = 0;
            this.importMatrixLines = importLines;
            this.noOfItems = importLines.length;

             this.doImportBudget();
    });

  }

  public removeUndefinedFromArray = (arrayToClean) => {
    const cleanedArray = [];
    arrayToClean.forEach((val) => {

      if (typeof val.CompanyCode !== 'undefined') {
        cleanedArray.push(val);
      }

    });

    return cleanedArray;
  }

  public doImportBudget() {
    if (this.importIndex < this.importMatrixLines.length) {
        this.matrixHttpService.upload(this.importMatrixLines[this.importIndex]).subscribe((data: any) => {
            // if (data === 0) {
            //     alert('Seria ' + this.importSNLines[this.importIndex].SerialNumber + ' exista deja in baza de date!');
            //     return;
            // }
            this.importIndex = this.importIndex + 1;
            this.doImportBudget();
        });
    } else {
        this.fileEventMatrix = null;
        this.importDataMatrixModal.hide();
        this.importIndex = 0;
        this.importMatrixLines = new Array<MatrixImport>();
        this.refresh();
    }
  }

//   public exportTemplate() {
//     this.exportCompleted = false;
//     this.budgetHttpService
//         .template()
//         .subscribe((blob) => {
//             fileSaveAs(blob.body, 'model-import-buget.xlsx');
//             this.exportCompleted = true;
//         });
//   }

//   /* begin Projeect */

//   public selectProjects() {

//     this.projectListModal.show();
//     this.projectList.selectedItems = this.selectedProjects;
//     this.projectList.refresh(null);
//     }

//     public removeFromProjectSelection(project: Project) {
//         const index: number = this.selectedProjects.indexOf(project);
//         this.selectedProjects.splice(index, 1);
//         this.refresh();
//     }

//     public clearProjectSelection() {
//         this.selectedProjects = new Array<Project>();
//         this.refresh();
//     }

//     public setSelectedProjects() {
//         this.selectedProjects = this.projectList.selectedItems;
//         this.projectListModal.hide();
//         this.refresh();
//     }

// /*end project*/

/* begin employee L1 */

public selectL1Employees() {

    this.employeeL1ListModal.show();
    this.employeeL1List.selectedItems = this.selectedL1Employees;
    this.employeeL1List.refresh(null);
}

public removeFromL1EmployeeSelection(employee: Employee) {
    const index: number = this.selectedL1Employees.indexOf(employee);
    this.selectedL1Employees.splice(index, 1);
    this.refresh();
}

public clearL1EmployeeSelection() {
    this.selectedL1Employees = new Array<Employee>();
    this.refresh();
}

public setSelectedL1Employees(value) {
    this.selectedL1Employees = value[0];
    // this.selectedL1Employees = this.employeeL1List.selectedItems;
    // this.employeeL1ListModal.hide();
    this.refresh();
}

/*end employee L1*/

/* begin employee L2 */

public selectL2Employees() {

    this.employeeL2ListModal.show();
    this.employeeL2List.selectedItems = this.selectedL2Employees;
    this.employeeL2List.refresh(null);
}

public removeFromL2EmployeeSelection(employee: Employee) {
    const index: number = this.selectedL2Employees.indexOf(employee);
    this.selectedL2Employees.splice(index, 1);
    this.refresh();
}

public clearL2EmployeeSelection() {
    this.selectedL2Employees = new Array<Employee>();
    this.refresh();
}

public setSelectedL2Employees() {
    this.selectedL2Employees = this.employeeL2List.selectedItems;
    this.employeeL2ListModal.hide();
    this.refresh();
}

/*end employee L2*/

/* begin employee L3 */

public selectL3Employees() {

    this.employeeL3ListModal.show();
    this.employeeL3List.selectedItems = this.selectedL3Employees;
    this.employeeL3List.refresh(null);
}

public removeFromL3EmployeeSelection(employee: Employee) {
    const index: number = this.selectedL3Employees.indexOf(employee);
    this.selectedL3Employees.splice(index, 1);
    this.refresh();
}

public clearL3EmployeeSelection() {
    this.selectedL3Employees = new Array<Employee>();
    this.refresh();
}

public setSelectedL3Employees() {
    this.selectedL3Employees = this.employeeL3List.selectedItems;
    this.employeeL3ListModal.hide();
    this.refresh();
}

/*end employee L3*/

/* begin employee L4 */

public selectL4Employees() {

    this.employeeL4ListModal.show();
    this.employeeL4List.selectedItems = this.selectedL4Employees;
    this.employeeL4List.refresh(null);
}

public removeFromL4EmployeeSelection(employee: Employee) {
    const index: number = this.selectedL4Employees.indexOf(employee);
    this.selectedL4Employees.splice(index, 1);
    this.refresh();
}

public clearL4EmployeeSelection() {
    this.selectedL4Employees = new Array<Employee>();
    this.refresh();
}

public setSelectedL4Employees() {
    this.selectedL4Employees = this.employeeL4List.selectedItems;
    this.employeeL4ListModal.hide();
    this.refresh();
}

/*end employee L4*/

/* begin employee S1 */

public selectS1Employees() {

    this.employeeS1ListModal.show();
    this.employeeS1List.selectedItems = this.selectedS1Employees;
    this.employeeS1List.refresh(null);
}

public removeFromS1EmployeeSelection(employee: Employee) {
    const index: number = this.selectedS1Employees.indexOf(employee);
    this.selectedS1Employees.splice(index, 1);
    this.refresh();
}

public clearS1EmployeeSelection() {
    this.selectedS1Employees = new Array<Employee>();
    this.refresh();
}

public setSelectedS1Employees() {
    this.selectedS1Employees = this.employeeS1List.selectedItems;
    this.employeeS1ListModal.hide();
    this.refresh();
}

/*end employee S1*/

/* begin employee S2 */

public selectS2Employees() {

    this.employeeS2ListModal.show();
    this.employeeS2List.selectedItems = this.selectedS2Employees;
    this.employeeS2List.refresh(null);
}

public removeFromS2EmployeeSelection(employee: Employee) {
    const index: number = this.selectedS2Employees.indexOf(employee);
    this.selectedS2Employees.splice(index, 1);
    this.refresh();
}

public clearS2EmployeeSelection() {
    this.selectedS2Employees = new Array<Employee>();
    this.refresh();
}

public setSelectedS2Employees() {
    this.selectedS2Employees = this.employeeS2List.selectedItems;
    this.employeeS2ListModal.hide();
    this.refresh();
}

/*end employee S2*/

/* begin employee S3 */

public selectS3Employees() {

    this.employeeS3ListModal.show();
    this.employeeS3List.selectedItems = this.selectedS3Employees;
    this.employeeS3List.refresh(null);
}

public removeFromS3EmployeeSelection(employee: Employee) {
    const index: number = this.selectedS3Employees.indexOf(employee);
    this.selectedS3Employees.splice(index, 1);
    this.refresh();
}

public clearS3EmployeeSelection() {
    this.selectedS3Employees = new Array<Employee>();
    this.refresh();
}

public setSelectedS3Employees() {
    this.selectedS3Employees = this.employeeS3List.selectedItems;
    this.employeeS3ListModal.hide();
    this.refresh();
}

/*end employee S3*/


  public test(event) {
    console.log(event);
  }
}

enum OperationType {
    NotSet = 1,
    DeleteMatrixLevel = 2
}
