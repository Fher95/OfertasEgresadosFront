import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeOfertasComponent } from './pages/home/home-ofertas/home-ofertas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
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
import { DatosEmpresaComponent } from './pages/empresa/datosEmpresa/datos-empresa/datos-empresa.component';
import { MatGridListModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { EditarEmpresaComponent } from './pages/empresa/editar-empresa/editar-empresa.component';
import { DialogFinalRegistroComponent } from './pages/empresa/dialog-final-registro/dialog-final-registro.component';
import { HistorialOfertasComponent } from './pages/empresa/historial-ofertas/historial-ofertas.component';
import { ListarOfertasComponent } from "./pages/administrador/listar-ofertas/listar-ofertas.component";
import { AdministradorModule } from './pages/administrador/administrador.module';
import { VerificarExcelComponent } from './pages/administrador/verificar-excel/verificar-excel.component';
import { OfertasActivasComponent } from './pages/empresa/ofertas-activas/ofertas-activas.component';
import { NavbarEmpresaComponent } from './layout/navbar-empresa/navbar-empresa.component';
import { CrearOfertaLaboralComponent } from './pages/empresa/crear-oferta-laboral/crear-oferta-laboral.component';
import { InicioEgresadosComponent } from './pages/home/inicio-egresados/inicio-egresados.component';
import { NavEgresadosComponent } from './pages/home/inicio-egresados/nav-egresados/nav-egresados.component';
import { FooterEgresadosComponent } from './pages/home/inicio-egresados/footer-egresados/footer-egresados.component';
import { LocalizacionComponent } from './pages/egresados/localizacion/localizacion.component';
import { ProgramaComponent } from './pages/egresados/programa/programa.component';
import { CompletarRegistroComponent } from './pages/egresados/completar-registro/completar-registro.component';
import { ActualizarComponent } from './pages/egresados/actualizar/actualizar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeOfertasComponent,
    RegistrarComponent,
    HeaderComponent,
    NavbarHomeOfertasComponent,
    PrincipalComponent,
    ListarSolicitudesEmpresaComponent,
    DatosEmpresaComponent,
    EditarEmpresaComponent,
    HistorialOfertasComponent,
    ListarOfertasComponent,
    DialogFinalRegistroComponent,
    VerificarExcelComponent,
    OfertasActivasComponent,
    NavbarEmpresaComponent,
    CrearOfertaLaboralComponent,
    InicioEgresadosComponent,
    NavEgresadosComponent,
    FooterEgresadosComponent,
    LocalizacionComponent,
    ProgramaComponent,
    CompletarRegistroComponent,
    ActualizarComponent
  ],
  entryComponents: [DialogFinalRegistroComponent],
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
    MatGridListModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
