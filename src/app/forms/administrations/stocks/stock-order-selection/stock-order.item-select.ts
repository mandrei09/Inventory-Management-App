import { Component, forwardRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GenericItemSelect } from '../../../../common/generic-item-select/generic.item-select';
import { StockOrderSelectionDialog } from './stock-order.selection.dialog';

@Component({
  selector: 'stock-order-item-select',
  templateUrl: '../../../../common/generic-item-select/generic.item-select.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StockOrderItemSelect),
      multi: true
    }
  ]
})
export class StockOrderItemSelect extends GenericItemSelect<any, number> implements ControlValueAccessor {

  constructor(
    public override dialog: MatDialog) {
    super(dialog);

    this.selectionDialog = StockOrderSelectionDialog;
  }
}
