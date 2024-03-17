import {AfterViewInit, Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DeviceHttpService} from '../../../../services/http/common/device.http.service';
import {Pocket} from '../../../../model/api/common/device';
import {CodeNameEntity} from '../../../../model/api/common/code-name-entity';

@Component({
  selector: 'app-device-add-edit',
  templateUrl: './device-add-edit.component.html',
  styleUrls: ['./device-add-edit.component.scss']
})
export class DeviceAddEditComponent implements AfterViewInit {

  public form!: FormGroup;
  public item!: Pocket | null;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: DeviceHttpService,
    public dialogRef: MatDialogRef<DeviceAddEditComponent>,
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
    this.item = new Pocket();
    this.item.id = 0;
    this.form.patchValue(this.item);
  }

  public editItem(item: Pocket) {
    this.form.patchValue(item);
  }

  private createForm() {
    this.form = this.fb.group({
      code: [null, Validators.compose([Validators.required])],
      name: [null, Validators.compose([Validators.required])],
      model: [null, Validators.compose([Validators.required])],
      producer: [null, Validators.compose([Validators.required])],
      platform: [null, Validators.compose([Validators.required])],
      version: [null, Validators.compose([Validators.required])],
      uui: [null, Validators.compose([Validators.required])],
      serial: [null, Validators.compose([Validators.required])],
      deviceType: [null, Validators.compose([Validators.required])],
    });
  }

  protected updateItem() {
    const formModel = this.form.value;

    this.item!.code = formModel.code as string;
    this.item!.name = formModel.name as string;
    this.item!.model = formModel.model as string;
    this.item!.producer = formModel.producer as string;
    this.item!.platform = formModel.platform as string;
    this.item!.version = formModel.version as string;
    this.item!.uui = formModel.uui as string;
    this.item!.serial = formModel.serial as string;

    this.item!.deviceType = null;
    if ((formModel.deviceType !== null)) this.item!.deviceType = formModel.deviceType as CodeNameEntity;

  }

  public save() {
    this.updateItem();
    if (this.item!.id! > 0) {
      this.dataSource.update(this.item!).subscribe(() => {
        this.dialogRef.close();
        // this.notificationSvc.success('Asset group a fost modificat cu succes.');
      });
    } else {
      this.dataSource.create(this.item!).subscribe((item: Pocket | null) => {
        this.item = item;
        this.dialogRef.close();
        // this.notificationSvc.success('Asset group a fost creata cu succes.');
      });
    }
  }
}
