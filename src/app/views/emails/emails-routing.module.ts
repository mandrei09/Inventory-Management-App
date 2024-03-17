import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailTypeManage } from '../../forms/administrations/email-type/email-type.manage';
import { AuthGuard } from '../../services/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: EmailTypeManage,
    data: {
      title: 'Setari email',
      auth: "VIEW|EMAIL_SETTING", shouldDetach: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailsRoutingModule {}
