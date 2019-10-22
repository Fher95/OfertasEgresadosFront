import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralesService } from '../shared/servicios/generales.service';
import { AdministradorModule } from './administrador/administrador.module';
import { VerificarRoutingModule } from './administrador/egresados/verificar/verificar-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    VerificarRoutingModule
  ],
  exports: [AdministradorModule]
})
export class PagesModule { }
