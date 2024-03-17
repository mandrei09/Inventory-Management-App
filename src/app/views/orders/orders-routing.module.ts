import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderDetailUI } from '../../forms/administrations/order/order.detail.ui';
import { OrderManageComponent } from '../../forms/administrations/order/order.manage';
import { AuthGuard } from '../../services/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: OrderManageComponent,
    data: {
      title: '',
      auth: "VIEW|ORDER", shouldDetach: true
    }
  },
  {
    path: ':id',
    component: OrderDetailUI,
    canActivate: [AuthGuard],
    data: { 
      title: '',
      auth: "EDIT|ORDER", shouldDetach: true 
    },
  },
  {
    path: 'new',
    component: OrderDetailUI,
    canActivate: [AuthGuard],
    data: { 
      title: '',
      auth: "ADD|ORDER", shouldDetach: true 
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {}
