import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Account } from '../../../model/api/administration/account';
import { Accountancy } from '../../../model/api/administration/accountancy';
import { AssetCategory } from '../../../model/api/assets/asset-category';
import { AssetType } from '../../../model/api/assets/asset-type';

import { SubCategory } from '../../../model/api/assets/sub-category';
import { CodeNameEntity } from '../../../model/api/common/code-name-entity';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'app-accountancy-detail',
    templateUrl: 'accountancy.detail.html',
    outputs: ['accountNeeded', 'expAccountNeeded', 'assetTypeNeeded', 'assetCategoryNeeded', 'subCategoryNeeded']
})
export class AccountancyDetailComponent extends GenericDetail<Accountancy, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    public accountNeeded: EventEmitter<void> = new EventEmitter<void>();
    public expAccountNeeded: EventEmitter<void> = new EventEmitter<void>();
    public assetTypeNeeded: EventEmitter<void> = new EventEmitter<void>();
    public assetCategoryNeeded: EventEmitter<void> = new EventEmitter<void>();
    // public interCompanyNeeded: EventEmitter<void> = new EventEmitter<void>();
    public subCategoryNeeded: EventEmitter<void> = new EventEmitter<void>();

    public selectedAccount: CodeNameEntity = null;
    public selectedExpAccount: CodeNameEntity = null;
    public selectedAssetType: CodeNameEntity = null;
    public selectedAssetCategory: CodeNameEntity = null;
    // public selectedInterCompany: CodeNameEntity = null;
    public selectedSubCategory: CodeNameEntity = null;

    setItemDefaultValues() {
        this.item = new Accountancy(0, null, null, null, null, null, 0);
    }

    public resetForm() {
        this.detailForm.reset();
    }

    public saveItem() {
      super.saveItem();
    }

    public set account(account: Account) {
        this.selectedAccount = account;
        this.item.account = account != null ? new CodeNameEntity(account.id, account.code, account.name) : null;
    }

    public askForAccount() {
        this.accountNeeded.emit();
    }

    public set expAccount(expAccount: Account) {
        this.selectedExpAccount = expAccount;
        this.item.expAccount = expAccount != null ? new CodeNameEntity(expAccount.id, expAccount.code, expAccount.name) : null;
    }

    public askForExpAccount() {
        this.expAccountNeeded.emit();
    }

    public set assetType(assetType: AssetType) {
        this.selectedAssetType = assetType;
        this.item.assetType = assetType != null ? new CodeNameEntity(assetType.id, assetType.code, assetType.name) : null;
    }

    public askForAssetType() {
        this.assetTypeNeeded.emit();
    }

    public set assetCategory(assetCategory: AssetCategory) {
        this.selectedAssetCategory = assetCategory;
        this.item.assetCategory = assetCategory != null ? new CodeNameEntity(assetCategory.id, assetCategory.code, assetCategory.name) : null;
    }

    public askForAssetCategory() {
        this.assetCategoryNeeded.emit();
    }


    // public set interCompany(interCompany: InterCompany) {
    //     this.selectedInterCompany = interCompany;
    //     this.item.interCompany = interCompany != null ? new CodeNameEntity(interCompany.id, interCompany.code, interCompany.name) : null;
    // }

    // public askForInterCompany() {
    //     this.interCompanyNeeded.emit();
    // }

    public set subCategory(subCategory: SubCategory) {
        this.selectedSubCategory = subCategory;
        this.item.subCategory = subCategory != null ? new CodeNameEntity(subCategory.id, subCategory.code, subCategory.name) : null;
    }

    public askForSubCategory() {
        this.subCategoryNeeded.emit();
    }

}
