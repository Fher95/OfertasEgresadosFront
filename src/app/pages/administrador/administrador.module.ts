import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarSolicitudesEmpresaComponent } from './listar-solicitudes-empresa/listar-solicitudes-empresa.component';
import { PrincipalComponent } from './principal/principal.component';
import { MaterialModule } from 'src/app/layout/material/material.module';




@NgModule({
  declarations: [ListarSolicitudesEmpresaComponent, PrincipalComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [ListarSolicitudesEmpresaComponent, PrincipalComponent]
})
export class AdministradorModule { }
