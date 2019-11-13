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

@NgModule({
  declarations: [ActualizarComponent, CompletarRegistroComponent, LocalizacionComponent, ProgramaComponent, ConfirmarRegistroComponent, ComentariosComponent, ExplaboralComponent, ReferidoComponent],
  imports: [
    CommonModule,
    LayoutModule,
  ]
})
export class EgresadosModule { }
