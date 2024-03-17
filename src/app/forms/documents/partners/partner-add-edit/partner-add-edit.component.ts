import {AfterViewInit, Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Partner} from '../../../../model/api/documents/partner';
import {PartnerHttpService} from '../../../../services/http/documents/partner.http.service';

@Component({
  selector: 'app-partner-add-edit',
  templateUrl: './partner-add-edit.component.html',
  styleUrls: ['./partner-add-edit.component.scss']
})
export class PartnerAddEditComponent implements AfterViewInit {

  public form!: FormGroup;
  public item!: Partner | null;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: PartnerHttpService,
    public dialogRef: MatDialogRef<PartnerAddEditComponent>,
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
    this.item = new Partner();
    this.item.id = 0;
    this.form.patchValue(this.item);
  }

  public editItem(item: Partner) {
    this.form.patchValue(item);
  }

  private createForm() {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      fiscalCode: [null, Validators.compose([Validators.required])],
      registryNumber: [null, Validators.compose([Validators.required])],
      address: [null],
      contactInfo: [null],
      bank: [null],
      bankAccount: [null],
    });
  }

  protected updateItem() {
    const formModel = this.form.value;

    this.item!.name = formModel.name as string;
    this.item!.fiscalCode = formModel.fiscalCode as string;
    this.item!.registryNumber = formModel.registryNumber as string;
    this.item!.address = formModel.address as string;
    this.item!.contactInfo = formModel.contactInfo as string;
    this.item!.bank = formModel.bank as string;
    this.item!.bankAccount = formModel.bankAccount as string;
  }

  public save() {
    this.updateItem();
    if (this.item!.id! > 0) {
      this.dataSource.update(this.item!).subscribe(() => {
        this.dialogRef.close();
        // this.notificationSvc.success('Asset group a fost modificat cu succes.');
      });
    } else {
      this.dataSource.create(this.item!).subscribe((item: Partner | null) => {
        this.item = item;
        this.dialogRef.close(this.item);
        // this.notificationSvc.success('Asset group a fost creata cu succes.');
      });
    }
  }
}
