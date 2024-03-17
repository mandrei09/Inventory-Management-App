import {AfterViewInit, Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../../model/api/identity/user';
import {EqualPasswordsValidator} from '../../../common/equalPasswords.validator';
import {IdentityService} from '../../../services/http/identity/identity.service';
import {PasswordReset} from '../../../model/api/identity/password-reset';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss']
})
export class ChangePasswordDialogComponent implements AfterViewInit {

  public form!: FormGroup;
  public user!: User;
  public item!: PasswordReset | null;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: IdentityService,
    public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm();
    this.user = data.item;
    this.item = data.item;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.addItem();
    }, 0);
  }

  public addItem() {
    this.item = new PasswordReset();
    this.item!.id = this.user?.id;
    this.item!.userName = this.user?.userName;
    this.form.patchValue(this.item);
  }

  private createForm() {
    this.form = this.fb.group({
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')});
  }

  protected updateItem() {
    const formModel = this.form.value;

    this.item!.password = formModel.password as string;
  }

  public save() {
    this.updateItem();
      // this.dataSource.resetpassword(this.item!).subscribe(
      //   // @ts-ignore
      //   (data: PasswordReset) => {
      //     this.item = data;
      //     // this.notificationSvc.success('Password succesfully changed.');
      //     this.dialogRef.close();
      //   },
      //   (error: any) => {
      //     // this.notificationSvc.error(error.errors)
      //   }
      // );
  }
}
