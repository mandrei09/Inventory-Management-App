import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppConfig } from '../../config';
import { AccMonth } from '../../model/api/accounting/acc-month';
import { Inventory } from '../../model/api/inventory/inventory';
import { GenericDetail } from '../generic/generic.detail';

@Component({
    selector: 'inventory-detail',
    templateUrl: 'inventory.detail.html',
    inputs: [ 'accMonthLink', 'accMonthSelectedEvent' ],
    outputs: ['accMonthNeeded']
})
export class InventoryDetail extends GenericDetail<Inventory, number> {

    @ViewChild('detailForm') detailForm: FormGroup;
    // @ViewChild('detailForm') detailForm: any;

    public accMonthRequired: boolean = AppConfig.ACCMONTH_REQUIRED;
    public accMonthSelectedEvent: EventEmitter<AccMonth>;
    public accMonthNeeded: EventEmitter<void> = new EventEmitter<void>();

    public selectedAccMonth: AccMonth = null;
    public accMonthLink: boolean = false;

    public get inventoryActiveState(): string { return this.item.active ? 'Da' : 'Nu'; }

    setItemDefaultValues() {
        this.item = new Inventory(0, '', new Date, new Date, false, new AccMonth(0, 0, 0, false, new Date, new Date), new AccMonth(0, 0, 0, false, new Date, new Date));
    }

    public resetForm() {
        this.detailForm.reset();
    }

    public saveItem() {
        if ((this.accMonthRequired) && (this.selectedAccMonth == null)) {
            alert('Luna contabila este obligatorie!');
        } else {
            super.saveItem();
        }
    }

    public updateActive(active: boolean) {
        this.item.active = active;
    }

    public set accMonth(accMonth: AccMonth) {
        this.selectedAccMonth = accMonth;
        this.item.accMonth = accMonth != null ? new AccMonth(accMonth.id, accMonth.month, accMonth.year,
            accMonth.isActive, accMonth.createDate, accMonth.endDate) : null;
    }

    public askForAccMonth() {
        this.accMonthNeeded.emit();
    }

    public parseDate(dateString: any): Date {
        if (dateString) {
            return new Date(dateString);
        } else {
            return null;
        }
    }

    public setAccMonth(accMonth: AccMonth) {
        this.selectedAccMonth = accMonth;
        this.item.accMonth = accMonth;
    }

    // public get allowSaving(): boolean { return ((this.detailForm != null)
    // && (this.detailForm.form.valid) && (location != null)); }
}
