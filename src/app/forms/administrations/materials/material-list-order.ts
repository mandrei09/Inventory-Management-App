import {Component, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Material } from '../../../model/api/administration/material';

@Component({
    template: `
    <button type="button" pButton pRipple icon="pi pi-search" (click)="close()"></button>
    <p-table [value]="materials" [(selection)]="selectedMaterials" dataKey="code">
        <ng-template pTemplate="header">
            <tr>
                <th style="width: 3rem">
                    <p-tableHeaderCheckbox></p-tableHeaderCheckbox>
                </th>
                <th>Code</th>
                <th>Name</th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-material>
            <tr>
                <td>
                    <p-tableCheckbox [value]="material"></p-tableCheckbox>
                </td>
                <td>{{material.code}}</td>
                <td>{{material.name}}</td>
            </tr>
        </ng-template>
    </p-table>
    `
})
export class MaterialListOrder {

    materials: Material[];
    selectedMaterials: Material[];

    constructor(public ref: MatDialogRef<MaterialListOrder>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {
      this.materials = data.item;
      // console.log(JSON.stringify(data));
     }


    ngOnInit() {
    }

    close() {
      // console.log(JSON.stringify(this.selectedMaterials));
        this.ref.close(this.selectedMaterials);
    }
}
