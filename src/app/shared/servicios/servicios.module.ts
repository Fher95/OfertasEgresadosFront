import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralesService } from './generales.service';
import { AuthServicesService } from './authServices/auth-services.service';
import { CatalogosService } from './common/catalogos.service';
import { ConfirmarEmailService } from './egresados/confirmar-email.service';
import { RegistroService } from './egresados/registro.service';
import { Utilities } from './egresados/utilities';
import { FileUploadService } from './egresados/file-upload.service';
import { EmpresaService } from './empresa/empresa.service';
import { Config } from './config/config';
import { AlertService } from './common/alert.service';

@NgModule({
  declarations: [
    GeneralesService,
    AuthServicesService, 
    CatalogosService, 
    ConfirmarEmailService, 
    FileUploadService,
    RegistroService,
    Utilities,
    EmpresaService,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GeneralesService,
    AuthServicesService, 
    CatalogosService, 
    ConfirmarEmailService, 
    FileUploadService,
    RegistroService,
    Utilities,
    EmpresaService,
    AlertService
  ],
  providers: [Config]
})
export class ServiciosModule { }
