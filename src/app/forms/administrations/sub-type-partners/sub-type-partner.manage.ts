import { TranslateService } from '@ngx-translate/core';
import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { AppUtils } from "app/common/app.utils";
import { saveAs as fileSaveAs } from 'file-saver-es';
import { SubTypeHttpService } from 'app/services/http/administration/sub-type.http.service';
import { PartnerHttpService } from 'app/services/http/documents/partner.http.service';
import { SubTypePartner } from 'app/model/api/administration/sub-type-partner';
import { SubTypePartnerList } from './sub-type-partner.list';
import { SubTypePartnerDetail } from './sub-type-partner.detail';
import { Partner } from 'app/model/api/documents/partner';
import { PartnerList } from 'app/forms/documents/partners/partner.list';
import { SubTypeList } from '../sub-types/sub-type.list';
import { SubType } from 'app/model/api/administration/sub-type';
import { SubTypePartnerHttpService } from 'app/services/http/administration/sub-type-partner.http.service';

@Component({
    selector: 'sub-type-partner-manage',
    templateUrl: 'sub-type-partner.manage.html',
    styleUrls: ['sub-type-partner.manage.scss'],
    providers: [ SubTypeHttpService, PartnerHttpService, SubTypePartnerHttpService ]
})
export class SubTypePartnerManage extends GenericManage<SubTypePartner, number> {

    @ViewChild('subTypePartnerDetailModal') subTypePartnerDetailModal: ModalDirective;
    @ViewChild('subTypePartnerList') subTypePartnerList: SubTypePartnerList;
    @ViewChild('subTypePartnerDetail') subTypePartnerDetail: SubTypePartnerDetail;
    @ViewChild('partnerListModal') partnerListModal: ModalDirective;
    @ViewChild('partnerList') partnerList: PartnerList;
    @ViewChild('subTypeListModal') subTypeListModal: ModalDirective;
    @ViewChild('subTypeList') subTypeList: SubTypeList;

    private filter: string = '';
    private selectedPartner: Partner = null;
    private selectedSubType: SubType = null;

    constructor(
        private subTypeHttpService: SubTypeHttpService,
        private subTypePartnerHttpService: SubTypePartnerHttpService,
        private partnerHttpService: PartnerHttpService,
        private translate: TranslateService) {
        super();
    }

    protected addNewItem() {
        super.addNewItem();

        this.subTypePartnerDetail.partner = null;
        this.subTypePartnerDetail.subType = null;
    }

    protected editItem() {
        super.editItem();

        let subTypePartner: SubTypePartner = this.selectedItem as SubTypePartner;

        this.subTypePartnerDetail.partner = null;

        if ((subTypePartner != null) && (subTypePartner.partnerId != null)) {
            this.partnerHttpService
                .getById(subTypePartner.partnerId)
                .subscribe((partner: Partner) => {
                    this.subTypePartnerDetail.partner = partner;
                });
        }

        this.subTypePartnerDetail.subType = null;

        if ((subTypePartner != null) && (subTypePartner.subTypeId != null)) {
            this.subTypeHttpService
                .getById(subTypePartner.subTypeId)
                .subscribe((subType: SubType) => {
                    this.subTypePartnerDetail.subType = subType;
                });
        }
    }

    protected detailInitialize() {
        super.detailInitialize();
        this.subTypePartnerDetailModal.show();
    }

    protected detailTerminate() {
        super.detailTerminate();
        this.subTypePartnerDetailModal.hide();
    }

    private onSubTypePartnerDetailPartnerNeeded() {
        this.subTypePartnerDetailModal.hide();
        this.selectPartner();
    }

    private onPartnerListCancel() {
        this.partnerListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.subTypePartnerDetailModal.show();
        }
    }


    private onSubTypePartnerDetailSubTypeNeeded() {
      this.subTypePartnerDetailModal.hide();
      this.selectSubType();
  }

  private onSubTypeListCancel() {
      this.subTypeListModal.hide();
      if (this.viewMode === GenericManageViewMode.ItemDetail) {
          this.subTypePartnerDetailModal.show();
      }
  }



    private refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param("partnerIds", AppUtils.getIdsList<Partner, number>([ this.selectedPartner ])));

        this.subTypePartnerList.refresh(params);
    }

    private selectPartner() {
        this.partnerListModal.show();
        this.partnerList.refresh(null);
    }

    private setSelectedPartner() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedPartner = this.partnerList.selectedItem;
                this.partnerListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.subTypePartnerDetail.partner = this.partnerList.selectedItem;
                this.partnerListModal.hide();
                this.subTypePartnerDetailModal.show();
                break;
            default:
                break;
        }
    }

    private unselectPartner() {
        this.selectedPartner = null;
        this.refresh();
    }


    private selectSubType() {
      this.subTypeListModal.show();
      this.subTypeList.refresh(null);
  }

  private setSelectedSubType() {
      switch(this.viewMode) {
          case GenericManageViewMode.ItemList:
              this.selectedSubType = this.subTypeList.selectedItem;
              this.subTypeListModal.hide();
              this.refresh();
              break;
          case GenericManageViewMode.ItemDetail:
              this.subTypePartnerDetail.subType = this.subTypeList.selectedItem;
              this.subTypeListModal.hide();
              this.subTypePartnerDetailModal.show();
              break;
          default:
              break;
      }
  }

  private unselectSubType() {
      this.selectedSubType = null;
      this.refresh();
  }


    // private exportToExcel(){

    //      let params: Array<Param> = null;

    //     if ((this.filter != null) && (this.filter.length > 0)) {
    //         params = new Array<Param>();
    //         params.push(new Param('filter', this.filter));
    //     }

    //     this.locationHttpService.get(1, 10000000, 'code', 'asc', params, null).subscribe(
    //         (data: PagedResult<Location>) => {

    //             let options = {
    //                 sheetid: 'Buildings',
    //                 headers: true,
    //                 column: { style: { Font: { Bold: '1' } } },
    //                 rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
    //                 cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
    //             };

    //             alasql(`SELECT id as [Id],
    //                 code as [Cod],
    //                 name as [Denumire],
    //                 region->name as [Judet],
    //                 admCenter->name as [Regiune]
    //                 INTO XLSX("Buildings.xlsx",?) FROM ?`, [ options, data.items ]);

    //         });

    // }

    private getFilters(): Array<Param> {
        let params: Array<Param> = new Array<Param>();
        params.push(new Param('filter', this.filter));
        params.push(new Param('partnerIds', AppUtils.getIdsList<Partner, number>([this.selectedPartner])));

        return params;
    }

    private exportToExcel() {

        let params: Array<Param> = null;

        params = this.getFilters();
        this.subTypeHttpService
            .export(params)
            .subscribe((blob) => {
                fileSaveAs(blob, 'SubTypes.xlsx');
            });
    }
}
