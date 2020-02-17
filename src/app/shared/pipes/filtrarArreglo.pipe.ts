import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrarArreglo'
})
export class FiltrarArregloPipe implements PipeTransform {

  transform(arreglo: any[], texto: string, columna: string): any[] {
    console.log(arreglo);
    if(texto = ''){
      return arreglo;
    }
    texto = texto.toLowerCase();
    //Filtro para los valores
    return arreglo.filter(item => {
      return item[columna].toLowerCase().includes(texto);
    });
  }

}
