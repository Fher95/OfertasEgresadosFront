import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrarComponent } from './registrar/registrar.component';
import { MaterialModule } from 'src/app/layout/material/material.module';
import { NavbarHomeOfertasComponent } from 'src/app/layout/navbar-home-ofertas/navbar-home-ofertas.component';
import { HeaderComponent } from 'src/app/layout/header/header.component';
import { GeneralesService } from 'src/app/shared/servicios/generales.service';
import { FormsModule } from "@angular/forms";
import { DatosEmpresaComponent } from './datosEmpresa/datos-empresa/datos-empresa.component';
import { DialogFinalRegistroComponent } from './dialog-final-registro/dialog-final-registro.component';
import { HistorialOfertasComponent } from './historial-ofertas/historial-ofertas.component';
import { EditarEmpresaComponent } from './editar-empresa/editar-empresa.component';
import { CrearOfertaLaboralComponent } from './crear-oferta-laboral/crear-oferta-laboral.component';

@NgModule({
  declarations: [RegistrarComponent, DatosEmpresaComponent,EditarEmpresaComponent, DialogFinalRegistroComponent, HistorialOfertasComponent, CrearOfertaLaboralComponent],
  imports: [
    CommonModule,
    MaterialModule,
    NavbarHomeOfertasComponent,
    HeaderComponent,
    FormsModule,
    CrearOfertaLaboralComponent
  ],
  providers: [GeneralesService],
  exports: [
    RegistrarComponent,
  ]
})
export class EmpresaModule { }
