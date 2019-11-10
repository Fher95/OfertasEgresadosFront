import { NgModule } from '@angular/core';
import { FiltrarArregloPipe } from './filtrarArreglo.pipe';

@NgModule({
  declarations: [FiltrarArregloPipe],
  imports: [
  ],
  exports:[
    FiltrarArregloPipe,
  ]
})
export class PipesModule { }
