import {AfterViewInit, Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ModelHttpService} from '../../../../services/http/assets/model.http.service';
import {Model} from '../../../../model/api/assets/model';
import {Brand} from '../../../../model/api/assets/brand';

@Component({
  selector: 'app-model-add-edit',
  templateUrl: './model-add-edit.component.html',
  styleUrls: ['./model-add-edit.component.scss']
})
export class ModelAddEditComponent implements AfterViewInit {

  public form!: FormGroup;
  public item!: Model | null;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: ModelHttpService,
    // protected notificationSvc: NotificationService,
    public dialogRef: MatDialogRef<ModelAddEditComponent>,
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

  public addItem() {
    // @ts-ignore
    this.item = new Model();
    this.item.id = 0;
    this.form.patchValue(this.item);
  }

  public editItem(item: Model) {
    this.form.patchValue(item);
  }

  private createForm() {
    this.form = this.fb.group({
      code: [null, Validators.compose([Validators.required])],
      name: [null, Validators.compose([Validators.required])],
      snLength: [null, Validators.compose([Validators.required])],
      imeiLength: [null, Validators.compose([Validators.required])],
      brand: [null, Validators.compose([Validators.required])],
    });
  }

  protected updateItem() {
    const formModel = this.form.value;

    // tslint:disable-next-line:no-non-null-assertion
    this.item!.code = formModel.code as string;
    // tslint:disable-next-line:no-non-null-assertion
    this.item!.name = formModel.name as string;
    this.item!.snLength = formModel.snLength as number;
    this.item!.imeiLength = formModel.imeiLength as number;

    // tslint:disable-next-line:no-non-null-assertion
    this.item!.brand = null;
    // tslint:disable-next-line:no-non-null-assertion
    if ((formModel.brand !== null)) { this.item!.brand = formModel.brand as Brand; }
  }

  public save() {
    this.updateItem();
    if (this.item!.id! > 0) {
      // @ts-ignore
      // tslint:disable-next-line:no-non-null-assertion
      this.dataSource.update(this.item!).subscribe(() => {
        this.dialogRef.close();
        // this.notificationSvc.success('Dictionary item a fost modificat cu succes.');
      });
    } else {
      // @ts-ignore
      // tslint:disable-next-line:no-non-null-assertion
      this.dataSource.create(this.item!).subscribe(
        (data: any) => {
          this.item = data;
          // this.notificationSvc.success('Dictionary item a fost creat cu success.');
          this.dialogRef.close();
        },
        (error: any) => {
          // this.notificationSvc.error('Server error');
        }
      );
    }
  }
}
