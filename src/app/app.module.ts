import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeOfertasComponent } from './pages/home/home-ofertas/home-ofertas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecaptchaModule } from 'ng-recaptcha';
import { CaptchaModule } from 'ng-captcha';
import { PaginationModule } from 'ngx-bootstrap/pagination';  
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
    HomeOfertasComponent
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
