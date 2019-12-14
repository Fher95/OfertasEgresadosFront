import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  events: string[] = [];
  opened: boolean = true;
  op1 = false; op2 = false; op0 = false;


  constructor() { }

  ngOnInit() {
    this.setSeleccion(1);
  }

  setSeleccion(opcion: number) {
    switch (opcion) {
      case 1:
        this.op1 = true; this.op2 = false; this.op0 = false;
        break;
      case 2:
        this.op1 = false; this.op2 = true; this.op0 = false;
        break;
      case 0:
        this.op1 = false; this.op2 = false; this.op0 = true;
        break;
      default:
        break;
    }
  }

}
