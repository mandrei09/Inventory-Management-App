import { PagedResult } from "./../../../model/common/paged-result";
import { Param } from "./../../../model/common/param";
import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  ViewChild,
} from "@angular/core";
import {
  GenericManage,
  GenericManageViewMode,
} from "../../generic/generic.manage";
import { EmailManagerDetail as EmailManagerDetailUI } from "..//email-manager/email-manager.detail";
import { EmailTypeList } from "../email-type/email-type.list";
import { EmailManagerList } from "./email-manager.list";
import { EmailManagerDetailHttpService } from "../../../services/http/administration/email-manager-detail.http.service";
import { EmailManagerHttpService } from "../../../services/http/administration/email-manager.http.service";
import { EmailTypeHttpService } from "../../../services/http/administration/email-type.http.service";
import { ModalDirective } from "ngx-bootstrap/modal";
import { EmailType } from "../../../model/api/administration/email-type";
import { AppState } from "../../../model/api/common/app-state";
import { EmailManager } from "../../../model/api/administration/email-manager";
import { EmailManagerDetail } from "../../../model/api/administration/email-manager-detail";
import { AppUtils } from "../../../common/app.utils";
import { AppStateHttpService } from "../../../services/http/common/app-state.http.service";
import { OfferMaterialListComponent } from "../offer-materials/offer-material.list";
import { OfferMaterialHttpService } from "../../../services/http/administration/offer-material.http.service";
import { CodeNameEntity } from "../../../model/api/common/code-name-entity";
import { OfferMaterialAdd } from "../../../model/api/assets/offer-material-add";
import { Material } from "../../../model/api/administration/material";
import { MaterialList } from "../materials/material.list";
import { MaterialHttpService } from "../../../services/http/administration/material.http.service";
import { NotificationService } from "../../../services/notification.service";
import { Offer } from "../../../model/api/administration/offer";
import { OfferMaterialUpdate } from "../../../model/api/administration/offer-material-update";
import { NavigationEnd, Router } from "@angular/router";
import { UomListComponent } from "../../assets/uoms/uom.list";
import { UomHttpService } from "../../../services/http/assets/uom.http.service";
import { Uom } from "../../../model/api/assets/uom";
import { RateListComponent } from "../../assets/rates/rate.list";
import { RateHttpService } from "../../../services/http/administration/rate.http.service";
import { Rate } from "../../../model/api/administration/rate";
import { Partner } from "../../../model/api/documents/partner";
import { OrderList } from "../order/order.list";
import { Order } from "../../../model/api/administration/order";
import { OrderHttpService } from "../../../services/http/administration/order.http.service";
import { OfferUpdate } from "../../../model/api/common/offer-update";
import { MaterialDetailComponent } from "../materials/material.detail";
import { SubCategoryListComponent } from "../../assets/sub-categories/sub-category.list";
import { SubCategory } from "../../../model/api/assets/sub-category";
import { SubCategoryHttpService } from "../../../services/http/assets/sub-category.http.service";
import { OfferResult } from "../../../model/api/result/offer-result";
import { saveAs as fileSaveAs } from "file-saver-es";
import { DialogService } from "../../../services/dialog.service";
import { MaterialAddEditComponent } from "../materials/material-add-edit/material-add-edit.component";
import { MatDialog } from "@angular/material/dialog";
import { MaterialsSelectionDialog } from "../materials/selection/materials.selection.dialog";

@Component({
  selector: "app-email-manager-manage",
  templateUrl: "email-manager.manage.html",
  styleUrls: ["email-manager.manage.scss"],
  providers: [
    OfferMaterialHttpService,
    MaterialHttpService,
    UomHttpService,
    RateHttpService,
  ],
})
export class EmailManagerManageComponent
  extends GenericManage<EmailManager, number>
  implements OnInit, AfterViewInit
{
  @ViewChild("emailManagerDetailModal") emailManagerDetailModal: ModalDirective;
  @ViewChild("emailManagerList") emailManagerList: EmailManagerList;
  @ViewChild("emailManagerDetail") emailManagerDetail: EmailManagerDetailUI;
  @ViewChild("emailTypeListModal") emailTypeListModal: ModalDirective;
  @ViewChild("emailTypeList") emailTypeList: EmailTypeList;

  @ViewChild("offerMaterialListModal")
  public offerMaterialListModal: ModalDirective;
  @ViewChild("offerMaterialList")
  public offerMaterialList: OfferMaterialListComponent;

  @ViewChild("materialListModal") public materialListModal: ModalDirective;
  @ViewChild("materialList") public materialList: MaterialList;

  @ViewChild("materialDetail") public materialDetail: MaterialDetailComponent;
  @ViewChild("materialDetailModal") public materialDetailModal: ModalDirective;

  @ViewChild("subCategoryListModal") subCategoryListModal: ModalDirective;
  @ViewChild("subCategoryList") subCategoryList: SubCategoryListComponent;

  @ViewChild("uomList") public uomList: UomListComponent;
  @ViewChild("uomListModal") public uomListModal: ModalDirective;

  // @ViewChild('rateList') public rateList: RateListComponent;
  // @ViewChild('rateListModal') public rateListModal: ModalDirective;

  @ViewChild("orderList") public orderList: OrderList;
  @ViewChild("orderListModal") public orderListModal: ModalDirective;

  @ViewChild("confirmationModal") public confirmationModal: ModalDirective;

  @ViewChild("acceptModal") public acceptModal: ModalDirective;
  @ViewChild("rejectModal") public rejectModal: ModalDirective;

  public filter: string = "";
  public selectedEmailType: EmailType = null;
  public selectedAppState: AppState = null;
  public appState: string = "Status";
  public appStates: Array<AppState> = new Array<AppState>();
  public selectedOfferMaterial: any;
  public material: CodeNameEntity = null;
  public confirmationMessage: string = "";
  public operationType: OperationType = OperationType.NotSet;
  public assetToUpdate = new Array<OfferMaterialUpdate>();
  public uom: Uom = null;
  //public rate: Rate = null;
  public order: Order = null;
  public selectedSubCategory: SubCategory = null;

  public acceptMessage: string = "";
  public rejectMessage: string = "";
  reasonAccept = "";
  reasonDecline = "";
  showExportBtn = true;

  constructor(
    public dialog: MatDialog,
    private dialogService: DialogService,
    public emailTypeHttpService: EmailTypeHttpService,
    public emailManagerHttpService: EmailManagerHttpService,
    public appStateHttpService: AppStateHttpService,
    public uomHttpService: UomHttpService,
    public emailManagerDetailHttpService: EmailManagerDetailHttpService,
    public offerMaterialHttpService: OfferMaterialHttpService,
    public rateHttpService: RateHttpService,
    public materialHttpService: MaterialHttpService,
    public notificationService: NotificationService,
    public orderHttpService: OrderHttpService,
    public subCategoryHttpService: SubCategoryHttpService,
    public router: Router
  ) {
    super();

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        if (evt.urlAfterRedirects === "/procurement/offer/email") {
          // console.log('refreshing asset inv details');
          // console.log(JSON.stringify(evt));
          setTimeout(() => {
            this.refresh();
          }, 100);
        }
      }
    });

    this.appStateHttpService
      .getDetailByParentCode("EMAILMANAGER")
      .subscribe((res: any) => {
        this.appStates = res;
      });
  }
  ngOnInit(): void {}

  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.clearFilters();
    // }, 1000);
  }

  public get canYouSaveOfferMaterials() {
    if (!this.offerMaterialList) {
      return false;
    } 
    else 
    {
      return this.offerMaterialList.tableItems.every((tableItem) => {
        return (
          tableItem.item.rateValue &&
          tableItem.item.rateValue !== undefined &&
          tableItem.item.rateDate &&
          tableItem.item.rateDate !== undefined &&
          tableItem.item.quantity &&
          tableItem.item.quantity !== undefined &&
          tableItem.item.price &&
          tableItem.item.price !== undefined
        );
      });
    }
  }

  public onOfferMaterialListSelectionChanged(offerMaterials: Array<any>) {
    this.selectedOfferMaterial = new Array<any>();
    offerMaterials.forEach((asset: any) => {
      this.selectedOfferMaterial.push(asset);
    });

    // this.selectedOfferMaterial = new Array<any>();
    // this.selectedOfferMaterial = this.offerMaterialList.selectedItem;
    //console.log(JSON.stringify(this.selectedOfferMaterial));
  }

  public addNewItem() {
    super.addNewItem();

    this.emailManagerDetail.emailType = null;
  }

  public editItem() {
    super.editItem();

    const emailManager: EmailManagerDetail = this
      .selectedItem as EmailManagerDetail;

    this.emailManagerDetail.emailType = null;

    if (emailManager != null && emailManager.emailType != null) {
      this.emailTypeHttpService
        .getById(emailManager.emailType.id)
        .subscribe((emailType: EmailType) => {
          this.emailManagerDetail.emailType = emailType;
        });
    }
  }

  public setSelectedItem($event) {
    this.selectedOfferMaterial = null;
    const params: Array<Param> = new Array<Param>();

    params.push(
      new Param(
        "offerIds",
        AppUtils.getIdsList<Offer, number>([
          this.emailManagerList.selectedItem != null &&
          this.emailManagerList.selectedItem.offer != null
            ? this.emailManagerList.selectedItem.offer
            : null,
        ])
      )
    );
    params.push(
      new Param(
        "partnerIds",
        AppUtils.getIdsList<Partner, number>([
          this.emailManagerList.selectedItem != null &&
          this.emailManagerList.selectedItem.partner != null
            ? this.emailManagerList.selectedItem.partner
            : null,
        ])
      )
    );
    params.push(
      new Param(
        "readOnly",
        this.emailManagerList.selectedItem?.state?.id === 7 ? "true" : "false"
      )
    );

    setTimeout(() => {
      if (this.offerMaterialList != undefined) {
        this.offerMaterialList.refresh(params);
      }
    }, 400);
  }

  public detailInitialize() {
    super.detailInitialize();
    this.emailManagerDetailModal.show();
  }

  public detailTerminate() {
    super.detailTerminate();
    this.emailManagerDetailModal.hide();
  }

  public onEmailManagerDetailEmailTypeNeeded() {
    this.emailManagerDetailModal.hide();
    this.selectEmailType();
  }

  public onEmailTypeListCancel() {
    this.emailTypeListModal.hide();
    if (this.viewMode === GenericManageViewMode.ItemDetail) {
      this.emailManagerDetailModal.show();
    }
  }

  public refresh() {
    const params: Array<Param> = new Array<Param>();

    params.push(new Param("filter", this.filter));
    params.push(
      new Param(
        "emailTypeIds",
        AppUtils.getIdsList<EmailType, number>([this.selectedEmailType])
      )
    );
    params.push(
      new Param(
        "appStateIds",
        AppUtils.getIdsList<AppState, number>([this.selectedAppState])
      )
    );

    this.emailManagerList.refresh(params);
  }

  public selectEmailType() {
    this.emailTypeListModal.show();
    this.emailTypeList.refresh(null);
  }

  public setSelectedEmailType() {
    switch (this.viewMode) {
      case GenericManageViewMode.ItemList:
        this.selectedEmailType = this.emailTypeList.selectedItem;
        this.emailTypeListModal.hide();
        this.refresh();
        break;
      case GenericManageViewMode.ItemDetail:
        this.emailManagerDetail.emailType = this.emailTypeList.selectedItem;
        this.emailTypeListModal.hide();
        this.emailManagerDetailModal.show();
        break;
    }
  }

  public unselectEmailType() {
    this.selectedEmailType = null;
    this.refresh();
  }

  public onAppStateUpdate(appStateId: number, appStateName: string) {
    if (appStateId !== -1) {
      this.selectedAppState = new AppState(
        appStateId,
        appStateName,
        appStateName,
        "EMAILMANAGER"
      );
    } else {
      this.selectedAppState = null;
    }

    this.appState = appStateName;
    this.refresh();
  }

  public exportToExcel() {
    let params: Array<Param> = null;

    if (this.filter != null && this.filter.length > 0) {
      params = new Array<Param>();
      params.push(new Param("filter", this.filter));
    }

    this.emailManagerDetailHttpService
      .get(1, 1000000, "id", "asc", params, null)
      .subscribe((data: PagedResult<EmailManager>) => {
        // let options = {
        //     sheetid: 'emailManager',
        //     headers: true,
        //     column: { style: { Font: { Bold: '1' } } },
        //     rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
        //     cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
        // };
        // let res = alasql(`SELECT id as [Id]
        //                     INTO XLSX('emailManager.xlsx',?) FROM ?`,[ options, data.items ]);
      });
  }

  public accept() {
    let offerUpdate = new OfferUpdate();
    offerUpdate.id =
      this.emailManagerList.selectedItem != null
        ? this.emailManagerList.selectedItem.id
        : 0;
    offerUpdate.reason = this.reasonAccept;

    this.emailManagerHttpService.accept(offerUpdate).subscribe((res) => {
      if (res) {
        // alert('Operatia a fost finalizata cu succes!');
        this.notificationService.showInfo(
          "Operatia a fost finalizata cu succes!",
          "Validate oferta",
          5000,
          false,
          0
        );
        this.router.navigate(["procurement/offer/status"]);
        this.refresh();
      }
    });
  }

  public decline() {
    let offerUpdate = new OfferUpdate();
    offerUpdate.id =
      this.emailManagerList.selectedItem != null
        ? this.emailManagerList.selectedItem.id
        : 0;
    offerUpdate.reason = this.rejectMessage;

    this.emailManagerHttpService.decline(offerUpdate).subscribe((res) => {
      if (res) {
        alert("Operatia a fost finalizata cu succes!");
        this.refresh();
      }
    });
  }

  /* MATERIAL */
  public materialParams() {
    const params: Array<Param> = Array<Param>();
    params.push(
      new Param(
        "exceptMaterialIds",
        AppUtils.getIdsList<CodeNameEntity, number>(this.selectedMaterials())
      )
    );
    params.push(new Param("hasSubCategory", "true"));

    return params;
  }

  public onMaterialAdd() {
    let dialogRef = this.dialog.open(MaterialsSelectionDialog, {
      panelClass: "centered-middle-modal",
      width: "80%",
      maxWidth: "90%",
      maxHeight: "80%",
      height: "auto",
      position: { top: "10em" },
      data: { params: this.materialParams() },
    });

    dialogRef.afterClosed().subscribe((items: any) => {
      this.setSelectedMaterial(items);
    });
  }

  public setSelectedMaterial(value) {
    // const items: Array<any> = this.materialList.selectedItems;
    const items: Array<any> = value;
    this.material = items != null && items.length === 1 ? items[0] : null;
    // this.materialListModal.hide();

    const aIds: number[] = new Array<number>();
    const materialsIds: OfferMaterialAdd = new OfferMaterialAdd();
    items.forEach((item) => {
      const index: number = aIds.indexOf(item.id);
      if (index < 0) {
        aIds.push(item.id);
      }
    });

    materialsIds.materialIds = aIds;
    materialsIds.offerId =
      this.emailManagerList.selectedItem != null &&
      this.emailManagerList.selectedItem.offer != null
        ? this.emailManagerList.selectedItem.offer.id
        : 0;
    materialsIds.emailManagerId =
      this.emailManagerList.selectedItem != null
        ? this.emailManagerList.selectedItem.id
        : 0;
    //materialsIds.rateId = this.rate.id;

    this.offerMaterialHttpService.addMaterialByOffer(materialsIds).subscribe(
      (res) => {
        if (res.statusCode === 200) {
          this.notificationService.showInfo(
            "Datele au fost salvate cu success!",
            "Adauga mapare material",
            2000,
            false,
            0
          );
          this.materialList.refresh(null);
          this.offerMaterialList.refresh(null);
          this.materialList.selectedItems = new Array<Material>();
        } else if (res.statusCode === 404) {
          this.notificationService.showError(
            "Nu exista",
            "Adauga materiale",
            0,
            false,
            0
          );
          this.materialList.selectedItems = new Array<Material>();
        }
      },
      (error) => {
        this.notificationService.showError(
          "Eroare salvare!",
          "Adauga mapare material",
          0,
          false,
          0
        );
        this.materialList.selectedItems = new Array<Material>();
      }
    );
  }

  public selectMaterial() {
    this.materialListModal.show();
    const params: Array<Param> = Array<Param>();
    params.push(
      new Param(
        "exceptMaterialIds",
        AppUtils.getIdsList<CodeNameEntity, number>(this.selectedMaterials())
      )
    );
    params.push(new Param("hasSubCategory", "true"));
    this.materialList.refresh(params);
  }

  private selectedMaterials(): Array<CodeNameEntity> {
    const mappedMaterials: Array<CodeNameEntity> = new Array<CodeNameEntity>();

    if (this.offerMaterialList.items.length > 0) {
      this.offerMaterialList.items.forEach((element) => {
        mappedMaterials.push(element.material);
      });
    }
    return mappedMaterials;
  }

  public closeMaterial() {
    this.materialList.selectedItems = new Array<Material>();
    this.materialListModal.hide();
  }

  public addMaterial() {
    // this.materialDetail.addNew();
    // this.materialDetailModal.show();
    this.onAddEditItem(null);
  }

  public onAddEditItem(item: Material | null = null) {
    let dialogRef = this.dialog.open(MaterialAddEditComponent, {
      panelClass: "large-modal",
      disableClose: true,
      width: "100%",
      maxWidth: "100vw",
      maxHeight: "100vh",
      height: "calc(100vh - 55px)",
      position: { bottom: "0" },
      data: { item: item },
    });

    dialogRef.afterClosed().subscribe((item: Material) => {
      if (item !== null) this.offerMaterialList.refreshItems();
    });
  }

  public materialAdded(material: Material) {
    this.material = material;
    this.materialDetailModal.hide();
  }

  public materialAddCanceled() {
    this.materialDetailModal.hide();
  }

  public onMaterialDetailSubCategoryNeeded() {
    this.materialDetailModal.hide();
    this.selectSubCategory();
  }

  public selectSubCategory() {
    this.subCategoryListModal.show();
    this.subCategoryList.refresh(null);
  }

  public setSelectedSubCategory() {
    this.viewMode = 2;
    switch (this.viewMode) {
      case GenericManageViewMode.ItemList:
        this.selectedSubCategory = this.subCategoryList.selectedItem;
        this.subCategoryListModal.hide();
        this.refresh();
        break;
      case GenericManageViewMode.ItemDetail:
        this.materialDetail.subCategory = this.subCategoryList.selectedItem;
        this.subCategoryListModal.hide();
        this.materialDetailModal.show();
        break;
      default:
        break;
    }
  }

  public unselectSubCategory() {
    this.selectedSubCategory = null;
    this.refresh();
  }

  public onSubCategoryListCancel() {
    this.subCategoryListModal.hide();
    if (this.viewMode === GenericManageViewMode.ItemDetail) {
      this.materialDetailModal.show();
    }
  }

  /* MATERIAL */

  public onDeleteOfferMaterial() {
    this.operationType = OperationType.DeleteOfferMaterial;
    // this.confirmationMessage = 'Esti sigur?';
    // this.confirmationModal.show();

    this.dialogService
      .confirmDialog({
        title: "Confirm Action",
        message: "Do you want to confirm this action?",
        confirmCaption: "Confirm",
        cancelCaption: "Cancel",
      })
      .subscribe((confirmed: any) => {
        if (confirmed) {
          this.onConfirmationApproved();
        }
      });
  }

  public deleteOfferMaterial() {
    this.emailManagerHttpService
      .deleteOfferMaterial(this.offerMaterialList.selectedItem.id)
      .subscribe(
        (res) => {
          if (res.statusCode === 200) {
            this.notificationService.showSuccess(
              "Operatia a fost finalizata cu success!",
              "Stergere produs din oferta",
              0,
              false,
              0
            );
            this.offerMaterialList.refresh(null);
          } else if (res.statusCode === 404) {
            this.notificationService.showError(
              "Eroare salvare",
              "Stergere produs din oferta",
              0,
              false,
              0
            );
          }
        },
        (error) => {
          this.notificationService.showError(
            "Eroare server",
            "Stergere produs din oferta",
            0,
            false,
            0
          );
        }
      );
  }

  public onConfirmationApproved() {
    switch (this.operationType) {
      case OperationType.DeleteOfferMaterial:
        this.deleteOfferMaterial();
        break;
      default:
        break;
    }

    this.operationType = OperationType.NotSet;
    this.confirmationModal.hide();
  }

  public onConfirmationCanceled() {
    this.operationType = OperationType.NotSet;
    this.confirmationModal.hide();
  }

  public saveValidated() {
    this.assetToUpdate = new Array<OfferMaterialUpdate>();

    this.offerMaterialList.TableItems.forEach((element) => {
      this.assetToUpdate.push(
        new OfferMaterialUpdate(
          element.item.id,
          element.item.quantity,
          element.item.price,
          element.item.wip,
          element.item.rateValue,
          element.item.rateDate,
          element.item.uom.id
        )
      );
    });
    this.emailManagerHttpService
      .offerMaterialUpdate(this.assetToUpdate)
      .subscribe(
        (res: OfferResult) => {
          if (res.success) {
            this.notificationService.showInfo(
              res.message,
              "Actualizare",
              2000,
              false,
              0
            );
          } else {
            this.notificationService.showError(
              res.message,
              "Actualizare",
              2000,
              false,
              0
            );
          }
          this.offerMaterialList.refresh(null);
        },
        (error) => {
          this.notificationService.showError("", "Eroare server!", 0, false, 0);
        }
      );
  }

  public sendNotification() {}

  public clearFilters() {
    this.offerMaterialList.refresh(null);
  }

  /* begin UOM */
  public selectUom() {
    this.uomList.refresh(null);
    this.uomListModal.show();
  }
  public setSelectedUom() {
    const items: Array<Uom> = this.uomList.selectedItems;
    this.uom = items != null && items.length === 1 ? items[0] : null;
    this.uomListModal.hide();
  }
  /*end UOM */

  //   /* BEGIN RATE  */
  //     public selectRate() {

  //         const params: Array<Param> = new Array<Param>();
  //         params.push(new Param('showLast', 'true'));

  //         this.rateList.refresh(params);
  //         this.rateListModal.show();
  //     }
  //     public setSelectedRate() {
  //         const items: Array<Rate> = this.rateList.selectedItems;
  //         this.rate = ((items != null) && (items.length === 1)) ? items[0] : null;
  //         this.rateListModal.hide();
  //     }
  // /* END RATE  */

  /*begin ORDER */
  public selectOrder() {
    this.orderList.refresh(null);
    this.orderListModal.show();
  }

  public setSelectedOrder() {
    const items: Array<Order> = this.orderList.selectedItems;
    this.order = items != null && items.length === 1 ? items[0] : null;
    this.orderListModal.hide();
  }

  /*end ORDER */

  public onConfirm() {
    this.acceptMessage = "";
    this.reasonAccept = "";
    this.operationType = OperationType.Accept;

    this.dialogService
      .reasonDialog({
        title: "Confirm Action",
        message: "Esti sigur ca vrei sa validezi oferta selectata?",
        label: "Motiv aprobare",
        confirmCaption: "Da",
        cancelCaption: "Nu",
      })
      .subscribe((res: any) => {
        // console.log(res);
        this.acceptMessage = res;
        this.reasonAccept = res;
        if (res) {
          this.onAcceptConfirmationApproved();
        } else {
          this.onAcceptCanceled();
        }
      });
  }

  public onAcceptCanceled() {
    this.operationType = OperationType.NotSet;
    // this.acceptModal.hide();
  }

  public onAcceptConfirmationApproved() {
    switch (this.operationType) {
      case OperationType.Accept:
        this.accept();
        break;
      default:
        break;
    }

    this.operationType = OperationType.NotSet;
    this.acceptModal.hide();
  }

  public onRejectOffer() {
    this.rejectMessage = "";
    this.reasonDecline = "";
    this.operationType = OperationType.Reject;

    this.dialogService
      .reasonDialog({
        title: "Confirm Action",
        message: "Respingeti oferta selectat?",
        label: "Motiv respingere",
        confirmCaption: "Da",
        cancelCaption: "Nu",
      })
      .subscribe((res: any) => {
        if (res) {
          this.rejectMessage = res;
          this.reasonDecline = res;
          this.onRejectConfirmationApproved();
        } else {
          this.onRejectCanceled();
        }
      });
  }

  public onRejectCanceled() {
    this.operationType = OperationType.NotSet;
    this.rejectModal.hide();
  }

  public onRejectConfirmationApproved() {
    switch (this.operationType) {
      case OperationType.Reject:
        this.decline();
        break;
      default:
        break;
    }

    this.operationType = OperationType.NotSet;
    this.rejectModal.hide();
  }

  public export() {
    this.showExportBtn = false;
    let params: Array<Param> = null;

    //params = this.getFilters();
    this.emailManagerHttpService.export(params).subscribe((blob) => {
      fileSaveAs(blob.body, "Export.xlsx");
      this.showExportBtn = true;
    });
  }
}

enum OperationType {
  NotSet = 1,
  DeleteOfferMaterial = 2,
  Accept = 3,
  Reject = 4,
}
