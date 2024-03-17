import { Component, OnInit, ViewChild } from "@angular/core";
import { DashboardHttpService } from "../../services/http/common/dashboard.http.service";
import { InventoryTotal } from "../../model/api/common/inventory-total";
import { CostCenterTotal } from "../../model/api/common/cost-center-total";
import { AssetTypeTotal } from "../../model/api/common/asset-type-total";
import { TypeTotal } from "../../model/api/common/type-total";
import { DivisionTotal } from "../../model/api/common/division-total";
import { DepartmentTotal } from "../../model/api/common/department-total";
import { DepartmentListComponent } from "../../forms/administrations/departments/department.list";
import { ModalDirective } from "ngx-bootstrap/modal";
import { Department } from "../../model/api/administration/department";
import { DepartmentHttpService } from "../../services/http/administration/department.http.service";
import { CostCenter } from "../../model/api/administration/cost-center";
import { Location } from "../../model/api/administration/location";
import { Division } from "../../model/api/administration/division";
import { DivisionListComponent } from "../../forms/administrations/divisions/division.list";
import { Param } from "../../model/common/param";
import { AppUtils } from "../../common/app.utils";
import { CostCenterListComponent } from "../../forms/administrations/cost-centers/cost-center.list";
import { LocationHttpService } from "../../services/http/administration/location.http.service";
import { CostCenterHttpService } from "../../services/http/administration/cost-center.http.service";
import { ProjectHttpService } from "../../services/http/assets/project.http.service";
import { DivisionHttpService } from "../../services/http/administration/division.http.service";
import { DashboardReport } from "../../model/api/common/dashboard-report";
import { saveAs as fileSaveAs } from "file-saver-es";
import { TypeHttpService } from "../../services/http/administration/type.http.service";
import { AssetTypeHttpService } from "../../services/http/assets/asset-type.http.service";
import { ProjectTotal } from "../../model/api/common/project-total";
import { AdministrationTotal } from "../../model/api/common/administration-total";
import { Administration } from "../../model/api/administration/administration";
import { AdministrationListComponent } from "../../forms/administrations/administrations/administration.list";
import { AdministrationHttpService } from "../../services/http/administration/administration.http.service";
import { EmployeeHttpService } from "../../services/http/administration/employee.http.service";
import { ResponsableTotal } from "../../model/api/common/responsible-total";
import { UploadFarModalComponent } from "../../upload-far-modal/upload-far-modal.component";
import { MatDialog } from "@angular/material/dialog";
import { DashboardFilter } from "../../model/api/common/dashboard.filter";

@Component({
  templateUrl: "dashboard-inventory.component.html",
  styleUrls: ["dashboard-warehouse-inventory.component.scss"],
})
export class DashboardInventoryComponent {
  public currentDate = new Date();

  public _administrations: Administration[] = [];
  public get administrations(): Administration[] {
    return this._administrations;
  }
  public set administrations(value: Administration[]) {
    this._administrations = value;

    this.setSelectedAdministrations(value);
  }

  public _departments: Department[] = [];
  public get departments(): Department[] {
    return this._departments;
  }
  public set departments(value: Department[]) {
    this._departments = value;

    this.setSelectedDepartments(value);
  }

  public _costCenters: CostCenter[] = [];
  public get costCenters(): CostCenter[] {
    return this._costCenters;
  }
  public set costCenters(value: CostCenter[]) {
    this._costCenters = value;

    this.setSelectedCostCenters(value);
  }

  public _divisions: Division[] = [];
  public get divisions(): Division[] {
    return this._divisions;
  }
  public set divisions(value: Division[]) {
    this._divisions = value;

    this.setSelectedDivisions(value);
  }

  public get divisionParams(): Array<Param> {
    const params = new Array<Param>();

    let selectedDepartments: Array<Department> = null;
    let selectedLocations: Array<Location> = null;
    selectedDepartments = this.selectedDepartments;
    selectedLocations = this.selectedLocations;

    params.push(
      new Param(
        "departmentIds",
        AppUtils.getIdsList<Department, number>(selectedDepartments)
      )
    );
    params.push(
      new Param(
        "locationIds",
        AppUtils.getIdsList<Location, number>(selectedLocations)
      )
    );

    return params;
  }

  public get costCenterParams(): Array<Param> {
    const params = new Array<Param>();

    let selectedDepartments: Array<Department> = null;
    let selectedDivisions: Array<Division> = null;
    let selectedLocations: Array<Location> = null;
    selectedDepartments = this.selectedDepartments;
    selectedDivisions = this.selectedDivisions;
    selectedLocations = this.selectedLocations;

    params.push(
      new Param(
        "departmentIds",
        AppUtils.getIdsList<Department, number>(selectedDepartments)
      )
    );
    params.push(
      new Param(
        "divisionIds",
        AppUtils.getIdsList<Division, number>(selectedDivisions)
      )
    );
    params.push(
      new Param(
        "locationIds",
        AppUtils.getIdsList<Location, number>(selectedLocations)
      )
    );

    return params;
  }

  @ViewChild("administrationList")
  public administrationList: AdministrationListComponent;
  @ViewChild("administrationListModal")
  public administrationListModal: ModalDirective;
  @ViewChild("departmentList") public departmentList: DepartmentListComponent;
  @ViewChild("departmentListModal") public departmentListModal: ModalDirective;
  @ViewChild("divisionList") public divisionList: DivisionListComponent;
  @ViewChild("divisionListModal") public divisionListModal: ModalDirective;
  @ViewChild("costCenterList") public costCenterList: CostCenterListComponent;
  @ViewChild("costCenterListModal") public costCenterListModal: ModalDirective;

  @ViewChild("departmentReportModal")
  public departmentReportModal: ModalDirective;
  @ViewChild("divisionReportModal") public divisionReportModal: ModalDirective;
  @ViewChild("costCenterReportModal")
  public costCenterReportModal: ModalDirective;

  public selectedAdministrations: Array<Administration> = new Array<Administration>();
  public selectedDepartments: Array<Department> = new Array<Department>();
  public selectedCostCenters: Array<CostCenter> = new Array<CostCenter>();
  public selectedLocations: Array<Location> = new Array<Location>();
  public selectedDivisions: Array<Division> = new Array<Division>();

  public filterSearch: string;

  public itemsInventoryArray = new Array<InventoryTotal>();
  public itemsAdministrationArray = new Array<AdministrationTotal>();
  public itemsCostCenterArray = new Array<CostCenterTotal>();
  public itemsAssetTypeArray = new Array<AssetTypeTotal>();
  public itemsProjectArray = new Array<ProjectTotal>();
  public itemsTypeArray = new Array<TypeTotal>();
  public itemsDivisionArray = new Array<DivisionTotal>();
  public itemsDepartmentArray = new Array<DepartmentTotal>();
  public itemsResponsableArray = new Array<ResponsableTotal>();

  public itemsTotalDepartmentArray = new Array<DashboardReport>();
  public itemsTotalDivisionArray = new Array<DashboardReport>();
  public itemsTotalCostCenterArray = new Array<DashboardReport>();
  public itemsTotalTypeArray = new Array<DashboardReport>();
  public itemsTotalAssetTypeArray = new Array<DashboardReport>();
  public itemsTotalProjectArray = new Array<DashboardReport>();

  sumInitialIT = 0;
  sumScannedIT = 0;
  sumNotScannedIT = 0;
  sumInitialITCurrentAPC = 0;
  sumInitialITCurrBk = 0;
  sumInitialITAccumulDep = 0;

  sumInitialFacility = 0;
  sumScannedFacility = 0;
  sumNotScannedFacility = 0;
  sumInitialFacilityCurrentAPC = 0;
  sumInitialFacilityCurrBk = 0;
  sumInitialFacilityAccumulDep = 0;

  inventoryId = 16;
  administrationId = 0;
  employeeId = 0;
  departmentId = 0;
  divisionId = 0;
  costCenterId = 0;
  typeId = 0;
  assetTypeId = 0;
  projectId = 0;
  type = 0;
  
  showExportBtn = true;
  showValues = false;
  showDepartmentExportBtn = true;
  showDivisionExportBtn = true;
  showCostCenterExportBtn = true;
  showTypeExportBtn = true;
  showAssetTypeExportBtn = true;
  showProjectExportBtn = true;

  index: number = 0;

  isDepartmentCollapsed: boolean = true;
  isDivisionCollapsed: boolean = true;
  isCostCenterCollapsed: boolean = true;
  isTypeCollapsed: boolean = true;
  isAssetTypeCollapsed: boolean = true;
  isProjectCollapsed: boolean = true;

  constructor(
    public dashboardHttpService: DashboardHttpService,
    public locationHttpService: LocationHttpService,
    public divisionHttpService: DivisionHttpService,
    public costCenterHttpService: CostCenterHttpService,
    public typeHttpService: TypeHttpService,
    public assetTypeHttpService: AssetTypeHttpService,
    public projectHttpService: ProjectHttpService,
    public departmentHttpService: DepartmentHttpService,
    public administrationHttpService: AdministrationHttpService,
    public employeeHttpService: EmployeeHttpService,
    public dialog: MatDialog
  ) {
    this.itemsInventoryArray.push(new InventoryTotal());
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loadData(
        this.administrationId,
        this.departmentId,
        this.divisionId,
        this.costCenterId
      );
    }, 1000);
  }

  public loadData(
    administrationId: number,
    departmentId: number,
    divisionId: number,
    costCenterId: number
  ) {
    this.dashboardHttpService
      .inventoryStatus(
        administrationId,
        this.inventoryId,
        departmentId,
        divisionId,
        costCenterId
      )
      .subscribe((res: any[]) => {
        this.itemsInventoryArray = res;
      });

    if (this.index == 0) {
      this.itemsAdministrationArray = new Array<AdministrationTotal>();
      this.dashboardHttpService
        .administrationStatus(
          administrationId,
          this.inventoryId,
          departmentId,
          divisionId,
          costCenterId
        )
        .subscribe((res: any[]) => {
          this.itemsAdministrationArray = res;
        });
    } else if (this.index == 1) {
      this.itemsDepartmentArray = new Array<DepartmentTotal>();
      this.dashboardHttpService
        .departmentStatus(
          administrationId,
          this.inventoryId,
          departmentId,
          divisionId,
          costCenterId
        )
        .subscribe((res: any[]) => {
          this.itemsDepartmentArray = res;
        });
    } else if (this.index == 2) {
      this.itemsDivisionArray = new Array<DivisionTotal>();
      this.dashboardHttpService
        .divisionStatus(
          administrationId,
          this.inventoryId,
          departmentId,
          divisionId,
          costCenterId
        )
        .subscribe((res: any[]) => {
          this.itemsDivisionArray = res;
        });
    } else if (this.index == 3) {
      this.itemsCostCenterArray = new Array<CostCenterTotal>();
      this.dashboardHttpService
        .costCenterStatus(
          administrationId,
          this.inventoryId,
          departmentId,
          divisionId,
          costCenterId
        )
        .subscribe((res: any[]) => {
          this.itemsCostCenterArray = res;
        });
    }
  }

  /*begin administration*/
  public selectAdministrations() {
    this.administrationListModal.show();
    this.administrationList.selectedItems = this.selectedAdministrations;
    this.administrationList.refresh(null);
  }

  public removeFromAdministrationSelection(administration: Administration) {
    let index: number = this.selectedAdministrations.indexOf(administration);
    this.selectedAdministrations.splice(index, 1);
    this.loadData(
      this.selectedAdministrations.length > 0
        ? this.selectedAdministrations[0].id
        : this.administrationId,
      this.selectedDepartments.length > 0
        ? this.selectedDepartments[0].id
        : this.departmentId,
      this.selectedDivisions.length > 0
        ? this.selectedDivisions[0].id
        : this.divisionId,
      this.selectedCostCenters.length > 0
        ? this.selectedCostCenters[0].id
        : this.costCenterId
    );
  }

  public clearAdministrationSelection() {
    this.selectedAdministrations = new Array<Administration>();
    this.loadData(
      this.selectedAdministrations.length > 0
        ? this.selectedAdministrations[0].id
        : this.administrationId,
      this.selectedDepartments.length > 0
        ? this.selectedDepartments[0].id
        : this.departmentId,
      this.selectedDivisions.length > 0
        ? this.selectedDivisions[0].id
        : this.divisionId,
      this.selectedCostCenters.length > 0
        ? this.selectedCostCenters[0].id
        : this.costCenterId
    );
  }

  public setSelectedAdministrations(value) {
    // this.selectedAdministrations = this.administrationList.selectedItems;
    this.selectedAdministrations = value;
    this.selectedAdministrations.length > 0
      ? (this.administrationId = this.selectedAdministrations[0].id)
      : (this.administrationId = 0),
      // this.administrationListModal.hide();
      this.loadData(
        this.selectedAdministrations.length > 0
          ? this.selectedAdministrations[0].id
          : this.administrationId,
        this.selectedDepartments.length > 0
          ? this.selectedDepartments[0].id
          : this.departmentId,
        this.selectedDivisions.length > 0
          ? this.selectedDivisions[0].id
          : this.divisionId,
        this.selectedCostCenters.length > 0
          ? this.selectedCostCenters[0].id
          : this.costCenterId
      );
  }
  /*end administration*/

  /*begin department*/
  public selectDepartments() {
    this.departmentListModal.show();
    this.departmentList.selectedItems = this.selectedDepartments;
    this.departmentList.refresh(null);
  }

  public removeFromDepartmentSelection(department: Department) {
    let index: number = this.selectedDepartments.indexOf(department);
    this.selectedDepartments.splice(index, 1);
    this.loadData(
      this.selectedAdministrations.length > 0
        ? this.selectedAdministrations[0].id
        : this.administrationId,
      this.selectedDepartments.length > 0
        ? this.selectedDepartments[0].id
        : this.departmentId,
      this.selectedDivisions.length > 0
        ? this.selectedDivisions[0].id
        : this.divisionId,
      this.selectedCostCenters.length > 0
        ? this.selectedCostCenters[0].id
        : this.costCenterId
    );
  }

  public clearDepartmentSelection() {
    this.selectedDepartments = new Array<Department>();
    this.loadData(
      this.selectedAdministrations.length > 0
        ? this.selectedAdministrations[0].id
        : this.administrationId,
      this.selectedDepartments.length > 0
        ? this.selectedDepartments[0].id
        : this.departmentId,
      this.selectedDivisions.length > 0
        ? this.selectedDivisions[0].id
        : this.divisionId,
      this.selectedCostCenters.length > 0
        ? this.selectedCostCenters[0].id
        : this.costCenterId
    );
  }

  public setSelectedDepartments(value) {
    // this.selectedDepartments = this.departmentList.selectedItems;
    this.selectedDepartments = value;
    this.selectedDepartments.length > 0
      ? (this.departmentId = this.selectedDepartments[0].id)
      : (this.departmentId = 0),
      // this.departmentListModal.hide();
      this.loadData(
        this.selectedAdministrations.length > 0
          ? this.selectedAdministrations[0].id
          : this.administrationId,
        this.selectedDepartments.length > 0
          ? this.selectedDepartments[0].id
          : this.departmentId,
        this.selectedDivisions.length > 0
          ? this.selectedDivisions[0].id
          : this.divisionId,
        this.selectedCostCenters.length > 0
          ? this.selectedCostCenters[0].id
          : this.costCenterId
      );
  }
  /*end department*/

  /*begin Division */
  public selectDivisions() {
    let selectedDepartments: Array<Department> = null;
    let selectedLocations: Array<Location> = null;
    selectedDepartments = this.selectedDepartments;
    selectedLocations = this.selectedLocations;

    let params = new Array<Param>();
    params.push(
      new Param(
        "departmentIds",
        AppUtils.getIdsList<Department, number>(selectedDepartments)
      )
    );
    params.push(
      new Param(
        "locationIds",
        AppUtils.getIdsList<Location, number>(selectedLocations)
      )
    );

    this.divisionListModal.show();
    this.divisionList.selectedItems = this.selectedDivisions;
    this.divisionList.refresh(params);
  }

  public removeFromDivisionSelection(division: Division) {
    let index: number = this.selectedDivisions.indexOf(division);
    this.selectedDivisions.splice(index, 1);
    this.loadData(
      this.selectedAdministrations.length > 0
        ? this.selectedAdministrations[0].id
        : this.administrationId,
      this.selectedDepartments.length > 0
        ? this.selectedDepartments[0].id
        : this.departmentId,
      this.selectedDivisions.length > 0
        ? this.selectedDivisions[0].id
        : this.divisionId,
      this.selectedCostCenters.length > 0
        ? this.selectedCostCenters[0].id
        : this.costCenterId
    );
  }

  public clearDivisionSelection() {
    this.selectedDivisions = new Array<Division>();
    this.loadData(
      this.selectedAdministrations.length > 0
        ? this.selectedAdministrations[0].id
        : this.administrationId,
      this.selectedDepartments.length > 0
        ? this.selectedDepartments[0].id
        : this.departmentId,
      this.selectedDivisions.length > 0
        ? this.selectedDivisions[0].id
        : this.divisionId,
      this.selectedCostCenters.length > 0
        ? this.selectedCostCenters[0].id
        : this.costCenterId
    );
  }

  public setSelectedDivisions(value) {
    // this.selectedDivisions = this.divisionList.selectedItems;
    this.selectedDivisions = value;
    this.selectedDivisions.length > 0
      ? (this.divisionId = this.selectedDivisions[0].id)
      : (this.divisionId = 0),
      // this.divisionListModal.hide();
      this.loadData(
        this.selectedAdministrations.length > 0
          ? this.selectedAdministrations[0].id
          : this.administrationId,
        this.selectedDepartments.length > 0
          ? this.selectedDepartments[0].id
          : this.departmentId,
        this.selectedDivisions.length > 0
          ? this.selectedDivisions[0].id
          : this.divisionId,
        this.selectedCostCenters.length > 0
          ? this.selectedCostCenters[0].id
          : this.costCenterId
      );
  }

  /* end Division */

  /*begin costcenter*/
  public selectCostCenters() {
    let selectedDepartments: Array<Department> = null;
    let selectedDivisions: Array<Division> = null;
    let selectedLocations: Array<Location> = null;
    selectedDepartments = this.selectedDepartments;
    selectedDivisions = this.selectedDivisions;
    selectedLocations = this.selectedLocations;

    let params = new Array<Param>();
    params.push(
      new Param(
        "departmentIds",
        AppUtils.getIdsList<Department, number>(selectedDepartments)
      )
    );
    params.push(
      new Param(
        "divisionIds",
        AppUtils.getIdsList<Division, number>(selectedDivisions)
      )
    );
    params.push(
      new Param(
        "locationIds",
        AppUtils.getIdsList<Location, number>(selectedLocations)
      )
    );

    this.costCenterListModal.show();
    this.costCenterList.selectedItems = this.selectedCostCenters;
    this.costCenterList.refresh(params);
  }

  public removeFromCostCenterSelection(costCenter: CostCenter) {
    let index: number = this.selectedCostCenters.indexOf(costCenter);
    this.selectedCostCenters.splice(index, 1);
    this.loadData(
      this.selectedAdministrations.length > 0
        ? this.selectedAdministrations[0].id
        : this.administrationId,
      this.selectedDepartments.length > 0
        ? this.selectedDepartments[0].id
        : this.departmentId,
      this.selectedDivisions.length > 0
        ? this.selectedDivisions[0].id
        : this.divisionId,
      this.selectedCostCenters.length > 0
        ? this.selectedCostCenters[0].id
        : this.costCenterId
    );
  }

  public clearCostCenterSelection() {
    this.selectedCostCenters = new Array<CostCenter>();
    this.loadData(
      this.selectedAdministrations.length > 0
        ? this.selectedAdministrations[0].id
        : this.administrationId,
      this.selectedDepartments.length > 0
        ? this.selectedDepartments[0].id
        : this.departmentId,
      this.selectedDivisions.length > 0
        ? this.selectedDivisions[0].id
        : this.divisionId,
      this.selectedCostCenters.length > 0
        ? this.selectedCostCenters[0].id
        : this.costCenterId
    );
  }

  public setSelectedCostCenters(value) {
    // this.selectedCostCenters = this.costCenterList.selectedItems;
    this.selectedCostCenters = value;
    this.selectedCostCenters.length > 0
      ? (this.costCenterId = this.selectedCostCenters[0].id)
      : (this.costCenterId = 0),
      // this.costCenterListModal.hide();
      this.loadData(
        this.selectedAdministrations.length > 0
          ? this.selectedAdministrations[0].id
          : this.administrationId,
        this.selectedDepartments.length > 0
          ? this.selectedDepartments[0].id
          : this.departmentId,
        this.selectedDivisions.length > 0
          ? this.selectedDivisions[0].id
          : this.divisionId,
        this.selectedCostCenters.length > 0
          ? this.selectedCostCenters[0].id
          : this.costCenterId
      );
  }
  /*end costcenter*/

  public clearFilters() {
    this.selectedLocations = new Array<Location>();
    this.selectedCostCenters = new Array<CostCenter>();
    this.selectedDepartments = new Array<Department>();
    this.selectedLocations = new Array<Location>();
    this.selectedDivisions = new Array<Division>();
    this.loadData(
      this.selectedAdministrations.length > 0
        ? this.selectedAdministrations[0].id
        : this.administrationId,
      this.selectedDepartments.length > 0
        ? this.selectedDepartments[0].id
        : this.departmentId,
      this.selectedDivisions.length > 0
        ? this.selectedDivisions[0].id
        : this.divisionId,
      this.selectedCostCenters.length > 0
        ? this.selectedCostCenters[0].id
        : this.costCenterId
    );
  }

  public preventReload(event) {
    event.preventDefault();
  }

  onFARUpload() {
    const dialogRef = this.dialog.open(UploadFarModalComponent, {
      panelClass: "centered-middle-modal",
      height: "80%",
      maxHeight: "80%",
      disableClose: true,
      width: "700px",
      position: { bottom: "15%", top: "auto" },
      data: {},
    });
    dialogRef.afterClosed().subscribe(() => {});
  }

  // export() {
  //   this.showExportBtn = false;

  //   let params = new Array<Param>();
  //   let dashboardFilter: DashboardFilter = new DashboardFilter();

  //   dashboardFilter.costCenterIds = new Array<number>();
  //   dashboardFilter.costCenterIds.push(
  //     this.selectedCostCenters.length > 0
  //       ? this.selectedCostCenters[0].id
  //       : this.costCenterId
  //   );

  //   dashboardFilter.departmentIds = new Array<number>();
  //   dashboardFilter.departmentIds.push(
  //     this.selectedDepartments.length > 0
  //       ? this.selectedDepartments[0].id
  //       : this.departmentId
  //   );

  //   dashboardFilter.divisionIds = new Array<number>();
  //   dashboardFilter.divisionIds.push(
  //     this.selectedDivisions.length > 0
  //       ? this.selectedDivisions[0].id
  //       : this.divisionId
  //   );

  //   dashboardFilter.administrationIds = new Array<number>();
  //   dashboardFilter.administrationIds.push(
  //     this.selectedAdministrations.length > 0
  //       ? this.selectAdministrations[0].id
  //       : this.administrationId
  //   );

  //   params.push(new Param("jsonFilter", JSON.stringify(dashboardFilter)));

  //   this.dashboardHttpService.export(params).subscribe((blob) => {
  //     fileSaveAs(blob.body, "Dashboard_Export.xlsx");
  //     this.showExportBtn = true;
  //   });
  // }

  handleChange(e) {
    console.log(e);
    this.index = e.index;

    if (this.index == 0) {
      this.itemsAdministrationArray = new Array<AdministrationTotal>();
      this.dashboardHttpService
        .administrationStatus(
          this.administrationId,
          this.inventoryId,
          this.departmentId,
          this.divisionId,
          this.costCenterId
        )
        .subscribe((res: any[]) => {
          this.itemsAdministrationArray = res;
        });
    } else if (this.index == 1) {
      this.itemsDepartmentArray = new Array<DepartmentTotal>();
      this.dashboardHttpService
        .departmentStatus(
          this.administrationId,
          this.inventoryId,
          this.departmentId,
          this.divisionId,
          this.costCenterId
        )
        .subscribe((res: any[]) => {
          this.itemsDepartmentArray = res;
        });
    } else if (this.index == 2) {
      this.itemsDivisionArray = new Array<DivisionTotal>();
      this.dashboardHttpService
        .divisionStatus(
          this.administrationId,
          this.inventoryId,
          this.departmentId,
          this.divisionId,
          this.costCenterId
        )
        .subscribe((res: any[]) => {
          this.itemsDivisionArray = res;
        });
    } else if (this.index == 3) {
      this.itemsCostCenterArray = new Array<CostCenterTotal>();
      this.dashboardHttpService
        .costCenterStatus(
          this.administrationId,
          this.inventoryId,
          this.departmentId,
          this.divisionId,
          this.costCenterId
        )
        .subscribe((res: any[]) => {
          this.itemsCostCenterArray = res;
        });
    }
    ``;
  }

  public percentage(item1, item2){
    return item2 != 0 ? (item1/item2) * 100.0 : 0.0
  }
}
