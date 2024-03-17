import { Component, forwardRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GenericItemSelect } from '../../../../common/generic-item-select/generic.item-select';
import { AdministrationSelectionDialog } from './administration.selection.dialog';

@Component({
  selector: 'administrations-item-select',
  templateUrl: '../../../../common/generic-item-select/generic.item-select.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AdministrationItemSelect),
      multi: true
    }
  ]
})
export class AdministrationItemSelect extends GenericItemSelect<any, number> implements ControlValueAccessor {
  public administrationId: number | null = null;

  constructor(
    public override dialog: MatDialog) {
    super(dialog);

    this.selectionDialog = AdministrationSelectionDialog;
  }
}
