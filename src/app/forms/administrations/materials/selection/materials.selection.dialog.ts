import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {MaterialList} from '../material.list';
import {Material} from '../../../../model/api/administration/material';
import {MaterialHttpService} from '../../../../services/http/administration/material.http.service';

@Component({
  selector: 'material-selection-dialog',
  templateUrl: 'materials.selection.dialog.html',
  styleUrls: ['materials.selection.dialog.scss']
})
export class MaterialsSelectionDialog {

  public itemList!: MaterialList;
  @ViewChild(MaterialList) set setItemList(itemList: MaterialList) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<Material> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: MaterialHttpService,
    public dialogRef: MatDialogRef<MaterialsSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<Material>) {
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
