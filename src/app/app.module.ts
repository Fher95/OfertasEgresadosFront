import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeOfertasComponent } from './pages/home/home-ofertas/home-ofertas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './layout/material/material.module';
import { RegistrarComponent } from './pages/empresa/registrar/registrar.component';
import { HeaderComponent } from './layout/header/header.component';
import { NavbarHomeOfertasComponent } from './layout/navbar-home-ofertas/navbar-home-ofertas.component';
import { PrincipalComponent } from './pages/administrador/principal/principal.component';
import { ListarSolicitudesEmpresaComponent } from './pages/administrador/listar-solicitudes-empresa/listar-solicitudes-empresa.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HomeOfertasComponent,
    RegistrarComponent,
    HeaderComponent,
    NavbarHomeOfertasComponent,
    PrincipalComponent,
    ListarSolicitudesEmpresaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    PaginationModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
