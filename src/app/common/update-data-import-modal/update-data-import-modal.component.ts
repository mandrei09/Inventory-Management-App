import {Component, ViewChild} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import { saveAs as fileSaveAs } from 'file-saver';
import {AssetHttpService} from '../../services/http/assets/asset.http.service';
import {NotifyService} from '../../services/notify.service';
import {DialogService} from '../../services/dialog.service';
import { BudgetBaseHttpService } from '../../services/http/administration/budget-base.http.service';

@Component({
  selector: 'app-update-data-import-modal',
  templateUrl: './update-data-import-modal.component.html',
  styleUrls: ['./update-data-import-modal.component.scss']
})
export class UpdateDataImportModalComponent {

  files: any[] = [];
  file: File | null = null;

  exportCompleted = true;

  @ViewChild('fileInput') fileInput: any;

  constructor(
    public dataSource: AssetHttpService,
    public notifyService: NotifyService,
    private dialogService: DialogService,
    public dialogRef: MatDialogRef<UpdateDataImportModalComponent>,
    public budgetBasesHttpService : BudgetBaseHttpService
  ) {}

  /**
   * on file drop handler
   */
  onFileDropped($event: any) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(event: any) {
    this.prepareFilesList(event);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(element: any) {
    // this.files.splice(index, 1);
    // this.files.splice();
    this.file = null;
    element.value = '';
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(event: any) {
    // for (const item of event.target.files) {
    //   item.progress = 0;
    //   this.files.push(item);
    // }
    this.file = event;
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes: any, decimals: any) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  closeDialog(){
    // tslint:disable-next-line:no-non-null-assertion
    this.dialogRef.close({files: this.file});
  }

  onPasswordModal() {
    // this.dialogService
    //   .passwordDialog({
    //     title: 'Confirmare',
    //     message: 'Password',
    //     confirmCaption: 'Da',
    //     cancelCaption: 'Nu',
    //   })
    //   .subscribe((password: any) => {
    //     if (password) {
    //       this.exportTemplateMultiple(password);
    //     }
    //   });
  }

  public exportTemplateMultiple(password: any) {

    // this.dataSource.checkPassword(password).subscribe((res: any) => {
    //   if (res) {
    //     console.log(res);
    //     this.exportCompleted = false;
    //     this.dataSource
    //       .exportTemplateIT()
    //       .subscribe((blob: any) => {
    //         fileSaveAs(blob, 'model-import-multiple.xlsx');
    //         this.exportCompleted = true;
    //       });
    //   } else {
    //     // this.notificationSvc.error('Parola nu este corecta!');
    //   }
    //
    // });
  }
  public uploadFiles() {

  }

  public generateTemplate()
  {
    this.budgetBasesHttpService
        .getTemplate()
        .subscribe(res => {
          fileSaveAs(res!.body, "Template_Import_Budget");
        });
  }
}
