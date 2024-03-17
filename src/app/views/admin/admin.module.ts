import { NgModule } from '@angular/core';
import { IdentityService } from '../../services/http/identity/identity.service';

import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  imports: [
    AdminRoutingModule,
  ],
  declarations: [ ],
  exports: [],
  providers: [IdentityService]
})
export class AdminModule { }
