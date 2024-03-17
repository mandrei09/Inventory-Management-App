import { Component, forwardRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GenericItemSelect } from '../../../common/generic-item-select/generic.item-select';
import { InventoriesSelectionDialog } from './inventories.selection.dialog';

@Component({
  selector: 'inventories-item-select',
  templateUrl: '../../../common/generic-item-select/generic.item-select.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InventoriesItemSelect),
      multi: true
    }
  ]
})
export class InventoriesItemSelect extends GenericItemSelect<any, number> implements ControlValueAccessor {

  constructor(
    public override dialog: MatDialog) {
    super(dialog);

    this.selectionDialog = InventoriesSelectionDialog;
  }
}
