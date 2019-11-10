import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NavbarHomeOfertasComponent } from './navbar-home-ofertas/navbar-home-ofertas.component';
import { MaterialModule } from './material/material.module';
import { NavbarEmpresaComponent } from './navbar-empresa/navbar-empresa.component';

@NgModule({
  declarations: [HeaderComponent, NavbarHomeOfertasComponent, NavbarEmpresaComponent],
  imports: [
    CommonModule
  ],
  exports: [
    MaterialModule,
    HeaderComponent,
    NavbarHomeOfertasComponent,
    NavbarEmpresaComponent,
  ]
})
export class LayoutModule { }
