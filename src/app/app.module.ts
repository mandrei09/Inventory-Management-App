import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {LocationStrategy, HashLocationStrategy, CommonModule, DatePipe, DecimalPipe, Location} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

// import {
//   AppAsideModule,
//   AppBreadcrumbModule,
//   AppHeaderModule,
//   AppFooterModule,
//   AppSidebarModule,
// } from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule as ChartsModule } from 'ng2-charts';
import { TableDefinitionHttpService } from './services/http/common/table-definition.http.service';
import { ColumnDefinitionHttpService } from './services/http/common/column-definition.http.service';
import { ConfigValuesHttpService } from './services/http/common/config-values.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './services/authentication.service';
import { CountyHttpService } from './services/http/administration/county.http.service';
import { TokenInterceptor } from './services/http/common/token-interceptor.service';
import { CountryHttpService } from './services/http/administration/contry.http.service';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { AuthGuard } from './services/auth.guard';
import { CountryListComponent } from './forms/administrations/countries/country.list';
import { CountryManageComponent } from './forms/administrations/countries/country.manage';
import { CountryDetailComponent } from './forms/administrations/countries/country.detail';
import { CountyManageComponent } from './forms/administrations/counties/county.manage';
import { CountyListComponent } from './forms/administrations/counties/county.list';
import { CountyDetailComponent } from './forms/administrations/counties/county.detail';
import { CityListComponent } from './forms/administrations/cities/city.list';
import { CityManageComponent } from './forms/administrations/cities/city.manage';
import { CityDetailComponent } from './forms/administrations/cities/city.detail';
import { AssetManageComponent } from './forms/assets/assets/asset.manage';
import { PaginationComponent, PaginationModule } from 'ngx-bootstrap/pagination';
import { AssetRecoManageComponent } from './forms/assets/assets/asset-reco.manage';
import { AssetRecoListComponent } from './forms/assets/assets/asset-reco.list';
import { DepartmentListComponent } from './forms/administrations/departments/department.list';
import { EmployeeListComponent } from './forms/administrations/employees/employee.list';
import { RegionListComponent } from './forms/administrations/regions/region.list';
import { AdmCenterListComponent } from './forms/administrations/adm-centers/adm-center.list';
import { LocationListComponent } from './forms/administrations/locations/location.list';
import { RoomListComponent } from './forms/administrations/rooms/room.list';
import { AdministrationListComponent } from './forms/administrations/administrations/administration.list';
import { AssetCategoryListComponent } from './forms/assets/asset-categories/asset-category.list';
import { UomListComponent } from './forms/assets/uoms/uom.list';
import { CompanyListComponent } from './forms/assets/companies/company.list';
import { AssetClassListComponent } from './forms/assets/asset-classes/asset-class.list';
import { AssetTypeListComponent } from './forms/assets/asset-types/asset-type.list';
import { DivisionListComponent } from './forms/administrations/divisions/division.list';
import { PartnerListComponent } from './forms/documents/partners/partner.list';
import { CostCenterListComponent } from './forms/administrations/cost-centers/cost-center.list';
import { DimensionListComponent } from './forms/assets/dimensions/dimension.list';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { DictionaryItemListComponent } from './forms/administrations/dictionary-item/dictionary-item.list';
import { DictionaryItemDetailComponent } from './forms/administrations/dictionary-item/dictionary-item.detail';
import { FieldByColumnDefinitionPipe } from './forms/common/pipes/field-by-column-definition';
import { AssetAllListComponent } from './forms/assets/assets/asset-all.list';
import { BoolPipe } from './forms/common/pipes/bool.pipe';
import { BoolPipeState } from './forms/common/pipes/bool.pipe_state';
import { BoolPipeInventory } from './forms/common/pipes/bool-pipe.inventory';
import { MergePipe } from './forms/common/pipes/merge.pipe';
import { MergeRoom } from './forms/common/pipes/merge-room.pipe';
import { HighlightPipe } from './forms/common/pipes/highlight-pipe ';
import { ConfigValuesList } from './forms/common/config-values.list';
import { ConfigValuesDetail } from './forms/common/config-values.detail';
import { ConfigValuesManage } from './forms/common/config-values.manage';
import { InventoryManage } from './forms/inventory/inventory.manage';
import { InventoryList } from './forms/inventory/inventory.list';
import { InventoryDetail } from './forms/inventory/inventory.detail';
import { AccMonthListComponent } from './forms/accounting/acc-month.list';
import { AccMonthDetailComponent } from './forms/accounting/acc-month.detail';
import { AccMonthManageComponent } from './forms/accounting/acc-month.manage';
import { InvStateList } from './forms/inventory/inv-state/inv-state.list';
import { InvStateDetail } from './forms/inventory/inv-state/inv-state.detail';
import { InvStateManage } from './forms/inventory/inv-state/inv-state.manage';
import { AssetRecoAllListComponent } from './forms/assets/assets/asset-reco-all.list';
import { DictionaryTypeManageComponent } from './forms/administrations/dictionary-type/dictionary-type.manage';
import { DictionaryTypeDetailComponent } from './forms/administrations/dictionary-type/dictionary-type.detail';
import { DictionaryTypeListComponent } from './forms/administrations/dictionary-type/dictionary-type.list';
import { AdministrationManageComponent } from './forms/administrations/administrations/administration.manage';
import { AdministrationDetailComponent } from './forms/administrations/administrations/administration.detail';
import { AssetDetailUIComponent } from './forms/assets/assets/asset.detail.ui';
import { PartnerDetailComponent } from './forms/documents/partners/partner.detail';
import { PartnerManageComponent } from './forms/documents/partners/partner.manage';
import { RoomDetailComponent } from './forms/administrations/rooms/room.detail';
import { RoomManageComponent } from './forms/administrations/rooms/room.manage';
import { UomDetailComponent } from './forms/assets/uoms/uom.detail';
import { UomManageComponent } from './forms/assets/uoms/uom.manage';
import { CostCenterDetailComponent } from './forms/administrations/cost-centers/cost-center.detail';
import { CostCenterManageComponent } from './forms/administrations/cost-centers/cost-center.manage';
import { LocationDetailComponent } from './forms/administrations/locations/location.detail';
import { LocationManageComponent } from './forms/administrations/locations/location.manage';
import { EmployeeDetailComponent } from './forms/administrations/employees/employee.detail';
import { EmployeeManageComponent } from './forms/administrations/employees/employee.manage';
import { DepartmentDetailComponent } from './forms/administrations/departments/department.detail';
import { DepartmentManageComponent } from './forms/administrations/departments/department.manage';
import { AssetTypeDetailComponent } from './forms/assets/asset-types/asset-type.detail';
import { AssetTypeManageComponent } from './forms/assets/asset-types/asset-type.manage';
import { AssetCategoryDetailComponent } from './forms/assets/asset-categories/asset-category.detail';
import { AssetCategoryManageComponent } from './forms/assets/asset-categories/asset-category.manage';
import { EntityFileListComponent } from './forms/common/entity-file.list';
import { AssetOpDetailListComponent } from './forms/assets/asset-ops/asset-op.detail.list';
import { FieldByNamePipe } from './forms/common/pipes/field-by-name.pipe';
import { AssetInventoryReportComponent } from './forms/assets/assets/asset-inventory-report';
import { UserListComponent } from './forms/auth/user.list';
import { AssetInventoryManageComponent } from './forms/assets/assets/asset-inventory.manage';
// import { AssetInvTempDetailListComponent } from './forms/assets/assets/asset-inv-temp-detail.list';
import { AssetInvFullDetailListComponent } from './forms/assets/assets/asset-inv-full-detail.list';
import { AssetListComponent } from './forms/assets/assets/asset.list';
import { AssetDepManageComponent } from './forms/assets/assets/asset-dep.manage';
import { AdministrationHttpService } from './services/http/administration/administration.http.service';
import { AssetHttpService } from './services/http/assets/asset.http.service';
import { UomHttpService } from './services/http/assets/uom.http.service';
import { DivisionHttpService } from './services/http/administration/division.http.service';
import { AdmCenterDetailComponent } from './forms/administrations/adm-centers/adm-center.detail';
import { AdmCenterManageComponent } from './forms/administrations/adm-centers/adm-center.manage';
import { AssetEntityListComponent } from './forms/assets/assets/asset-entity.list';
import { IdentityManage } from './forms/auth/identity.manage';
import { RoleList } from './forms/auth/role.list';
import { RoleService } from './services/http/identity/role.service';
import { CompanyDetailComponent } from './forms/assets/companies/company.detail';
import { CompanyManageComponent } from './forms/assets/companies/company.manage';
import { AuthorizationService } from './services/authorization.service';
import { AssetStateManageComponent } from './forms/assets/asset-states/asset-state.manage';
import { AssetStateListComponent } from './forms/assets/asset-states/asset-state.list';
import { AssetStateDetailComponent } from './forms/assets/asset-states/asset-state.detail';
import { MasterTypeManageComponent } from './forms/assets/master-types/master-type.manage';
import { MasterTypeListComponent } from './forms/assets/master-types/master-type.list';
import { MasterTypeDetailComponent } from './forms/assets/master-types/master-type.detail';
import { LocationHttpService } from './services/http/administration/location.http.service';
import { BudgetValidateList } from './forms/administrations/budget/budget-validate.list';
import { BudgetValidateManage } from './forms/administrations/budget/budget-validate.manage';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BudgetDetailUI } from './forms/administrations/budget/budget.detail.ui';
import { AccountList } from './forms/administrations/account/account.list';
import { ProjectManage } from './forms/assets/projects/project.manage';
import { ProjectList } from './forms/assets/projects/project.list';
import { ProjectDetail } from './forms/assets/projects/project.detail';
import { SubTypeList } from './forms/administrations/sub-types/sub-type.list';
import { SubTypeManage } from './forms/administrations/sub-types/sub-type.manage';
import { SubTypeDetail } from './forms/administrations/sub-types/sub-type.detail';
import { TypeManage } from './forms/administrations/types/type.manage';
import { TypeDetail } from './forms/administrations/types/type.detail';
import { TypeList } from './forms/administrations/types/type.list';
import { EntityFileUploadComponent } from './forms/common/entity-file-upload';
import { EntityFileDownloadComponent } from './forms/common/entity-file-download';
import { BudgetOpDetailList } from './forms/administrations/budget-ops/budget-op.detail.list';
import { BudgetOpManage } from './forms/administrations/budget-ops/budget-op-manage';
import { BudgetManage } from './forms/administrations/budget/budget.manage';
import { BudgetList } from './forms/administrations/budget/budget.list';
import { BudgetHttpService } from './services/http/administration/budget.http.service';
import { OrderValidateList } from './forms/administrations/order/order-validate.list';
import { OfferValidateList } from './forms/administrations/offer/offer-validate.list';
import { OfferValidateManage } from './forms/administrations/offer/offer-validate.manage';
import { OfferDetailUIComponent } from './forms/administrations/offer/offer.detail.ui';
import { OfferOpDetailList } from './forms/administrations/offer-ops/offer-op.detail.list';
import { SanitizeHtml } from './forms/common/pipes/sanitize.html-pipe';
import { OfferManage } from './forms/administrations/offer/offer.manage';
import { OfferList } from './forms/administrations/offer/offer.list';
import { OfferHttpService } from './services/http/administration/offer.http.service';
import { OfferOpManage } from './forms/administrations/offer-ops/offer-op-manage';
import { OrderValidateManage } from './forms/administrations/order/order-validate.manage';
import { OrderDetailUIComponent } from './forms/administrations/order/order.detail.ui';
import { OrderOpDetailList } from './forms/administrations/order-ops/order-op.detail.list';
import { OrderList } from './forms/administrations/order/order.list';
import { OrderManageComponent } from './forms/administrations/order/order.manage';
import { OrderOpManage } from './forms/administrations/order-ops/order-op-manage';
import { OrderHttpService } from './services/http/administration/order.http.service';
import { EmailManagerManageComponent } from './forms/administrations/email-manager/email-manager.manage';
import { EmailManagerList } from './forms/administrations/email-manager/email-manager.list';
import { EmailManagerDetail } from './forms/administrations/email-manager/email-manager.detail';
import { EmailTypeDetail } from './forms/administrations/email-type/email-type.detail';
import { EmailTypeList } from './forms/administrations/email-type/email-type.list';
import { EmailTypeManage } from './forms/administrations/email-type/email-type.manage';
import { EmailManagerHttpService } from './services/http/administration/email-manager.http.service';
import { EmailTypeHttpService } from './services/http/administration/email-type.http.service';
import { AppStateHttpService } from './services/http/common/app-state.http.service';
import { EmailManagerDetailHttpService } from './services/http/administration/email-manager-detail.http.service';
import { AssetComponentManage } from './forms/assets/asset-components/asset-component.manage';
import { AssetComponentList } from './forms/assets/asset-components/asset-component.list';
import { AssetComponentDetail } from './forms/assets/asset-components/asset-component.detail';
import { AssetComponentDetailHttpService } from './services/http/assets/asset-component-detail.http.service';
import { AssetComponentOpDetailList } from './forms/assets/asset-component-ops/asset-component-op.detail.list';
import { EmployeeHttpService } from './services/http/administration/employee.http.service';
import { SubTypeHttpService } from './services/http/administration/sub-type.http.service';
import { AssetComponentHttpService } from './services/http/assets/asset-component.http.service';
import { EntityFileHttpService } from './services/http/common/entity-file.http.service';
import { EmployeeDetailUIComponent } from './forms/administrations/employees/employee.detail.ui';
import { DepartmentHttpService } from './services/http/administration/department.http.service';
import { EmployeeDetailHttpService } from './services/http/administration/employee-detail.http.service';
import { AssetEmployeeValidateList } from './forms/assets/assets/asset-employee-validate.list';
import { AssetInventoryEmployeeValidateManage } from './forms/assets/assets/asset-inventory-employee-validate.manage';
import { AssetInvEmailList } from './forms/assets/assets/asset-inv-email.list';
import { AssetTypeHttpService } from './services/http/assets/asset-type.http.service';
import { AssetCategoryHttpService } from './services/http/assets/asset-category.http.service';
import { AdmCenterHttpService } from './services/http/administration/adm-center.http.service';
import { InventoryHttpService } from './services/http/inventory/inventory.http.service';
import { RegionHttpService } from './services/http/administration/region.http.service';
import { RoomDetailHttpService } from './services/http/administration/room-detail.http.service';
import { CompanyHttpService } from './services/http/assets/company.http.service';
import { CityHttpService } from './services/http/administration/city.http.service';
import { InvStateHttpService } from './services/http/inventory/inv-state.http.service';
import { DocumentTypeHttpService } from './services/http/documents/document-type.http.service';
import { AssetInvDetailListComponent } from './forms/assets/assets/asset-inv-detail.list';
import { AssetDepDetailListComponent } from './forms/assets/assets/asset-dep-detail.list';
import { AssetClassManageComponent } from './forms/assets/asset-classes/asset-class.manage';
import { AssetClassDetailComponent } from './forms/assets/asset-classes/asset-class.detail';
import { DocumentHttpService } from './services/http/documents/document.http.service';
import { AssetOpManageComponent } from './forms/assets/asset-ops/asset-op-manage';
import { AccountHttpService } from './services/http/administration/account.http.service';
import { TypeHttpService } from './services/http/administration/type.http.service';
import { MasterTypeHttpService } from './services/http/assets/master-type.http.service';
import { ProjectHttpService } from './services/http/assets/project.http.service';
import { BudgetOpHttpService } from './services/http/administration/budget-op.http.service';
import { AssetOpHttpService } from './services/http/assets/asset-op.http.service';
import { DimensionHttpService } from './services/http/administration/dimension.http.service';
import { DocumentTypeDropDownListComponent } from './forms/documents/document-types/document-type.drop-down.list';
import { DimensionManageComponent } from './forms/assets/dimensions/dimension.manage';
import { DimensionDetailComponent } from './forms/assets/dimensions/dimension.detail';
import { PaginationsComponent } from './views/base/paginations.component';
import { JwtHelperService, JwtModuleOptions, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AccMonthHttpService } from './services/http/accounting/acc-month.http.service';
import { CostCenterHttpService } from './services/http/administration/cost-center.http.service';
import { BaThemeConfigProvider } from './services/http/common/theme-colors.service';
import { RouteManageComponent } from './forms/common/route-definition/route.manage';
import { RouteListComponent } from './forms/common/route-definition/route.list';
import { RouteDetailComponent } from './forms/common/route-definition/route.detail';
import { RouteHttpService } from './services/http/common/route.http.service';
import { RouteChildManageComponent } from './forms/common/route-child-definition/route-child.manage';
import { RouteChildHttpService } from './services/http/common/route-child.http.service';
import { HideIfNotUnauthorizedDirective } from './directives/hideIfNotAuthorized';
import { DisableIfNotUnauthorizedDirective } from './directives/disableIfNotAuthorized';
import { PermissionTypeHttpService } from './services/http/common/permission-type.http.service';
import { PermissionHttpService } from './services/http/common/permission.http.service';
import { PermissionRoleHttpService } from './services/http/common/permission-role.http.service';
import { DashboardHttpService } from './services/http/common/dashboard.http.service';
import { OperationDetail } from './forms/documents/operations/operation.detail';
import { AssetMemoryService } from './services/memory/asset.memory.service';
import { AssetComponentOpHttpService } from './services/http/assets/asset-component-op.http.service';
import { DashboardOfferComponent } from './views/dashboard/dashboard-offer.component';
import { DashboardOrderComponent } from './views/dashboard/dashboard-order.component';
import { DashboardInventoryComponent } from './views/dashboard/dashboard-inventory.component';
import { AssetNatureHttpService } from './services/http/assets/asset-nature.http.service';
import { AssetNatureManageComponent } from './forms/assets/asset-natures/asset-nature.manage';
import { AssetNatureListComponent } from './forms/assets/asset-natures/asset-nature.list';
import { AssetNatureDetailComponent } from './forms/assets/asset-natures/asset-nature.detail';
import { InsuranceCategoryDetail } from './forms/assets/insurance-categories/insurance-category.detail';
import { InsuranceCategoryList } from './forms/assets/insurance-categories/insurance-category.list';
import { InsuranceCategoryManage } from './forms/assets/insurance-categories/insurance-category.manage';
import { InsuranceCategoryHttpService } from './services/http/assets/insurance-category.http.service';
import { TableDefinitionManageComponent } from './forms/common/table-definition/table-definition.manage';
import { ColumnDefinitionListComponent } from './forms/common/column-definition/column-definition.list';
import { ColumnDefinitionDetail } from './forms/common/column-definition/column-definition.detail';
import { RouteChildListComponent } from './forms/common/route-child-definition/route-child.list';
import { RouteChildDetailComponent } from './forms/common/route-child-definition/route-child.detail';
import { PermissionTypeManage } from './forms/common/permission-type/permission-type.manage';
import { PermissionTypeList } from './forms/common/permission-type/permission-type.list';
import { PermissionTypeDetail } from './forms/common/permission-type/permission-type.detail';
import { PermissionManage } from './forms/common/permission/permission.manage';
import { PermissionList } from './forms/common/permission/permission.list';
import { PermissionDetail } from './forms/common/permission/permission.detail';
import { PermissionRoleManage } from './forms/common/permission-role/permission-role.manage';
import { PermissionRoleList } from './forms/common/permission-role/permission-role.list';
import { PermissionRoleDetail } from './forms/common/permission-role/permission-role.detail';
import { ColumnDefinitionManageComponent } from './forms/common/column-definition/column-definition.manage';
import { TableDefinitionDetailComponent } from './forms/common/table-definition/table-definition.detail';
import { TableDefinitionListComponent } from './forms/common/table-definition/table-definition.list';
import { ToastrModule } from 'ngx-toastr';
import { NotificationService } from './services/notification.service';
import { RegisterComponent } from './views/register/register.component';
import { BrandDetail } from './forms/assets/brands/brand.detail';
import { BrandList } from './forms/assets/brands/brand.list';
import { BrandManage } from './forms/assets/brands/brand.manage';
import { BrandHttpService } from './services/http/assets/brand.http.service';
import { BadgeManage } from './forms/common/badge/badge.manage';
import { BadgeDetail } from './forms/common/badge/badge.detail';
import { BadgeList } from './forms/common/badge/badge.list';
import { BadgeHttpService } from './services/http/common/badge.http.service';
import { AccountManage } from './forms/administrations/account/account.manage';
import { AccountDetail } from './forms/administrations/account/account.detail';
import { ExpAccountDetail } from './forms/administrations/exp-account/exp-account.detail';
import { ExpAccountList } from './forms/administrations/exp-account/exp-account.list';
import { ExpAccountManage } from './forms/administrations/exp-account/exp-account.manage';
import { ExpAccountHttpService } from './services/http/administration/exp-account.http.service';
import { ArticleDetail } from './forms/administrations/article/article.detail';
import { ArticleList } from './forms/administrations/article/article.list';
import { ArticleManage } from './forms/administrations/article/article.manage';
import { ArticleHttpService } from './services/http/administration/article.http.service';
import { DivisionManageComponent } from './forms/administrations/divisions/division.manage';
import { DivisionDetailComponent } from './forms/administrations/divisions/division.detail';
import { BudgetManagerList } from './forms/administrations/budget-manager/budget-manager.list';
import { BudgetManagerDetail } from './forms/administrations/budget-manager/budget-manager.detail';
import { BudgetManagerHttpService } from './services/http/administration/budget-manager.http.service';
import { BudgetManagerManage } from './forms/administrations/budget-manager/budget-manager.manage';
import { MaterialManageComponent } from './forms/administrations/materials/material.manage';
import { MaterialList } from './forms/administrations/materials/material.list';
import { MaterialDetailComponent } from './forms/administrations/materials/material.detail';
import { MaterialHttpService } from './services/http/administration/material.http.service';
import { RegionManageComponent } from './forms/administrations/regions/region.manage';
import { RegionDetailComponent } from './forms/administrations/regions/region.detail';
import { EmployeeCostCenterManage } from './forms/administrations/employee-cost-centers/employee-cost-center.manage';
import { EmployeeCostCenterList } from './forms/administrations/employee-cost-centers/employee-cost-center.list';
import { EmployeeCostCenterDetail } from './forms/administrations/employee-cost-centers/employee-cost-center.detail';
import { EmployeeCostCenterHttpService } from './services/http/administration/employee-cost-center.http.service';
import { EmployeeCompanyHttpService } from './services/http/administration/employee-company.http.service';
import { ActiveRowPipe } from './forms/common/pipes/active-row.pipe';
import { DashboardListComponent } from './views/dashboard/dashboard.list';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from './common/reuse-strategy';
import { IdentityService } from './services/http/identity/identity.service';
import { DeviceHttpService } from './services/http/common/device.http.service';
import { DeviceTypeHttpService } from './services/http/common/device-type.http.service';
import { DeviceDetailHttpService } from './services/http/common/device-detail.http.service';
import { DeviceDetail } from './forms/common/devices/device.detail';
import { DeviceList } from './forms/common/devices/device.list';
import { DeviceManage } from './forms/common/devices/device.manage';
import { DeviceTypeDetail } from './forms/common/device-types/device-type.detail';
import { DeviceTypeList } from './forms/common/device-types/device-type.list';
import { DeviceTypeManage } from './forms/common/device-types/device-type.manage';
import { AngularMaterialModule } from './angular-material.module';
import {TableModule} from 'primeng/table';
import {PickListModule} from 'primeng/picklist';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {SplitButtonModule} from 'primeng/splitbutton';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NgxEchartsModule } from 'ngx-echarts';
//import { DashboardBudgetComponent } from './views/dashboard/Budget/dashboard-budget.component';
import { ActivityManage } from './forms/assets/activities/activity.manage';
import { ActivityList } from './forms/assets/activities/activity.list';
import { ActivityDetail } from './forms/assets/activities/activity.detail';
import { ActivityHttpService } from './services/http/assets/activity.http.service';
import {AngularTreeGridModule} from 'angular-tree-grid';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { BudgetPrimeNgList } from './forms/administrations/budget/budget-primeng.list';
import { EmailManagerUiList } from './forms/administrations/email-manager/email-manager-ui.list';
import { ContractDetailUIComponent } from './forms/administrations/contracts/contract.detail.ui';
import { ContractListComponent } from './forms/administrations/contracts/contract.list';
import { ContractManageComponent } from './forms/administrations/contracts/contract.manage';
import { ContractHttpService } from './services/http/administration/contract.http.service';
import { ContractOpHttpService } from './services/http/administration/contract-op.http.service';
import { ContractOpManageComponent } from './forms/administrations/contract-ops/contract-op-manage';
import { ContractOpDetailListComponent } from './forms/administrations/contract-ops/contract-op.detail.list';
import { FileUploadComponent } from './forms/documents/file-upload/file-upload.component';
import { AssetDetailUIAddComponent } from './forms/assets/assets/asset.detail-add.ui';
import { OfferMaterialManageComponent } from './forms/administrations/offer-materials/offer-material.manage';
import { OfferMaterialListComponent } from './forms/administrations/offer-materials/offer-material.list';
import { OfferMaterialDetailComponent } from './forms/administrations/offer-materials/offer-material.detail';
import { OfferMaterialHttpService } from './services/http/administration/offer-material.http.service';
import { AssetScrapManageComponent } from './forms/assets/assets/asset-scrap.manage';
import { AssetClosedManageComponent } from './forms/assets/assets/asset-closed.manage';
import { AssetToValidateManageComponent } from './forms/assets/assets/asset-to-validate.manage';
import { StockDetailComponent } from './forms/administrations/stocks/stock.detail';
import { StockListComponent } from './forms/administrations/stocks/stock.list';
import { StockManageComponent } from './forms/administrations/stocks/stock.manage';
import { StockHttpService } from './services/http/administration/stock.http.service';
import { OrderValidateOfferListComponent } from './forms/assets/assets/order-validate.list';
import { OfferValidateOfferListComponent } from './forms/assets/assets/offer-validate.list';
import { OfferMaterialOrderValidateListComponent } from './forms/administrations/offer-materials/offer-material-order-validate.list';
import { OrderValidateReadOnlyOfferListComponent } from './forms/assets/assets/order-validate-read-only.list';
import { AddAssetValidationListComponent } from './forms/assets/assets/add-asset-validate.list';
import { RateHttpService } from './services/http/administration/rate.http.service';
import { RequestManageComponent } from './forms/administrations/request/request.manage';
import { RequestList } from './forms/administrations/request/request.list';
import { RequestDetailUIComponent } from './forms/administrations/request/request.detail.ui';
import { RequestHttpService } from './services/http/administration/request.http.service';
import { RequestOpHttpService } from './services/http/administration/request-op.http.service';
import { RequestOpManage } from './forms/administrations/request-ops/request-op-manage';
import { RequestOpDetailList } from './forms/administrations/request-ops/request-op.detail.list';
import { AssetDetailUIValidateComponent } from './forms/assets/assets/asset.detail-validate.ui';
import { MatrixHttpService } from './services/http/administration/matrix.http.service';
import { MatrixDetailComponent } from './forms/administrations/matrix/matrix.detail';
import { MatrixListComponent } from './forms/administrations/matrix/matrix.list';
import { MatrixManageComponent } from './forms/administrations/matrix/matrix.manage';
import { LevelHttpService } from './services/http/administration/level.http.service';
import { LevelDetailComponent } from './forms/administrations/level/level.detail';
import { LevelListComponent } from './forms/administrations/level/level.list';
import { LevelManageComponent } from './forms/administrations/level/level.manage';
import { MatrixLevelDetailComponent } from './forms/administrations/matrix-level/matrix-level.detail';
import { MatrixLevelListComponent } from './forms/administrations/matrix-level/matrix-level.list';
import { MatrixLevelManageComponent } from './forms/administrations/matrix-level/matrix-level.manage';
import { MatrixLevelHttpService } from './services/http/administration/matrix-level.http.service';
import { MatrixValidateReadOnlyListComponent } from './forms/administrations/matrix/matrix-read-only.list';
import { EntityFileValidateAssetDownloadComponent } from './forms/common/entity-file-validate-asset-download';
import { TaxManageComponent } from './forms/assets/taxs/tax.manage';
import { TaxListComponent } from './forms/assets/taxs/tax.list';
import { TaxDetailComponent } from './forms/assets/taxs/tax.detail';
import { TaxHttpService } from './services/http/assets/tax.http.service';
import { AcquisitionValidateReadOnlyOfferListComponent } from './forms/assets/assets/acquisition-validate-read-only.list';
import { OrderMaterialDetailComponent } from './forms/administrations/order-materials/order-material.detail';
import { OrderMaterialListComponent } from './forms/administrations/order-materials/order-material.list';
import { OrderMaterialManageComponent } from './forms/administrations/order-materials/order-material.manage';
import { OrderMaterialHttpService } from './services/http/administration/order-material.http.service';
import { OrderMaterialOrderValidateListComponent } from './forms/administrations/order-materials/order-material-order-validate.list';
import { AssetReceptionManageComponent } from './forms/assets/assets/asset-reception.manage';
import { AssetRejectedManageComponent } from './forms/assets/assets/asset-rejected.manage';
import { AssetDetailUIOperationTransferComponent } from './forms/assets/assets/asset.detail-operation-transfer.ui';
import { TimelineModule } from 'primeng/timeline';
import { MessageModule } from 'primeng/message';
import { MessagesModule} from 'primeng/messages';
import { AssetDetailUIOperationCassationComponent } from './forms/assets/assets/asset.detail-operation-cassation.ui';
import {OrganizationChartModule} from 'primeng/organizationchart';
import { ErrorDetailComponent } from './forms/common/errors/error.detail';
import { ErrorListComponent } from './forms/common/errors/error.list';
import { ErrorManageComponent } from './forms/common/errors/error.manage';
import { ErrorHttpService } from './services/http/common/error.http.service';
import { AmortizationHttpService } from './services/http/sap/asset-dep-md-sync';
import { OfferValidateReadOnlyOfferListComponent } from './forms/assets/assets/offer-validate-read-only.list';
import { OfferEmailValidateOfferListComponent } from './forms/assets/assets/offer-email-validate.list';
import { RateDetailComponent } from './forms/assets/rates/rate.detail';
import { RateListComponent } from './forms/assets/rates/rate.list';
import { RateManageComponent } from './forms/assets/rates/rate.manage';
import { ProjectTypeHttpService } from './services/http/assets/project-type.http.service';
import { ProjectTypeListComponent } from './forms/assets/project-types/project-type.list';
import { ProjectTypeManageComponent } from './forms/assets/project-types/project-type.manage';
import { ProjectTypeDivisionDetailComponent } from './forms/administrations/project-type-division/project-type-division.detail';
import { ProjectTypeDivisionListComponent } from './forms/administrations/project-type-division/project-type-division.list';
import { ProjectTypeDivisionManageComponent } from './forms/administrations/project-type-division/project-type-division.manage';
import { ProjectTypeDivisionHttpService } from './services/http/administration/project-type-division.http.service';
import { BudgetBaseListComponent } from './forms/administrations/budget-base/budget-base.list';
import { BudgetBaseValidateManageComponent } from './forms/administrations/budget-base/budget-base-validate.manage';
import { BudgetBaseManageComponent } from './forms/administrations/budget-base/budget-base.manage';
import { BudgetBaseValidateListComponent } from './forms/administrations/budget-base/budget-base-validate.list';
import { BudgetBaseHttpService } from './services/http/administration/budget-base.http.service';
import { AssetEmployeeDetailUIComponent } from './forms/assets/assets/asset-employee.detail.ui';
import { DictionaryItemHttpService } from './services/http/administration/dictionary-item.http.service';
import { AssetEmployeeAddNewAssetListComponent } from './forms/assets/assets/asset-employee-add-new-asset.list';
import { ModelHttpService } from './services/http/assets/model.http.service';
import { ModelDetail } from './forms/assets/models/model.detail';
import { ModelList } from './forms/assets/models/model.list';
import { ModelManage } from './forms/assets/models/model.manage';
import { FileHttpService } from './services/file.service';
import { CapAmortizationHttpService } from './services/http/sap/asset-dep-md-cap-sync';
import { InfoManageComponent } from './forms/info/info.manage';
import { AssetOpRecoManageComponent } from './forms/assets/asset--reco-ops/asset-reco-op-manage';
import { AssetOpRecoDetailListComponent } from './forms/assets/asset--reco-ops/asset-reco-op.detail.list';
import { SignalRService } from './services/signalR.service';
import { NotifyService } from './services/notify.service';
import { BudgetMonthBaseValidateListComponent } from './forms/administrations/budget-month-base/budget-month-base-validate.list';
import { BudgetMonthBaseValidateManageComponent } from './forms/administrations/budget-month-base/budget-month-base-validate.manage';
import { BudgetMonthBaseListComponent } from './forms/administrations/budget-month-base/budget-month-base.list';
import { BudgetMonthBaseManageComponent } from './forms/administrations/budget-month-base/budget-month-base.manage';
import { BudgetMonthBaseHttpService } from './services/http/administration/budget-month-base.http.service';
import { BudgetForecastHttpService } from './services/http/administration/budget-forecast.http.service';
import { BudgetForecastManageComponent } from './forms/administrations/budget-forecast/budget-forecast.manage';
import { BudgetForecastListComponent } from './forms/administrations/budget-forecast/budget-forecast.list';
import { BudgetForecastValidateListComponent } from './forms/administrations/budget-forecast/budget-forecast-validate.list';
import { BudgetForecastValidateManageComponent } from './forms/administrations/budget-forecast/budget-forecast-validate.manage';
import { AssetDetailUIValidateInvPlusComponent } from './forms/assets/assets/asset.detail-validate-inv-plus.ui';
import { AssetInvPlusManageComponent } from './forms/assets/assets/asset-inv-plus.manage';
import { LocalizedNumericInputDirective } from './forms/common/directives/mat-input-commified.directive.';
import { OrderTypeHttpService } from './services/http/orders/order-type.http.service';
import { OrderTypeDetailComponent } from './forms/orders/order-type/order-type.detail';
import { OrderTypeListComponent } from './forms/orders/order-type/order-type.list';
import { OrderTypeManageComponent } from './forms/orders/order-type/order-type.manage';
import { BudgetBaseDetailUIComponent } from './forms/administrations/budget-base/budget-base.detail.ui';
import { AppStateDetailComponent } from './forms/assets/app-states/app-state.detail';
import { AppStateListComponent } from './forms/assets/app-states/app-state.list';
import { AppStateManageComponent } from './forms/assets/app-states/app-state.manage';
import { AppStateDropDownListComponent } from './forms/assets/app-states/app-state.drop-down.list';
import { AssetDetailUIOperationStornoComponent } from './forms/assets/assets/asset.detail-operation-storno.ui';
import { TwoDigitDecimaNumberDirective } from './forms/common/directives/two-digit-decima-number.directive';
import { RequestNotValidatePageComponent } from './forms/common/request-not-validate-page';
import { CreateAssetSAPHttpService } from './services/http/sap/create-asset-sap-http.service';
import { AssetDetailUIAcquisitionOperationStornoComponent } from './forms/assets/assets/asset.detail-acquisition-operation-storno.ui';
import { EmailStatusDstEmployeeValidatePageComponent } from './forms/common/email-status-dst-employee-validate-page';
import { AssetDetailChangeUIComponent } from './forms/assets/assets/asset.detail-change.ui';
import { AssetEmployeePersonalValidateListComponent } from './forms/assets/assets/asset-employee-personal-validate.list';
import { AquisitionAssetSAPHttpService } from './services/http/sap/aquisition-asset-sap-http.service';
import { AssetChangeSAPHttpService } from './services/http/sap/asset-change-sap-http.service';
import { AssetInvMinusSAPHttpService } from './services/http/sap/asset-inv-minus-sap-http.service';
import { AssetInvPlusSAPHttpService } from './services/http/sap/asset-inv-plus-sap-http.service';
import { RetireAssetSAPHttpService } from './services/http/sap/retire-asset-sap-http.service';
import { TransferInStockSAPHttpService } from './services/http/sap/transfer-in-stock-sap-http.service';
import { TransferAssetSAPHttpService } from './services/http/sap/transfer-asset-sap-http.service';
import { AssetDetailUIOperationCloneTransferComponent } from './forms/assets/assets/asset.detail-operation-clone-transfer.ui';
import { EntityTypeDetailComponent } from './forms/administrations/entity-type/entity-type.detail';
import { EntityTypeListComponent } from './forms/administrations/entity-type/entity-type.list';
import { EntityTypeHttpService } from './services/http/administration/entity-type.http.service';
import { EntityTypeManageComponent } from './forms/administrations/entity-type/entity-type.manage';
import { UploadModalComponent } from './forms/common/upload-modal.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppProgressComponent } from './views/progress/progress.component';
import { DndDirective } from './directives/dnd.directive';
import { BudgetBaseAddDetailUIComponent } from './forms/administrations/budget-base/budget-base.add-detail.ui';
import { BudgetBaseOpDetailListComponent } from './forms/administrations/budget-base-ops/budget-base-op.detail.list';
import { BudgetBaseOpManageComponent } from './forms/administrations/budget-base-ops/budget-base-op-manage';
import { BudgetBaseOpHttpService } from './services/http/administration/budget-base-op.http.service';
import { MatButtonModule } from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { AgGridModule } from 'ag-grid-angular';
import { UploadRequestModalComponent } from './forms/common/upload-request-modal.component';
import { UploadOrderModalComponent } from './forms/common/upload-order-modal.component';
import { StockOrderListComponent } from './forms/administrations/stocks/stock-order.list';
import { OfferStockValidateOfferListComponent } from './forms/assets/assets/offer-stock-validate.list';
import { OfferTypeDetailComponent } from './forms/offers/offer-type/offer-type.detail';
import { OfferTypeListComponent } from './forms/offers/offer-type/offer-type.list';
import { OfferTypeManageComponent } from './forms/offers/offer-type/offer-type.manage';
import { OfferTypeHttpService } from './services/http/offfers/offer-type.http.service';
import { OrderEditDetailUIComponent } from './forms/administrations/order/order-edit.detail.ui';
import { BudgetForecastUIListComponent } from './forms/administrations/budget-forecast/budget-forecast.ui.list';
import { EmployeeDivisionHttpService } from './services/http/administration/employee-division.http.service';
import { EmployeeDivisionDetail } from './forms/administrations/employee-divisions/employee-division.detail';
import { EmployeeDivisionList } from './forms/administrations/employee-divisions/employee-division.list';
import { EmployeeDivisionManage } from './forms/administrations/employee-divisions/employee-division.manage';
import { BudgetForecastDetailUIComponent } from './forms/administrations/budget-forecast/budget-forecast.detail.ui';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { RequestBudgetForecastManageComponent } from './forms/administrations/request-budget-forecasts/request-budget-forecast.manage';
import { RequestBudgetForecastListComponent } from './forms/administrations/request-budget-forecasts/request-budget-forecast.list';
import { RequestBudgetForecastDetailComponent } from './forms/administrations/request-budget-forecasts/request-budget-forecast.detail';
import { RequestBudgetForecastHttpService } from './services/http/requests/request-budget-forecast.http.service';
// import {NgApexchartsModule} from "ng-apexcharts";
import {DragDropModule} from 'primeng/dragdrop';
import {DialogService, DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef} from 'primeng/dynamicdialog';
import { RequestBudgetForecastValidateOfferListComponent } from './forms/administrations/request-budget-forecasts/request-budget-forecast-validate.list';
import { MaterialListOrder } from './forms/administrations/materials/material-list-order';
import { RequestBudgetForecastMaterialDetailComponent } from './forms/administrations/request-budget-forecast-materials/request-budget-forecast-material.detail';
import { RequestBudgetForecastMaterialListComponent } from './forms/administrations/request-budget-forecast-materials/request-budget-forecast-material.list';
import { RequestBudgetForecastMaterialManageComponent } from './forms/administrations/request-budget-forecast-materials/request-budget-forecast-material.manage';
import { RequestBudgetForecastMaterialHttpService } from './services/http/requests/request-budget-forecast-material.http.service';
import { RequestBudgetForecastValidateListComponent } from './forms/administrations/request-budget-forecast-materials/request-budget-forecast-material-validate.list';
import { RequestBudgetForecastNgPrimeValidateListComponent } from './forms/administrations/request-budget-forecasts/request-budget-forecast-ng-prime-validate';
import { RequestBudgetForecastViewNgPrimeValidateListComponent } from './forms/administrations/request-budget-forecasts/request-budget-forecast-view-ng-prime-validate';
import {SelectButtonModule} from 'primeng/selectbutton';
import { RequestBudgetForecastMaterialCostCenterManageComponent } from './forms/administrations/request-budget-forecast-material-cost-centers/request-budget-forecast-material-cost-center.manage';
import { RequestBudgetForecastMaterialCostCenterListComponent } from './forms/administrations/request-budget-forecast-material-cost-centers/request-budget-forecast-material-cost-center.list';
import { RequestBFMaterialCostCenterDetailComponent } from './forms/administrations/request-budget-forecast-material-cost-centers/request-budget-forecast-material-cost-center.detail';
import { RequestBFMaterialCostCenterValidateListComponent } from './forms/administrations/request-budget-forecast-material-cost-centers/request-budget-forecast-material-cost-center-validate.list';
import { RequestBudgetForecastMaterialCostCenterHttpService } from './services/http/requests/request-budget-forecast-material-cost-center.http.service';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {BlockUIModule} from 'primeng/blockui';
import { TagModule } from 'primeng/tag';
import { ColumnDefinitionRoleHttpService } from './services/http/common/column-definition-role.http.service';
import { RouteRoleHttpService } from './services/http/common/route-role.http.service';
import { RouteChildRoleHttpService } from './services/http/common/route-child-role.http.service';
import { RequestBudgetForecastMaterialViewNgPrimeValidateListComponent } from './forms/administrations/request-budget-forecast-materials/request-budget-forecast-material-view-ng-prime-validate';
import { EmailStatusOrderValidateB1PageComponent } from './forms/common/email-status-order-validate-B1-page';
import { EmailStatusOrderValidateL4PageComponent } from './forms/common/email-status-order-validate-L4-page';
import { EmailStatusOrderValidateL3PageComponent } from './forms/common/email-status-order-validate-L3-page';
import { EmailStatusOrderValidateL2PageComponent } from './forms/common/email-status-order-validate-L2-page';
import { EmailStatusOrderValidateL1PageComponent } from './forms/common/email-status-order-validate-L1-page';
import { EmailStatusOrderValidateS3PageComponent } from './forms/common/email-status-order-validate-S3-page';
import { EmailStatusOrderValidateS2PageComponent } from './forms/common/email-status-order-validate-S2-page';
import { EmailStatusOrderValidateS1PageComponent } from './forms/common/email-status-order-validate-S1-page';
import { PlantDetailComponent } from './forms/assets/plants/plant.detail';
import { PlantListComponent } from './forms/assets/plants/plant.list';
import { PlantManageComponent } from './forms/assets/plants/plant.manage';
import { PlantDropDownListComponent } from './forms/assets/plants/plant.drop-down.list';
import { PlantHttpService } from './services/http/assets/plant.http.service';
import { EntityFileRequestDelete } from './forms/common/entity-file-request-delete';
import { EntityFileRequestUploadComponent } from './forms/common/entity-file-request-upload';
import { UploadOfferModalComponent } from './forms/common/upload-offer-modal.component';
import { UploadRequestBudgetForecastModalComponent } from './forms/common/upload-request-budget-forecast-modal.component';
import {FieldsetModule} from 'primeng/fieldset';
import {PanelModule} from 'primeng/panel';
import { MatTooltipDefaultOptions, MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
import { AssetDetailUIOperationStornoMFXComponent } from './forms/assets/assets/asset.detail-operation-storno-mfx.ui';
import { TooltipModule } from 'primeng/tooltip';
import { StorageDetailComponent } from './forms/stock/storages/storage.detail';
import { StorageListComponent } from './forms/stock/storages/storage.list';
import { StorageManageComponent } from './forms/stock/storages/storage.manage';
import { StorageHttpService } from './services/http/stock/storage.http.service';
import { EmployeeStorageHttpService } from './services/http/administration/employee-storage.http.service';
import { EmployeeStorageDetail } from './forms/administrations/employee-storages/employee-storage.detail';
import { EmployeeStorageList } from './forms/administrations/employee-storages/employee-storage.list';
import { EmployeeStorageManage } from './forms/administrations/employee-storages/employee-storage.manage';
import {DataViewModule} from 'primeng/dataview';
import { StockITManageComponent } from './forms/administrations/stocks/stock-it.manage';
// import { AssetAgGridList } from './forms/assets/assets/asset-inv-temp-detail.list';
import { AssetReceptionDetailUIAddComponent } from './forms/assets/assets/asset-reception.detail-add.ui';
import { AssetBudgetForecastCorrectionManageComponent } from './forms/assets/assets/asset-budget-forecast-correction.manage';
import { HeaderKanbanComponent } from './forms/kanban/header/header/header.component';
import { DialogComponent } from './forms/kanban/dialog/dialog/dialog.component';
import { DialogBodyComponent } from './forms/kanban/dialog/dialog-body/dialog-body.component';
import { BoardComponent } from './forms/kanban/board/board/board.component';
import { CommentItemComponent } from './forms/kanban/board/comment-item/comment-item.component';
import { BoardItemComponent } from './forms/kanban/board/board-item/board-item.component';
import { ColorPanelComponent } from './forms/kanban/board/color-panel/color-panel.component';
import { RequestKanbanManageComponent } from './forms/administrations/request/request-kanban.manage';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { QuillModule } from 'ngx-quill';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { environment } from '../environments/environment';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RequestListPrimeNgComponent } from './forms/administrations/request/request-list-ng-prime';
import { RequestEditComponent } from './forms/administrations/request/request-edit';
import { OfferViewNgPrimeValidateListComponent } from './forms/administrations/offer/offer-view-ng-prime-validate';
import { OfferMaterialViewNgPrimeValidateListComponent } from './forms/administrations/offer-materials/offer-material-view-ng-prime-validate';
import { OrderViewNgPrimeValidateListComponent } from './forms/administrations/order/order-view-ng-prime-validate';
import { RequestViewNgPrimeOpListComponent } from './forms/administrations/request-ops/request-view-ng-prime-op';
import { AssetInvTempDetailListComponent } from './forms/assets/assets/asset-inv-temp-detail.list';
import { RouteStateService } from './services/http/common/route-state.service';
import { HeaderBreadcrumbComponent } from './forms/common/header-breadcrumb/header-breadcrumb.component';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import { DictionaryItemListPrimeNgComponent } from './forms/administrations/dictionary-item/dictionary-item-list-ng-prime';
import { BrandListPrimeNgComponent } from './forms/assets/brands/brand-list-ng-prime';
import { ModelListPrimeNgComponent } from './forms/assets/models/model-list-ng-prime';
import { MobilePhoneHttpService } from './services/http/common/mobile-phone.http.service';
import {InputMaskModule} from 'primeng/inputmask';
import {InputNumberModule} from 'primeng/inputnumber';
import { BudgetForecastCorrectionDetailUIComponent } from './forms/administrations/budget-forecast/budget-forecast-correction.detail.ui';
import { BudgetForecastMaterialViewNgPrimeValidateListComponent } from './forms/administrations/budget-forecast/budget-forecast-material-view-ng-prime-validate';
import { WFHCheckDetailComponent } from './forms/wfh/wfh-check/wfh-check.detail';
import { WFHCheckListComponent } from './forms/wfh/wfh-check/wfh-check.list';
import { WFHCheckManageComponent } from './forms/wfh/wfh-check/wfh-check.manage';
import { WFHCheckHttpService } from './services/http/wfh/wfh-check.http.service';
import { BudgetForecastTransferDetailUIComponent } from './forms/administrations/budget-forecast/budget-forecast-transfer.detail.ui';
import { UploadBudgetTransferModalComponent } from './forms/common/upload-budget-transfer-modal.component';
import { OrderListPrimeNgComponent } from './forms/administrations/order/order-list-ng-prime';
import { OrderEditComponent } from './forms/administrations/order/order-edit';
import { DashboardListPrimeNgComponent } from './views/dashboard/dashboard-list-ng-prime';
import { CustomerService } from './services/http/common/customer-service';
import { DashboardListWarehousePrimeNgComponent } from './views/dashboard/dashboard-list-warehouse-ng-prime';
import { FullComponent } from './views/layout/full/full.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MaterialModule} from './modules/material/material.module';
import {CommonHeaderComponent} from './common/common-header/common-header.component';
import {DivisionsItemSelect} from './forms/administrations/divisions/selection/divisions.item-select';
import {DivisionsSelectionDialog} from './forms/administrations/divisions/selection/divisions.selection.dialog';
import {EmployeesItemSelect} from './forms/administrations/employees/selection/employees.item-select';
import {EmployeesSelectionDialog} from './forms/administrations/employees/selection/employees.selection.dialog';
import {RolesItemSelect} from './forms/auth/selection/roles.item-select';
import {RolesSelectionDialog} from './forms/auth/selection/roles.selection.dialog';
import {ProjectAddEditComponent} from './forms/assets/projects/project-add-edit/project-add-edit.component';
import {InventoriesSelectionDialog} from './forms/inventory/selection/inventories.selection.dialog';
import {InventoriesItemSelect} from './forms/inventory/selection/inventories.item-select';
import {IdentitySelectionDialog} from './forms/auth/identity-selection/identity.selection.dialog';
import {IdentityItemSelect} from './forms/auth/identity-selection/identity.item-select';
import {CostCenterSelectionDialog} from './forms/administrations/cost-centers/selection/cost-center.selection.dialog';
import {CostCenterItemSelect} from './forms/administrations/cost-centers/selection/cost-center.item-select';
import {ConfirmationDialogComponent} from './common/confirmation-dialog/confirmation-dialog.component';
import {ReconciliationModalComponent} from './forms/inventory/reconciliation-modal/reconciliation-modal.component';
import {LightboxModule} from 'ngx-lightbox';
import {NewSupplierOperationComponent} from './forms/documents/operations/new-supplier-operation/new-supplier-operation.component';
import {OfferTypeSelectionDialog} from './forms/offers/offer-type/selection/offer-type.selection.dialog';
import {OfferTypeItemSelect} from './forms/offers/offer-type/selection/offer-type.item-select';
import {RequestSelectionDialog} from './forms/administrations/request/selection/request.selection.dialog';
import { RequestItemSelect } from './forms/administrations/request/selection/request.item-select';
import {OfferSelectionDialog} from './forms/administrations/offer/selection/offer.selection.dialog';
import { OfferItemSelect } from './forms/administrations/offer/selection/offer.item-select';
import {TranslocoRootModule} from './transloco-root.module';
import {PartnersSelectionDialog} from './forms/documents/partners/selection/partners.selection.dialog';
import { PartnersItemSelect } from './forms/documents/partners/selection/partners.item-select';
import {PartnerHttpService} from './services/http/documents/partner.http.service';
import {CompanySelectionDialog} from './forms/assets/companies/selection/company.selection.dialog';
import {CompanyItemSelect} from './forms/assets/companies/selection/company.item-select';
import {OrderTypeSelectionDialog} from './forms/orders/order-type/selection/order-type.selection.dialog';
import {OrderTypeItemSelect} from './forms/orders/order-type/selection/order-type.item-select';
import {StockOrderSelectionDialog} from './forms/administrations/stocks/stock-order-selection/stock-order.selection.dialog';
import { StockOrderItemSelect } from './forms/administrations/stocks/stock-order-selection/stock-order.item-select';
import {PlantsSelectionDialog} from './forms/assets/plants/selection/plants.selection.dialog';
import {PlantsItemSelect} from './forms/assets/plants/selection/plants.item-select';
import {AdministrationSelectionDialog} from './forms/administrations/administrations/selection/administration.selection.dialog';
import {AdministrationItemSelect} from './forms/administrations/administrations/selection/administration.item-select';
import {DepartmentSelectionDialog} from './forms/administrations/departments/selection/department.selection.dialog';
import {DepartmentItemSelect} from './forms/administrations/departments/selection/department.item-select';
import {ProjectSelectionDialog} from './forms/assets/projects/selection/project.selection.dialog';
import {ProjectItemSelect} from './forms/assets/projects/selection/project.item-select';
import {ActivitySelectionDialog} from './forms/assets/activities/selection/activity.selection.dialog';
import {ActivityItemSelect} from './forms/assets/activities/selection/activity.item-select';
import {AccMonthSelectionDialog} from './forms/accounting/selection/acc-month.selection.dialog';
import {AccMonthItemSelect} from './forms/accounting/selection/acc-month.item-select';
import {AssetTypeSelectionDialog} from './forms/assets/asset-types/selection/asset-type.selection.dialog';
import {AssetTypeItemSelect} from './forms/assets/asset-types/selection/asset-type.item-select';
import {AdmCenterSelectionDialog} from './forms/administrations/adm-centers/selection/adm-center.selection.dialog';
import {AdmCenterItemSelect} from './forms/administrations/adm-centers/selection/adm-center.item-select';
import {ProjectTypeSelectionDialog} from './forms/assets/project-types/selection/project-type.selection.dialog';
import {ProjectTypeItemSelect} from './forms/assets/project-types/selection/project-type.item-select';
import {LocationsSelectionDialog} from './forms/administrations/locations/selection/locations.selection.dialog';
import {LocationsItemSelect} from './forms/administrations/locations/selection/locations.item-select';
import {NewOperationDialogComponent} from './forms/assets/assets/new-operation-dialog/new-operation-dialog.component';
import {DepartmentDetailHttpService} from './services/http/administration/department-detail.http.service';
import {InvStateSelectionDialog} from './forms/inventory/inv-state/selection/inv-state.selection.dialog';
import {InvStateItemSelect} from './forms/inventory/inv-state/selection/inv-state.item-select';
import {AssetEditComponent} from './forms/assets/assets/asset-edit-dialog/asset-edit.component';
import {AssetClassHttpService} from './services/http/assets/asset-class.http.service';
import {ExpAccountSelectionDialog} from './forms/administrations/exp-account/selection/exp-account.selection.dialog';
import {ExpAccountItemSelect} from './forms/administrations/exp-account/selection/exp-account.item-select';
import {AssetCategoriesSelectionDialog} from './forms/assets/asset-categories/selection/asset-categories.selection.dialog';
import {AssetCategoriesItemSelect} from './forms/assets/asset-categories/selection/asset-categories.item-select';
import {AssetAddDialogComponent} from './forms/assets/assets/asset-add-dialog/asset-add-dialog.component';
import {OrdersSelectionDialog} from './forms/administrations/order/selection/orders.selection.dialog';
import {OrdersItemSelect} from './forms/administrations/order/selection/orders.item-select';
import {BudgetAddDialogComponent} from './forms/administrations/budget-base/budget-add-dialog/budget-add-dialog.component';
import {CountriesSelectionDialog} from './forms/administrations/countries/selection/countries.selection.dialog';
import {CountriesItemSelect} from './forms/administrations/countries/selection/countries.item-select';
import {RegionsSelectionDialog} from './forms/administrations/regions/selection/regions.selection.dialog';
import {RegionsItemSelect} from './forms/administrations/regions/selection/regions.item-select';
import {AssetSapOperationDialogComponent} from './forms/assets/assets/asset-sap-operation-dialog/asset-sap-operation-dialog.component';
import {TableDefinitionSelectionDialog} from './forms/common/table-definition/selection/table-definition.selection.dialog';
import {TableDefinitionItemSelect} from './forms/common/table-definition/selection/table-definition.item-select';
import {AvatarModule} from 'ngx-avatar';
import {BudgetForecastSelectionDialog} from './forms/administrations/budget-forecast/selection/budget-forecast.selection.dialog';
import {BudgetForecastItemSelect} from './forms/administrations/budget-forecast/selection/budget-forecast.item-select';
import {BudgetEditDialogComponent} from './forms/administrations/budget-base/budget-edit-dialog/budget-edit-dialog.component';
import {InventoryAddEditComponent} from './forms/inventory/inventory-add-edit/inventory-add-edit.component';
import {InvStateAddEditComponent} from './forms/inventory/inv-state/inv-state-add-edit/inv-state-add-edit.component';
import { OrderDetailsDialogComponent } from './forms/administrations/order/order-details-dialog/order-details-dialog.component';
import {RequestAddDialogComponent} from './forms/administrations/request/request-add-dialog/request-add-dialog.component';
import {OrderOpHttpService} from './services/http/administration/order-op.http.service';
import {OrderEditDialogComponent} from './forms/administrations/order/order-edit-dialog/order-edit-dialog.component';
import { ContractsSelectionDialog } from './forms/administrations/contracts/selection/contracts.selection.dialog';
import {ContractsItemSelect} from './forms/administrations/contracts/selection/contracts.item-select';
import {OrderTypeAddEditComponent} from './forms/orders/order-type/order-type-add-edit/order-type-add-edit.component';
import {OfferDetailsDialogComponent} from './forms/administrations/offer/offer-details-dialog/offer-details-dialog.component';
import {OfferOpHttpService} from './services/http/administration/offer-op.http.service';
import {LevelAddEditComponent} from './forms/administrations/level/level-add-edit/level-add-edit.component';
import {ProjectTypeAddEditComponent} from './forms/assets/project-types/project-type-add-edit/project-type-add-edit.component';
import {StoragesAddEditComponent} from './forms/stock/storages/storages-add-edit/storages-add-edit.component';
import {TableDefinitionAddEditComponent} from './forms/common/table-definition/table-definition-add-edit/table-definition-add-edit.component';
import {DictionaryItemsSelectionDialog} from './forms/administrations/dictionary-item/selection/dictionary-items.selection.dialog';
import {DictionaryItemsItemSelect} from './forms/administrations/dictionary-item/selection/dictionary-items.item-select';
import {BrandsSelectionDialog} from './forms/assets/brands/selection/brands.selection.dialog';
import {BrandsItemSelect} from './forms/assets/brands/selection/brands.item-select';
import {ModelsSelectionDialog} from './forms/assets/models/selection/models.selection.dialog';
import {ModelsItemSelect} from './forms/assets/models/selection/models.item-select';
import {PermissionTypeAddEditComponent} from './forms/common/permission-type/permission-type-add-edit/permission-type-add-edit.component';
import {PermissionAddEditComponent} from './forms/common/permission/permission-add-edit/permission-add-edit.component';
import {MaterialAddEditComponent} from './forms/administrations/materials/material-add-edit/material-add-edit.component';
import {AssetCategoryAddEditComponent} from './forms/assets/asset-categories/asset-category-add-edit/asset-category-add-edit.component';
import {AssetTypeAddEditComponent} from './forms/assets/asset-types/asset-type-add-edit/asset-type-add-edit.component';
import {BudgetForecastTransferDialogComponent} from './forms/administrations/budget-forecast/budget-forecast-transfer-dialog/budget-forecast-transfer-dialog.component';
import {AssetAddFromStockDialogComponent} from './forms/assets/assets/assets-add-from-stock-dialog/asset-add-from-stock-dialog.component';
import {PoOrderEditDialogComponent} from './forms/administrations/order/po-order-edit-dialog/po-order-edit-dialog.component';
import {AppStateSelectionDialog} from './forms/assets/app-states/selection/app-state.selection.dialog';
import { AppStateItemSelect } from './forms/assets/app-states/selection/app-state.item-select';
import {OfferTypeAddEditComponent} from './forms/offers/offer-type/offer-type-add-edit/offer-type-add-edit.component';
import {ColorPickerModule} from 'ngx-color-picker';
import {ExpAccountAddEditComponent} from './forms/administrations/exp-account/exp-account-add-edit/exp-account-add-edit.component';
import {ArticleAddEditComponent} from './forms/administrations/article/article-add-edit/article-add-edit.component';
import {DimensionAddEditComponent} from './forms/assets/dimensions/dimension-add-edit/dimension-add-edit.component';
import {MatrixAddEditComponent} from './forms/administrations/matrix/matrix-add-edit/matrix-add-edit.component';
import {AccMonthAddEditComponent} from './forms/accounting/acc-month-add-edit/acc-month-add-edit.component';
import {PrEditDialogComponent} from './forms/administrations/request/pr-edit-dialog/pr-edit-dialog.component';
import {PoOrderDetailsDialogComponent} from './forms/administrations/order/po-order-details-dialog/po-order-details-dialog.component';
import {ContractAddEditComponent} from './forms/administrations/contracts/contract-add-edit/contract-add-edit.component';
import {BudgetSelectionDialog} from './forms/administrations/budget/selection/budget.selection.dialog';
import {BudgetItemSelect} from './forms/administrations/budget/selection/budget.item-select';
import {ConfigValuesAddEditComponent} from './forms/common/config-values-add-edit/config-values-add-edit.component';
import {ColumnDefinitionAddEditComponent} from './forms/common/column-definition/column-definition-add-edit/column-definition-add-edit.component';
import {DepartmentAddEditComponent} from './forms/administrations/departments/department-add-edit/department-add-edit.component';
import {AdministrationAddEditComponent} from './forms/administrations/administrations/administration-add-edit/administration-add-edit.component';
import {BudgetManagerAddEditComponent} from './forms/administrations/budget-manager/budget-manager-add-edit/budget-manager-add-edit.component';
import {TypeAddEditComponent} from './forms/administrations/types/type-add-edit/type-add-edit.component';
import {SubTypeAddEditComponent} from './forms/administrations/sub-types/sub-type-add-edit/sub-type-add-edit.component';
import {AssetClassAddEditComponent} from './forms/assets/asset-classes/asset-class-add-edit/asset-class-add-edit.component';
import {AdmCenterAddEditComponent} from './forms/administrations/adm-centers/adm-center-add-edit/adm-center-add-edit.component';
import {RegionAddEditComponent} from './forms/administrations/regions/region-add-edit/region-add-edit.component';
import {InsuranceCategoryAddEditComponent} from './forms/assets/insurance-categories/insurance-category-add-edit/insurance-category-add-edit.component';
import {DictionaryTypeAddEditComponent} from './forms/administrations/dictionary-type/dictionary-type-add-edit/dictionary-type-add-edit.component';
import {DictionaryTypeHttpService} from './services/http/administration/dictionary-type.http.service';
import {DeviceTypeAddEditComponent} from './forms/common/device-types/device-type-add-edit/device-type-add-edit.component';
import {AssetFiltersListComponent} from './forms/assets/assets/assets-filters-list/assets-filters.list';
import {TaxSelectionDialog} from './forms/assets/taxs/selection/tax.selection.dialog';
import {TaxItemSelect} from './forms/assets/taxs/selection/tax.item-select';
import {UomSelectionDialog} from './forms/assets/uoms/selection/uom.selection.dialog';
import {UomItemSelect} from './forms/assets/uoms/selection/uom.item-select';
import {AssetCloneDialogComponent} from './forms/assets/assets/asset-clone-dialog/asset-clone-dialog.component';
import {AssetRetireDialogComponent} from './forms/assets/assets/asset-retire-dialog/asset-retire-dialog.component';
import {AssetStornoDialogComponent} from './forms/assets/assets/asset-storno-dialog/asset-storno-dialog.component';
import {BadgeAddEditComponent} from './forms/common/badge/badge-add-edit/badge-add-edit.component';
import {RouteDefinitionAddEditComponent} from './forms/common/route-definition/route-definition-add-edit/route-definition-add-edit.component';
import {BadgeSelectionDialog} from './forms/common/badge/selection/badge.selection.dialog';
import {BadgeItemSelect} from './forms/common/badge/selection/badge.item-select';
import {RouteDefinitionSelectionDialog} from './forms/common/route-definition/selection/route-definition.selection.dialog';
import {RouteDefinitionItemSelect} from './forms/common/route-definition/selection/route-definition.item-select';
import {RouteChildrenDefinitionAddEditComponent} from './forms/common/route-child-definition/route-children-definition-add-edit/route-children-definition-add-edit.component';
import {PartnerAddEditComponent} from './forms/documents/partners/partner-add-edit/partner-add-edit.component';
import {RateAddEditComponent} from './forms/assets/rates/rate-add-edit/rate-add-edit.component';
import {EmailTypeAddEditComponent} from './forms/administrations/email-type/email-type-add-edit/email-type-add-edit.component';
import {AssetEntitySelectionDialog} from './forms/assets/asset-entity/selection/asset-entity.selection.dialog';
import { AssetEntityItemSelect } from './forms/assets/asset-entity/selection/asset-entity.item-select';
import {MapSubstituteEmployeeSelectionDialog} from './forms/administrations/employees/map-substitute-employee/map-substitute-employee.selection.dialog';
import {ChangePasswordDialogComponent} from './forms/auth/change-password-dialog/change-password-dialog.component';
import {RoleSelectorModalComponent} from './forms/auth/role-selector-modal/role-selector-modal.component';
import {PrAddDialogComponent} from './forms/administrations/request/pr-add-dialog/pr-add-dialog.component';
import {PrRequestEditDialogComponent} from './forms/administrations/request/pr-request-edit-dialog/pr-request-edit-dialog.component';
import {ColumnFilterAddEditComponent} from './forms/common/column-filter/column-filter-add-edit/column-filter-add-edit.component';
import {ColumnFilterListComponent} from './forms/common/column-filter/column-filter.list';
import {ColumnFilterManageComponent} from './forms/common/column-filter/column-filter.manage';
import {ColumnFilterHttpService} from './services/http/common/column-filter.http.service';
import {ProjectTypeDivisionSelectionDialog} from './forms/administrations/project-type-division/selection/project-type-division.selection.dialog';
import {ProjectTypeDivisionItemSelect} from './forms/administrations/project-type-division/selection/project-type-division.item-select';
import { AssetReceptionHistoryManageComponent } from './forms/assets/assets/asset-reception-history.manage';
import { AssetPreValidateManageComponent } from './forms/assets/assets/asset-pre-validate.manage';
import { UploadStornoModalComponent } from './forms/common/upload-storno-modal.component';
import { UploadPreReceptionModalComponent } from './forms/common/upload-pre-reception-modal.component';
import { UploadPublicStornoModalComponent } from './forms/common/upload-public-storno-modal.component';
import { RequestBudgetForecastValidateStornoListComponent } from './forms/administrations/request-budget-forecasts/request-budget-forecast-validate-storno.list';
import {DeviceAddEditComponent} from './forms/common/devices/device-add-edit/device-add-edit.component';
import {AppStateAddEditComponent} from './forms/assets/app-states/app-state-add-edit/app-state-add-edit.component';
import {MaterialsSelectionDialog} from './forms/administrations/materials/selection/materials.selection.dialog';
import {MaterialsItemSelect} from './forms/administrations/materials/selection/materials.item-select';
import {DevicesSelectionDialog} from './forms/common/devices/selection/devices.selection.dialog';
import {DevicesItemSelect} from './forms/common/devices/selection/devices.item-select';
import {IdentityAddEditComponent} from './forms/auth/identity-add-edit/identity-add-edit.component';
import {DeviceTypeSelectionDialog} from './forms/common/device-types/selection/device-type.selection.dialog';
import {DeviceTypeItemSelect} from './forms/common/device-types/selection/device-type.item-select';
import {TaxAddEditComponent} from './forms/assets/taxs/tax-add-edit/tax-add-edit.component';
import {CountyAddEditComponent} from './forms/administrations/counties/county-add-edit/county-add-edit.component';
import {CountyItemSelect} from './forms/administrations/counties/selection/county.item-select';
import {CityAddEditComponent} from './forms/administrations/cities/city-add-edit/city-add-edit.component';
import {LocationAddEditComponent} from './forms/administrations/locations/location-add-edit/location-add-edit.component';
import {CitiesSelectionDialog} from './forms/administrations/cities/selection/cities.selection.dialog';
import { CitiesItemSelect } from './forms/administrations/cities/selection/cities.item-select';
import {RoomAddEditComponent} from './forms/administrations/rooms/room-add-edit/room-add-edit.component';
import {CostCentersAddEditDialog} from './forms/administrations/cost-centers/cost-centers-add-edit/cost-centers.add-edit.dialog';
import {CountySelectionDialog} from './forms/administrations/counties/selection/county.selection.dialog';
import {RoomHttpService} from './services/http/administration/room.http.service';
import {ProjectTypeDivisionAddEditComponent} from './forms/administrations/project-type-division/project-type-division-add-edit/project-type-division-add-edit.component';
import {AccountSelectionDialog} from './forms/administrations/account/selection/account.selection.dialog';
import {AccountItemSelect} from './forms/administrations/account/selection/account.item-select';
import {ReasonDialogComponent} from './common/reason-dialog/reason-dialog.component';
import {BudgetForecastCorrectionDialogComponent} from './forms/administrations/budget-forecast/budget-forecast-correction-dialog/budget-forecast-correction-dialog.component';
import {BudgetBaseSelectionDialog} from './forms/administrations/budget-base/selection/budget-base.selection.dialog';
import {BudgetBaseItemSelect} from './forms/administrations/budget-base/selection/budget-base.item-select';
import {AssetReceptionDetailsDialog} from './forms/assets/assets/asset-reception-details/asset-reception-details.dialog';
import {AccountAddEditComponent} from "./forms/administrations/account/account-add-edit/account-add-edit.component";
import {DivisionAddEditDialog} from "./forms/administrations/divisions/division-add-edit/division.add-edit.dialog";
import {ColumnFilterSelectionDialog} from './forms/common/column-filter/selection/column-filter.selection.dialog';
import {ColumnFilterItemSelect} from './forms/common/column-filter/selection/column-filter.item-select';
import {EmailTypeSelectionDialog} from './forms/administrations/email-type/selection/email-type.selection.dialog';
import {EmailTypeItemSelect} from './forms/administrations/email-type/selection/email-type.item-select';
import {AssetValidateDialogComponent} from './forms/assets/assets/asset-validate-dialog/asset-validate-dialog.component';
import { AssetDetailUIPreValidateComponent } from './forms/assets/assets/asset.detail-pre-validate.ui';
import {AssetPreValidateDialogComponent} from './forms/assets/assets/asset-pre-validate-dialog/asset-pre-validate-dialog.component';
import {AssetPublicRetireDialogComponent} from './forms/assets/assets/asset-public-retire-dialog/asset-public-retire-dialog.component';
import {UpdateDataImportModalComponent} from './common/update-data-import-modal/update-data-import-modal.component';
import {ProgressImportDialogComponent} from './common/progress-import-dialog/progress-import-dialog.component';
import {AssetEntitySimpleItemSelect} from './forms/assets/assets/asset-entity-selection/asset-entity-simple.item-select';
import {AssetEntitySimpleSelectionDialog} from './forms/assets/assets/asset-entity-selection/asset-entity-simple.selection.dialog';
import {PermissionRoleAddEditDialog} from './forms/common/permission-role/permission-role-add-edit/permission-role.add-edit.dialog';
import {PermissionTypeSelectionDialog} from './forms/common/permission-type/selection/permission-type.selection.dialog';
import {PermissionTypeItemSelect} from './forms/common/permission-type/selection/permission-type.item-select';
import {PermissionSelectionDialog} from './forms/common/permission/selection/permission.selection.dialog';
import {PermissionItemSelect} from './forms/common/permission/selection/permission.item-select';
import {EmployeeDetailsComponent} from './forms/administrations/employees/employee-details/employee-details.component';
import {EmployeesAddEditDialog} from './forms/administrations/employees/employees-add-edit/employees.add-edit.dialog';
import {StorageSelectionDialog} from './forms/stock/storages/selection/storage.selection.dialog';
import {StorageItemSelect} from './forms/stock/storages/selection/storage.item-select';
import {PhoneValidationDialogComponent} from './common/phone-validation-dialog/phone-validation-dialog.component';
import { RequestBudgetBaseItemSelect } from './forms/administrations/request/selection/request.-budget-base-item-select';
import { RequestBudgetBaseSelectionDialog } from './forms/administrations/request/selection/request-budget-base-.selection.dialog';
import {ProgressService} from './services/progress.service';
import {ConfirmReconciliationModalComponent} from './common/confirm-reconciliation-modal/confirm-reconciliation-modal.component';
import { RoomsItemSelect } from './forms/administrations/rooms/selection/rooms.item-select';
import { RoomsSelectionDialog } from './forms/administrations/rooms/selection/rooms.selection.dialog';
import { DarkModeToggleComponent } from './common/dark-mode-toggle/dark-mode-toggle.component';
import { EmployeeCompanyDetail } from './forms/administrations/employee-companies/employee-company.detail';
import { EmployeeCompanyList } from './forms/administrations/employee-companies/employee-company.list';
import { EmployeeCompanyManage } from './forms/administrations/employee-companies/employee-company.manage';
import {DictionaryItemAddEditComponent} from './forms/administrations/dictionary-item/dictionary-item-add-edit/dictionary-item-add-edit.component';
import {DictionaryTypeSelectionDialog} from './forms/administrations/dictionary-type/selection/dictionary-type.selection.dialog';
import {DictionaryTypeItemSelect} from './forms/administrations/dictionary-type/selection/dictionary-type.item-select';
import {ModelAddEditComponent} from './forms/assets/models/model-item-add-edit/model-add-edit.component';
import {BrandAddEditComponent} from './forms/assets/brands/brand-item-add-edit/brand-add-edit.component';
import { AssetWFHListComponent } from './forms/assets/assets/asset-wfh.list';
import { AssetWFHFiltersListComponent } from './forms/assets/assets/assets-wfh-filters-list/assets-wfh-filters.list';
import { WFHValidateOfferListComponent } from './forms/assets/assets/wfh-validate.list';
import { UploadInventoryListModalComponent } from './forms/common/upload-inventory-list-modal.component';
import { EntityFileInventoryListDelete } from './forms/common/entity-file-inventory-list-delete';
import { UploadFarModalComponent } from './upload-far-modal/upload-far-modal.component';
import { BoolWFHStatePipe } from './forms/common/pipes/boolWFHState.pipe';
import { PoOrderUploadModalComponent } from './forms/common/upload-modal/po-order.upload-modal.component';
import { AssetPreValidateAddEditDialog } from './forms/assets/assets/asset-pre-validate.add-edit.dialog';
import { BoolPipeSapValidation } from './forms/common/pipes/bool-pipe_sap_validaton';
import { CommitteeMembersComponent } from './forms/inventory/committee-members/committee-members.component';
import { InvCommitteeMembersListComponent } from './forms/inventory/inventory-plans/inv-committee-member/inv-committee-member.list';
import { AssetAsyncHttpService } from './services/http/administration/assetasync.http.service';
import { ProjectTypeDetailComponent } from './forms/assets/project-types/project-type.detail';
import { CommitteeMemberAddEditDialog } from './forms/inventory/committee-members/committee-member.add-edit.dialog';
import { CommitteeMemberHttpService } from './services/http/inventory/committee-member-detail.http.service';
import { CommitteePositionsListComponent } from './forms/inventory/committee-positions/committee-position.list';
import { CommitteePostitionItemSelect } from './forms/inventory/committee-positions/committee-position.item-select';
import { CommitteePostionSelectionDialog } from './forms/inventory/committee-positions/committee-position.selection.dialog';
import { CommitteePositionHttpService } from './services/http/inventory/committee-position-detail.http.service';
import { AdministrationCommitteeAddEditDialog } from './forms/administrations/administrations/administration-add-edit/administration-committee.add-edit.dialog';
import { AdministrationCommitteesListComponent } from './forms/administrations/administrations/administration-add-edit/administration-committtee.list';
import { InvCommitteeMemberAddEditDialog } from './forms/inventory/inventory-plans/inv-committee-member/inv-committee-member-add-edit.dialog';
import { CostCenterCommitteesListComponent } from './forms/administrations/cost-centers/cost-centers-add-edit/cost-center-committee.list';
import { InvCommitteePlanListComponent } from './forms/inventory/inventory-plans/inventory-plans.list';
import { InventoryPlanHttpService } from './services/http/inventory/inventory-plan-detail.http.service';
import { InventoryPlanComponent } from './forms/inventory/inventory-plans/inventory-plans.component';
import { InventoryPlansDetailDialog } from './forms/inventory/inventory-plans/inventory-plans-detail.dialog';
import { RequestBudgetForecastMaterialMultiple } from './model/api/administration/RequestBudgetForecastMaterialMultiple';
import { PrintLabelHttpService } from './services/http/common/print-label.http.service';
import { AssetEmployeePersonalValidateDetailUIComponent } from './forms/assets/assets/asset-employee-personal-validate.detail.ui';

export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 0,
  hideDelay: 0,
  touchendHideDelay: 1500
};

export function getToken() {
  const token = localStorage.getItem('id_token');
  alert(token);
  return token;
}

const JWT_Module_Options: JwtModuleOptions = {
  config: {
      tokenGetter: getToken,
      // whitelistedDomains: '1'
  }
};

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AppRoutingModule,
    AgGridModule.withComponents([]),
    MatDialogModule,
    MaterialModule,
    MatButtonModule,
    MatButtonToggleModule,
    SelectButtonModule,
    CommonModule,
    FormsModule,
    NgSelectModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    ToastrModule.forRoot({tapToDismiss: true, closeButton: true, extendedTimeOut: 10000, progressBar: true, preventDuplicates: true, countDuplicates: true, positionClass: 'toast-bottom-left', newestOnTop: true}),
    CalendarModule,
    SliderModule,
    DialogModule,
    DragDropModule,
    BlockUIModule,
    BreadcrumbModule,
    InputMaskModule,
    InputNumberModule,
    TableModule,
    NzButtonModule,
    NzAlertModule,
    NzPageHeaderModule,
    NzBreadCrumbModule,
    NzCommentModule,
    NzFormModule,
    // NzAvatarModule,
    NzDropDownModule,
    NzDividerModule,
    NzSelectModule,
    NzEmptyModule,
    NzTableModule,
    NzIconModule,
    NzLayoutModule,
    NzToolTipModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({
      name: 'Kanban Project Management',
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
    QuillModule.forRoot(),
    DataViewModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    MultiSelectModule,
    ContextMenuModule,
    ProgressSpinnerModule,
    DropdownModule,
    FieldsetModule,
    PanelModule,
    TagModule,
    TooltipModule,
    TabViewModule,
    TimelineModule,
    MessageModule,
    MessagesModule,
    OrganizationChartModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    CheckboxModule,
    ToggleButtonModule,
    OverlayPanelModule,
    PickListModule,
    SplitButtonModule,
    ProgressBarModule,
    HttpClientModule,
    AngularTreeGridModule,
    AvatarModule,
    ColorPickerModule,
    // NgApexchartsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter: getToken,
    //     allowedDomains: ['localhost:7000', 'localhost:4200'],
    //     // disallowedRoutes: ['http://example.com/examplebadroute/'],
    //     // authScheme: 'Basic',
    //     headerName: 'Authorization',
    //   },
    // }),
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    PaginationModule.forRoot(),
    ProgressbarModule.forRoot(),
    CollapseModule.forRoot(),
    MatSidenavModule,
    LightboxModule,
    TranslocoRootModule,
  ],
  declarations: [
    AppComponent,
    FullComponent,
    DarkModeToggleComponent,
    CommonHeaderComponent,
    ConfirmationDialogComponent,
    ReasonDialogComponent,
    ConfirmReconciliationModalComponent,
    PhoneValidationDialogComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    AssetListComponent,
    AssetFiltersListComponent,
    AssetDepManageComponent,
    AssetManageComponent,
    AssetScrapManageComponent,
    AssetClosedManageComponent,
    AssetToValidateManageComponent,
    AssetReceptionManageComponent,
    AssetRejectedManageComponent,
    AssetRecoManageComponent,
    AssetAllListComponent,
    AssetRecoListComponent,
    AssetRecoAllListComponent,
    AssetDetailUIComponent,
    AssetDetailUIAddComponent,
    AssetDetailUIOperationTransferComponent,
    AssetDetailUIOperationCassationComponent,
    DepartmentListComponent,
    DepartmentDetailComponent,
    DepartmentManageComponent,
    EmployeeListComponent,
    AssetEmployeeDetailUIComponent,
    EmployeeDetailComponent,
    EmployeeManageComponent,
    EmployeeDetailUIComponent,
    RegionListComponent,
    AdmCenterListComponent,
    AdmCenterDetailComponent,
    AdmCenterManageComponent,
    LocationListComponent,
    LocationDetailComponent,
    LocationManageComponent,
    RoomListComponent,
    RoomDetailComponent,
    RoomManageComponent,
    AdministrationListComponent,
    AssetCategoryListComponent,
    AssetCategoryDetailComponent,
    AssetCategoryManageComponent,
    UomListComponent,
    UomDetailComponent,
    UomManageComponent,
    CompanyListComponent,
    CompanyDetailComponent,
    CompanyManageComponent,
    AssetClassListComponent,
    AssetTypeListComponent,
    AssetTypeDetailComponent,
    AssetTypeManageComponent,
    DivisionListComponent,
    PartnerListComponent,
    PartnerDetailComponent,
    PartnerManageComponent,
    CostCenterListComponent,
    CostCenterDetailComponent,
    CostCenterManageComponent,
    DimensionListComponent,
    DictionaryItemListComponent,
    DictionaryItemDetailComponent,
    CountryListComponent,
    CountryManageComponent,
    CountryDetailComponent,
    CountyManageComponent,
    CountyListComponent,
    CountyDetailComponent,
    CityListComponent,
    CityManageComponent,
    CityDetailComponent,
    FieldByNamePipe,
    BoolWFHStatePipe,
    FieldByColumnDefinitionPipe,
    ConfigValuesList,
    ConfigValuesDetail,
    ConfigValuesManage,
    TableDefinitionManageComponent,
    TableDefinitionListComponent,
    ColumnDefinitionListComponent,
    ColumnDefinitionDetail,
    InventoryManage,
    InventoryList,
    InventoryDetail,
    AccMonthListComponent,
    AccMonthDetailComponent,
    AccMonthManageComponent,
    InvStateList,
    InvStateDetail,
    InvStateManage,
    DictionaryItemDetailComponent,
    DictionaryItemListComponent,
    DictionaryTypeManageComponent,
    DictionaryTypeDetailComponent,
    DictionaryTypeListComponent,

    ProjectAddEditComponent,

    AdministrationListComponent,
    AdministrationManageComponent,
    AdministrationDetailComponent,
    EntityFileListComponent,
    AssetOpDetailListComponent,
    AssetInventoryReportComponent,
    AssetInventoryManageComponent,
    // AssetInvTempDetailListComponent,
    AssetInvFullDetailListComponent,
    AssetInvTempDetailListComponent,
    UserListComponent,
    AssetEntityListComponent,
    IdentityManage,
    RoleList,
    AssetStateManageComponent,
    AssetStateListComponent,
    AssetStateDetailComponent,
    MasterTypeManageComponent,
    MasterTypeListComponent,
    MasterTypeDetailComponent,
    BudgetValidateList,
    BudgetValidateManage,
    BudgetDetailUI,
    AccountList,
    AcquisitionValidateReadOnlyOfferListComponent,
    InsuranceCategoryDetail,
    InsuranceCategoryList,
    InsuranceCategoryManage,
    ProjectManage,
    ProjectList,
    ProjectDetail,
    SubTypeList,
    SubTypeManage,
    SubTypeDetail,
    TypeManage,
    TypeDetail,
    TypeList,
    EntityFileUploadComponent,
    EntityFileDownloadComponent,
    BudgetOpDetailList,
    BudgetOpManage,
    BudgetManage,
    BudgetList,
    OfferValidateList,
    OfferValidateManage,
    OfferDetailUIComponent,
    OfferOpDetailList,
    SanitizeHtml,
    OfferManage,
    OfferList,
    OfferValidateReadOnlyOfferListComponent,
    OfferOpManage,
    OrderValidateList,
    OrderValidateManage,
    OrderDetailUIComponent,
    OrderOpDetailList,
    OrderList,
    OrderManageComponent,
    OrderOpDetailList,
    OrderOpManage,
    EmailManagerManageComponent,
    EmailManagerList,
    EmailManagerDetail,
    EmailTypeDetail,
    EmailTypeList,
    EmailTypeManage,
    AssetComponentDetail,
    AssetComponentManage,
    AssetComponentList,
    AssetComponentOpDetailList,
    AssetEmployeeValidateList,
    AssetInventoryEmployeeValidateManage,
    AssetInvEmailList,
    AssetInvDetailListComponent,
    AssetDepDetailListComponent,
    AssetClassManageComponent,
    AssetClassDetailComponent,
    AssetOpManageComponent,
    DocumentTypeDropDownListComponent,
    DimensionManageComponent,
    DimensionDetailComponent,
    DimensionDetailComponent,
    PaginationsComponent,
    RouteManageComponent,
    RouteListComponent,
    RouteDetailComponent,
    RouteChildManageComponent,
    RouteChildListComponent,
    RouteChildDetailComponent,
    HighlightPipe,
    HideIfNotUnauthorizedDirective,
    DisableIfNotUnauthorizedDirective,
    PermissionTypeManage,
    PermissionTypeList,
    PermissionTypeDetail,
    PermissionManage,
    PermissionList,
    PermissionDetail,
    PermissionRoleManage,
    PermissionRoleList,
    PermissionRoleDetail,
    DocumentTypeDropDownListComponent,
    OperationDetail,
    DashboardOfferComponent,
    DashboardOrderComponent,
    DashboardInventoryComponent,
    AssetNatureManageComponent,
    AssetNatureListComponent,
    AssetNatureDetailComponent,
    ColumnDefinitionManageComponent,
    TableDefinitionDetailComponent,
    BrandDetail,
    BrandList,
    BrandManage,
    BadgeManage,
    BadgeDetail,
    BadgeList,
    AccountManage,
    AccountList,
    AccountDetail,
    ExpAccountManage,
    ExpAccountList,
    ExpAccountDetail,
    ArticleManage,
    ArticleList,
    ArticleDetail,
    DivisionManageComponent,
    DivisionListComponent,
    DivisionDetailComponent,
    BudgetManagerManage,
    BudgetManagerList,
    BudgetManagerDetail,
    //MaterialManageComponent,
    MaterialList,
    MaterialDetailComponent,
    RegionManageComponent,
    RegionListComponent,
    RegionDetailComponent,
    EmployeeCostCenterManage,
    EmployeeCostCenterList,
    EmployeeCostCenterDetail,
    EmployeeCompanyManage,
    EmployeeCompanyList,
    EmployeeCompanyDetail,
    EmployeeDivisionManage,
    EmployeeDivisionList,
    EmployeeDivisionDetail,
    DashboardListComponent,
    DeviceDetail,
    DeviceList,
    DeviceManage,
    DeviceTypeDetail,
    DeviceTypeList,
    DeviceTypeManage,
    ActivityManage,
    ActivityList,
    ActivityDetail,
    TaxManageComponent,
    TaxListComponent,
    TaxDetailComponent,
    BudgetList,
    BudgetPrimeNgList,
    EmailManagerUiList,
    ContractDetailUIComponent,
    ContractListComponent,
    ContractManageComponent,
    ContractOpDetailListComponent,
    ContractOpManageComponent,
    OfferMaterialManageComponent,
    OfferMaterialListComponent,
    OfferMaterialDetailComponent,
    OrderMaterialManageComponent,
    OrderMaterialListComponent,
    OrderMaterialDetailComponent,
    StockDetailComponent,
    StockListComponent,
    StockOrderListComponent,
    StockManageComponent,
    OrderValidateOfferListComponent,
    OfferValidateOfferListComponent,
    OfferStockValidateOfferListComponent,
    OfferMaterialOrderValidateListComponent,
    OrderMaterialOrderValidateListComponent,
    OrderValidateReadOnlyOfferListComponent,
    AddAssetValidationListComponent,
    RequestManageComponent,
    RequestList,
    RequestDetailUIComponent,
    RequestOpManage,
    RequestOpDetailList,
    AssetDetailUIValidateComponent,
    AssetDetailUIComponent,
    MatrixDetailComponent,
    MatrixListComponent,
    MatrixManageComponent,
    LevelDetailComponent,
    LevelDetailComponent,
    LevelListComponent,
    LevelManageComponent,
    MatrixLevelDetailComponent,
    MatrixLevelListComponent,
    MatrixLevelManageComponent,
    MatrixValidateReadOnlyListComponent,
    EntityFileValidateAssetDownloadComponent,
    OfferEmailValidateOfferListComponent,
    FileUploadComponent,
    ErrorDetailComponent,
    ErrorListComponent,
    ErrorManageComponent,
    RateDetailComponent,
    RateListComponent,
    RateManageComponent,
    ProjectTypeDetailComponent,
    ProjectTypeListComponent,
    ProjectTypeManageComponent,
    ProjectTypeDivisionDetailComponent,
    ProjectTypeDivisionListComponent,
    ProjectTypeDivisionManageComponent,
    BudgetBaseManageComponent,
    BudgetBaseListComponent,
    BudgetBaseValidateManageComponent,
    BudgetBaseValidateListComponent,
    BudgetMonthBaseManageComponent,
    BudgetMonthBaseListComponent,
    BudgetMonthBaseValidateManageComponent,
    BudgetMonthBaseValidateListComponent,
    BudgetForecastManageComponent,
    BudgetForecastListComponent,
    BudgetForecastValidateManageComponent,
    BudgetForecastValidateListComponent,
    BudgetForecastUIListComponent,
    AssetEmployeeDetailUIComponent,
    AssetEmployeeAddNewAssetListComponent,
    ModelDetail,
    ModelList,
    ModelManage,
    InfoManageComponent,
    AssetOpRecoManageComponent,
    CommitteeMembersComponent,
    InventoryPlanComponent,
    AssetOpRecoDetailListComponent,
    InvCommitteeMembersListComponent,
    CommitteePositionsListComponent,
    InvCommitteePlanListComponent,
    AdministrationCommitteesListComponent,
    CostCenterCommitteesListComponent,
    AssetDetailUIValidateInvPlusComponent,
    AssetInvPlusManageComponent,
    OrderTypeDetailComponent,
    OrderTypeListComponent,
    OrderTypeManageComponent,
    OfferTypeDetailComponent,
    OfferTypeListComponent,
    OfferTypeManageComponent,
    BudgetBaseDetailUIComponent,
    AppStateDetailComponent,
    AppStateListComponent,
    AppStateManageComponent,
    AppStateDropDownListComponent,
    AssetDetailUIOperationStornoComponent,
    TwoDigitDecimaNumberDirective,
    RequestNotValidatePageComponent,
    AssetDetailUIAcquisitionOperationStornoComponent,
    EmailStatusDstEmployeeValidatePageComponent,
    AssetEmployeePersonalValidateListComponent,
    AssetDetailChangeUIComponent,
    AssetEmployeePersonalValidateListComponent,
    AssetDetailUIOperationCloneTransferComponent,
    EntityTypeDetailComponent,
    EntityTypeListComponent,
    EntityTypeManageComponent,
    UploadModalComponent,
    UploadRequestModalComponent,
    UploadOrderModalComponent,
    AppProgressComponent,
    DndDirective,
    BudgetBaseAddDetailUIComponent,
    BudgetBaseOpManageComponent,
    BudgetBaseOpDetailListComponent,
    OrderEditDetailUIComponent,
    BudgetForecastDetailUIComponent,
    RequestBudgetForecastManageComponent,
    RequestBudgetForecastListComponent,
    RequestBudgetForecastDetailComponent,
    RequestBudgetForecastValidateOfferListComponent,
    MaterialListOrder,
    RequestBudgetForecastMaterialDetailComponent,
    RequestBudgetForecastMaterialListComponent,
    RequestBudgetForecastMaterialManageComponent,
    RequestBudgetForecastValidateListComponent,
    RequestBudgetForecastNgPrimeValidateListComponent,
    RequestBudgetForecastViewNgPrimeValidateListComponent,
    RequestBudgetForecastMaterialViewNgPrimeValidateListComponent,
    RequestBudgetForecastMaterialCostCenterManageComponent,
    RequestBudgetForecastMaterialCostCenterListComponent,
    RequestBFMaterialCostCenterDetailComponent,
    RequestBFMaterialCostCenterValidateListComponent,
    EmailStatusOrderValidateL4PageComponent,
    EmailStatusOrderValidateL3PageComponent,
    EmailStatusOrderValidateL2PageComponent,
    EmailStatusOrderValidateL1PageComponent,
    EmailStatusOrderValidateS3PageComponent,
    EmailStatusOrderValidateS2PageComponent,
    EmailStatusOrderValidateS1PageComponent,
    PlantDetailComponent,
    PlantListComponent,
    PlantManageComponent,
    PlantDropDownListComponent,
    EntityFileRequestDelete,
    EntityFileRequestUploadComponent,
    UploadOfferModalComponent,
    UploadRequestBudgetForecastModalComponent,
    BoolPipeInventory,
    BoolPipeSapValidation,
    AssetDetailUIOperationStornoMFXComponent,
    StorageDetailComponent,
    StorageListComponent,
    StorageManageComponent,
    EmployeeStorageDetail,
    EmployeeStorageList,
    EmployeeStorageManage,
    StockITManageComponent,
    AssetReceptionDetailUIAddComponent,
    AssetBudgetForecastCorrectionManageComponent,
    HeaderKanbanComponent,
    DialogComponent,
    DialogBodyComponent,
    BoardComponent,
    CommentItemComponent,
    BoardItemComponent,
    ColorPanelComponent,
    RequestKanbanManageComponent,
    // KANBAN 2 //

    ReconciliationModalComponent,

    // KANBAN 2 //

    RequestListPrimeNgComponent,
    RequestEditComponent,
    OfferViewNgPrimeValidateListComponent,
    OfferMaterialViewNgPrimeValidateListComponent,
    OrderViewNgPrimeValidateListComponent,
    RequestViewNgPrimeOpListComponent,
    HeaderBreadcrumbComponent,
    DictionaryItemListPrimeNgComponent,
    BrandListPrimeNgComponent,
    ModelListPrimeNgComponent,
    BudgetForecastCorrectionDetailUIComponent,
    BudgetForecastMaterialViewNgPrimeValidateListComponent,
    WFHCheckDetailComponent,
    WFHCheckListComponent,
    WFHCheckManageComponent,
    BudgetForecastTransferDetailUIComponent,
    UploadBudgetTransferModalComponent,
    PoOrderUploadModalComponent,
    AssetEmployeePersonalValidateDetailUIComponent,
    OrderListPrimeNgComponent,
    OrderEditComponent,
    DashboardListPrimeNgComponent,
    DashboardListWarehousePrimeNgComponent,
    DivisionsItemSelect,
    DivisionsSelectionDialog,
    InventoriesSelectionDialog,
    InventoriesItemSelect,
    IdentitySelectionDialog,
    IdentityItemSelect,
    CostCenterSelectionDialog,
    CostCenterItemSelect,
    EmployeesItemSelect,
    EmployeesSelectionDialog,
    CommitteePostitionItemSelect,
    CommitteePostionSelectionDialog,
    RolesItemSelect,
    RolesSelectionDialog,
    OfferTypeSelectionDialog,
    OfferTypeItemSelect,
    OfferSelectionDialog,
    OfferItemSelect,
    RequestSelectionDialog,
    RequestItemSelect,
    RequestBudgetBaseSelectionDialog,
    RequestBudgetBaseItemSelect,
    PartnersSelectionDialog,
    PartnersItemSelect,
    CompanySelectionDialog,
    CompanyItemSelect,

    OrderTypeSelectionDialog,
    OrderTypeItemSelect,

    StockOrderSelectionDialog,
    StockOrderItemSelect,

    PlantsSelectionDialog,
    PlantsItemSelect,

    AdministrationSelectionDialog,
    AdministrationItemSelect,

    DepartmentSelectionDialog,
    DepartmentItemSelect,

    ProjectSelectionDialog,
    ProjectItemSelect,

    ActivitySelectionDialog,
    ActivityItemSelect,

    AccMonthSelectionDialog,
    AccMonthItemSelect,

    AssetTypeSelectionDialog,
    AssetTypeItemSelect,

    AdmCenterSelectionDialog,
    AdmCenterItemSelect,

    ProjectTypeSelectionDialog,
    ProjectTypeItemSelect,

    ProjectTypeDivisionSelectionDialog,
    ProjectTypeDivisionItemSelect,

    LocationsSelectionDialog,
    LocationsItemSelect,

    InvStateSelectionDialog,
    InvStateItemSelect,

    ExpAccountSelectionDialog,
    ExpAccountItemSelect,

    AssetCategoriesSelectionDialog,
    AssetCategoriesItemSelect,

    OrdersSelectionDialog,
    OrdersItemSelect,

    CountriesSelectionDialog,
    CountriesItemSelect,

    RegionsSelectionDialog,
    RegionsItemSelect,

    TableDefinitionSelectionDialog,
    TableDefinitionItemSelect,

    BudgetForecastSelectionDialog,
    BudgetForecastItemSelect,

    ContractsSelectionDialog,
    ContractsItemSelect,

    DictionaryItemsSelectionDialog,
    DictionaryItemsItemSelect,
    DictionaryItemAddEditComponent,

    DictionaryTypeSelectionDialog,
    DictionaryTypeItemSelect,

    BrandsSelectionDialog,
    BrandsItemSelect,
    BrandAddEditComponent,

    ModelsSelectionDialog,
    ModelsItemSelect,
    ModelAddEditComponent,

    AppStateSelectionDialog,
    AppStateItemSelect,
    
    BudgetSelectionDialog,
    BudgetItemSelect,

    TaxSelectionDialog,
    TaxItemSelect,
    TaxAddEditComponent,

    UomSelectionDialog,
    UomItemSelect,

    BadgeSelectionDialog,
    BadgeItemSelect,

    RouteDefinitionSelectionDialog,
    RouteDefinitionItemSelect,

    AssetEntitySelectionDialog,
    AssetEntityItemSelect,

    MaterialsSelectionDialog,
    MaterialsItemSelect,

    BudgetBaseSelectionDialog,
    BudgetBaseItemSelect,

    DevicesSelectionDialog,
    DevicesItemSelect,

    DeviceTypeSelectionDialog,
    DeviceTypeItemSelect,

    CountriesSelectionDialog,
    CountriesItemSelect,

    CitiesSelectionDialog,
    CitiesItemSelect,

    CountySelectionDialog,
    CountyItemSelect,

    AccountSelectionDialog,
    AccountItemSelect,

    ColumnFilterSelectionDialog,
    ColumnFilterItemSelect,

    EmailTypeSelectionDialog,
    EmailTypeItemSelect,

    AssetEntitySimpleSelectionDialog,
    AssetEntitySimpleItemSelect,

    PermissionTypeSelectionDialog,
    PermissionTypeItemSelect,

    PermissionSelectionDialog,
    PermissionItemSelect,

    StorageSelectionDialog,
    StorageItemSelect,

    NewSupplierOperationComponent,
    NewOperationDialogComponent,
    AssetEditComponent,
    AssetAddDialogComponent,
    BudgetAddDialogComponent,
    BudgetEditDialogComponent,
    AssetSapOperationDialogComponent,
    InventoryAddEditComponent,
    InvStateAddEditComponent,
    RequestAddDialogComponent,
    OrderDetailsDialogComponent,
    OrderEditDialogComponent,
    OrderTypeAddEditComponent,
    ProjectAddEditComponent,
    OfferDetailsDialogComponent,
    LevelAddEditComponent,
    ProjectTypeAddEditComponent,
    StoragesAddEditComponent,
    TableDefinitionAddEditComponent,
    PermissionTypeAddEditComponent,
    PermissionAddEditComponent,
    MaterialAddEditComponent,
    BudgetForecastTransferDialogComponent,
    AssetAddFromStockDialogComponent,
    MaterialAddEditComponent,
    AssetCategoryAddEditComponent,
    AssetTypeAddEditComponent,
    OfferTypeAddEditComponent,
    PoOrderEditDialogComponent,
    AppStateItemSelect,
    MatrixAddEditComponent,
    CommitteeMemberAddEditDialog,
    AccMonthAddEditComponent,
    ExpAccountAddEditComponent,
    ArticleAddEditComponent,
    DimensionAddEditComponent,
    PrEditDialogComponent,
    PoOrderDetailsDialogComponent,
    ContractAddEditComponent,
    ConfigValuesAddEditComponent,
    ColumnDefinitionAddEditComponent,
    DimensionAddEditComponent,
    DepartmentAddEditComponent,
    AdministrationAddEditComponent,
    BudgetManagerAddEditComponent,
    TypeAddEditComponent,
    SubTypeAddEditComponent,
    AssetClassAddEditComponent,
    AdmCenterAddEditComponent,
    RegionAddEditComponent,
    InsuranceCategoryAddEditComponent,
    DictionaryTypeAddEditComponent,
    DeviceTypeAddEditComponent,
    AssetCloneDialogComponent,
    AssetRetireDialogComponent,
    AssetStornoDialogComponent,
    BadgeAddEditComponent,
    RouteDefinitionAddEditComponent,
    RouteChildrenDefinitionAddEditComponent,
    EmailTypeAddEditComponent,
    RouteChildrenDefinitionAddEditComponent,
    AssetStornoDialogComponent,
    DeviceTypeAddEditComponent,
    PartnerAddEditComponent,
    PrRequestEditDialogComponent,
    RateAddEditComponent,
    AccountAddEditComponent,
    AppStateAddEditComponent,
    DivisionAddEditDialog,
    AssetPreValidateAddEditDialog,
    DeviceAddEditComponent,
    MapSubstituteEmployeeSelectionDialog,
    ChangePasswordDialogComponent,
    RoleSelectorModalComponent,
    PrAddDialogComponent,
    BudgetForecastTransferDialogComponent,
    IdentityAddEditComponent,
    AdministrationCommitteeAddEditDialog,
    InvCommitteeMemberAddEditDialog,
    InventoryPlansDetailDialog,
    ColumnFilterAddEditComponent,
    ColumnFilterListComponent,
    ColumnFilterManageComponent,

    BudgetForecastCorrectionDialogComponent,
    AssetReceptionDetailsDialog,

    EmailStatusOrderValidateB1PageComponent,
    AssetPreValidateManageComponent,
    ProjectTypeDivisionAddEditComponent,
    AssetReceptionHistoryManageComponent,
    UploadStornoModalComponent,
    UploadPreReceptionModalComponent,
    UploadPublicStornoModalComponent,
    RequestBudgetForecastValidateStornoListComponent,
    CountyAddEditComponent,
    CityAddEditComponent,
    LocationAddEditComponent,
    RoomAddEditComponent,
    RoomsItemSelect,
    RoomsSelectionDialog,
    CostCentersAddEditDialog,
    AssetValidateDialogComponent,
    AssetDetailUIPreValidateComponent,
    AssetPreValidateDialogComponent,
    AssetPublicRetireDialogComponent,
    UpdateDataImportModalComponent,
    ProgressImportDialogComponent,
    PermissionRoleAddEditDialog,
    EmployeeDetailsComponent,
    EmployeesAddEditDialog,
    AssetWFHListComponent,
    AssetWFHFiltersListComponent,
    WFHValidateOfferListComponent,
    UploadInventoryListModalComponent,
    EntityFileInventoryListDelete,
    UploadFarModalComponent,
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  },
  { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
  { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults },
  { provide: RouteReuseStrategy, useClass: CustomReuseStrategy },
  { provide: MAT_DIALOG_DATA, useValue: {} },
  { provide: MatDialogRef, useValue: {} },
  JwtHelperService,
  AuthGuard,
  DynamicDialogRef,
  DynamicDialogConfig,
  AuthorizationService,
  ActivityHttpService,
  AccMonthHttpService,
  ProgressService,
  CustomerService,
  BaThemeConfigProvider,
  AppStateHttpService,
  AccountHttpService,
  SubTypeHttpService,
  TypeHttpService,
  MasterTypeHttpService,
  BrandHttpService,
  BudgetBaseOpHttpService,
  ModelHttpService,
  FileHttpService,
  ProjectHttpService,
  BudgetOpHttpService,
  CostCenterHttpService,
  AssetComponentOpHttpService,
  AquisitionAssetSAPHttpService,
  AssetChangeSAPHttpService,
  AssetInvMinusSAPHttpService,
  AssetInvPlusSAPHttpService,
  RetireAssetSAPHttpService,
  TransferAssetSAPHttpService,
  TransferInStockSAPHttpService,
  AssetMemoryService,
  AssetHttpService,
  AssetOpHttpService,
  AssetTypeHttpService,
  AssetCategoryHttpService,
  AdmCenterHttpService,
  InventoryHttpService,
  CityHttpService,
  DimensionHttpService,
  RequestBudgetForecastMaterialHttpService,
  RegionHttpService,
  RoomDetailHttpService,
  CompanyHttpService,
  EntityTypeHttpService,
  InvStateHttpService,
  PlantHttpService,
  WFHCheckHttpService,
  InsuranceCategoryHttpService,
  DocumentTypeHttpService,
  DictionaryItemHttpService,
  AssetComponentDetailHttpService,
  AdministrationHttpService,
  AssetNatureHttpService,
  NotificationService,
  BudgetHttpService,
  OfferHttpService,
  OrderHttpService,
  DocumentHttpService,
  ContractHttpService,
  ContractOpHttpService,
  DialogService,
  ErrorHttpService,
  AmortizationHttpService,
  CapAmortizationHttpService,
  TaxHttpService,
  ProjectTypeHttpService,
  StockHttpService,
  BudgetBaseHttpService,
  BudgetMonthBaseHttpService,
  BudgetForecastHttpService,
  CreateAssetSAPHttpService,
  DatePipe,
  DecimalPipe,
  BoolPipe,
  BoolPipeState,
  BoolPipeInventory,
  BoolPipeSapValidation,
  BoolWFHStatePipe,
  MergePipe,
  MergeRoom,
  HighlightPipe,
  ActiveRowPipe,
  LocalizedNumericInputDirective,
  AuthenticationService,
  BsModalService,
  BsModalRef,
  ConfigValuesHttpService,
  ColumnDefinitionHttpService,
  ColumnDefinitionRoleHttpService,
  SignalRService,
  ConfirmationService,
  NotifyService,
  CountyHttpService,
  CountryHttpService,
  UomHttpService,
  DivisionHttpService,
  DepartmentHttpService,
  EmployeeDetailHttpService,
  LocationHttpService,
  EmailManagerHttpService,
  EmailManagerDetailHttpService,
  EmailTypeHttpService,
  EmployeeHttpService,
  MatrixLevelHttpService,
  LevelHttpService,
  OfferMaterialHttpService,
  OrderMaterialHttpService,
  SubTypeHttpService,
  EntityFileHttpService,
  AssetComponentHttpService,
  PermissionTypeHttpService,
  PermissionHttpService,
  PermissionRoleHttpService,
  MatrixHttpService,
  ProjectTypeDivisionHttpService,
  RequestHttpService,
  RequestOpHttpService,
  RoleService,
  RouteHttpService,
  RouteRoleHttpService,
  RouteChildHttpService,
  RouteChildRoleHttpService,
  DashboardHttpService,
  IdentityService,
  BadgeHttpService,
  ExpAccountHttpService,
  ArticleHttpService,
  BudgetManagerHttpService,
  MaterialHttpService,
  EmployeeCostCenterHttpService,
  EmployeeCompanyHttpService,
  EmployeeDivisionHttpService,
  EmployeeStorageHttpService,
  DeviceHttpService,
  DeviceTypeHttpService,
  DeviceDetailHttpService,
  RoomHttpService,
  OrderTypeHttpService,
  OfferTypeHttpService,
  PrintLabelHttpService,
  RateHttpService,
  AssetAsyncHttpService,
  RequestBudgetForecastHttpService,
  RequestBudgetForecastMaterialCostCenterHttpService,
  StorageHttpService,
  MessageService,
  TableDefinitionHttpService,
  RouteStateService,
  CommitteeMemberHttpService,
  InventoryPlanHttpService,
  // KANBAN 2 //
  NzModalService,

  DialogService,

  // KANBAN 2 //

  MobilePhoneHttpService,
  PartnerHttpService,
  DepartmentDetailHttpService,
  AssetClassHttpService,
  IdentityService,
  OrderOpHttpService,
  OfferOpHttpService,
  DictionaryTypeHttpService,
  ColumnFilterHttpService,
  Location,
  RoomHttpService,
  CommitteePositionHttpService
],
  exports: [PaginationComponent, HighlightPipe, HideIfNotUnauthorizedDirective, DisableIfNotUnauthorizedDirective, ConfirmationDialogComponent],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
