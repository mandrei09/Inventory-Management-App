import {AfterViewInit, Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ConfigValue} from '../../../model/api/common/config-value';
import {ConfigValuesHttpService} from '../../../services/http/common/config-values.service';
import {Param} from '../../../model/common/param';

@Component({
  selector: 'app-config-values-add-edit',
  templateUrl: './config-values-add-edit.component.html',
  styleUrls: ['./config-values-add-edit.component.scss']
})
export class ConfigValuesAddEditComponent implements AfterViewInit {

  public form!: FormGroup;
  public item!: ConfigValue | null;

  private isNumeric: boolean = false;
  private isDate: boolean = false;
  private isText: boolean = false;
  private isBoolean: boolean = false;

  private configValueType: string = '';

  public _type: string |  undefined;
  public get type(): string | undefined { return this._type; }
  public set type(value: string | undefined) {
    this._type = value;
  }

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: ConfigValuesHttpService,
    public dialogRef: MatDialogRef<ConfigValuesAddEditComponent>,
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
    this.item = new ConfigValue();
    this.form.patchValue(this.item);
  }

  public editItem(item: ConfigValue) {
    this.type = item.valueType;
    this.form.patchValue(item);
  }

  private createForm() {
    this.form = this.fb.group({
      'group': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      'code': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      'description': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      'textValue': [null],
      'numericValue': [null],
      'dataValue': [null],
      'boolValue': [null],
      'role': [null],
    });
  }

  protected updateItem() {
    const formModel = this.form.value;

    this.item!.group = formModel.group as string;
    this.item!.code = formModel.code as string;
    this.item!.description = formModel.description as string;
    this.item!.textValue = formModel.textValue as string;
    this.item!.numericValue = formModel.numericValue as number;
    this.item!.dateValue = formModel.dateValue as Date;
    this.item!.boolValue = formModel.boolValue as boolean;
    this.item!.valueType = this.type;

    // switch(this.type) {
    //   case 'text':
    //     this.item!.valueType = 'T';
    //     break;
    //   case 'numeric':
    //     this.item!.valueType = 'N';
    //     break;
    //   case 'date':
    //     this.item!.valueType = 'D';
    //     break;
    //   case 'boolean':
    //     this.item!.valueType = 'B';
    //     break;
    // }

    this.item!.roleId = null;
    if ((formModel.role !== null)) this.item!.roleId = formModel.role?.id;
  }

  public save() {
    this.updateItem();
    if (this.item!.id) {
      this.dataSource.update(this.item!).subscribe(() => {
        this.dialogRef.close();
        // this.notificationSvc.success('Datele au fost modificate cu succes.');
      });
    } else {
      this.dataSource.create(this.item!).subscribe(
        (data: ConfigValue) => {
          this.item = data;
          // this.notificationSvc.success('Datele au fost create cu success.');
          this.dialogRef.close();
        },
        (error: any) => {
          // this.notificationSvc.error('Server error')
        }
      );
    }
  }
}
