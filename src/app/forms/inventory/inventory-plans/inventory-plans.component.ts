import { CostCenter } from '../../../model/api/administration/cost-center';
import { Param } from '../../../model/common/param';
import {MatDialog} from '@angular/material/dialog';
import { GenericManage } from '../../generic/generic.manage';
import { Component, ViewChild } from '@angular/core';
import { InvCommitteePlanListComponent } from './inventory-plans.list';
import { InventoryPlan } from '../../../model/api/inventory/inventory-plan';
import { InventoryPlanHttpService } from '../../../services/http/inventory/inventory-plan-detail.http.service';
import { InvCommitteMember } from '../../../model/api/inventory/committee-member';
import { Employee } from '../../../model/api/administration/employee';
import { InventoryPlansDetailDialog } from './inventory-plans-detail.dialog';
import { Administration } from '../../../model/api/administration/administration';
import { AppUtils } from "../../../common/app.utils";
import { NotificationService } from "../../../services/notification.service";

@Component({
    selector: 'app-inventory-plans',
    templateUrl: 'inventory-plans.component.html',
    styleUrls: ['inventory-plans.component.scss'],
    providers: [ InventoryPlanHttpService]
})
export class InventoryPlanComponent extends GenericManage<InventoryPlan, number>{

    @ViewChild('itemList') public itemList: InvCommitteePlanListComponent;
	public item!: InvCommitteMember | null;
	public employee!: Employee | null;
    public costCenterId: number;
    public administrationId: number;
    public filter: string = '';
    public selectedAdministrations: Array<Administration> = new Array<Administration>();

	public _costCenter: CostCenter [] = [];
    public get costCenter(): CostCenter [] { return this._costCenter }
    public set costCenter(value: CostCenter []) {
      this._costCenter = value;
		this._costCenter.length ? this.costCenterId = this._costCenter[0].id : 
        this.costCenterId=null;
    }

	public get costCenterParams(): Array<Param> {
        let addministrations: Array<Administration> = null;
        addministrations = this.selectedAdministrations;
        const params = new Array<Param>();
        params.push(new Param('administrationIds', AppUtils.getIdsList<Administration, number>(addministrations)));
        return params;
      }

    constructor(public inventoryPlansHttpService: InventoryPlanHttpService,
		public notificationSvc: NotificationService,
        public dialog: MatDialog) {
             super();
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

	  public onAddEditItem(item: InventoryPlan | null = null) {
		const dialogRef = this.dialog.open(InventoryPlansDetailDialog, {
		  panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
		  data: { item: item}
		  
		});
	
		dialogRef.afterClosed().subscribe((item: InventoryPlan) => {
			if (item !== null) this.itemList.refreshItems();
		});
	  }
	
    
      public onItemEdit(item: InventoryPlan) {
		this.onAddEditItem(item);
      }

}