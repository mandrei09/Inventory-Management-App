import { Component, EventEmitter, forwardRef, HostBinding, HostListener, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FieldByNamePipe } from '../../forms/common/pipes/field-by-name.pipe';
import { IEntity } from '../../model/i-entity';
import { Param } from '../../model/common/param';
@Component({
    template: ''
  })
export class GenericItemSelect<T extends IEntity<V>, V> implements ControlValueAccessor {
  @Input() public placeholder: string = '';
  @Input() public params: Array<Param> = [];
  @Input() public classId: any = null;
  @Input() public disabled: boolean = false;
  @Input() public isDisabled: boolean = false;

  @Output() public onClick: EventEmitter<void> = new EventEmitter();
  @Output() public onSelect: EventEmitter<any> = new EventEmitter();
  @Output() public onDisable: EventEmitter<any> = new EventEmitter();

  @Input() public displayValue: string = 'name';
  @Input() public selectionType: string = 'single';
  @Input() public showMinimizedPlaceHolder: string = 'false';
  @Input() public userClass: string | null = null;

  @Input() public disabledItems: Array<T> = [];
  public selectedItems: Array<T> = new Array<T>();
  private _showSelection: boolean = false;
  public get showSelection(): boolean { return this._showSelection; }
  public set showSelection(value: boolean) { this._showSelection = value; }

  public get itemsSelected(): boolean { return ((this.selectedItems !== undefined) && (this.selectedItems !== null) && (this.selectedItems.length > 0)); };
  public get allowShowSelection(): boolean { return ((this.selectedItems !== undefined) && (this.selectedItems !== null) && (this.selectedItems.length > 1)); };

  public get selectionDetails(): string {
      if ((this.selectedItems === null) || (this.selectedItems.length === 0)) return '';

      let result: string = '';
      let fieldByNamePipe: FieldByNamePipe = new FieldByNamePipe();

      this.selectedItems.forEach(item => {
        if (this.displayValue.toLowerCase() === 'name') {
          result += (result.length > 0 ? ', ' : '') + fieldByNamePipe.transform(item, 'name');
        } else if (this.displayValue.toLowerCase() === 'code') {
          result += (result.length > 0 ? ', ' : '') + fieldByNamePipe.transform(item, 'code');
        } else if (this.displayValue.toLowerCase() === 'code-name') {
          result += (result.length > 0 ? ', ' : '') + fieldByNamePipe.transform(item, 'code') + ' - ' + fieldByNamePipe.transform(item, 'name');
        } else if (this.displayValue.toLowerCase() === 'full-name') {
          result += (result.length > 0 ? ', ' : '') + fieldByNamePipe.transform(item, 'firstName') + ' - ' + fieldByNamePipe.transform(item, 'lastName');
        } else if (this.displayValue.toLowerCase() === 'budgetBase-code') {
          result += (result.length > 0 ? ', ' : '') + fieldByNamePipe.transform(item, 'budgetBase.code');
        } else if (this.displayValue.toLowerCase() === 'month-year') {
          result += (result.length > 0 ? ', ' : '') + fieldByNamePipe.transform(item, 'month') + ' - ' + fieldByNamePipe.transform(item, 'year');
        } else {
          result += (result.length > 0 ? ', ' : '') + fieldByNamePipe.transform(item, this.displayValue);
        }
      });
      return result;
    };

  //item: any = null;
  public selectionDialog: any = null;

  // we give some disabled style
  // @HostBinding('class.disabled')
  // isDisabled = false;

  @HostListener('document:click', ['$event']) onDocumentClick(event: any) {
    this.showSelection = false;
  }

  constructor(public dialog: MatDialog) {
    this.onChange = (_: any) => {};
  }

  public get getData(): any { return { params: this.params, selectedItems: this.selectedItems, selectionType: this.selectionType, disabledItems: this.disabledItems }; }

  onOpenSelection() {
    if(this.isDisabled) return;

    this.propagateTouched();

    const dialogRef = this.dialog.open(this.selectionDialog, { panelClass: 'centered-middle-modal', width: '80%', maxWidth: '90%', maxHeight: '80%', height: 'auto', position: {top: '10em'},
    // data: { classId: this.classId, params: this.params, selectedItems: this.selectedItems, selectionType: this.selectionType, disabledItems: this.disabledItems }
      data: this.getData
    });

    dialogRef.afterClosed().subscribe((items: Array<any>) => {
      if ((items !== null) && (items !== undefined) && (items.length > 0)) {
        //this.selectedItems = items;

        items.forEach(item => {
          let found: boolean = false;
          this.selectedItems.forEach((listItem) => {
            if (listItem.id === item.id) found = true;
          });

          if (!found) {
            if ((this.selectionType === "single") && (this.selectedItems.length > 0)) {
              this.selectedItems.splice(0, this.selectedItems.length);
            }

            this.selectedItems.push(item);
          }
        });

        //this.onChange(this.selectedItems);
        this.notifyOnChange(this.selectedItems);
        this.onSelect.emit(this.selectedItems);
      }
    });
  }

  onClearSelection() {

    if (this.isDisabled) return;

    this.selectedItems.splice(0, this.selectedItems.length);
    this.showSelection = false;
    this.notifyOnChange(this.selectedItems);
  }

  writeValue(value: any) {
    if ((value === undefined) || (value === null)) {
      this.selectedItems = [];
    }
    else {
      if (this.selectionType === "single") {
        //this.selectedItems = [...value];
        this.selectedItems = [];
        this.selectedItems.push(value);
      }
      else {
        this.selectedItems = value;
      }
    }
    //this.notifyOnChange(this.selectedItems);
  }

  private onChange: Function;
  public propagateTouched = () => { };

  public registerOnChange(fn: any) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any) {
    this.propagateTouched = fn;
  }

  // setDisabledState is called by Angular
  // this is the opportunity for us to adjust our component style and logic
  setDisabledState(disabled: boolean) {
    this.isDisabled = disabled;
  }

  onShowSelection() {
    this.showSelection = !this.showSelection;
  }

  onRemoveItemFromList(item: T) {
    const index = this.selectedItems.indexOf(item);
    if (index > -1) {
      this.selectedItems.splice(index, 1);
      //this.onChange(this.selectedItems);
      this.notifyOnChange(this.selectedItems);

      if (this.selectedItems.length === 0) {
        this.showSelection = false;
      }
    }
  }

  notifyOnChange(items: Array<T>) {
    if (this.selectionType === 'single') {
      if ((items === undefined) || (items === null)) {
        this.onChange(null);
      }
      else {
        if(items.length === 0) {
          this.onChange(null);
        }
        else {
          this.onChange(items[0]);
        }
      }
    }
    else {
      if ((items === undefined) || (items === null)) {
        this.onChange([]);
      }
      else {
       this.onChange(items);
      }
    }
  }
}
