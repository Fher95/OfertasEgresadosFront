import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActualizarComponent } from './actualizar/actualizar.component';
import { CompletarRegistroComponent } from './completar-registro/completar-registro.component';
import { LocalizacionComponent } from './localizacion/localizacion.component';
import { ProgramaComponent } from './programa/programa.component';
import { ConfirmarRegistroComponent } from './confirmar-registro/confirmar-registro.component';
import { LayoutModule } from 'src/app/layout/layout.module';

@NgModule({
  declarations: [ActualizarComponent, CompletarRegistroComponent, LocalizacionComponent, ProgramaComponent, ConfirmarRegistroComponent],
  imports: [
    CommonModule,
    LayoutModule,
  ]
})
export class EgresadosModule { }
