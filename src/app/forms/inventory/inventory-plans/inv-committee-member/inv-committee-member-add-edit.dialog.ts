import { Component, Inject, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { InvCommitteMember } from "../../../../model/api/inventory/committee-member";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { CostCenter } from "../../../../model/api/administration/cost-center";
import { Employee } from "../../../../model/api/administration/employee";
import { CommitteeMemberHttpService } from "../../../../services/http/inventory/committee-member-detail.http.service";
import { EmployeesSelectionDialog } from "../../../administrations/employees/selection/employees.selection.dialog";
import { InvCommittePostion } from "../../../../model/api/inventory/inv-committee-position";
import { ModalDirective } from "ngx-bootstrap/modal";
import { CommitteePositionsListComponent } from "../../committee-positions/committee-position.list";
import { NotificationService } from "../../../../services/notification.service";
import { InvCommittee } from "../../../../model/api/inventory/inv-committtee";

@Component({
    selector: 'inv-committee-member-add-edit-dialog',
    templateUrl: 'inv-committee-member-add-edit.dialog.html',
    styleUrls: [ 'inv-committee-member-add-edit.dialog.scss' ]
})
export class InvCommitteeMemberAddEditDialog {

public form!: FormGroup;
public item!: InvCommitteMember | null;
public invCommittee!: InvCommittee | null;
public invCommitteeId: number | null = null;
public inventoryPlanId : number | null = null;
public employee!: Employee | null;
private invCommitteePositionId: number | null = null;

@ViewChild('committeePositionListModal') committeePositionListModal: ModalDirective;
@ViewChild('committeePositionList') committeePositionList: CommitteePositionsListComponent;
public filter: string = '';

constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: CommitteeMemberHttpService,
    public notificationSvc: NotificationService,
    public dialogRef: MatDialogRef<InvCommitteeMemberAddEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.item = data.item;
    this.item = data.employee;
    this.invCommitteeId = data.invCommitteeId;
    this.inventoryPlanId = data.inventoryPlanId;
    this.createForm();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.item !== null) {
        this.editItem(this.item);
      } else this.addItem();
    }, 0);
  }

  public addItem() {
     this.item = new InvCommitteMember();
     this.item.id = 0;
     this.form.patchValue(this.item);
  }

  public editItem(item: InvCommitteMember) {
    this.employee = item.employee!;
    this.invCommittee = item.invCommittee!;
    
     this.form.patchValue(item);
  }

  private createForm() {
    this.form = this.fb.group({
        employee: [null],
        invCommitteePosition: [null]
    });
  }

  protected updateItem() {
    const formModel = this.form.value;
    this.item!.employee = this.employee;
    this.item!.employeeId = this.employee.id;
    this.item!.invCommitteePositionId = null;
    if ((formModel.invCommitteePosition !== null)) this.item!.invCommitteePositionId = formModel.invCommitteePosition?.id as number;
    this.item!.invCommitteeId = this.invCommitteeId;
    this.item!.inventoryPlanId = this.inventoryPlanId
  }

  public save() {
    this.updateItem();
    if (this.item!.id! > 0) {
      this.dataSource.update(this.item!).subscribe(() => {
        this.dialogRef.close();
        this.notificationSvc.showSuccess('Membrul comisiei a fost actualizat cu succes!', 'Membri comisie', 1000, false, 0);
      });
    } else {
      this.dataSource.create(this.item!).subscribe((item: InvCommitteMember | null) => {
        this.item = item;
        this.dialogRef.close();
        this.notificationSvc.showSuccess('Membrul comisiei a fost adaugat cu succes!', 'Membri comisie', 1000, false, 0);
      });
    }
  }

  selectEmployee() {
    const dialogRef = this.dialog.open(EmployeesSelectionDialog, { panelClass: 'centered-middle-modal', width: '80%', maxWidth: '100%', maxHeight: '95%', height: '95%' });
    dialogRef.afterClosed().subscribe((employees) => {
      if (employees !== null && employees !== undefined && employees.length > 0) {
        this.employee = employees[0];
      }
    });
  }
}