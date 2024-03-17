import {Component, ElementRef, Inject, OnInit, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { EntityFileHttpService } from "../../../services/http/common/entity-file.http.service";
import { DocumentTypeHttpService } from "../../../services/http/documents/document-type.http.service";
import { Param } from '../../../model/common/param';
import { EntityType } from '../../../model/api/administration/entity-type';
import { PagedResult } from '../../../model/common/paged-result';
import { NotifyService } from '../../../services/notify.service';
import { EntityFileResult } from '../../../model/api/result/entity-file-result';
import { NotificationService } from '../../../services/notification.service';
import { EntityTypeHttpService } from "../../../services/http/administration/entity-type.http.service";

@Component({
  selector: 'po-order-upload-modal',
  templateUrl: './po-order.upload-modal.component.html',
  styleUrls: ['./po-order.upload-modal.component.scss']
})
export class PoOrderUploadModalComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef;

  public files: any[] = [];

  public info: string = "";

  public uploadType: string = '';
  public uploadFolder: string = '';
  public entityTypeId: number = 0;

  public entityTypes: EntityType[] | null = null;
  public quantity: number = 0;
  public orderId: number = 0;
  
  constructor ( private documentTypesProvider: DocumentTypeHttpService,
    private entityFileProvider: EntityFileHttpService,
    private entityTypeProvider: EntityTypeHttpService,
    public notifyService: NotifyService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<PoOrderUploadModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) 
    {
        this.uploadType = data.uploadType;
        this.uploadFolder = data.uploadFolder;
        this.entityTypeId = data.entityTypeId;

        this.updateInputData(data);
    }
    
    private updateInputData(data: any) {
        this.orderId = data.orderId;
      }
    
  ngOnInit(): void {
      const params: Array<Param> = new Array<Param>();
      params.push(new Param('uploadFolder', this.uploadFolder));
      this.entityTypeProvider.get(1, 100, 'code', 'asc', params, null)
      .subscribe((result: PagedResult<EntityType>) => {
          this.entityTypes = result.items;
      });

  this.subscribeToFileUploadProgressUpdate();
  }

  subscribeToFileUploadProgressUpdate() {
      this.notifyService.fileUploadProgressUpdate$
      .subscribe(fileUploadProgressUpdate => {
          this.files.forEach(file => {
              if (file.name === fileUploadProgressUpdate.fileName) {
                  file.progress = fileUploadProgressUpdate.progress;
              }
          });
      });
  }

  public onFileInputChange(ev: any) {
    for (let index = 0; index < this.fileInput.nativeElement.files.length; index++) {
      this.files.push(this.fileInput.nativeElement.files[index]);
    }
  }

  onFileDropped($event: any[]) {
    for (let index = 0; index < $event.length; index++) {
      this.files.push($event[index]);
    }
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    if (this.files[index].progress < 100) {
      console.log("Upload in progress.");
      return;
    }
    this.files.splice(index, 1);
  }

  formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  public onSubmit() {
      if (this.files.length > 0) {
        this.uploadFiles(0);
      }
  }

  public uploadFiles(index: number) {
    if (this.files.length > index) {
      let file = this.files[index];
      this.entityFileProvider.uploaPOdOrder({ fileName: file.name, data: file }, this.orderId, this.entityTypeId, this.info)
      .subscribe((result: EntityFileResult) => {
        if (result.success) {
          this.notificationService.showSuccess(result.message, 'Upload fisier', 0, false, 0);
          this.uploadFiles(index + 1);
        } else if (!result.success) {
            this.notificationService.showError('Motiv: ' + result.message + '!', 'Eroare salvare date', 0, false, 0);
        }
      });
    } else {
      this.dialogRef.close();
    }
}

}
