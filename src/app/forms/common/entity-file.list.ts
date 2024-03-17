import { Component, Input, Output,EventEmitter} from '@angular/core';
import { EntityFile } from '../../model/api/common/entity-file';
import { GenericTableList } from '../generic/generic.table.list';
import { EntityFileHttpService } from '../../services/http/common/entity-file.http.service';
import { TableItem } from '../../model/common/table-item';
import { EntityFileDownloadComponent } from './entity-file-download';

@Component({
    selector: 'app-entity-file-list',
    templateUrl: 'entity-file.list.html',
    providers : [EntityFileHttpService],
    styleUrls : ['entity-file.list.scss']

})
export class EntityFileListComponent extends GenericTableList<EntityFile, number> {

    @Input() selectedCostCenterID : number;
    @Input() inInvetoryReport : boolean;
    @Input() selectedInventoryID : number;

    @Output() selectionChanged = new EventEmitter<EntityFile[]>();

    constructor(public entityFileHttpService : EntityFileHttpService) {
        super('name', 'asc');
    }

    showSize(size){
        return ((size/1024).toFixed(2)).toString() + ' KB'
    }

    onRowSelect(tableItem: TableItem<EntityFile>): void {
        tableItem.selected ? this.unselectItem(tableItem.item) : this.selectItem(tableItem.item)
        if(tableItem.selected)
            this.selectionChanged.emit([tableItem.item])
    }

    showEntityFiles(selectedCostCenterID? : number, selectedInventoryID? : number, selectedRequestBudgetForecastId? : number) {
        this.selectedCostCenterID = selectedCostCenterID
        this.selectedInventoryID = selectedInventoryID;
        this.tableItems = new Array<TableItem<EntityFile>>()
        if(selectedCostCenterID)
        {
            this.entityFileHttpService.getByCostCenterID(selectedCostCenterID,selectedInventoryID)
                .subscribe((res : any) => {
                    if (res != null) {
                        res.forEach((resItem) => {
                        let row: TableItem<EntityFile> = { item: resItem, selected: false };
                        this.tableItems.push(row);
                        });
                    }
                });
        }
        else
            if(selectedRequestBudgetForecastId){
                this.entityFileHttpService.getByRequestId(selectedRequestBudgetForecastId)
                    .subscribe((res : any) => {
                        if (res != null) {
                            res.forEach((resItem) => {
                            let row: TableItem<EntityFile> = { item: resItem, selected: false };
                            this.tableItems.push(row);
                            });
                        }
                    });
            }
    }
}