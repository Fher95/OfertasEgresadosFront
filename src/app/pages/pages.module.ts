import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministradorModule } from './administrador/administrador.module';
import { EgresadosModule } from './egresados/egresados.module';
import { AuthModule } from './auth/auth.module';
<<<<<<< HEAD
=======
import { DiscapacidadesPipe } from '../shared/pipes/discapacidades.pipe';
import { EgCapitalizePipe } from '../shared/pipes/eg-capitalize.pipe';
import { PipesModule } from '../shared/pipes/pipes.module';
>>>>>>> bd6fed7c90e49c854bbcd6204c65d3ca3782e4c2

@NgModule({
  imports: [CommonModule],
  exports: [AdministradorModule, EgresadosModule, AuthModule]
})
export class PagesModule {}
