import {AfterViewInit, Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DeviceType} from '../../../../model/api/common/device-type';
import {DeviceTypeHttpService} from '../../../../services/http/common/device-type.http.service';

@Component({
  selector: 'app-device-type-add-edit',
  templateUrl: './device-type-add-edit.component.html',
  styleUrls: ['./device-type-add-edit.component.scss']
})
export class DeviceTypeAddEditComponent implements AfterViewInit {

  public form!: FormGroup;
  public item!: DeviceType | null;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: DeviceTypeHttpService,
    public dialogRef: MatDialogRef<DeviceTypeAddEditComponent>,
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
    this.item = new DeviceType();
    this.item.id = 0;
    this.form.patchValue(this.item);
  }

  public editItem(item: DeviceType) {
    this.form.patchValue(item);
  }

  private createForm() {
    this.form = this.fb.group({
      code: [null, Validators.compose([Validators.required])],
      name: [null, Validators.compose([Validators.required])],
    });
  }

  protected updateItem() {
    const formModel = this.form.value;

    this.item!.code = formModel.code as string;
    this.item!.name = formModel.name as string;
  }

  public save() {
    this.updateItem();
    if (this.item!.id! > 0) {
      this.dataSource.update(this.item!).subscribe(() => {
        this.dialogRef.close();
        // this.notificationSvc.success('Asset group a fost modificat cu succes.');
      });
    } else {
      this.dataSource.create(this.item!).subscribe((item: DeviceType | null) => {
        this.item = item;
        this.dialogRef.close();
        // this.notificationSvc.success('Asset group a fost creata cu succes.');
      });
    }
  }
}
