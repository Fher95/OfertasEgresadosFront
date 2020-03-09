import { Pipe, PipeTransform } from '@angular/core';
import { DiscapacidadInterface } from '../modelos/discapacidadInterface';

@Pipe({
  name: 'discapacidades'
})
export class DiscapacidadesPipe implements PipeTransform {
  transform(discapacidades: DiscapacidadInterface[], ...args: any[]): any {
    return discapacidades.map(d => d.Nombre).join(', ');
  }
}
