import {AfterViewInit, Component, Inject, Input, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CostCenter} from '../../../../model/api/administration/cost-center';
import {CostCenterHttpService} from '../../../../services/http/administration/cost-center.http.service';
import {CodeNameEntity} from '../../../../model/api/common/code-name-entity';
import {Division} from "../../../../model/api/administration/division";
import {DivisionHttpService} from "../../../../services/http/administration/division.http.service";

@Component({
    selector: 'division-add-edit-dialog',
    templateUrl: 'division.add-edit.dialog.html',
    styleUrls: [ 'division.add-edit.dialog.scss' ]
})
export class DivisionAddEditDialog implements AfterViewInit {

  public form!: FormGroup;
  public item!: Division | null;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: DivisionHttpService,
    public dialogRef: MatDialogRef<DivisionAddEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm();
    this.item = data.item;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.item !== null) {
        this.editItem(this.item);
      }
      else this.addItem();
    }, 0);
  }

  public addItem() {
    // @ts-ignore
    this.item = new Division();
    this.form.patchValue(this.item);
  }

  public editItem(item: Division) {
    this.form.patchValue(item);
  }

  private createForm() {
    this.form = this.fb.group({
      code: [null, Validators.compose([Validators.required])],
      name: [null, Validators.compose([Validators.required])],
      department: [null],
    });
  }

  protected updateItem() {
    const formModel = this.form.value;

    this.item!.code = formModel.code as string;
    this.item!.name = formModel.name as string;

    this.item!.departmentId = null;
    if ((formModel.department !== null)) this.item!.departmentId = formModel.department?.id as number;
  }

  public save() {
    this.updateItem();
    if (this.item!.id! > 0) {
      this.dataSource.update(this.item!).subscribe(() => {
        this.dialogRef.close();
        // this.notificationSvc.success('Centrul de cost a fost modificat cu succes.');
      });
    } else {
      this.dataSource.create(this.item!).subscribe((item: Division | null) => {
        this.item = item;
        this.dialogRef.close();
        // this.notificationSvc.success('Centrul de cost a fost creat cu succes.');
      });
    }
  }
}
