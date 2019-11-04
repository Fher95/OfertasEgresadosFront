import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarSolicitudesEmpresaComponent } from './listar-solicitudes-empresa/listar-solicitudes-empresa.component';
import { PrincipalComponent } from './principal/principal.component';
import { MaterialModule } from 'src/app/layout/material/material.module';
import { ListarOfertasComponent } from './listar-ofertas/listar-ofertas.component';
import { NavbarHomeOfertasComponent } from '../../layout/navbar-home-ofertas/navbar-home-ofertas.component';
import { HeaderComponent } from '../../layout/header/header.component';
import { VerificarExcelComponent } from './verificar-excel/verificar-excel.component';
import { ListarEgresadosAceptadosComponent } from './listar-egresados-aceptados/listar-egresados-aceptados.component';



@NgModule({
  declarations: [ListarSolicitudesEmpresaComponent, PrincipalComponent, ListarOfertasComponent, VerificarExcelComponent, ListarEgresadosAceptadosComponent],
  imports: [
    CommonModule,
    MaterialModule,
    HeaderComponent,
    NavbarHomeOfertasComponent
  ],
  exports: [ListarSolicitudesEmpresaComponent, PrincipalComponent, ListarOfertasComponent, VerificarExcelComponent]
})
export class AdministradorModule { }
