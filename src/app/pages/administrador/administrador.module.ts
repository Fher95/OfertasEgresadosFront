import { EventosComponent } from './eventos/eventos.component';
import { InicioComponent } from './inicio/inicio.component';
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
import { AjustesAdministradorComponent } from './ajustes-administrador/ajustes-administrador.component';
import { SolicitudCarnetizacionComponent } from './solicitud-carnetizacion/solicitud-carnetizacion.component';
import { MatSidenavModule } from '@angular/material';
import { InfoSolicitudEmpresaComponent } from './info-solicitud-empresa/info-solicitud-empresa.component';
import { InfoOfertaLaboralComponent } from './info-oferta-laboral/info-oferta-laboral.component';
import { ListaApoyosComponent } from './gestion-apoyos/lista-apoyos/lista-apoyos.component';
import { MaterialModule } from 'src/app/layout/material/material.module';
import { ListaEventosComponent } from './eventos/lista-eventos/lista-eventos.component';
import { RegistroEventoComponent } from './eventos/registro-evento/registro-evento.component';
import { EventoComponent } from './eventos/evento/evento.component';

const routes: Routes = [
  {
    path: '',
    component: InicioComponent,
    children: [
      { path: 'apoyos', component: GestionApoyosComponent },
      { path: 'verificar', component: VerificarExcelComponent },
      { path: 'eventos' }
    ]
  },
  {
    path: '**',
    redirectTo: '/admin',
    pathMatch: 'full'
  }
  /* {path: 'admin/principal', component: PrincipalComponent },
  { path: 'admin/solicitudes', component: ListarSolicitudesEmpresaComponent },
  { path: 'admin/ofertas', component: ListarOfertasComponent },
  { path: 'egresados/verificar', component: VerificarExcelComponent, canActivate: [AdminGuard] },
  { path: 'admin/egresados/ajustes', component: AjustesAdministradorComponent },
  { path: 'apoyos', component: GestionApoyosComponent } */
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
    InfoSolicitudEmpresaComponent,
    InfoOfertaLaboralComponent,
    ListaApoyosComponent,
    InicioComponent,
    ListaEventosComponent,
    RegistroEventoComponent,
    EventosComponent,
    EventoComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatSidenavModule,
    MaterialModule
  ],
  entryComponents: [
    InfoSolicitudEmpresaComponent,
    DialogoEditarComponent,
    InfoOfertaLaboralComponent
  ],
  exports: [
    ListarSolicitudesEmpresaComponent,
    PrincipalComponent,
    ListarOfertasComponent,
    VerificarExcelComponent,
    ListarEgresadosAceptadosComponent
  ],
  providers: [CatalogosService, ApoyoService]
})
export class AdministradorModule {}
