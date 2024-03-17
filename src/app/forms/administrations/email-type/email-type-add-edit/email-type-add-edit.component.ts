import {AfterViewChecked, AfterViewInit, Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {EmailType} from '../../../../model/api/administration/email-type';
import {EmailTypeHttpService} from '../../../../services/http/administration/email-type.http.service';

@Component({
  selector: 'app-setting-add-edit',
  templateUrl: './email-type-add-edit.component.html',
  styleUrls: ['./email-type-add-edit.component.scss']
})
export class EmailTypeAddEditComponent implements AfterViewInit {

  public form!: FormGroup;
  public item!: EmailType | null;

  private _types: string | undefined;
  public get types(): string | undefined { return this._types; }
  public set types(value: string | undefined) {
    this._types = value;
  }

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: EmailTypeHttpService,
    public dialogRef: MatDialogRef<EmailTypeAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm();
    this.item = data.item;
  }

  public onTypesChange(event: string) {
    this.types = event;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.item !== null) {
        this.editItem(this.item);
      }
      else { this.addItem(); }
    }, 0);
  }

  public addItem() {
    // @ts-ignore
    this.item = new EmailType();
    this.item.id = 0;
    this.form.patchValue(this.item);
  }

  public editItem(item: EmailType) {
    this.form.patchValue(item);
  }

  private createForm() {
    this.form = this.fb.group({
      code: [null, Validators.compose([Validators.required])],
      name: [null, Validators.compose([Validators.required])],
      uploadFolder: [null, Validators.compose([Validators.required])],
      notifyInterval: [null],
      notifyEnabled: [null],
      notifyStart: [null],
      notifyEnd: [null],
      headerMsg: [null],
      footerMsg: [null]
    });
  }

  protected updateItem() {
    const formModel = this.form.value;

    this.item!.code = formModel.code as string;
    this.item!.name = formModel.name as string;
    this.item!.uploadFolder = formModel.uploadFolder as string;
    this.item!.notifyInterval = formModel.notifyInterval as number;
    this.item!.notifyEnabled = formModel.notifyEnabled as boolean;
    this.item!.notifyStart = formModel.notifyStart;
    this.item!.notifyEnd = formModel.notifyEnd;
    this.item!.headerMsg = formModel.headerMsg;
    this.item!.footerMsg = formModel.footerMsg;
  }

  public save() {
    this.updateItem();
    if (this.item!.id! > 0) {
      this.dataSource.update(this.item!).subscribe(() => {
        this.dialogRef.close();
        // this.notificationSvc.success('Setarea a fost modificata cu succes.');
      });
    } else {
      this.dataSource.create(this.item!).subscribe(
        // @ts-ignore
        (data: AssetSave) => {
          this.item = data;
          // this.notificationSvc.success('Setarea a fost creata cu success.');
          this.dialogRef.close();
        },
        (error: any) => {
          // this.notificationSvc.error('Server error')
        }
      );
    }
  }
}
