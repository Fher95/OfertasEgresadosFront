import { NgModule } from '@angular/core';
import { FiltrarArregloPipe } from './filtrarArreglo.pipe';
import { DiscapacidadesPipe } from './discapacidades.pipe';
import { EgCapitalizePipe } from './eg-capitalize.pipe';

@NgModule({
  declarations: [FiltrarArregloPipe, DiscapacidadesPipe, EgCapitalizePipe],
  imports: [],
  exports: [FiltrarArregloPipe, DiscapacidadesPipe, EgCapitalizePipe]
})
export class PipesModule {}
