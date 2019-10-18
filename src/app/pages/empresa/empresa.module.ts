import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrarComponent } from './registrar/registrar.component';
import { MaterialModule } from 'src/app/layout/material/material.module';

@NgModule({
  declarations: [RegistrarComponent],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    RegistrarComponent,
  ]
})
export class EmpresaModule { }
