import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AppUtils } from '../../../common/app.utils';
import { ProjectTypeDivisionHttpService } from '../../../services/http/administration/project-type-division.http.service';
import { ProjectTypeHttpService } from '../../../services/http/assets/project-type.http.service';
import { ProjectTypeDivision } from '../../../model/api/administration/project-type-division';
import { ProjectTypeDivisionListComponent } from './project-type-division.list';
import { ProjectTypeListComponent } from '../../assets/project-types/project-type.list';
import { ProjectType } from '../../../model/api/assets/project-type';
import { DivisionListComponent } from '../divisions/division.list';
import { DivisionHttpService } from '../../../services/http/administration/division.http.service';
import { Division } from '../../../model/api/administration/division';
import { ProjectTypeDivisionDetailComponent } from './project-type-division.detail';
import {ProjectTypeDivisionAddEditComponent} from './project-type-division-add-edit/project-type-division-add-edit.component';
import {MatDialog} from '@angular/material/dialog';
import { saveAs as fileSaveAs } from 'file-saver-es';
import {DialogService} from '../../../services/dialog.service';
import {NotificationService} from '../../../services/notification.service';

@Component({
    selector: 'app-project-type-division-manage',
    templateUrl: 'project-type-division.manage.html',
    styleUrls: ['project-type-division.manage.scss'],
    providers: [ ProjectTypeDivisionHttpService, ProjectTypeHttpService, DivisionHttpService ]
})
export class ProjectTypeDivisionManageComponent extends GenericManage<ProjectTypeDivision, number> implements AfterViewInit {

    @ViewChild('projectTypeDivisionList') projectTypeDivisionList: ProjectTypeDivisionListComponent;
    @ViewChild('projectTypeListModal') projectTypeListModal: ModalDirective;
    @ViewChild('projectTypeList') projectTypeList: ProjectTypeListComponent;
    @ViewChild('divisionListModal') divisionListModal: ModalDirective;
    @ViewChild('divisionList') divisionList: DivisionListComponent;

    @ViewChild('projectTypeDivisionDetailModal') projectTypeDivisionDetailModal: ModalDirective;
    @ViewChild('projectTypeDivisionDetail') public projectTypeDivisionDetail: ProjectTypeDivisionDetailComponent;

    public filter: string = '';
    public selectedProjectType: ProjectType = null;
    public selectedDivision: Division = null;
    isCollapsed: boolean = true;
    showExportBtn = true;

    constructor(public dialog: MatDialog, public projectTypeHttpService: ProjectTypeHttpService,
      public divisionHttpService: DivisionHttpService,
      public projectTypeDivisionHttpService: ProjectTypeDivisionHttpService,
      private dialogService: DialogService,
      private notifyService: NotificationService,
    ) {

        super();
    }

    ngAfterViewInit () {
        this.refresh();
    }

    public onAddNew() {
      this.onAddEditItem();
    }

    public onItemEdit(item: ProjectTypeDivision) {
      this.onAddEditItem(item);
    }

    public onAddEditItem(item: ProjectTypeDivision | null = null) {
      let dialogRef = this.dialog.open(ProjectTypeDivisionAddEditComponent, {
        panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
        data: { item: item }
      });

      dialogRef.afterClosed().subscribe((item: ProjectTypeDivision) => {
        if (item !== null) this.refresh();
      });
    }
    //
    // public editItem() {
    //     super.editItem();
    //
    //     const projectTypeDivision: ProjectTypeDivision = this.selectedItem as ProjectTypeDivision;
    //
    //     this.projectTypeDivisionDetail.projectType = null;
    //     if ((projectTypeDivision != null) && (projectTypeDivision.projectType != null) && (projectTypeDivision.projectType.id)) {
    //         this.projectTypeHttpService
    //             .getById(projectTypeDivision.projectType.id)
    //             .subscribe((projectType: ProjectType) => {
    //                 this.projectTypeDivisionDetail.projectType = projectType;
    //             });
    //     }
    //
    //     this.projectTypeDivisionDetail.division = null;
    //     if ((projectTypeDivision != null) && (projectTypeDivision.division != null) && (projectTypeDivision.division.id)) {
    //         this.divisionHttpService
    //             .getById(projectTypeDivision.division.id)
    //             .subscribe((division: Division) => {
    //                 this.projectTypeDivisionDetail.division = division;
    //             });
    //     }
    // }

    public detailInitialize() {
        super.detailInitialize();
        this.projectTypeDivisionDetailModal.show();
    }

    public detailTerminate() {
        super.detailTerminate();
        this.projectTypeDivisionDetailModal.hide();
    }

    public onProjectTypeListCancel() {
        this.projectTypeListModal.hide();
    }

    public onDivisionListCancel() {
        this.divisionListModal.hide();
    }

    public refresh() {
        const params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param('projectTypeIds', AppUtils.getIdsList<ProjectType, number>([ this.selectedProjectType ])));
        params.push(new Param('divisionIds', AppUtils.getIdsList<Division, number>([ this.selectedDivision ])));
        this.projectTypeDivisionList.refresh(params);
    }

    public selectProjectType() {

        this.projectTypeListModal.show();
        this.projectTypeList.refresh(null);
    }

    public selectDivision() {
        this.divisionListModal.show();
        this.divisionList.refresh(null);
    }

    public setSelectedProjectType() {
        switch (this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedProjectType = this.projectTypeList.selectedItem;
                this.projectTypeListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.projectTypeDivisionDetail.projectType = this.projectTypeList.selectedItem;
                this.projectTypeListModal.hide();
                this.projectTypeDivisionDetailModal.show();
                break;
            default:
                break;
        }
    }

    public setSelectedDivision() {
        switch (this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedDivision = this.divisionList.selectedItem;
                this.divisionListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.projectTypeDivisionDetail.division = this.divisionList.selectedItem;
                this.divisionListModal.hide();
                this.projectTypeDivisionDetailModal.show();
                break;
            default:
                break;
        }
    }

    public unselectProjectType() {
        this.selectedProjectType = null;
        this.refresh();
    }

    public unselectDivision() {
        this.selectedDivision = null;
        this.refresh();
    }

    public onProjectTypeDivisionDetailProjectTypeNeeded() {
        this.projectTypeDivisionDetailModal.hide();
        this.selectProjectType();
    }

    public onProjectTypeDivisionDetailDivisionNeeded() {
        this.projectTypeDivisionDetailModal.hide();
        this.selectDivision();
    }

    public getFilters(): Array<Param> {
      const params: Array<Param> = new Array<Param>();
      params.push(new Param('filter', this.filter));

      return params;
  }


    public export() {
      this.showExportBtn = false;
      let params: Array<Param> = null;

      params = this.getFilters();
      this.projectTypeDivisionHttpService.export(params).subscribe((blob) => {
        fileSaveAs(blob.body, 'Export.xlsx');
        this.showExportBtn = true;
      });
    }

    collapsed(event: any): void {
        // console.log(event);
      }
      expanded(event: any): void {
        // console.log(event);
      }

      public onItemDelete(item: ProjectTypeDivision) {
        this.dialogService
          .confirmDialog({
            title: 'Stergere Proiect',
            message: 'Confirmati stergerea liniei selectate?',
            confirmCaption: 'Da',
            cancelCaption: 'Nu',
          })
          .subscribe((confirmed) => {
            if (confirmed) {
              this.deleteItem(item);
              this.notifyService.showSuccess("Linia selectata a fost stearsa cu succes!", 'Stergere proiect', 3000, false, 0);
            }
          });
      }
    
      public deleteItem(item: ProjectTypeDivision) {
        this.projectTypeDivisionHttpService.delete(item.id).subscribe(() => {
          this.refresh();
        });
      }
}
