import {AfterViewInit, Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CountyHttpService} from '../../../../services/http/administration/county.http.service';
import {Param} from '../../../../model/common/param';
import {County} from '../../../../model/api/administration/county';

@Component({
  selector: 'app-county-add-edit',
  templateUrl: './county-add-edit.component.html',
  styleUrls: ['./county-add-edit.component.scss']
})
export class CountyAddEditComponent implements AfterViewInit {

  public form!: FormGroup;
  public item!: County | null;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: CountyHttpService,
    public dialogRef: MatDialogRef<CountyAddEditComponent>,
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

  public get countryParams(): Array<Param> {
    let params: Array<Param> = [];
    return params;
  }

  public addItem() {
    // @ts-ignore
    this.item = new County();
    this.item.id = 0;
    this.form.patchValue(this.item);
  }

  public editItem(item: County) {
    this.form.patchValue(item);
  }

  private createForm() {
    this.form = this.fb.group({
      code: [null, Validators.compose([Validators.required])],
      name: [null, Validators.compose([Validators.required])],
      country: [null],
    });
  }

  protected updateItem() {
    const formModel = this.form.value;

    this.item!.code = formModel.code as string;
    this.item!.name = formModel.name as string;

    // @ts-ignore
    this.item!.country = null;
    if ((formModel.country !== null)) this.item!.countryId = formModel.country?.id;
  }

  public save() {
    this.updateItem();
    // @ts-ignore
    if (this.item!.id > 0) {
      this.dataSource.update(this.item!).subscribe(() => {
        this.dialogRef.close();
        // this.notificationSvc.success('Judetul a fost modificat cu succes.');
      });
    } else {
      this.dataSource.create(this.item!).subscribe((item: County | null) => {
        this.item = item;
        this.dialogRef.close();
        // this.notificationSvc.success('Judetul a fost creat cu succes.');
      });
    }
  }

}
