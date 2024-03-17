import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showSuccess(message, title, timeOut, tapToDismiss, extendedTimeOut) {
      this.toastr.success(message, title, {timeOut: timeOut, tapToDismiss: tapToDismiss, extendedTimeOut: extendedTimeOut});
  }

  showError(message, title, timeOut, tapToDismiss, extendedTimeOut) {
      this.toastr.error(message, title, {timeOut: timeOut, tapToDismiss: tapToDismiss, extendedTimeOut: extendedTimeOut});
  }

  showInfo(message, title, timeOut, tapToDismiss, extendedTimeOut) {
      this.toastr.info(message, title, {timeOut: timeOut, tapToDismiss: tapToDismiss, extendedTimeOut: extendedTimeOut});
  }

  showWarning(message, title, timeOut, tapToDismiss, extendedTimeOut) {
      this.toastr.warning(message, title, {timeOut: timeOut, tapToDismiss: tapToDismiss, extendedTimeOut: extendedTimeOut});
  }

  showHTMLMessage(message: string, title: string) {
    this.toastr.success(message, title, {
      enableHtml :  true
    });
  }
}
