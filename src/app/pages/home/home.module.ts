import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeOfertasComponent } from './home-ofertas/home-ofertas.component';
import { HeaderComponent } from 'src/app/layout/header/header.component';

@NgModule({
  declarations: [HomeOfertasComponent],
  imports: [
    CommonModule,
    HeaderComponent
  ]
})
export class HomeModule { }
