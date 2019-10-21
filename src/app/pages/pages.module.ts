import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralesService } from '../shared/servicios/generales.service';


@NgModule({
  declarations: [GeneralesService],
  imports: [
    CommonModule
  ],
  exports: []
})
export class PagesModule { }
