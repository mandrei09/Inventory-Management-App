import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IdentityManage } from '../../forms/auth/identity.manage';
import { AuthGuard } from '../../services/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: IdentityManage,
    data: {
      title: 'Admin',
      auth: "VIEW|ADMIN", shouldDetach: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
