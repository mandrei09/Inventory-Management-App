import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AppUtils } from '../../../common/app.utils';
import { Account } from '../../../model/api/administration/account';
import { ExpAccount } from '../../../model/api/administration/exp-account';
import { Material } from '../../../model/api/administration/material';
import { SubType } from '../../../model/api/administration/sub-type';
import { AssetCategory } from '../../../model/api/assets/asset-category';
import { SubCategory } from '../../../model/api/assets/sub-category';
import { SubCategoryEN } from '../../../model/api/assets/sub-category-en';
import { PagedResult } from '../../../model/common/paged-result';
import { Param } from '../../../model/common/param';
import { AccountHttpService } from '../../../services/http/administration/account.http.service';
import { ExpAccountHttpService } from '../../../services/http/administration/exp-account.http.service';
import { MaterialHttpService } from '../../../services/http/administration/material.http.service';
import { SubTypeHttpService } from '../../../services/http/administration/sub-type.http.service';
import { AssetCategoryHttpService } from '../../../services/http/assets/asset-category.http.service';
import { SubCategoryENHttpService } from '../../../services/http/assets/sub-category-en.http.service';
import { SubCategoryHttpService } from '../../../services/http/assets/sub-category.http.service';
import { AssetCategoryListComponent } from '../../assets/asset-categories/asset-category.list';
import { SubCategoryENListComponent } from '../../assets/sub-categories-en/sub-category-en.list';
import { SubCategoryListComponent } from '../../assets/sub-categories/sub-category.list';
import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { AccountList } from '../account/account.list';
import { ExpAccountList } from '../exp-account/exp-account.list';
import { SubTypeList } from '../sub-types/sub-type.list';
import { MaterialDetailComponent } from './material.detail';
import { MaterialList } from './material.list';
import {MaterialAddEditComponent} from './material-add-edit/material-add-edit.component';
import {MatDialog} from '@angular/material/dialog';
import { saveAs as fileSaveAs } from 'file-saver-es';


@Component({
    selector: 'app-material-manage',
    templateUrl: 'material.manage.html',
    styleUrls: ['material.manage.scss'],
    providers: [ AccountHttpService, ExpAccountHttpService, AssetCategoryHttpService, SubCategoryHttpService, SubCategoryENHttpService, SubTypeHttpService ]
})
export class MaterialManageComponent extends GenericManage<Material, number> {

     // @ViewChild('itemDetailModal') modal: ModalDirective;

     @ViewChild('materialDetailModal') materialDetailModal: ModalDirective;
     @ViewChild('materialList')  materialList: MaterialList;
     @ViewChild('materialDetail') materialDetail: MaterialDetailComponent;

     @ViewChild('accountListModal') accountListModal: ModalDirective;
     @ViewChild('accountList') accountList: AccountList;

     @ViewChild('expAccountListModal') expAccountListModal: ModalDirective;
     @ViewChild('expAccountList') expAccountList: ExpAccountList;

     @ViewChild('assetCategoryListModal') assetCategoryListModal: ModalDirective;
     @ViewChild('assetCategoryList') assetCategoryList: AssetCategoryListComponent;

     @ViewChild('subCategoryListModal') subCategoryListModal: ModalDirective;
     @ViewChild('subCategoryList') subCategoryList: SubCategoryListComponent;

     @ViewChild('subCategoryENListModal') subCategoryENListModal: ModalDirective;
     @ViewChild('subCategoryENList') subCategoryENList: SubCategoryENListComponent;

     @ViewChild('subTypeListModal') subTypeListModal: ModalDirective;
     @ViewChild('subTypeList') subTypeList: SubTypeList;


    public filter: string = '';
    isCollapsed: boolean = true;

    public selectedAccount: Account = null;
    public selectedExpAccount: ExpAccount = null;
    public selectedAssetCategory: AssetCategory = null;
    public selectedSubCategory: SubCategory = null;
    public selectedSubCategoryEN: SubCategoryEN = null;
    public selectedSubType: SubType = null;

    constructor(
        public dialog: MatDialog,
        public materialHttpService: MaterialHttpService,
        public accountHttpService: AccountHttpService,
        public expAccountHttpService: ExpAccountHttpService,
        public assetCategoryHttpService: AssetCategoryHttpService,
        public subCategoryHttpService: SubCategoryHttpService,
        public subCategoryENHttpService: SubCategoryENHttpService,
        public subTypeHttpService: SubTypeHttpService) {
        super();
    }

     public detailInitialize() {
        this.materialDetailModal.show();
    }

    public addNewItem() {
        super.addNewItem();

        this.materialDetail.account = null;
        this.materialDetail.expAccount = null;
        this.materialDetail.assetCategory = null;
        this.materialDetail.subCategory = null;
        this.materialDetail.subCategoryEN = null;
        this.materialDetail.subType = null;
    }

    public onAddNew() {
      this.onAddEditItem();
    }

    public onAddEditItem(item: Material | null = null) {
      let dialogRef = this.dialog.open(MaterialAddEditComponent, {
        panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
        data: { item: item }
      });

      dialogRef.afterClosed().subscribe((item: Material) => {
        if (item !== null) this.materialList.refreshItems();
      });
    }

    public onItemEdit(item: Material) {
      this.onAddEditItem(item);
    }

    public editItem() {
        super.editItem();

        const material: Material = this.selectedItem as Material;

        this.materialDetail.account = null;

        if ((material != null) && (material.account != null)) {
            this.accountHttpService
                .getById(material.account.id)
                .subscribe((account: Account) => {
                    this.materialDetail.account = account;
                });
        }

        this.materialDetail.expAccount = null;

        if ((material != null) && (material.expAccount != null)) {
            this.expAccountHttpService
                .getById(material.expAccount.id)
                .subscribe((expAccount: ExpAccount) => {
                    this.materialDetail.expAccount = expAccount;
                });
        }

        this.materialDetail.assetCategory = null;

        if ((material != null) && (material.assetCategory != null)) {
            this.assetCategoryHttpService
                .getById(material.assetCategory.id)
                .subscribe((assetCategory: AssetCategory) => {
                    this.materialDetail.assetCategory = assetCategory;
                });
        }

        this.materialDetail.subCategory = null;

        if ((material != null) && (material.subCategory != null)) {
            this.subCategoryHttpService
                .getById(material.subCategory.id)
                .subscribe((subCategory: SubCategory) => {
                    this.materialDetail.subCategory = subCategory;
                });
        }

        this.materialDetail.subCategoryEN = null;

        if ((material != null) && (material.subCategoryEN != null)) {
            this.subCategoryENHttpService
                .getById(material.subCategoryEN.id)
                .subscribe((subCategoryEN: SubCategoryEN) => {
                    this.materialDetail.subCategoryEN = subCategoryEN;
                });
        }

        this.materialDetail.subType = null;

        if ((material != null) && (material.subType != null)) {
            this.subTypeHttpService
                .getById(material.subType.id)
                .subscribe((subType: SubType) => {
                    this.materialDetail.subType = subType;
                });
        }
    }

    public detailTerminate() {
        this.materialDetailModal.hide();
    }

    public onMaterialDetailAccountNeeded() {
        this.materialDetailModal.hide();
        this.selectAccount();
    }

    public onAccountListCancel() {
        this.accountListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.materialDetailModal.show();
        }
    }


    public onMaterialDetailExpAccountNeeded() {
        this.materialDetailModal.hide();
        this.selectExpAccount();
    }

    public onExpAccountListCancel() {
        this.expAccountListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.materialDetailModal.show();
        }
    }

    public onMaterialDetailAssetCategoryNeeded() {
        this.materialDetailModal.hide();
        this.selectAssetCategory();
    }

    public onAssetCategoryListCancel() {
        this.assetCategoryListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.materialDetailModal.show();
        }
    }

    public onMaterialDetailSubCategoryNeeded() {
        this.materialDetailModal.hide();
        this.selectSubCategory();
    }

    public onSubCategoryListCancel() {
        this.subCategoryListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.materialDetailModal.show();
        }
    }

    public onMaterialDetailSubCategoryENNeeded() {
        this.materialDetailModal.hide();
        this.selectSubCategoryEN();
    }

    public onSubCategoryENListCancel() {
        this.subCategoryENListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.materialDetailModal.show();
        }
    }

    public onMaterialDetailSubTypeNeeded() {
        this.materialDetailModal.hide();
        this.selectSubType();
    }

    public onSubTypeListCancel() {
        this.subTypeListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.materialDetailModal.show();
        }
    }


    public selectAccount() {
        this.accountListModal.show();
        this.accountList.refresh(null);
    }

    public setSelectedAccount() {
        this.viewMode = 2;
        switch (this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedAccount = this.accountList.selectedItem;
                this.accountListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.materialDetail.account = this.accountList.selectedItem;
                this.accountListModal.hide();
                this.materialDetailModal.show();
                break;
            default:
                break;
        }
    }

    public unselectAccount() {
        this.selectedAccount = null;
        this.refresh();
    }

    public selectExpAccount() {
        this.expAccountListModal.show();
        this.expAccountList.refresh(null);
    }

    public setSelectedExpAccount() {
        this.viewMode = 2;
        switch (this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedExpAccount = this.expAccountList.selectedItem;
                this.expAccountListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.materialDetail.expAccount = this.expAccountList.selectedItem;
                this.expAccountListModal.hide();
                this.materialDetailModal.show();
                break;
            default:
                break;
        }
    }

    public unselectExpAccount() {
        this.selectedExpAccount = null;
        this.refresh();
    }


    public selectAssetCategory() {
        this.assetCategoryListModal.show();
        this.assetCategoryList.refresh(null);
    }

    public setSelectedAssetCategory() {
        this.viewMode = 2;
        switch (this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedAssetCategory = this.assetCategoryList.selectedItem;
                this.assetCategoryListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.materialDetail.assetCategory = this.assetCategoryList.selectedItem;
                this.assetCategoryListModal.hide();
                this.materialDetailModal.show();
                break;
            default:
                break;
        }
    }

    public unselectAssetCategory() {
        this.selectedAssetCategory = null;
        this.refresh();
    }


    public selectSubCategory() {
        this.subCategoryListModal.show();
        this.subCategoryList.refresh(null);
    }

    public setSelectedSubCategory() {
        this.viewMode = 2;
        switch (this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedSubCategory = this.subCategoryList.selectedItem;
                this.subCategoryListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.materialDetail.subCategory = this.subCategoryList.selectedItem;
                this.subCategoryListModal.hide();
                this.materialDetailModal.show();
                break;
            default:
                break;
        }
    }

    public unselectSubCategory() {
        this.selectedSubCategory = null;
        this.refresh();
    }

    public selectSubCategoryEN() {
        this.subCategoryENListModal.show();
        this.subCategoryENList.refresh(null);
    }

    public setSelectedSubCategoryEN() {
        this.viewMode = 2;
        switch (this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedSubCategoryEN = this.subCategoryENList.selectedItem;
                this.subCategoryENListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.materialDetail.subCategoryEN = this.subCategoryENList.selectedItem;
                this.subCategoryENListModal.hide();
                this.materialDetailModal.show();
                break;
            default:
                break;
        }
    }

    public unselectSubCategoryEN() {
        this.selectedSubCategoryEN = null;
        this.refresh();
    }

    public selectSubType() {
        this.subTypeListModal.show();
        this.subTypeList.refresh(null);
    }

    public setSelectedSubType() {
        this.viewMode = 2;
        switch (this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedSubType = this.subTypeList.selectedItem;
                this.subTypeListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.materialDetail.subType = this.subTypeList.selectedItem;
                this.subTypeListModal.hide();
                this.materialDetailModal.show();
                break;
            default:
                break;
        }
    }

    public unselectSubType() {
        this.selectedSubType = null;
        this.refresh();
    }

    public refresh() {
        const params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param('accountIds', AppUtils.getIdsList<Account, number>([ this.selectedAccount ])));
        params.push(new Param('expAccountIds', AppUtils.getIdsList<ExpAccount, number>([ this.selectedExpAccount ])));
        params.push(new Param('assetCategoryIds', AppUtils.getIdsList<AssetCategory, number>([ this.selectedAssetCategory ])));
        params.push(new Param('subCategoryIds', AppUtils.getIdsList<SubCategory, number>([ this.selectedSubCategory ])));
        params.push(new Param('subCategoryENIds', AppUtils.getIdsList<SubCategoryEN, number>([ this.selectedSubCategoryEN ])));
        params.push(new Param('subTypeIds', AppUtils.getIdsList<SubType, number>([ this.selectedSubType ])));
        this.materialList.refresh(params);
    }

    public getFilters(): Array<Param> {
      const params: Array<Param> = new Array<Param>();
      params.push(new Param('filter', this.filter));
      params.push(new Param('accountIds', AppUtils.getIdsList<Account, number>([ this.selectedAccount ])));
      params.push(new Param('expAccountIds', AppUtils.getIdsList<ExpAccount, number>([ this.selectedExpAccount ])));
      params.push(new Param('assetCategoryIds', AppUtils.getIdsList<AssetCategory, number>([ this.selectedAssetCategory ])));
      params.push(new Param('subCategoryIds', AppUtils.getIdsList<SubCategory, number>([ this.selectedSubCategory ])));
      params.push(new Param('subCategoryENIds', AppUtils.getIdsList<SubCategoryEN, number>([ this.selectedSubCategoryEN ])));
      params.push(new Param('subTypeIds', AppUtils.getIdsList<SubType, number>([ this.selectedSubType ])));

      return params;
  }

    public exportToExcel() {
        let params: Array<Param> = null;
        params = this.getFilters();
        this.materialHttpService
            .export(params)
            .subscribe((blob) => {
                fileSaveAs(blob.body, 'produse.xlsx');
            });
    }


    collapsed(event: any): void {
        // console.log(event);
      }
      expanded(event: any): void {
        // console.log(event);
      }
}

