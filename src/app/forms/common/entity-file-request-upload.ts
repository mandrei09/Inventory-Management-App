import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { EntityFileHttpService } from '../../services/http/common/entity-file.http.service';

@Component({
    selector: 'app-entity-file-request-upload',
    templateUrl: 'entity-file-request-upload.html',
    providers: [ EntityFileHttpService ]
})
export class EntityFileRequestUploadComponent {
    @Input() multiple: boolean = false;
    @Input() entityId: number = 0;
    @Input() entityTypeCode: string = '';
    @Input() info: string = '';

    @Output() public uploadFinished = new EventEmitter<void>();

    @ViewChild('fileInput') fileInput: ElementRef;
    // public info: string = '';

    constructor(public entityFileHttpService: EntityFileHttpService) {}

    public get allowUpload(): boolean {
        // let fi = this.fileInput.nativeElement;

        // console.log(this.entityId);
        // console.log(this.entityTypeCode);

        // return this.entityId > 0 && this.entityTypeCode != null && this.entityTypeCode.length > 0 && fi.files && fi.files[0];

        return true;
    }

    upload() {
        const fi = this.fileInput.nativeElement;
        if (fi.files && fi.files[0]) {
            const fileToUpload = fi.files[0];
            this.entityFileHttpService
                .uploadRequest(fileToUpload, this.entityId, 38, this.info, 0, 1)
                .subscribe(res => {
                    this.uploadFinished.emit(null);
                });
        }
    }
}
