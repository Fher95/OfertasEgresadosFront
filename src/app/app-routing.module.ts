import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeOfertasComponent } from './pages/home/home-ofertas/home-ofertas.component';
import { RegistrarComponent } from './pages/empresa/registrar/registrar.component';
import { PrincipalComponent } from './pages/administrador/principal/principal.component';
import { DatosEmpresaComponent } from './pages/empresa/datosEmpresa/datos-empresa/datos-empresa.component';

import { PreRegistroComponent } from './pages/egresados/pre-registro/pre-registro.component';
import { ConfirmarRegistroComponent } from './pages/egresados/confirmar-registro/confirmar-registro.component';
import { ListarSolicitudesEmpresaComponent } from './pages/administrador/listar-solicitudes-empresa/listar-solicitudes-empresa.component';
import { EditarEmpresaComponent } from './pages/empresa/editar-empresa/editar-empresa.component';
import { HistorialOfertasComponent } from './pages/empresa/historial-ofertas/historial-ofertas.component';
import { ListarOfertasComponent } from './pages/administrador/listar-ofertas/listar-ofertas.component';

import { VerificarExcelComponent } from './pages/administrador/verificar-excel/verificar-excel.component';
import { OfertasActivasComponent } from './pages/empresa/ofertas-activas/ofertas-activas.component';
import { CrearOfertaLaboralComponent } from './pages/empresa/crear-oferta-laboral/crear-oferta-laboral.component';
import { InicioEgresadosComponent } from './pages/home/inicio-egresados/inicio-egresados.component';
import { CompletarRegistroComponent } from './pages/egresados/completar-registro/completar-registro.component';
import { ActualizarComponent } from './pages/egresados/actualizar/actualizar.component';

const routes: Routes = [
  { path: 'home', component: HomeOfertasComponent },
  { path: 'registroEmpresa', component: RegistrarComponent },
  { path: 'admin/listar', component: PrincipalComponent }, 
  { path: 'pre-registro', component: PreRegistroComponent},
  { path: 'admin/solicitudes', component: ListarSolicitudesEmpresaComponent },
  { path: 'empresa/:id/datosEmpresa', component: DatosEmpresaComponent },
  { path: 'empresa/:id/editarEmpresa', component: EditarEmpresaComponent},
  { path: 'empresa/:id/crearOfertaLaboral', component: CrearOfertaLaboralComponent},
  { path: 'empresa/:id/historialOfertas', component: HistorialOfertasComponent },
  { path: 'empresa/:id/ofertasActivas', component: OfertasActivasComponent },
  { path: 'admin/ofertas', component: ListarOfertasComponent},
  { path: 'admin/egresados/verificar', component: VerificarExcelComponent},
  { path: 'egresados', component: InicioEgresadosComponent},
  { path: 'egresados/completarRegistro', component: CompletarRegistroComponent},
  { path: 'egresados/actualizacion', component: ActualizarComponent},
  { path: 'confirmar/:codigo', component: ConfirmarRegistroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
