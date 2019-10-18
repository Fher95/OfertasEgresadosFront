import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NavbarHomeOfertasComponent } from './navbar-home-ofertas/navbar-home-ofertas.component';

@NgModule({
  declarations: [HeaderComponent, NavbarHomeOfertasComponent],
  imports: [
    CommonModule
  ]
})
export class LayoutModule { }
