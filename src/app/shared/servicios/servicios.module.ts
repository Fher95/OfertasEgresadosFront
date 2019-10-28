import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralesService } from './generales.service';
import { EmpresaService } from './empresa/empresa.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    GeneralesService,
    EmpresaService
  ]
})
export class ServiciosModule { }
