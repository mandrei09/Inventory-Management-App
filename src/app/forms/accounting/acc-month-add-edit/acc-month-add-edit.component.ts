import {AfterViewInit, Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AccMonth} from '../../../model/api/accounting/acc-month';
import {AccMonthHttpService} from '../../../services/http/accounting/acc-month.http.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-acc-month-add-edit',
  templateUrl: './acc-month-add-edit.component.html',
  styleUrls: ['./acc-month-add-edit.component.scss']
})
export class AccMonthAddEditComponent implements AfterViewInit {

  public form!: FormGroup;
  public item!: AccMonth | null;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: AccMonthHttpService,
    protected notificationServ: NotificationService,
    public dialogRef: MatDialogRef<AccMonthAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm();
    this.item = data.item;
    if (this.item !== null) this.form.patchValue(this.item);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.item !== null) {
        this.editItem(this.item);
      } else { this.addItem(); }
    }, 0);
  }

  public addItem() {
    // @ts-ignore
    this.item = new AccMonth();
    this.item.id = 0;
    this.form.patchValue(this.item);
  }

  public editItem(item: AccMonth) {
    this.form.patchValue(item);
  }

  private createForm() {
    this.form = this.fb.group({
      month: [null, Validators.compose([Validators.required])],
      year: [null, Validators.compose([Validators.required])],
      isActive: [null, Validators.compose([Validators.required])],
    });
  }

  protected updateItem() {
    const formModel = this.form.value;

    this.item!.month = formModel.month as number;
    this.item!.year = formModel.year as number;
    this.item!.isActive = formModel.isActive as boolean;
  }

  public save() {
    this.updateItem();
    if (this.item!.id! > 0) {
      this.dataSource.update(this.item!).subscribe(() => {
        this.notificationServ.showSuccess('Luna contabila a fost modificata cu success!', 'Luna contabila', 3000, false, 3000);
        this.dialogRef.close();
      });
    }
    else {
      this.dataSource.create(this.item!).subscribe((item: AccMonth | null) => {
        this.item = item;
        this.notificationServ.showSuccess('Luna contabila a fost creata cu success!', 'Luna contabila', 3000, false, 3000);
        this.dialogRef.close();
      });
    }
  }

}
