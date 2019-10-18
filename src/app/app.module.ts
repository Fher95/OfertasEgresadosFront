import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeOfertasComponent } from './home/home-ofertas/home-ofertas.component';
import { ListarSolicitudesEmpresaComponent } from './administrador/listar-solicitudes-empresa/listar-solicitudes-empresa.component'
import { PrincipalComponent } from './administrador/principal/principal.component';
@NgModule({
  declarations: [
    AppComponent, HomeOfertasComponent, ListarSolicitudesEmpresaComponent, PrincipalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
