import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarSolicitudesEmpresaComponent } from './listar-solicitudes-empresa/listar-solicitudes-empresa.component';
import { PrincipalComponent } from './principal/principal.component';
import { MaterialModule } from 'src/app/layout/material/material.module';
import { VerificarModule } from './egresados/verificar/verificar.module';
import { VerificarRoutingModule } from './egresados/verificar/verificar-routing.module';
import { FrmVerificarComponent } from './egresados/verificar/frm-verificar/frm-verificar.component';
import { ListarOfertasComponent } from './listar-ofertas/listar-ofertas.component';
import { NavbarHomeOfertasComponent } from '../../layout/navbar-home-ofertas/navbar-home-ofertas.component';
import { HeaderComponent } from '../../layout/header/header.component';



@NgModule({
  declarations: [ListarSolicitudesEmpresaComponent, PrincipalComponent, ListarOfertasComponent],
  imports: [
    CommonModule,
    MaterialModule,
    HeaderComponent,
    NavbarHomeOfertasComponent
  ],
  exports: [VerificarModule, ListarSolicitudesEmpresaComponent, PrincipalComponent, ListarOfertasComponent]
})
export class AdministradorModule { }
