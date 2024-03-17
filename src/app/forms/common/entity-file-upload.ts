import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { EntityFileHttpService } from '../../services/http/common/entity-file.http.service';

@Component({
    selector: 'app-entity-file-upload',
    templateUrl: 'entity-file-upload.html',
    providers: [ EntityFileHttpService ],
    styleUrls: ['entity-file-upload.scss']
})
export class EntityFileUploadComponent {
    @Input() multiple: boolean = false;
    @Input() entityId: number = null;
    @Input() entityTypeCode: string = '';
    @Input() info: string = '';
    @Input() reportTypes;
    @Input() selectedCostCenterID : number
    @Input() selectedInventory
    @Input() inInvetoryReport : boolean;

    @Output() public uploadFinished = new EventEmitter<void>();

    @Output() public uploadButton= new EventEmitter<void>()

    public uploadButtonPressed(){
        this.uploadButton.emit()
    }

    public viewUploadButton() : boolean{
        if(this.inInvetoryReport)
            return this.selectedCostCenterID && this.selectedInventory.active
        return true
    }

    @ViewChild('fileInput') fileInput: ElementRef;

    constructor(public entityFileHttpService: EntityFileHttpService) {}

    public get allowUpload(): boolean {
        return true;
    }

    setEntityDetails(entityTypeCode : string){
        this.entityTypeCode=entityTypeCode
    }

    upload(entityTypeCode : string) {

        this.setEntityDetails(entityTypeCode);
        const fi = this.fileInput.nativeElement;
        if (fi.files && fi.files[0]) {
            const fileToUpload = fi.files[0];
            this.entityFileHttpService
                .uploadReport(fileToUpload, this.entityTypeCode, fileToUpload.name,null)
                .subscribe(res => {
                    this.uploadFinished.emit(null);
                    this.fileInput = null
                });
        }
    }
}
