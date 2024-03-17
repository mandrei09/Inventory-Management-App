import {AfterViewInit, Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CodeNameEntity} from '../../../../model/api/common/code-name-entity';
import {InterCompany} from '../../../../model/api/assets/inter-company';
import {InterCompanyHttpService} from '../../../../services/http/assets/inter-company.http.service';

@Component({
  selector: 'app-inter-companies-add-edit',
  templateUrl: './inter-companies-add-edit.component.html',
  styleUrls: ['./inter-companies-add-edit.component.scss']
})
export class InterCompaniesAddEditComponent implements AfterViewInit {

  public form!: FormGroup;
  public item!: InterCompany | null;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: InterCompanyHttpService,
    public dialogRef: MatDialogRef<InterCompaniesAddEditComponent>,
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
    this.item = new InterCompany();
    this.item.id = 0;
    this.form.patchValue(this.item);
  }

  public editItem(item: InterCompany) {
    this.form.patchValue(item);
  }

  private createForm() {
    this.form = this.fb.group({
      code: [null, Validators.compose([Validators.required])],
      name: [null, Validators.compose([Validators.required])],
      interCompany: [null],
    });
  }

  protected updateItem() {
    const formModel = this.form.value;

    this.item!.code = formModel.code as string;
    this.item!.name = formModel.name as string;

    this.item!.interCompanyEN = null;
    if ((formModel.interCompany !== null)) this.item!.interCompanyEN = formModel.interCompanyEN as CodeNameEntity;
    //
    // this.item!.categoryEN = null;
    // if ((formModel.categoryEN !== null)) this.item!.categoryEN = formModel.categoryEN as CodeNameEntity;
  }

  public save() {
    this.updateItem();
    if (this.item!.id! > 0) {
      this.dataSource.update(this.item!).subscribe(() => {
        this.dialogRef.close();
        // this.notificationSvc.success('Categoria a fost modificata cu succes.');
      });
    }
    else {
      this.dataSource.create(this.item!).subscribe((item: InterCompany | null) => {
        this.item = item;
        this.dialogRef.close();
        // this.notificationSvc.success('Categoria a fost creata cu succes.');
      });
    }
  }
}
