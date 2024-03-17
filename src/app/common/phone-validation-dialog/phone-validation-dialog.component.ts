import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogRef} from '@angular/cdk/dialog';
import {MobilePhoneHttpService} from '../../services/http/common/mobile-phone.http.service';
import {PhoneValidationDialogData} from '../../model/common/phone-validation-dialog-data';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-phon-validation-dialog',
  templateUrl: './phone-validation-dialog.component.html',
  styleUrls: ['./phone-validation-dialog.component.scss']
})
export class PhoneValidationDialogComponent implements OnInit {

  phoneNumber = '';
  checkUniquePhoneNumber = false;

  constructor(
    private mobilePhoneHttpService: MobilePhoneHttpService,
    public notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA)
    public data: PhoneValidationDialogData,
    private dialogRef: DialogRef<PhoneValidationDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  save() {
    // @ts-ignore
    this.dialogRef.close(this.phoneNumber);
  }

  public checkUnique(event: any) {
    setTimeout(() => {
      if (this.phoneNumber !== '' && this.phoneNumber != null && this.phoneNumber !== undefined && this.phoneNumber.trim().length === 10) {
        this.checkUniquePhoneNumber = false;
        this.mobilePhoneHttpService.checkUnique(this.phoneNumber)
          .subscribe((result: any) => {
            if (result) {
              this.notificationService.showSuccess('OK', 'Verificare numar telefon', 2000, false, 0);
              this.checkUniquePhoneNumber = true;
            } else if (!result) {
              this.notificationService.showError('Nu a fost gasit in baza de date', 'Verificare numar telefon', 0, false, 0);
              this.checkUniquePhoneNumber = false;
            }
          });
      } else {
        this.checkUniquePhoneNumber = false;
      }
    }, 100);
  }
}
