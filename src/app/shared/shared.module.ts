import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiciosModule } from './servicios/servicios.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    ServiciosModule
  ]
})
export class SharedModule { }
