import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {CodeNameEntity} from '../../../../model/api/common/code-name-entity';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {OrderHttpService} from '../../../../services/http/administration/order.http.service';
import {OfferMaterialHttpService} from '../../../../services/http/administration/offer-material.http.service';
import {NotificationService} from '../../../../services/notification.service';
import {EntityFileHttpService} from '../../../../services/http/common/entity-file.http.service';
import {AppUtils} from '../../../../common/app.utils';
import {Param} from '../../../../model/common/param';
import {ContractListComponent} from '../../contracts/contract.list';
import {OrderOpDetailList} from '../../order-ops/order-op.detail.list';
import {OfferMaterialListComponent} from '../../offer-materials/offer-material.list';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {OrderSave} from '../../../../model/api/administration/order-save';
import {Contract} from '../../../../model/api/administration/contract';
import {Offer} from '../../../../model/api/administration/offer';
import {ContractHttpService} from '../../../../services/http/administration/contract.http.service';
import {OrderOpHttpService} from '../../../../services/http/administration/order-op.http.service';
import {ContractFilter} from '../../../../model/api/administration/contract.filter';
import {BudgetBase} from '../../../../model/api/budget/budget-base';
import {OrderContractUpdate} from '../../../../model/api/administration/order-update';

@Component({
  selector: 'app-po-order-details-dialog',
  templateUrl: './po-order-details-dialog.component.html',
  styleUrls: ['./po-order-details-dialog.component.scss']
})
export class PoOrderDetailsDialogComponent implements OnInit, AfterViewInit {

    public _orderType: CodeNameEntity = null;
    public get orderType(): CodeNameEntity { return this._orderType; }
    public set orderType(value: CodeNameEntity) {
      this._orderType = value;
    }

    public _offer: Offer = null;
    public get offer(): Offer { return this._offer; }
    public set offer(value: Offer) {
      this._offer = value;
    }

    public _contract: Contract = null;
    public get contract(): Contract { return this._contract; }
    public set contract(value: Contract) {
      this._contract = value;
    }

    public get contractParams(): Array<Param> {
      const params = new Array<Param>();
      const contractFilter: ContractFilter = new ContractFilter();

      if (this.offer != null && this.offer.partner != null) {
        contractFilter.partnerIds = new Array<number>();
        contractFilter.partnerIds.push(this.offer.partner.id);
      }

      if (this.offer != null && this.offer.uom != null) {
        contractFilter.uomIds = new Array<number>();
        contractFilter.uomIds.push(this.offer.uom.id);
      }

      params.push(new Param('pageSize', '5'));
      params.push(new Param('jsonFilter', JSON.stringify(contractFilter)));

      return params;
    }

    @ViewChild('contractList') public contractList: ContractListComponent;
    @ViewChild('contractListModal') public contractListModal: ModalDirective;

    @ViewChild('orderOpDetailList') public orderOpList: OrderOpDetailList;

    @ViewChild('offerMaterialList') public offerMaterialList: OfferMaterialListComponent;

    @ViewChild('confirmationModal') public confirmationModal: ModalDirective;

    forma: FormGroup;
    formSubmit: boolean = false;

    options: FormGroup;
    hideRequiredControl = new FormControl(false);
    floatLabelControl = new FormControl('auto');

    public confirmationMessage: string = '';
    public operationType: OperationType = OperationType.NotSet;

    public id: number = 0;
    public order: OrderSave = new OrderSave();
    public selectedAssetOp: any;
    public isSaved: boolean = true;

    public get allowSaving(): boolean {
      return this.order != null &&
        this.offer != null &&
        this.contract != null && this.contract.contractID != 'NO-C' &&
        this.budgetBase != null;
    }
    // public orderType: CodeNameEntity = null;
    // public offer: Offer = null;
    public budgetBase: BudgetBase = null;
    // public contract: Contract = null;

    constructor(
      public route: ActivatedRoute,
      public router: Router,
      public contractHttpService: ContractHttpService,
      public orderOpHttpService: OrderOpHttpService,
      public offerMaterialHttpService: OfferMaterialHttpService,
      public notificationService: NotificationService,
      public orderHttpService: OrderHttpService,
      private fb: FormBuilder,
      public entityFileHttpService: EntityFileHttpService) {
      this.options = fb.group({
        hideRequired: this.hideRequiredControl,
        floatLabel: this.floatLabelControl,
      });
      this.route.params.subscribe((params: Params) => {
        if (params['id']) {
          this.id = +params['id'];
        }
      });
    }
    ngOnInit(): void {
    }
    ngAfterViewInit() {
      if (this.id > 0) {
        this.orderHttpService.getDetailById(this.id)
          .subscribe((asset: any) => {
            this.updateDetails(asset);
          });
      }
    }

    public refreshAssetOperations() {
      const params: Array<Param> = new Array<Param>();

      params.push(new Param('orderId', this.id.toString()));
      if(this.orderOpList != undefined){
        this.orderOpList.refresh(params);
      }

    }

    public updateDetails(order: any) {
      this.order.id = order.id;
      this.order.code = order.code;
      this.order.name = order.name;
      this.orderType = order.orderType;
      this.offer = order.offer;
      this.contract = order.contract;
      this.budgetBase = order.budgetBase;

      if(this.offer != null){
        const params: Array<Param> = new Array<Param>();
        params.push(new Param('offerIds', AppUtils.getIdsList<Offer, number>([ this.offer != null ? this.offer : null ])));
        this.offerMaterialList.refresh(params);

        // this.refreshAssetOperations();
      }
    }
    /*begin CONTRACT */
    public selectContract() {
      const params = new Array<Param>();
      const contractFilter: ContractFilter = new ContractFilter();

      if (this.offer != null && this.offer.partner != null) {
        contractFilter.partnerIds = new Array<number>();
        contractFilter.partnerIds.push(this.offer.partner.id);
      }

      if (this.offer != null && this.offer.uom != null) {
        contractFilter.uomIds = new Array<number>();
        contractFilter.uomIds.push(this.offer.uom.id);
      }

      params.push(new Param('pageSize', '5'));
      params.push(new Param('jsonFilter', JSON.stringify(contractFilter)));

      this.contractList.refresh(params);
      this.contractListModal.show();
    }
    public setSelectedContract() {

      const items: Array<Contract> = this.contractList.selectedItems;
      this.contract = ((items != null) && (items.length === 1)) ? items[0] : null;
      this.contractListModal.hide();
    }
    /*end CONTRACT */

    public cancelChanges() {
      // this.ngLocation.back();
      this.router.navigate(['/procurement/order']);
    }

    public onOrderContractUpdate() {
      this.operationType = OperationType.UpdateOrderContract;
      this.confirmationMessage = 'Actualizati contractul ' + this.contract.contractID + ' la comanda ' + this.order.code + '?';
      this.confirmationModal.show();
    }

    public onAssetInvFullDetailSelectionChanged(offerMaterials: Array<any>) {
    }


    public saveOrder() {
      let updateContractOrder = new OrderContractUpdate();
      updateContractOrder.id = this.order.id;
      updateContractOrder.contractId = this.contract.id;
      this.isSaved = false;

      this.orderHttpService.updateOrder(updateContractOrder)
        .subscribe((res: any) => {
          if (res) {
            this.notificationService.showSuccess('Comanda a fost plasat cu success', 'Adaugare comanda noua', 0, false, 0);
            this.router.navigate(['/procurement/order']);
          } else {
            this.notificationService.showError('Eroare plasare comanda', 'Adaugare comanda noua', 0, false, 0);
          }
        });
    }

    public onConfirmationApproved() {

      switch (this.operationType) {
        case OperationType.UpdateOrderContract:
          this.saveOrder();
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

    public onAssetOpDetailListSelectionChanged(assetOpDetails: Array<any>) {
      this.selectedAssetOp = this.orderOpList.selectedItem;
    }
}

enum OperationType {
  NotSet = 1,
  UpdateOrderContract = 2,
}
