import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
import { CommitteeMembersComponent } from '../../../forms/inventory/committee-members/committee-members.component';
import { CommitteePositionsListComponent } from '../../../forms/inventory/committee-positions/committee-position.list';


@Injectable()
export class CommitteePositionHttpService extends GenericHttpService<CommitteePositionsListComponent, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'committeepositions');
    }
    
}
