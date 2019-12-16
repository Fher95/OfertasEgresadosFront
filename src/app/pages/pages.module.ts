import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministradorModule } from './administrador/administrador.module';
import { EgresadosModule } from './egresados/egresados.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [AdministradorModule, EgresadosModule, AuthModule]
})
export class PagesModule { }
