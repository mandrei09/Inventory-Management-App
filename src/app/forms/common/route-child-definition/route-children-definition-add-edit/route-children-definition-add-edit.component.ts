import {AfterViewInit, Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {RouteHttpService} from '../../../../services/http/common/route.http.service';
import {Route} from '../../../../model/api/common/route';
import {Badge} from '../../../../model/api/common/badge';
import {RouteChild} from '../../../../model/api/common/route-child';
import {RouteChildHttpService} from '../../../../services/http/common/route-child.http.service';

@Component({
  selector: 'app-route-children-definition-add-edit',
  templateUrl: './route-children-definition-add-edit.component.html',
  styleUrls: ['./route-children-definition-add-edit.component.scss']
})
export class RouteChildrenDefinitionAddEditComponent implements AfterViewInit {

  public form!: FormGroup;
  public item!: RouteChild | null;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: RouteChildHttpService,
    public dialogRef: MatDialogRef<RouteChildrenDefinitionAddEditComponent>,
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
    this.item = new RouteChild();
    this.form.patchValue(this.item);
  }

  public editItem(item: RouteChild) {
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
      route: [null],
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
    this.item!.position = formModel.position as number;
    this.item!.badge = formModel.badge as Badge;
    this.item!.active = formModel.active as boolean;

    this.item!.routeId = null;
    if ((formModel.route !== null)) this.item!.routeId = formModel.route?.id as number;

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
      this.dataSource.create(this.item!).subscribe((item: RouteChild | null) => {
        this.item = item;
        this.dialogRef.close();
        // this.notificationSvc.success('Proprietatea a fost creata cu succes.');
      });
    }
  }
}
