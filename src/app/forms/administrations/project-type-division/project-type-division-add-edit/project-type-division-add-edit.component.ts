import {AfterViewInit, Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ProjectTypeDivision} from '../../../../model/api/administration/project-type-division';
import {Param} from '../../../../model/common/param';
import {ProjectTypeDivisionHttpService} from '../../../../services/http/administration/project-type-division.http.service';
import {CodeNameEntity} from '../../../../model/api/common/code-name-entity';

@Component({
  selector: 'app-project-type-division-add-edit',
  templateUrl: './project-type-division-add-edit.component.html',
  styleUrls: ['./project-type-division-add-edit.component.scss']
})
export class ProjectTypeDivisionAddEditComponent implements AfterViewInit {

  public form!: FormGroup;
  public item!: ProjectTypeDivision | null;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: ProjectTypeDivisionHttpService,
    public dialogRef: MatDialogRef<ProjectTypeDivisionAddEditComponent>,
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
    this.item = new ProjectTypeDivision();
    this.item.id = 0;
    this.form.patchValue(this.item);
  }

  public editItem(item: ProjectTypeDivision) {
    this.form.patchValue(item);
  }

  private createForm() {
    this.form = this.fb.group({
      projectType: [null, Validators.compose([Validators.required])],
      division: [null, Validators.compose([Validators.required])],
    });
  }

  protected updateItem() {
    const formModel = this.form.value;

    this.item!.projectType = null;
    if ((formModel.projectType !== null)) this.item!.projectType = formModel.projectType as CodeNameEntity;

    this.item!.division = null;
    if ((formModel.division !== null)) this.item!.division = formModel.division as CodeNameEntity;
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
      this.dataSource.create(this.item!).subscribe((item: ProjectTypeDivision | null) => {
        this.item = item;
        this.dialogRef.close();
        // this.notificationSvc.success('Judetul a fost creat cu succes.');
      });
    }
  }

}
