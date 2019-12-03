import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-lista-apoyo',
  templateUrl: './lista-apoyo.component.html',
  styleUrls: ['./lista-apoyo.component.css']
})
export class ListaApoyoComponent implements AfterViewInit {

  @Input()
  dataSource: MatTableDataSource<any>;

  columnas: string[] = ['nombres', 'apellidos'];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor() { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
