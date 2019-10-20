import { Component, OnInit, ViewChild } from '@angular/core';
import { lstSolicitudes } from './Solicitud';
import { Solicitud } from './Solicitud';
import { Location } from '@angular/common';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ListarSolicitudesService } from './listar-solicitudes.service';

@Component({
  selector: 'app-listar-solicitudes-empresa',
  templateUrl: './listar-solicitudes-empresa.component.html',
  styleUrls: ['./listar-solicitudes-empresa.component.css']
})
export class ListarSolicitudesEmpresaComponent implements OnInit {

  solicitudes: Solicitud[];
  displayedColumns: string[] = ['nombre', 'fecha', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<Solicitud>(this.solicitudes);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private location: Location,
    private servicioLista: ListarSolicitudesService
  ) { }


  ngOnInit() {
    this.getSolicitudes();
  }

  getSolicitudes(): void {
    this.servicioLista.getSolicitudes()
      .subscribe(solicitudes => this.solicitudes = solicitudes);
  }
}
