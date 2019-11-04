import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarSolicitudesEmpresaComponent } from './listar-solicitudes-empresa/listar-solicitudes-empresa.component';
import { PrincipalComponent } from './principal/principal.component';
import { MaterialModule } from 'src/app/layout/material/material.module';
<<<<<<< HEAD

=======
import { ListarOfertasComponent } from './listar-ofertas/listar-ofertas.component';
import { NavbarHomeOfertasComponent } from '../../layout/navbar-home-ofertas/navbar-home-ofertas.component';
import { HeaderComponent } from '../../layout/header/header.component';
import { VerificarExcelComponent } from './verificar-excel/verificar-excel.component';
>>>>>>> 5ddf2f84afa40ec66d9e602c3a75d6e564d5679c



@NgModule({
  declarations: [ListarSolicitudesEmpresaComponent, PrincipalComponent, ListarOfertasComponent, VerificarExcelComponent],
  imports: [
    CommonModule,
    MaterialModule,
    HeaderComponent,
    NavbarHomeOfertasComponent
  ],
<<<<<<< HEAD
  exports: [ListarSolicitudesEmpresaComponent, PrincipalComponent]
=======
  exports: [ListarSolicitudesEmpresaComponent, PrincipalComponent, ListarOfertasComponent, VerificarExcelComponent]
>>>>>>> 5ddf2f84afa40ec66d9e602c3a75d6e564d5679c
})
export class AdministradorModule { }
