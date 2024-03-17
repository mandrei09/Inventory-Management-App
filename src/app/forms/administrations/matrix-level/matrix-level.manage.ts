import { Param } from './../../../model/common/param';
import { Component, ViewChild } from '@angular/core';
import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Matrix } from '../../../model/api/administration/matrix';
import { MatrixHttpService } from '../../../services/http/administration/matrix.http.service';
import { LevelHttpService } from '../../../services/http/administration/level.http.service';
import { UomHttpService } from '../../../services/http/assets/uom.http.service';
import { MatrixLevel } from '../../../model/api/administration/matrix-level';
import { MatrixLevelDetailComponent } from './matrix-level.detail';
import { LevelListComponent } from '../level/level.list';
import { UomListComponent } from '../../assets/uoms/uom.list';
import { Level } from '../../../model/api/administration/level';
import { Uom } from '../../../model/api/assets/uom';
import { MatrixLevelHttpService } from '../../../services/http/administration/matrix-level.http.service';
import { EmployeeHttpService } from '../../../services/http/administration/employee.http.service';
import { EmployeeListComponent } from '../employees/employee.list';
import { EmployeeResource } from '../../../model/api/administration/employee-resource';
import { MatrixListComponent } from '../matrix/matrix.list';
import { AppUtils } from '../../../common/app.utils';
import { Employee } from '../../../model/api/administration/employee';

@Component({
    selector: 'app-matrix-level-manage',
    templateUrl: 'matrix-level.manage.html',
    providers: [ LevelHttpService, MatrixHttpService, UomHttpService, EmployeeHttpService ]
})
export class MatrixLevelManageComponent extends GenericManage<MatrixLevel, number> {

    @ViewChild('matrixLevelDetail') public matrixLevelDetail: MatrixLevelDetailComponent;
    @ViewChild('matrixLevelList') public matrixLevelList: MatrixListComponent;
    @ViewChild('matrixLevelDetailModal') matrixLevelDetailModal: ModalDirective;
    @ViewChild('levelListModal') levelListModal: ModalDirective;
    @ViewChild('levelList') public levelList: LevelListComponent;
    @ViewChild('matrixListModal') matrixListModal: ModalDirective;
    @ViewChild('matrixList') public matrixList: MatrixListComponent;
    @ViewChild('uomListModal') uomListModal: ModalDirective;
    @ViewChild('uomList') public uomList: UomListComponent;
    @ViewChild('employeeListModal') employeeListModal: ModalDirective;
    @ViewChild('employeeList') employeeList: EmployeeListComponent;

    public filter: string = '';
    isCollapsed: boolean = true;
    public selectedLevel: Level = null;
    public selectedMatrix: Matrix = null;
    public selectedUom: Uom = null;
    public selectedEmployee: Employee = null;

    constructor(public levelHttpService: LevelHttpService,
                public matrixHttpService: MatrixHttpService,
                public uomHttpService: UomHttpService,
                public employeeHttpService: EmployeeHttpService,
                public matrixLevelHttpService: MatrixLevelHttpService) {
        super();
    }

    public addNewItem() {
        super.addNewItem();

        this.matrixLevelDetail.level = null;
        this.matrixLevelDetail.matrix = null;
        this.matrixLevelDetail.uom = null;
        this.matrixLevelDetail.employee = null;
    }

    public editItem() {
        super.editItem();

        const matrixLevel: MatrixLevel = this.selectedItem as MatrixLevel;

        this.matrixLevelDetail.level = null;

        if (matrixLevel != null && matrixLevel.level != null) {
            this.levelHttpService
                .getById(matrixLevel.level.id)
                .subscribe((level: Level) => {
                    this.matrixLevelDetail.level = level;
                });
        }

        this.matrixLevelDetail.matrix = null;

        if (matrixLevel != null && matrixLevel.matrix != null) {
            this.matrixHttpService
                .getById(matrixLevel.matrix.id)
                .subscribe((matrix: Matrix) => {
                    this.matrixLevelDetail.matrix = matrix;
                });
        }

        this.matrixLevelDetail.uom = null;

        if (matrixLevel != null && matrixLevel.uom != null) {
            this.uomHttpService
                .getById(matrixLevel.uom.id)
                .subscribe((uom: Uom) => {
                    this.matrixLevelDetail.uom = uom;
                });
        }

        this.matrixLevelDetail.employee = null;

        if ((matrixLevel != null) && (matrixLevel.employee != null)) {
            this.employeeHttpService
                .getById(matrixLevel.employee.id)
                .subscribe((employee: Employee) => {
                    this.matrixLevelDetail.employee = employee;
                });
        }
    }

    public detailInitialize() {
        super.detailInitialize();
        this.matrixLevelDetailModal.show();
    }

    public detailTerminate() {
        super.detailTerminate();
        this.matrixLevelDetailModal.hide();
    }

    public selectLevel() {
        this.levelListModal.show();
        this.levelList.refresh(null);
    }

    public selectMatrix() {
        this.matrixListModal.show();
        this.matrixList.refresh(null);
    }

    public selectUom() {
        this.uomListModal.show();
        this.uomList.refresh(null);
    }

    public selectEmployee() {
        this.employeeListModal.show();
        this.employeeList.refresh(null);
    }


    public onMatrixLevelDetailMatrixNeeded() {
        this.matrixLevelDetailModal.hide();
        this.selectMatrix();
    }

    public onMatrixListCancel() {
        this.matrixListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.matrixLevelDetailModal.show();
        }
    }

    public onMatrixLevelDetailLevelNeeded() {
        this.matrixLevelDetailModal.hide();
        this.selectLevel();
    }

    public onLevelListCancel() {
        this.levelListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.matrixLevelDetailModal.show();
        }
    }

    public onMatrixLevelDetailUomNeeded() {
        this.matrixLevelDetailModal.hide();
        this.selectUom();
    }

    public onUomListCancel() {
        this.uomListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.matrixLevelDetailModal.show();
        }
    }


    public onMatrixLevelDetailEmployeeNeeded() {
        this.matrixLevelDetailModal.hide();
        this.selectEmployee();
    }

    public onEmployeeListCancel() {
        this.employeeListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.matrixLevelDetailModal.show();
        }
    }


    public getFilters(): Array<Param> {
        const params: Array<Param> = new Array<Param>();
        params.push(new Param('filter', this.filter));
        // params.push(new Param('admCenterIds', AppUtils.getIdsList<AdmCenter, number>([this.selectedAdmCenter])));
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
        this.matrixLevelList.refresh(params);
    }

    public setSelectedMatrix() {
        switch (this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedMatrix = this.matrixList.selectedItem;
                this.matrixListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.matrixLevelDetail.matrix = this.matrixList.selectedItem;
                this.matrixListModal.hide();
                this.matrixLevelDetailModal.show();
                break;
        }
    }

    public unselectMatrix() {
        this.selectedMatrix = null;
        this.refresh();
    }


    public setSelectedLevel() {
        switch (this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedLevel = this.levelList.selectedItem;
                this.levelListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.matrixLevelDetail.level = this.levelList.selectedItem;
                this.levelListModal.hide();
                this.matrixLevelDetailModal.show();
                break;
        }
    }

    public unselectLevel() {
        this.selectedLevel = null;
        this.refresh();
    }

    public setSelectedUom() {
        switch (this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedUom = this.uomList.selectedItem;
                this.uomListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.matrixLevelDetail.uom = this.uomList.selectedItem;
                this.uomListModal.hide();
                this.matrixLevelDetailModal.show();
                break;
        }
    }

    public unselectUom() {
        this.selectedUom = null;
        this.refresh();
    }


    public setSelectedEmployee() {
        switch (this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedEmployee = this.employeeList.selectedItem;
                this.employeeListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.matrixLevelDetail.employee = this.employeeList.selectedItem;
                this.employeeListModal.hide();
                this.matrixLevelDetailModal.show();
                break;
            default:
                break;
        }
    }

    public unselectEmployee() {
        this.selectedEmployee = null;
        this.refresh();
    }

    public exportToExcel() {

        let params: Array<Param> = null;

        // params = this.getFilters();
        // this.costCenterHttpService
        //     .export(params)
        //     .subscribe((blob) => {
        //         fileSaveAs(blob, 'cost_centers.xlsx');
        //     });
    }

    collapsed(event: any): void {
        // console.log(event);
      }

      expanded(event: any): void {
        // console.log(event);
      }
}
