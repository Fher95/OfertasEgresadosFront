import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeOfertasComponent } from './pages/home/home-ofertas/home-ofertas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecaptchaModule } from 'ng-recaptcha';
import { CaptchaModule } from 'ng-captcha';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PreRegistroComponent } from './pages/egresados/pre-registro/pre-registro.component';
import {LocalizacionComponent} from './pages/egresados/localizacion/localizacion.component';
import { DialogFinalRegistroComponent } from './pages/empresa/dialog-final-registro/dialog-final-registro.component';
import { InicioEgresadosComponent } from './pages/home/inicio-egresados/inicio-egresados.component';
import { NavEgresadosComponent } from './pages/home/inicio-egresados/nav-egresados/nav-egresados.component';
import { FooterEgresadosComponent } from './pages/home/inicio-egresados/footer-egresados/footer-egresados.component';
import { ProgramaComponent } from './pages/egresados/programa/programa.component';
import { CompletarRegistroComponent } from './pages/egresados/completar-registro/completar-registro.component';
import { ActualizarComponent } from './pages/egresados/actualizar/actualizar.component';
import { ConfirmarRegistroComponent } from './pages/egresados/confirmar-registro/confirmar-registro.component';
import { EmpresaModule } from './pages/empresa/empresa.module';
import { LayoutModule } from './layout/layout.module';
import { AdministradorModule } from './pages/administrador/administrador.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Config } from './shared/servicios/config/config';
import { AlertService } from './shared/servicios/common/alert.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeOfertasComponent,
    PreRegistroComponent,
    InicioEgresadosComponent,
    NavEgresadosComponent,
    FooterEgresadosComponent,
    LocalizacionComponent,
    ProgramaComponent,
    CompletarRegistroComponent,
    ActualizarComponent,
    ConfirmarRegistroComponent,
  ],
  imports: [
    EmpresaModule,
    AdministradorModule,
    LayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    RecaptchaModule,
    CaptchaModule, 
    PaginationModule.forRoot(),
  ],
  providers: [Config, AlertService],
  bootstrap: [AppComponent],

})
export class AppModule { }
