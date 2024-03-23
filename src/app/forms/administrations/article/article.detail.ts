import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Article } from '../../../model/api/assets/article';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'article-detail',
    templateUrl: 'article.detail.html'
})
export class ArticleDetail extends GenericDetail<Article, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    // setItemDefaultValues() {
    //     this.item = new Account();
    // }

    public resetForm() {
        this.detailForm.reset();
    }
}