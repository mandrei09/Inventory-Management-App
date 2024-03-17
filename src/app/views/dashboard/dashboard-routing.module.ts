import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../services/auth.guard';
import { DashboardBudgetComponent } from './dashboard-budget.component';
import { DashboardInventoryMarkComponent } from './dashboard-inventory-mark.component';
import { DashboardInventoryFarPrevComponent } from './dashboard-inventory-far-prev.component';
import { DashboardInventoryComponent } from './dashboard-inventory.component';
import { DashboardOfferComponent } from './dashboard-offer.component';
import { DashboardOrderComponent } from './dashboard-order.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: ''
    },
    children: [
      {
        path: '',
        redirectTo: 'dashboard'
      },
      {
        path: 'budget',
        component: DashboardBudgetComponent,
        canActivate: [AuthGuard],
        data: {
          title: '',
          auth: "VIEW|S_DASHBOARD_BUDGET", shouldDetach: true
        }
      },
      {
        path: 'offer',
        component: DashboardOfferComponent,
        canActivate: [AuthGuard],
        data: {
          title: '',
          auth: "VIEW|S_DASHBOARD_OFFER", shouldDetach: true
        }
      },
      {
        path: 'order',
        component: DashboardOrderComponent,
        canActivate: [AuthGuard],
        data: {
          title: '',
          auth: "VIEW|S_DASHBOARD_ORDER", shouldDetach: true
        }
      },
      {
        path: 'inventory',
        component: DashboardInventoryComponent,
        canActivate: [AuthGuard],
        data: {
          title: '',
          auth: "VIEW|S_DASHBOARD_INVENTORY", shouldDetach: true
        }
      },
      {
        path: 'inventorymark',
        component: DashboardInventoryMarkComponent,
        canActivate: [AuthGuard],
        data: {
          title: '',
          auth: "VIEW|S_DASHBOARD_INVENTORY_MARK", shouldDetach: true
        }
      },
      {
        path: 'inventoryfarprev',
        component: DashboardInventoryFarPrevComponent,
        canActivate: [AuthGuard],
        data: {
          title: '',
          auth: "VIEW|S_DASHBOARD_INVENTORY_FAR_PREV", shouldDetach: true
        }
      },
      // {
      //   path: 'department',
      //   component: DashboardDepartmentComponent,
      //   canActivate: [AuthGuard],
      //   data: {
      //     title: '',
      //     auth: "VIEW|S_DASHBOARD_DEPARTMENT", shouldDetach: true
      //   }
      // },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
