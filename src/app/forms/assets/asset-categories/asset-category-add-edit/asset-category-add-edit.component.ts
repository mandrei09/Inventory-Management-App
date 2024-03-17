import {AfterViewInit, Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AssetCategory} from '../../../../model/api/assets/asset-category';
import {AssetCategoryHttpService} from '../../../../services/http/assets/asset-category.http.service';

@Component({
  selector: 'app-asset-category-add-edit',
  templateUrl: './asset-category-add-edit.component.html',
  styleUrls: ['./asset-category-add-edit.component.scss']
})
export class AssetCategoryAddEditComponent implements AfterViewInit {

  public form!: FormGroup;
  public item!: AssetCategory | null;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: AssetCategoryHttpService,
    public dialogRef: MatDialogRef<AssetCategoryAddEditComponent>,
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
    this.item = new AssetCategory();
    this.item.id = 0;
    this.form.patchValue(this.item);
  }

  public editItem(item: AssetCategory) {
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
    if (this.item!.id! > 0) {
      this.dataSource.update(this.item!).subscribe(() => {
        this.dialogRef.close();
        // this.notificationSvc.success('Asset group a fost modificat cu succes.');
      });
    } else {
      this.dataSource.create(this.item!).subscribe((item: AssetCategory | null) => {
        this.item = item;
        this.dialogRef.close();
        // this.notificationSvc.success('Asset group a fost creata cu succes.');
      });
    }
  }
}
