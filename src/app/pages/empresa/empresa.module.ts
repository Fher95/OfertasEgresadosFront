import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrarComponent } from './registrar/registrar.component';
import { MaterialModule } from 'src/app/layout/material/material.module';
import { GeneralesService } from 'src/app/shared/servicios/generales.service';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DatosEmpresaComponent } from './datosEmpresa/datos-empresa/datos-empresa.component';
import { DialogFinalRegistroComponent } from './dialog-final-registro/dialog-final-registro.component';
import { EditarEmpresaComponent } from './editar-empresa/editar-empresa.component';
import { CrearOfertaLaboralComponent } from './crear-oferta-laboral/crear-oferta-laboral.component';
import { DialogFinalModificarComponent } from './dialog-final-modificar/dialog-final-modificar.component';
import { OfertasPublicadasComponent } from './ofertas-publicadas/ofertas-publicadas.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { DialogInfoOfertaComponent } from './dialog-info-oferta/dialog-info-oferta.component';
import { DialogEstadoOfertaComponent } from './dialog-estado-oferta/dialog-estado-oferta.component';
import { VerPostuladosComponent } from './ver-postulados/ver-postulados.component';


@NgModule({
  declarations: [
    RegistrarComponent, 
    DatosEmpresaComponent,
    EditarEmpresaComponent, 
    DialogFinalRegistroComponent, 
    CrearOfertaLaboralComponent, 
    DialogFinalModificarComponent, 
    OfertasPublicadasComponent, 
    DialogInfoOfertaComponent, 
    DialogEstadoOfertaComponent, VerPostuladosComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [DialogFinalRegistroComponent, DialogInfoOfertaComponent, DialogEstadoOfertaComponent],
  providers: [GeneralesService],
  exports: [
    RegistrarComponent, 
    DatosEmpresaComponent,
    EditarEmpresaComponent, 
    DialogFinalRegistroComponent, 
    CrearOfertaLaboralComponent, 
    DialogFinalModificarComponent, 
    OfertasPublicadasComponent,
  ]
})
export class EmpresaModule { }
