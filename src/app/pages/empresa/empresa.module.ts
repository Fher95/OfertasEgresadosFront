import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrarComponent } from './registrar/registrar.component';
import { MaterialModule } from 'src/app/layout/material/material.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
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
import { Routes, RouterModule } from '@angular/router';
import { FiltrarCiudadesPipe } from '../../shared/pipes/filtrar-ciudades.pipe';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { ModificarOfertaLaboralComponent } from './modificar-oferta-laboral/modificar-oferta-laboral.component';

const routes: Routes = [
  { path: 'empresa/:id/datosEmpresa', component:DatosEmpresaComponent},
  { path: 'empresa/:id/editarEmpresa', component: EditarEmpresaComponent},
  { path: 'empresa/:id/crearOfertaLaboral', component: CrearOfertaLaboralComponent},
  { path: 'empresa/:id/modificarOfertaLaboral', component: ModificarOfertaLaboralComponent},
  { path: 'empresa/:id/misOfertas', component: OfertasPublicadasComponent},
  { path: 'oferta/:id/misPostulados', component: VerPostuladosComponent}

];

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
    DialogEstadoOfertaComponent, VerPostuladosComponent,
    FiltrarCiudadesPipe,
    ModificarOfertaLaboralComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatProgressSpinnerModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),

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
