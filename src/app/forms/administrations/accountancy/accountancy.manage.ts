import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, ViewChild } from '@angular/core';
import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { EmployeeCostCenter } from '../../../model/api/administration/employee-cost-center';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AppUtils } from '../../../common/app.utils';
import { AccountancyHttpService } from '../../../services/http/administration/accountancy.http.service';
import { AccountHttpService } from '../../../services/http/administration/account.http.service';
import { ExpAccountHttpService } from '../../../services/http/administration/exp-account.http.service';
import { AssetTypeHttpService } from '../../../services/http/assets/asset-type.http.service';
import { AssetCategoryHttpService } from '../../../services/http/assets/asset-category.http.service';
import { Accountancy } from '../../../model/api/administration/accountancy';
import { AccountancyListComponent } from './accountancy.list';
import { AccountList } from '../account/account.list';
import { ExpAccountList } from '../exp-account/exp-account.list';
import { AssetTypeListComponent } from '../../assets/asset-types/asset-type.list';
import { AssetCategoryListComponent } from '../../assets/asset-categories/asset-category.list';
import { Account } from '../../../model/api/administration/account';
import { ExpAccount } from '../../../model/api/administration/exp-account';
import { AssetType } from '../../../model/api/assets/asset-type';
import { AssetCategory } from '../../../model/api/assets/asset-category';

import { AccountancyDetailComponent } from './accountancy.detail';
import { SubCategoryHttpService } from '../../../services/http/assets/sub-category.http.service';
import { SubCategoryListComponent } from '../../assets/sub-categories/sub-category.list';
import { SubCategory } from '../../../model/api/assets/sub-category';
import {AccountancyAddEditComponent} from './accountancy-add-edit/accountancy-add-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { saveAs as fileSaveAs } from 'file-saver-es';


@Component({
    selector: 'app-accountancy-manage',
    templateUrl: 'accountancy.manage.html',
    styleUrls: ['accountancy.manage.scss'],
    providers: [ AccountancyHttpService, AccountHttpService, ExpAccountHttpService, AssetTypeHttpService, AssetCategoryHttpService, SubCategoryHttpService ]
})
export class AccountancyManageComponent extends GenericManage<Accountancy, number> {

    @ViewChild('accountancyDetailModal') public accountancyDetailModal: ModalDirective;
    @ViewChild('accountancyDetail') public accountancyDetail: AccountancyDetailComponent;
    @ViewChild('accountancyList') accountancyList: AccountancyListComponent;
    @ViewChild('accountListModal') accountListModal: ModalDirective;
    @ViewChild('accountList') accountList: AccountList;
    @ViewChild('expAccountListModal') expAccountListModal: ModalDirective;
    @ViewChild('expAccountList') expAccountList: ExpAccountList;
    @ViewChild('assetTypeListModal') assetTypeListModal: ModalDirective;
    @ViewChild('assetTypeList') assetTypeList: AssetTypeListComponent;
    @ViewChild('assetCategoryListModal') assetCategoryListModal: ModalDirective;
    @ViewChild('assetCategoryList') assetCategoryList: AssetCategoryListComponent;

    // @ViewChild('interCompanyListModal') interCompanyListModal: ModalDirective;
    // @ViewChild('interCompanyList') interCompanyList: InterCompanyListComponent;


    @ViewChild('subCategoryListModal') subCategoryListModal: ModalDirective;
    @ViewChild('subCategoryList') subCategoryList: SubCategoryListComponent;

    public filter: string = '';
    public selectedAccount: Account = null;
    public selectedExpAccount: ExpAccount = null;
    public selectedAssetType: AssetType = null;
    public selectedAssetCategory: AssetCategory = null;
    // public selectedInterCompany: InterCompany = null;
    public selectedSubCategory: SubCategory = null;
    isCollapsed: boolean = true;
    public selectedAccountancy: any;

    constructor(public dialog: MatDialog, public accountHttpService: AccountHttpService,
      public accountancyHttpService: AccountancyHttpService,
      public expAccountHttpService: ExpAccountHttpService,
      public assetTypeHttpService: AssetTypeHttpService,
      public assetCategoryHttpService: AssetCategoryHttpService,
      // 
      public subCategoryHttpService: SubCategoryHttpService
      ) {

        super();
    }

    ngAfterViewInit () {
        this.refresh();
    }

    public onAddNew() {
      this.onAddEditItem();
    }

    public onItemEdit(item: Accountancy) {
      this.onAddEditItem(item);
    }

    public onAddEditItem(item: Accountancy | null = null) {
      let dialogRef = this.dialog.open(AccountancyAddEditComponent, {
        panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
        data: { item: item }
      });

      dialogRef.afterClosed().subscribe((item: Accountancy) => {
        if (item !== null) this.refresh();
      });
    }

    // public addNewItem() {
    //     super.addNewItem();
    //
    //     this.accountancyDetail.account = null;
    //     this.accountancyDetail.expAccount = null;
    //     this.accountancyDetail.assetType = null;
    //     this.accountancyDetail.assetCategory = null;
    //     // this.accountancyDetail.interCompany = null;
    //     this.accountancyDetail.subCategory = null;
    // }
    //
    // public editItem() {
    //     super.editItem();
    //
    //     const accountancy: Accountancy = this.selectedItem as Accountancy;
    //
    //     this.accountancyDetail.account = null;
    //
    //     if ((accountancy != null) && (accountancy.account != null)) {
    //         this.accountHttpService
    //             .getById(accountancy.account.id)
    //             .subscribe((account: Account) => {
    //                 this.accountancyDetail.account = account;
    //             });
    //     }
    //
    //     this.accountancyDetail.expAccount = null;
    //
    //     if ((accountancy != null) && (accountancy.expAccount != null)) {
    //         this.expAccountHttpService
    //             .getById(accountancy.expAccount.id)
    //             .subscribe((expAccount: ExpAccount) => {
    //                 this.accountancyDetail.expAccount = expAccount;
    //             });
    //     }
    //
    //     this.accountancyDetail.assetType = null;
    //
    //     if ((accountancy != null) && (accountancy.assetType != null)) {
    //         this.assetTypeHttpService
    //             .getById(accountancy.assetType.id)
    //             .subscribe((assetType: AssetType) => {
    //                 this.accountancyDetail.assetType = assetType;
    //             });
    //     }
    //
    //     this.accountancyDetail.assetCategory = null;
    //
    //     if ((accountancy != null) && (accountancy.assetCategory != null)) {
    //         this.assetCategoryHttpService
    //             .getById(accountancy.assetCategory.id)
    //             .subscribe((assetCategory: AssetCategory) => {
    //                 this.accountancyDetail.assetCategory = assetCategory;
    //             });
    //     }
    //
    //     // this.accountancyDetail.interCompany = null;
    //
    //     // if ((accountancy != null) && (accountancy.interCompany != null)) {
    //     //     this.interCompanyHttpService
    //     //         .getById(accountancy.interCompany.id)
    //     //         .subscribe((interCompany: InterCompany) => {
    //     //             this.accountancyDetail.interCompany = interCompany;
    //     //         });
    //     // }
    //
    //     this.accountancyDetail.subCategory = null;
    //
    //     if ((accountancy != null) && (accountancy.subCategory != null)) {
    //         this.subCategoryHttpService
    //             .getById(accountancy.subCategory.id)
    //             .subscribe((subCategory: SubCategory) => {
    //                 this.accountancyDetail.subCategory = subCategory;
    //             });
    //     }
    // }

    public detailInitialize() {
        super.detailInitialize();
        this.accountancyDetailModal.show();
    }

    public detailTerminate() {
        super.detailTerminate();
        this.accountancyDetailModal.hide();
    }

    public onAccountancyDetailAccountNeeded() {
        this.accountancyDetailModal.hide();
        this.selectAccount();
    }

    public onAccountancyDetailExpAccountNeeded() {
        this.accountancyDetailModal.hide();
        this.selectExpAccount();
    }

    public onAccountancyDetailAssetTypeNeeded() {
        this.accountancyDetailModal.hide();
        this.selectAssetType();
    }

    public onAccountancyDetailAssetCategoryNeeded() {
        this.accountancyDetailModal.hide();
        this.selectAssetCategory();
    }

    // public onAccountancyDetailInterCompanyNeeded() {
    //     this.accountancyDetailModal.hide();
    //     this.selectInterCompany();
    // }

    public onAccountancyDetailSubCategoryNeeded() {
        this.accountancyDetailModal.hide();
        this.selectSubCategory();
    }

    public onAccountListCancel() {
        this.accountListModal.hide();
    }

    public onExpAccountListCancel() {
        this.expAccountListModal.hide();
    }

    public onAssetTypeListCancel() {
        this.assetTypeListModal.hide();
    }

    public onAssetCategoryListCancel() {
        this.assetCategoryListModal.hide();
    }

    // public onInterCompanyListCancel() {
    //     this.interCompanyListModal.hide();
    // }

    public onSubCategoryListCancel() {
        this.subCategoryListModal.hide();
    }

    public refresh() {
        const params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        this.accountancyList.refresh(params);
    }

    public selectAccount() {

        this.accountListModal.show();
        this.accountList.refresh(null);
    }

    public selectExpAccount() {

        this.expAccountListModal.show();
        this.expAccountList.refresh(null);
    }

    public selectAssetType() {
        this.assetTypeListModal.show();
        this.assetTypeList.refresh(null);
    }

    public selectAssetCategory() {
        this.assetCategoryListModal.show();
        this.assetCategoryList.refresh(null);
    }

    // public selectInterCompany() {
    //     this.interCompanyListModal.show();
    //     this.interCompanyList.refresh(null);
    // }

    public selectSubCategory() {
        this.subCategoryListModal.show();
        this.subCategoryList.refresh(null);
    }

    public setSelectedAccount() {
        switch (this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedAccount = this.accountList.selectedItem;
                this.accountListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.accountancyDetail.account = this.accountList.selectedItem;
                this.accountListModal.hide();
                this.accountancyDetailModal.show();
                break;
            default:
                break;
        }
    }

    public setSelectedExpAccount() {
        switch (this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedExpAccount = this.expAccountList.selectedItem;
                this.expAccountListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.accountancyDetail.expAccount = this.expAccountList.selectedItem;
                this.expAccountListModal.hide();
                this.accountancyDetailModal.show();
                break;
            default:
                break;
        }
    }

    public setSelectedAssetType() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedAssetType = this.assetTypeList.selectedItem;
                this.assetTypeListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.accountancyDetail.assetType = this.assetTypeList.selectedItem;
                this.assetTypeListModal.hide();
                this.accountancyDetailModal.show();
                break;
            default:
                break;
        }
    }

    public setSelectedAssetCategory() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedAssetCategory = this.assetCategoryList.selectedItem;
                this.assetCategoryListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.accountancyDetail.assetCategory = this.assetCategoryList.selectedItem;
                this.assetCategoryListModal.hide();
                this.accountancyDetailModal.show();
                break;
            default:
                break;
        }
    }

    // public setSelectedInterCompany() {
    //     switch(this.viewMode) {
    //         case GenericManageViewMode.ItemList:
    //             this.selectedInterCompany = this.interCompanyList.selectedItem;
    //             this.interCompanyListModal.hide();
    //             this.refresh();
    //             break;
    //         case GenericManageViewMode.ItemDetail:
    //             this.accountancyDetail.interCompany = this.interCompanyList.selectedItem;
    //             this.interCompanyListModal.hide();
    //             this.accountancyDetailModal.show();
    //             break;
    //         default:
    //             break;
    //     }
    // }

    public setSelectedSubCategory() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedSubCategory = this.subCategoryList.selectedItem;
                this.subCategoryListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.accountancyDetail.subCategory = this.subCategoryList.selectedItem;
                this.subCategoryListModal.hide();
                this.accountancyDetailModal.show();
                break;
            default:
                break;
        }
    }

    public unselectAccount() {
        this.selectedAccount = null;
        this.refresh();
    }

    public unselectExpAccount() {
        this.selectedExpAccount = null;
        this.refresh();
    }

    public unselectAssetType() {
        this.selectedAssetType = null;
        this.refresh();
    }

    public unselectAssetCategory() {
        this.selectedAssetCategory = null;
        this.refresh();
    }

    // public unselectInterCompany() {
    //     this.selectedInterCompany = null;
    //     this.refresh();
    // }

    public unselectSubCategory() {
        this.selectedSubCategory = null;
        this.refresh();
    }

    public getFilters(): Array<Param> {
      const params: Array<Param> = new Array<Param>();
      params.push(new Param('filter', this.filter));


      return params;
  }


    public export() {

      let params: Array<Param> = null;

      params = this.getFilters();
      this.accountancyHttpService
          .export(params)
          .subscribe((blob) => {
              fileSaveAs(blob.body, 'mapari G.L..xlsx');
          });
  }

    collapsed(event: any): void {
        // console.log(event);
      }

      expanded(event: any): void {
        // console.log(event);
      }
}
