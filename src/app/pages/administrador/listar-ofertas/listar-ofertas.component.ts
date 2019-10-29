import { Component, OnInit, ViewChild } from '@angular/core';
import { OfertaLaboral } from './OfertaLaboral';
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
  displayedColumns: string[] = ['nombre', 'fecha', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<OfertaLaboral>(this.ofertas);
  arregloVacio = false;
  ofertaSeleccionada: OfertaLaboral;
  auxiliar = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private servicioOfertas: ListarOfertasService
  ) { }

  ngOnInit() {
  }

  getOfertas(): void {
    this.servicioOfertas.getOfertas()
      .subscribe(ofertas => {
        this.ofertas = ofertas;
        this.auxiliar = true;

        this.dataSource = new MatTableDataSource<OfertaLaboral>(this.ofertas);
        this.dataSource.paginator = this.paginator;

        if (this.ofertas.length == 0 || isNull(this.ofertas)) {
          this.arregloVacio = true;
        }
      });
  }

  setOfertaActual(parId: number): void {
    for (let index = 0; index < this.ofertas.length; index++) {
      if (this.ofertas[index].id_aut_oferta === parId) {
        this.ofertaSeleccionada = this.ofertas[index];
      }
    }
    console.log(this.ofertaSeleccionada);
  }

  aprobarEmpresa(parOferta: OfertaLaboral): void {
    if (OfertaLaboral != null){
      this.servicioOfertas.aprobarOferta(parOferta.id_aut_oferta)
        .subscribe(result => {
          console.log(result);
          this.getOfertas();
        });
    }
  }
  desaprobarEmpresa(parOferta: OfertaLaboral): void {
    if (OfertaLaboral != null){
      this.servicioOfertas.desaprobarOferta(parOferta.id_aut_oferta)
        .subscribe(result => {
          console.log(result);
          this.getOfertas();
        });
    }
  }

}
