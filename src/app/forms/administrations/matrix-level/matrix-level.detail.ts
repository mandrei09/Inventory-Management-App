import { Component, EventEmitter } from '@angular/core';
import { GenericDetail } from '../../generic/generic.detail';
import { Matrix } from '../../../model/api/administration/matrix';
import { Company } from '../../../model/api/assets/company';
import { CodeNameEntity } from '../../../model/api/common/code-name-entity';
import { Level } from '../../../model/api/administration/level';
import { Uom } from '../../../model/api/assets/uom';
import { MatrixLevel } from '../../../model/api/administration/matrix-level';
import { EmployeeResource } from '../../../model/api/administration/employee-resource';
import { Employee } from '../../../model/api/administration/employee';

@Component({
    selector: 'app-matrix-level-detail',
    templateUrl: 'matrix-level.detail.html',
    outputs: ['levelNeeded', 'matrixNeeded', 'uomNeeded', 'employeeNeeded']
})
export class MatrixLevelDetailComponent extends GenericDetail<MatrixLevel, number> {

    public levelNeeded: EventEmitter<void> = new EventEmitter<void>();
    public matrixNeeded: EventEmitter<void> = new EventEmitter<void>();
    public uomNeeded: EventEmitter<void> = new EventEmitter<void>();
    public employeeNeeded: EventEmitter<void> = new EventEmitter<void>();

    public selectedLevel: Level = null;
    public selectedMatrix: Matrix = null;
    public selectedUom: Uom = null;
    public selectedEmployee: Employee;

    public askForLevel() {
        this.levelNeeded.emit();
    }

    public askForMatrix() {
        this.matrixNeeded.emit();
    }

    public askForUom() {
        this.uomNeeded.emit();
    }

    public askForEmployee() {
        this.employeeNeeded.emit();
    }


    setItemDefaultValues() {
        this.item = new MatrixLevel(0, 0, null, null, null, null);
    }

    public set level(level: Level) {
        this.selectedLevel = level;
        this.item.level = level != null ? new CodeNameEntity(level.id, level.code, level.name) : null;
    }

    public set matrix(matrix: Matrix) {
        this.selectedMatrix = matrix;
        this.item.matrix = matrix != null ? new Matrix(matrix.id, matrix.appState, matrix.company,
            matrix.division,  matrix.employeeB1,  matrix.employeeL1, matrix.employeeL2, matrix.employeeL3,
            matrix.employeeL4, matrix.employeeS1, matrix.employeeS2, matrix.employeeS3, matrix.amountL1, matrix.amountL2, matrix.amountL3, matrix.amountL4, matrix.amountS1, matrix.amountS2, matrix.amountS3 ) : null;
    }

    public set uom(uom: Company) {
        this.selectedUom = uom;
        this.item.uom = uom != null ? new CodeNameEntity(uom.id, uom.code, uom.name) : null;
    }

    public set employee(employee: Employee) {
        this.selectedEmployee = employee;
        this.item.employee = employee != null ? new EmployeeResource(employee.id, employee.internalCode, employee.firstName, employee.lastName, employee.email) : null;
    }


    public saveItem() {
        if ((
            this.selectedLevel == null ||
            this.selectedMatrix == null ||
            this.selectedUom == null ||
            this.selectedEmployee == null)) {
            alert('Toate campurile sunt obligatorii!');
        } else {
            super.saveItem();
        }

        // super.saveItem();
    }
}
