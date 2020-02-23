import { PaisModel } from '../modelos/pais.model';
import { DepartamentoModel } from '../modelos/departamento.model';
import { CiudadModel } from '../modelos/ciudad.model';
import { LugarService } from '../servicios/common/lugar.service';
import { map } from 'rxjs/operators';

/**
 * Utilidad filtar los países, departamentos y ciudades
 * en los seleccionables.
 */
export class FiltroLugares {
  lstPaises: PaisModel[] = [];
  lstDepartamentos: DepartamentoModel[] = [];
  lstCiudades: CiudadModel[] = [];

  constructor(private lugaresService: LugarService) {
    this.cargarPaises();
  }

  cargarPaises() {
    this.lugaresService
      .getPaises()
      .pipe(map(res => res.data))
      .subscribe(paises => (this.lstPaises = paises));
  }

  onPaisChange(idPais: number) {
    this.lugaresService
      .getDepartamento(idPais)
      .pipe(map(res => res.data))
      .subscribe(departamentos => {
        this.lstDepartamentos = departamentos;
        this.lstCiudades = [];
      });
  }

  onDepartamentoChange(idDepartamento: number) {
    this.lugaresService
      .getCiudades(idDepartamento)
      .pipe(map(res => res.data))
      .subscribe(ciudades => (this.lstCiudades = ciudades));
  }
}
