import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeOfertasComponent } from './home-ofertas/home-ofertas.component';

@NgModule({
  declarations: [HomeOfertasComponent],
  imports: [
    CommonModule
  ],
  exports: [HomeOfertasComponent]
})
export class HomeModule { }
