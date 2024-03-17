import { Component, EventEmitter, Input, Output, ViewContainerRef } from '@angular/core';
import { EntityFileHttpService } from '../../services/http/common/entity-file.http.service';
import { EntityFile } from '../../model/api/common/entity-file';
import { NotificationService } from '../../services/notification.service';
@Component({
    selector: 'app-entity-file-inventory-list-delete',
    templateUrl: 'entity-file-inventory-list-delete.html',
    providers: [ EntityFileHttpService ]
})
export class EntityFileInventoryListDelete {
    @Input() entityFile: EntityFile = null;

    @Output() protected deleteFinished = new EventEmitter<void>();

    constructor(
        private entityFileHttpService: EntityFileHttpService,
        private notification: NotificationService
        ) { }

    delete() {
        this.entityFileHttpService
            .deleteInventoryListEntityFile(this.entityFile.id)
            .subscribe((res) => {
                if (res.success){
                    this.deleteFinished.emit(null);
                    this.notification.showInfo(res.message, 'Stergere', 2000, true, 0);
                    
               }else{
                this.notification.showError(res.message, 'Stergere', 2000, true, 0);
               }
            }, (error) => {
              this.notification.showWarning('Eroare server!', 'Stergere', 2000, true, 0)
            });
    }
}
