import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministradorModule } from './administrador/administrador.module';
import { EgresadosModule } from './egresados/egresados.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [AdministradorModule, EgresadosModule]
})
export class PagesModule { }
