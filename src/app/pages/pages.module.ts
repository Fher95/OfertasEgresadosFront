import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministradorModule } from './administrador/administrador.module';
import { EgresadosModule } from './egresados/egresados.module';
import { AuthModule } from './auth/auth.module';
import { DiscapacidadesPipe } from '../shared/pipes/discapacidades.pipe';
import { EgCapitalizePipe } from '../shared/pipes/eg-capitalize.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [AdministradorModule, EgresadosModule, AuthModule],
  declarations: []
})
export class PagesModule { }
