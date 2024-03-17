import { Param } from './../../../model/common/param';
import { Component, ViewChild } from '@angular/core';
import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { saveAs as fileSaveAs } from 'file-saver-es';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Model } from '../../../model/api/assets/model';
import { ModelList } from './model.list';
import { ModelDetail } from './model.detail';
import { ModelHttpService } from '../../../services/http/assets/model.http.service';
import { BrandHttpService } from '../../../services/http/assets/brand.http.service';
import { BrandList } from '../brands/brand.list';
import { CodeNameEntity } from '../../../model/api/common/code-name-entity';
import { Brand } from '../../../model/api/assets/brand';
import { AppUtils } from '../../../common/app.utils';
import {ModelAddEditComponent} from './model-item-add-edit/model-add-edit.component';
import {MatDialog} from '@angular/material/dialog';
import { UpdateDataImportModalComponent } from '../../../common/update-data-import-modal/update-data-import-modal.component';
import alasql from 'alasql';
import { DialogService } from '../../../services/dialog.service';
import { NotificationService } from '../../../services/notification.service';
import { ProgressService } from '../../../services/progress.service';
import { DataProgress } from '../../../model/api/common/data-progress';
import { ModelITImport } from '../../../model/common/import/model-it-import';
import { ImportITModelResult } from '../../../model/api/result/model-it-result';

@Component({
    selector: 'model-manage',
    templateUrl: 'model.manage.html',
    providers: [BrandHttpService]
})
export class ModelManage extends GenericManage<Model, number> {

    @ViewChild('modelDetailModal') modelDetailModal: ModalDirective;
    @ViewChild('modelList') modelList: ModelList;
    @ViewChild('modelDetail') modelDetail: ModelDetail;

    @ViewChild('brandListModal') brandListModal: ModalDirective;
    @ViewChild('brandList') brandList: BrandList;

    public selectedBrand: Brand = null;

    public filter: string = '';
    isCollapsed: boolean = true;

    public fileEvent: any = null;
    public importIndex: number = 0;
    public noOfItems: number = 0;
    public importLines: Array<ModelITImport> = new Array<ModelITImport>();

    constructor(
        public dialog: MatDialog,
        public modelHttpService: ModelHttpService,
        public brandHttpService: BrandHttpService,
        private dialogService: DialogService,
        private notifyService: NotificationService,
        public progressService: ProgressService) {
        super();
    }

    public onAddNew() {
      this.onAddEditItem();
    }

    public onAddEditItem(item: Model | null = null) {
      const dialogRef = this.dialog.open(ModelAddEditComponent, {
        panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
        data: { item: item }
      });

      dialogRef.afterClosed().subscribe((item: Model) => {
        if (item !== null) this.modelList.refreshItems();
      });
    }

    public onItemEdit(item: Model) {
      this.onAddEditItem(item);
    }

    public detailInitialize() {
        super.detailInitialize();
        this.modelDetailModal.show();
    }

    public detailTerminate() {
        super.detailTerminate();
        this.modelDetailModal.hide();
    }

    public onModelDetailBrandNeeded() {
        this.modelDetailModal.hide();
        this.selectBrand();
    }

    public onBrandListCancel() {
        this.brandListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.modelDetailModal.show();
        }
    }


    public refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param("brandIds", AppUtils.getIdsList<Brand, number>([ this.selectedBrand ])));

        this.modelList.refresh(params);
    }

    public selectBrand() {
        this.brandListModal.show();
        this.brandList.refresh(null);
    }

    public setSelectedBrand() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedBrand = this.brandList.selectedItem;
                this.brandListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.modelDetail.brand = this.brandList.selectedItem;
                this.brandListModal.hide();
                this.modelDetailModal.show();
                break;
        }
    }

    // public exportToExcel(){

    //      let params: Array<Param> = null;

    //     if ((this.filter != null) && (this.filter.length > 0)) {
    //         params = new Array<Param>();
    //         params.push(new Param('filter', this.filter));
    //     }

    //     this.locationHttpService.get(1, 10000000, 'code', 'asc', params, null).subscribe(
    //         (data: PagedResult<Location>) => {

    //             let options = {
    //                 sheetid: 'Buildings',
    //                 headers: true,
    //                 column: { style: { Font: { Bold: '1' } } },
    //                 rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
    //                 cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
    //             };

    //             alasql(`SELECT id as [Id],
    //                 code as [Cod],
    //                 name as [Denumire],
    //                 region->name as [Judet],
    //                 admCenter->name as [Regiune]
    //                 INTO XLSX("Buildings.xlsx",?) FROM ?`, [ options, data.items ]);

    //         });

    // }

    public getFilters(): Array<Param> {
        let params: Array<Param> = new Array<Param>();
        params.push(new Param('filter', this.filter));

        return params;
    }

    public export() {
      let params: Array<Param> = null;
      params = this.getFilters();
      this.modelHttpService
          .export(params)
          .subscribe((blob) => {
              fileSaveAs(blob.body, 'model-brand.xlsx');
      });
  }

    collapsed(event: any): void {
        // console.log(event);
      }

      expanded(event: any): void {
        // console.log(event);
      }


      public uploadFile() {


        let dialogRef = this.dialog.open(UpdateDataImportModalComponent, {
          panelClass: 'centered-middle-modal', height: '85%', maxHeight: '85%', disableClose: true, width: '700px', position: { bottom: '15%', top: 'auto'},
          data: { itemId: 1 }
        });

        dialogRef.afterClosed().subscribe((results: any) => {
            // console.log(results.files);
            // this.importDataBudgetModal.show();
          this.importData(results);
          // this.loadFileIT(results);
        });

        //this.uploadModal.show();
      }



      public importData(ev) {

        this.fileEvent = ev.files;
        // console.log(this.fileITEvent);
        if (this.fileEvent === null) { return; }

        alasql.promise(`select
                          CAST([Echipament] AS STRING) as [DictionaryItem],
                          CAST([Marca] AS STRING) as [Brand],
                          CAST([Model] AS STRING) as [Model],
                          CAST([Lungime Serie] AS NUMBER) as [SNLength],
                          CAST([Lungime IMEI] AS NUMBER) as [IMEILength],
                          CAST([Activ] AS STRING) as [Active]
                            from FILE(?, {headers: true})`, [this.fileEvent])
            .then((importLines: Array<ModelITImport>) => {

                // console.log(JSON.stringify(importLines));
                importLines = this.removeUndefinedFromArray(importLines);
                //console.log(JSON.stringify(importLines));
                // this.importDataEmployeeTransferMFXModal.show();

                this.importIndex = 0;
                this.importLines = importLines;
                this.noOfItems = importLines.length;

                this.dialogService
                .progressImportDialog({
                  title: 'Progress import',
                  importIndex: this.importIndex,
                  importBudgetBaseLines: this.importLines,
                  noOfItems: this.noOfItems
                })
                .subscribe((confirmed: any) => {});

                this.doImport();
        });

      }

      public removeUndefinedFromArray = (arrayToClean) => {
        const cleanedArray = [];
        arrayToClean.forEach((val: any) => {
          if (val.DictionaryItem !== 'END') {
            cleanedArray.push(val);
          }
        });

        return cleanedArray;
      }

      public doImport() {
        if (this.importIndex < this.importLines.length) {
          this.importLines[this.importIndex].count = this.importLines.length;
          this.importLines[this.importIndex].index = this.importIndex;
            this.modelHttpService.import(this.importLines[this.importIndex]).subscribe((result: ImportITModelResult) => {
                // if (data === 0) {
                //     alert('Seria ' + this.importSNLines[this.importIndex].SerialNumber + ' exista deja in baza de date!');
                //     return;
                // }

                if(result.success){
                  this.notifyService.showInfo(result.message, 'Import ' + this.importLines[this.importIndex].Model, 2000, false, 5000);
                  this.importIndex = this.importIndex + 1;

                  const data = new DataProgress();
                  data.currentIndex = this.importIndex;
                  data.noOfItems = this.importLines.length;

                  this.progressService.emitModelChange(data);
                  this.doImport();
                } else {
                  this.notifyService.showError(result.message, 'Import ' + this.importLines[this.importIndex].Model, 0, false, 0);
                  this.importIndex = this.importIndex + 1;

                  const data = new DataProgress();
                  data.currentIndex = this.importIndex;
                  data.noOfItems = this.importLines.length;

                  this.progressService.emitModelChange(data);
                  this.doImport();
                }

            });
        } else {
            this.fileEvent = null;
            //this.importDataEmployeeTransferMFXModal.hide();
            this.importIndex = 1;
            this.importLines = new Array<ModelITImport>();
            this.refresh();
        }
      }
}
