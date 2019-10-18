import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarSolicitudesEmpresaComponent } from './listar-solicitudes-empresa/listar-solicitudes-empresa.component';
import { PrincipalComponent } from './principal/principal.component';

@NgModule({
  declarations: [ListarSolicitudesEmpresaComponent, PrincipalComponent],
  imports: [
    CommonModule
  ],
  exports: [ListarSolicitudesEmpresaComponent]
})
export class AdministradorModule { }
