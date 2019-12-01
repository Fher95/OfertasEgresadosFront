import { Component, OnInit, ViewChild } from '@angular/core';
import { OfertaLaboral, ofertaGenerica, AreaConocimiento, Ubicacion } from './OfertaLaboral';
import { Location } from '@angular/common';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { isNull } from 'util';
import { ListarOfertasService } from './listar-ofertas.service';



@Component({
  selector: 'app-listar-ofertas',
  templateUrl: './listar-ofertas.component.html',
  styleUrls: ['./listar-ofertas.component.css']
})
export class ListarOfertasComponent implements OnInit {

  ofertas: OfertaLaboral[];
  displayedColumns: string[] = ['Estado', 'Nombre Oferta', 'Area', 'Empresa', 'Fecha Publicacion', 'Acciones'];
  dataSource = new MatTableDataSource<OfertaLaboral>(this.ofertas);
  arregloVacio = false;
  ofertaSeleccionada = ofertaGenerica;
  auxiliar = false;
  estadoActivacion: string;
  motivoInactivacion: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private servicioOfertas: ListarOfertasService
  ) { }

  ngOnInit() {
    this.ofertas = null;
    this.getOfertas();
  }

  getOfertas(): void {
    this.servicioOfertas.getOfertas()
      .subscribe(ofertas => {
        this.ofertas = ofertas;
        this.auxiliar = true;

        this.dataSource = new MatTableDataSource<OfertaLaboral>(this.ofertas);
        this.dataSource.paginator = this.paginator;

        if (this.ofertas.length === 0 || isNull(this.ofertas)) {
          this.arregloVacio = true;
        }
      });
  }
  getOfertas2(): void {
    this.ofertas = this.servicioOfertas.getOfertas2();
    this.auxiliar = true;
    this.dataSource = new MatTableDataSource<OfertaLaboral>(this.ofertas);
    this.dataSource.paginator = this.paginator;
    if (this.ofertas.length == 0 || isNull(this.ofertas)) {
      this.arregloVacio = true;
    }
    this.dataSource.paginator = this.paginator;
  }

  setOfertaActual(parId: number): void {
    console.log("Id recibido: " + parId);
    for (let index = 0; index < this.ofertas.length; index++) {
      if (this.ofertas[index].id_aut_oferta === parId) {
        this.ofertaSeleccionada = this.ofertas[index];
        this.estadoActivacion = this.ofertaSeleccionada.estado;
      }
    }
    console.log(this.ofertaSeleccionada);
  }

  aprobarEmpresa(parOferta: OfertaLaboral): void {
    if (OfertaLaboral != null) {
      this.servicioOfertas.aprobarOferta(parOferta.id_aut_oferta)
        .subscribe(result => {
          console.log(result);
          this.getOfertas();
        });
    }
  }
  desaprobarEmpresa(parOferta: OfertaLaboral): void {
    if (OfertaLaboral != null) {
      this.servicioOfertas.desaprobarOferta(parOferta.id_aut_oferta, this.motivoInactivacion )
        .subscribe(result => {
          console.log(result);
          this.getOfertas();
        });
    }
  }

  ofertaSelecNotNull(): boolean {
    if (this.ofertaSeleccionada == null) {
      return false;
    } else { return true; }
  }

  getAreasStr(parAreas: AreaConocimiento[]): string {
    if (parAreas === null || parAreas.length === 0) {
      return 'No especificado';
    } else {
      let strAreas = '';
      for (let index = 0; index < parAreas.length; index++) {
        const element = parAreas[index].nombre;
        strAreas += element;
        if (index < (parAreas.length - 1)) {
          strAreas += ', ';
        }
      }
      return strAreas;
    }
  }
  getStrUbicaciones(parUbicaciones: Ubicacion[]){
    if (parUbicaciones === null || parUbicaciones.length === 0) {
      return 'No especificado';
    } else {
      let strAreas = '';
      for (let index = 0; index < parUbicaciones.length; index++) {
        const element = parUbicaciones[index].nombre + ' (' + parUbicaciones[index].departamento + ')';
        strAreas += element;
        if (index < (parUbicaciones.length - 1)) {
          strAreas += ' - ';
        }
      }
      return strAreas;
    }
  }

  guardarCambio() {
    if (this.estadoActivacion === 'Aceptada') {
      this.servicioOfertas.aprobarOferta(this.ofertaSeleccionada.id_aut_oferta)
      .subscribe(result => {
        this.getOfertas();
      });
    } else if (this.estadoActivacion === 'Rechazada') {
      this.servicioOfertas.desaprobarOferta(this.ofertaSeleccionada.id_aut_oferta, this.motivoInactivacion)
      .subscribe(result => {
        this.getOfertas();
      });
    }

  }

  getSalario(parSalario: string): string{
    const salarioSinSigno = parSalario.replace('$', '');
    const numSalario = +salarioSinSigno;
    const strNumero = '$' + numSalario.toLocaleString();
    return strNumero;
  }

}
