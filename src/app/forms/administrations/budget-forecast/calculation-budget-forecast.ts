import { Component, OnInit } from '@angular/core';
import { formObj } from './model';

@Component({
    selector: 'app-form-class',
    templateUrl: './calculation-budget-forecast.html',
    styleUrls: ['./calculation-budget-forecast.scss']
})

export class FormClassComponent implements OnInit {
    formObj = formObj;

    constructor() {
    }
    ngOnInit(): void {
    }

    onSubmit() {
        console.log(this.formObj.myForm.value);
        console.log('Form submitted!');
    }

}