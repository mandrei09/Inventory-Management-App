import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../common/confirmation-dialog/confirmation-dialog.component';
import {Observable} from 'rxjs';
import {ConfirmationDialogData} from '../model/common/confirmation-dialog-data';
import {ReasonDialogData} from '../model/common/reason-dialog-data';
import {ReasonDialogComponent} from '../common/reason-dialog/reason-dialog.component';
import {ProgressImportDialogData} from '../model/common/progress-import-dialog-data';
import {ProgressImportDialogComponent} from '../common/progress-import-dialog/progress-import-dialog.component';
import {PhoneValidationDialogData} from '../model/common/phone-validation-dialog-data';
import {PhoneValidationDialogComponent} from '../common/phone-validation-dialog/phone-validation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private dialog: MatDialog
  ) { }

  public confirmDialog(data: ConfirmationDialogData): Observable<boolean> {
    return this.dialog
      .open(ConfirmationDialogComponent, {
        data,
        width: '450px',
        height: 'auto',
        disableClose: true,
      })
      .afterClosed();
  }

    public reasonDialog(data: ReasonDialogData): Observable<any> {
      return this.dialog
        .open(ReasonDialogComponent, {
          data,
          width: '550px',
          height: 'auto',
          disableClose: true,
        })
        .afterClosed();
    }

    public progressImportDialog(data: ProgressImportDialogData): Observable<any> {
      return this.dialog
        .open(ProgressImportDialogComponent, {
          data,
          width: '550px',
          height: 'auto',
          disableClose: true,
        })
        .afterClosed();
    }

    public phoneNoValidationDialog(data: PhoneValidationDialogData): Observable<any> {
      return this.dialog
        .open(PhoneValidationDialogComponent, {
          data,
          width: '550px',
          height: 'auto',
          disableClose: true,
        })
        .afterClosed();
    }
}
