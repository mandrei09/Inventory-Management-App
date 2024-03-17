import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectType } from '../../../model/api/assets/project-type';
import { GenericHttpService } from '../generic.http.service';
import { CommitteeMembersComponent } from '../../../forms/inventory/committee-members/committee-members.component';
import { InvCommitteeMembersListComponent } from '../../../forms/inventory/inventory-plans/inv-committee-member/inv-committee-member.list';


@Injectable()
export class CommitteeMemberHttpService extends GenericHttpService<InvCommitteeMembersListComponent, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'committeemembers');
    }
    
}
