import { Component, OnInit, ViewChild } from '@angular/core';
import { OfertaLaboral, ofertaGenerica, AreaConocimiento, Ubicacion } from './OfertaLaboral';
import { Location } from '@angular/common';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { isNull } from 'util';
import { ListarOfertasService } from './listar-ofertas.service';
import { InfoOfertaLaboralComponent } from '../info-oferta-laboral/info-oferta-laboral.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  oferta: OfertaLaboral;
}

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
  filtroEstado = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private servicioOfertas: ListarOfertasService,
    public dialog: MatDialog
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
        this.dataSource.paginator._intl.itemsPerPageLabel = 'Items por página';
        this.filtrar('estado');
        if (this.ofertas.length === 0 || isNull(this.ofertas)) {
          this.arregloVacio = true;
        }
      });
  }
  getOfertas2(): void {
    this.ofertas = this.servicioOfertas.getOfertas2();
    this.auxiliar = true;
    this.dataSource = new MatTableDataSource<OfertaLaboral>(this.filtrarOfertas('estado'));
    this.dataSource.paginator = this.paginator;
    if (this.ofertas.length == 0 || isNull(this.ofertas)) {
      this.arregloVacio = true;
    }
    this.dataSource.paginator = this.paginator;
  }

  setOfertaActual(parId: number): void {    
    for (let index = 0; index < this.ofertas.length; index++) {
      if (this.ofertas[index].id_aut_oferta === parId) {
        this.ofertaSeleccionada = this.ofertas[index];
        this.estadoActivacion = this.ofertaSeleccionada.estado;
      }
    }    
    this.openDialog();
  }

  aprobarEmpresa(parOferta: OfertaLaboral): void {
    if (OfertaLaboral != null) {
      this.servicioOfertas.aprobarOferta(parOferta.id_aut_oferta)
        .subscribe(result => {          
          this.getOfertas();          
        });
    }
  }
  desaprobarEmpresa(parOferta: OfertaLaboral): void {
    if (OfertaLaboral != null) {
      this.servicioOfertas.desaprobarOferta(parOferta.id_aut_oferta, this.motivoInactivacion)
        .subscribe(result => {          
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
  getStrUbicaciones(parUbicaciones: Ubicacion[]) {
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

  getSalario(parSalario: string): string {
    const salarioSinSigno = parSalario.replace('$', '');
    const numSalario = +salarioSinSigno;
    const strNumero = '$' + numSalario.toLocaleString();
    return strNumero;
  }

  openDialog() {
    const dial = this.dialog.open(InfoOfertaLaboralComponent, {
      data: {
        oferta: this.ofertaSeleccionada
      },
      width: '40vw'
    });
    this.dialogAbierto(dial);
  }
  dialogAbierto(dial: MatDialogRef<InfoOfertaLaboralComponent, any>) {
    dial.afterClosed().subscribe((result) => {
      this.getOfertas();        
      if (result) {
        setTimeout(() => {          
          this.getOfertas();
        }, 1000);      
      }
    });
  }

  filtrarOfertas(columna: string) {
    if (this.filtroEstado == '' || this.filtroEstado == 'Todas') {
      return this.ofertas;
    }
    //Filtro para los valores
    return this.ofertas.filter(item => {
      return item[columna].toLowerCase() == this.filtroEstado.toLowerCase();
    });
  }

  /**
 * Actualiza la tabla segun el filtro escogido en el método filtrarOfertas, el cual las filtra así:
 * Todas - Aceptadas - Pendientes - Rechazadas
 */
  filtrar(columna) {
    this.dataSource = new MatTableDataSource<OfertaLaboral>(this.filtrarOfertas(columna));
    this.dataSource.paginator = this.paginator;
  }

}
