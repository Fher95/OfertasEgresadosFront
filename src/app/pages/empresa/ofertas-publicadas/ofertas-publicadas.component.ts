import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { IHistorialOfertas } from '../../../shared/modelos/historialOfertas'
import { EmpresaService } from 'src/app/shared/servicios/empresa/empresa.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-ofertas-publicadas',
  templateUrl: './ofertas-publicadas.component.html',
  styleUrls: ['./ofertas-publicadas.component.css']
})
export class OfertasPublicadasComponent implements OnInit {

  id: string;
  displayedColumns: string[] = ['fecha', 'cargo', 'vacantes', 'estado'];
  ofertas: IHistorialOfertas[];
  dataSource = new MatTableDataSource<IHistorialOfertas>(this.ofertas);
  filtro = 'Aceptada';

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

  filtrarOfertas(texto, columna: string) {
    if(texto == ''){
      console.log('todas');
      return this.ofertas;
    }
    console.log(texto);
    //Filtro para los valores
    return this.ofertas.filter(item => {
      return item[columna].toLowerCase() == texto;
    });
  }

  filtrar(texto, columna){
    console.log(texto);
    this.dataSource = new MatTableDataSource<IHistorialOfertas>(this.filtrarOfertas(texto, columna));
    this.dataSource.paginator = this.paginator;
  }
}
