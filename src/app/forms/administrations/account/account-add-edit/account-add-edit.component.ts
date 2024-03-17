import {AfterViewInit, Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CodeNameEntity} from '../../../../model/api/common/code-name-entity';
import {Account} from "../../../../model/api/administration/account";
import {AccountHttpService} from "../../../../services/http/administration/account.http.service";

@Component({
  selector: 'app-account-add-edit',
  templateUrl: './account-add-edit.component.html',
  styleUrls: ['./account-add-edit.component.scss']
})
export class AccountAddEditComponent implements AfterViewInit {

  public form!: FormGroup;
  public item!: Account | null;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: AccountHttpService,
    public dialogRef: MatDialogRef<AccountAddEditComponent>,
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
    this.item = new Account();
    this.form.patchValue(this.item);
  }

  public editItem(item: Account) {
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
    // @ts-ignore
    if (this.item!.id > 0) {
      this.dataSource.update(this.item!).subscribe(() => {
        this.dialogRef.close();
        // this.notificationSvc.success('`Orasul` a fost modificat cu succes.');
      });
    }
    else {
      this.dataSource.create(this.item!).subscribe((item: Account | null) => {
        this.item = item;
        this.dialogRef.close();
        // this.notificationSvc.success('Orasul a fost creat cu succes.');
      });
    }
  }
}
