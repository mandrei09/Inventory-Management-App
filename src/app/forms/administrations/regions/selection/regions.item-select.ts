import { Component, forwardRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GenericItemSelect } from '../../../../common/generic-item-select/generic.item-select';
import { RegionsSelectionDialog } from './regions.selection.dialog';

@Component({
  selector: 'regions-item-select',
  templateUrl: '../../../../common/generic-item-select/generic.item-select.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RegionsItemSelect),
      multi: true
    }
  ]
})
export class RegionsItemSelect extends GenericItemSelect<any, number> implements ControlValueAccessor {

  constructor(
    public override dialog: MatDialog) {
    super(dialog);

    this.selectionDialog = RegionsSelectionDialog;
  }
}
