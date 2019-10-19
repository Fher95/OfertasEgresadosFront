import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  
  areasInteresEmpresa: string[] = ['Alimentos', 'Asegurador', 'Bebidas y tabaco', 'Comercial',
  'Comercio por mayor', 'Comercio por menor', 'Construccion', 'Ingenieria'];

  constructor() { }

  ngOnInit() {
  }

}
