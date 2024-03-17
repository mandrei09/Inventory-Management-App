// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Alert Component
import { AlertModule } from 'ngx-bootstrap/alert';

// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';

// Notifications Routing
import { NomenclaturesRoutingModule } from './nomenclatures-routing.module';

@NgModule({
  imports: [
    CommonModule,
    NomenclaturesRoutingModule,
    AlertModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [
  ]
})
export class NomenclaturesModule { }
