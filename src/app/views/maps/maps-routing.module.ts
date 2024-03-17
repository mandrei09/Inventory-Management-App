import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationMap } from '../../forms/common/maps/maps';
import { AuthGuard } from '../../services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LocationMap,
    canActivate: [AuthGuard],
    data: {
      title: 'Harti',
      auth: "VIEW|MAP", shouldDetach: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapsRoutingModule {}
