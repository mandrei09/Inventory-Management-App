import {AfterViewInit, Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Material} from '../../../../model/api/administration/material';
import {MaterialHttpService} from '../../../../services/http/administration/material.http.service';
import { NotificationService } from '../../../../services/notification.service';

@Component({
  selector: 'app-material-add-edit',
  templateUrl: './material-add-edit.component.html',
  styleUrls: ['./material-add-edit.component.scss']
})
export class MaterialAddEditComponent implements AfterViewInit {

  public form!: FormGroup;
  public item!: Material | null;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: MaterialHttpService,
    public dialogRef: MatDialogRef<MaterialAddEditComponent>,
    private notifyService: NotificationService,
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
    this.item = new Material();
    this.item.id = 0;
    this.form.patchValue(this.item);
  }

  public editItem(item: Material) {
    this.form.patchValue(item);
  }

  private createForm() {
    this.form = this.fb.group({
      code: [null],
      name: [null, Validators.compose([Validators.required])],
      ean: [null],
      partNumber: [null],
      price: [null, Validators.compose([Validators.required])],
      subCategory: [null],
    });
  }

  protected updateItem() {
    const formModel = this.form.value;

    this.item!.code = formModel.code as string;
    this.item!.name = formModel.name as string;
    this.item!.ean = formModel.ean as string;
    this.item!.partNumber = formModel.partNumber as string;
    this.item!.price = formModel.price as number;

    this.item!.subCategory = null;
    if ((formModel.subCategory !== null)) this.item!.subCategory = formModel.subCategory;
  }

  public get formDisabled()
  {
    const formModel = this.form.value;
    if(formModel)
      return !formModel.code || !formModel.name ||
        !formModel.ean || !formModel.partNumber || !formModel .price || !formModel.subCategory
    return true
  }

  public save() {
    this.updateItem();
    if (this.item!.id! > 0) {
      this.dataSource.update(this.item!).subscribe(() => {
        this.notifyService.showSuccess('Inregistrarea a fost actualizata cu succes!', '', 3000, false, 3000);
        this.dialogRef.close();
        // this.notificationSvc.success('Asset group a fost modificat cu succes.');
      });
    } else {
      this.dataSource.create(this.item!).subscribe((item: Material | null) => {
        this.item = item;
        this.notifyService.showSuccess('Inregistrarea a fost creata cu succes!', '', 3000, false, 3000);
        this.dialogRef.close(this.item);
      });
    }
  }
}
