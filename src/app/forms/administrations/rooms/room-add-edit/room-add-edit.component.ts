import {AfterViewInit, Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {RoomHttpService} from '../../../../services/http/administration/room.http.service';
import {Room} from '../../../../model/api/administration/room';
import {CodeNameEntity} from '../../../../model/api/common/code-name-entity';

@Component({
  selector: 'app-room-add-edit',
  templateUrl: './room-add-edit.component.html',
  styleUrls: ['./room-add-edit.component.scss']
})
export class RoomAddEditComponent implements AfterViewInit {

  public form!: FormGroup;
  public item!: Room | null;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: RoomHttpService,
    public dialogRef: MatDialogRef<RoomAddEditComponent>,
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
    this.item = new Room();
    this.form.patchValue(this.item);
  }

  public editItem(item: Room) {
    this.form.patchValue(item);
  }

  private createForm() {
    this.form = this.fb.group({
      code: [null, Validators.compose([Validators.required])],
      name: [null, Validators.compose([Validators.required])],
      location: [null, Validators.compose([Validators.required])],
      isFinished: [null, Validators.compose([Validators.required])],
    });
  }

  protected updateItem() {
    const formModel = this.form.value;

    this.item!.code = formModel.code as string;
    this.item!.name = formModel.name as string;
    this.item!.isFinished = formModel.isFinished as boolean;

    this.item!.location = null;
    if ((formModel.location !== null)) this.item!.location = formModel.location as CodeNameEntity;
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
      this.dataSource.create(this.item!).subscribe((item: Room | null) => {
        this.item = item;
        this.dialogRef.close();
        // this.notificationSvc.success('Orasul a fost creat cu succes.');
      });
    }
  }
}
