import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogRef} from '@angular/cdk/dialog';
import {ProgressService} from '../../services/progress.service';
import { ProgressImportDialogData } from '../../model/common/progress-import-dialog-data';
import { DataProgress } from '../../model/api/common/data-progress';

@Component({
  selector: 'app-progress-import-dialog',
  templateUrl: './progress-import-dialog.component.html',
  styleUrls: ['./progress-import-dialog.component.scss']
})
export class ProgressImportDialogComponent implements OnInit {

  reasonAccept = '';
  progress: DataProgress;

  constructor(
    private progressService: ProgressService,
    @Inject(MAT_DIALOG_DATA)
    public data: ProgressImportDialogData,
    private dialogRef: DialogRef<ProgressImportDialogComponent>
  ) {
    // tslint:disable-next-line:no-shadowed-variable

    this.progressService.changeEmitted$.subscribe((data: DataProgress) => {
      // console.log(data);
      this.progress = data;

      if (this.progress.currentIndex === this.progress.noOfItems) this.onClose();
    });
  }

  ngOnInit(): void {
  }

  onClose() {
    this.dialogRef.close();
  }
}
