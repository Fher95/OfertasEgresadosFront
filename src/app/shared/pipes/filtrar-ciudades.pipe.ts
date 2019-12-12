import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrarCiudades'
})
export class FiltrarCiudadesPipe implements PipeTransform {

  transform(ubicaciones:any [], departamento: string): any [] {
    let ciudades = []
    for(let i =0; i<ubicaciones.length; i++){
      if(ubicaciones[i].nombre == departamento){
        ciudades= ubicaciones[i].ciudades
        break
      }
    }
    return ciudades;
  }

}
