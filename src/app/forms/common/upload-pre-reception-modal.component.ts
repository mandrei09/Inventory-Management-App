import {Component, ViewChild, ElementRef, Inject, OnInit, AfterViewInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EntityType } from '../../model/api/administration/entity-type';
import { PagedResult } from '../../model/common/paged-result';
import { Param } from '../../model/common/param';
import { EntityTypeHttpService } from '../../services/http/administration/entity-type.http.service';
import { EntityFileHttpService } from '../../services/http/common/entity-file.http.service';
import { NotifyService } from '../../services/notify.service';

@Component({
  selector: 'app-upload-pre-reception-modal',
  templateUrl: './upload-pre-reception-modal.component.html',
  styleUrls: ['./upload-pre-reception-modal.component.scss']
})
export class UploadPreReceptionModalComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef;

  public files: any[] = [];
  public details: string = '';

  public entityTypes: EntityType[] | null = null;
  public entityTypeId: number = 0;

  public assetIds: number[] = [];

  public uploadType: string = '';
  public uploadFolder: string = '';

  docNo1 = '';

  constructor (
    public entityFilesProvider: EntityFileHttpService,
    public documentTypesProvider: EntityTypeHttpService,
    public dialogRef: MatDialogRef<UploadPreReceptionModalComponent>,
    public notifyService: NotifyService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // console.log(JSON.stringify(data.item));
    this.assetIds = data.assetIds;
    this.uploadType = data.uploadType;
    this.uploadFolder = data.uploadFolder;
    this.updateInputData(data);
  }

  private updateInputData(data: any) {
    // console.log(JSON.stringify(data));
    this.assetIds = data.assetIds;
    this.docNo1 = data.docNo1;
    this.details = data.details;
  }

  ngOnInit(): void {

    const params: Array<Param> = new Array<Param>();
    params.push(new Param('uploadFolder', this.uploadFolder));
    this.documentTypesProvider.get(1, 100, 'code', 'asc', params, null)
      .subscribe((result: PagedResult<EntityType>) => {
        this.entityTypes = result.items;

        // console.log(JSON.stringify(this.entityTypes));
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
      console.log('Upload in progress.');
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

    this.uploadFiles(0);
  }

  public uploadFiles(index: number) {
    if (this.files.length > index) {
      const file = this.files[index];
      this.entityFilesProvider.uploadPreReception({ fileName: file.name, data: file }, this.assetIds, this.entityTypeId, this.details, this.docNo1)
        .subscribe((res) => {
          this.uploadFiles(index + 1);
        });
    } else {
      this.dialogRef.close();
    }
  }

  public get canYouUpload()
  {
    return (this.entityTypeId && this.entityTypeId != null && this.docNo1 != '' && this.files.length)
  }
}
