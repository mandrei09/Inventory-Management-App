import {AfterViewInit, Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {SubCategory} from '../../../../model/api/assets/sub-category';
import {SubCategoryHttpService} from '../../../../services/http/assets/sub-category.http.service';
import {CodeNameEntity} from '../../../../model/api/common/code-name-entity';

@Component({
  selector: 'app-sub-category-add-edit',
  templateUrl: './sub-category-add-edit.component.html',
  styleUrls: ['./sub-category-add-edit.component.scss']
})
export class SubCategoryAddEditComponent implements AfterViewInit {

  public form!: FormGroup;
  public item!: SubCategory | null;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: SubCategoryHttpService,
    public dialogRef: MatDialogRef<SubCategoryAddEditComponent>,
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
    this.item = new SubCategory();
    this.item.id = 0;
    this.form.patchValue(this.item);
  }

  public editItem(item: SubCategory) {
    this.form.patchValue(item);
  }

  private createForm() {
    this.form = this.fb.group({
      code: [null, Validators.compose([Validators.required])],
      name: [null, Validators.compose([Validators.required])],
      category: [null],
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
      this.dataSource.create(this.item!).subscribe((item: SubCategory | null) => {
        this.item = item;
        this.dialogRef.close();
        // this.notificationSvc.success('Categoria a fost creata cu succes.');
      });
    }
  }
}
