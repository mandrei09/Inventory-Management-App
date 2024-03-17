import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BudgetDetailUI } from '../../forms/administrations/budget/budget.detail.ui';
import { BudgetManage } from '../../forms/administrations/budget/budget.manage';
import { AuthGuard } from '../../services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: BudgetManage,
    canActivate: [AuthGuard],
    data: {
      title: '',
      auth: "VIEW|BUDGET", shouldDetach: true
    }
  },
  {
    path: ':id',
    component: BudgetDetailUI,
    canActivate: [AuthGuard],
    data: { 
      title: '',
      auth: "EDIT|BUDGET" },
  },
  {
    path: 'new',
    component: BudgetDetailUI,
    canActivate: [AuthGuard],
    data: { 
      title: '',
      auth: "ADD|BUDGET" },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetsRoutingModule {}
