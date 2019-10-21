import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneralesService } from './servicios/generales.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClient,
    Observable,
  ],
  exports: [
    GeneralesService,
  ]
})
export class SharedModule { }
