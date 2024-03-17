import { Component } from '@angular/core';
import { Activity } from '../../../model/api/assets/activity';
import { GenericDropDownList } from '../../generic/generic.drop-down.list';

@Component({
    selector: 'activity-drop-down-list',
    templateUrl: '../../generic/generic.drop-down.list.html'
})
export class ActivityDropDownList extends GenericDropDownList<Activity, number> {
    constructor() {
        super('name', 'asc');
    }
}