import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { IHistorialOfertas } from '../../../shared/modelos/historialOfertas'
import { EmpresaService } from 'src/app/shared/servicios/empresa/empresa.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-historial-ofertas',
  templateUrl: './historial-ofertas.component.html',
  styleUrls: ['./historial-ofertas.component.css']
})
export class HistorialOfertasComponent implements OnInit {

  id: string;
  displayedColumns: string[] = ['fecha', 'cargo', 'vacantes', 'estado'];
  ofertas: IHistorialOfertas[];
  dataSource = new MatTableDataSource<IHistorialOfertas>(this.ofertas);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private empService: EmpresaService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.ofertas = [];
    this.cargarOfertas();
  }
  cargarOfertas() {
    this.empService.getHistorialOfertas(this.id).subscribe(resultado => {
      this.ofertas = resultado;
      this.dataSource = new MatTableDataSource<IHistorialOfertas>(this.ofertas);
      this.dataSource.paginator = this.paginator;
    },
      error => {
        console.log("Error al obtener el listado de ofertas: ", JSON.stringify(error));
      });
  }

  verOferta(idOferta: number) {
    console.log(idOferta);
  }
 
}
