import {AfterViewInit, Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ColumnDefinition} from '../../../../model/common/column-definition';
import {ColumnDefinitionHttpService} from '../../../../services/http/common/column-definition.http.service';
import {Param} from '../../../../model/common/param';
import {TableDefinition} from '../../../../model/common/table-definition';
import {ColumnFilter} from '../../../../model/common/column-filter';

@Component({
  selector: 'app-table-add-edit',
  templateUrl: './column-definition-add-edit.component.html',
  styleUrls: ['./column-definition-add-edit.component.scss']
})
export class ColumnDefinitionAddEditComponent implements AfterViewInit {

  public form!: FormGroup;
  public item!: ColumnDefinition | null;

  private _tableDefinition: TableDefinition = null;
  public get tableDefinition(): TableDefinition { return this._tableDefinition; }
  public set tableDefinition(value: TableDefinition) {
    this._tableDefinition = value;
  }

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: ColumnDefinitionHttpService,
    public dialogRef: MatDialogRef<ColumnDefinitionAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm();
    this.item = data.item;
  }

  public get tableDefinitionParams(): Array<Param> {
    let params: Array<Param> = [];
    return params;
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
    this.item = new ColumnDefinition();
    this.form.patchValue(this.item);
  }

  public editItem(item: ColumnDefinition) {
    this.form.patchValue(item);
  }

  private createForm() {
    this.form = this.fb.group({
      'headerCode': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      'property': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      'include': [null],
      'sortBy': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      'pipe': [null],
      'position': [null],
      'active': [null],
      'tableDefinition': [null],
      'columnFilter': [null],
      'role': [null],
    });
  }

  protected updateItem() {
    const formModel = this.form.value;

    this.item!.headerCode = formModel.headerCode as string;
    this.item!.property = formModel.property as string;
    this.item!.include = formModel.include as string;
    this.item!.sortBy = formModel.sortBy as string;
    this.item!.pipe = formModel.pipe as string;
    this.item!.position = formModel.position as number;
    this.item!.active = formModel.active as boolean;

    this.item!.tableDefinitionId = null;
    if ((formModel.tableDefinition !== null)) this.item!.tableDefinitionId = formModel.tableDefinition?.id as number;

    this.item!.roleId = null;
    if ((formModel.role !== null)) this.item!.roleId = formModel.role?.id as string;

    this.item!.columnFilter = null;
    if ((formModel.columnFilter !== null)) this.item!.columnFilter = formModel.columnFilter as ColumnFilter;
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
        (data: ColumnDefinition) => {
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
