import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';
import { TranslateService } from "@ngx-translate/core";
import { AppData } from "app/app-data";
import { AppConfig } from "app/config";
import { Param } from "app/model/common/param";
import { SubTypePartner } from 'app/model/api/administration/sub-type-partner';

@Component({
    selector: 'sub-type-partner-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class SubTypePartnerList extends GenericTableList<SubTypePartner, number> {
    private listName: string = 'SUBTYPEPARTNERS';

    constructor(private translate: TranslateService) {
        super('code', 'asc', '');
        this.columns = AppData.ColumnDefinitions[this.listName];
        translate.use(AppConfig.TRANSLATE_DEFAULT_LANGUAGE);
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listName];
        super.refresh(filters);
    }
}
