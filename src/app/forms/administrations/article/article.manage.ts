import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Article } from '../../../model/api/assets/article';
import { PagedResult } from '../../../model/common/paged-result';
import { Param } from '../../../model/common/param';
import { ArticleHttpService } from '../../../services/http/administration/article.http.service';
import { GenericManage } from '../../generic/generic.manage';
import {ArticleAddEditComponent} from './article-add-edit/article-add-edit.component';
import {MatDialog} from '@angular/material/dialog';
import { saveAs as fileSaveAs } from 'file-saver-es';


@Component({
    selector: 'article-manage',
    templateUrl: 'article.manage.html',
    providers: []
})
export class ArticleManage extends GenericManage<Article, number> {

     @ViewChild('itemDetailModal') modal: ModalDirective;

    public filter: string = '';
    isCollapsed: boolean = true;

    constructor(public articleHttpService: ArticleHttpService,
    public dialog: MatDialog) {
        super();
    }

  public onAddNew() {
    this.onAddEditItem();
  }

  public onAddEditItem(item: Article | null = null) {
    const dialogRef = this.dialog.open(ArticleAddEditComponent, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { item: item }
    });

    dialogRef.afterClosed().subscribe((item: Article) => {
      // if (item !== null) this.refresh();
    });
  }

  public onItemEdit(item: Article) {
    this.onAddEditItem(item);
  }

     public detailInitialize() {
        this.modal.show();
    }

    public detailTerminate() {
        this.modal.hide();
    }

    public getFilters(): Array<Param> {
      const params: Array<Param> = new Array<Param>();
      return params;
  }

    public export() {
      let params: Array<Param> = null;
      params = this.getFilters();
      this.articleHttpService
          .export(params)
          .subscribe((blob) => {
              fileSaveAs(blob.body, 'tax.xlsx');
      });
  }

    collapsed(event: any): void {
        // console.log(event);
      }

      expanded(event: any): void {
        // console.log(event);
      }
}
