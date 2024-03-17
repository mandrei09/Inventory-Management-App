import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Order } from '../../../model/api/administration/order';
import { OrderMaterial } from '../../../model/api/administration/order-material';
import { CodeNameEntity } from '../../../model/api/common/code-name-entity';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'app-order-material-detail',
    templateUrl: 'order-material.detail.html',
    outputs: ['orderNeeded', 'materialNeeded']
})
export class OrderMaterialDetailComponent extends GenericDetail<OrderMaterial, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    public orderNeeded: EventEmitter<void> = new EventEmitter<void>();
    public materialNeeded: EventEmitter<void> = new EventEmitter<void>();

    public selectedOrder: Order = null;
    public selectedMaterial: CodeNameEntity = null;

    setItemDefaultValues() {
        this.item = new OrderMaterial(0, null, null);
    }

    public resetForm() {
        this.detailForm.reset();
    }

    public saveItem() {
      super.saveItem();
    }

    public set order(order: Order) {
        this.selectedOrder = order;
        this.item.order = order != null ? new Order(order.id, order.code, order.name, order.offer, order.budget, null, null, null, null, null, null, null, null, null, null, null, '') : null;
    }

    public askForOrder() {
        this.orderNeeded.emit();
    }

    public set material(material: CodeNameEntity) {
        this.selectedMaterial = material;
        this.item.material = material != null ? new CodeNameEntity(material.id, material.code, material.name) : null;
    }

    public askForMaterial() {
        this.materialNeeded.emit();
    }
}
