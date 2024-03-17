import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BadgeManage } from '../../forms/common/badge/badge.manage';
import { RouteChildManageComponent } from '../../forms/common/route-child-definition/route-child.manage';
import { RouteManageComponent } from '../../forms/common/route-definition/route.manage';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Route'
    },
    children: [
      {
        path: '',
        redirectTo: 'routes'
      },
      {
        path: 'parent',
        component: RouteManageComponent,
        data: {
          title: 'Parinte'
        }
      },
      {
        path: 'children',
        component: RouteChildManageComponent,
        data: {
          title: 'Copil'
        }
      },
      {
        path: 'badge',
        component: BadgeManage,
        data: {
          title: 'Badges'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule {}
