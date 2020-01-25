import { Component, OnInit, ViewChild } from '@angular/core';
import { Solicitud, solicitudGenerica } from './Solicitud';
import { Location } from '@angular/common';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ListarSolicitudesService } from './listar-solicitudes.service';
import { isNull } from 'util';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InfoSolicitudEmpresaComponent } from '../info-solicitud-empresa/info-solicitud-empresa.component';


export interface DialogData {
  solicitud: Solicitud;
}
@Component({
  selector: 'app-listar-solicitudes-empresa',
  templateUrl: './listar-solicitudes-empresa.component.html',
  styleUrls: ['./listar-solicitudes-empresa.component.css']
})

export class ListarSolicitudesEmpresaComponent implements OnInit {

  solicitudes: Solicitud[];
  displayedColumns: string[] = ['estado', 'nombre', 'fecha', 'acciones'];
  dataSource = new MatTableDataSource<Solicitud>(this.solicitudes);
  seleccionNumOfertas: number = 0;
  seleccionValida = false;
  filtroEstado = '';

  solicitudSeleccionada = solicitudGenerica;
  arregloVacio = false;
  auxiliar = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private location: Location,
    private servicioLista: ListarSolicitudesService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.solicitudes = null;
    this.getSolicitudes();
  }

  getSolicitudes(): void {
    this.servicioLista.getSolicitudes()
      .subscribe(solicitudes => {
        this.solicitudes = solicitudes;
        this.auxiliar = true;

        this.dataSource = new MatTableDataSource<Solicitud>(this.filtrarSolicitudes('estado'));
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator._intl.itemsPerPageLabel = 'Items por página';
        if (this.solicitudes.length == 0 || isNull(this.solicitudes)) {
          this.arregloVacio = true;
        } 
        
      });
  }

  // Este método solo se usa para realizar pruebas sin valerse del back-end
  getSolicitudes2(): void {
    this.solicitudes = this.servicioLista.getSolicitudes2();
    this.auxiliar = true;
    this.dataSource = new MatTableDataSource<Solicitud>(this.solicitudes);
    this.dataSource.paginator = this.paginator;
    if (this.solicitudes.length == 0 || isNull(this.solicitudes)) {
      this.arregloVacio = true;
    }
    this.dataSource.paginator = this.paginator;    
  }

  getEstado(parEstado: string): string {   
    return parEstado;
  }

  setSolicitudActual(parId: number): void {    
    for (let index = 0; index < this.solicitudes.length; index++) {
      if (this.solicitudes[index].id_aut_empresa === parId) {
        this.solicitudSeleccionada = this.solicitudes[index];
      }
    }    
    this.openDialog();
  }  

  activarEmpresa(parSolicitud: Solicitud): void {
    if (parSolicitud != null) {
      this.servicioLista.activarSolicitud(parSolicitud.id_aut_empresa, this.seleccionNumOfertas)
        .subscribe(result => {          
          this.getSolicitudes();          
        });
    }
  }

  desactivarEmpresa(parSolicitud: Solicitud): void {
    if (parSolicitud != null) {
      this.servicioLista.desactivarSolicitud(parSolicitud.id_aut_empresa)
        .subscribe(result => {          
          this.getSolicitudes();                    
          this.reiniciarSeleccion();
        });
    }
  }

  activacionValida(): void {
    if (this.seleccionNumOfertas > 0) {
      this.seleccionValida = true;
    } else {
      this.seleccionValida = false;
    }
  }

  reiniciarSeleccion(): void {
    this.seleccionNumOfertas = 0;
    this.seleccionValida = false;
  }

  openDialog() {
    const dial = this.dialog.open(InfoSolicitudEmpresaComponent, {
      data: {
        solicitud: this.solicitudSeleccionada
      },
      width: '40vw'
    });
    this.dialogAbierto(dial);
  }
  
  dialogAbierto(dial: MatDialogRef<InfoSolicitudEmpresaComponent, any>) {
    dial.afterClosed().subscribe((result) => {      
      if (result) {        
        setTimeout(() => {          
          this.getSolicitudes();
        }, 1500);
        
        
      }
    });
  }

  filtrarSolicitudes(columna: string) {    
    if (this.filtroEstado == '' || this.filtroEstado == 'Todas') {
      return this.solicitudes;
    }
    //Filtro para los valores
    return this.solicitudes.filter(item => {
      return item[columna].toLowerCase() == this.filtroEstado.toLowerCase();
    });
  }  
  /**
 * Actualiza la tabla segun el filtro escogido en el método filtrarOfertas, el cual las filtra así:
 * Todas - Aceptadas - Pendientes - Rechazadas
 */
  filtrar(columna) {
    
    this.dataSource = new MatTableDataSource<Solicitud>(this.filtrarSolicitudes(columna));
    this.dataSource.paginator = this.paginator;    
  }    

}
