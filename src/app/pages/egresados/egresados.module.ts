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
import { CancelarDialogComponent } from './cancelar-dialog/cancelar-dialog.component';
import { PerfilComponent } from './perfil/perfil.component';
import { EventosComponent} from './eventos/eventos.component';
import { CarnetizacionComponent} from './carnetizacion/carnetizacion.component';
import { VerEventoComponent } from './ver-evento/ver-evento.component';
import { InformacionPersonalVerPerfilComponent } from './perfil/informacion-personal-ver-perfil/informacion-personal-ver-perfil.component';
import { RefenciaPersonalComponent } from './perfil/refencia-personal/refencia-personal.component';
import { ReferidoPerfilComponent } from './perfil/referido-perfil/referido-perfil.component';
import { NuevaReferenciaComponent } from './perfil/nueva-referencia/nueva-referencia.component';
import { ExperienciaLaboralComponent } from './perfil/experiencia-laboral/experiencia-laboral.component';
import { ExperienciaPerfilComponent } from './perfil/experiencia-perfil/experiencia-perfil.component';
import { GradoVerPerfilComponent } from './perfil/grado-ver-perfil/grado-ver-perfil.component';
import { UpdateDeleteDialogComponent } from './perfil/grado-ver-perfil/update-delete-dialog/update-delete-dialog.component';

const routes: Routes = [
  { path: 'pre-registro', component: PreRegistroComponent },
  { path: 'confirmar/:codigo', component: ConfirmarRegistroComponent },
  { path: 'completarRegistro', component: CompletarRegistroComponent, canActivate: [AuthGuard]},
  { path: 'verPerfil', component: PerfilComponent},
  { path: 'eventos', component: EventosComponent},
  { path: 'carnetizacion', component: CarnetizacionComponent,canActivate: [AuthGuard] },
  { path: '', component: InicioEgresadosComponent}

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
    CancelarDialogComponent,
    PerfilComponent,
    EventosComponent,
    CarnetizacionComponent,
    VerEventoComponent,
    InformacionPersonalVerPerfilComponent,
    RefenciaPersonalComponent,
    ReferidoPerfilComponent,
    GradoVerPerfilComponent,
    UpdateDeleteDialogComponent,
    NuevaReferenciaComponent,
    ExperienciaLaboralComponent,
    ExperienciaPerfilComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    ConfirmarEmailService, RouterModule, AlertService, AuthGuard
  ],
  entryComponents: [
    CancelarDialogComponent,
    VerEventoComponent,
    ReferidoPerfilComponent,
    NuevaReferenciaComponent,
    UpdateDeleteDialogComponent
  ],
})
export class EgresadosModule { }
