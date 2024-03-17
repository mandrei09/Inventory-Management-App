import { Component, Inject, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { InvCommitteMember } from "../../../../model/api/inventory/committee-member";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { Administration } from "../../../../model/api/administration/administration";
import { Employee } from "../../../../model/api/administration/employee";
import { CommitteeMemberHttpService } from "../../../../services/http/inventory/committee-member-detail.http.service";
import { EmployeesSelectionDialog } from "../../employees/selection/employees.selection.dialog";
import { InvCommittePostion } from "../../../../model/api/inventory/inv-committee-position";
import { ModalDirective } from "ngx-bootstrap/modal";
import { CommitteePositionsListComponent } from "../../../inventory/committee-positions/committee-position.list";
import { NotificationService } from "../../../../services/notification.service";
import { AdministrationCommitteesListComponent } from "./administration-committtee.list";
import { Param } from '../../../../model/common/param';

@Component({
    selector: 'administration-committee-add-edit-dialog',
    templateUrl: 'administration-committee.add-edit.dialog.html',
    styleUrls: [ 'administration-committee.add-edit.dialog.scss' ]
})
export class AdministrationCommitteeAddEditDialog {

public form!: FormGroup;
public item!: InvCommitteMember | null;
public administration!: Administration | null;
public employee!: Employee | null;
private costCenterId: number | null = null;
private administrationId: number | null = null;
private committeePositionId: number | null = null;

@ViewChild('committeePositionListModal') committeePositionListModal: ModalDirective;
@ViewChild('committeePositionList') committeePositionList: CommitteePositionsListComponent;
@ViewChild('itemList') public itemList: AdministrationCommitteesListComponent;

public filter: string = '';

public _committeePosition: InvCommittePostion = null;
public get committeePosition(): InvCommittePostion { return this._committeePosition; }
public set committeePosition(value: InvCommittePostion) {
  this._committeePosition = value;

  this.committeePosition = value;
}



constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: CommitteeMemberHttpService,
    public notificationSvc: NotificationService,
    public dialogRef: MatDialogRef<AdministrationCommitteeAddEditDialog>,
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
    this.employee = item.employee!;
    //this.administration = item.administration!;
        this.form.patchValue(item);
  }

  private createForm() {
    this.form = this.fb.group({
        administration: [null],
        employee: [null],
        committeePosition: [null]
    });
  }

  protected updateItem() {
    const formModel = this.form.value;

    //this.item!.administration = this.administration;
    this.item!.employee = this.employee;
    //this.item!.administrationId = this.administration.id;
    this.item!.employeeId = this.employee.id;
    this.item!.invCommitteePositionId = null;
    //if ((formModel.committeePosition !== null)) this.item!.committeePositionId = formModel.committeePosition?.id as number;
  }

  public save() {
    this.updateItem();
    if (this.item!.id! > 0) {
      this.dataSource.update(this.item!).subscribe(() => {
        this.dialogRef.close();
        this.notificationSvc.showSuccess('Inregistrarea a fost actualizata cu succes!', 'Membri comisie', 3000, false, 0);
      });
    } else {
      this.dataSource.create(this.item!).subscribe((item: InvCommitteMember | null) => {
        this.item = item;
        this.dialogRef.close();
        this.notificationSvc.showSuccess('Inregistrarea a fost adaugata cu succes!', 'Membri comisie', 3000, false, 0);
      });
    }
  }

  selectEmployee() {
    const dialogRef = this.dialog.open(EmployeesSelectionDialog, { panelClass: 'centered-middle-modal', width: '100%', maxWidth: '90%', maxHeight: '92%', height: '100%' });
    dialogRef.afterClosed().subscribe((employees) => {
      if (employees !== null && employees !== undefined && employees.length > 0) {
        this.employee = employees[0];
      }
    });
  }
}