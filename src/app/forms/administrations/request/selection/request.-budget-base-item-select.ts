import { Component, forwardRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GenericItemSelect } from '../../../../common/generic-item-select/generic.item-select';
import { RequestBudgetBaseSelectionDialog } from './request-budget-base-.selection.dialog';

@Component({
  selector: 'request-budget-base-item-select',
  templateUrl: '../../../../common/generic-item-select/generic.item-select.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RequestBudgetBaseItemSelect),
      multi: true
    }
  ]
})
export class RequestBudgetBaseItemSelect extends GenericItemSelect<any, number> implements ControlValueAccessor {

  constructor(
    public override dialog: MatDialog) {
    super(dialog);

    this.selectionDialog = RequestBudgetBaseSelectionDialog;
  }
}
