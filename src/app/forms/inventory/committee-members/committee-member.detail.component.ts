import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Level } from '../../../model/api/administration/level';
import { GenericDetail } from '../../generic/generic.detail';
import { InvCommitteMember } from '../../../model/api/inventory/committee-member';

@Component({
    selector: 'app-committee-member-detail',
    templateUrl: 'committee-member.detail.html',
})
export class CommitteeMembersDetailComponent extends GenericDetail<InvCommitteMember, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new InvCommitteMember();
    }

    public resetForm() {
        this.detailForm.reset();
    }
}
