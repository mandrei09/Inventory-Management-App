import { Component, forwardRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GenericItemSelect } from '../../../common/generic-item-select/generic.item-select';
import { RolesSelectionDialog } from './roles.selection.dialog';

@Component({
  selector: 'roles-item-select',
  templateUrl: '../../../common/generic-item-select/generic.item-select.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RolesItemSelect),
      multi: true
    }
  ]
})
export class RolesItemSelect extends GenericItemSelect<any, number> implements ControlValueAccessor {

  constructor(
    public override dialog: MatDialog) {
    super(dialog);

    this.selectionDialog = RolesSelectionDialog;
  }
}
