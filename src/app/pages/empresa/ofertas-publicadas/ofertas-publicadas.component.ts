import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { IHistorialOfertas } from '../../../shared/modelos/historialOfertas'
import { EmpresaService } from 'src/app/shared/servicios/empresa/empresa.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { isNull } from 'util';
import { DialogEstadoOfertaComponent } from '../dialog-estado-oferta/dialog-estado-oferta.component';
import { AlertService } from 'src/app/shared/servicios/common/alert.service';

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
    private alert: AlertService
  ) { }

  ngOnInit() {
    this.filtroEstado = 'Todas';
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.ofertas = [];
    this.cargarOfertas();
  }
  
  /**
 * Carga las ofertas laborales publicadas a la empresa en la tabla por medio
 * de una peticion http.
 */
  cargarOfertas() {
    this.empService.getHistorialOfertas(this.id).subscribe(resultado => {
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
        this.alert.showErrorMessage("Ha ocurrido un error", "Por favor recarga la página o intenta más tarde")
        console.log("Error al obtener el listado de ofertas: ", JSON.stringify(error));
      });
  }

  /**
 * Muestra la informacion de una oferta laboral
 * @param row datos de la oferta laboral
 */
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
    dialogRef.afterClosed().subscribe();
  }

  /**
 * Logica para filtrar las ofertas publicadas por la empresa así:
 * Todas - Aceptadas - Pendientes - Rechazadas
 */
  filtrarOfertas(columna: string) {
    if (this.filtroEstado == '' || this.filtroEstado == 'Todas') {
      return this.ofertas;
    }
    //Filtro para los valores
    return this.ofertas.filter(item => {
      return item[columna].toLowerCase() == this.filtroEstado.toLowerCase();
    });
  }

  /**
 * Actualiza la tabla segun el filtro escogido en el método filtrarOfertas, el cual las filtra así:
 * Todas - Aceptadas - Pendientes - Rechazadas
 */
  filtrar(columna) {
    this.dataSource = new MatTableDataSource<IHistorialOfertas>(this.filtrarOfertas(columna));
    this.dataSource.paginator = this.paginator;
  }

  /**
 * Filtra la tabla dependiendo lo que se introduzca en la barra de busqueda.
 * La busqueda la realiza comparando por cualquier columna o dato de la oferta.
 */
  buscar(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
