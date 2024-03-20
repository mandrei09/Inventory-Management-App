import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppConfig } from '../../../config';
import { Account } from '../../../model/api/administration/account';
import { ExpAccount } from '../../../model/api/administration/exp-account';
import { Material } from '../../../model/api/administration/material';
import { SubType } from '../../../model/api/administration/sub-type';
import { AssetCategory } from '../../../model/api/assets/asset-category';
import { CodeNameEntity } from '../../../model/api/common/code-name-entity';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'app-material-detail',
    templateUrl: 'material.detail.html',
    outputs: ['accountNeeded', 
    'expAccountNeeded', 
    'assetCategoryNeeded', 
    'subCategoryNeeded', 
    'subCategoryENNeeded', 
    'subTypeNeeded']
})
export class MaterialDetailComponent extends GenericDetail<Material, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    public accountNeeded: EventEmitter<void> = new EventEmitter<void>();
    public expAccountNeeded: EventEmitter<void> = new EventEmitter<void>();
    public assetCategoryNeeded: EventEmitter<void> = new EventEmitter<void>();
    public subCategoryNeeded: EventEmitter<void> = new EventEmitter<void>();
    public subCategoryENNeeded: EventEmitter<void> = new EventEmitter<void>();
    public subTypeNeeded: EventEmitter<void> = new EventEmitter<void>();

    public selectedAccount: Account = null;
    public selectedExpAccount: ExpAccount = null;
    public selectedAssetCategory: AssetCategory = null;
    
    //public selectedSubCategoryEN: SubCategoryEN = null;
    public selectedSubType: SubType = null;

    setItemDefaultValues() {
        this.item = new Material(0, '', '', null, null, null, null, null, null, 0, 0, '', '');
    }

    public resetForm() {
        this.detailForm.reset();
    }

    // public saveItem() {
    //     if (this.selectedSubCategory == null) {
    //         alert('SubCategoria este obligatorie!');
    //     } else {
    //         super.saveItem();
    //     }
    // }

    public set account(account: Account) {
        this.selectedAccount = account;
        this.item.account = account != null ? new CodeNameEntity(account.id, account.code, account.name) : null;
    }

    public askForAccount() {
        this.accountNeeded.emit();
    }

    public setAccount(account: Account) {
        this.selectedAccount = account;
        this.item.account = account != null ? account : null;
    }

    public set expAccount(expAcount: ExpAccount) {
        this.selectedExpAccount = expAcount;
        this.item.expAccount = expAcount != null ? new CodeNameEntity(expAcount.id, expAcount.code, expAcount.name) : null;
    }

    public askForExpAccount() {
        this.expAccountNeeded.emit();
    }

    public setExpAccount(expAcount: ExpAccount) {
        this.selectedExpAccount = expAcount;
        this.item.expAccount = expAcount != null ? expAcount : null;
    }

    public set assetCategory(assetCategory: AssetCategory) {
        this.selectedAssetCategory = assetCategory;
        this.item.assetCategory = assetCategory != null ? new CodeNameEntity(assetCategory.id, assetCategory.code, assetCategory.name) : null;
    }

    // public askForAssetCategory() {
    //     this.assetCategoryNeeded.emit();
    // }

    // public setAssetCategory(assetCategory: AssetCategory) {
    //     this.selectedAssetCategory = assetCategory;
    //     this.item.assetCategory = assetCategory != null ? assetCategory : null;
    // }

    // public set subCategory(subCategory: SubCategory) {
    //     this.selectedSubCategory = subCategory;
    //     this.item.subCategory = subCategory != null ? new CodeNameEntity(subCategory.id, subCategory.code, subCategory.name) : null;
    // }

    // public askForSubCategory() {
    //     this.subCategoryNeeded.emit();
    // }

    // public setSubCategory(subCategory: SubCategory) {
    //     this.selectedSubCategory = subCategory;
    //     this.item.subCategory = subCategory != null ? subCategory : null;
    // }

    // public set subCategoryEN(subCategoryEN: SubCategoryEN) {
    //     this.selectedSubCategoryEN = subCategoryEN;
    //     this.item.subCategoryEN = subCategoryEN != null ? new CodeNameEntity(subCategoryEN.id, subCategoryEN.code, subCategoryEN.name) : null;
    // }

    // public askForSubCategoryEN() {
    //     this.subCategoryENNeeded.emit();
    // }

    // public setSubCategoryEN(subCategoryEN: SubCategoryEN) {
    //     this.selectedSubCategoryEN = subCategoryEN;
    //     this.item.subCategoryEN = subCategoryEN != null ? subCategoryEN : null;
    // }

    public set subType(subType: SubType) {
        this.selectedSubType = subType;
        this.item.subType = subType != null ? new CodeNameEntity(subType.id, subType.code, subType.name) : null;
    }

    public askForSubType() {
        this.subTypeNeeded.emit();
    }

    public setSubType(subType: SubType) {
        this.selectedSubType = subType;
        this.item.subType = subType != null ? subType : null;
    }
}