import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';

import { Division } from '../../../model/api/administration/division';
import { Administration } from '../../../model/api/administration/administration';
import { AppConfig } from '../../../config';
import { CostCenter } from '../../../model/api/administration/cost-center';
import { CodeNameEntity } from '../../../model/api/common/code-name-entity';

@Component({
    selector: 'app-administration-detail',
    templateUrl: 'administration.detail.html',
    inputs: [ 'divisionLink', 'divisionSelectedEvent' ],
    outputs: ['divisionNeeded', 'costCenterNeeded']
})
export class AdministrationDetailComponent extends GenericDetail<Administration, number> {

    @ViewChild('detailForm') detailForm: FormGroup;
    // @ViewChild('detailForm') detailForm: any;

    public divisionRequired: boolean = AppConfig.DIVISION_REQUIRED;
    public divisionSelectedEvent: EventEmitter<Division>;
    public divisionNeeded: EventEmitter<void> = new EventEmitter<void>();

    public costCenterRequired: boolean = AppConfig.COSTCENTER_REQUIRED;
    public costCenterSelectedEvent: EventEmitter<CostCenter>;
    public costCenterNeeded: EventEmitter<void> = new EventEmitter<void>();

    public selectedDivision: Division = null;
    public divisionLink: boolean = false;

    public selectedCostCenter: CostCenter = null;
    public costCenterLink: boolean = false;

    setItemDefaultValues() {
        this.item = new Administration(0, '', '', null, null);
    }

    public resetForm() {
        this.detailForm.reset();
    }

    public saveItem() {
        // if ((this.divisionRequired) && (this.selectedDivision == null)) {
        //     alert('Structura este obligatorie!');
        // }
        // else {
        //     super.saveItem();
        // }

        super.saveItem();
    }

    public set division(division: Division) {
        this.selectedDivision = division;
        this.item.division = division != null ? new CodeNameEntity(division.id, division.code, division.name) : null;
    }

    public askForDivision() {
        this.divisionNeeded.emit();
    }

    public set costCenter(costCenter: CostCenter) {
        this.selectedCostCenter = costCenter;
        this.item.costCenter = costCenter != null ? new CodeNameEntity(costCenter.id, costCenter.code, costCenter.name) : null;
    }

    public askForCostCenter() {
        this.costCenterNeeded.emit();
    }




    // public get allowSaving(): boolean { return ((this.detailForm != null) && (this.detailForm.form.valid) && (location != null)); }
}
