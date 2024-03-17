import {AfterViewInit, Component, Inject, Input, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CostCenter} from '../../../../model/api/administration/cost-center';
import {CostCenterHttpService} from '../../../../services/http/administration/cost-center.http.service';
import {CodeNameEntity} from '../../../../model/api/common/code-name-entity';
import { CostCenterCommitteesListComponent } from './cost-center-committee.list';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CommitteeMemberHttpService } from '../../../../services/http/inventory/committee-member-detail.http.service';
import { InvCommitteeMemberAddEditDialog } from '../../../inventory/inventory-plans/inv-committee-member/inv-committee-member-add-edit.dialog';
import { Employee } from '../../../../model/api/administration/employee';
import { InvCommitteMember } from '../../../../model/api/inventory/committee-member';
import { Param } from '../../../../model/common/param';

@Component({
    selector: 'cost-centers-add-edit-dialog',
    templateUrl: 'cost-centers.add-edit.dialog.html',
    styleUrls: [ 'cost-centers.add-edit.dialog.scss' ]
})
export class CostCentersAddEditDialog implements AfterViewInit {

  public form!: FormGroup;
  public item!: CostCenter | null;
  @ViewChild('itemList') public itemList: CostCenterCommitteesListComponent;
  @ViewChild('itemModalList') itemModalList: ModalDirective;
  public filter: string = '';

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: CostCenterHttpService,
    private committeeMemberHttpService: CommitteeMemberHttpService,
    public dialogRef: MatDialogRef<CostCentersAddEditDialog>,
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

  public getFilters(): Array<Param> {
    const params: Array<Param> = new Array<Param>();
    params.push(new Param('filter', this.filter));
    params.push(new Param('costCenterId', this.item.id.toString()));
  
    return params;
}

  public addItem() {
    // @ts-ignore
    this.item = new CostCenter();
    this.item.id = 0;
    this.form.patchValue(this.item);
  }

  public editItem(item: CostCenter) {
    this.form.patchValue(item);

    let params: Array<Param> = null;
    params = this.getFilters();
    this.itemList.refresh(params);
  }

  private createForm() {
    this.form = this.fb.group({
      code: [null, Validators.compose([Validators.required])],
      name: [null, Validators.compose([Validators.required])],
      admCenter: [null],
      division: [null],
      region: [null],
      administration: [null],
      room: [null],
      storage: [null],
    });
  }

  protected updateItem() {
    const formModel = this.form.value;

    this.item!.code = formModel.code as string;
    this.item!.name = formModel.name as string;

    this.item!.admCenter = null;
    if ((formModel.admCenter !== null)) this.item!.admCenter = formModel.admCenter as CodeNameEntity;

    this.item!.division = null;
    if ((formModel.division !== null)) this.item!.division = formModel.division as CodeNameEntity;

    this.item!.region = null;
    if ((formModel.region !== null)) this.item!.region = formModel.region as CodeNameEntity;

    this.item!.administration = null;
    if ((formModel.administration !== null)) this.item!.administration = formModel.administration as CodeNameEntity;

    this.item!.room = null;
    this.item.roomId = null;
    if ((formModel.room !== null)) this.item!.room = formModel.room as CodeNameEntity;
    this.item.roomId = this.item != null ? this.item.roomId : null;

    this.item!.storage = null;
    if ((formModel.storage !== null)) this.item!.storage = formModel.storage as CodeNameEntity;
  }

  public save() {
    this.updateItem();
    if (this.item!.id! > 0) {
      this.dataSource.update(this.item!).subscribe(() => {
        this.dialogRef.close();
        // this.notificationSvc.success('Centrul de cost a fost modificat cu succes.');
      });
    } else {
      this.dataSource.create(this.item!).subscribe((item: CostCenter | null) => {
        this.item = item;
        this.dialogRef.close();
        // this.notificationSvc.success('Centrul de cost a fost creat cu succes.');
      });
    }
  }

  public onCommitteeEmployeeAdd(item: Employee | null = null) {
    const dialogRef = this.dialog.open(InvCommitteeMemberAddEditDialog, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { costCenter: this.item , employee: item}
    });

    dialogRef.afterClosed().subscribe((item: InvCommitteMember) => {
      if (item !== null) this.itemList.refreshItems();
    });
  }
  
  onEmployeeItemEdit(item: InvCommitteMember) {
    let dialogRef = this.dialog.open(InvCommitteeMemberAddEditDialog, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { item: this.item, employee: item }
    });
    dialogRef.afterClosed().subscribe((item: InvCommitteMember) => {
      if (item !== null) this.itemList.refreshItems();
    });
  }
}
