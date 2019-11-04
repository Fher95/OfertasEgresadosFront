import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { IHistorialOfertas } from '../../../shared/modelos/historialOfertas'
import { EmpresaService } from 'src/app/shared/servicios/empresa/empresa.service';


@Component({
  selector: 'app-historial-ofertas',
  templateUrl: './historial-ofertas.component.html',
  styleUrls: ['./historial-ofertas.component.css']
})
export class HistorialOfertasComponent implements OnInit {

  displayedColumns: string[] = ['fecha', 'cargo', 'vacantes'];
  ofertas: IHistorialOfertas[];
  dataSource = new MatTableDataSource<IHistorialOfertas>(this.ofertas);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private empService: EmpresaService,
  ) { }

  ngOnInit() {
    console.log("paso por aqui");
    this.ofertas = null;
    this.cargarOfertas();
  }
  cargarOfertas() {
    console.log("paso por aqui");
    this.empService.getHistorialOfertas(1).subscribe(resultado => {
      console.log(resultado);
      this.ofertas = resultado;
      this.dataSource = new MatTableDataSource<IHistorialOfertas>(this.ofertas);
      this.dataSource.paginator = this.paginator;
    },
      error => {
        console.log("Error al obtener el listado de ofertas: ", JSON.stringify(error));
      });
  }
 
}
