import { Component, OnInit } from '@angular/core';
import { lstSolicitudes } from "./Solicitud";

@Component({
  selector: 'app-listar-solicitudes-empresa',
  templateUrl: './listar-solicitudes-empresa.component.html',
  styleUrls: ['./listar-solicitudes-empresa.component.css']
})
export class ListarSolicitudesEmpresaComponent implements OnInit {

  constructor() { }
  contador = 0;
  pacientes = lstSolicitudes;
  ngOnInit() {
  }
  
  getNum(): number {
    this.contador = this.contador + 1;
    return this.contador;
  }
}
