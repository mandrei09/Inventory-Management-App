import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {ModelList} from '../model.list';
import {Model} from '../../../../model/api/assets/model';
import {ModelHttpService} from '../../../../services/http/assets/model.http.service';

@Component({
  selector: 'models-selection-dialog',
  templateUrl: 'models.selection.dialog.html',
  styleUrls: ['models.selection.dialog.scss']
})
export class ModelsSelectionDialog {

  public itemList!: ModelList;
  @ViewChild(ModelList) set setItemList(itemList: ModelList) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<Model> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: ModelHttpService,
    public dialogRef: MatDialogRef<ModelsSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<Model>) {
    this.items = items;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  public refreshItems() {
    this.itemList.resetFilters(this.params);
    this.itemList.refresh(this.params);
  }
}
