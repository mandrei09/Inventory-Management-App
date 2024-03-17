// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Alert Component
import { AlertModule } from 'ngx-bootstrap/alert';

// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';

// Notifications Routing
import { ConfigsRoutingModule } from './configs-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ConfigsRoutingModule,
    AlertModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: []
})
export class ConfigsModule { }
