import { AdminGuard } from './../../shared/guard/admin.guard';
import { ApoyoService } from './../../shared/servicios/egresados/apoyo.service';
import { CatalogosService } from 'src/app/shared/servicios/common/catalogos.service';
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
import { Routes, RouterModule } from '@angular/router';
import { ListaEgresadosComponent } from './verificar-excel/lista-egresados/lista-egresados.component';
import { FileUploadComponent } from './verificar-excel/file-upload/file-upload.component';
import { GestionApoyosComponent } from './gestion-apoyos/gestion-apoyos.component';
import { DialogoEditarComponent } from './gestion-apoyos/dialogo-editar/dialogo-editar.component';
import { AjustesAdministradorComponent } from './ajustes-administrador/ajustes-administrador.component'
import { SolicitudCarnetizacionComponent } from './solicitud-carnetizacion/solicitud-carnetizacion.component';
import {
  MatSidenavModule} from '@angular/material';
import { InfoSolicitudEmpresaComponent } from './info-solicitud-empresa/info-solicitud-empresa.component';

const routes: Routes = [
  { path: 'admin/principal', component: PrincipalComponent },
  { path: 'admin/solicitudes', component: ListarSolicitudesEmpresaComponent },
  { path: 'admin/ofertas', component: ListarOfertasComponent },
  { path: 'egresados/verificar', component: VerificarExcelComponent, canActivate: [AdminGuard] },
  { path: 'admin/egresados/ajustes', component: AjustesAdministradorComponent },
  { path: 'apoyos', component: GestionApoyosComponent }
];

@NgModule({
  declarations: [
    ListarSolicitudesEmpresaComponent,
    PrincipalComponent,
    ListarOfertasComponent,
    VerificarExcelComponent,
    ListarEgresadosAceptadosComponent,
    SpinnerComponent,
    ListaEgresadosComponent,
    FileUploadComponent,
    GestionApoyosComponent,
    DialogoEditarComponent,
    AjustesAdministradorComponent,
    SolicitudCarnetizacionComponent,
    InfoSolicitudEmpresaComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatSidenavModule
  ],
  entryComponents: [InfoSolicitudEmpresaComponent, DialogoEditarComponent],
  exports: [ListarSolicitudesEmpresaComponent, PrincipalComponent, ListarOfertasComponent, VerificarExcelComponent, ListarEgresadosAceptadosComponent],
  providers: [CatalogosService, ApoyoService]
})
export class AdministradorModule { }
