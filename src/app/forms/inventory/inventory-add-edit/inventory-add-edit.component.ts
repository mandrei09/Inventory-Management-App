import {AfterViewInit, Component, Inject} from '@angular/core';
import {InventoryHttpService} from '../../../services/http/inventory/inventory.http.service';
import {Inventory} from '../../../model/api/inventory/inventory';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {NotificationService} from '../../../services/notification.service';
import {Param} from '../../../model/common/param';
import {AccMonth} from '../../../model/api/accounting/acc-month';

@Component({
  selector: 'app-inventory-add-edit',
  templateUrl: './inventory-add-edit.component.html',
  styleUrls: ['./inventory-add-edit.component.scss']
})
export class InventoryAddEditComponent implements AfterViewInit {

  public form!: FormGroup;
  public item!: Inventory | null;

  public get monthParams(): Array<Param> {
    const params: Array<Param> = [];
    return params;
  }

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: InventoryHttpService,
    protected notificationSvc: NotificationService,
    public dialogRef: MatDialogRef<InventoryAddEditComponent>,
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

  public addItem() {
    // @ts-ignore
    this.item = new Inventory();
    this.form.patchValue(this.item);
  }

  public editItem(item: Inventory) {
    this.form.patchValue(item);
  }

  private createForm() {
    this.form = this.fb.group({
      description: [null, Validators.compose([Validators.required])],
      start: [null, Validators.compose([Validators.required])],
      end: [null, Validators.compose([Validators.required])],
      active: [null, Validators.compose([Validators.required])],
      accMonth: [null],
      accMonthBudget: [null],
    });
  }

  protected updateItem() {
    const formModel = this.form.value;

    this.item!.description = formModel.description as string;
    this.item!.start = formModel.start as Date;
    this.item!.end = formModel.end as Date;
    this.item!.active = formModel.active as boolean;

    // @ts-ignore
    this.item!.accMonth = null;
    if ((formModel.accMonth !== null)) this.item!.accMonth = formModel.accMonth as AccMonth;

    this.item!.accMonthBudget = null;
    if ((formModel.accMonthBudget !== null)) this.item!.accMonthBudget = formModel.accMonthBudget as AccMonth;
  }

  public save() {
    this.updateItem();
    if (this.item!.id! > 0) {
      this.dataSource.update(this.item!).subscribe(() => {
        this.dialogRef.close();
        // this.notificationSvc.success('Inventory a fost modificat cu succes.');
      });
    } else {
      this.dataSource.create(this.item!).subscribe((item: Inventory | null) => {
        this.item = item;
        this.dialogRef.close();
        // this.notificationSvc.success('Centrul de cost a fost creat cu succes.');
      });
    }
  }

}
