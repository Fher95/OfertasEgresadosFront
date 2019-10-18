import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NavbarHomeOfertasComponent } from './navbar-home-ofertas/navbar-home-ofertas.component';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [HeaderComponent, NavbarHomeOfertasComponent],
  imports: [
    CommonModule
  ],
  exports: [
    MaterialModule,
    HeaderComponent,
    NavbarHomeOfertasComponent,
  ]
})
export class LayoutModule { }
