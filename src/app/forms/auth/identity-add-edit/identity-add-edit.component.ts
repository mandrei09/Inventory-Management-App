import {AfterViewInit, Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {IdentityService} from '../../../services/http/identity/identity.service';
import {User} from '../../../model/api/identity/user';
import {EqualPasswordsValidator} from '../../../common/equalPasswords.validator';

@Component({
  selector: 'app-identity-add-edit',
  templateUrl: './identity-add-edit.component.html',
  styleUrls: ['./identity-add-edit.component.scss']
})
export class IdentityAddEditComponent implements AfterViewInit {

  public form!: FormGroup;
  public item!: User | null;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: IdentityService,
    public dialogRef: MatDialogRef<IdentityAddEditComponent>,
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
  }

  public editItem(item: any) {
    this.item = new User();
    this.form.patchValue(item);
  }

  private createForm() {
    this.form = this.fb.group({
      givenName: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      familyName: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      email: [''],
      passwords: this.fb.group({
        password: ['', Validators.compose([Validators.minLength(4)])],
        repeatPassword: ['', Validators.compose([Validators.minLength(4)])]
      }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
    });
  }

  protected updateItem() {
    const formModel = this.form.value;

    this.item!.givenName = formModel.givenName as string;
    this.item!.familyName = formModel.familyName as string;
    this.item!.email = formModel.email as string;
    this.item!.password = formModel.password as string;
  }

  public save() {
    this.updateItem();
    if (this.item!.id) {
      // this.dataSource.update(this.item!).subscribe(() => {
      //   this.dialogRef.close();
      //   this.notificationSvc.success('Produsul a fost modificat cu succes.');
      // })
    } else {
      this.dataSource.create(this.item!).subscribe(
        // @ts-ignore
        (data: User) => {
          this.item = data;
          // this.notificationSvc.success('User-ul a fost creat cu success.');
          this.dialogRef.close();
        },
        (error: any) => {
          // this.notificationSvc.error('Server error')
        }
      );
    }
  }
}
