import {AfterViewInit, Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {SubCategory} from '../../../../model/api/assets/sub-category';
import {CodeNameEntity} from '../../../../model/api/common/code-name-entity';
import {SubCategoryEN} from '../../../../model/api/assets/sub-category-en';
import {SubCategoryENHttpService} from '../../../../services/http/assets/sub-category-en.http.service';

@Component({
  selector: 'app-sub-category-add-edit',
  templateUrl: './sub-category-en-add-edit.component.html',
  styleUrls: ['./sub-category-en-add-edit.component.scss']
})
export class SubCategoryEnAddEditComponent implements AfterViewInit {

  public form!: FormGroup;
  public item!: SubCategoryEN | null;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: SubCategoryENHttpService,
    public dialogRef: MatDialogRef<SubCategoryEnAddEditComponent>,
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
    this.item = new SubCategoryEN();
    this.item.id = 0;
    this.form.patchValue(this.item);
  }

  public editItem(item: SubCategoryEN) {
    this.form.patchValue(item);
  }

  private createForm() {
    this.form = this.fb.group({
      code: [null, Validators.compose([Validators.required])],
      name: [null, Validators.compose([Validators.required])],
      categoryEN: [null],
    });
  }

  protected updateItem() {
    const formModel = this.form.value;

    this.item!.code = formModel.code as string;
    this.item!.name = formModel.name as string;

    // @ts-ignore
    this.item!.categoryEN = null;
    if ((formModel.categoryEN !== null)) this.item!.categoryEN = formModel.categoryEN as CodeNameEntity;
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
      this.dataSource.create(this.item!).subscribe((item: SubCategoryEN | null) => {
        this.item = item;
        this.dialogRef.close();
        // this.notificationSvc.success('Categoria a fost creata cu succes.');
      });
    }
  }
}
