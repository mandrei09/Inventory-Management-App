
import { Component } from '@angular/core';
import { GenericDetail } from '../generic/generic.detail';

@Component({
    selector: 'app-info-manage',
    templateUrl: 'info.manage.html',
})
export class InfoManageComponent extends GenericDetail<any, number> {

}
