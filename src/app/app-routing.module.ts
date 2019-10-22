import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeOfertasComponent } from './pages/home/home-ofertas/home-ofertas.component';
import { RegistrarComponent } from './pages/empresa/registrar/registrar.component';
import { PrincipalComponent } from "./pages/administrador/principal/principal.component";
import { FrmVerificarComponent } from './pages/administrador/egresados/verificar/frm-verificar/frm-verificar.component';


const routes: Routes = [
  { path: '', component: HomeOfertasComponent },
  { path: 'registroEmpresa', component: RegistrarComponent },
  { path: 'admin/listar', component: PrincipalComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
