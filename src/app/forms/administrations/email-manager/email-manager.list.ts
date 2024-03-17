import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { EmailManager } from '../../../model/api/administration/email-manager';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';
import {EmailManagerColumnFilter} from './email-manager-column-filter';
import {Offer} from '../../../model/api/administration/offer';
import {EmailType} from '../../../model/api/administration/email-type';
import {AppState} from '../../../model/api/common/app-state';

@Component({
    selector: 'email-manager-list',
    templateUrl: '../../assets/assets/assets-filters-list/assets-filters.list.html',
    styleUrls: ['../../assets/assets/asset.list.scss'],
})
export class EmailManagerList extends GenericTableList<EmailManager, number> {

    private listName: string = 'EMAILMANAGERS';

    public _offer: Offer[] = [];
    public get offer(): Offer[] { return this._offer; }
    public set offer(value: Offer[]) { this._offer = value; this.getEmailManagerColumnFilters(); }

    public _appState: AppState[] = [];
    public get appState(): AppState[] { return this._appState; }
    public set appState(value: AppState[]) { this._appState = value; this.getEmailManagerColumnFilters(); }

    public _emailType: EmailType[] = [];
    public get emailType(): EmailType[] { return this._emailType; }
    public set emailType(value: EmailType[]) { this._emailType = value; this.getEmailManagerColumnFilters(); }

    public _date: any = null;
    public get date(): any { return this._date; }
    public set date(value: any) { this._date = value; this.getEmailManagerColumnFilters(); }

    public _prCode: string = null;
    public get prCode(): string { return this._prCode; }
    public set prCode(value: string) { this._prCode = value; this.getEmailManagerColumnFilters(); }

    public _info: string = null;
    public get info(): string { return this._info; }
    public set info(value: string) { this._info = value; this.getEmailManagerColumnFilters(); }

    public _searchedSupplier: string = null;
    public get searchedSupplier(): string { return this._searchedSupplier; }
    public set searchedSupplier(value: string) { this._searchedSupplier = value; this.getEmailManagerColumnFilters(); }

    public _partnerRegistryNumber: string = null;
    public get partnerRegistryNumber(): string { return this._partnerRegistryNumber; }
    public set partnerRegistryNumber(value: string) { this._partnerRegistryNumber = value; this.getEmailManagerColumnFilters(); }

    constructor() {
        super('id', 'asc', '');
        this.columns = AppData.ColumnDefinitions[this.listName];
        this.initializeTable();
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listName];
        this.initializeTable();
        super.refresh(filters);
    }

  public getEmailManagerColumnFilters() {
    const params = new Array<Param>();
    let offerIds: number[] = [];
    let emailTypeIds: number[] = [];
    let appStateIds: number[] = [];
    let partnerRegistryNumber: string;
    let date: any;
    let prCode: string;
    let info: string;
    let searchedSupplier : string;

    let emailManagerColumnFilter: EmailManagerColumnFilter;

    if (this.offer) offerIds = this.offer.map(p => p.id);
    if (this.emailType) emailTypeIds = this.emailType.map(p => p.id);
    if (this.appState) appStateIds = this.appState.map(p => p.id);
    if (this.date) date = this.date;
    if (this.partnerRegistryNumber) partnerRegistryNumber = this.partnerRegistryNumber;
    if (this.prCode) prCode = this.prCode;
    if (this.info) info = this.info;
    if (this.searchedSupplier) searchedSupplier = this.searchedSupplier;

    emailManagerColumnFilter = new EmailManagerColumnFilter(
      offerIds,
      appStateIds,
      emailTypeIds,
      partnerRegistryNumber,
      date,
      prCode,
      info,
      searchedSupplier
    );

    params.push(new Param('columnFilter', JSON.stringify(emailManagerColumnFilter)));

    this.refresh(params);

    return params;
  }
}

