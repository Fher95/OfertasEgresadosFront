import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActualizarComponent } from './actualizar/actualizar.component';
import { CompletarRegistroComponent } from './completar-registro/completar-registro.component';
import { LocalizacionComponent } from './localizacion/localizacion.component';
import { ProgramaComponent } from './programa/programa.component';
import { ConfirmarRegistroComponent } from './confirmar-registro/confirmar-registro.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { ComentariosComponent } from './comentarios/comentarios.component';
import { ExplaboralComponent } from './explaboral/explaboral.component';
import { ReferidoComponent } from './referido/referido.component';
import { ConfirmarEmailService } from 'src/app/shared/servicios/egresados/confirmar-email.service';
import { RouterModule } from '@angular/router';
import { AlertService } from 'src/app/shared/servicios/common/alert.service';

@NgModule({
  declarations: [ActualizarComponent, CompletarRegistroComponent, LocalizacionComponent, ProgramaComponent, ConfirmarRegistroComponent, ComentariosComponent, ExplaboralComponent, ReferidoComponent],
  imports: [
    CommonModule,
    LayoutModule
  ],
  providers: [
    ConfirmarEmailService, RouterModule
  ]
})
export class EgresadosModule { }
