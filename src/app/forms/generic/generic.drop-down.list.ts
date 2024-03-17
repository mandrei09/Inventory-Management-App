import { Directive } from '@angular/core';
import { GenericList } from '../../forms/generic/generic.list';
import { IEntity } from '../../model/i-entity';
@Directive()
export class GenericDropDownList<T extends IEntity<V>, V> extends GenericList<T, V> {

    // constructor(sortColumn: string, sortDirection: string) {
    //     super(sortColumn, sortDirection);

    //     this.usePaging = "false";
    // }

    public clearSelectedItem() {
        this._selectedItems = new Array<T>();
        this.notifyCurrentSelection();
    }

    public setSelectedItem(item: T) {
        this._selectedItems = new Array<T>();
        this._selectedItems.push(item);
        this.notifyCurrentSelection();
    }

    public doCustomProcessing() {
        if ((this.selectionRequired == "true") && (this.items.length > 0)) {
            this.setSelectedItem(this.items[0]);
        }
    }
}