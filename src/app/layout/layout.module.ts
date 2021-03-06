import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NavbarHomeOfertasComponent } from './navbar-home-ofertas/navbar-home-ofertas.component';
import { MaterialModule } from './material/material.module';
import { NavbarEmpresaComponent, DialogContactoComponent } from './navbar-empresa/navbar-empresa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    NavbarHomeOfertasComponent,
    DialogContactoComponent,
    NavbarEmpresaComponent],
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  entryComponents: [DialogContactoComponent],
  exports: [
    MaterialModule,
    HeaderComponent,
    NavbarHomeOfertasComponent,
    NavbarEmpresaComponent,
  ]
})
export class LayoutModule { }
