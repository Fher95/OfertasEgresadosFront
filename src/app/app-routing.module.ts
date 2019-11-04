import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeOfertasComponent } from './pages/home/home-ofertas/home-ofertas.component';
import { RegistrarComponent } from './pages/empresa/registrar/registrar.component';
import { PrincipalComponent } from './pages/administrador/principal/principal.component';
import { DatosEmpresaComponent } from './pages/empresa/datosEmpresa/datos-empresa/datos-empresa.component';
import { EditarEmpresaComponent } from './pages/empresa/editar-empresa/editar-empresa.component';
import { ListarOfertasComponent } from './pages/administrador/listar-ofertas/listar-ofertas.component';
import { ListarSolicitudesEmpresaComponent } from './pages/administrador/listar-solicitudes-empresa/listar-solicitudes-empresa.component';
import { CrearOfertaLaboralComponent } from './pages/empresa/crear-oferta-laboral/crear-oferta-laboral.component';

const routes: Routes = [
  { path: '', component: HomeOfertasComponent },
  { path: 'registroEmpresa', component: RegistrarComponent },
  { path: 'admin/solicitudes', component: ListarSolicitudesEmpresaComponent },
  { path: 'datosEmpresa', component: DatosEmpresaComponent },
  { path: 'editarEmpresa/:data', component: EditarEmpresaComponent},
  { path: 'admin/ofertas', component: ListarOfertasComponent},
  { path: 'crearOfertaLaboral', component: CrearOfertaLaboralComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
