import { AccMonthHttpService } from "./../../services/http/accounting/acc-month.http.service";
import { Component, EventEmitter, ViewChild } from "@angular/core";
import { GenericManage } from "../generic/generic.manage";
import { AccMonth } from "../../model/api/accounting/acc-month";
import { ModalDirective } from "ngx-bootstrap/modal";
import { AccMonthAddEditComponent } from "./acc-month-add-edit/acc-month-add-edit.component";
import { MatDialog } from "@angular/material/dialog";
import { CityListComponent } from "../administrations/cities/city.list";
import { Param } from "../../model/common/param";
import { saveAs as fileSaveAs } from "file-saver-es";
import { AccMonthListComponent } from "./acc-month.list";
import { NotificationService } from "../../services/notification.service";

@Component({
  selector: "app-acc-month-manage",
  templateUrl: "acc-month.manage.html",
  providers: [AccMonthHttpService],
})
export class AccMonthManageComponent extends GenericManage<AccMonth, number> {

  public TRANSLOCO = 'page_matrix_acc_month_component'

  @ViewChild("itemDetailModal") modal: ModalDirective;
  @ViewChild("accMonthList") accMonthList: AccMonthListComponent;

  public filter: string = "";
  isCollapsed: boolean = true;

  constructor(
    public dialog: MatDialog,
    public accMonthHttpService: AccMonthHttpService,
    public notificationService : NotificationService
  ) {
    super();
  }

  public detailInitialize() {
    this.modal.show();
  }

  public detailTerminate() {
    this.modal.hide();
  }

  public refreshItems() {
    let params: Array<Param> = new Array<Param>();
    this.accMonthList.refresh(params);
  }

  public getFilters(): Array<Param> {
    const params: Array<Param> = new Array<Param>();
    params.push(new Param("filter", this.filter));
    return params;
  }

  public export() {
    let params: Array<Param> = null;

    params = this.getFilters();
    this.notificationService.showTransSucces(null,'showExportNotification')
    this.accMonthHttpService.export(params).subscribe((blob) => {
      fileSaveAs(blob.body, "luni.xlsx");
    });
  }

  public onAddNew() {
    this.onAddEditItem();
  }

  public onAddEditItem(item: AccMonth | null = null) {
    let dialogRef = this.dialog.open(AccMonthAddEditComponent, {
      panelClass: "large-modal",
      disableClose: true,
      width: "100%",
      maxWidth: "100vw",
      maxHeight: "100vh",
      height: "calc(100vh - 55px)",
      position: { bottom: "0" },
      data: { item: item },
    });

    dialogRef.afterClosed().subscribe((item: AccMonth) => {
      if (item !== null) this.refreshItems();
    });
  }

  public onItemEdit(item: AccMonth) {
    this.onAddEditItem(item);
  }
}
