import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetComponentManage } from '../../forms/assets/asset-components/asset-component.manage';
import { AuthGuard } from '../../services/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: AssetComponentManage,
    data: {
      title: 'Accesorii',
      auth: "VIEW|COMPONENT", shouldDetach: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetComponentsRoutingModule {}
