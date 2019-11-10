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


@NgModule({
  declarations: [
    RegistrarComponent, 
    DatosEmpresaComponent,
    EditarEmpresaComponent, 
    DialogFinalRegistroComponent, 
    CrearOfertaLaboralComponent, 
    DialogFinalModificarComponent, 
    OfertasPublicadasComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [GeneralesService],
  exports: [
    RegistrarComponent, 
    DatosEmpresaComponent,
    EditarEmpresaComponent, 
    DialogFinalRegistroComponent, 
    CrearOfertaLaboralComponent, 
    DialogFinalModificarComponent, 
    OfertasPublicadasComponent
  ]
})
export class EmpresaModule { }
