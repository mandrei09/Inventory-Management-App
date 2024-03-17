import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { DictionaryTypeHttpService } from '../../../services/http/administration/dictionary-type.http.service';
import { DictionaryType } from '../../../model/api/administration/dictionary-type';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DictionaryTypeListComponent } from './dictionary-type.list';
import { DictionaryTypeDetailComponent } from './dictionary-type.detail';
import {MatDialog} from '@angular/material/dialog';
import {Article} from '../../../model/api/assets/article';
import {ArticleAddEditComponent} from '../article/article-add-edit/article-add-edit.component';
import {DictionaryTypeAddEditComponent} from './dictionary-type-add-edit/dictionary-type-add-edit.component';
import { saveAs as fileSaveAs } from 'file-saver-es';

@Component({
    selector: 'app-dictionary-type-manage',
    templateUrl: 'dictionary-type.manage.html',
    providers: [ DictionaryTypeHttpService ]
})
export class DictionaryTypeManageComponent extends GenericManage<DictionaryType, number> {

    @ViewChild('dictionaryTypeDetailModal') dictionaryTypeDetailModal: ModalDirective;
    @ViewChild('dictionaryTypeList') dictionaryTypeList: DictionaryTypeListComponent;
    @ViewChild('dictionaryTypeDetail') dictionaryTypeDetail: DictionaryTypeDetailComponent;
    isCollapsed: boolean = true;
    public filter: string = '';

    constructor(public dictionaryTypeHttpService: DictionaryTypeHttpService,
    public dialog: MatDialog) {
        super();
    }

  public onAddNew() {
    this.onAddEditItem();
  }

  public onAddEditItem(item: DictionaryType | null = null) {
    const dialogRef = this.dialog.open(DictionaryTypeAddEditComponent, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { item: item }
    });

    dialogRef.afterClosed().subscribe((item: DictionaryType) => {
      // if (item !== null) this.refresh();
    });
  }

  public onItemEdit(item: DictionaryType) {
    this.onAddEditItem(item);
  }

    public detailInitialize() {
        super.detailInitialize();
        this.dictionaryTypeDetailModal.show();
    }

    public detailTerminate() {
        super.detailTerminate();
        this.dictionaryTypeDetailModal.hide();
    }

    public refresh() {
        const params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));

        this.dictionaryTypeList.refresh(params);
    }

    public getFilters(): Array<Param> {
      const params: Array<Param> = new Array<Param>();
      return params;
  }

    public export() {
      let params: Array<Param> = null;
      params = this.getFilters();
      this.dictionaryTypeHttpService
          .export(params)
          .subscribe((blob) => {
              fileSaveAs(blob.body, 'tip dictionar.xlsx');
      });
  }

    collapsed(event: any): void {
        // console.log(event);
      }

      expanded(event: any): void {
        // console.log(event);
      }
}
