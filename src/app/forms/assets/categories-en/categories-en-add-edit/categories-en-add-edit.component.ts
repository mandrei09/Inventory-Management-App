import {AfterViewInit, Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CodeNameEntity} from '../../../../model/api/common/code-name-entity';
import {Category} from '../../../../model/api/assets/category';
import {CategoryHttpService} from '../../../../services/http/assets/category.http.service';
import {CategoryEN} from '../../../../model/api/assets/category-en';
import {CategoryENHttpService} from '../../../../services/http/assets/category-en.http.service';

@Component({
  selector: 'app-categories-add-edit',
  templateUrl: './categories-en-add-edit.component.html',
  styleUrls: ['./categories-en-add-edit.component.scss']
})
export class CategoriesEnAddEditComponent implements AfterViewInit {

  public form!: FormGroup;
  public item!: CategoryEN | null;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: CategoryENHttpService,
    public dialogRef: MatDialogRef<CategoriesEnAddEditComponent>,
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
    this.item = new CategoryEN();
    this.item.id = 0;
    this.form.patchValue(this.item);
  }

  public editItem(item: CategoryEN) {
    this.form.patchValue(item);
  }

  private createForm() {
    this.form = this.fb.group({
      code: [null, Validators.compose([Validators.required])],
      name: [null, Validators.compose([Validators.required])],
      interCompany: [null],
      categoryEN: [null],
    });
  }

  protected updateItem() {
    const formModel = this.form.value;

    this.item!.code = formModel.code as string;
    this.item!.name = formModel.name as string;

    this.item!.interCompanyEN = null;
    if ((formModel.interCompanyEN !== null)) this.item!.interCompanyEN = formModel.interCompanyEN as CodeNameEntity;
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
      this.dataSource.create(this.item!).subscribe((item: CategoryEN | null) => {
        this.item = item;
        this.dialogRef.close();
        // this.notificationSvc.success('Categoria a fost creata cu succes.');
      });
    }
  }
}
