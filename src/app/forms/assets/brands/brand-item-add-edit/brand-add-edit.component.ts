import {AfterViewInit, Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Brand} from '../../../../model/api/assets/brand';
import {BrandHttpService} from '../../../../services/http/assets/brand.http.service';
import {DictionaryItem} from '../../../../model/api/administration/dictionary-item';

@Component({
  selector: 'app-brand-add-edit',
  templateUrl: './brand-add-edit.component.html',
  styleUrls: ['./brand-add-edit.component.scss']
})
export class BrandAddEditComponent implements AfterViewInit {

  public form!: FormGroup;
  public item!: Brand | null;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: BrandHttpService,
    // protected notificationSvc: NotificationService,
    public dialogRef: MatDialogRef<BrandAddEditComponent>,
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
    this.item = new Brand();
    this.item.id = 0;
    this.form.patchValue(this.item);
  }

  public editItem(item: Brand) {
    this.form.patchValue(item);
  }

  private createForm() {
    this.form = this.fb.group({
      code: [null, Validators.compose([Validators.required])],
      name: [null, Validators.compose([Validators.required])],
      tag1: [null],
      tag2: [null],
      tag3: [null],
      tag4: [null],
      tag5: [null],
      imei1: [null],
      imei2: [null],
      imei3: [null],
      imei4: [null],
      imei5: [null],
      serie1: [null],
      serie2: [null],
      serie3: [null],
      serie4: [null],
      serie5: [null],
      phone1: [null],
      phone2: [null],
      phone3: [null],
      phone4: [null],
      phone5: [null],
      dictionaryItem: [null, Validators.compose([Validators.required])],
    });
  }

  protected updateItem() {
    const formModel = this.form.value;

    // tslint:disable-next-line:no-non-null-assertion
    this.item!.code = formModel.code as string;
    // tslint:disable-next-line:no-non-null-assertion
    this.item!.name = formModel.name as string;

    this.item!.tag1Pattern = formModel.tag1 as string;
    this.item!.tag2Pattern = formModel.tag2 as string;
    this.item!.tag3Pattern = formModel.tag3 as string;
    this.item!.tag4Pattern = formModel.tag4 as string;
    this.item!.tag5Pattern = formModel.tag5 as string;

    this.item!.imei1Pattern = formModel.imei1 as string;
    this.item!.imei2Pattern = formModel.imei2 as string;
    this.item!.imei3Pattern = formModel.imei3 as string;
    this.item!.imei4Pattern = formModel.imei4 as string;
    this.item!.imei5Pattern = formModel.imei5 as string;

    this.item!.serial1Pattern = formModel.serie1 as string;
    this.item!.serial2Pattern = formModel.serie2 as string;
    this.item!.serial3Pattern = formModel.serie3 as string;
    this.item!.serial4Pattern = formModel.serie4 as string;
    this.item!.serial5Pattern = formModel.serie5 as string;

    this.item!.phoneNumber1Pattern = formModel.phone1 as string;
    this.item!.phoneNumber2Pattern = formModel.phone2 as string;
    this.item!.phoneNumber3Pattern = formModel.phone3 as string;
    this.item!.phoneNumber4Pattern = formModel.phone4 as string;
    this.item!.phoneNumber5Pattern = formModel.phone5 as string;

    // tslint:disable-next-line:no-non-null-assertion
    this.item!.dictionaryItem = null;
    if ((formModel.dictionaryItem !== null)) { this.item!.dictionaryItem = formModel.dictionaryItem as DictionaryItem; }
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
