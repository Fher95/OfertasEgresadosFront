import { Component, OnInit } from '@angular/core';
import { SolicitudInterface } from '../../../shared/modelos/solicitudeInterface'
import { CatalogosService } from '../../../shared/servicios/common/catalogos.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-solicitud-carnetizacion',
  templateUrl: './solicitud-carnetizacion.component.html',
  styleUrls: ['./solicitud-carnetizacion.component.css']
})
export class SolicitudCarnetizacionComponent implements OnInit {
  private solicitudes: SolicitudInterface[];
  private solicitudesAceptadas: SolicitudInterface[]=[];
  private solicitudesCanceladas: SolicitudInterface[]=[];
  private dia=new Date().getDate();
  private mes= new Date().getMonth()+1;
  private anio = new Date().getFullYear();
  private fecha:String = this.dia+"/"+this.mes+"/"+this.anio
 
  constructor(private dialog: MatDialog,private catalogoService: CatalogosService,private router: Router) {
    
  }

  ngOnInit() {
    //this.obtenerSolicitudes();
    this.obtenerSolicitudesCarnet()

  }

  obtenerInformacionMensaje() {
    return this.solicitudes == null || this.solicitudes.length == 0 ? "No hay solicitudes pendientes" : "Solicitudes de carnetización pendientes: " + this.solicitudes.length;
  }

  obtenerNombreCorto(nombre, apellido){
      var nombres = nombre.split(' ');
      var apellidos = apellido.split(' ');
      return nombres[0] + " " + apellidos[0];

  }

/*   private obtenerSolicitudes() {
    return this.solicitudes;
    
  } */

  private obtenerSolicitudesCarnet(){
    this.catalogoService.getSolicitudesCarnet().subscribe(data => this.solicitudes = data);
  } 

  private aceptarSolicitud(egresado, index) {
    this.abrirDialogo();
    this.solicitudesAceptadas.push(egresado);
    this.solicitudes.splice(index,1);
    
  }

  private cancelarSolicitud(egresado, index) {
    this.solicitudesCanceladas.push(egresado);
    this.solicitudes.splice(index,1);
  }

  abrirDialogo() {
    
  }
}
