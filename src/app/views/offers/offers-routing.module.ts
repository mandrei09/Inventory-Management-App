import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailManagerManageComponent } from '../../forms/administrations/email-manager/email-manager.manage';
import { OfferDetailUI } from '../../forms/administrations/offer/offer.detail.ui';
import { OfferManage } from '../../forms/administrations/offer/offer.manage';
import { AuthGuard } from '../../services/auth.guard';

const routes: Routes = [
  {
    path: '',
    data: {
      title: ''
    },
    children: [
      {
        path: '',
        redirectTo: 'offer'
      },
      {
        path: 'status',
        canActivate: [AuthGuard],
        component: OfferManage,
        data: {
          title: '',
          auth: "VIEW|S_OFFER_STATUS", shouldDetach: true
        }
      },
      {
        path: 'email',
        canActivate: [AuthGuard],
        component: EmailManagerManageComponent,
        data: {
          title: '',
          auth: "VIEW|S_OFFER_EMAIL", shouldDetach: true
        }
      },
    ],
  },
  {
    path: ':id',
    component: OfferDetailUI,
    canActivate: [AuthGuard],
    data: { 
      title: '',
      auth: "EDIT|OFFER", shouldDetach: true 
    },
  },
  {
    path: 'new',
    component: OfferDetailUI,
    canActivate: [AuthGuard],
    data: { 
      title: '',
      auth: "ADD|OFFER", shouldDetach: true 
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffersRoutingModule {}
