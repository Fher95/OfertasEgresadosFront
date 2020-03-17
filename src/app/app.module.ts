import { AdminGuard } from './shared/guard/admin.guard';
import { EgresadosGuard } from './shared/guard/egresados.guard';
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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Config } from './shared/servicios/config/config';
import { AlertService } from './shared/servicios/common/alert.service';
import { AccessTokenInterceptor } from './shared/inteceptor/access-token.interceptor';
import { AuthModule } from './pages/auth/auth.module';
import { CambioEmailApoyoComponent } from './pages/cambio-email-apoyo/cambio-email-apoyo.component';
import { HeaderInterceptor } from './shared/inteceptor/csp';

@NgModule({
  declarations: [AppComponent, HomeOfertasComponent, CambioEmailApoyoComponent],
  imports: [
    EmpresaModule,
    LayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    RecaptchaModule,
    CaptchaModule,
    AuthModule,
    PaginationModule.forRoot()
  ],
  providers: [
    Config,
    AlertService,
    EgresadosGuard,
    AdminGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccessTokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true
    }
  ],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
