import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Administration} from '../../../../model/api/administration/administration';
import {AdministrationHttpService} from '../../../../services/http/administration/administration.http.service';
import { InvCommitteMember } from '../../../../model/api/inventory/committee-member';
import { CommitteeMemberHttpService } from '../../../../services/http/inventory/committee-member-detail.http.service';
import { InvCommitteeMembersListComponent } from '../../../inventory/inventory-plans/inv-committee-member/inv-committee-member.list';
import { Employee } from '../../../../model/api/administration/employee';
import { Param } from '../../../../model/common/param';
import { ModalDirective } from "ngx-bootstrap/modal";
import { AdministrationCommitteesListComponent } from "./administration-committtee.list";
import { AdministrationCommitteeAddEditDialog } from './administration-committee.add-edit.dialog';

@Component({
  selector: 'app-administration-add-edit',
  templateUrl: './administration-add-edit.component.html',
  styleUrls: ['./administration-add-edit.component.scss'],
  providers: [ CommitteeMemberHttpService]
})
export class AdministrationAddEditComponent implements AfterViewInit {

  public form!: FormGroup;
  public item!: Administration | null;
  public employee!: Employee | null;
  @ViewChild('itemList') public itemList: AdministrationCommitteesListComponent;
  @ViewChild('itemModalList') itemModalList: ModalDirective;
  public filter: string = '';
  public selectedAdministration: Administration = null;
  public selectedAdministrations: Array<Administration> = new Array<Administration>();

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: AdministrationHttpService,
    private committeeMemberHttpService: CommitteeMemberHttpService,
    public dialogRef: MatDialogRef<AdministrationAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm();
    this.item = data.item;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.item !== null) {
        this.editItem(this.item);
      } else{
        this.addItem();
      } 
      
    }, 0);
  }

  public addItem() {
    // @ts-ignore
    this.item = new Administration();
    this.item.id = 0;
    this.form.patchValue(this.item);
  }

  public getFilters(): Array<Param> {
    const params: Array<Param> = new Array<Param>();
    params.push(new Param('filter', this.filter));
    params.push(new Param('administrationId', this.item.id.toString()));
  
    return params;
}

  public editItem(item: Administration) {
    this.form.patchValue(item);

    let params: Array<Param> = null;
    params = this.getFilters();
    this.itemList.refresh(params);
  }

  private createForm() {
    this.form = this.fb.group({
      code: [null, Validators.compose([Validators.required])],
      name: [null, Validators.compose([Validators.required])],
    });
  }

  protected updateItem() {
    const formModel = this.form.value;
    this.item!.code = formModel.code as string;
    this.item!.name = formModel.name as string;
  }

  public save() {
    this.updateItem();
    if (this.item!.id! > 0) {
      this.dataSource.update(this.item!).subscribe(() => {
        this.dialogRef.close();
        // this.notificationSvc.success('Asset group a fost modificat cu succes.');
      });
    } else {
      this.dataSource.create(this.item!).subscribe((item: Administration | null) => {
        this.item = item;
        this.dialogRef.close();
        // this.notificationSvc.success('Asset group a fost creata cu succes.');
      });
    }
  }

  public onCommitteeEmployeeAdd(item: Employee | null = null) {
    const dialogRef = this.dialog.open(AdministrationCommitteeAddEditDialog, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { administration: this.item , employee: item}
    });
    
    dialogRef.afterClosed().subscribe((item: InvCommitteMember) => {
      if (item !== null) this.itemList.refreshItems();
    });
  }
  
  onEmployeeItemEdit(item: InvCommitteMember) {
    let dialogRef = this.dialog.open(AdministrationCommitteeAddEditDialog, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { item: this.item, employee: item }
    });
    dialogRef.afterClosed().subscribe((item: InvCommitteMember) => {
      if (item !== null) this.itemList.refreshItems();
    });
  }

}
