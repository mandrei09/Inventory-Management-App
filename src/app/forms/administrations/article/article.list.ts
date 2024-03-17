
import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';
import { Article } from '../../../model/api/assets/article';

@Component({
    selector: 'article-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class ArticleList extends GenericTableList<Article, number> {
    private listName: string = 'ARTICLES';

    constructor() {
        super('name', 'asc', '');
        this.columns = AppData.ColumnDefinitions[this.listName];
        this.initializeTable();
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listName];
        this.initializeTable();
        super.refresh(filters);
    }
}
