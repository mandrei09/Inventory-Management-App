import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetInventoryReportComponent } from '../../forms/assets/assets/asset-inventory-report';
import { AssetInventoryManageComponent } from '../../forms/assets/assets/asset-inventory.manage';
import { AuthGuard } from '../../services/auth.guard';
import { InventoryPlanComponent } from '../../forms/inventory/inventory-plans/inventory-plans.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Inventare'
    },
    children: [
      {
        path: '',
        redirectTo: 'inventory'
      },
      {
        path: 'status',
        canActivate: [AuthGuard],
        component: AssetInventoryManageComponent,
        data: {
          title: 'Status',
          auth: "VIEW|S_INVENTORY_STATUS", shouldDetach: true
        }
      },
      {
        path: 'report',
        canActivate: [AuthGuard],
        component: AssetInventoryReportComponent,
        data: {
          title: 'Rapoarte',
          auth: "VIEW|S_INVENTORY_REPORT", shouldDetach: true
        }
      },
      {
        path: 'inventory-plans',
        canActivate: [AuthGuard],
        component: InventoryPlanComponent,
        data: {
          title: 'Planificare Inventar',
          auth: "VIEW|INVENTORY_PLAN", shouldDetach: true
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoriesRoutingModule {}

