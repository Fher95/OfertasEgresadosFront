import { SpinnerComponent } from './spinner/spinner.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarSolicitudesEmpresaComponent } from './listar-solicitudes-empresa/listar-solicitudes-empresa.component';
import { PrincipalComponent } from './principal/principal.component';
import { ListarOfertasComponent } from './listar-ofertas/listar-ofertas.component';
import { VerificarExcelComponent } from './verificar-excel/verificar-excel.component';
import { ListarEgresadosAceptadosComponent } from './listar-egresados-aceptados/listar-egresados-aceptados.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ListaEgresadosComponent } from './verificar-excel/lista-egresados/lista-egresados.component';
import { FileUploadComponent } from './verificar-excel/file-upload/file-upload.component';

const routes: Routes = [
  { path: 'admin/listar', component: PrincipalComponent }, 
  { path: 'admin/solicitudes', component: ListarSolicitudesEmpresaComponent },
  { path: 'admin/ofertas', component: ListarOfertasComponent},
  { path: 'admin/egresados/verificar', component: VerificarExcelComponent},
];

@NgModule({
  declarations: [ListarSolicitudesEmpresaComponent, PrincipalComponent, ListarOfertasComponent, VerificarExcelComponent, ListarEgresadosAceptadosComponent, SpinnerComponent, ListaEgresadosComponent, FileUploadComponent],
  imports: [
    CommonModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [ListarSolicitudesEmpresaComponent, PrincipalComponent, ListarOfertasComponent, VerificarExcelComponent, ListarEgresadosAceptadosComponent]
})
export class AdministradorModule { }
