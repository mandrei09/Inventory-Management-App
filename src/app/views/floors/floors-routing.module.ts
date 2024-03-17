import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FloorMap } from '../../forms/common/floors/floors';
import { AuthGuard } from '../../services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: FloorMap,
    canActivate: [AuthGuard],
    data: {
      title: 'Floor',
      auth: "VIEW|FLOOR", shouldDetach: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FloorsRoutingModule {}
