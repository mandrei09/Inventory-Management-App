import { FormArray, FormBuilder } from "@angular/forms";

const fb = new FormBuilder();

export const formObj = {
    myForm: fb.group({
        name: [''],
        stores: new FormArray([])
    }),

    get stores() {
        return this.myForm.get('stores');
    },

    addStore: function() {
        this.stores.push(fb.group({
            storeName: [''],
            purchase: new FormArray([])
        }));

        console.log('A store has been added.');
    },

    removeStore: function(i: number) {
        this.stores.removeAt(i);
    },

    addPurchase: function(p : FormArray) {
        p.push(fb.group({
            item: [''],
            price: [0]
        }));
    },
    removePurchase: function(p: FormArray, i: number) {
        p.removeAt(i);
    },

    sumUpStorePurchases(purchases: FormArray) {
        if (purchases.controls.length > 0) {
            return purchases.controls.map(x => parseInt(x.get('price').value)).reduce((a, b) => a + b);
        } else {
            return 0;
        }
    },

    sumUpPurchases() {
        if (this.stores.controls.length > 0) {
            return this.stores.controls.map(x => this.sumUpStorePurchases(x.get('purchases'))).reduce((a, b) => a + b);
        } else {
            return 0;
        }
    },

    overBudget(budget: number = 100): boolean {
        return this.sumUpPurchases() > budget;
    },

    formIsValid(): boolean {
        return (this.myForm.valid) && (!this.overBudget());
    }
};