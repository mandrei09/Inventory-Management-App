import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EntityFile } from '../../model/api/common/entity-file';
import { EntityFileHttpService } from '../../services/http/common/entity-file.http.service';
import { saveAs as fileSaveAs } from 'file-saver-es';

@Component({
    selector: 'app-entity-file-validate-asset-download',
    templateUrl: 'entity-file-validate-asset-download.html',
    providers: [ EntityFileHttpService ]
})
export class EntityFileValidateAssetDownloadComponent {
    // @Input() entityFileId: number = 0;
    @Input() entityFile: EntityFile = null;

    @Output() public downloadFinished = new EventEmitter<void>();

    constructor(public entityFileHttpService: EntityFileHttpService) {}

    download() {
        this.entityFileHttpService
            .downloadValidateAsset(this.entityFile.id)
            .subscribe((blob) => {
                this.downloadFinished.emit(null);
                // console.log(JSON.stringify(res));
                // console.log('download finished!');

                // this.downloadFile(res);
                fileSaveAs(blob, this.entityFile.name);
            });
    }
}
