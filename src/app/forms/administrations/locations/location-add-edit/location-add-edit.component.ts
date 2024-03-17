import {AfterViewInit, Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Location} from '../../../../model/api/administration/location';
import {LocationHttpService} from '../../../../services/http/administration/location.http.service';
import {Param} from '../../../../model/common/param';

@Component({
  selector: 'app-city-add-edit',
  templateUrl: './location-add-edit.component.html',
  styleUrls: ['./location-add-edit.component.scss']
})
export class LocationAddEditComponent implements AfterViewInit {

  public form!: FormGroup;
  public item!: Location | null;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: LocationHttpService,
    public dialogRef: MatDialogRef<LocationAddEditComponent>,
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

  public get countyParams(): Array<Param> {
    let params: Array<Param> = [];
    return params;
  }

  public addItem() {
    // @ts-ignore
    this.item = new Location();
    this.form.patchValue(this.item);
  }

  public editItem(item: Location) {
    this.form.patchValue(item);
  }

  private createForm() {
    this.form = this.fb.group({
      code: [null, Validators.compose([Validators.required])],
      name: [null, Validators.compose([Validators.required])],
      city: [null, Validators.compose([Validators.required])],
    });
  }

  protected updateItem() {
    const formModel = this.form.value;

    this.item!.code = formModel.code as string;
    this.item!.name = formModel.name as string;

    this.item!.cityId = null;
    if ((formModel.city !== null)) this.item!.cityId = formModel.city?.id;
  }

  public save() {
    this.updateItem();
    // @ts-ignore
    if (this.item!.id > 0) {
      this.dataSource.update(this.item!).subscribe(() => {
        this.dialogRef.close();
        // this.notificationSvc.success('`Orasul` a fost modificat cu succes.');
      });
    }
    else {
      this.dataSource.create(this.item!).subscribe((item: Location | null) => {
        this.item = item;
        this.dialogRef.close();
        // this.notificationSvc.success('Orasul a fost creat cu succes.');
      });
    }
  }
}
