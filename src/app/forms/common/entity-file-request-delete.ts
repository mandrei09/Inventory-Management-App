import { Component, EventEmitter, Input, Output, ViewContainerRef } from '@angular/core';
import { EntityFileHttpService } from '../../services/http/common/entity-file.http.service';
import { EntityFile } from '../../model/api/common/entity-file';
import { NotificationService } from '../../services/notification.service';
@Component({
    selector: 'app-entity-file-request-delete',
    templateUrl: 'entity-file-request-delete.html',
    providers: [ EntityFileHttpService ]
})
export class EntityFileRequestDelete {
    @Input() entityFile: EntityFile = null;

    @Output() protected deleteFinished = new EventEmitter<void>();

    constructor(
        private entityFileHttpService: EntityFileHttpService,
        private notification: NotificationService
        ) { }

    delete() {
        this.entityFileHttpService
            .deleteRequestEntityFile(this.entityFile.id)
            .subscribe((res) => {
                if (res.success){
                    this.notification.showSuccess(res.message, 'Stergere', 2000, false, 2000);
                    this.deleteFinished.emit(null);
               }else{
                this.notification.showError(res.message, 'Stergere', 2000, false, 2000);
               }
            }, (error) => {
              this.notification.showSuccess('Eroare server!', 'Stergere', 2000, false, 2000)
            });
    }
}
