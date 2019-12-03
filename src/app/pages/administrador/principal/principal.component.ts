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
  op1 = false; op2 = false; op3 = false;


  constructor() { }

  ngOnInit() {
  }

  setSeleccion(opcion: number) {
    switch (opcion) {
      case 1:
        this.op1 = true; this.op2 = false; this.op3 = false;
        break;
      case 2:
        this.op1 = false; this.op2 = true; this.op3 = false;
        break;
      case 3:
        this.op1 = false; this.op2 = false; this.op3 = true;
        break;
      default:
        break;
    }
  }

}
