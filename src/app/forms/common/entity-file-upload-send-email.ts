import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EntityFileHttpService } from '../../services/http/common/entity-file.http.service';
import { DocumentHttpService } from '../../services/http/documents/document.http.service';

@Component({
    selector: 'app-entity-file-upload-send-email',
    templateUrl: 'entity-file-upload-send-email.html',
    providers: [ EntityFileHttpService ]
})
export class EntityFileUploadSendEmailComponent {
    @Input() multiple: boolean = false;
    @Input() entityId: number = 0;
    @Input() entityTypeCode: string = '';
    @Input() info: string = '';

    @Output() protected uploadFinished = new EventEmitter<void>();

    @ViewChild('fileInput') fileInput: ElementRef;
    // private info: string = '';
    showUploadBtn = true;

    constructor(
        private entityFileHttpService: EntityFileHttpService,
        private documentHttpService: DocumentHttpService,
        private router: Router) {}

    private get allowUpload(): boolean {
        // let fi = this.fileInput.nativeElement;

        // console.log(this.entityId);
        // console.log(this.entityTypeCode);

        // return this.entityId > 0 && this.entityTypeCode != null && this.entityTypeCode.length > 0 && fi.files && fi.files[0];

        return true;
    }

    onImageChangeFromFile(event) {

        if (event.target.files && event.target.files[0]) {
          const file = event.target.files[0];
            if (file.type === 'application/pdf') {
              // console.log(file.type);
              // alert('this is text file');
              this.showUploadBtn = true;
            } else {
               alert('Formatul fisierului nu este corect. Te rog incarca un fisier .pdf');
               this.fileInput.nativeElement.value = '';
            }
        }
    }

    upload() {
        this.showUploadBtn = false;
        const fi = this.fileInput.nativeElement;
        if (fi.files && fi.files[0]) {
            const fileToUpload = new Array<any>();
            // console.log(JSON.stringify(fi.files));
            Array.from(fi.files).forEach(file => { fileToUpload.push(file); });
            // fileToUpload = fi.files[0];
            // console.log(JSON.stringify(fileToUpload));
            // console.log(this.entityId);
            // this.entityFileHttpService
            //     .uploadInitial(fileToUpload, this.entityId, this.entityTypeCode, this.info)
            //     .subscribe(res => {
            //         // console.log(JSON.stringify(fileToUpload));
            //         this.documentHttpService.sendEmail(fileToUpload, this.entityId, this.entityTypeCode).subscribe((data) => {
            //             // alert(data);
            //             if (data) {
            //                 this.uploadFinished.emit(null);
            //                 this.fileInput.nativeElement.value = '';
            //                 alert('Mailul a fost trimis cu success catre primitor!');
            //                 this.router.navigate(['/assetinvdetails']);
            //             } else {
            //                 alert('Eroare trimitere mail!')
            //                 return;
            //             }
            //       });
            //     });
        } else {
        //     const fileToUpload = new Array<any>();
        //     this.documentHttpService.sendEmail(fileToUpload, this.entityId, this.entityTypeCode).subscribe((data) => {
        //         // alert(data);
        //         if (data) {
        //             this.showUploadBtn = true;
        //             this.uploadFinished.emit(null);
        //             this.fileInput.nativeElement.value = '';
        //             alert('Mailul a fost trimis cu success catre primitor!');
        //             this.router.navigate(['/assetinvdetails']);
        //         } else {
        //             alert('Eroare trimitere mail!');
        //             this.showUploadBtn = true;
        //             return;
        //         }
        //   });
        }
    }
}
