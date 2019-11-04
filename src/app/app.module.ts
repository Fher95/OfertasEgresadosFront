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
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DatosEmpresaComponent } from './pages/empresa/datosEmpresa/datos-empresa/datos-empresa.component';
import { PreRegistroComponent } from './pages/egresados/pre-registro/pre-registro.component';
import {LocalizacionComponent} from './pages/egresados/localizacion/localizacion.component';
import { InfoDialogComponent } from './pages/egresados/info-dialog/info-dialog.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatOptionModule, MatSelectModule, MatIconModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';







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
    LocalizacionComponent,
    InfoDialogComponent,
  ],
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
    PaginationModule.forRoot()
  ],
  entryComponents: [
    InfoDialogComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
