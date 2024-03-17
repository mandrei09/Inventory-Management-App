import { Component, Inject } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { InvCommitteMember } from "./../../../model/api/inventory/committee-member";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { CostCenter } from "./../../../model/api/administration/cost-center";
import { Administration } from "./../../../model/api/administration/administration";
import { Employee } from "./../../../model/api/administration/employee";
import { CommitteeMemberHttpService } from "../../../services/http/inventory/committee-member-detail.http.service";
import { EmployeesSelectionDialog } from "../../administrations/employees/selection/employees.selection.dialog";

@Component({
    selector: 'committee-member-add-edit-dialog',
    templateUrl: 'committee-member.add-edit.dialog.html',
    styleUrls: [ 'committee-member.add-edit.dialog.scss' ]
})
export class CommitteeMemberAddEditDialog  {

public form!: FormGroup;
public item!: InvCommitteMember | null;
public administration!: Administration | null;
public employee!: Employee | null;
private costCenterId: number | null = null;
private administrationId: number | null = null;
constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: CommitteeMemberHttpService,
    public dialogRef: MatDialogRef<CommitteeMemberAddEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm();
    this.administration = data.administration;
    this.item = data.employee;
    if (data.administrationId) this.administrationId = data.administrationId;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.item !== null) {
        this.editItem(this.item);
      } else this.addItem();
    }, 0);
  }

  public addItem() {
    // @ts-ignore
    this.item = new InvCommitteMember();
    this.item.id = 0;
    this.form.patchValue(this.item);
  }

  public editItem(item: InvCommitteMember) {
    // this.administration = item.administration!;
    this.employee = item.employee!;
    this.form.patchValue(item);
  }

  private createForm() {
    this.form = this.fb.group({
        // costCenterId: [null],
        // administrationId: [null],
        administration: [null],
        employee: [null]
    });
  }

  protected updateItem() {
    const formModel = this.form.value;

    // this.item!.administration = this.administration;
    this.item!.employee = this.employee;
    // this.item!.administrationId = this.administration.id;
    this.item!.employeeId = this.employee.id;
  }

  public save() {
    this.updateItem();
    if (this.item!.id! > 0) {
      this.dataSource.update(this.item!).subscribe(() => {
        this.dialogRef.close();
        // this.notificationSvc.success('Inregistrarea a fost modificata cu succes!');
      });
    } else {
      this.dataSource.create(this.item!).subscribe((item: InvCommitteMember | null) => {
        this.item = item;
        this.dialogRef.close();
        // this.notificationSvc.success('Inregistrarea a fost adaugata cu succes!');
      });
    }
  }

  selectEmployee() {
    
    const dialogRef = this.dialog.open(EmployeesSelectionDialog, { panelClass: 'centered-middle-modal', width: '80%', maxWidth: '60%', maxHeight: '80%', height: '80%' });

    dialogRef.afterClosed().subscribe((employees) => {
      if (employees !== null && employees !== undefined && employees.length > 0) {
        this.employee = employees[0];
      }
    });
  }

}