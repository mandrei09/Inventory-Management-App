import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccMonth } from '../../model/api/accounting/acc-month';
import { AccMonthHttpService } from '../../services/http/accounting/acc-month.http.service';
import { NotificationService } from '../../services/notification.service';
import { GenericDetail } from '../generic/generic.detail';

@Component({
    selector: 'app-acc-month-detail',
    templateUrl: 'acc-month.detail.html'
})
export class AccMonthDetailComponent extends GenericDetail<AccMonth, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    public get accMonthActiveState(): string { return this.item.isActive ? 'Da' : 'Nu'; }

    setItemDefaultValues() {
        let date = new Date();
        let month = new Date().getMonth();
        let year = new Date().getFullYear();
        let firstDay = this.firstDayofMonth();
        let lastDay = this.getLastDayOfMonth();
        this.item = new AccMonth(null, month, year, false, firstDay, lastDay);
    }

    constructor(private accMonthHttpService: AccMonthHttpService, private notify: NotificationService) {
        super();

    }

    public saveItem() {
        this.accMonthHttpService.save(this.item).subscribe( (res) => {
            this.notify.showSuccess('Luna a fost creata cu success', 'Luna contabila', 0, false, 0);
        });
    }

    public resetForm() {
        this.detailForm.reset();
    }

    public updateActive(active: boolean) {
        this.item.isActive = active;
    }

    public firstDayofMonth() {
        let d = new Date();
        d.setMonth(d.getMonth() , 1);
        return d;
    }

    public  getLastDayOfMonth(){
        let today = new Date();
        return new Date(today.getFullYear(),today.getMonth() + 1, 0);
    }
}
