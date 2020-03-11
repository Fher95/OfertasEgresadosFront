import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompletarRegistroComponent } from './completar-registro/completar-registro.component';
import { LocalizacionComponent } from './localizacion/localizacion.component';
import { ProgramaComponent } from './programa/programa.component';
import { ConfirmarRegistroComponent } from './confirmar-registro/confirmar-registro.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { ComentariosComponent } from './comentarios/comentarios.component';
import { ExplaboralComponent } from './explaboral/explaboral.component';
import { ReferidoComponent } from './referido/referido.component';
import { ConfirmarEmailService } from 'src/app/shared/servicios/egresados/confirmar-email.service';
import { RouterModule, Routes } from '@angular/router';
import { AlertService } from 'src/app/shared/servicios/common/alert.service';
import { PreRegistroComponent } from './pre-registro/pre-registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InicioEgresadosComponent } from '../home/inicio-egresados/inicio-egresados.component';
import { NavEgresadosComponent } from '../home/inicio-egresados/nav-egresados/nav-egresados.component';
import { FooterEgresadosComponent } from '../home/inicio-egresados/footer-egresados/footer-egresados.component';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { EventosComponent } from './eventos/eventos.component';
import { CarnetizacionComponent } from './carnetizacion/carnetizacion.component';
import { VerEventoComponent } from './ver-evento/ver-evento.component';
import { InformacionPersonalVerPerfilComponent } from './perfil/informacion-personal-ver-perfil/informacion-personal-ver-perfil.component';
import { GradoVerPerfilComponent } from './perfil/grado-ver-perfil/grado-ver-perfil.component';
import { UpdateDeleteDialogComponent } from './perfil/grado-ver-perfil/update-delete-dialog/update-delete-dialog.component';
import { RefenciaPersonalComponent } from './perfil/refencia-personal/refencia-personal.component';
import { ReferidoPerfilComponent } from './perfil/referido-perfil/referido-perfil.component';
import { ExperienciaLaboralComponent } from './perfil/experiencia-laboral/experiencia-laboral.component';
import { ExperienciaPerfilComponent } from './perfil/experiencia-perfil/experiencia-perfil.component';
import { MAT_DATE_LOCALE, MatPaginatorIntl } from '@angular/material';
import { getSpanishPaginatorIntl } from 'src/app/shared/common/table-translate';
import { VerPerfilComponent } from './ver-perfil/ver-perfil.component';
import { InformacionPersonalEgresadoComponent } from './ver-perfil/informacion-personal-egresado/informacion-personal-egresado.component';
import { DiscapacidadesPipe } from 'src/app/shared/pipes/discapacidades.pipe';
import { EgCapitalizePipe } from 'src/app/shared/pipes/eg-capitalize.pipe';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { ListaGradosEgresadoComponent } from './ver-perfil/lista-grados-egresado/lista-grados-egresado.component';
import { GradoEgresadoComponent } from './ver-perfil/lista-grados-egresado/grado-egresado/grado-egresado.component';

const routes: Routes = [
  { path: 'pre-registro', component: PreRegistroComponent },
  { path: 'confirmar/:codigo', component: ConfirmarRegistroComponent },
  {
    path: 'completarRegistro',
    component: CompletarRegistroComponent,
    canActivate: [AuthGuard]
  },
  { path: 'verPerfil', component: VerPerfilComponent },
  { path: 'eventos', component: EventosComponent },
  {
    path: 'carnetizacion',
    component: CarnetizacionComponent,
    canActivate: [AuthGuard]
  },
  { path: '', component: InicioEgresadosComponent }

  //{ path: '**', component: InicioEgresadosComponent }
];

@NgModule({
  declarations: [
    InicioEgresadosComponent,
    CompletarRegistroComponent,
    LocalizacionComponent,
    ProgramaComponent,
    ConfirmarRegistroComponent,
    PreRegistroComponent,
    LocalizacionComponent,
    NavEgresadosComponent,
    FooterEgresadosComponent,
    ComentariosComponent,
    ExplaboralComponent,
    ReferidoComponent,
    PerfilComponent,
    EventosComponent,
    CarnetizacionComponent,
    VerEventoComponent,
    InformacionPersonalVerPerfilComponent,
    RefenciaPersonalComponent,
    ReferidoPerfilComponent,
    GradoVerPerfilComponent,
    UpdateDeleteDialogComponent,
    ExperienciaLaboralComponent,
    ExperienciaPerfilComponent,
    VerPerfilComponent,
    InformacionPersonalEgresadoComponent,
    ListaGradosEgresadoComponent,
    GradoEgresadoComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    ConfirmarEmailService,
    RouterModule,
    AlertService,
    AuthGuard,
    { provide: MAT_DATE_LOCALE, useValue: 'es-CO' },
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }
  ],
  entryComponents: [
    VerEventoComponent,
    ReferidoPerfilComponent,
    GradoEgresadoComponent,
    UpdateDeleteDialogComponent,
    UpdateDeleteDialogComponent
  ]
})
export class EgresadosModule {}
