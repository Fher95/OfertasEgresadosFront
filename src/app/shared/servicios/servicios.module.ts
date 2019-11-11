import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralesService } from './generales.service';
import { EmpresaService } from './empresa/empresa.service';
import { Config } from './config/config';
import { AlertService } from './common/alert.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    GeneralesService,
    EmpresaService,
    AlertService
  ],
  providers: [Config]
})
export class ServiciosModule { }
