import { Component, forwardRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GenericItemSelect } from '../../../../common/generic-item-select/generic.item-select';
import { ProjectTypeDivisionSelectionDialog } from './project-type-division.selection.dialog';

@Component({
  selector: 'project-type-divisions-item-select',
  templateUrl: '../../../../common/generic-item-select/generic.item-select.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProjectTypeDivisionItemSelect),
      multi: true
    }
  ]
})
export class ProjectTypeDivisionItemSelect extends GenericItemSelect<any, number> implements ControlValueAccessor {

  constructor(
    public override dialog: MatDialog) {
    super(dialog);

    this.selectionDialog = ProjectTypeDivisionSelectionDialog;
  }
}
