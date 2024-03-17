import { Component, Inject, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { Employee } from "../../../model/api/administration/employee";
import { CommitteeMemberHttpService } from "../../../services/http/inventory/committee-member-detail.http.service";
import { InvCommittePostion } from "../../../model/api/inventory/inv-committee-position";
import { NotificationService } from "../../../services/notification.service";
import { InvCommitteMember } from "../../../model/api/inventory/committee-member";
import { EmployeesSelectionDialog } from "../../administrations/employees/selection/employees.selection.dialog";
import { InvCommittee } from "../../../model/api/inventory/inv-committtee";
import { InventoryPlan } from "../../../model/api/inventory/inventory-plan";
import { ModalDirective } from "ngx-bootstrap/modal";
import { CommitteePositionsListComponent } from "../committee-positions/committee-position.list";
import { InventoryPlanHttpService } from "../../../services/http/inventory/inventory-plan-detail.http.service";
import { InvCommitteeMemberAddEditDialog as InvCommitteeMemberAddEditDialog } from "./inv-committee-member/inv-committee-member-add-edit.dialog";
import { InvCommitteePlanListComponent } from "./inventory-plans.list";
import { InvCommitteeMembersListComponent } from "./inv-committee-member/inv-committee-member.list";
import { Param } from '../../../model/common/param';
import { AppUtils } from "../../../common/app.utils";
import { DatePipe } from "@angular/common";

@Component({
    selector: 'inventory-plans-detail-dialog',
    templateUrl: './inventory-plans-detail.dialog.html',
    styleUrls: [ './inventory-plans-detail.dialog.scss' ]
})
export class InventoryPlansDetailDialog {

public filter: string = '';
public form!: FormGroup;
public item!: InventoryPlan | null; 
public invCommittee!: InvCommittee | null;
public employee!: Employee | null;
@ViewChild('itemList') public itemList: InvCommitteeMembersListComponent;

constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: InventoryPlanHttpService,
    private invCommitteeMemberHttpService: CommitteeMemberHttpService,
    public notificationSvc: NotificationService,
    public dialogRef: MatDialogRef<InventoryPlansDetailDialog>,
    public datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm();
    this.item = data.item;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.item !== null) {
        this.editItem(this.item);
      } else this.addItem();
    }, 0);
  }

  public getFilters(): Array<Param> {
    const params: Array<Param> = new Array<Param>();
    params.push(new Param('filter', this.filter));
    params.push(new Param('invCommitteeId', this.item.invCommitteeId.toString()));
    return params;
  }

  public addItem() {

    this.item = new InventoryPlan();
    this.item.id = 0;
    this.form.patchValue(this.item);
  }

  public editItem(item: InventoryPlan) {
    this.form.patchValue(item);
    let params: Array<Param> = null;
    params = this.getFilters();
    this.itemList.refresh(params);
  }

  private createForm() {
    this.form = this.fb.group({
        dateStarted: [null],
        dateFinished: [null]
    });
  }

  protected updateItem() {
    const formModel = this.form.value;
    if ((formModel.dateStarted !== null)) this.item!.dateStarted = formModel.dateStarted as Date;
    if ((formModel.dateFinished !== null)) this.item!.dateFinished = formModel.dateFinished as Date;
  }

  public save() {
    this.updateItem();
    if (this.item!.id! > 0) {
      this.dataSource.UpdateInventorPlan(this.item!).subscribe(() => {
        this.dialogRef.close();
			  this.notificationSvc.showSuccess('Planificarea a fost actualizata cu succes!', 'Membri comisie', 1000, false, 0);
      });
    } else {
      // this.dataSource.create(this.item!).subscribe((item: InventoryPlan | null) => {
      //   this.item = item;
      //   this.dialogRef.close();
      //   this.notificationSvc.showSuccess('Inregistrarea a fost adaugata cu succes!', 'Membri comisie', 3000, false, 0);
      // });
    }
  }

  public onCommitteeEmployeeAdd(item: Employee | null = null) {
    const dialogRef = this.dialog.open(InvCommitteeMemberAddEditDialog, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { invCommitteeId: this.item.invCommitteeId, employee: item, inventoryPlanId : this.item.id}
    });
    dialogRef.afterClosed().subscribe((item: InvCommitteMember) => {
      if (item !== null) this.itemList.refreshItems();
    });
  }

  onEmployeeItemEdit(item: Employee) {
    let dialogRef = this.dialog.open(InvCommitteeMemberAddEditDialog, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { invCommitteeId: this.item.invCommitteeId, employee: item }
    });
    dialogRef.afterClosed().subscribe((item: InvCommitteMember) => {
      if (item !== null) this.itemList.refreshItems();
    });
  }

  public async itemDeleted(item: InvCommitteMember) {
    await this.invCommitteeMemberHttpService.delete(item.id).toPromise();
    this.itemList.refreshItems();
    this.notificationSvc.showSuccess('Inregistrarea a fost stearsa cu succes!', 'Membri comisie', 1000, false, 0);
  }

}