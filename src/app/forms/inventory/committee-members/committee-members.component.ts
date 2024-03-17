import { CostCenterHttpService } from './../../../services/http/administration/cost-center.http.service';
import { Component, EventEmitter, ViewChild} from '@angular/core';
import { AdmCenterHttpService } from '../../../services/http/administration/adm-center.http.service';
import { AssetHttpService } from '../../../services/http/assets/asset.http.service';
import { InventoryHttpService } from '../../../services/http/inventory/inventory.http.service';
import { EmployeeHttpService } from '../../../services/http/administration/employee.http.service';
import { CostCenter } from './../../../model/api/administration/cost-center';
import { Param } from '../../../model/common/param';
import { InvCommitteeMembersListComponent } from '../inventory-plans/inv-committee-member/inv-committee-member.list';
import {MatDialog} from '@angular/material/dialog';
import { CommitteeMemberHttpService } from '../../../services/http/inventory/committee-member-detail.http.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CommitteeMemberAddEditDialog } from './committee-member.add-edit.dialog';
import { CommitteeMembersDetailComponent } from './committee-member.detail.component';
import { GenericManage } from '../../generic/generic.manage';
import { InvCommitteMember } from '../../../model/api/inventory/committee-member';
import { Administration } from '../../../model/api/administration/administration';

@Component({
    selector: 'app-committee-member',
    templateUrl: 'committee-members.component.html',
    styleUrls: ['committee-members.component.scss'],
    providers: [ CommitteeMemberHttpService]
})
export class CommitteeMembersComponent extends GenericManage<InvCommitteMember, number>{

    public filter: string = '';
    public item!: Administration | null;
    
    public selectedCostCenters: Array<CostCenter> = new Array<CostCenter>();
    
    @ViewChild('itemList') public itemList: InvCommitteeMembersListComponent;
    @ViewChild('itemModalList') itemModalList: ModalDirective;
    @ViewChild('itemDetail') itemDetail: CommitteeMembersDetailComponent;

    constructor(public committeeMemberHttpService: CommitteeMemberHttpService,
        public dialog: MatDialog) {
             super();
        }
    
    public _costCenters: CostCenter[] = [];
    public get costCenters(): CostCenter[] { return this._costCenters; }
    public set costCenters(value: CostCenter[]) {
      this._costCenters = value;

      this.selectedCostCenters = value;
      this.refreshItems();
    }

    doSimpleSearch($event: string) {
        this.filter = $event;
        this.refreshItems();
      }
      
    public refreshItems() {
        const params: Array<Param> = new Array<Param>();
        params.push(new Param('filter', this.filter));
        this.itemList.refresh(params);
    }

    public onAddNew() {
        this.onAddEditItem();
      }
    
      public onAddEditItem(item: InvCommitteMember | null = null) {
        const dialogRef = this.dialog.open(CommitteeMemberAddEditDialog, {
          panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
          data: {item: this.item, employee: item }
        });
    
        dialogRef.afterClosed().subscribe((item: CommitteeMembersComponent) => {
          // if (item !== null) this.refresh();
        });
      }
    
      public onItemEdit(item: CommitteeMembersComponent) {
       // this.onAddEditItem(item);
      }
  
}



