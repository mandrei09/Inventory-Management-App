import {AfterViewInit, Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import { Employee } from '../../../../model/api/administration/employee';
import {EmployeeHttpService} from '../../../../services/http/administration/employee.http.service';
import {CostCenter} from '../../../../model/api/administration/cost-center';
import { TreeBodyModule } from 'angular-tree-grid/lib/modules/tree-body/tree-body.module';

@Component({
    selector: 'employees-add-edit-dialog',
    templateUrl: 'employees.add-edit.dialog.html',
    styleUrls: [ 'employees.add-edit.dialog.scss' ]
})
export class EmployeesAddEditDialog implements AfterViewInit {

  public form!: FormGroup;
  public item!: Employee | null;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: EmployeeHttpService,
    public dialogRef: MatDialogRef<EmployeesAddEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm();
    this.item = data.item;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.item !== null) {
        this.editItem(this.item);
      } else { this.addItem(); }
    }, 0);
  }

  public get companyParams(): Array<Param> {
    const params: Array<Param> = [];
    return params;
  }

  public get departmentParams(): Array<Param> {
    const params: Array<Param> = [];
    return params;
  }

  public get managerParams(): Array<Param> {
    const params: Array<Param> = [];
    return params;
  }

  public get costCenterParams(): Array<Param> {
    const params: Array<Param> = [];
    return params;
  }

  public get lobParams(): Array<Param> {
    const params: Array<Param> = [];
    return params;
  }

  public addItem() {
    // @ts-ignore
    this.item = new Employee();
    this.item.id = 0;
    this.form.patchValue(this.item);
  }

  public editItem(item: Employee) {
    this.form.patchValue(item);
  }

  private createForm() {
    this.form = this.fb.group({
      internalCode: [null, Validators.compose([Validators.required])],
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required])],
      erpCode: [null],
      department: [null],
      costCenter: [null],
      state: [null],
    });
  }

  protected updateItem() {
    const formModel = this.form.value;

    this.item!.internalCode = formModel.internalCode as string;
    this.item!.firstName = formModel.firstName as string;
    this.item!.lastName = formModel.lastName as string;
    this.item!.email = formModel.email as string;
    this.item!.erpCode = formModel.erpCode as string;
    this.item!.state = formModel.state as string;

    this.item!.departmentId = null;
    if ((formModel.department !== null)) { this.item!.departmentId = formModel.department?.id as number; }

    this.item!.costCenter = null;
    if ((formModel.costCenter !== null)) { this.item!.costCenter = formModel.costCenter as CostCenter; }
    
    if (formModel.state === 'ACTIV') this.item!.isConfirmed = true;
    else this.item!.isConfirmed = false;
  }

  public save() {
    this.updateItem();
    // @ts-ignore
    if (this.item!.id > 0) {
      this.dataSource.updateEmployee(this.item!,).subscribe(() => {
        this.dialogRef.close();
      });
    } else {
      this.dataSource.create(this.item!).subscribe(
        (data: Employee) => {
          this.item = data;
          // this.notificationSvc.success('Tichetul a fost acceptat cu success.');
          this.dialogRef.close();
        },
        (error: any) => {
        }
      );
    }
  }

  public logg(){
    console.log(this.item!)
  }
}
