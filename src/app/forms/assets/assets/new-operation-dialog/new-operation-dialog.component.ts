import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {DocumentType} from '../../../../model/api/documents/document-type';
import {Room} from '../../../../model/api/administration/room';
import {Department} from '../../../../model/api/administration/department';
import {Division} from '../../../../model/api/administration/division';
import {AssetSimpleDetail} from '../../../../model/api/assets/asset-simple-detail';
import {AppData} from '../../../../app-data';
import {Order} from '../../../../model/api/administration/order';
import {AssetListComponent} from '../asset.list';
import {DocumentTypeDropDownListComponent} from '../../../documents/document-types/document-type.drop-down.list';
import {CostCenterListComponent} from '../../../administrations/cost-centers/cost-center.list';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {DivisionListComponent} from '../../../administrations/divisions/division.list';
import {EmployeeListComponent} from '../../../administrations/employees/employee.list';
import {InvStateList} from '../../../inventory/inv-state/inv-state.list';
import {RoomListComponent} from '../../../administrations/rooms/room.list';
import {DepartmentListComponent} from '../../../administrations/departments/department.list';
import {OrderList} from '../../../administrations/order/order.list';
import {AssetMemoryService} from '../../../../services/memory/asset.memory.service';
import {DocumentHttpService} from '../../../../services/http/documents/document.http.service';
import {DocumentTypeHttpService} from '../../../../services/http/documents/document-type.http.service';
import {CostCenterHttpService} from '../../../../services/http/administration/cost-center.http.service';
import {DivisionHttpService} from '../../../../services/http/administration/division.http.service';
import {EmployeeHttpService} from '../../../../services/http/administration/employee.http.service';
import {RoomDetailHttpService} from '../../../../services/http/administration/room-detail.http.service';
import {DepartmentDetailHttpService} from '../../../../services/http/administration/department-detail.http.service';
import {OrderHttpService} from '../../../../services/http/administration/order.http.service';
import {InvStateHttpService} from '../../../../services/http/inventory/inv-state.http.service';
import {Param} from '../../../../model/common/param';
import {Document} from '../../../../model/api/documents/document';
import {AppUtils} from '../../../../common/app.utils';
import {Employee} from '../../../../model/api/administration/employee';
import {CostCenter} from '../../../../model/api/administration/cost-center';
import {InvState} from '../../../../model/api/inventory/inv-state';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {Operation} from '../../../../model/api/documents/operation';
import {DocumentUpload} from '../../../../model/api/documents/document-upload';
import {AppConfig} from '../../../../config';
import { NotificationService } from '../../../../services/notification.service';

@Component({
  selector: 'app-new-operation-dialog',
  templateUrl: './new-operation-dialog.component.html',
  styleUrls: ['./new-operation-dialog.component.scss']
})
export class NewOperationDialogComponent implements AfterViewInit {

  public selectedDocumentType: DocumentType = null;
  public selectedEmployee: Employee = null;
  public selectedEmployeePrev: Employee = null;
  public selectedInvStatePrev: InvState = null;
  public selectedInvState: InvState = null;
  public selectedRoom: Room = null;
  public selectedDepartment: Department = null;
  public selectedRoomPrev: Room = null;
  public selectedDivision: Division = null;
  public selectedCostCenter: CostCenter = null;
  public selectedCostCenterPrev: CostCenter = null;
  public selectedValue: number = 0;
  public selectedAssets: Array<AssetSimpleDetail> = new Array<AssetSimpleDetail>();

  public enableAdministration: boolean = false;
  public requireAdministration: boolean = false;
  public enableAssetAccState: boolean = false;
  public requireAssetAccState: boolean = false;
  public enableAssetCategory: boolean = false;
  public requireAssetCategory: boolean = false;
  public enableCostCenter: boolean = false;
  public requireCostCenter: boolean = false;
  public enableDivision: boolean = false;
  public requireDivision: boolean = false;
  public enableDepartment: boolean = false;
  public requireDepartment: boolean = false;
  public enableEmployee: boolean = false;
  public requireEmployee: boolean = false;
  public enableInvState: boolean = false;
  public requireInvState: boolean = false;
  public enableRoom: boolean = false;
  public requireRoom: boolean = false;
  public enableValue: boolean = false;
  public requireValue: boolean = false;
  public validData: boolean = false;

  public documentSaved: boolean = false;

  public documentDate: Date;
  public registerDate: Date;
  public employeeDetail: string = '';
  public invStateDetail: string = '';
  public roomDetail: string = '';
  public appDataAssetList: Array<AppData>;
  public documentInfo: string = '';
  public serialNumber: string = '';

  public costCenterListSelectedItem: CostCenter = null;
  public divisionListSelectedItem: Division = null;
  public employeeListSelectedItem: Employee = null;
  public invStateListSelectedItem: InvState = null;
  public roomListSelectedItem: Room = null;
  public departmentListSelectedItem: Department = null;
  public isSaved: boolean = true;

  isCollapsed: boolean = true;

  showAdmBtn = true;
  showEmpBtn = true;
  showRoomBtn = true;
  showCCBtn = true;
  showBMBtn = true;
  showDimBtn = true;

  public transportType = '';
  public transportDoc = '';
  public transportPerson = '';
  public order: Order = null;


  @ViewChild('assetList') public assetList: AssetListComponent;
  @ViewChild('documentTypeDropDownList') public documentTypeDropDownList: DocumentTypeDropDownListComponent;
  @ViewChild('costCenterList') public costCenterList: CostCenterListComponent;
  @ViewChild('costCenterListModal') public costCenterListModal: ModalDirective;
  @ViewChild('divisionList') public divisionList: DivisionListComponent;
  @ViewChild('divisionListModal') public divisionListModal: ModalDirective;
  @ViewChild('employeeList') public employeeList: EmployeeListComponent;
  @ViewChild('employeeListModal') public employeeListModal: ModalDirective;
  @ViewChild('invStateList') public invStateList: InvStateList;
  @ViewChild('invStateListModal') public invStateListModal: ModalDirective;
  @ViewChild('roomList') public roomList: RoomListComponent;
  @ViewChild('roomListModal') public roomListModal: ModalDirective;
  @ViewChild('departmentList') public departmentList: DepartmentListComponent;
  @ViewChild('departmentListModal') public departmentListModal: ModalDirective;
  @ViewChild('orderList') public orderList: OrderList;
  @ViewChild('orderListModal') public orderListModal: ModalDirective;

  public get isAdmin(): boolean { return AppData.UserIsAdmin; }

  constructor(
    public dialog: MatDialog,
    public assetMemoryService: AssetMemoryService,
    public documentHttpService: DocumentHttpService,
    public documentTypeHttpService: DocumentTypeHttpService,
    public costCenterHttpService: CostCenterHttpService,
    public divisionHttpService: DivisionHttpService,
    public router: Router,
    public employeeHttpService: EmployeeHttpService,
    public roomDetailHttpService: RoomDetailHttpService,
    public departmentDetailHttpService: DepartmentDetailHttpService,
    public orderHttpService: OrderHttpService,
    public invStateHttpService: InvStateHttpService,
    private dialogRef:MatDialogRef<NewOperationDialogComponent>,
    private notifyService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.isSaved = true;
  }

  public _division: Division = null;
  public get division(): Division { return this._division; }
  public set division(value: Division) {
    this._division = value;
    this.selectedDivision = value;
  }

  public _costCenter: CostCenter = null;
  public get costCenter(): CostCenter { return this._costCenter; }
  public set costCenter(value: CostCenter) {
    this._costCenter = value;
    this.selectedCostCenter = value;
  }

  public _employee: Employee = null;
  public get employee(): Employee { return this._employee; }
  public set employee(value: Employee) {
    this._employee = value;
    this.selectedEmployee = value;
  }

  public _invState: InvState = null;
  public get invState(): InvState { return this._invState; }
  public set invState(value: InvState) {
    this._invState = value;
    this.selectedInvState = value;
  }

  public get divisionParams(): Array<Param> {
    const params = new Array<Param>();
    params.push(new Param('showAll', 'true'));

    return params;
  }

  public get costCenterParams(): Array<Param> {
    const selectedDivisions: Array<Division> = new Array<Division>();
    selectedDivisions.push(this.selectedDivision);

    const params = new Array<Param>();
    params.push(new Param('divisionIds', AppUtils.getIdsList<Division, number>(selectedDivisions)));

    return params;
  }

  public get employeeParams(): Array<Param> {
    const selectCostCenter: Array<CostCenter> = new Array<CostCenter>();
    selectCostCenter.push(this.selectedCostCenter);

    const params = new Array<Param>();
    params.push(new Param('costCenterIds', AppUtils.getIdsList<CostCenter, number>(selectCostCenter)));
    return params;
  }

  public refresh() {
    this.documentSaved = false;
    this.selectedDocumentType = null;
    this.selectedEmployee = null;
    this.selectedEmployeePrev = null;
    this.selectedInvState = null;
    this.selectedInvStatePrev = null;
    this.selectedRoom = null;
    this.selectedDepartment = null;
    this.selectedRoomPrev = null;
    this.employeeDetail = '';
    this.roomDetail = '';

    this.resetOptions();

    this.assetMemoryService.setDataSource(AppData.AssetList);
    this.assetMemoryService.get(null, null, '', '', new Array<Param>()).subscribe((assets: AssetSimpleDetail[]) => {
      // console.log(JSON.stringify(assets));
      this.selectedAssets = assets;
    });

    this.refreshAssets();
  }

  public ngAfterViewInit() {
    this.refresh();
    this.refreshDocumentTypes();
  }

  public refreshAssets() {
    this.assetList.refresh(null);
  }

  public refreshDocumentTypes() {
    const params: Array<Param> = new Array<Param>();
    params.push(new Param('parentCode', 'ASSET'));

    this.documentTypeDropDownList.refresh(params);
  }

  public setSelectedDocumentType(documentTypes: Array<DocumentType>) {
    this.isSaved = true;
    this.isCollapsed = false;
    this.selectedDocumentType = ((documentTypes != null) && (documentTypes.length > 0)) ? documentTypes[0] : null;
    this.updateRequiredData(this.selectedDocumentType);
    ///alert(this.isSaved)
  }

  public cancelChanges() {
    this.router.navigate(['/wfh/personal']);
  }

  public parseDate(dateString: any): Date {
    if (dateString) {
      return new Date(dateString);
    } else {
      return null;
    }
  }

  public saveDocument() {
    this.isSaved = false;
    let document: Document = null;
    let operation: Operation = null;
    let operations: Array<Operation> = null;
    let documentUpload: DocumentUpload = null;
    let employeeId: number = null;
    let roomId: number = null;
    let departmentId: number = null;
    let costCenterId: number = null;
    let divisionId: number = null;
    let invStateId: number = null;

    this.documentSaved = true;
    this.updateValidData();

    this.documentDate = new Date();
    this.registerDate = new Date();

    document = new Document(0, this.selectedDocumentType.id, '', '', this.documentDate, this.registerDate, false, this.documentInfo, this.serialNumber, new Date(), new Date());

    if (this.enableEmployee && this.selectedEmployee != null) { employeeId = this.selectedEmployee.id; }
    if (this.enableInvState && this.selectedInvState != null) { invStateId = this.selectedInvState.id; }
    if (this.enableRoom && this.selectedRoom != null) { roomId = this.selectedRoom.id; }
    if (this.enableDepartment && this.selectedDepartment != null) { departmentId = this.selectedDepartment.id; }
    if (this.enableCostCenter && this.selectedCostCenter != null) { costCenterId = this.selectedCostCenter.id; }
    if (this.enableDivision && this.selectedDivision != null) { divisionId = this.selectedDivision.id; }
    if (this.selectedDocumentType.code === AppConfig.DOCUMENT_TYPE_CASS) { invStateId = AppConfig.INVSTATE_CASS_ID; }
    if (this.selectedDocumentType.code === AppConfig.DOCUMENT_TYPE_SELL) { invStateId = AppConfig.INVSTATE_SELL_ID; }

    operations = new Array<Operation>();
    this.selectedAssets.forEach((asset) => {
      operation = new Operation(0, asset.id, false, divisionId, costCenterId, 0, 0, 0, 0, employeeId, invStateId, 0, departmentId, roomId, invStateId, employeeId, this.order != null ? this.order.id : null);
      operations.push(operation);
    });

    documentUpload = new DocumentUpload();
    documentUpload.id = document.id;
    documentUpload.documentTypeId = document.documentTypeId;
    documentUpload.docNo1 = document.docNo1;
    documentUpload.docNo2 = document.docNo2;
    documentUpload.documentDate = document.documentDate;
    documentUpload.registerDate = document.registerDate;
    documentUpload.validated = document.validated;
    documentUpload.details = document.details;
    documentUpload.serialNumber = document.serialNumber;
    documentUpload.operations = operations;

    switch (this.selectedDocumentType.code) {
      case 'VALIDATEASSET':
        this.documentHttpService.operation(documentUpload).toPromise().then((data) => {
          this.isAdmin ? this.isSaved = true : this.isSaved = false;
          this.dialogRef.close(documentUpload)
          this.notifyService.showSuccess('Operatia a fost validata cu sucess!', '', 3000, false, 3000);
        });
        break;
      case 'Reactivare':
        this.documentHttpService.reactivate(documentUpload).toPromise().then((data) => {
          this.isAdmin ? this.isSaved = true : this.isSaved = false;
          this.dialogRef.close(documentUpload)
          this.notifyService.showSuccess('Operatia a fost validata cu sucess!', '', 3000, false, 3000);
        });
        break;
      case 'STATE_CHANGE':
        this.documentHttpService.saveStateChange(documentUpload).toPromise().then((data) => {
          this.isAdmin ? this.isSaved = true : this.isSaved = false;
          this.dialogRef.close(documentUpload)
          this.notifyService.showSuccess('Operatia a fost validata cu sucess!', '', 3000, false, 3000);
        });
        break;
      case 'STATE_CHANGE':
        this.documentHttpService.saveStateChange(documentUpload).toPromise().then((data) => {
          this.isAdmin ? this.isSaved = true : this.isSaved = false;
          this.dialogRef.close(documentUpload)
          this.notifyService.showSuccess('Operatia a fost validata cu sucess!', '', 3000, false, 3000);
        });
        break;
      default:
        this.documentHttpService.saveFullDocument(documentUpload).toPromise().then((data) => {
          this.isSaved = true;

          this.dialogRef.close(documentUpload)
          this.notifyService.showSuccess('Operatia a fost validata cu sucess!', '', 3000, false, 3000);
        });
        break;
    }
  }

  public resetOptions() {
    this.enableAdministration = false;
    this.enableAssetAccState = false;
    this.enableAssetCategory = false;
    this.enableCostCenter = false;
    this.enableDivision = false;
    this.enableDepartment = false;
    this.enableEmployee = false;
    this.enableInvState = false;
    this.enableRoom = false;
    this.enableValue = false;

    this.requireAdministration = false;
    this.requireAssetAccState = false;
    this.requireAssetCategory = false;
    this.requireCostCenter = false;
    this.requireDivision = false;
    this.requireDepartment = false;
    this.requireEmployee = false;
    this.requireInvState = false;
    this.requireRoom = false;
    this.requireValue = false;

    this.validData = false;
  }

  public updateRequiredData(documentType: DocumentType) {

    this.resetOptions();

    if (documentType != null) {

      const maskParts: string[] = documentType.mask.split(';');

      // console.log(JSON.stringify(maskParts));

      maskParts.forEach((maskPart: string) => {

        if (!this.enableAdministration && maskPart.startsWith(AppConfig.DOCUMENTTYPE_MASK_ADMINISTRATION)) {
          this.enableAdministration = true;
          this.requireAdministration = maskPart.endsWith(AppConfig.DOCUMENTTYPE_MASK_REQUIRED);
        }

        if (!this.enableAssetAccState && maskPart.startsWith(AppConfig.DOCUMENTTYPE_MASK_ASSETACCSTATE)) {
          this.enableAssetAccState = true;
          this.requireAssetAccState = maskPart.endsWith(AppConfig.DOCUMENTTYPE_MASK_REQUIRED);
        }

        if (!this.enableAssetCategory && maskPart.startsWith(AppConfig.DOCUMENTTYPE_MASK_ASSETCATEGORY)) {
          this.enableAssetCategory = true;
          this.requireAssetCategory = maskPart.endsWith(AppConfig.DOCUMENTTYPE_MASK_REQUIRED);
        }

        if (!this.enableCostCenter && maskPart.startsWith(AppConfig.DOCUMENTTYPE_MASK_COSTCENTER)) {
          this.enableCostCenter = true;
          this.requireCostCenter = maskPart.endsWith(AppConfig.DOCUMENTTYPE_MASK_REQUIRED);
        }

        if (!this.enableDivision && maskPart.startsWith(AppConfig.DOCUMENTTYPE_MASK_DIVISION)) {
          this.enableDivision = true;
          this.requireDivision = maskPart.endsWith(AppConfig.DOCUMENTTYPE_MASK_REQUIRED);
        }

        if (!this.enableDepartment && maskPart.startsWith(AppConfig.DOCUMENTTYPE_MASK_DEPARTMENT)) {
          this.enableDepartment = true;
          this.requireDepartment = maskPart.endsWith(AppConfig.DOCUMENTTYPE_MASK_REQUIRED);
        }

        if (!this.enableEmployee && maskPart.startsWith(AppConfig.DOCUMENTTYPE_MASK_EMPLOYEE)) {
          // console.log('check for employee');
          this.enableEmployee = true;
          this.requireEmployee = maskPart.endsWith(AppConfig.DOCUMENTTYPE_MASK_REQUIRED);
        }

        if (!this.enableInvState && maskPart.startsWith(AppConfig.DOCUMENTTYPE_MASK_INVSTATE) && this.isAdmin) {
          this.enableInvState = true;
          this.requireInvState = maskPart.endsWith(AppConfig.DOCUMENTTYPE_MASK_REQUIRED);
          // console.log(this.validData);
        }

        if (maskPart.startsWith(AppConfig.DOCUMENT_TYPE_VALIDATE) && !this.isAdmin) {
          this.enableInvState = false;
          this.isSaved = false;
          // this.requireInvState = maskPart.endsWith(AppConfig.DOCUMENTTYPE_MASK_REQUIRED);
          // console.log(this.validData);
        }

        if (!this.enableRoom && maskPart.startsWith(AppConfig.DOCUMENTTYPE_MASK_ROOM)) {
          this.enableRoom = true;
          this.requireRoom = maskPart.endsWith(AppConfig.DOCUMENTTYPE_MASK_REQUIRED);
        }

        if (!this.enableValue && maskPart.startsWith(AppConfig.DOCUMENTTYPE_MASK_VALUE)) {
          this.enableValue = true;
          this.requireValue = maskPart.endsWith(AppConfig.DOCUMENTTYPE_MASK_REQUIRED);
        }

        if (!this.enableValue && maskPart.startsWith(AppConfig.DOCUMENTTYPE_MASK_ALL)) {
          this.enableEmployee = true;
          this.enableInvState = true;
          this.enableRoom = true;
          this.enableValue = true;
        }
      });
    }

    this.updateValidData();
  }

  public updateValidData(): void {
    this.validData = (this.selectedAssets != null) && (this.selectedAssets.length > 0) && (!this.documentSaved) && (this.selectedDocumentType != null) &&
      // (this.requireAssetAccState || this.requireAssetCategory || this.requireCostCenter
      // || this.requireDepartment || this.requireEmployee || this.requireValue)

      ((this.selectedCostCenter != null) || (this.selectedEmployee != null) || (this.selectedRoom != null) || (this.selectedInvState != null) || (this.selectedValue !== 0))

      && ((!this.requireCostCenter) || ((this.requireCostCenter) && (this.selectedCostCenter != null)))
      && ((!this.requireDivision) || ((this.requireDivision) && (this.selectedDivision != null)))
      && ((!this.requireEmployee) || ((this.requireEmployee) && (this.selectedEmployee != null)))
      && ((!this.requireInvState) || ((this.requireInvState) && (this.selectedInvState != null)))
      && ((!this.requireRoom) || ((this.requireRoom) && (this.selectedRoom != null)))
      && ((!this.requireDepartment) || ((this.requireDepartment) && (this.selectedDepartment != null)))
      && ((!this.requireValue) || ((this.requireValue) && (this.selectedValue !== 0)));

    if (!this.validData) { this.validData = (this.validData || (this.selectedDocumentType.code === AppConfig.DOCUMENT_TYPE_CASS)
      || (this.selectedDocumentType.code === AppConfig.DOCUMENT_TYPE_VALIDATE)
      || (this.selectedDocumentType.code === AppConfig.DOCUMENT_TYPE_SELL));
    }

    this.validData = true;
  }

  public selectCostCenter() {

    const selectedDivisions: Array<Division> = new Array<Division>();
    selectedDivisions.push(this.selectedDivision);

    const params = new Array<Param>();
    params.push(new Param('divisionIds', AppUtils.getIdsList<Division, number>(selectedDivisions)));


    this.costCenterList.refresh(params);
    this.costCenterListModal.show();
  }

  public selectDivision() {
    const params = new Array<Param>();
    params.push(new Param('showAll', 'true'));

    this.divisionList.refresh(params);
    this.divisionListModal.show();
  }

  public selectEmployee() {

    const params = new Array<Param>();
    params.push(new Param('companyIds', '[5]'));

    this.employeeList.refresh(params);
    this.employeeListModal.show();
  }

  public selectInvState() {
    this.invStateList.refresh(null);
    this.invStateListModal.show();
  }

  public selectRoom() {
    this.roomList.refresh(null);
    this.roomListModal.show();
  }

  public selectDepartment() {
    this.departmentList.refresh(null);
    this.departmentListModal.show();
  }

  public setCostCenterListSelectedItem(costCenters: Array<CostCenter>) {
    this.costCenterListSelectedItem = costCenters != null && costCenters.length === 1 ? costCenters[0] : null;
  }

  public setDivisionListSelectedItem(divisions: Array<Division>) {
    this.divisionListSelectedItem = divisions != null && divisions.length === 1 ? divisions[0] : null;
  }

  public setSelectedCostCenter() {
    this.selectedCostCenter = this.costCenterListSelectedItem;
    this.costCenterListModal.hide();
    this.updateValidData();
  }

  public setSelectedDivision() {
    this.selectedDivision = this.divisionListSelectedItem;
    this.divisionListModal.hide();
    this.updateValidData();
  }

  public setSelectedDepartment() {
    this.selectedDepartment = this.departmentListSelectedItem;
    this.departmentListModal.hide();
    this.updateValidData();
  }

  public setEmployeeListSelectedItem(employees: Array<Employee>) {
    this.employeeListSelectedItem = employees != null && employees.length === 1 ? employees[0] : null;
  }

  public setInvStateListSelectedItem(invStates: Array<InvState>) {
    this.invStateListSelectedItem = invStates != null && invStates.length === 1 ? invStates[0] : null;
  }

  public setSelectedEmployee() {
    this.selectedEmployee = this.employeeListSelectedItem;
    // if (this.selectedEmployee != null) {
    //     this.selectedCostCenter = this.selectedEmployee.costCenter;
    // }
    this.employeeListModal.hide();
    this.updateValidData();
  }

  public setSelectedInvState() {
    this.selectedInvState = this.invStateListSelectedItem;
    this.invStateListModal.hide();
    this.updateValidData();
  }

  public setRoomListSelectedItem(rooms: Array<Room>) {
    this.roomListSelectedItem = rooms != null && rooms.length === 1 ? rooms[0] : null;
  }

  public setSelectedRoom() {
    this.selectedRoom = this.roomListSelectedItem;
    this.roomListModal.hide();

    if (this.roomList.selectedItems.length > 0 && (this.roomList.selectedItem.id === 2961 || this.roomList.selectedItem.id === 2962)) {
      this.enableDepartment = true;
    }

    this.updateValidData();
  }

  public setDepartmentListSelectedItem(departments: Array<Department>) {
    this.departmentListSelectedItem = departments != null && departments.length === 1 ? departments[0] : null;
  }

  public setSelectedDepartmnet() {
    this.selectedDepartment = this.departmentListSelectedItem;
    this.departmentListModal.hide();
    this.updateValidData();
  }

  public clearRoom() {

    this.selectedRoom = null;
    this.roomListSelectedItem = null;
    this.updateValidData();
  }

  public clearInvState() {

    this.selectedInvState = null;
    this.invStateListSelectedItem = null;
    this.updateValidData();
  }

  public clearEmployee() {

    this.selectedEmployee = null;
    this.employeeListSelectedItem = null;
    this.updateValidData();
  }

  // public selectRoom() {
  //     let roomSelection: Array<Room> = new Array<Room>();
  //     if (this.selectedRoom != null) roomSelection.push(this.selectedRoom);
  //     this.requestRoomRefreshEvent.emit(null)
  //     this.updateRoomSelectionEvent.emit(roomSelection);
  //     this.roomListModal.show();
  // }

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

  public onTransportTypeUpdate(type: string) {
    this.transportType = type;
  }


  /*begin ORDER  */
  public selectOrder() {

    const params = new Array<Param>();
    // const budgetFilter: BudgetFilter = new BudgetFilter();

    // if (this.selectedCostCenter != null && this.selectedCostCenter.admCenter != null) {
    //     budgetFilter.admCenterIds = new Array<number>();
    //     budgetFilter.admCenterIds.push(this.selectedCostCenter.admCenter.id);
    //   }

    //   if (this.offer != null && this.offer.assetType != null) {
    //     budgetFilter.assetTypeIds = new Array<number>();
    //     budgetFilter.assetTypeIds.push(this.offer.assetType.id);
    //   }

    params.push(new Param('pageSize', '5'));
    // params.push(new Param('jsonFilter', JSON.stringify(budgetFilter)));


    this.orderList.refresh(params);
    this.orderListModal.show();
  }
  public setSelectedOrder() {
    const items: Array<Order> = this.orderList.selectedItems;
    this.order = ((items != null) && (items.length === 1)) ? items[0] : null;

    this.orderListModal.hide();
  }

  public isDisabled() : boolean {
    if(this.selectedDocumentType == null)
      return true
    else
        if(this.selectedDocumentType.code == 'TRANSFER')
          return !this.isSaved || (this.division == null || this.costCenter == null || this.employee == null)
        else 
          if(this.selectedDocumentType.code =='STATE_CHANGE')
            return !this.isSaved || (this.division == null || this.costCenter == null || this.invState == null)
      return false
  }
}
