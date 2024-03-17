import {Component, ViewChild, ElementRef, Inject, OnInit, AfterViewInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EntityType } from '../../model/api/administration/entity-type';
import { EntityFileResult } from '../../model/api/result/entity-file-result';
import { PagedResult } from '../../model/common/paged-result';
import { Param } from '../../model/common/param';
import { EntityTypeHttpService } from '../../services/http/administration/entity-type.http.service';
import { EntityFileHttpService } from '../../services/http/common/entity-file.http.service';
import { NotificationService } from '../../services/notification.service';
import { NotifyService } from '../../services/notify.service';

@Component({
  selector: 'app-upload-request-budget-forecast-modal',
  templateUrl: './upload-request-budget-forecast-modal.component.html',
  styleUrls: ['./upload-request-budget-forecast-modal.component.scss']
})
export class UploadRequestBudgetForecastModalComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef;

  public files: any[] = [];
  public info: string = '';
  public quantity: number = 0;

  public entityTypes: EntityType[] | null = null;
  public entityTypeId: number = 0;

  public entityId: number = 0;

  public uploadType: string = '';
  public uploadFolder: string = '';

  constructor (
    public entityFilesProvider: EntityFileHttpService,
    public documentTypesProvider: EntityTypeHttpService,
    public dialogRef: MatDialogRef<UploadRequestBudgetForecastModalComponent>,
    public notificationService: NotificationService,
    public notifyService: NotifyService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.uploadType = data.uploadType;
    this.uploadFolder = data.uploadFolder;
    this.updateInputData(data);
  }

  private updateInputData(data: any) {
    this.entityId = data.entityId;
  }

  ngOnInit(): void {

    const params: Array<Param> = new Array<Param>();
    params.push(new Param('uploadFolder', this.uploadFolder));
    this.documentTypesProvider.get(1, 100, 'code', 'asc', params, null)
      .subscribe((result: PagedResult<EntityType>) => {
        this.entityTypes = result.items;
      });

    this.subscribeToFileUploadProgressUpdate();
  }

  subscribeToFileUploadProgressUpdate() {
    this.notifyService.fileUploadProgressUpdate$
      .subscribe(fileUploadProgressUpdate => {
        // this.notificationSvc.success('', `${dataImportProgress.current} inregistrari importate din fisierul ${dataImportProgress.fileName}.`);
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
      // console.log('Upload in progress.');
      return;
    }
    this.files.splice(index, 1);
  }

  formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  public onSubmit() {
    // for (const file of this.files) {
    //   // console.log(this.assetId);
    //   // this.dataImportProvider.upload({ fileName: file.name, data: file })
    //   //   .subscribe(() => {
    //   //     console.log('finish');
    //   //   });

    //   // this.upload(i, this.selectedFiles[i]);
    //   this.entityFilesProvider.upload({ fileName: file.name, data: file }, this.assetId, this.uploadType, '')
    //     .subscribe(() => {

    //     });
    // }

    this.uploadFiles(0);
  }

  public uploadFiles(index: number) {
    let count = this.files.length;
    if (this.files.length > index) {
      const file = this.files[index];
      this.entityFilesProvider.uploadRequestBudgetForecastDocument({ fileName: file.name, data: file }, this.entityId, this.entityTypeId, this.info, this.quantity, count)
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
