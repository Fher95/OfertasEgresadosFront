import { ListaSolicitudesCarnetizacionComponent } from './egresados/perfil-egresado/lista-solicitudes-carnetizacion/lista-solicitudes-carnetizacion.component';
import { EgrFileUploadComponent } from './eventos/egr-file-upload/egr-file-upload.component';
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
import {
  MatSidenavModule,
  MAT_DATE_LOCALE,
  MatPaginatorIntl
} from '@angular/material';
import { InfoSolicitudEmpresaComponent } from './info-solicitud-empresa/info-solicitud-empresa.component';
import { InfoOfertaLaboralComponent } from './info-oferta-laboral/info-oferta-laboral.component';
import { ListaApoyosComponent } from './gestion-apoyos/lista-apoyos/lista-apoyos.component';
import { MaterialModule } from 'src/app/layout/material/material.module';
import { ListaEventosComponent } from './eventos/lista-eventos/lista-eventos.component';
import { RegistroEventoComponent } from './eventos/registro-evento/registro-evento.component';
import { EventoComponent } from './eventos/evento/evento.component';
import { DialogoActualizarEventoComponent } from './eventos/dialogo-actualizar-evento/dialogo-actualizar-evento.component';
import { EgresadosComponent } from './egresados/egresados.component';
import { PerfilEgresadoComponent } from './egresados/perfil-egresado/perfil-egresado.component';
import { ListaReferenciasPersonalesComponent } from './egresados/perfil-egresado/lista-referencias-personales/lista-referencias-personales.component';
import { ReferenciaPersonalComponent } from './egresados/perfil-egresado/referencia-personal/referencia-personal.component';
import { ListaTrabajosActualesComponent } from './egresados/perfil-egresado/lista-trabajos-actuales/lista-trabajos-actuales.component';
import { TrabajoActualComponent } from './egresados/perfil-egresado/trabajo-actual/trabajo-actual.component';
import { ListaGradosComponent } from './egresados/perfil-egresado/lista-grados/lista-grados.component';
import { GradoComponent } from './egresados/perfil-egresado/grado/grado.component';
import { InformarcionPersonalComponent } from './egresados/perfil-egresado/informarcion-personal/informarcion-personal.component';
import { ListaGestionEgresadoComponent } from './egresados/lista-gestion-egresado/lista-gestion-egresado.component';
import { EgrFileUploadUpdateComponent } from './eventos/egr-file-upload-update/egr-file-upload-update.component';
import {
  HourDomainValidator,
  LetterValidator,
  NotOnlyNumbersValidator
} from 'src/app/shared/common/custom-validators';
import { getSpanishPaginatorIntl } from 'src/app/shared/common/table-translate';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { ApoyosGuard } from 'src/app/shared/guard/apoyos.guard';

const routes: Routes = [
  {
    path: '',
    component: InicioComponent,
    children: [
      {
        path: 'apoyos',
        component: GestionApoyosComponent,
        canActivate: [AdminGuard]
      },

      {
        path: 'verificar',
        component: VerificarExcelComponent,
        canActivate: [ApoyosGuard],
        data: { servicios: 'egresados' }
      },
      {
        path: 'eventos',
        component: EventosComponent,
        canActivate: [ApoyosGuard],
        data: { servicios: 'eventos' }
      },
      {
        path: 'solicitudesEmpresas',
        component: ListarSolicitudesEmpresaComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'egresados',
        component: EgresadosComponent,
        canActivate: [ApoyosGuard],
        data: { servicios: 'egresados' }
      },
      {
        path: 'egresados/perfil/:id',
        component: PerfilEgresadoComponent,
        canActivate: [ApoyosGuard],
        data: { servicios: 'egresados' }
      },
      {
        path: 'carnetizacion',
        component: SolicitudCarnetizacionComponent,
        canActivate: [ApoyosGuard],
        data: { servicios: 'egresados' }
      },
      {
        path: 'ofertasLaborales',
        component: ListarOfertasComponent,
        canActivate: [AdminGuard]
      }
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
    EventoComponent,
    EgrFileUploadComponent,
    DialogoActualizarEventoComponent,
    EgresadosComponent,
    PerfilEgresadoComponent,
    ListaReferenciasPersonalesComponent,
    ReferenciaPersonalComponent,
    ListaTrabajosActualesComponent,
    TrabajoActualComponent,
    ListaGradosComponent,
    GradoComponent,
    InformarcionPersonalComponent,
    ListaSolicitudesCarnetizacionComponent,
    ListaGestionEgresadoComponent,
    EgrFileUploadUpdateComponent,
    HourDomainValidator,
    LetterValidator,
    NotOnlyNumbersValidator
  ],
  imports: [
    CommonModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatSidenavModule,
    PipesModule,
    MaterialModule
  ],
  entryComponents: [
    InfoSolicitudEmpresaComponent,
    DialogoEditarComponent,
    InfoOfertaLaboralComponent,
    DialogoActualizarEventoComponent,
    GradoComponent,
    ReferenciaPersonalComponent,
    TrabajoActualComponent
  ],
  exports: [
    ListarSolicitudesEmpresaComponent,
    PrincipalComponent,
    ListarOfertasComponent,
    VerificarExcelComponent,
    ListarEgresadosAceptadosComponent
  ],
  providers: [
    CatalogosService,
    ApoyoService,
    { provide: MAT_DATE_LOCALE, useValue: 'es-CO' },
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }
  ]
})
export class AdministradorModule {}
