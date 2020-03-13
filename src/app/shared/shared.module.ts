import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiciosModule } from './servicios/servicios.module';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneralesService } from './servicios/generales.service';
import { EmpresaService } from './servicios/empresa/empresa.service';
import { Config } from './servicios/config/config';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    
  ],
  providers: [Config, ServiciosModule,
    GeneralesService,
    EmpresaService]
})
export class SharedModule { }
