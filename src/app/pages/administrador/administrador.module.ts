import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarSolicitudesEmpresaComponent } from './listar-solicitudes-empresa/listar-solicitudes-empresa.component';
import { PrincipalComponent } from './principal/principal.component';
import { MaterialModule } from 'src/app/layout/material/material.module';
import { VerificarModule } from './egresados/verificar/verificar.module';
import { VerificarRoutingModule } from './egresados/verificar/verificar-routing.module';
import { FrmVerificarComponent } from './egresados/verificar/frm-verificar/frm-verificar.component';



@NgModule({
  declarations: [ListarSolicitudesEmpresaComponent, PrincipalComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [VerificarModule, ListarSolicitudesEmpresaComponent, PrincipalComponent]
})
export class AdministradorModule { }
