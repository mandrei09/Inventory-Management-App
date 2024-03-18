import { Component, EventEmitter } from '@angular/core';
import { GenericDetail } from '../../generic/generic.detail';
import { Matrix } from '../../../model/api/administration/matrix';
import { Company } from '../../../model/api/assets/company';
import { CodeNameEntity } from '../../../model/api/common/code-name-entity';
import { EmployeeResource } from '../../../model/api/administration/employee-resource';
import { Division } from '../../../model/api/administration/division';

@Component({
    selector: 'app-matrix-detail',
    templateUrl: 'matrix.detail.html',
    outputs: [
      'companyNeeded',
      'divisionNeeded',
      'employeeL1Needed',
      'employeeL2Needed',
      'employeeL3Needed',
      'employeeL4Needed',
      'employeeS1Needed',
      'employeeS2Needed',
      'employeeS3Needed']
})
export class MatrixDetailComponent extends GenericDetail<Matrix, number> {

    // public areaNeeded: EventEmitter<void> = new EventEmitter<void>();
    // public assetTypeNeeded: EventEmitter<void> = new EventEmitter<void>();
    public companyNeeded: EventEmitter<void> = new EventEmitter<void>();
    public divisionNeeded: EventEmitter<void> = new EventEmitter<void>();
    // public costCenterNeeded: EventEmitter<void> = new EventEmitter<void>();
    // public countryNeeded: EventEmitter<void> = new EventEmitter<void>();
    // public projectNeeded: EventEmitter<void> = new EventEmitter<void>();
    public employeeL1Needed: EventEmitter<void> = new EventEmitter<void>();
    public employeeL2Needed: EventEmitter<void> = new EventEmitter<void>();
    public employeeL3Needed: EventEmitter<void> = new EventEmitter<void>();
    public employeeL4Needed: EventEmitter<void> = new EventEmitter<void>();
    public employeeS1Needed: EventEmitter<void> = new EventEmitter<void>();
    public employeeS2Needed: EventEmitter<void> = new EventEmitter<void>();
    public employeeS3Needed: EventEmitter<void> = new EventEmitter<void>();

    // public selectedArea: Area = null;
    // public selectedAssetType: AssetType = null;
    public selectedCompany: Company = null;
    public selectedDivision: Division = null;
    // public selectedCostCenter: CostCenter;
    // public selectedCountry: Country;
    // public selectedProject: Project;
    public selectedEmployeeL1: EmployeeResource;
    public selectedEmployeeL2: EmployeeResource;
    public selectedEmployeeL3: EmployeeResource;
    public selectedEmployeeL4: EmployeeResource;
    public selectedEmployeeS1: EmployeeResource;
    public selectedEmployeeS2: EmployeeResource;
    public selectedEmployeeS3: EmployeeResource;

    // public askForArea() {
    //     this.areaNeeded.emit();
    // }

    // public askForAssetType() {
    //     this.assetTypeNeeded.emit();
    // }

    public askForCompany() {
        this.companyNeeded.emit();
    }

    public askForDivision() {
      this.divisionNeeded.emit();
  }

    // public askForCostCenter() {
    //     this.costCenterNeeded.emit();
    // }

    // public askForCountry() {
    //     this.countryNeeded.emit();
    // }

    // public askForProject() {
    //     this.projectNeeded.emit();
    // }

    public askForEmployeeL1() {
        this.employeeL1Needed.emit();
    }

    public askForEmployeeL2() {
        this.employeeL2Needed.emit();
    }

    public askForEmployeeL3() {
        this.employeeL3Needed.emit();
    }

    public askForEmployeeL4() {
        this.employeeL4Needed.emit();
    }

    public askForEmployeeS1() {
        this.employeeS1Needed.emit();
    }

    public askForEmployeeS2() {
        this.employeeS2Needed.emit();
    }

    public askForEmployeeS3() {
        this.employeeS3Needed.emit();
    }

    setItemDefaultValues() {
        this.item = new Matrix(0, null, null, null, null, null, null, null, null, null, null, null, 0, 0, 0,0 , 0, 0, 0);
    }

    // public set area(area: Area) {
    //     this.selectedArea = area;
    //     this.item.area = area != null ? new CodeNameEntity(area.id, area.code, area.name) : null;
    // }

    // public set assetType(assetType: AssetType) {
    //     this.selectedAssetType = assetType;
    //     this.item.assetType = assetType != null ? new CodeNameEntity(assetType.id, assetType.code, assetType.name) : null;
    // }

    // public set country(country: Country) {
    //     this.selectedCountry = country;
    //     this.item.country = country != null ? new CodeNameEntity(country.id, country.code, country.name) : null;
    // }

    public set company(company: Company) {
        this.selectedCompany = company;
        this.item.company = company != null ? new CodeNameEntity(company.id, company.code, company.name) : null;
    }

    public set division(division: Division) {
      this.selectedDivision = division;
      this.item.division = division != null ? new CodeNameEntity(division.id, division.code, division.name) : null;
  }

    // public set costCenter(costCenter: CostCenter) {
    //     this.selectedCostCenter = costCenter;
    //     this.item.costCenter = costCenter != null ? new CodeNameEntity(costCenter.id, costCenter.code, costCenter.name) : null;
    // }

    // public set project(project: Project) {
    //     this.selectedProject = project;
    //     this.item.project = project != null ? new CodeNameEntity(project.id, project.code, project.name) : null;
    // }

    public set employeeL1(employeeL1: EmployeeResource) {
        this.selectedEmployeeL1 = employeeL1;
        this.item.employeeL1 = employeeL1 != null ? new EmployeeResource(employeeL1.id, employeeL1.internalCode, employeeL1.firstName, employeeL1.lastName, employeeL1.email) : null;
    }

    public set employeeL2(employeeL2: EmployeeResource) {
        this.selectedEmployeeL2 = employeeL2;
        this.item.employeeL2 = employeeL2 != null ? new EmployeeResource(employeeL2.id, employeeL2.internalCode, employeeL2.firstName, employeeL2.lastName, employeeL2.email) : null;
    }

    public set employeeL3(employeeL3: EmployeeResource) {
        this.selectedEmployeeL3 = employeeL3;
        this.item.employeeL3 = employeeL3 != null ? new EmployeeResource(employeeL3.id, employeeL3.internalCode, employeeL3.firstName, employeeL3.lastName, employeeL3.email) : null;
    }

    public set employeeL4(employeeL4: EmployeeResource) {
        this.selectedEmployeeL4 = employeeL4;
        this.item.employeeL4 = employeeL4 != null ? new EmployeeResource(employeeL4.id, employeeL4.internalCode, employeeL4.firstName, employeeL4.lastName, employeeL4.email) : null;
    }

    public set employeeS1(employeeS1: EmployeeResource) {
        this.selectedEmployeeS1 = employeeS1;
        this.item.employeeS1 = employeeS1 != null ? new EmployeeResource(employeeS1.id, employeeS1.internalCode, employeeS1.firstName, employeeS1.lastName, employeeS1.email) : null;
    }

    public set employeeS2(employeeS2: EmployeeResource) {
        this.selectedEmployeeS2 = employeeS2;
        this.item.employeeS2 = employeeS2 != null ? new EmployeeResource(employeeS2.id, employeeS2.internalCode, employeeS2.firstName, employeeS2.lastName, employeeS2.email) : null;
    }

    public set employeeS3(employeeS3: EmployeeResource) {
        this.selectedEmployeeS3 = employeeS3;
        this.item.employeeS3 = employeeS3 != null ? new EmployeeResource(employeeS3.id, employeeS3.internalCode, employeeS3.firstName, employeeS3.lastName, employeeS3.email) : null;
    }


    public saveItem() {
        if ((
            // this.selectedArea == null ||
            // this.selectedAssetType == null ||
            // this.selectedCountry == null ||
            this.selectedCompany == null ||
            this.selectedDivision == null ||
            // this.selectedCostCenter == null ||
            // this.selectedProject == null ||
            this.selectedEmployeeL1 == null ||
            this.selectedEmployeeL2 == null ||
            this.selectedEmployeeL3 == null ||
            this.selectedEmployeeL4 == null ||
            this.selectedEmployeeS1 == null ||
            this.selectedEmployeeS2 == null ||
            this.selectedEmployeeS3 == null)) {
            alert('Toate campurile sunt obligatorii!');
        } else {
            super.saveItem();
        }

        // super.saveItem();
    }
}
