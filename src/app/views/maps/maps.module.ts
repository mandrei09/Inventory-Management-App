import { NgModule } from '@angular/core';
import { LocationMap } from '../../forms/common/maps/maps';
import { MapsRoutingModule } from './maps-routing.module';

@NgModule({
  imports: [
    MapsRoutingModule,
  ],
  declarations: [ LocationMap ],
  exports: [LocationMap]
})
export class MapsModule { }
