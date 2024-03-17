import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { GenericManage } from '../../generic/generic.manage';
import { MasterType } from '../../../model/api/assets/master-type';
import { MasterTypeHttpService } from '../../../services/http/assets/master-type.http.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { saveAs as fileSaveAs } from 'file-saver-es';

@Component({
    selector: 'app-master-type-manage',
    templateUrl: 'master-type.manage.html',
    providers: [ MasterTypeHttpService ]
})
export class MasterTypeManageComponent extends GenericManage<MasterType, number> {

    @ViewChild('itemDetailModal') modal: ModalDirective;

    public filter: string = '';

    constructor(public masterTypeHttpService: MasterTypeHttpService) {
        super();
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
      this.masterTypeHttpService
          .export(params)
          .subscribe((blob) => {
              fileSaveAs(blob.body, 'tax.xlsx');
      });
  }
}
