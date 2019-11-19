import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActualizarComponent } from './actualizar/actualizar.component';
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


const routes: Routes = [
  { path: 'pre-registro', component: PreRegistroComponent },
  { path: 'confirmar/:codigo', component: ConfirmarRegistroComponent },
  { path: 'completarRegistro', component: CompletarRegistroComponent, canActivate: [AuthGuard]},
  { path: 'actualizacion', component: ActualizarComponent },
  //{ path: '**', component: InicioEgresadosComponent }
];


@NgModule({
  declarations: [
    InicioEgresadosComponent,
    ActualizarComponent,
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
    ReferidoComponent
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
    ExplaboralComponent,
    ReferidoComponent,
  ],
})
export class EgresadosModule { }
