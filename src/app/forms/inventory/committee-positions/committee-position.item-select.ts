import { Component, forwardRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GenericItemSelect } from '../../../common/generic-item-select/generic.item-select';
import { CommitteePostionSelectionDialog } from './committee-position.selection.dialog';


@Component({
  selector: 'committee-postion-item-select',
  templateUrl: '../../../common/generic-item-select/generic.item-select.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CommitteePostitionItemSelect),
      multi: true
    }
  ]
})
export class CommitteePostitionItemSelect extends GenericItemSelect<any, number> implements ControlValueAccessor {

  constructor(
    public override dialog: MatDialog) {
    super(dialog);

    this.selectionDialog = CommitteePostionSelectionDialog;
  }
}
