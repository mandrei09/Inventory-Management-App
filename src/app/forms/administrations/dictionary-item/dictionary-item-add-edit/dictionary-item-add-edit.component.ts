import {AfterViewInit, Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DictionaryItemHttpService} from '../../../../services/http/administration/dictionary-item.http.service';
import {DictionaryItem} from '../../../../model/api/administration/dictionary-item';
import {DictionaryType} from '../../../../model/api/administration/dictionary-type';

@Component({
  selector: 'app-dictionary-item-add-edit',
  templateUrl: './dictionary-item-add-edit.component.html',
  styleUrls: ['./dictionary-item-add-edit.component.scss']
})
export class DictionaryItemAddEditComponent implements AfterViewInit {

  public form!: FormGroup;
  public item!: DictionaryItem | null;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: DictionaryItemHttpService,
    // protected notificationSvc: NotificationService,
    public dialogRef: MatDialogRef<DictionaryItemAddEditComponent>,
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
    this.item = new DictionaryItem();
    this.item.id = 0;
    this.form.patchValue(this.item);
  }

  public editItem(item: DictionaryItem) {
    this.form.patchValue(item);
  }

  private createForm() {
    this.form = this.fb.group({
      code: [null, Validators.compose([Validators.required])],
      name: [null, Validators.compose([Validators.required])],
      dictionaryType: [null, Validators.compose([Validators.required])],
    });
  }

  protected updateItem() {
    const formModel = this.form.value;

    // tslint:disable-next-line:no-non-null-assertion
    this.item!.code = formModel.code as string;
    // tslint:disable-next-line:no-non-null-assertion
    this.item!.name = formModel.name as string;

    // tslint:disable-next-line:no-non-null-assertion
    this.item!.dictionaryType = null;
    // tslint:disable-next-line:no-non-null-assertion
    if ((formModel.dictionaryType !== null)) { this.item!.dictionaryType = formModel.dictionaryType as DictionaryType; }
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
