import {AfterViewInit, Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ProjectTypeDivision} from '../../../../model/api/administration/project-type-division';
import {Param} from '../../../../model/common/param';
import {ProjectTypeDivisionHttpService} from '../../../../services/http/administration/project-type-division.http.service';
import {CodeNameEntity} from '../../../../model/api/common/code-name-entity';
import {Accountancy} from '../../../../model/api/administration/accountancy';
import {AccountancyHttpService} from '../../../../services/http/administration/accountancy.http.service';

@Component({
  selector: 'app-accountancy-add-edit',
  templateUrl: './accountancy-add-edit.component.html',
  styleUrls: ['./accountancy-add-edit.component.scss']
})
export class AccountancyAddEditComponent implements AfterViewInit {

  public form!: FormGroup;
  public item!: Accountancy | null;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: AccountancyHttpService,
    public dialogRef: MatDialogRef<AccountancyAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm();
    this.item = data.item;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.item !== null) {
        this.editItem(this.item);
      }
      else this.addItem();
    }, 0);
  }

  public addItem() {
    // @ts-ignore
    this.item = new Accountancy();
    this.form.patchValue(this.item);
  }

  public editItem(item: Accountancy) {
    this.form.patchValue(item);
  }

  private createForm() {
    this.form = this.fb.group({
      account: [null, Validators.compose([Validators.required])],
      expAccount: [null, Validators.compose([Validators.required])],
      assetType: [null, Validators.compose([Validators.required])],
      assetCategory: [null, Validators.compose([Validators.required])],
      subCategory: [null, Validators.compose([Validators.required])],
      value: [null, Validators.compose([Validators.required])],
    });
  }

  protected updateItem() {
    const formModel = this.form.value;

    this.item!.account = null;
    if ((formModel.account !== null)) this.item!.account = formModel.account as CodeNameEntity;

    this.item!.expAccount = null;
    if ((formModel.expAccount !== null)) this.item!.expAccount = formModel.expAccount as CodeNameEntity;

    this.item!.assetType = null;
    if ((formModel.assetType !== null)) this.item!.assetType = formModel.assetType as CodeNameEntity;

    this.item!.assetCategory = null;
    if ((formModel.assetCategory !== null)) this.item!.assetCategory = formModel.assetCategory as CodeNameEntity;

    this.item!.subCategory = null;
    if ((formModel.subCategory !== null)) this.item!.subCategory = formModel.subCategory as CodeNameEntity;

    this.item!.value = formModel.value as number;
  }

  public save() {
    this.updateItem();
    // @ts-ignore
    if (this.item!.id > 0) {
      this.dataSource.update(this.item!).subscribe(() => {
        this.dialogRef.close();
        // this.notificationSvc.success('Judetul a fost modificat cu succes.');
      });
    } else {
      this.dataSource.create(this.item!).subscribe((item: Accountancy | null) => {
        this.item = item;
        this.dialogRef.close();
        // this.notificationSvc.success('Judetul a fost creat cu succes.');
      });
    }
  }

}
