import { Component, OnInit, ViewChild } from '@angular/core';
import { OfertaLaboral, ofertaGenerica, AreaConocimiento } from './OfertaLaboral';
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
  displayedColumns: string[] = ['Nombre Oferta', 'Area', 'Empresa', 'Fecha Publicacion', 'Estado', 'Acciones'];
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
    this.getOfertas2();
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
      this.servicioOfertas.desaprobarOferta(parOferta.id_aut_oferta,this.motivoInactivacion )
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

  guardarCambio() {
    if (this.estadoActivacion === 'Activar') {
      this.servicioOfertas.aprobarOferta(this.ofertaSeleccionada.id_aut_oferta).subscribe();
    } else if (this.estadoActivacion === 'Inactivar') {
      this.servicioOfertas.desaprobarOferta(this.ofertaSeleccionada.id_aut_oferta, this.motivoInactivacion).subscribe();
    }
  }

}
