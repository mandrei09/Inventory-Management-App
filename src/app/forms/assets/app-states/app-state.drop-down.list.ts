import { Component } from '@angular/core';
import { AppState } from '../../../model/api/common/app-state';
import { GenericDropDownList } from '../../generic/generic.drop-down.list';

@Component({
    selector: 'app-state-drop-down-list',
    templateUrl: '../../generic/generic.drop-down.list.html'
})
export class AppStateDropDownListComponent extends GenericDropDownList<AppState, number> {
    constructor() {
        super('name', 'asc');
    }
}
