import {AfterViewInit, Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {InvState} from '../../../../model/api/inventory/inv-state';
import {InvStateHttpService} from '../../../../services/http/inventory/inv-state.http.service';

@Component({
  selector: 'app-inv-state-add-edit',
  templateUrl: './inv-state-add-edit.component.html',
  styleUrls: ['./inv-state-add-edit.component.scss']
})
export class InvStateAddEditComponent implements AfterViewInit {

  public form!: FormGroup;
  public item!: InvState | null;

  public badgeColor: string = '';

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: InvStateHttpService,
    public dialogRef: MatDialogRef<InvStateAddEditComponent>,
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
    this.item = new InvState();
    this.item.id = 0;
    this.form.patchValue(this.item);
  }

  public editItem(item: InvState) {
    this.form.patchValue(item);
  }

  private createForm() {
    this.form = this.fb.group({
      code: [null, Validators.compose([Validators.required])],
      name: [null, Validators.compose([Validators.required])],
      badgeColor: [null],
      badgeIcon: [null],
    });
  }

  protected updateItem() {
    const formModel = this.form.value;

    this.item!.code =       formModel.code as string;
    this.item!.name =       formModel.name as string;
    this.item!.badgeColor = this.badgeColor;
    this.item!.badgeIcon =  formModel.badgeIcon as string;
  }

  public save() {
    this.updateItem();
    if (this.item!.id! > 0) {
      this.dataSource.update(this.item!).subscribe(() => {
        this.dialogRef.close();
        // this.notificationSvc.success('Statusul a fost modificat cu succes.');
      });
    }
    else {
      this.dataSource.create(this.item!).subscribe(
        (data: InvState) => {
          this.item = data;
          // this.notificationSvc.success('Statusul a fost creat cu success.');
          this.dialogRef.close();
        },
        (error: any) => {
          // this.notificationSvc.error('Server error')
        }
      );
    }
  }
}
