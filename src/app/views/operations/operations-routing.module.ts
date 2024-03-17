import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetOpManageComponent } from '../../forms/assets/asset-ops/asset-op-manage';
import { AuthGuard } from '../../services/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: AssetOpManageComponent,
    data: {
      title: 'Operatii',
      auth: "VIEW|OPERATION", shouldDetach: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationsRoutingModule {}
