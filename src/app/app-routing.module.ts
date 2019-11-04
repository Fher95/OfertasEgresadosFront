import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeOfertasComponent } from './pages/home/home-ofertas/home-ofertas.component';
import { RegistrarComponent } from './pages/empresa/registrar/registrar.component';
import { PrincipalComponent } from "./pages/administrador/principal/principal.component";
import { DatosEmpresaComponent } from './pages/empresa/datosEmpresa/datos-empresa/datos-empresa.component';
import { PreRegistroComponent } from './pages/egresados/pre-registro/pre-registro.component';

const routes: Routes = [
  { path: 'home', component: HomeOfertasComponent },
  { path: 'registroEmpresa', component: RegistrarComponent },
  { path: 'admin/listar', component: PrincipalComponent },
  { path: 'datosEmpresa', component: DatosEmpresaComponent },  
  { path: 'pre-registro', component: PreRegistroComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
