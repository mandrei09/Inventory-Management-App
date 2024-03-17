import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { AssetHttpService } from '../../../services/http/assets/asset.http.service';
import { NotificationService } from '../../../services/notification.service';
import { Asset } from '../../../model/api/assets/asset';
import { AssetSimpleDetail } from '../../../model/api/assets/asset-simple-detail';
@Component({
    selector: 'asset-pre-validate-add-edit-dialog',
    templateUrl: 'asset-pre-validate.add-edit.dialog.html',
    styleUrls: [ 'asset-pre-validate.add-edit.dialog.scss' ]
})
export class AssetPreValidateAddEditDialog {

    form!: FormGroup;
    public item: AssetSimpleDetail | null = null;

    constructor(
        private fb: FormBuilder,
        public dialog: MatDialog,
        private dataSource: AssetHttpService,
        private notifyService: NotificationService,
        public dialogRef: MatDialogRef<AssetPreValidateAddEditDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any
      ) {
        this.createForm();
        if (data.item) this.item = data.item;
        if (this.item !== null) this.form.patchValue(this.item);
      }

      ngAfterViewInit() {
        setTimeout(() => {
          if (this.item !== null) {
            this.editItem(this.item);
          }
          //else this.addItem();
        }, 0);
      }

      createForm() {
        this.form=this.fb.group({
            inSapValidation: [null],
        });
    }

    private updateItem() {
        const formModel = this.form.value;
        this.item!.inSapValidation = formModel.inSapValidation as string;
    }

    public save() {
        this.updateItem();
        if (this.item!.id! > 0) {
            this.dataSource.updateAssetSapValidation(this.item).subscribe(() => {
                this.notifyService.showSuccess('Inregistrarea a fost actualizata cu succes!', '', 3000, false, 3000);
                this.dialogRef.close();
              });
        }
    }
    
    public editItem(item: Asset) {
        this.form.patchValue(item);
      }

}