import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeOfertasComponent } from './pages/home/home-ofertas/home-ofertas.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './layout/material/material.module';
import { RegistrarComponent } from './pages/empresa/registrar/registrar.component';
import { HeaderComponent } from './layout/header/header.component';
import { NavbarHomeOfertasComponent } from './layout/navbar-home-ofertas/navbar-home-ofertas.component';
import { HttpClientModule } from '@angular/common/http';
import { RecaptchaModule } from 'ng-recaptcha';
import { CaptchaModule } from 'ng-captcha';
import { PrincipalComponent } from './pages/administrador/principal/principal.component';
import { ListarSolicitudesEmpresaComponent } from './pages/administrador/listar-solicitudes-empresa/listar-solicitudes-empresa.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DatosEmpresaComponent } from './pages/empresa/datosEmpresa/datos-empresa/datos-empresa.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeOfertasComponent,
    RegistrarComponent,
    HeaderComponent,
    NavbarHomeOfertasComponent,
    PrincipalComponent,
    ListarSolicitudesEmpresaComponent,
    DatosEmpresaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    RecaptchaModule,
    CaptchaModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
