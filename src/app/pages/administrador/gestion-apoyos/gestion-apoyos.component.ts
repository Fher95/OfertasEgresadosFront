import { DialogoEditarComponent } from './dialogo-editar/dialogo-editar.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatPaginator, MatDialogConfig } from '@angular/material';
import { AlertService } from './../../../shared/servicios/common/alert.service';
import { ApoyoService } from './../../../shared/servicios/egresados/apoyo.service';
import { ApoyoModel } from './../../../shared/modelos/apoyo.model';
import { ServicioModel } from './../../../shared/modelos/servicio.model';
import { CatalogosService } from './../../../shared/servicios/common/catalogos.service';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-gestion-apoyos',
  templateUrl: './gestion-apoyos.component.html',
  styleUrls: ['./gestion-apoyos.component.css']
})
export class GestionApoyosComponent implements OnInit {

  /**
   * Controles
   */

  nombre: FormControl = new FormControl('', [Validators.required]);
  apellido: FormControl = new FormControl('', [Validators.required]);
  email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  rol: FormControl = new FormControl('', []);
  nombreApoyo: FormControl = new FormControl('', [Validators.required]);
  emailSecundario: FormControl = new FormControl('', [Validators.required, Validators.email]);

  /**
   * Catalogos
   */
  servicios: ServicioModel[];

  /**
   * Roles seleccionados
   */
  rolesSeleccionados: ServicioModel[] = [];

  /**
   * Modelo.
   */
  private apoyo: ApoyoModel;

  /**
   * Lista apoyos.
   */
  columnas: string[] = ['nombres', 'apellidos', 'activo', 'acciones'];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  apoyos: MatTableDataSource<ApoyoModel>;

  constructor(
    private catalogService: CatalogosService,
    private apoyoService: ApoyoService,
    private alertService: AlertService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.catalogService.getServicios()
      .subscribe(arg => this.servicios = arg);
    this.apoyoService.getAll().subscribe(data => {
      this.apoyos = new MatTableDataSource<ApoyoModel>(data);
      this.apoyos.paginator = this.paginator;
    });
  }

  agregarRol() {
    const rol = this.rol.value;
    if (rol && !this.rolesSeleccionados.includes(rol)) {
      this.rolesSeleccionados.push(rol);
    }
  }

  eliminarRol(rol: ServicioModel) {
    const index = this.rolesSeleccionados.indexOf(rol);
    console.log('Index to remove: ' + index);
    if (index >= 0) {
      this.rolesSeleccionados.splice(index, 1);
    }
  }

  abrirDialogo(idApoyo: number) {
    this.apoyoService.getById(idApoyo).subscribe(data => {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.hasBackdrop = true;
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = data;
      const dialogRef = this.dialog.open(DialogoEditarComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(response => {
        if (response === true) {
          // TODO: Paginate table.
        }
      });
    });
  }

  guardar(form: NgForm) {
    this.apoyo = new ApoyoModel();
    this.apoyo.nombres = this.nombre.value;
    this.apoyo.apellidos = this.apellido.value;
    this.apoyo.correo = this.email.value;
    this.apoyo.correoSecundario = this.emailSecundario.value;
    this.apoyo.servicios = this.rolesSeleccionados;
    console.log(this.apoyo.servicios);
    this.apoyoService.save(this.apoyo).subscribe(() => {
      this.alertService.showSuccesMessage('Éxito', 'Nuevo apoyo registrado exitosamente')
        .then(() => {
          this.apoyoService.getAll().subscribe(data => this.apoyos = new MatTableDataSource<ApoyoModel>(data));
          form.reset();
        });
    }, err => {
      this.alertService.showErrorMessage('Error', 'Error al registrar el nuevo apoyo');
    });
  }
}
