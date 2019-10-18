import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeOfertasComponent } from './home/home-ofertas/home-ofertas.component';
import { ListarSolicitudesEmpresaComponent } from './administrador/listar-solicitudes-empresa/listar-solicitudes-empresa.component';
import { PrincipalComponent } from './administrador/principal/principal.component';
const routes: Routes = [
  { path: '', component: HomeOfertasComponent },
  { path: 'admin/listar', component: PrincipalComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
