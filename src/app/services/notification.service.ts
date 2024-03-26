import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private toastr: ToastrService,     
    private translocoService: TranslocoService,
    ) { }

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

  showTransSucces(page: string, key: string, duration: number = 1000, positionX: number = 0, positionY: number = 0) {
    const translatedKey = (page == null || page == '')  ? key : page + '.' + key 
    this.translocoService.selectTranslate(translatedKey).subscribe(translatedMessage => {
      this.showSuccess(translatedMessage, '', duration, positionX, positionY);
    });
  }

  showTransError(page: string, key: string, duration: number = 1000, positionX: number = 0, positionY: number = 0) {
    const translatedKey = (page == null || page == '')  ? key : page + '.' + key 
    this.translocoService.selectTranslate(translatedKey).subscribe(translatedMessage => {
      this.showError(translatedMessage, '', duration, positionX, positionY);
    });
  }

  showTransInfo(page: string, key: string, duration: number = 1000, positionX: number = 0, positionY: number = 0) {
    const translatedKey = (page == null || page == '')  ? key : page + '.' + key 
    this.translocoService.selectTranslate(translatedKey).subscribe(translatedMessage => {
      this.showInfo(translatedMessage, '', duration, positionX, positionY);
    });
  }

  showTransWarning(page: string, key: string, duration: number = 1000, positionX: number = 0, positionY: number = 0) {
    const translatedKey = (page == null || page == '')  ? key : page + '.' + key 
    this.translocoService.selectTranslate(translatedKey).subscribe(translatedMessage => {
      this.showWarning(translatedMessage, '', duration, positionX, positionY);
    });
  }

  // showTransHTMLMessage(page: string, key: string, duration: number = 1000, positionX: number = 0, positionY: number = 0) {
  //   const translatedKey = (page == null || page == '')  ? key : page + '.' + key 
  //   this.translocoService.selectTranslate(translatedKey).subscribe(translatedMessage => {
  //     this.showHTMLMessage(translatedMessage, '', duration, positionX, positionY);
  //   });
  // }
  
}
