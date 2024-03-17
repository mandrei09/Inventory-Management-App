import {AfterViewInit, Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Badge} from '../../../../model/api/common/badge';
import {BadgeHttpService} from '../../../../services/http/common/badge.http.service';

@Component({
  selector: 'app-badge-add-edit',
  templateUrl: './badge-add-edit.component.html',
  styleUrls: ['./badge-add-edit.component.scss']
})
export class BadgeAddEditComponent implements AfterViewInit {

  public form!: FormGroup;
  public item!: Badge | null;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: BadgeHttpService,
    public dialogRef: MatDialogRef<BadgeAddEditComponent>,
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
    // @ts-ignore
    this.item = new Badge();
    this.item.id = 0;
    this.form.patchValue(this.item);
  }

  public editItem(item: Badge) {
    this.form.patchValue(item);
  }

  private createForm() {
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])],
      variant: [null, Validators.compose([Validators.required])],
    });
  }

  protected updateItem() {
    const formModel = this.form.value;

    this.item!.text = formModel.text as string;
    this.item!.variant = formModel.variant as string;
  }

  public save() {
    this.updateItem();
    if (this.item!.id! > 0) {
      this.dataSource.update(this.item!).subscribe(() => {
        this.dialogRef.close();
        // this.notificationSvc.success('Proprietatea a fost modificata cu succes.');
      });
    }
    else {
      this.dataSource.create(this.item!).subscribe((item: Badge | null) => {
        this.item = item;
        this.dialogRef.close();
        // this.notificationSvc.success('Proprietatea a fost creata cu succes.');
      });
    }
  }
}
