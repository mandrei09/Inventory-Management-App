import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { AccMonthManageComponent } from './forms/accounting/acc-month.manage';
import { AdmCenterManageComponent } from './forms/administrations/adm-centers/adm-center.manage';
import { AdministrationManageComponent } from './forms/administrations/administrations/administration.manage';
import { BudgetBaseAddDetailUIComponent } from './forms/administrations/budget-base/budget-base.add-detail.ui';
import { BudgetBaseDetailUIComponent } from './forms/administrations/budget-base/budget-base.detail.ui';
import { BudgetBaseManageComponent } from './forms/administrations/budget-base/budget-base.manage';
import { BudgetForecastDetailUIComponent } from './forms/administrations/budget-forecast/budget-forecast.detail.ui';
import { BudgetForecastManageComponent } from './forms/administrations/budget-forecast/budget-forecast.manage';
import { BudgetManagerManage } from './forms/administrations/budget-manager/budget-manager.manage';
import { BudgetMonthBaseManageComponent } from './forms/administrations/budget-month-base/budget-month-base.manage';
import { BudgetDetailUI } from './forms/administrations/budget/budget.detail.ui';
import { BudgetManage } from './forms/administrations/budget/budget.manage';
import { CityManageComponent } from './forms/administrations/cities/city.manage';
import { ContractDetailUIComponent } from './forms/administrations/contracts/contract.detail.ui';
import { ContractManageComponent } from './forms/administrations/contracts/contract.manage';
import { CostCenterManageComponent } from './forms/administrations/cost-centers/cost-center.manage';
import { CountyManageComponent } from './forms/administrations/counties/county.manage';
import { CountryManageComponent } from './forms/administrations/countries/country.manage';
import { DepartmentManageComponent } from './forms/administrations/departments/department.manage';
import { DictionaryTypeManageComponent } from './forms/administrations/dictionary-type/dictionary-type.manage';
import { DivisionManageComponent } from './forms/administrations/divisions/division.manage';
import { EmailManagerManageComponent } from './forms/administrations/email-manager/email-manager.manage';
import { EmailTypeManage } from './forms/administrations/email-type/email-type.manage';
import { EmployeeCostCenterManage } from './forms/administrations/employee-cost-centers/employee-cost-center.manage';
import { EmployeeDetailUIComponent } from './forms/administrations/employees/employee.detail.ui';
import { EmployeeManageComponent } from './forms/administrations/employees/employee.manage';
import { LevelManageComponent } from './forms/administrations/level/level.manage';
import { LocationManageComponent } from './forms/administrations/locations/location.manage';
import { MaterialManageComponent } from './forms/administrations/materials/material.manage';
import { MatrixLevelManageComponent } from './forms/administrations/matrix-level/matrix-level.manage';
import { MatrixManageComponent } from './forms/administrations/matrix/matrix.manage';
import { OfferMaterialManageComponent } from './forms/administrations/offer-materials/offer-material.manage';
import { OfferDetailUIComponent } from './forms/administrations/offer/offer.detail.ui';
import { OfferManage } from './forms/administrations/offer/offer.manage';
import { OrderMaterialManageComponent } from './forms/administrations/order-materials/order-material.manage';
import { OrderEditDetailUIComponent } from './forms/administrations/order/order-edit.detail.ui';
import { OrderDetailUIComponent } from './forms/administrations/order/order.detail.ui';
import { OrderManageComponent } from './forms/administrations/order/order.manage';
import { ProjectTypeDivisionManageComponent } from './forms/administrations/project-type-division/project-type-division.manage';
import { RegionManageComponent } from './forms/administrations/regions/region.manage';
import { RequestDetailUIComponent } from './forms/administrations/request/request.detail.ui';
import { RequestManageComponent } from './forms/administrations/request/request.manage';
import { RoomManageComponent } from './forms/administrations/rooms/room.manage';
import { StockITManageComponent } from './forms/administrations/stocks/stock-it.manage';
import { StockManageComponent } from './forms/administrations/stocks/stock.manage';
import { SubTypeManage } from './forms/administrations/sub-types/sub-type.manage';
import { TypeManage } from './forms/administrations/types/type.manage';
import { ActivityManage } from './forms/assets/activities/activity.manage';
import { AppStateManageComponent } from './forms/assets/app-states/app-state.manage';
import { AssetOpRecoManageComponent } from './forms/assets/asset--reco-ops/asset-reco-op-manage';
import { AssetCategoryManageComponent } from './forms/assets/asset-categories/asset-category.manage';
import { AssetClassManageComponent } from './forms/assets/asset-classes/asset-class.manage';
import { AssetComponentManage } from './forms/assets/asset-components/asset-component.manage';
import { AssetNatureManageComponent } from './forms/assets/asset-natures/asset-nature.manage';
import { AssetOpManageComponent } from './forms/assets/asset-ops/asset-op-manage';
import { AssetStateManageComponent } from './forms/assets/asset-states/asset-state.manage';
import { AssetTypeManageComponent } from './forms/assets/asset-types/asset-type.manage';
import { AssetBudgetForecastCorrectionManageComponent } from './forms/assets/assets/asset-budget-forecast-correction.manage';
import { AssetClosedManageComponent } from './forms/assets/assets/asset-closed.manage';
import { AssetEmployeePersonalValidateDetailUIComponent } from './forms/assets/assets/asset-employee-personal-validate.detail.ui';
import { AssetEmployeeDetailUIComponent } from './forms/assets/assets/asset-employee.detail.ui';
import { AssetInvPlusManageComponent } from './forms/assets/assets/asset-inv-plus.manage';
import { AssetInventoryEmployeeValidateManage } from './forms/assets/assets/asset-inventory-employee-validate.manage';
import { AssetInventoryReportComponent } from './forms/assets/assets/asset-inventory-report';
import { AssetInventoryManageComponent } from './forms/assets/assets/asset-inventory.manage';
import { AssetReceptionDetailUIAddComponent } from './forms/assets/assets/asset-reception.detail-add.ui';
import { AssetReceptionManageComponent } from './forms/assets/assets/asset-reception.manage';
import { AssetRejectedManageComponent } from './forms/assets/assets/asset-rejected.manage';
import { AssetScrapManageComponent } from './forms/assets/assets/asset-scrap.manage';
import { AssetToValidateManageComponent } from './forms/assets/assets/asset-to-validate.manage';
import { AssetDetailUIAcquisitionOperationStornoComponent } from './forms/assets/assets/asset.detail-acquisition-operation-storno.ui';
import { AssetDetailUIAddComponent } from './forms/assets/assets/asset.detail-add.ui';
import { AssetDetailChangeUIComponent } from './forms/assets/assets/asset.detail-change.ui';
import { AssetDetailUIOperationCassationComponent } from './forms/assets/assets/asset.detail-operation-cassation.ui';
import { AssetDetailUIOperationCloneTransferComponent } from './forms/assets/assets/asset.detail-operation-clone-transfer.ui';
import { AssetDetailUIOperationStornoMFXComponent } from './forms/assets/assets/asset.detail-operation-storno-mfx.ui';
import { AssetDetailUIOperationStornoComponent } from './forms/assets/assets/asset.detail-operation-storno.ui';
import { AssetDetailUIOperationTransferComponent } from './forms/assets/assets/asset.detail-operation-transfer.ui';
import { AssetDetailUIValidateInvPlusComponent } from './forms/assets/assets/asset.detail-validate-inv-plus.ui';
import { AssetDetailUIValidateComponent } from './forms/assets/assets/asset.detail-validate.ui';
import { AssetDetailUIComponent } from './forms/assets/assets/asset.detail.ui';
import { AssetManageComponent } from './forms/assets/assets/asset.manage';
import { BrandManage } from './forms/assets/brands/brand.manage';
import { CompanyManageComponent } from './forms/assets/companies/company.manage';
import { DimensionManageComponent } from './forms/assets/dimensions/dimension.manage';
import { InsuranceCategoryManage } from './forms/assets/insurance-categories/insurance-category.manage';
import { ModelManage } from './forms/assets/models/model.manage';
import { ProjectTypeManageComponent } from './forms/assets/project-types/project-type.manage';
import { ProjectManage } from './forms/assets/projects/project.manage';
import { RateManageComponent } from './forms/assets/rates/rate.manage';
import { TaxManageComponent } from './forms/assets/taxs/tax.manage';
import { UomManageComponent } from './forms/assets/uoms/uom.manage';
import { IdentityManage } from './forms/auth/identity.manage';
import { BadgeManage } from './forms/common/badge/badge.manage';
import { ColumnDefinitionManageComponent } from './forms/common/column-definition/column-definition.manage';
import { ConfigValuesManage } from './forms/common/config-values.manage';
import { DeviceTypeManage } from './forms/common/device-types/device-type.manage';
import { DeviceManage } from './forms/common/devices/device.manage';
import { EmailStatusDstEmployeeValidatePageComponent } from './forms/common/email-status-dst-employee-validate-page';
import { EmailStatusOrderValidateB1PageComponent } from './forms/common/email-status-order-validate-B1-page';
import { EmailStatusOrderValidateL1PageComponent } from './forms/common/email-status-order-validate-L1-page';
import { EmailStatusOrderValidateL2PageComponent } from './forms/common/email-status-order-validate-L2-page';
import { EmailStatusOrderValidateL3PageComponent } from './forms/common/email-status-order-validate-L3-page';
import { EmailStatusOrderValidateL4PageComponent } from './forms/common/email-status-order-validate-L4-page';
import { EmailStatusOrderValidateS1PageComponent } from './forms/common/email-status-order-validate-S1-page';
import { EmailStatusOrderValidateS2PageComponent } from './forms/common/email-status-order-validate-S2-page';
import { EmailStatusOrderValidateS3PageComponent } from './forms/common/email-status-order-validate-S3-page';
import { ErrorManageComponent } from './forms/common/errors/error.manage';
import { LocationMap } from './forms/common/maps/maps';
import { PermissionRoleManage } from './forms/common/permission-role/permission-role.manage';
import { PermissionTypeManage } from './forms/common/permission-type/permission-type.manage';
import { PermissionManage } from './forms/common/permission/permission.manage';
import { RequestNotValidatePageComponent } from './forms/common/request-not-validate-page';
import { RouteChildManageComponent } from './forms/common/route-child-definition/route-child.manage';
import { RouteManageComponent } from './forms/common/route-definition/route.manage';
import { TableDefinitionManageComponent } from './forms/common/table-definition/table-definition.manage';
import { OperationDetail } from './forms/documents/operations/operation.detail';
import { PartnerManageComponent } from './forms/documents/partners/partner.manage';
import { InfoManageComponent } from './forms/info/info.manage';
import { InvStateManage } from './forms/inventory/inv-state/inv-state.manage';
import { InventoryManage } from './forms/inventory/inventory.manage';
import { OfferTypeManageComponent } from './forms/offers/offer-type/offer-type.manage';
import { OrderTypeManageComponent } from './forms/orders/order-type/order-type.manage';
import { AuthGuard } from './services/auth.guard';
import { DashboardInventoryComponent } from './views/dashboard/dashboard-inventory.component';
import { DashboardOfferComponent } from './views/dashboard/dashboard-offer.component';
import { DashboardOrderComponent } from './views/dashboard/dashboard-order.component';
import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { RequestKanbanManageComponent } from './forms/administrations/request/request-kanban.manage';
import { RequestEditComponent } from './forms/administrations/request/request-edit';
import { RequestBudgetForecastManageComponent } from './forms/administrations/request-budget-forecasts/request-budget-forecast.manage';
import { BudgetForecastCorrectionDetailUIComponent } from './forms/administrations/budget-forecast/budget-forecast-correction.detail.ui';
import { WFHCheckManageComponent } from './forms/wfh/wfh-check/wfh-check.manage';
import { BudgetForecastTransferDetailUIComponent } from './forms/administrations/budget-forecast/budget-forecast-transfer.detail.ui';
import { OrderEditComponent } from './forms/administrations/order/order-edit';
import {FullComponent} from './views/layout/full/full.component';
import {ColumnFilterManageComponent} from './forms/common/column-filter/column-filter.manage';
import { AssetReceptionHistoryManageComponent } from './forms/assets/assets/asset-reception-history.manage';
import { AssetPreValidateManageComponent } from './forms/assets/assets/asset-pre-validate.manage';
import { AssetDetailUIOperationCassationPublicComponent } from './forms/assets/assets/asset.detail-operation-cassation-public.ui';
import { AssetDetailUIPreValidateComponent } from './forms/assets/assets/asset.detail-pre-validate.ui';
import { EmployeeCompanyManage } from './forms/administrations/employee-companies/employee-company.manage';
import { CommitteeMembersComponent } from './forms/inventory/committee-members/committee-members.component';
import { InventoryPlanComponent } from './forms/inventory/inventory-plans/inventory-plans.component';

const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'info', component: InfoManageComponent, data: { title: 'Informatii' }},

      // INFO //

      // DASHBOARD //
      { path: 'dashboard', component: DashboardInventoryComponent, canActivate: [AuthGuard], data: { title: '', auth: 'VIEW|S_DASHBOARD_INVENTORY', shouldDetach: true }},
      // DASHBOARDS //

      // SAP //
      { path: 'sap/errors', component: ErrorManageComponent, canActivate: [AuthGuard], data: {  title: '', auth: 'VIEW|ERRORS', shouldDetach: false }},
      { path: 'sap/rates', component: RateManageComponent, canActivate: [AuthGuard], data: {  title: '', auth: 'VIEW|RATES', shouldDetach: false }},
      // SAP //

      // MAPS //
      { path: 'map', component: LocationMap, canActivate: [AuthGuard], data: { title: 'Harti', auth: 'VIEW|MAP', shouldDetach: true }},

      // MAPS //

      // MATRIX //
      { path: 'matrix/status', component: MatrixManageComponent, canActivate: [AuthGuard], data: { title: 'Matrice', auth: 'VIEW|MATRIX', shouldDetach: true }},
      { path: 'matrix/level', component: LevelManageComponent, canActivate: [AuthGuard], data: { title: 'Niveluri', auth: 'VIEW|LEVELS', shouldDetach: true }},
      { path: 'matrix/mapping', component: MatrixLevelManageComponent, canActivate: [AuthGuard], data: { title: 'Mapare nivel', auth: 'VIEW|MATRIXLEVELS', shouldDetach: true }},
      { path: 'matrix/projects', canActivate: [AuthGuard], component: ProjectManage, data: { title: 'WBS', auth: 'VIEW|PROJECTS', shouldDetach: true }},
      { path: 'matrix/projecttypes', component: ProjectTypeManageComponent, canActivate: [AuthGuard], data: { title: 'Proiecte', auth: 'VIEW|PROJECTTYPES', shouldDetach: true }},
      { path: 'matrix/projecttypedivisions', component: ProjectTypeDivisionManageComponent, canActivate: [AuthGuard], data: { title: 'Proiecte/Departamente', auth: 'VIEW|PROJECTTYPEDIVISIONS', shouldDetach: true }},
      { path: 'matrix/accmonths', canActivate: [AuthGuard], component: AccMonthManageComponent, data: { title: 'Inventare', auth: 'VIEW|ACCMONTHS', shouldDetach: true }},

      // MATRIX //

      // BUDGETS //
      { path: 'budget/report', component: BudgetManage, canActivate: [AuthGuard], data: { title: '', auth: 'VIEW|BUDGETBASE', shouldDetach: true }},
      { path: 'budgetbase/:id', component: BudgetBaseDetailUIComponent, canActivate: [AuthGuard], data: {  title: '', auth: 'EDIT|BUDGETBASE', shouldDetach: false }},
      { path: 'budgetbaseadd/new', component: BudgetBaseAddDetailUIComponent, canActivate: [AuthGuard], data: {  title: '', auth: 'ADD|BUDGETBASE', shouldDetach: false }},
      { path: 'budget/status', component: BudgetBaseManageComponent, canActivate: [AuthGuard], data: { title: 'Detalii buget freeze', auth: 'VIEW|BUDGETBASE', shouldDetach: true }},
      { path: 'budget/month', component: BudgetMonthBaseManageComponent, canActivate: [AuthGuard], data: { title: 'Buget / luni - freeze', auth: 'VIEW|BUDGETMONTHBASE', shouldDetach: true }},
      { path: 'budget/forecast', component: BudgetForecastManageComponent, canActivate: [AuthGuard], data: { title: '', auth: 'VIEW|BUDGETFORECAST', shouldDetach: true }},
      { path: 'budgetforecast/:id', component: BudgetForecastDetailUIComponent, canActivate: [AuthGuard], data: {  title: '', auth: 'EDIT|BUDGETBASE', shouldDetach: false }},
      { path: 'budgetforecastcorrection/:id', component: BudgetForecastCorrectionDetailUIComponent, canActivate: [AuthGuard], data: {  title: '', auth: 'EDIT|BUDGETBASE', shouldDetach: false }},
      { path: 'budgetforecasttransfer/:id', component: BudgetForecastTransferDetailUIComponent, canActivate: [AuthGuard], data: {  title: '', auth: 'TRANSFER|BUDGETBASE', shouldDetach: false }},
      { path: 'budget/correction', canActivate: [AuthGuard], component: AssetBudgetForecastCorrectionManageComponent, data: { title: '', auth: 'VIEW|ASSET', shouldDetach: true}, },
      { path: 'budget/needvalue', canActivate: [AuthGuard], component: RequestBudgetForecastManageComponent, data: { title: '', auth: 'VIEW|BUDGETFORECAST', shouldDetach: true}, },
      // BUDGETS //

      // PROCUREMENT //
      { path: 'procurement/request', canActivate: [AuthGuard], component: RequestManageComponent, data: { title: 'PR', auth: 'VIEW|REQUEST', shouldDetach: true}},
      { path: 'procurement/request/edit/:id', component: RequestEditComponent, canActivate: [AuthGuard], data: { title: '', auth: 'EDIT|REQUEST', shouldDetach: false }},
      { path: 'procurement/request/new', component: RequestDetailUIComponent, canActivate: [AuthGuard], data: { title: '', auth: 'ADD|REQUEST', shouldDetach: false }},
      { path: 'procurement/catalog', canActivate: [AuthGuard], component: MaterialManageComponent, data: { title: '', auth: 'VIEW|MATERIALS', shouldDetach: false }},
      { path: 'procurement/partners', canActivate: [AuthGuard], component: PartnerManageComponent, data: { title: 'Suppliers', auth: 'VIEW|PARTNERS', shouldDetach: true }},
      { path: 'procurement/kanban', canActivate: [AuthGuard], component: RequestKanbanManageComponent, data: { title: 'Suppliers', auth: 'VIEW|PARTNERS', shouldDetach: true }},

      { path: 'requestbudgetnotvalidate/:guidRequest/:id', component: RequestNotValidatePageComponent, data: { title: 'Refuz tichet buget' }},
      { path: 'requestbudgetnotvalidate', component: RequestNotValidatePageComponent, data: { title: 'Refuz buget' }},
      // OFFERS //

      { path: 'procurement/offer/status', canActivate: [AuthGuard], component: OfferManage, data: { title: '', auth: 'VIEW|S_OFFER_STATUS', shouldDetach: true }},
      { path: 'procurement/offer/email', canActivate: [AuthGuard], component: EmailManagerManageComponent, data: { title: '', auth: 'VIEW|S_OFFER_EMAIL', shouldDetach: true }},
      { path: 'procurement/offer/:id', component: OfferDetailUIComponent, canActivate: [AuthGuard], data: { title: '', auth: 'EDIT|OFFER', shouldDetach: false }},
      { path: 'procurement/offer/new', component: OfferDetailUIComponent, canActivate: [AuthGuard], data: { title: '', auth: 'ADD|OFFER', shouldDetach: false }},
      { path: 'offermaterials', canActivate: [AuthGuard], component: OfferMaterialManageComponent, data: { title: '', auth: 'VIEW|OFFERMATERIALS', shouldDetach: true }},
      { path: 'ordermaterials', canActivate: [AuthGuard], component: OrderMaterialManageComponent, data: { title: '', auth: 'VIEW|ORDERMATERIALS', shouldDetach: true }},
      { path: 'procurement/ordertypes', component: OrderTypeManageComponent, canActivate: [AuthGuard], data: { title: '', auth: 'VIEW|ORDERTYPES', shouldDetach: false }},
      { path: 'procurement/offertypes', component: OfferTypeManageComponent, canActivate: [AuthGuard], data: { title: '', auth: 'VIEW|OFFERTYPES', shouldDetach: false }},
      // OFFERS //

      // ORDERS //
      { path: 'procurement/order', canActivate: [AuthGuard], component: OrderManageComponent, data: { title: '', auth: 'VIEW|ORDER', shouldDetach: true}},
      { path: 'procurement/order/edit/:id', component: OrderEditComponent, canActivate: [AuthGuard], data: { title: '', auth: 'EDIT|REQUEST', shouldDetach: false }},
      { path: 'procurement/order/:id', component: OrderDetailUIComponent, canActivate: [AuthGuard], data: { title: '', auth: 'ADD|ORDER', shouldDetach: false }},
      { path: 'procurement/orderchange/:id', component: OrderEditDetailUIComponent, canActivate: [AuthGuard], data: { title: '', auth: 'EDIT|ORDER', shouldDetach: false }},
      { path: 'procurement/order/new', component: OrderDetailUIComponent, canActivate: [AuthGuard], data: { title: '', auth: 'ADD|ORDER', shouldDetach: false }},

      // ORDERS //

      // CONTRACTS //

      { path: 'procurement/contract/status', canActivate: [AuthGuard], component: ContractManageComponent, data: { title: '', auth: 'VIEW|S_CONTRACT_STATUS', shouldDetach: true }},
      { path: 'procurement/contract/:id', component: ContractDetailUIComponent, canActivate: [AuthGuard], data: { title: '', auth: 'EDIT|CONTRACT', shouldDetach: false }},
      { path: 'procurement/contract/new', component: ContractDetailUIComponent, canActivate: [AuthGuard], data: { title: '', auth: 'ADD|CONTRACT', shouldDetach: false }},

      // CONTRACTS //

      // PROCUREMENT //

      // ASSET //
      { path: 'asset', component: AssetManageComponent, canActivate: [AuthGuard], data: { title: '', auth: 'VIEW|ASSET', shouldDetach: true}},
      { path: 'asset/scrap', canActivate: [AuthGuard], component: AssetScrapManageComponent, data: { title: '', auth: 'VIEW|ASSET', shouldDetach: true}, },
      { path: 'asset/closed', canActivate: [AuthGuard], component: AssetClosedManageComponent, data: { title: '',auth: 'VIEW|ASSET',  shouldDetach: true}, },
      { path: 'asset/invplus', canActivate: [AuthGuard], component: AssetInvPlusManageComponent, data: { title: '',auth: 'VIEW|ASSET',  shouldDetach: true}, },
      { path: 'asset/inuse', canActivate: [AuthGuard], component: AssetManageComponent, data: { title: '', auth: 'VIEW|ASSET', shouldDetach: true}, },
      { path: 'asset/rejected', canActivate: [AuthGuard], component: AssetRejectedManageComponent, data: { title: '', auth: 'VIEW|ASSET', shouldDetach: true}, },
      { path: 'asset/reception', canActivate: [AuthGuard], component: AssetReceptionManageComponent, data: { title: '', auth: 'VIEW|ASSET', shouldDetach: true}, },
      { path: 'asset/validate', canActivate: [AuthGuard], component: AssetToValidateManageComponent, data: { title: '', auth: 'VIEW|ASSET', shouldDetach: true}},
      { path: 'assetprevalidate/:id', canActivate: [AuthGuard], component: AssetDetailUIPreValidateComponent, data: { title: '', auth: 'EDIT|ASSET', shouldDetach: false }},
      { path: 'asset/newoperation', canActivate: [AuthGuard],  component: OperationDetail, data: {  title: '', auth: 'ADD_TRANSFER|ASSET', shouldDetach: false }},
      { path: 'asset/:id', canActivate: [AuthGuard], component: AssetDetailUIAddComponent, data: { title: '', auth: 'EDIT|ASSET', shouldDetach: false }},
      { path: 'assetreception/:id', canActivate: [AuthGuard], component: AssetReceptionDetailUIAddComponent, data: { title: '', auth: 'EDIT|ASSET', shouldDetach: false }},
      { path: 'asset/history/reception', canActivate: [AuthGuard], component: AssetReceptionHistoryManageComponent, data: { title: '', auth: 'VIEW|ASSET', shouldDetach: true}, },
      { path: 'asset/pre/validate', canActivate: [AuthGuard], component: AssetPreValidateManageComponent, data: { title: '', auth: 'VIEW|ASSET', shouldDetach: true}},
      { path: 'assetdetail/:id', canActivate: [AuthGuard], component: AssetDetailUIComponent, data: { title: '', auth: 'EDIT|ASSET', shouldDetach: false }},
      { path: 'assetvalidate/:id', canActivate: [AuthGuard], component: AssetDetailUIValidateComponent, data: { title: '', auth: 'EDIT|ASSET', shouldDetach: false }},
      { path: 'assetedit/:id', canActivate: [AuthGuard], component: AssetDetailChangeUIComponent, data: { title: '', auth: 'EDIT|ASSET', shouldDetach: false }},
      { path: 'assetvalidateinvplus/:id', canActivate: [AuthGuard], component: AssetDetailUIValidateInvPlusComponent, data: { title: '', auth: 'EDIT|ASSET', shouldDetach: false }},
      { path: 'assetoperation/:id', canActivate: [AuthGuard], component: AssetDetailUIOperationTransferComponent, data: { title: '', auth: 'EDIT|ASSET', shouldDetach: false }},
      { path: 'assetclone/:id', canActivate: [AuthGuard], component: AssetDetailUIOperationCloneTransferComponent, data: { title: '', auth: 'EDIT|ASSET', shouldDetach: false }},
      { path: 'assetretire/:id', canActivate: [AuthGuard], component: AssetDetailUIOperationCassationComponent, data: { title: '', auth: 'EDIT|ASSET', shouldDetach: false }},
      { path: 'assetpublicretire/:id', canActivate: [AuthGuard], component: AssetDetailUIOperationCassationPublicComponent, data: { title: '', auth: 'CASSATION|ASSET', shouldDetach: false }},
      { path: 'assetstorno/:id', canActivate: [AuthGuard], component: AssetDetailUIOperationStornoComponent, data: { title: '', auth: 'EDIT|ASSET', shouldDetach: false }},
      { path: 'assetstornomfx/:id', canActivate: [AuthGuard], component: AssetDetailUIOperationStornoMFXComponent, data: { title: '', auth: 'EDIT|ASSET', shouldDetach: false }},
      { path: 'assetacquisitionstorno/:id', canActivate: [AuthGuard], component: AssetDetailUIAcquisitionOperationStornoComponent, data: { title: '', auth: 'EDIT|ASSET', shouldDetach: false }},
      { path: 'asset/new', canActivate: [AuthGuard], component: AssetDetailUIAddComponent, data: { title: '', auth: 'ADD|ASSET', shouldDetach: false }},
      // ASSET //

    
      { path: 'stock/initial', canActivate: [AuthGuard], component: StockITManageComponent, data: { title: 'Materiale', auth: 'VIEW|STOCKS', shouldDetach: true }},
      // STOCK //

      // ASSETCOMPONENT //

      { path: 'assetcomponent', canActivate: [AuthGuard], component: AssetComponentManage, data: { title: 'Accesorii', auth: 'VIEW|COMPONENT', shouldDetach: true }},

      // ASSETCOMPONENT //

      // EMPLOYEE //
      { path: 'employee', canActivate: [AuthGuard], component: EmployeeManageComponent, data: { title: 'Angajati', auth: 'VIEW|EMPLOYEES', shouldDetach: true }},
      { path: 'employee/:id', component: EmployeeDetailUIComponent, canActivate: [AuthGuard], data: { title: '', auth: 'OPERATION|EMPLOYEES', shouldDetach: false }},
      { path: 'employeecostcenters', canActivate: [AuthGuard], component: EmployeeCostCenterManage, data: { title: 'Angajati/ CC', auth: 'VIEW|EMPLOYEECOSTCENTERS', shouldDetach: true }},
      { path: 'employeecompanies', canActivate: [AuthGuard], component: EmployeeCompanyManage, data: { title: 'Angajati/ Companii', auth: 'VIEW|EMPLOYEECOMPANIES', shouldDetach: true }},

      // EMPLOYEE //

      // WFH //

      // { path: 'wfh/assets', canActivate: [AuthGuard], component: AssetEmployeeDetailUIComponent, data: { title: '', auth: 'VIEW|S_WFH_VALIDATE', shouldDetach: true }},
      { path: 'wfh/validate', canActivate: [AuthGuard], component: AssetEmployeePersonalValidateDetailUIComponent, data: { title: '', auth: 'VIEW|S_WFH_VALIDATE', shouldDetach: true }},
      // WFH //

      // INVENTORIES //
      { path: 'inventory/status', canActivate: [AuthGuard], component: AssetInventoryManageComponent, data: { title: 'Status', auth: 'VIEW|S_INVENTORY_STATUS', shouldDetach: true }},
      { path: 'inventory/report', canActivate: [AuthGuard], component: AssetInventoryReportComponent, data: { title: 'Rapoarte', auth: 'VIEW|S_INVENTORY_REPORT', shouldDetach: true }},
      { path: 'inventory/inventory-plans', canActivate: [AuthGuard], component: InventoryPlanComponent, data: { title: 'Planficare Inventar', auth: 'VIEW|INVENTORY_PLAN', shouldDetach: true }},
      { path: 'inventory/recos', canActivate: [AuthGuard], component: AssetOpRecoManageComponent, data: { title: 'Reconcilieri', auth: 'VIEW|OPERATION', shouldDetach: true }},
      // INVENTORIES //



      // OPRATIONS //
      { path: 'operation', canActivate: [AuthGuard], component: AssetOpManageComponent, data: { title: 'Operatii', auth: 'VIEW|OPERATION', shouldDetach: true }},

      // OPERATIONS //

      // ADMIN //
      { path: 'admin', canActivate: [AuthGuard], component: IdentityManage, data: { title: 'Admin', auth: 'VIEW|ADMIN', shouldDetach: true }},

      // ADMIN //

      // CONFIGS //
      { path: 'config/global', component: ConfigValuesManage, data: { title: 'Global'}},
      { path: 'config/table', component: TableDefinitionManageComponent, data: { title: 'Table' }},
      { path: 'config/column', component: ColumnDefinitionManageComponent, data: { title: 'Coloane'}},
      { path: 'config/columnfilters', component: ColumnFilterManageComponent, data: { title: 'Filtre coloana'}},
      { path: 'config/permissiontype', component: PermissionTypeManage, data: { title: 'Ecran' }},
      { path: 'config/permission', component: PermissionManage, data: { title: 'Permisiuni' }},
      { path: 'config/permissionrole', component: PermissionRoleManage, data: { title: 'Permisiuni/Roluri' }},

      // CONFIGS //

      // ROUTES //
      { path: 'routes/parent', component: RouteManageComponent, data: { title: 'Parinte', shouldDetach: true}},
      { path: 'routes/children', component: RouteChildManageComponent, data: { title: 'Copil', shouldDetach: true }},
      { path: 'routes/badge', component: BadgeManage, data: { title: 'Badges', shouldDetach: true}},

      // ROUTES //

      // NOMENCLATURES //
      { path: 'nom/levels', canActivate: [AuthGuard], component: LevelManageComponent, data: { title: 'Level', auth: 'VIEW|LEVELS', shouldDetach: true }},
      { path: 'nom/inventories', canActivate: [AuthGuard], component: InventoryManage, data: { title: 'Inventare', auth: 'VIEW|INVENTORIES', shouldDetach: true }},
      { path: 'nom/appstates', canActivate: [AuthGuard], component: AppStateManageComponent, data: { title: 'Stari', auth: 'VIEW|APPSTATES', shouldDetach: true }},
      { path: 'nom/companies', canActivate: [AuthGuard], component: CompanyManageComponent, data: { title: 'Categorii', auth: 'VIEW|COMPANIES', shouldDetach: true }},
      { path: 'nom/assetnatures', canActivate: [AuthGuard], component: AssetNatureManageComponent, data: { title: 'Culori', auth: 'VIEW|ASSETNATURES', shouldDetach: true }},
      { path: 'nom/invstates', canActivate: [AuthGuard], component: InvStateManage, data: { title: 'Stari', auth: 'VIEW|INVSTATES', shouldDetach: true }},
      { path: 'nom/assetstates', canActivate: [AuthGuard], component: AssetStateManageComponent, data: { title: 'Tipuri operatii', auth: 'VIEW|ASSETSTATES', shouldDetach: true }},
      { path: 'nom/counties', canActivate: [AuthGuard], component: CountyManageComponent, data: { title: 'Judete', auth: 'VIEW|COUNTIES', shouldDetach: true}},
      { path: 'nom/cities', canActivate: [AuthGuard], component: CityManageComponent, data: { title: 'Orase', auth: 'VIEW|CITIES', shouldDetach: true }},
      { path: 'nom/locations', canActivate: [AuthGuard], component: LocationManageComponent, data: { title: 'Adrese', auth: 'VIEW|LOCATIONS', shouldDetach: true}},
      { path: 'nom/rooms', canActivate: [AuthGuard], component: RoomManageComponent, data: { title: 'Adrese 2',auth: 'VIEW|ROOMS', shouldDetach: true}},
      { path: 'nom/assetcategories', canActivate: [AuthGuard], component: AssetCategoryManageComponent, data: { title: 'Asset classification', auth: 'VIEW|ASSETCATEGORIES', shouldDetach: true }},
      { path: 'nom/costcenters', canActivate: [AuthGuard], component: CostCenterManageComponent, data: { title: 'Centre de cost', auth: 'VIEW|COSTCENTERS', shouldDetach: true }},
      { path: 'nom/admcenters', canActivate: [AuthGuard], component: AdmCenterManageComponent, data: { title: 'Profit centers', auth: 'VIEW|ADMCENTERS', shouldDetach: true }},
      { path: 'nom/regions', canActivate: [AuthGuard], component: RegionManageComponent, data: { title: 'PC detaliu', auth: 'VIEW|REGIONS', shouldDetach: true }},
      { path: 'nom/departments', canActivate: [AuthGuard], component: DepartmentManageComponent, data: { title: 'Departamente', auth: 'VIEW|DEPARTMENTS', shouldDetach: true }},
      { path: 'nom/divisions', canActivate: [AuthGuard], component: DivisionManageComponent, data: { title: 'Divizii', auth: 'VIEW|DIVISIONS', shouldDetach: true }},
      { path: 'nom/administrations', canActivate: [AuthGuard], component: AdministrationManageComponent, data: { title: 'Locatii', auth: 'VIEW|ADMINISTRATIONS', shouldDetach: true}},
      { path: 'nom/countries', canActivate: [AuthGuard], component: CountryManageComponent, data: { title: 'Tari', auth: 'VIEW|COUNTRIES', shouldDetach: true }},
      { path: 'nom/budgetmanagers', canActivate: [AuthGuard], component: BudgetManagerManage, data: { title: 'FY Start', auth: 'VIEW|BUDGETMANAGERS', shouldDetach: true}},
      { path: 'nom/assetnatures', canActivate: [AuthGuard], component: AssetNatureManageComponent, data: { title: 'Cont CM', auth: 'VIEW|ASSETNATURES', shouldDetach: true }},
      // { path: 'nom/mastertypes', canActivate: [AuthGuard], component: MasterTypeManageComponent, data: { title: 'PC', auth: 'VIEW|MASTERTYPES', shouldDetach: true }},
      { path: 'nom/types', canActivate: [AuthGuard], component: TypeManage, data: { title: 'Supracategorii', auth: 'VIEW|TYPES', shouldDetach: true }},
      { path: 'nom/subtypes', canActivate: [AuthGuard], component: SubTypeManage, data: { title: 'Tipuri active', auth: 'VIEW|SUBTYPES', shouldDetach: true }},
      { path: 'nom/assetclasses', canActivate: [AuthGuard], component: AssetClassManageComponent, data: { title: 'Clasificari', auth: 'VIEW|ASSETCLASSES', shouldDetach: true}},
      { path: 'nom/dictionarytypes', canActivate: [AuthGuard], component: DictionaryTypeManageComponent, data: { title: 'Tip dictionar', auth: 'VIEW|DICTIONARYTYPES', shouldDetach: true}},
      { path: 'nom/uoms', canActivate: [AuthGuard], component: UomManageComponent, data: { title: 'Simboluri', auth: 'VIEW|UOMS', shouldDetach: true }},
      { path: 'nom/dimensions', canActivate: [AuthGuard], component: DimensionManageComponent, data: { title: 'Dimensiuni', auth: 'VIEW|DIMENSIONS', shouldDetach: true}},
      { path: 'nom/insurancecategories', canActivate: [AuthGuard], component: InsuranceCategoryManage, data: { title: 'BS', auth: 'VIEW|INSURANCECATEGORIES', shouldDetach: true }},
      { path: 'nom/assettypes', canActivate: [AuthGuard], component: AssetTypeManageComponent, data: { title: 'Tipuri', auth: 'VIEW|ASSETTYPES', shouldDetach: true }},
      { path: 'nom/activities', canActivate: [AuthGuard], component: ActivityManage, data: { title: 'WBS', auth: 'VIEW|ACTIVITIES', shouldDetach: true }},
      { path: 'nom/taxs', canActivate: [AuthGuard], component: TaxManageComponent, data: { title: 'Tax', auth: 'VIEW|TAXS', shouldDetach: true }},
      { path: 'nom/devicetypes', canActivate: [AuthGuard], component: DeviceTypeManage, data: { title: 'OS', auth: 'VIEW|DEVICETYPES', shouldDetach: true }},
      { path: 'nom/devices', canActivate: [AuthGuard], component: DeviceManage, data: { title: 'OS', auth: 'VIEW|DEVICES', shouldDetach: true }},

      // NOMENCLATURES //
    ]
  },
  // EMAIL STATUS //
  { path: 'dstemployeevalidate', component: EmailStatusDstEmployeeValidatePageComponent, data: { title: 'Validare angajat' }},
  { path: 'ordervalidateB1/:guid', component: EmailStatusOrderValidateB1PageComponent, data: { title: 'Validare B1' }},
  { path: 'ordervalidateL4/:guid', component: EmailStatusOrderValidateL4PageComponent, data: { title: 'Validare L4' }},
  { path: 'ordervalidateL3/:guid', component: EmailStatusOrderValidateL3PageComponent, data: { title: 'Validare L3' }},
  { path: 'ordervalidateL2/:guid', component: EmailStatusOrderValidateL2PageComponent, data: { title: 'Validare L2' }},
  { path: 'ordervalidateL1/:guid', component: EmailStatusOrderValidateL1PageComponent, data: { title: 'Validare L1' }},
  { path: 'ordervalidateS3/:guid', component: EmailStatusOrderValidateS3PageComponent, data: { title: 'Validare S3' }},
  { path: 'ordervalidateS2/:guid', component: EmailStatusOrderValidateS2PageComponent, data: { title: 'Validare S2' }},
  { path: 'ordervalidateS1/:guid', component: EmailStatusOrderValidateS1PageComponent, data: { title: 'Validare S1' }},

  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '**',
    component: P404Component
  },
];

// export const AppRoutes: Routes = [
//   {
//     path: '',
//     redirectTo: 'login',
//     pathMatch: 'full',
//   },
//   {
//     path: '404',
//     component: P404Component,
//     data: {
//       title: 'Page 404'
//     }
//   },
//   {
//     path: '500',
//     component: P500Component,
//     data: {
//       title: 'Page 500'
//     }
//   },
//   {
//     path: 'login',
//     component: LoginComponent,
//     data: {
//       title: 'Login Page'
//     }
//   },
//   {
//     path: 'register',
//     component: RegisterComponent,
//     data: {
//       title: 'Register Page'
//     }
//   },
//   // {
//   //   path: '',
//   //   component: DefaultLayoutComponent,
//   //   data: {
//   //     title: ''
//   //   },
//   //   children: [
//   //     // {
//   //     //   path: 'base',
//   //     //   loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
//   //     // },
//   //     // {
//   //     //   path: 'buttons',
//   //     //   loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule)
//   //     // },
//   //     // {
//   //     //   path: 'charts',
//   //     //   loadChildren: () => import('./views/chartjs/chartjs.module').then(m => m.ChartJSModule)
//   //     // },
//   //     // {
//   //     //   path: 'dashboard',
//   //     //   loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
//   //     // },
//   //     // {
//   //     //   path: 'map',
//   //     //   loadChildren: () => import('./views/maps/maps.module').then(m => m.MapsModule)
//   //     // },
//   //     // {
//   //     //   path: 'floor',
//   //     //   loadChildren: () => import('./views/floors/floors.module').then(m => m.FloorsModule)
//   //     // },
//   //     // {
//   //     //   path: 'budget',
//   //     //   loadChildren: () => import('./views/budgets/budgets.module').then(m => m.BudgetsModule)
//   //     // },
//   //     // {
//   //     //   path: 'offer',
//   //     //   loadChildren: () => import('./views/offers/offers.module').then(m => m.OffersModule)
//   //     // },
//   //     // {
//   //     //   path: 'order',
//   //     //   loadChildren: () => import('./views/orders/orders.module').then(m => m.OrdersModule)
//   //     // },
//   //     // {
//   //     //   path: 'asset',
//   //     //   loadChildren: () => import('./views/assets/assets.module').then(m => m.AssetsModule)
//   //     // },
//   //     // {
//   //     //   path: 'assetcomponent',
//   //     //   loadChildren: () => import('./views/assetcomponents/assetcomponents.module').then(m => m.AssetComponentsModule)
//   //     // },
//   //     // {
//   //     //   path: 'employee',
//   //     //   loadChildren: () => import('./views/employees/employees.module').then(m => m.EmployeesModule)
//   //     // },
//   //     // {
//   //     //   path: 'wfh',
//   //     //   loadChildren: () => import('./views/wfhs/wfhs.module').then(m => m.WfhsModule)
//   //     // },
//   //     // {
//   //     //   path: 'inventory',
//   //     //   loadChildren: () => import('./views/inventories/inventories.module').then(m => m.InventoriesModule)
//   //     // },
//   //     // {
//   //     //   path: 'email',
//   //     //   loadChildren: () => import('./views/emails/emails.module').then(m => m.EmailsModule)
//   //     // },
//   //     // {
//   //     //   path: 'operation',
//   //     //   loadChildren: () => import('./views/operations/operations.module').then(m => m.OperationsModule)
//   //     // },
//   //     // {
//   //     //   path: 'admin',
//   //     //   loadChildren: () => import('./views/admin/admin.module').then(m => m.AdminModule)
//   //     // },
//   //     // {
//   //     //   path: 'icons',
//   //     //   loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
//   //     // },
//   //     // {
//   //     //   path: 'notifications',
//   //     //   loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule)
//   //     // },
//   //     // {
//   //     //   path: 'configs',
//   //     //   loadChildren: () => import('./views/configs/configs.module').then(m => m.ConfigsModule)
//   //     // },
//   //     // {
//   //     //   path: 'routes',
//   //     //   loadChildren: () => import('./views/routes/routes.module').then(m => m.RoutesModule)
//   //     // },
//   //     // {
//   //     //   path: 'nomenclatures',
//   //     //   loadChildren: () => import('./views/nomenclatures/nomenclatures.module').then(m => m.NomenclaturesModule)
//   //     // },
//   //     // {
//   //     //   path: 'theme',
//   //     //   loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule)
//   //     // },
//   //     // {
//   //     //   path: 'widgets',
//   //     //   loadChildren: () => import('./views/widgets/widgets.module').then(m => m.WidgetsModule)
//   //     // }
//   //   ]
//   // },
//
//   // INFO //
//
//   { path: 'info', component: InfoManageComponent, data: { title: 'Informatii' }},
//
//   // INFO //
//
//   // DASHBOARD //
//
//   { path: 'dashboard/assets', component: DashboardAssetComponent, canActivate: [AuthGuard], data: { title: '', auth: 'VIEW|S_DASHBOARD_BUDGET', shouldDetach: true }},
//  // { path: 'dashboard/budget', component: DashboardBudgetForeComponent, canActivate: [AuthGuard], data: { title: '', auth: 'VIEW|S_DASHBOARD_BUDGET', shouldDetach: true }},
//   { path: 'dashboard/budgetasset', component: DashboardBudgetAssetComponent, canActivate: [AuthGuard], data: { title: '', auth: 'VIEW|S_DASHBOARD_BUDGET', shouldDetach: true }},
//   { path: 'dashboard/offer', component: DashboardOfferComponent, canActivate: [AuthGuard], data: { title: '', auth: 'VIEW|S_DASHBOARD_OFFER', shouldDetach: true }},
//   { path: 'dashboard/order', component: DashboardOrderComponent, canActivate: [AuthGuard], data: { title: '', auth: 'VIEW|S_DASHBOARD_ORDER', shouldDetach: true }},
//   { path: 'dashboard/inventory', component: DashboardInventoryComponent, canActivate: [AuthGuard], data: { title: '', auth: 'VIEW|S_DASHBOARD_INVENTORY', shouldDetach: true }},
//   { path: 'dashboard/inventorywarehouse', component: DashboardWarehouseInventoryComponent, canActivate: [AuthGuard], data: { title: '', auth: 'VIEW|S_DASHBOARD_INVENTORY_WH', shouldDetach: true }},
//   { path: 'dashboard/inventorymarkwarehouse', component: DashboardInventoryWHMarkComponent, canActivate: [AuthGuard], data: { title: '', auth: 'VIEW|S_DASHBOARD_INVENTORY_MARK_WH', shouldDetach: true }},
//   { path: 'dashboard/inventorymark', component: DashboardInventoryMarkComponent, canActivate: [AuthGuard], data: { title: '', auth: 'VIEW|S_DASHBOARD_INVENTORY_MARK', shouldDetach: true }},
//   { path: 'dashboard/userstatus', component: DashboardUserStatusComponent, canActivate: [AuthGuard], data: { title: '', auth: 'VIEW|S_DASHBOARD_INVENTORY_MARK', shouldDetach: true }},
//
//   // DASHBOARDS //
//
//     // SAP //
//
//     { path: 'sap', component: AmortizationManageComponent, canActivate: [AuthGuard], data: { title: '', auth: 'VIEW|AMORTIZATIONS', shouldDetach: true }},
//     { path: 'sap/createassetsap', component: CreateAssetSAPManageComponent, canActivate: [AuthGuard], data: {  title: '', auth: 'VIEW|CREATEASSETSAPS', shouldDetach: false }},
//     { path: 'sap/aquisitionassetsap', component: AquisitionAssetSAPManageComponent, canActivate: [AuthGuard], data: {  title: '', auth: 'VIEW|AQUISITIONASSETSAPS', shouldDetach: false }},
//     { path: 'sap/assetchangesap', component: AssetChangeSAPManageComponent, canActivate: [AuthGuard], data: {  title: '', auth: 'VIEW|ASSETCHANGESAPS', shouldDetach: false }},
//     { path: 'sap/assetinvminussap', component: AssetInvMinusSAPManageComponent, canActivate: [AuthGuard], data: {  title: '', auth: 'VIEW|ASSETINVMINUSSAPS', shouldDetach: false }},
//     { path: 'sap/assetinvplussap', component: AssetInvPlusSAPManageComponent, canActivate: [AuthGuard], data: {  title: '', auth: 'VIEW|ASSETINVPLUSSAPS', shouldDetach: false }},
//     { path: 'sap/retireassetsap', component: RetireAssetSAPManageComponent, canActivate: [AuthGuard], data: {  title: '', auth: 'VIEW|RETIREASSETSAPS', shouldDetach: false }},
//     { path: 'sap/transferassetsap', component: TransferAssetSAPManageComponent, canActivate: [AuthGuard], data: {  title: '', auth: 'VIEW|TRANSFERASSETSAPS', shouldDetach: false }},
//     { path: 'sap/transferinstocksap', component: TransferInStockSAPManageComponent, canActivate: [AuthGuard], data: {  title: '', auth: 'VIEW|TRANSFERINSTOCKSAPS', shouldDetach: false }},
//     { path: 'sap/amortization', component: AmortizationManageComponent, canActivate: [AuthGuard], data: {  title: '', auth: 'VIEW|AMORTIZATIONS', shouldDetach: false }},
//     { path: 'sap/capamortization', component: CapAmortizationManageComponent, canActivate: [AuthGuard], data: {  title: '', auth: 'VIEW|CAPAMORTIZATIONS', shouldDetach: false }},
//     { path: 'sap/errors', component: ErrorManageComponent, canActivate: [AuthGuard], data: {  title: '', auth: 'VIEW|ERRORS', shouldDetach: false }},
//     { path: 'sap/rates', component: RateManageComponent, canActivate: [AuthGuard], data: {  title: '', auth: 'VIEW|RATES', shouldDetach: false }},
//
//     // SAP //
//
//   // MAPS //
//
//   { path: 'map', component: LocationMap, canActivate: [AuthGuard], data: { title: 'Harti', auth: 'VIEW|MAP', shouldDetach: true }},
//
//   // MAPS //
//
//     // MATRIX //
//
//     { path: 'matrix/status', component: MatrixManageComponent, canActivate: [AuthGuard], data: { title: 'Matrice', auth: 'VIEW|MATRIX', shouldDetach: true }},
//     { path: 'matrix/areas', canActivate: [AuthGuard], component: AreaManageComponent, data: { title: 'Area', auth: 'VIEW|AREAS', shouldDetach: true }},
//     { path: 'matrix/storages', canActivate: [AuthGuard], component: StorageManageComponent, data: { title: 'Storage', auth: 'VIEW|STORAGES', shouldDetach: true }},
//     { path: 'matrix/level', component: LevelManageComponent, canActivate: [AuthGuard], data: { title: 'Niveluri', auth: 'VIEW|LEVELS', shouldDetach: true }},
//     { path: 'matrix/mapping', component: MatrixLevelManageComponent, canActivate: [AuthGuard], data: { title: 'Mapare nivel', auth: 'VIEW|MATRIXLEVELS', shouldDetach: true }},
//     { path: 'matrix/projects', canActivate: [AuthGuard], component: ProjectManage, data: { title: 'WBS', auth: 'VIEW|PROJECTS', shouldDetach: true }},
//     { path: 'matrix/projecttypes', component: ProjectTypeManageComponent, canActivate: [AuthGuard], data: { title: 'Proiecte', auth: 'VIEW|PROJECTTYPES', shouldDetach: true }},
//     { path: 'matrix/projecttypedivisions', component: ProjectTypeDivisionManageComponent, canActivate: [AuthGuard], data: { title: 'Proiecte/Departamente', auth: 'VIEW|PROJECTTYPEDIVISIONS', shouldDetach: true }},
//     { path: 'matrix/accountancies', canActivate: [AuthGuard], component: AccountancyManageComponent, data: { title: 'Inventare', auth: 'VIEW|ACCOUNTANCIES', shouldDetach: true }},
//     { path: 'matrix/intercompanies', canActivate: [AuthGuard], component: InterCompanyManageComponent, data: { title: 'Supracategorii TRN', auth: 'VIEW|INTERCOMPANIES', shouldDetach: true }},
//     { path: 'matrix/intercompaniesen', canActivate: [AuthGuard], component: InterCompanyENManageComponent, data: { title: 'Supracategorii EN', auth: 'VIEW|INTERCOMPANIESEN', shouldDetach: true }},
//     { path: 'matrix/categories', canActivate: [AuthGuard], component: CategoryManageComponent, data: { title: 'Categorii', auth: 'VIEW|CATEGORIES', shouldDetach: true }},
//     { path: 'matrix/subcategories', canActivate: [AuthGuard], component: SubCategoryManageComponent, data: { title: 'SubCategorii', auth: 'VIEW|SUBCATEGORIES', shouldDetach: true }},
//     { path: 'matrix/categoriesen', canActivate: [AuthGuard], component: CategoryENManageComponent, data: { title: 'Categorii EN', auth: 'VIEW|CATEGORIESEN', shouldDetach: true }},
//     { path: 'matrix/subcategoriesen', canActivate: [AuthGuard], component: SubCategoryENManageComponent, data: { title: 'SubCategorii EN', auth: 'VIEW|SUBCATEGORIESEN', shouldDetach: true }},
//     { path: 'matrix/accmonths', canActivate: [AuthGuard], component: AccMonthManageComponent, data: { title: 'Inventare', auth: 'VIEW|ACCMONTHS', shouldDetach: true }},
//
//     // MATRIX //
//
//   // BUDGETS //
//
//   { path: 'budget/report', component: BudgetManage, canActivate: [AuthGuard], data: { title: '', auth: 'VIEW|BUDGETBASE', shouldDetach: true }},
//   { path: 'budgetbase/:id', component: BudgetBaseDetailUIComponent, canActivate: [AuthGuard], data: {  title: '', auth: 'EDIT|BUDGETBASE', shouldDetach: false }},
//   { path: 'budgetbaseadd/new', component: BudgetBaseAddDetailUIComponent, canActivate: [AuthGuard], data: {  title: '', auth: 'ADD|BUDGETBASE', shouldDetach: false }},
//   { path: 'budget/status', component: BudgetBaseManageComponent, canActivate: [AuthGuard], data: { title: '', auth: 'VIEW|BUDGETBASE', shouldDetach: true }},
//   { path: 'budget/month', component: BudgetMonthBaseManageComponent, canActivate: [AuthGuard], data: { title: '', auth: 'VIEW|BUDGETMONTHBASE', shouldDetach: true }},
//   { path: 'budget/forecast', component: BudgetForecastManageComponent, canActivate: [AuthGuard], data: { title: '', auth: 'VIEW|BUDGETFORECAST', shouldDetach: true }},
//   { path: 'budgetforecast/:id', component: BudgetForecastDetailUIComponent, canActivate: [AuthGuard], data: {  title: '', auth: 'EDIT|BUDGETBASE', shouldDetach: false }},
//   { path: 'budgetforecastcorrection/:id', component: BudgetForecastCorrectionDetailUIComponent, canActivate: [AuthGuard], data: {  title: '', auth: 'EDIT|BUDGETBASE', shouldDetach: false }},
//   { path: 'budgetforecasttransfer/:id', component: BudgetForecastTransferDetailUIComponent, canActivate: [AuthGuard], data: {  title: '', auth: 'TRANSFER|BUDGETBASE', shouldDetach: false }},
//   { path: 'budget/correction', canActivate: [AuthGuard], component: AssetBudgetForecastCorrectionManageComponent, data: { title: '', auth: 'VIEW|ASSET', shouldDetach: true}, },
//   { path: 'budget/needvalue', canActivate: [AuthGuard], component: RequestBudgetForecastManageComponent, data: { title: '', auth: 'VIEW|BUDGETFORECAST', shouldDetach: true}, },
//   // BUDGETS //
//
//   // KANBAN 2 //
//
//   { path: 'board2', component: BoardPageComponent, data: { title: 'Suppliers', auth: 'VIEW|PARTNERS', shouldDetach: true }},
//   { path: 'projects/new', component: ProjectCreatePageComponent, data: { title: 'Suppliers', auth: 'VIEW|PARTNERS', shouldDetach: true }},
//   { path: 'projects/all', component: ProjectListPageComponent, data: { title: 'Suppliers', auth: 'VIEW|PARTNERS', shouldDetach: true }},
//   { path: 'procurement/board2', component: BoardPageComponent, data: { title: 'Suppliers', auth: 'VIEW|PARTNERS', shouldDetach: true }},
//   { path: 'procurement/board2', component: BoardPageComponent, data: { title: 'Suppliers', auth: 'VIEW|PARTNERS', shouldDetach: true }},
//   { path: 'procurement/board2', component: BoardPageComponent, data: { title: 'Suppliers', auth: 'VIEW|PARTNERS', shouldDetach: true }},
//
//   // KANBAN 2 //
//
//
//     // PROCUREMENT //
//
//     { path: 'procurement/request', canActivate: [AuthGuard], component: RequestManageComponent, data: { title: 'PR', auth: 'VIEW|REQUEST', shouldDetach: true}},
//     { path: 'procurement/request/edit/:id', component: RequestEditComponent, canActivate: [AuthGuard], data: { title: '', auth: 'EDIT|REQUEST', shouldDetach: false }},
//     { path: 'procurement/request/new', component: RequestDetailUIComponent, canActivate: [AuthGuard], data: { title: '', auth: 'ADD|REQUEST', shouldDetach: false }},
//     { path: 'procurement/catalog', canActivate: [AuthGuard], component: MaterialManageComponent, data: { title: '', auth: 'VIEW|MATERIALS', shouldDetach: false }},
//     { path: 'procurement/partners', canActivate: [AuthGuard], component: PartnerManageComponent, data: { title: 'Suppliers', auth: 'VIEW|PARTNERS', shouldDetach: true }},
//     { path: 'procurement/kanban', canActivate: [AuthGuard], component: RequestKanbanManageComponent, data: { title: 'Suppliers', auth: 'VIEW|PARTNERS', shouldDetach: true }},
//
//     { path: 'requestbudgetnotvalidate/:guidRequest/:id', component: RequestNotValidatePageComponent, data: { title: 'Refuz tichet buget' }},
//     { path: 'requestbudgetnotvalidate', component: RequestNotValidatePageComponent, data: { title: 'Refuz buget' }},
//       // OFFERS //
//
//     { path: 'procurement/offer/status', canActivate: [AuthGuard], component: OfferManage, data: { title: '', auth: 'VIEW|S_OFFER_STATUS', shouldDetach: true }},
//     { path: 'procurement/offer/email', canActivate: [AuthGuard], component: EmailManagerManageComponent, data: { title: '', auth: 'VIEW|S_OFFER_EMAIL', shouldDetach: true }},
//     { path: 'procurement/offer/:id', component: OfferDetailUIComponent, canActivate: [AuthGuard], data: { title: '', auth: 'EDIT|OFFER', shouldDetach: false }},
//     { path: 'procurement/offer/new', component: OfferDetailUIComponent, canActivate: [AuthGuard], data: { title: '', auth: 'ADD|OFFER', shouldDetach: false }},
//     { path: 'offermaterials', canActivate: [AuthGuard], component: OfferMaterialManageComponent, data: { title: '', auth: 'VIEW|OFFERMATERIALS', shouldDetach: true }},
//     { path: 'ordermaterials', canActivate: [AuthGuard], component: OrderMaterialManageComponent, data: { title: '', auth: 'VIEW|ORDERMATERIALS', shouldDetach: true }},
//     { path: 'procurement/ordertypes', component: OrderTypeManageComponent, canActivate: [AuthGuard], data: { title: '', auth: 'VIEW|ORDERTYPES', shouldDetach: false }},
//     { path: 'procurement/offertypes', component: OfferTypeManageComponent, canActivate: [AuthGuard], data: { title: '', auth: 'VIEW|OFFERTYPES', shouldDetach: false }},
//     // OFFERS //
//
//       // ORDERS //
//
//       { path: 'procurement/order', canActivate: [AuthGuard], component: OrderManageComponent, data: { title: '', auth: 'VIEW|ORDER', shouldDetach: true}},
//       { path: 'procurement/order/edit/:id', component: OrderEditComponent, canActivate: [AuthGuard], data: { title: '', auth: 'EDIT|REQUEST', shouldDetach: false }},
//       { path: 'procurement/order/:id', component: OrderDetailUIComponent, canActivate: [AuthGuard], data: { title: '', auth: 'ADD|ORDER', shouldDetach: false }},
//       { path: 'procurement/orderchange/:id', component: OrderEditDetailUIComponent, canActivate: [AuthGuard], data: { title: '', auth: 'EDIT|ORDER', shouldDetach: false }},
//       { path: 'procurement/order/new', component: OrderDetailUIComponent, canActivate: [AuthGuard], data: { title: '', auth: 'ADD|ORDER', shouldDetach: false }},
//
//       // ORDERS //
//
//         // CONTRACTS //
//
//         { path: 'procurement/contract/status', canActivate: [AuthGuard], component: ContractManageComponent, data: { title: '', auth: 'VIEW|S_CONTRACT_STATUS', shouldDetach: true }},
//         { path: 'procurement/contract/:id', component: ContractDetailUIComponent, canActivate: [AuthGuard], data: { title: '', auth: 'EDIT|CONTRACT', shouldDetach: false }},
//         { path: 'procurement/contract/new', component: ContractDetailUIComponent, canActivate: [AuthGuard], data: { title: '', auth: 'ADD|CONTRACT', shouldDetach: false }},
//
//         // CONTRACTS //
//
//     // PROCUREMENT //
//
//   // ASSET //
//
//   { path: 'asset', component: AssetManageComponent, canActivate: [AuthGuard], data: { title: '', auth: 'VIEW|ASSET', shouldDetach: true}},
//   { path: 'asset/printlabel', canActivate: [AuthGuard], component: PrintLabelManage, data: { title: '', auth: 'VIEW|ASSET', shouldDetach: true}, },
//   { path: 'asset/scrap', canActivate: [AuthGuard], component: AssetScrapManageComponent, data: { title: '', auth: 'VIEW|ASSET', shouldDetach: true}, },
//   { path: 'asset/sold', canActivate: [AuthGuard], component: AssetSoldManageComponent, data: { title: '', auth: 'VIEW|ASSET', shouldDetach: true}, },
//   { path: 'asset/closed', canActivate: [AuthGuard], component: AssetClosedManageComponent, data: { title: '',auth: 'VIEW|ASSET',  shouldDetach: true}, },
//   { path: 'asset/wfh', canActivate: [AuthGuard], component: AssetWFHManageComponent, data: { title: '',auth: 'VIEW|ASSET',  shouldDetach: true}, },
//   { path: 'asset/invplus', canActivate: [AuthGuard], component: AssetInvPlusManageComponent, data: { title: '',auth: 'VIEW|ASSET',  shouldDetach: true}, },
//   { path: 'asset/suspend', canActivate: [AuthGuard], component: AssetSuspendedManageComponent, data: { title: '', auth: 'VIEW|ASSET', shouldDetach: true}, },
//   { path: 'asset/inuse', canActivate: [AuthGuard], component: AssetManageComponent, data: { title: '', auth: 'VIEW|ASSET', shouldDetach: true}, },
//   { path: 'asset/rejected', canActivate: [AuthGuard], component: AssetRejectedManageComponent, data: { title: '', auth: 'VIEW|ASSET', shouldDetach: true}, },
//   { path: 'asset/reception', canActivate: [AuthGuard], component: AssetReceptionManageComponent, data: { title: '', auth: 'VIEW|ASSET', shouldDetach: true}, },
//   { path: 'asset/validate', canActivate: [AuthGuard], component: AssetToValidateManageComponent, data: { title: '', auth: 'VIEW|ASSET', shouldDetach: true}},
//   { path: 'asset/newoperation', canActivate: [AuthGuard],  component: OperationDetail, data: {  title: '', auth: 'ADD_TRANSFER|ASSET', shouldDetach: false }},
//   { path: 'asset/:id', canActivate: [AuthGuard], component: AssetDetailUIAddComponent, data: { title: '', auth: 'EDIT|ASSET', shouldDetach: false }},
//   { path: 'assetreception/:id', canActivate: [AuthGuard], component: AssetReceptionDetailUIAddComponent, data: { title: '', auth: 'EDIT|ASSET', shouldDetach: false }},
//   { path: 'assetdetail/:id', canActivate: [AuthGuard], component: AssetDetailUIComponent, data: { title: '', auth: 'EDIT|ASSET', shouldDetach: false }},
//   { path: 'assetvalidate/:id', canActivate: [AuthGuard], component: AssetDetailUIValidateComponent, data: { title: '', auth: 'EDIT|ASSET', shouldDetach: false }},
//   { path: 'assetedit/:id', canActivate: [AuthGuard], component: AssetDetailChangeUIComponent, data: { title: '', auth: 'EDIT|ASSET', shouldDetach: false }},
//   { path: 'assetvalidateinvplus/:id', canActivate: [AuthGuard], component: AssetDetailUIValidateInvPlusComponent, data: { title: '', auth: 'EDIT|ASSET', shouldDetach: false }},
//   { path: 'assetoperation/:id', canActivate: [AuthGuard], component: AssetDetailUIOperationTransferComponent, data: { title: '', auth: 'EDIT|ASSET', shouldDetach: false }},
//   { path: 'assetclone/:id', canActivate: [AuthGuard], component: AssetDetailUIOperationCloneTransferComponent, data: { title: '', auth: 'EDIT|ASSET', shouldDetach: false }},
//   { path: 'assetretire/:id', canActivate: [AuthGuard], component: AssetDetailUIOperationCassationComponent, data: { title: '', auth: 'EDIT|ASSET', shouldDetach: false }},
//   { path: 'assetstorno/:id', canActivate: [AuthGuard], component: AssetDetailUIOperationStornoComponent, data: { title: '', auth: 'EDIT|ASSET', shouldDetach: false }},
//   { path: 'assetstornomfx/:id', canActivate: [AuthGuard], component: AssetDetailUIOperationStornoMFXComponent, data: { title: '', auth: 'EDIT|ASSET', shouldDetach: false }},
//   { path: 'assetacquisitionstorno/:id', canActivate: [AuthGuard], component: AssetDetailUIAcquisitionOperationStornoComponent, data: { title: '', auth: 'EDIT|ASSET', shouldDetach: false }},
//   { path: 'asset/new', canActivate: [AuthGuard], component: AssetDetailUIAddComponent, data: { title: '', auth: 'ADD|ASSET', shouldDetach: false }},
//   { path: 'newfromstock', canActivate: [AuthGuard], component: AssetStockDetailUIAddComponent, data: { title: '', auth: 'ADD|ASSET', shouldDetach: false }},
//
//   // ASSET //
//
//   // STOCK //
//
//   { path: 'stock', canActivate: [AuthGuard], component: AssetStockITManageComponent, data: { title: '', auth: 'VIEW|ASSET', shouldDetach: true}, },
//   { path: 'stock/it', canActivate: [AuthGuard], component: AssetStockITManageComponent, data: { title: '', auth: 'VIEW|ASSET', shouldDetach: true}, },
//   { path: 'stock/mfx', canActivate: [AuthGuard], component: AssetStockITMFXManageComponent, data: { title: '', auth: 'VIEW|ASSET', shouldDetach: true}, },
//   { path: 'stock/fromemployee', canActivate: [AuthGuard], component: AssetStockITToValidateManageComponent, data: { title: '', auth: 'VIEW|ASSET', shouldDetach: true}, },
//   { path: 'stock/toemployee', canActivate: [AuthGuard], component: AssetStockITToValidateEmployeeManageComponent, data: { title: '', auth: 'VIEW|ASSET', shouldDetach: true}, },
//   { path: 'stock/history', canActivate: [AuthGuard], component: AssetStockHistoryManageComponent, data: { title: '', auth: 'VIEW|ASSET', shouldDetach: true}, },
//   { path: 'stock/initial', canActivate: [AuthGuard], component: StockITManageComponent, data: { title: 'Materiale', auth: 'VIEW|STOCKS', shouldDetach: true }},
//   // STOCK //
//
//   // ASSETCOMPONENT //
//
//   { path: 'assetcomponent', canActivate: [AuthGuard], component: AssetComponentManage, data: { title: 'Accesorii', auth: 'VIEW|COMPONENT', shouldDetach: true }},
//
//   // ASSETCOMPONENT //
//
//   // EMPLOYEE //
//
//   { path: 'employee', canActivate: [AuthGuard], component: EmployeeManageComponent, data: { title: 'Angajati', auth: 'VIEW|EMPLOYEES', shouldDetach: true }},
//   { path: 'employee/:id', component: EmployeeDetailUIComponent, canActivate: [AuthGuard], data: { title: '', auth: 'OPERATION|EMPLOYEES', shouldDetach: false }},
//   { path: 'employeecostcenters', canActivate: [AuthGuard], component: EmployeeCostCenterManage, data: { title: 'Angajati/ CC', auth: 'VIEW|EMPLOYEECOSTCENTERS', shouldDetach: true }},
//
//   // EMPLOYEE //
//
//   // WFH //
//
//   // { path: 'wfh/assets', canActivate: [AuthGuard], component: AssetEmployeeDetailUIComponent, data: { title: '', auth: 'VIEW|S_WFH_VALIDATE', shouldDetach: true }},
//   { path: 'wfh/personal', canActivate: [AuthGuard], component: AssetEmployeePersonalDetailUIComponent, data: { title: '', auth: 'VIEW|S_WFH_VALIDATE', shouldDetach: true }},
//   { path: 'wfh/validate', canActivate: [AuthGuard], component: AssetEmployeePersonalValidateDetailUIComponent, data: { title: '', auth: 'VIEW|S_WFH_VALIDATE', shouldDetach: true }},
//   { path: 'wfh/managervalidate', canActivate: [AuthGuard], component: AssetEmployeeManagerValidateDetailUIComponent, data: { title: '', auth: 'VIEW|S_WFH_VALIDATE', shouldDetach: true }},
//   { path: 'wfh/manager', canActivate: [AuthGuard], component: AssetEmployeeManagerDetailUIComponent, data: { title: '', auth: 'VIEW|S_WFH_VALIDATE', shouldDetach: true }},
//   { path: 'wfh/teamstatus', canActivate: [AuthGuard], component: TeamStatusEmployeeManageComponent, data: { title: 'Angajati', auth: 'VIEW|EMPLOYEES', shouldDetach: true }},
//   { path: 'wfh/email', canActivate: [AuthGuard], component: AssetInventoryEmailManage, data: { title: '', auth: 'VIEW|S_WFH_STATUS', shouldDetach: true }},
//   { path: 'wfh/dictionaryitems', canActivate: [AuthGuard], component: DictionaryItemManageComponent, data: { title: '', auth: 'VIEW|DICTIONARYITEMS', shouldDetach: true }},
//   { path: 'wfh/mobilephones', canActivate: [AuthGuard], component: MobilePhoneManage, data: { title: '', auth: 'VIEW|MOBILEPHONES', shouldDetach: true }},
//   { path: 'wfh/brands', canActivate: [AuthGuard], component: BrandManage, data: { title: '', auth: 'VIEW|BRANDS', shouldDetach: true }},
//   { path: 'wfh/models', canActivate: [AuthGuard], component: ModelManage, data: { title: '', auth: 'VIEW|MODELS', shouldDetach: true }},
//   { path: 'wfh/emailsettings', canActivate: [AuthGuard], component: EmailTypeManage, data: { title: '', auth: 'VIEW|EMAIL_SETTING', shouldDetach: true }},
//   { path: 'wfh/status', canActivate: [AuthGuard], component: AssetEmployeeDetailUIComponent, data: { title: 'Validare WFH', auth: 'VIEW|S_WFH_VALIDATE', shouldDetach: false } },
//   { path: 'wfh/checks', canActivate: [AuthGuard], component: WFHCheckManageComponent, data: { title: 'WFH verificare', auth: 'VIEW|S_WFH_CHECK', shouldDetach: false } },
//   // WFH //
//
//   // INVENTORIES //
//
//   { path: 'inventory/status', canActivate: [AuthGuard], component: AssetInventoryManageComponent, data: { title: 'Status', auth: 'VIEW|S_INVENTORY_STATUS', shouldDetach: true }},
//   { path: 'inventory/report', canActivate: [AuthGuard], component: AssetInventoryReportComponent, data: { title: 'Rapoarte', auth: 'VIEW|S_INVENTORY_REPORT', shouldDetach: true }},
//   { path: 'inventory/recos', canActivate: [AuthGuard], component: AssetOpRecoManageComponent, data: { title: 'Reconcilieri', auth: 'VIEW|OPERATION', shouldDetach: true }},
//   // INVENTORIES //
//
//
//
//   // OPRATIONS //
//
//   { path: 'operation', canActivate: [AuthGuard], component: AssetOpManageComponent, data: { title: 'Operatii', auth: 'VIEW|OPERATION', shouldDetach: true }},
//
//   // OPERATIONS //
//
//   // ADMIN //
//
//   { path: 'admin', canActivate: [AuthGuard], component: IdentityManage, data: { title: 'Admin', auth: 'VIEW|ADMIN', shouldDetach: true }},
//
//   // ADMIN //
//
//   // CONFIGS //
//
//   { path: 'config/global', component: ConfigValuesManage, data: { title: 'Global'}},
//   { path: 'config/table', component: TableDefinitionManageComponent, data: { title: 'Table' }},
//   { path: 'config/column', component: ColumnDefinitionManageComponent, data: { title: 'Coloane'}},
//   { path: 'config/permissiontype', component: PermissionTypeManage, data: { title: 'Ecran' }},
//   { path: 'config/permission', component: PermissionManage, data: { title: 'Permisiuni' }},
//   { path: 'config/permissionrole', component: PermissionRoleManage, data: { title: 'Permisiuni/Roluri' }},
//
//   // CONFIGS //
//
//   // ROUTES //
//
//   { path: 'routes/parent', component: RouteManageComponent, data: { title: 'Parinte', shouldDetach: true}},
//   { path: 'routes/children', component: RouteChildManageComponent, data: { title: 'Copil', shouldDetach: true }},
//   { path: 'routes/badge', component: BadgeManage, data: { title: 'Badges', shouldDetach: true}},
//
//   // ROUTES //
//
//   // NOMENCLATURES //
//
//   { path: 'nom/levels', canActivate: [AuthGuard], component: LevelManageComponent, data: { title: 'Level', auth: 'VIEW|LEVELS', shouldDetach: true }},
//   { path: 'nom/inventories', canActivate: [AuthGuard], component: InventoryManage, data: { title: 'Inventare', auth: 'VIEW|INVENTORIES', shouldDetach: true }},
//   { path: 'nom/appstates', canActivate: [AuthGuard], component: AppStateManageComponent, data: { title: 'Stari', auth: 'VIEW|APPSTATES', shouldDetach: true }},
//   { path: 'nom/companies', canActivate: [AuthGuard], component: CompanyManageComponent, data: { title: 'Categorii', auth: 'VIEW|COMPANIES', shouldDetach: true }},
//   { path: 'nom/assetnatures', canActivate: [AuthGuard], component: AssetNatureManageComponent, data: { title: 'Culori', auth: 'VIEW|ASSETNATURES', shouldDetach: true }},
//   { path: 'nom/invstates', canActivate: [AuthGuard], component: InvStateManage, data: { title: 'Stari', auth: 'VIEW|INVSTATES', shouldDetach: true }},
//   { path: 'nom/assetstates', canActivate: [AuthGuard], component: AssetStateManageComponent, data: { title: 'Tipuri operatii', auth: 'VIEW|ASSETSTATES', shouldDetach: true }},
//   { path: 'nom/counties', canActivate: [AuthGuard], component: CountyManageComponent, data: { title: 'Judete', auth: 'VIEW|COUNTIES', shouldDetach: true}},
//   { path: 'nom/cities', canActivate: [AuthGuard], component: CityManageComponent, data: { title: 'Orase', auth: 'VIEW|CITIES', shouldDetach: true }},
//   { path: 'nom/cities', canActivate: [AuthGuard], component: CityManageComponent, data: { title: 'Orase', auth: 'VIEW|CITIES', shouldDetach: true }},
//   { path: 'nom/locations', canActivate: [AuthGuard], component: LocationManageComponent, data: { title: 'Adrese', auth: 'VIEW|LOCATIONS', shouldDetach: true}},
//   { path: 'nom/rooms', canActivate: [AuthGuard], component: RoomManageComponent, data: { title: 'Adrese 2',auth: 'VIEW|ROOMS', shouldDetach: true}},
//   { path: 'nom/accounts', canActivate: [AuthGuard], component: AccountManage, data: { title: 'Bal.sh.acct APC', auth: 'VIEW|ACCOUNTS', shouldDetach: true }},
//   { path: 'nom/expaccounts', canActivate: [AuthGuard], component: ExpAccountManage, data: { title: 'Asset class', auth: 'VIEW|EXPACCOUNTS', shouldDetach: true }},
//   { path: 'nom/assetcategories', canActivate: [AuthGuard], component: AssetCategoryManageComponent, data: { title: 'Asset classification', auth: 'VIEW|ASSETCATEGORIES', shouldDetach: true }},
//   { path: 'nom/articles', canActivate: [AuthGuard], component: ArticleManage, data: { title: 'Zone', auth: 'VIEW|ARTICLES', shouldDetach: true }},
//   { path: 'nom/costcenters', canActivate: [AuthGuard], component: CostCenterManageComponent, data: { title: 'Centre de cost', auth: 'VIEW|COSTCENTERS', shouldDetach: true }},
//   { path: 'nom/admcenters', canActivate: [AuthGuard], component: AdmCenterManageComponent, data: { title: 'Profit centers', auth: 'VIEW|ADMCENTERS', shouldDetach: true }},
//   { path: 'nom/regions', canActivate: [AuthGuard], component: RegionManageComponent, data: { title: 'PC detaliu', auth: 'VIEW|REGIONS', shouldDetach: true }},
//   { path: 'nom/departments', canActivate: [AuthGuard], component: DepartmentManageComponent, data: { title: 'Departamente', auth: 'VIEW|DEPARTMENTS', shouldDetach: true }},
//   { path: 'nom/divisions', canActivate: [AuthGuard], component: DivisionManageComponent, data: { title: 'Divizii', auth: 'VIEW|DIVISIONS', shouldDetach: true }},
//   { path: 'nom/administrations', canActivate: [AuthGuard], component: AdministrationManageComponent, data: { title: 'Locatii', auth: 'VIEW|ADMINISTRATIONS', shouldDetach: true}},
//   { path: 'nom/countries', canActivate: [AuthGuard], component: CountryManageComponent, data: { title: 'Tari', auth: 'VIEW|COUNTRIES', shouldDetach: true }},
//   { path: 'nom/budgetmanagers', canActivate: [AuthGuard], component: BudgetManagerManage, data: { title: 'FY Start', auth: 'VIEW|BUDGETMANAGERS', shouldDetach: true}},
//   { path: 'nom/assetnatures', canActivate: [AuthGuard], component: AssetNatureManageComponent, data: { title: 'Cont CM', auth: 'VIEW|ASSETNATURES', shouldDetach: true }},
//   // { path: 'nom/mastertypes', canActivate: [AuthGuard], component: MasterTypeManageComponent, data: { title: 'PC', auth: 'VIEW|MASTERTYPES', shouldDetach: true }},
//   { path: 'nom/types', canActivate: [AuthGuard], component: TypeManage, data: { title: 'Supracategorii', auth: 'VIEW|TYPES', shouldDetach: true }},
//   { path: 'nom/subtypes', canActivate: [AuthGuard], component: SubTypeManage, data: { title: 'Tipuri active', auth: 'VIEW|SUBTYPES', shouldDetach: true }},
//   { path: 'nom/assetclasses', canActivate: [AuthGuard], component: AssetClassManageComponent, data: { title: 'Clasificari', auth: 'VIEW|ASSETCLASSES', shouldDetach: true}},
//   { path: 'nom/dictionarytypes', canActivate: [AuthGuard], component: DictionaryTypeManageComponent, data: { title: 'Tip dictionar', auth: 'VIEW|DICTIONARYTYPES', shouldDetach: true}},
//   { path: 'nom/uoms', canActivate: [AuthGuard], component: UomManageComponent, data: { title: 'Simboluri', auth: 'VIEW|UOMS', shouldDetach: true }},
//   { path: 'nom/dimensions', canActivate: [AuthGuard], component: DimensionManageComponent, data: { title: 'Dimensiuni', auth: 'VIEW|DIMENSIONS', shouldDetach: true}},
//   { path: 'nom/insurancecategories', canActivate: [AuthGuard], component: InsuranceCategoryManage, data: { title: 'BS', auth: 'VIEW|INSURANCECATEGORIES', shouldDetach: true }},
//   { path: 'nom/assettypes', canActivate: [AuthGuard], component: AssetTypeManageComponent, data: { title: 'Tipuri', auth: 'VIEW|ASSETTYPES', shouldDetach: true }},
//   { path: 'nom/activities', canActivate: [AuthGuard], component: ActivityManage, data: { title: 'WBS', auth: 'VIEW|ACTIVITIES', shouldDetach: true }},
//   { path: 'nom/taxs', canActivate: [AuthGuard], component: TaxManageComponent, data: { title: 'Tax', auth: 'VIEW|TAXS', shouldDetach: true }},
//   { path: 'nom/devicetypes', canActivate: [AuthGuard], component: DeviceTypeManage, data: { title: 'OS', auth: 'VIEW|DEVICETYPES', shouldDetach: true }},
//   { path: 'nom/devices', canActivate: [AuthGuard], component: DeviceManage, data: { title: 'OS', auth: 'VIEW|DEVICES', shouldDetach: true }},
//
//   // NOMENCLATURES //
//
//   // EMAIL STATUS //
//
//   { path: 'dstemployeevalidate', component: EmailStatusDstEmployeeValidatePageComponent, data: { title: 'Validare angajat' }},
//   { path: 'ordervalidateL4/:guid', component: EmailStatusOrderValidateL4PageComponent, data: { title: 'Validare L4' }},
//   { path: 'ordervalidateL3/:guid', component: EmailStatusOrderValidateL3PageComponent, data: { title: 'Validare L3' }},
//   { path: 'ordervalidateL2/:guid', component: EmailStatusOrderValidateL2PageComponent, data: { title: 'Validare L2' }},
//   { path: 'ordervalidateL1/:guid', component: EmailStatusOrderValidateL1PageComponent, data: { title: 'Validare L1' }},
//   { path: 'ordervalidateS3/:guid', component: EmailStatusOrderValidateS3PageComponent, data: { title: 'Validare S3' }},
//   { path: 'ordervalidateS2/:guid', component: EmailStatusOrderValidateS2PageComponent, data: { title: 'Validare S2' }},
//   { path: 'ordervalidateS1/:guid', component: EmailStatusOrderValidateS1PageComponent, data: { title: 'Validare S1' }},
//
//   // EMAIL STATUS //
//
//
//   { path: '**', component: P404Component },
//
// ];

@NgModule({
  // imports: [ RouterModule.forRoot(AppRoutes, { relativeLinkResolution: 'legacy' }) ],
  imports: [ RouterModule.forRoot(AppRoutes, { useHash: true, onSameUrlNavigation: 'reload' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
