import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActualizarComponent } from './actualizar/actualizar.component';
import { CompletarRegistroComponent } from './completar-registro/completar-registro.component';
import { LocalizacionComponent } from './localizacion/localizacion.component';
import { ProgramaComponent } from './programa/programa.component';
import { ConfirmarRegistroComponent } from './confirmar-registro/confirmar-registro.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { ConfirmarEmailService } from 'src/app/shared/servicios/egresados/confirmar-email.service';
import { RouterModule, Routes } from '@angular/router';
import { AlertService } from 'src/app/shared/servicios/common/alert.service';
import { PreRegistroComponent } from './pre-registro/pre-registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InicioEgresadosComponent } from '../home/inicio-egresados/inicio-egresados.component';
import { NavEgresadosComponent } from '../home/inicio-egresados/nav-egresados/nav-egresados.component';
import { FooterEgresadosComponent } from '../home/inicio-egresados/footer-egresados/footer-egresados.component';

const routes: Routes = [
  { path: 'pre-registro', component: PreRegistroComponent },
  { path: 'confirmar/:codigo', component: ConfirmarRegistroComponent },
  { path: 'completarRegistro', component: CompletarRegistroComponent },
  { path: 'actualizacion', component: ActualizarComponent },
  { path: '**', component: InicioEgresadosComponent }
];


@NgModule({
  declarations: [
    ActualizarComponent,
    CompletarRegistroComponent,
    LocalizacionComponent,
    ProgramaComponent,
    InicioEgresadosComponent,
    ConfirmarRegistroComponent,
    PreRegistroComponent,
    CompletarRegistroComponent,
    LocalizacionComponent,
    NavEgresadosComponent,
    FooterEgresadosComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    ConfirmarEmailService, RouterModule, AlertService
  ]
})
export class EgresadosModule { }
