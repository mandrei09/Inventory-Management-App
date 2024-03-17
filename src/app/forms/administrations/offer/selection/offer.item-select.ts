import { Component, forwardRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GenericItemSelect } from '../../../../common/generic-item-select/generic.item-select';
import { OfferSelectionDialog } from './offer.selection.dialog';

@Component({
  selector: 'offer-item-select',
  templateUrl: '../../../../common/generic-item-select/generic.item-select.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OfferItemSelect),
      multi: true
    }
  ]
})
export class OfferItemSelect extends GenericItemSelect<any, number> implements ControlValueAccessor {

  constructor(
    public override dialog: MatDialog) {
    super(dialog);

    this.selectionDialog = OfferSelectionDialog;
  }
}
