import { SolicitudModel } from './../../../../../shared/modelos/solicitud.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-lista-solicitudes-carnetizacion',
  templateUrl: './lista-solicitudes-carnetizacion.component.html',
  styleUrls: ['./lista-solicitudes-carnetizacion.component.css']
})
export class ListaSolicitudesCarnetizacionComponent implements OnInit {
  displayedColumns: string[] = [
    'fechaSolicitud',
    'fechaRespuesta',
    'estadoSolicitud'
  ];

  @Input()
  solicitudes: SolicitudModel[];

  constructor() {}

  ngOnInit() {}
}
