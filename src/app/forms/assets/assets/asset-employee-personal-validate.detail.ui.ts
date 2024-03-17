import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild, ViewContainerRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AppData } from '../../../app-data';
import { AssetEmployeeSave } from '../../../model/api/assets/asset-employee-save';
import { EmployeeValidateStatus } from '../../../model/api/common/employee-validate-status';
import { ColumnDefinition } from '../../../model/common/column-definition';
import { PagedResult } from '../../../model/common/paged-result';
import { Param } from '../../../model/common/param';
import { TableDefinition } from '../../../model/common/table-definition';
import { AuthenticationService } from '../../../services/authentication.service';
import { DictionaryItemHttpService } from '../../../services/http/administration/dictionary-item.http.service';
import { EmployeeHttpService } from '../../../services/http/administration/employee.http.service';
import { AssetHttpService } from '../../../services/http/assets/asset.http.service';
import { BrandHttpService } from '../../../services/http/assets/brand.http.service';
import { ModelHttpService } from '../../../services/http/assets/model.http.service';
import { ColumnDefinitionHttpService } from '../../../services/http/common/column-definition.http.service';
import { ConfigValuesHttpService } from '../../../services/http/common/config-values.service';
import { DashboardHttpService } from '../../../services/http/common/dashboard.http.service';
import { TableDefinitionHttpService } from '../../../services/http/common/table-definition.http.service';
import { NotificationService } from '../../../services/notification.service';
import { DictionaryItemDetailComponent } from '../../administrations/dictionary-item/dictionary-item.detail';
import { DictionaryItemListComponent } from '../../administrations/dictionary-item/dictionary-item.list';
import { BrandList } from '../brands/brand.list';
import { ModelList } from '../models/model.list';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FileHttpService } from '../../../services/file.service';
import { saveAs as fileSaveAs } from 'file-saver-es';
import { AppConfig } from '../../../config';
import { AssetEmployeePersonalValidateListComponent } from './asset-employee-personal-validate.list';
import { Operation } from '../../../model/api/documents/operation';
import { DocumentUpload } from '../../../model/api/documents/document-upload';
import { DocumentHttpService } from '../../../services/http/documents/document.http.service';
import { Document } from '../../../model/api/documents/document';
import { AssetSimpleDetail } from '../../../model/api/assets/asset-simple-detail';
import { AssetImage, EntityFile } from '../../../model/api/common/entity-file';
import { EntityFileHttpService } from '../../../services/http/common/entity-file.http.service';
import { PersonelValidate } from '../../../model/api/documents/personel-validate';
import { TransferResult } from '../../../model/api/result/transfer-result';
import { WFHResult } from '../../../model/api/result/wfh-result';
import {formatDate} from '@angular/common';
import { MobilePhoneHttpService } from '../../../services/http/common/mobile-phone.http.service';
import {DialogService} from '../../../services/dialog.service';

@Component({
    selector: 'app-asset-employee-personal-validate-detail-ui',
    templateUrl: 'asset-employee-personal-validate.detail.ui.html',
    styleUrls: ['asset-employee-personal-validate.detail.ui.scss'],
    providers: [ AssetHttpService ]
})
export class AssetEmployeePersonalValidateDetailUIComponent implements OnInit  {

    @ViewChild('assetInvFullDetailList') public assetInvFullDetailList: AssetEmployeePersonalValidateListComponent;

    @ViewChild('dictionaryItemDetail') public dictionaryItemDetail: DictionaryItemDetailComponent;
    @ViewChild('dictionaryItemList') public dictionaryItemList: DictionaryItemListComponent;

    @ViewChild('dictionaryItemDetailModal') public dictionaryItemDetailModal: ModalDirective;
    @ViewChild('dictionaryItemListModal') public dictionaryItemListModal: ModalDirective;

    @ViewChild('brandList') public brandList: BrandList;
    @ViewChild('brandListModal') public brandListModal: ModalDirective;

    @ViewChild('modelList') public modelList: ModelList;
    @ViewChild('modelListModal') public modelListModal: ModalDirective;

    @ViewChild('confirmationModal') public confirmationModal: ModalDirective;

    public assetEmployee: AssetEmployeeSave = new AssetEmployeeSave();
    // public selectedAsset: AssetSimpleDetail = null;
    public selectedAssets: Array<AssetSimpleDetail> = new Array<AssetSimpleDetail>();
    isSaved = true;
    decodedToken: any;
    public token = '';
    roleName = '';
    reasonReject = '';
    phoneNumber = '';
    checkUniquePhoneNumber = false;
    public itemsInventory = new Array<EmployeeValidateStatus>();

    public confirmationMessage: string = '';
    public operationType: OperationType = OperationType.NotSet;

    public imageCount: number = 0;
    public imageIndex: number = 0;
    public imageLoading: boolean = false;
    public assetImagesPdf: Array<AssetImage> = new Array<AssetImage>();
    public assetImages: Array<AssetImage> = new Array<AssetImage>();
    public assetFiles: Array<EntityFile> = new Array<EntityFile>();
    public existingAssetImages: Array<AssetImage> = new Array<AssetImage>();

    today = new Date();
    todaysDataTime = '';

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public dialogService: DialogService,
        public assetHttpService: AssetHttpService,
        public dictionaryItemHttpService: DictionaryItemHttpService,
        public brandHttpService: BrandHttpService,
        public modelHttpService: ModelHttpService,
        public notificationService: NotificationService,
        public employeeHttpService: EmployeeHttpService,
        public dashboardHttpService: DashboardHttpService,
        public tableDefinitionHttpService: TableDefinitionHttpService,
        public columnDefinitionHttpService: ColumnDefinitionHttpService,
        public configValuesHttpService: ConfigValuesHttpService,
        public authenticationService: AuthenticationService,
        private entityFileHttpService: EntityFileHttpService,
        private jwtService: JwtHelperService,
        private fileService: FileHttpService,
        public documentHttpService: DocumentHttpService,
        public mobilePhoneHttpService: MobilePhoneHttpService,
        public http: HttpClient) {

            this.todaysDataTime = formatDate(this.today, 'dd/MM/yyyy H:mm:ss', 'en-GB');

            this.itemsInventory.push(new EmployeeValidateStatus());

            this.token = localStorage.getItem('id_token');

            if (this.token === '' || this.token == null) {
                this.router.navigate(['/login']);
            }

          //   this.router.events.subscribe((evt) => {
          //     if (evt instanceof NavigationEnd) {
          //         if (evt.urlAfterRedirects === '/wfh/validate') {
          //             // console.log('refreshing asset inv details');
          //             // console.log(JSON.stringify(evt));
          //             // this.refreshAssets();

          //             setTimeout(() => {
          //                 this.loadData();
          //               }, 100);
          //         }
          //     }
          // });
    }

  ngOnInit(): void {

        this.decodedToken = this.jwtService.decodeToken(this.token);
        const index = this.decodedToken.role[1];
        if (index.length > 1) {
          this.decodedToken.role = this.decodedToken.role.slice(0 , -1);
        }

        setTimeout(() => {
            this.loadTableConfigurationData(this.decodedToken.role);
            // this.refreshAssets();
            this.loadData();

       }, 2000);
           }

    public onAssetInvFullDetailSelectionChanged(assets: Array<AssetEmployeeSave>) {

        this.selectedAssets = new Array<any>();
        assets.forEach((asset: any) => {
            this.selectedAssets.push(asset);
        });
        // this.selectedAsset = ((assets != null) && (assets.length === 1)) ? assets[0] : null;
        // this.selectedAsset = this.assetInvFullDetailList.selectedItem;
    }

    onAssetEmployeeValidateListAfterViewInit() {
    }

    public refreshAssets() {
        const params: Array<Param> = new Array<Param>();

        // params.push(new Param('userId', this.guid.toString()));
        if(this.assetInvFullDetailList !== undefined && this.assetInvFullDetailList !== null) {
          this.assetInvFullDetailList.refresh(params);
        }
    }

    /*end MODEL */

    public deleteAssetOp() {
        this.assetHttpService.deleteAssetValidation(this.assetInvFullDetailList.selectedItem.id).subscribe( (res: WFHResult) => {
            if (res.success){
                this.notificationService.showSuccess(res.message, 'Stergere echipament', 0, false, 0);
                this.refreshAssets();
                this.loadData();
            } else {
              this.notificationService.showError(res.message, 'Stergere echipament', 0, false, 0);
            }
        });
    }

    public onDeleteAssetOp() {
        this.operationType = OperationType.AssetReject;

        this.dialogService
          .reasonDialog({
            title: 'Confirm Action',
            message: 'Refuzati transferul selectat?',
            label: 'Motiv refuz',
            confirmCaption: 'Confirm',
            cancelCaption: 'Cancel',
          })
          .subscribe((confirmed: any) => {
            if (confirmed) {
              this.onConfirmationApproved();
            }
          });

        // this.confirmationMessage = 'Refuzati transferul selectat?';
        // this.confirmationModal.show();
    }

    public onTransferValidate() {
        this.operationType = OperationType.AssetValidation;

        if (this.selectedAssets.length > 0 && this.selectedAssets[0].name.includes('phone') && this.operationType === 2) {
          this.dialogService
            .phoneNoValidationDialog({
              title: 'Validati transferul selectat?',
              label: 'Nr. telefon',
              confirmCaption: 'Da',
              cancelCaption: 'Nu',
            })
            .subscribe((phoneNumber: any) => {
              if (phoneNumber) {
                this.phoneNumber = phoneNumber;
                // console.log(phoneNumber);
                this.onConfirmationApproved();
              }
            });
        } else {
          this.dialogService
            .confirmDialog({
              title: 'Validare transfer',
              message: 'Validati transferul selectat?',
              confirmCaption: 'Da',
              cancelCaption: 'Nu',
            })
            .subscribe((confirmed: any) => {
                if (confirmed) {
                  this.onConfirmationApproved();
                }
            });
        }

        // this.confirmationMessage = 'Validati transferul selectat?';
        // this.confirmationModal.show();
    }

    public onConfirmationCanceled() {
        this.operationType = OperationType.NotSet;
        this.confirmationModal.hide();
    }

    public onConfirmationApproved() {

        switch (this.operationType) {
            case OperationType.Delete:
                this.deleteAssetOp();
                break;
            case OperationType.AssetValidation:
                 this.validateDocument();
                break;
                case OperationType.AssetReject:
                  this.rejectDocument();
                 break;
            default:
                break;
        }

        this.operationType = OperationType.NotSet;
        this.confirmationModal.hide();
    }

    public clearFilters() {
        this.loadData();
        this.loadTableConfigurationData(this.decodedToken.role);
        this.selectedAssets = new Array<AssetSimpleDetail>();
        this.assetInvFullDetailList.selectedItems = this.selectedAssets;
        this.isSaved = true;
    }

    public loadData() {
        this.dashboardHttpService.employeesStatus().subscribe( (res: any[]) => {
          this.itemsInventory = res;
      });
    }

    public loadTableConfigurationData(userRole: string) {
        this.tableDefinitionHttpService.get(1, 1000000, 'id', 'asc', null, null, 'allowAnonymous')
          .subscribe((tableDefinitions: PagedResult<TableDefinition>) => {

            const params: Array<Param> = new Array<Param>();
            params.push(new Param('roleName', userRole));
            this.columnDefinitionHttpService.get(1, 1000000, 'tableDefinitionId', 'asc', params, null, 'allowAnonymous')
              .subscribe((columnDefinitions: PagedResult<ColumnDefinition>) => {
                AppData.UpdateColumnDefinitions(tableDefinitions.items, columnDefinitions.items);
                this.refreshAssets();
                // this.configValuesHttpService.get(1, 1000000, 'id', 'asc', params)
                //   .subscribe((configValues: PagedResult<ConfigValue>) => {
                //     AppData.UpdateConfigValues(configValues.items);

                //   });
              });
          });
      }

    public get isAdmin(): boolean {
        return this.decodedToken != null && this.decodedToken.role != null && this.decodedToken.role === 'administrator';
    }

    public getSN(): void {
        const url = `${AppConfig.urlPrefix}documents/manual/serie`;
            window.open(url);
          }

    public getIMEI(): void {
    const url = `${AppConfig.urlPrefix}documents/manual/imei`;
        window.open(url);
        }

    public validateDocument() {
        this.isSaved = false;
        let items: PersonelValidate =  new PersonelValidate();
        items.assetIds = new Array<number>();
        items.phoneNumber = this.phoneNumber;
        if (this.selectedAssets.length > 0) {
            this.selectedAssets.forEach(element => {
              items.assetIds.push(element.id);
            });
        }
        this.documentHttpService.personelValidate(items).toPromise().then((data: TransferResult) => {
            if(data.success){
              this.notificationService.showSuccess(data.message, 'Validare transfer', 5000, false, 5000);
              this.isSaved = false;
              this.refreshAssets();
              this.clearFilters();
            } else {
              this.notificationService.showError(data.message, 'Validare transfer', 5000, false, 5000);
              this.isSaved = false;
            }

    }, (data: TransferResult) => {
      this.notificationService.showError(data.message, 'Validare transfer', 5000, false, 5000);
    });
    }

    public saveDocument() {
        this.isSaved = false;
        let document: Document = null;
        let operation: Operation = null;
        let operations: Array<Operation> = null;
        let documentUpload: DocumentUpload = null;

        document = new Document(0, 2, '', '', new Date(), new Date(), false, '', '', new Date(), new Date());

        operations = new Array<Operation>();

        if (this.selectedAssets.length > 0) {
            this.selectedAssets.forEach(element => {
                operation = new Operation(0, element.id, false, null, 949, 0, 0, 0, 0, 3275, 0, 0, 0, 0, 0, 0, 0);
                operations.push(operation);
            });

        }

        documentUpload = new DocumentUpload();
        documentUpload.id = document.id;
        documentUpload.documentTypeId = document.documentTypeId;
        documentUpload.docNo1 = document.docNo1;
        documentUpload.docNo2 = document.docNo2;
        documentUpload.documentDate = document.documentDate;
        documentUpload.registerDate = document.registerDate;
        documentUpload.validated = document.validated;
        documentUpload.details = document.details;
        documentUpload.serialNumber = document.serialNumber;
        documentUpload.operations = operations;

        this.documentHttpService.saveFullDocument(documentUpload).toPromise().then((data) => {
            this.isSaved = true;
            alert('Operatia a fost finalizata cu success!');
            this.clearSelection();
            this.refreshAssets();
    }, (error) => {
        alert('Eroare server');
    });
    }

    public rejectDocument() {
      this.isSaved = false;
      let document: Document = null;
      let operation: Operation = null;
      let operations: Array<Operation> = null;
      let documentUpload: DocumentUpload = null;

      document = new Document(0, 2, '', '', new Date(), new Date(), false, this.reasonReject, '', new Date(), new Date());

      operations = new Array<Operation>();

      if (this.selectedAssets.length > 0) {
          this.selectedAssets.forEach(element => {
              operation = new Operation(0, element.id, false, null,
                element.costCenterId, null, null, null,
                null, element.employeeTransferId, null, null,
                null, null, null, element.employeeId, null);
              operations.push(operation);
          });
      }

      documentUpload = new DocumentUpload();
      documentUpload.id = document.id;
      documentUpload.documentTypeId = document.documentTypeId;
      documentUpload.docNo1 = document.docNo1;
      documentUpload.docNo2 = document.docNo2;
      documentUpload.documentDate = document.documentDate;
      documentUpload.registerDate = document.registerDate;
      documentUpload.validated = document.validated;
      documentUpload.details = document.details;
      documentUpload.serialNumber = document.serialNumber;
      documentUpload.operations = operations;

      this.documentHttpService.reject(documentUpload).toPromise().then((data) => {
          this.isSaved = false;
          alert('Operatia a fost validata cu success!');
          this.clearSelection();
          this.refreshAssets();
  }, (error) => {
      alert('Eroare server');
  });
  }

        // public get allowValidate(): boolean {
        //     return this.selectedAssets.length > 0 && this.selectedAssets[0].state && (this.selectedAssets[0].state.code === 'FINAL_EMPLOYEE_VALIDATE' || this.selectedAssets[0].state.code === 'FINAL_MANAGER_VALIDATE');
        // }

        public get allowValidate(): boolean {
          if(this.selectedAssets.length > 0){
           for (let index = 0; index < this.selectedAssets.length; index++) {
             const element = this.selectedAssets[index];
             if((element.state == null) || (element.state.code !== 'FINAL_EMPLOYEE_VALIDATE')){
               return false;
             }
           }
           return true;
        } else {
          return false;
        }
     }

        public get allowTransferStock(): boolean {
            return this.selectedAssets.length > 0 && this.selectedAssets[0].state == null;
        }

                public showPhoto(type: string){

                switch (type) {
                    case 'TRANSFER':
                    this.refreshAssetOpEntityFiles(this.assetInvFullDetailList.selectedItem.valueAdd, true);
                        break;
                    default:
                        break;
                }
        }

        public clearSelection() {
          this.dialogService
            .confirmDialog({
              title: 'Stergere selectii',
              message: 'Doriti deselectarea tuturor inregistrarilor?',
              confirmCaption: 'Da',
              cancelCaption: 'Nu',
            })
            .subscribe((confirmed: any) => {
              if (confirmed) {
                this.selectedAssets = new Array<AssetSimpleDetail>();
                this.assetInvFullDetailList.selectedItems = this.selectedAssets;
              }
            });
        }


        refreshAssetOpEntityFiles(assetId: number, loadAssetImages: boolean) {
            this.entityFileHttpService.getByEntity('TRANSFER', assetId, '', 0)
            .subscribe((entityFiles: Array<EntityFile>) => {
                this.existingAssetImages.splice(0, this.existingAssetImages.length);
                this.assetImages.forEach((assetImage: AssetImage) => this.existingAssetImages.push(assetImage));
                this.assetImages.splice(0, this.assetImages.length);
                this.assetFiles.splice(0, this.assetFiles.length);
                // this.entityFileMemoryDataSource.clear();
                entityFiles.forEach((entityFile: EntityFile) => {
                    if (entityFile.fileType.startsWith('application/')) {
                        let fileContent: any = null;
                        this.existingAssetImages.forEach((assetImage: AssetImage) => {
                            if (assetImage.entityFile.id === entityFile.id) {
                                fileContent = assetImage.fileContent;
                            }
                        });
                        this.assetImages.push(new AssetImage(entityFile, fileContent));
                    } else {
                        this.assetFiles.push(entityFile);
                        // this.entityFileMemoryDataSource.addItem(entityFile);
                    }
                });
               // this.fileList.refresh(null);
                if (loadAssetImages) { this.loadAssetImages(); }
            });
        }
        private loadAssetImages() {
            if ((this.assetImages !== null) && (this.assetImages.length > 0)) {
                this.imageCount = this.assetImages.length;
                this.imageIndex = 0;
                this.imageLoading = true;
                this.loadAssetImageLoop();
            }
        }

        private loadAssetImageLoop() {
            if (this.assetImages.length > this.imageIndex) {
                const assetImage: AssetImage = this.assetImages[this.imageIndex];
                if (assetImage.fileContent === null) {
                    this.entityFileHttpService.downloadPdf(assetImage.entityFile.id).subscribe((image) => {
                        this.createImageFromBlob(assetImage, image as any);
                        this.loadNextAssetImage();
                    });
                } else {
                    this.loadNextAssetImage();
                }
            }
        }

        private createImageFromBlob(assetImage: AssetImage, image: Blob) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
               // this.images.push(reader.result);
               assetImage.fileContent = reader.result;
               // console.log(assetImage);
            }, false);
            if (image) {
               reader.readAsDataURL(image);
               fileSaveAs(image, 'BM - ' + assetImage.entityFile.entityId + '.pdf');
            }
        }

        private loadNextAssetImage() {
            if (this.imageIndex < (this.assetImages.length - 1)) {
                this.imageIndex++;
                this.loadAssetImageLoop();
            } else {
                this.imageLoading = false;
            }
        }

        public checkUnique(event: any) {

          setTimeout(() => {
              if (this.phoneNumber !== '' && this.phoneNumber != null && this.phoneNumber !== undefined && this.phoneNumber.trim().length === 10) {
                  this.checkUniquePhoneNumber = false;
                  this.mobilePhoneHttpService.checkUnique(this.phoneNumber)
                  .subscribe((result: any) => {
                      if (result) {
                          this.notificationService.showSuccess('OK', 'Verificare numar telefon', 2000, false, 0);
                          this.checkUniquePhoneNumber = true;
                      } else if (!result) {
                          this.notificationService.showError('Nu a fost gasit in baza de date', 'Verificare numar telefon', 0, false, 0);
                          this.checkUniquePhoneNumber = false;
                      }
                  });
              } else {
                this.checkUniquePhoneNumber = false;
              }
            }, 100);
      }

  public exportToExcel() {
    let params: Array<Param> = null;
    this.assetHttpService
      .export(params)
      .subscribe((blob) => {
        fileSaveAs(blob.body, 'echipamente.xlsx');
      });
  }
}

enum OperationType {
  NotSet = 1,
  AssetValidation = 2,
  Delete = 3,
  ProcessAssetOp = 4,
  AssetReject = 5
}
