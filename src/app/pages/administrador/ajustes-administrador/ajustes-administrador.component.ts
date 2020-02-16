import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-ajustes-administrador',
  templateUrl: './ajustes-administrador.component.html',
  styleUrls: ['./ajustes-administrador.component.css']
})
export class AjustesAdministradorComponent implements OnInit {
  private codigoPantalla: number;
  constructor() {
    this.codigoPantalla = 0;
  }

  ngOnInit() {
  }

  opcionPantalla(codigoOpcion) {
    this.codigoPantalla = codigoOpcion;
  }

}
