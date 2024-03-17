import {AfterViewInit, Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ColumnFilterHttpService} from '../../../../services/http/common/column-filter.http.service';
import {ColumnFilter} from '../../../../model/common/column-filter';

@Component({
  selector: 'app-filter-add-edit',
  templateUrl: './column-filter-add-edit.component.html',
  styleUrls: ['./column-filter-add-edit.component.scss']
})
export class ColumnFilterAddEditComponent implements AfterViewInit {

  public form!: FormGroup;
  public item!: ColumnFilter | null;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: ColumnFilterHttpService,
    public dialogRef: MatDialogRef<ColumnFilterAddEditComponent>,
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
    this.item = new ColumnFilter();
    this.item.id = 0;
    this.form.patchValue(this.item);
  }

  public editItem(item: ColumnFilter) {
    this.form.patchValue(item);
  }

  private createForm() {
    this.form = this.fb.group({
      property: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      type: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      active: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      placeholder: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      model: [null],
    });
  }

  protected updateItem() {
    const formModel = this.form.value;

    this.item!.property = formModel.property as string;
    this.item!.type = formModel.type as string;
    this.item!.active = formModel.active as boolean;
    this.item!.placeholder = formModel.placeholder as string;
    this.item!.model = formModel.model as string;
  }

  public save() {
    this.updateItem();
    if (this.item!.id) {
      this.dataSource.update(this.item!).subscribe(() => {
        this.dialogRef.close();
        // this.notificationSvc.success('Tabela a fost modificata cu succes.');
      });
    }
    else {
      this.dataSource.create(this.item!).subscribe(
        (data: ColumnFilter) => {
          this.item = data;
          // this.notificationSvc.success('Tabela a fost creata cu success.');
          this.dialogRef.close();
        },
        (error: any) => {
          // this.notificationSvc.error('Server error')
        }
      );
    }
  }
}
