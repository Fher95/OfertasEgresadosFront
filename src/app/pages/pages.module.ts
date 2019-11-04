import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralesService } from '../shared/servicios/generales.service';
import { AdministradorModule } from './administrador/administrador.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [AdministradorModule]
})
export class PagesModule { }
