import { AfterViewInit, Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatrixHttpService } from "../../../../services/http/administration/matrix.http.service";
import { Matrix } from "../../../../model/api/administration/matrix";
import { CodeNameEntity } from "../../../../model/api/common/code-name-entity";
import { EmployeeResource } from "../../../../model/api/administration/employee-resource";
import { NotificationService } from "../../../../services/notification.service";

@Component({
  selector: "app-matrix-add-edit",
  templateUrl: "./matrix-add-edit.component.html",
  styleUrls: ["./matrix-add-edit.component.scss"],
})
export class MatrixAddEditComponent implements AfterViewInit {
  public form!: FormGroup;
  public item!: Matrix | null;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: MatrixHttpService,
    public dialogRef: MatDialogRef<MatrixAddEditComponent>,
    public notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm();
    this.item = data.item;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.item !== null) {
        this.editItem(this.item);
      } else {
        this.addItem();
      }
    }, 0);
  }

  public addItem() {
    // @ts-ignore
    this.item = new Matrix();
    this.item.id = 0;
    this.form.patchValue(this.item);
  }

  public editItem(item: Matrix) {
    this.form.patchValue(item);
  }

  private createForm() {
    this.form = this.fb.group({
      company: [null, Validators.compose([Validators.required])],
      division: [null, Validators.compose([Validators.required])],
      employeeB1: [null, Validators.compose([Validators.required])],
      employeeL1: [null, Validators.compose([Validators.required])],
      employeeL2: [null, Validators.compose([Validators.required])],
      employeeL3: [null, Validators.compose([Validators.required])],
      employeeL4: [null, Validators.compose([Validators.required])],
      employeeS1: [null, Validators.compose([Validators.required])],
      employeeS2: [null, Validators.compose([Validators.required])],
      employeeS3: [null, Validators.compose([Validators.required])],
      amountL4: [null, Validators.compose([Validators.required])],
      amountL3: [null, Validators.compose([Validators.required])],
      amountL2: [null, Validators.compose([Validators.required])],
      amountL1: [null, Validators.compose([Validators.required])],
      amountS1: [null, Validators.compose([Validators.required])],
      amountS2: [null, Validators.compose([Validators.required])],
      amountS3: [null, Validators.compose([Validators.required])],
    });
  }

  protected updateItem() {
    const formModel = this.form.value;

    this.item!.company = null;
    if (formModel.company !== null) {
      this.item!.company = formModel.company as CodeNameEntity;
    }

    this.item!.division = null;
    if (formModel.division !== null) {
      this.item!.division = formModel.division as CodeNameEntity;
    }

    this.item!.employeeB1 = null;
    if (formModel.employeeB1 !== null) {
      this.item!.employeeB1 = formModel.employeeB1 as EmployeeResource;
    }

    this.item!.employeeL1 = null;
    if (formModel.employeeL1 !== null) {
      this.item!.employeeL1 = formModel.employeeL1 as EmployeeResource;
    }

    this.item!.employeeL2 = null;
    if (formModel.employeeL2 !== null) {
      this.item!.employeeL2 = formModel.employeeL2 as EmployeeResource;
    }

    this.item!.employeeL3 = null;
    if (formModel.employeeL3 !== null) {
      this.item!.employeeL3 = formModel.employeeL3 as EmployeeResource;
    }

    this.item!.employeeL4 = null;
    if (formModel.employeeL4 !== null) {
      this.item!.employeeL4 = formModel.employeeL4 as EmployeeResource;
    }

    this.item!.employeeS1 = null;
    if (formModel.employeeS1 !== null) {
      this.item!.employeeS1 = formModel.employeeS1 as EmployeeResource;
    }

    this.item!.employeeS2 = null;
    if (formModel.employeeS2 !== null) {
      this.item!.employeeS2 = formModel.employeeS2 as EmployeeResource;
    }

    this.item!.employeeS3 = null;
    if (formModel.employeeS3 !== null) {
      this.item!.employeeS3 = formModel.employeeS3 as EmployeeResource;
    }

    this.item!.amountL4 = formModel.amountL4 as number;
    this.item!.amountL3 = formModel.amountL3 as number;
    this.item!.amountL2 = formModel.amountL2 as number;
    this.item!.amountL1 = formModel.amountL1 as number;
    this.item!.amountS1 = formModel.amountS1 as number;
    this.item!.amountS2 = formModel.amountS2 as number;
    this.item!.amountS3 = formModel.amountS3 as number;
  }

  public save() {
    this.updateItem();
    if (this.item!.id! > 0) {
      this.dataSource.update(this.item!).subscribe(() => {
        this.dialogRef.close();
      });
    } else {
      this.dataSource.create(this.item!).subscribe((item: Matrix | null) => {
        this.item = item;
        this.dialogRef.close();
      });
    }
    this.notificationService.showSuccess("OK", "Succes", 2000, false, 0);
  }
}
