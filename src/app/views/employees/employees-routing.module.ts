import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeDetailUIComponent } from '../../forms/administrations/employees/employee.detail.ui';
import { EmployeeManageComponent } from '../../forms/administrations/employees/employee.manage';
import { AuthGuard } from '../../services/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: EmployeeManageComponent,
    data: {
      title: 'Angajati',
      auth: "VIEW|EMPLOYEE", shouldDetach: true
    }
  },
  {
    path: ':id',
    component: EmployeeDetailUIComponent,
    canActivate: [AuthGuard],
    data: { 
      title: '',
      auth: "OPERATION|EMPLOYEE", shouldDetach: true 
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule {}
