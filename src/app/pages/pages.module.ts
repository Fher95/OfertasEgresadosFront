import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministradorModule } from './administrador/administrador.module';
import { EgresadosModule } from './egresados/egresados.module';
import { AuthModule } from './auth/auth.module';
import { DiscapacidadesPipe } from '../shared/pipes/discapacidades.pipe';
import { EgCapitalizePipe } from '../shared/pipes/eg-capitalize.pipe';
<<<<<<< HEAD
import { PipesModule } from '../shared/pipes/pipes.module';
=======
>>>>>>> 23036a941fa48c9021d19af887705a5998e3e8f9

@NgModule({
  imports: [CommonModule],
  exports: [AdministradorModule, EgresadosModule, AuthModule]
})
export class PagesModule {}
