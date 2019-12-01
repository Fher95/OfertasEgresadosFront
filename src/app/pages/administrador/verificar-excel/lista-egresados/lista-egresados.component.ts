import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Component, ViewChild, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-lista-egresados',
  templateUrl: './lista-egresados.component.html',
  styleUrls: ['./lista-egresados.component.css']
})
export class ListaEgresadosComponent implements AfterViewInit {

  @Input()
  dataSource: MatTableDataSource<any>;

  columnas: string[] = ['nombres', 'apellidos', 'cedula', 'programa'];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor() { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
