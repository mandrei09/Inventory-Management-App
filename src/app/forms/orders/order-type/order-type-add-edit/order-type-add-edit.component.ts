import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OrderType} from '../../../../model/api/order/order-type';
import {OrderTypeHttpService} from '../../../../services/http/orders/order-type.http.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Param} from '../../../../model/common/param';

@Component({
  selector: 'app-county-add-edit',
  templateUrl: './order-type-add-edit.component.html',
  styleUrls: ['./order-type-add-edit.component.scss']
})
export class OrderTypeAddEditComponent {

  public form!: FormGroup;
  public item!: OrderType | null;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: OrderTypeHttpService,
    public dialogRef: MatDialogRef<OrderTypeAddEditComponent>,
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
    this.item = new OrderType();
    this.item.id = 0;
    this.form.patchValue(this.item);
  }

  public editItem(item: OrderType) {
    this.form.patchValue(item);
  }

  private createForm() {
    this.form = this.fb.group({
      code: [null, Validators.compose([Validators.required])],
      name: [null, Validators.compose([Validators.required])]
    });
  }

  protected updateItem() {
    const formModel = this.form.value;

    this.item!.code! = formModel.code as string;
    this.item!.name! = formModel.name as string;
  }

  public save() {
    this.updateItem();
    // @ts-ignore
    if (this.item!.id > 0) {
      this.dataSource.update(this.item!).subscribe(() => {
        this.dialogRef.close();
        // this.notificationSvc.success('Judetul a fost modificat cu succes.');
      });
    } else {
      this.dataSource.create(this.item!).subscribe((item: OrderType | null) => {
        this.item = item;
        this.dialogRef.close();
        // this.notificationSvc.success('Judetul a fost creat cu succes.');
      });
    }
  }

}
