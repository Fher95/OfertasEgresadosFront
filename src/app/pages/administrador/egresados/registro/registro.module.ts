import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroRoutingModule } from './registro-routing.module';
import { PreRegistroEgresadoComponent } from './pre-registro-egresado/pre-registro-egresado.component';

@NgModule({
  declarations: [PreRegistroEgresadoComponent],
  imports: [
    CommonModule,
    RegistroRoutingModule
  ]
})
export class RegistroModule { }
