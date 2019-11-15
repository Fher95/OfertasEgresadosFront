import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { IHistorialOfertas } from '../../../shared/modelos/historialOfertas'
import { EmpresaService } from 'src/app/shared/servicios/empresa/empresa.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { isNull } from 'util';
import { DialogEstadoOfertaComponent } from '../dialog-estado-oferta/dialog-estado-oferta.component';

@Component({
  selector: 'app-ofertas-publicadas',
  templateUrl: './ofertas-publicadas.component.html',
  styleUrls: ['./ofertas-publicadas.component.css']
})
export class OfertasPublicadasComponent implements OnInit {

  filtroEstado: string;
  id: string;
  displayedColumns: string[] = ['estado', 'fecha', 'cargo', 'vacantes', 'estadoEmpresa', 'acciones'];
  ofertas: IHistorialOfertas[];
  dataSource = new MatTableDataSource<IHistorialOfertas>(this.ofertas);
  filtro = 'Aceptada';
  listaCargada: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private empService: EmpresaService,
    private activatedRoute: ActivatedRoute,
    private matDialog: MatDialog,
  ) { }

  ngOnInit() {
    this.filtroEstado = 'Todas';
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.ofertas = [];
    this.cargarOfertas();
  }

  cargarOfertas() {
    this.empService.getHistorialOfertas(this.id).subscribe(resultado => {
      console.log(resultado);
      this.ofertas = resultado;
      this.listaCargada = true;
      this.dataSource = new MatTableDataSource<IHistorialOfertas>(this.ofertas);
      this.dataSource.paginator = this.paginator;

      if (this.ofertas.length == 0 || isNull(this.ofertas)) {
        this.listaCargada = true;
      }
    },
      error => {
        this.listaCargada = true;
        console.log("Error al obtener el listado de ofertas: ", JSON.stringify(error));
      });
  }

  mostrarInfo(row: any) {
    this.openDialog(row);
  }

  /**
 * Abre un dialog de angular material
 * El contenido del dialog esta creado en el componente DialogEstadoOfertaComponent
 */
  openDialog(row: any) {
    const dialogRef = this.matDialog.open(DialogEstadoOfertaComponent, {
      data: row
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      console.log('The dialog was closed');
    });
  }

  verOferta(idOferta: number) {
    console.log(idOferta);
  }

  filtrarOfertas(columna: string) {
    if (this.filtroEstado == '' || this.filtroEstado == 'Todas') {
      console.log('todas');
      return this.ofertas;
    }
    console.log(this.filtroEstado);
    //Filtro para los valores
    return this.ofertas.filter(item => {
      return item[columna].toLowerCase() == this.filtroEstado.toLowerCase();
    });
  }

  filtrar(columna) {
    this.dataSource = new MatTableDataSource<IHistorialOfertas>(this.filtrarOfertas(columna));
    this.dataSource.paginator = this.paginator;
  }

  buscar(filterValue: string) {
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
