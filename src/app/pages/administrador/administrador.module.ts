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
import {
  MatSidenavModule} from '@angular/material';
import { InfoSolicitudEmpresaComponent } from './info-solicitud-empresa/info-solicitud-empresa.component';
import {MatDialogModule} from '@angular/material/dialog';

const routes: Routes = [
  { path: 'admin/principal', component: PrincipalComponent }, 
  { path: 'admin/solicitudes', component: ListarSolicitudesEmpresaComponent },
  { path: 'admin/ofertas', component: ListarOfertasComponent},
  { path: 'admin/egresados/verificar', component: VerificarExcelComponent},  
];

@NgModule({
  declarations: [ListarSolicitudesEmpresaComponent, PrincipalComponent, ListarOfertasComponent, VerificarExcelComponent, ListarEgresadosAceptadosComponent, SpinnerComponent, ListaEgresadosComponent, FileUploadComponent, InfoSolicitudEmpresaComponent],
  imports: [
    CommonModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    RouterModule.forChild(routes), MatSidenavModule
  ],
  entryComponents: [InfoSolicitudEmpresaComponent],
  exports: [ListarSolicitudesEmpresaComponent, PrincipalComponent, ListarOfertasComponent, VerificarExcelComponent, ListarEgresadosAceptadosComponent,
     MatSidenavModule, MatDialogModule]
})
export class AdministradorModule { }
