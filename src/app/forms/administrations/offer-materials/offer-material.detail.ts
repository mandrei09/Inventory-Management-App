import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { off } from 'process';
import { CostCenter } from '../../../model/api/administration/cost-center';
import { EmployeeCostCenter } from '../../../model/api/administration/employee-cost-center';
import { EmployeeResource } from '../../../model/api/administration/employee-resource';
import { Offer } from '../../../model/api/administration/offer';
import { OfferMaterial } from '../../../model/api/administration/offer-material';
import { CodeNameEntity } from '../../../model/api/common/code-name-entity';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'app-offer-material-detail',
    templateUrl: 'offer-material.detail.html',
    styleUrls: ['offer-material.detail.scss'],
    outputs: ['offerNeeded', 'materialNeeded']
})
export class OfferMaterialDetailComponent extends GenericDetail<OfferMaterial, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    public offerNeeded: EventEmitter<void> = new EventEmitter<void>();
    public materialNeeded: EventEmitter<void> = new EventEmitter<void>();

    public selectedOffer: Offer = null;
    public selectedMaterial: CodeNameEntity = null;

    setItemDefaultValues() {
        this.item = new OfferMaterial(0, null, null);
    }

    public resetForm() {
        this.detailForm.reset();
    }

    public saveItem() {
      super.saveItem();
    }

    public set offer(offer: Offer) {
        this.selectedOffer = offer;
        this.item.offer = offer != null ? new Offer(offer.id, offer.code, offer.name, offer.partner, offer.company, offer.admCenter, offer.assetType, offer.request, offer.budgetForecast, offer.uom, offer.offerType) : null;
    }

    public askForOffer() {
        this.offerNeeded.emit();
    }

    public set material(material: CodeNameEntity) {
        this.selectedMaterial = material;
        this.item.material = material != null ? new CodeNameEntity(material.id, material.code, material.name) : null;
    }

    public askForMaterial() {
        this.materialNeeded.emit();
    }
}
