import {AfterViewInit, Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AppState} from '../../../../model/api/common/app-state';
import {AppStateHttpService} from '../../../../services/http/common/app-state.http.service';

@Component({
  selector: 'app-app-state-add-edit',
  templateUrl: './app-state-add-edit.component.html',
  styleUrls: ['./app-state-add-edit.component.scss']
})
export class AppStateAddEditComponent implements AfterViewInit {

  public form!: FormGroup;
  public item!: AppState | null;
  public badgeColor: string = '';

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: AppStateHttpService,
    public dialogRef: MatDialogRef<AppStateAddEditComponent>,
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
    this.item = new AppState();
    this.item.id = 0;
    this.form.patchValue(this.item);
  }

  public editItem(item: AppState) {
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

    this.item!.code = formModel.code as string;
    this.item!.name = formModel.name as string;
    this.item!.badgeColor = this.badgeColor;
    this.item!.badgeIcon =  formModel.badgeIcon as string;
  }

  public save() {
    this.updateItem();
    if (this.item!.id! > 0) {
      this.dataSource.update(this.item!).subscribe(() => {
        this.dialogRef.close();
        // this.notificationSvc.success('Asset group a fost modificat cu succes.');
      });
    } else {
      this.dataSource.create(this.item!).subscribe((item: AppState | null) => {
        this.item = item;
        this.dialogRef.close();
        // this.notificationSvc.success('Asset group a fost creata cu succes.');
      });
    }
  }
}
