import { Component, EventEmitter } from '@angular/core';
import { GenericDetail } from '../../generic/generic.detail';
import { WFHCheck } from '../../../model/api/wfh/wfh-check';
import { DictionaryItem } from '../../../model/api/administration/dictionary-item';
import { Brand } from '../../../model/api/assets/brand';
import { Model } from '../../../model/api/assets/model';
import { BudgetManager } from '../../../model/api/assets/budget-manager';

@Component({
    selector: 'app-wfh-check-detail',
    templateUrl: 'wfh-check.detail.html',
    outputs: ['dictionaryItemNeeded', 'brandNeeded', 'modelNeeded', 'budgetManagerNeeded']
})
export class WFHCheckDetailComponent extends GenericDetail<WFHCheck, number> {

    public dictionaryItemNeeded: EventEmitter<void> = new EventEmitter<void>();
    public brandNeeded: EventEmitter<void> = new EventEmitter<void>();
    public modelNeeded: EventEmitter<void> = new EventEmitter<void>();
    public budgetManagerNeeded: EventEmitter<void> = new EventEmitter<void>();

    public selectedDictionaryItem: DictionaryItem = null;
    public selectedBrand: Brand = null;
    public selectedModel: Model = null;
    public selectedBudgetManager: BudgetManager;

    public askForDictionaryItem() {
        this.dictionaryItemNeeded.emit();
    }

    public askForBrand() {
        this.brandNeeded.emit();
    }

    public askForModel() {
        this.modelNeeded.emit();
    }

    setItemDefaultValues() {
        this.item = new WFHCheck(0, '', '', '');
    }

    public set dictionaryItem(dictionaryItem: DictionaryItem) {
        this.selectedDictionaryItem = dictionaryItem;
        this.item.dictionaryItemId = dictionaryItem != null ? dictionaryItem.id : null;
    }

    public set brand(brand: Brand) {
        this.selectedBrand = brand;
        this.item.brandId = brand != null ? brand.id : null;
    }

    public set model(model: Model) {
        this.selectedModel = model;
        this.item.modelId = model != null ? model.id : null;
    }

    public set budgetManager(budgetManager: BudgetManager) {
      this.setBudgetManager(budgetManager);
  }

    public setDictionaryItem(dictionaryItem: DictionaryItem) {
        this.selectedDictionaryItem = dictionaryItem;
        this.item.dictionaryItemId = dictionaryItem != null ? dictionaryItem.id : null;
    }

    public setBrand(brand: Brand) {
        this.selectedBrand = brand;
        this.item.brandId = brand != null ? brand.id : null;
    }

    public setModel(model: Model) {
        this.selectedModel = model;
        this.item.modelId = model != null ? model.id : null;
    }



    public setBudgetManager(budgetManager: BudgetManager) {
        this.selectedBudgetManager = budgetManager;
        this.item.budgetManagerId = budgetManager != null ? budgetManager.id : null;
    }

    public askForBudgetManager() {
        this.budgetManagerNeeded.emit();
    }


    public saveItem() {
        if (this.selectedDictionaryItem == null && this.selectedBrand != null && this.selectedModel != null && this.selectedBudgetManager != null) {
            alert('Sunt obligatoriu!');
        }
        else {
            super.saveItem();
        }

        // super.saveItem();
    }
}
