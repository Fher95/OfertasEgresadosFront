import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeOfertasComponent } from './home-ofertas/home-ofertas.component';
import { HeaderComponent } from 'src/app/layout/header/header.component';
import { InicioEgresadosComponent } from './inicio-egresados/inicio-egresados.component';
import { FooterEgresadosComponent } from './inicio-egresados/footer-egresados/footer-egresados.component';
import { NavEgresadosComponent } from './inicio-egresados/nav-egresados/nav-egresados.component';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [InicioEgresadosComponent, FooterEgresadosComponent, NavEgresadosComponent],
  imports: [
    CommonModule,
    LayoutModule
  ]
})
export class HomeModule { }
