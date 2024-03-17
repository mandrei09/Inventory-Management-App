import { Component, forwardRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GenericItemSelect } from '../../../../common/generic-item-select/generic.item-select';
import { AssetEntitySimpleSelectionDialog } from './asset-entity-simple.selection.dialog';

@Component({
  selector: 'asset-entity-simple-item-select',
  templateUrl: '../../../../common/generic-item-select/generic.item-select.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AssetEntitySimpleItemSelect),
      multi: true
    }
  ]
})
export class AssetEntitySimpleItemSelect extends GenericItemSelect<any, number> implements ControlValueAccessor {

  constructor(
    public override dialog: MatDialog) {
    super(dialog);

    this.selectionDialog = AssetEntitySimpleSelectionDialog;
  }
}
