import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NavbarHomeOfertasComponent } from './navbar-home-ofertas/navbar-home-ofertas.component';
import { MaterialModule } from './material/material.module';
import { NavbarEmpresaComponent } from './navbar-empresa/navbar-empresa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    NavbarHomeOfertasComponent, 
    NavbarEmpresaComponent],
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MaterialModule,
    HeaderComponent,
    NavbarHomeOfertasComponent,
    NavbarEmpresaComponent,
  ]
})
export class LayoutModule { }
