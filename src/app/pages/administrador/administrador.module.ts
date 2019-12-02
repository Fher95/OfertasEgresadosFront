import { SpinnerComponent } from './spinner/spinner.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarSolicitudesEmpresaComponent } from './listar-solicitudes-empresa/listar-solicitudes-empresa.component';
import { PrincipalComponent } from './principal/principal.component';
import { ListarOfertasComponent } from './listar-ofertas/listar-ofertas.component';
import { VerificarExcelComponent } from './verificar-excel/verificar-excel.component';
import { ListarEgresadosAceptadosComponent } from './listar-egresados-aceptados/listar-egresados-aceptados.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PagesModule } from '../pages.module';
import { RouterModule, Routes } from '@angular/router';
import { SolicitudCarnetizacionComponent } from './solicitud-carnetizacion/solicitud-carnetizacion.component';
import { AjustesAdministradorComponent } from './ajustes-administrador/ajustes-administrador.component';


const routes: Routes = [
/* 
  { path: 'administrar', component: AjustesAdministradorComponent },
  { path: 'solicitud', component: SolicitudCarnetizacionComponent }
 */
  //{ path: '**', component: InicioEgresadosComponent }
];


@NgModule({
  declarations: 
  [
    ListarSolicitudesEmpresaComponent, 
    PrincipalComponent, 
    ListarOfertasComponent, 
    VerificarExcelComponent, 
    ListarEgresadosAceptadosComponent,
    SpinnerComponent,
    //AjustesAdministradorComponent,
    //SolicitudCarnetizacionComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [ListarSolicitudesEmpresaComponent, PrincipalComponent, ListarOfertasComponent, VerificarExcelComponent, ListarEgresadosAceptadosComponent]
})
export class AdministradorModule { }
