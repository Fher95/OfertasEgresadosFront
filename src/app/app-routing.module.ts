import { EgresadosGuard } from './shared/guard/egresados.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeOfertasComponent } from './pages/home/home-ofertas/home-ofertas.component';
import { RegistrarComponent } from './pages/empresa/registrar/registrar.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { LogoutComponent } from './pages/auth/logout/logout.component';
import { AjustesAdministradorComponent } from './pages/administrador/ajustes-administrador/ajustes-administrador.component';
import { SolicitudCarnetizacionComponent } from './pages/administrador/solicitud-carnetizacion/solicitud-carnetizacion.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'home', component: HomeOfertasComponent },
  { path: 'registroEmpresa', component: RegistrarComponent },
  { path: 'egresados', loadChildren: './pages/egresados/egresados.module#EgresadosModule'},
  { path: 'empresa', loadChildren: './pages/empresa/empresa.module#EmpresaModule'},
  { path: 'admin', loadChildren: './pages/administrador/administrador.module#AdministradorModule'},
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [EgresadosGuard]
})
export class AppRoutingModule { }
