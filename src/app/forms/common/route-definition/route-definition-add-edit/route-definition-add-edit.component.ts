import {AfterViewInit, Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {RouteHttpService} from '../../../../services/http/common/route.http.service';
import {Route} from '../../../../model/api/common/route';
import {Badge} from '../../../../model/api/common/badge';

@Component({
  selector: 'app-route-definition-add-edit',
  templateUrl: './route-definition-add-edit.component.html',
  styleUrls: ['./route-definition-add-edit.component.scss']
})
export class RouteDefinitionAddEditComponent implements AfterViewInit {

  public form!: FormGroup;
  public item!: Route | null;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: RouteHttpService,
    public dialogRef: MatDialogRef<RouteDefinitionAddEditComponent>,
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
      else { this.addItem(); }
    }, 0);
  }

  public addItem() {
    // @ts-ignore
    this.item = new Route();
    this.item.id = 0;
    this.form.patchValue(this.item);
  }

  public editItem(item: Route) {
    this.form.patchValue(item);
  }

  private createForm() {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      url: [null],
      icon: [null],
      variant: [null],
      class: [null],
      position: [null],
      badge: [null],
      active: [null],
      role: [null],
    });
  }

  protected updateItem() {
    const formModel = this.form.value;

    this.item!.name = formModel.name as string;
    this.item!.url = formModel.url as string;
    this.item!.icon = formModel.icon as string;
    this.item!.variant = formModel.variant as string;
    this.item!.class = formModel.class as string;
    this.item!.badge = formModel.badge as Badge;
    this.item!.active = formModel.active as boolean;

    this.item!.roleId = null;
    if ((formModel.role !== null)){
      this.item!.roleId = formModel.role?.id as string;
      this.item!.role = formModel.role;
    };
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
      this.dataSource.create(this.item!).subscribe((item: Route | null) => {
        this.item = item;
        this.dialogRef.close();
        // this.notificationSvc.success('Proprietatea a fost creata cu succes.');
      });
    }
  }
}
