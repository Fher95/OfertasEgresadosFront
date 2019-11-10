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
import { PreRegistroComponent } from './pages/egresados/pre-registro/pre-registro.component';
import {LocalizacionComponent} from './pages/egresados/localizacion/localizacion.component';
import { InfoDialogComponent } from './pages/egresados/info-dialog/info-dialog.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatOptionModule, MatSelectModule, MatIconModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { EditarEmpresaComponent } from './pages/empresa/editar-empresa/editar-empresa.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material';
import { DialogFinalRegistroComponent } from './pages/empresa/dialog-final-registro/dialog-final-registro.component';
import { ListarOfertasComponent } from "./pages/administrador/listar-ofertas/listar-ofertas.component";
import { AdministradorModule } from './pages/administrador/administrador.module';
import { VerificarExcelComponent } from './pages/administrador/verificar-excel/verificar-excel.component';
import { NavbarEmpresaComponent } from './layout/navbar-empresa/navbar-empresa.component';
import { CrearOfertaLaboralComponent } from './pages/empresa/crear-oferta-laboral/crear-oferta-laboral.component';
import { InicioEgresadosComponent } from './pages/home/inicio-egresados/inicio-egresados.component';
import { NavEgresadosComponent } from './pages/home/inicio-egresados/nav-egresados/nav-egresados.component';
import { FooterEgresadosComponent } from './pages/home/inicio-egresados/footer-egresados/footer-egresados.component';
import { ProgramaComponent } from './pages/egresados/programa/programa.component';
import { CompletarRegistroComponent } from './pages/egresados/completar-registro/completar-registro.component';
import { ActualizarComponent } from './pages/egresados/actualizar/actualizar.component';
import { ConfirmarRegistroComponent } from './pages/egresados/confirmar-registro/confirmar-registro.component';
import { EmpresaModule } from './pages/empresa/empresa.module';

@NgModule({
  declarations: [
    AppComponent,
    RegistrarComponent,
    HeaderComponent,
    NavbarHomeOfertasComponent,
    ListarSolicitudesEmpresaComponent,
    DatosEmpresaComponent,
    HomeOfertasComponent,
    PrincipalComponent,
    PreRegistroComponent,
    InfoDialogComponent,
    EditarEmpresaComponent,
    ListarOfertasComponent,
    DialogFinalRegistroComponent,
    VerificarExcelComponent,
    NavbarEmpresaComponent,
    CrearOfertaLaboralComponent,
    InicioEgresadosComponent,
    NavEgresadosComponent,
    FooterEgresadosComponent,
    LocalizacionComponent,
    ProgramaComponent,
    CompletarRegistroComponent,
    ActualizarComponent,
    ConfirmarRegistroComponent,
  ],
  entryComponents: [DialogFinalRegistroComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRadioModule ,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatCheckboxModule,
    HttpClientModule,
    RecaptchaModule,
    CaptchaModule,
    ReactiveFormsModule,    
    MatGridListModule,
    MatDialogModule,
    PaginationModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
