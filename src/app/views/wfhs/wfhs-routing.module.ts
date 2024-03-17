import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetInventoryEmailManage } from '../../forms/assets/assets/asset-inventory-email.manage';
import { AssetInventoryEmployeeValidateManage } from '../../forms/assets/assets/asset-inventory-employee-validate.manage';
import { AuthGuard } from '../../services/auth.guard';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'WFH'
    },
    children: [
      {
        path: '',
        redirectTo: 'wfh'
      },
      {
        path: 'validate',
        canActivate: [AuthGuard],
        component: AssetInventoryEmployeeValidateManage,
        data: {
          title: 'Validare',
          auth: "VIEW|S_WFH_VALIDATE", shouldDetach: true 
        }
      },
      {
        path: 'email',
        canActivate: [AuthGuard],
        component: AssetInventoryEmailManage,
        data: {
          title: 'Status',
          auth: "VIEW|S_WFH_STATUS", shouldDetach: true 
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WfhsRoutingModule {}

