import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { AssetHttpService } from '../services/http/assets/asset.http.service';
import { saveAs as fileSaveAs } from 'file-saver-es';

@Component({
  selector: 'app-upload-far-modal',
  templateUrl: './upload-far-modal.component.html',
  styleUrls: ['./upload-far-modal.component.scss']
})
export class UploadFarModalComponent {
  
  @ViewChild('fileInputEmag') fileInputEmag: ElementRef = null;
  public fileEventEmag: any = null;

  public files: any[] = [];

  @Output() public uploadFinished = new EventEmitter<void>();

  public loadFileEmag(ev) {
    this.fileEventEmag = ev;
}

  constructor(
    public notification: NotificationService,
    public assetHttpService: AssetHttpService){
    
  }

  public upload() {
    this.notification.showWarning('Importul datelor a inceput!', '', 0, false, 0);
    let fileInput = this.fileInputEmag.nativeElement;
    if (fileInput.files && fileInput.files.length > 0) {
      let fileToUpload = fileInput.files[0];
      this.assetHttpService
        .import(fileToUpload)
        .subscribe(res => {
          this.uploadFinished.emit(null);
          this.notification.showSuccess('Importul datelor s-a finalizat cu succes!', '', 0, false, 0);
        });
    }
  } 

  public generateFarTemplate(){
    this.assetHttpService
      .getFarTemplate()
      .subscribe(res => {
        fileSaveAs(res!.body, "Template_Import_FAR");
      });
  }


}
