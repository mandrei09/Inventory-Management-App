import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogRef} from '@angular/cdk/dialog';
import { ReasonDialogData } from '../../model/common/reason-dialog-data';

@Component({
  selector: 'app-reason-dialog',
  templateUrl: './reason-dialog.component.html',
  styleUrls: ['./reason-dialog.component.scss']
})
export class ReasonDialogComponent implements OnInit {

  reasonAccept = '';
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: ReasonDialogData,
    private dialogRef: DialogRef<ReasonDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  save() {
    // @ts-ignore
    this.dialogRef.close(this.reasonAccept);
  }
}
