import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ConfirmarEmailService } from 'src/app/shared/servicios/egresados/confirmar-email.service';
import Swal from 'sweetalert2';
import { AlertService } from 'src/app/shared/servicios/common/alert.service';

@Component({
  selector: 'app-confirmar-registro',
  templateUrl: './confirmar-registro.component.html',
  styleUrls: ['./confirmar-registro.component.css']
})
export class ConfirmarRegistroComponent implements OnInit {
  auxPassword: string;
  password: string;
  private codigo: string;
  hideAuxPassword: boolean = true;
  hidePassword: boolean = true;

  msgError: any;

  constructor(
    private service: ConfirmarEmailService,
    private route: ActivatedRoute,
    private router: Router,
    private alert: AlertService
  ) { }

  confirmar() {
    if (this.password == this.auxPassword) {
      this.service.validar(this.codigo, this.password, this.auxPassword)
        .subscribe(res => {
          this.alert.showSuccesMessage(
            'Verificado',
            'Tu correo sea verificado correctamente'
          ).then(res => {
            // TODO: Redireccionar al login.
            this.router.navigateByUrl("/home");
          });
        }, err => {
          this.alert.showErrorMessage(
            'Error',
            'No ha sido posible verificar tu correo'
          );
        });
    } else {
      this.msgError = 'Las contraseñas deben coincidir';
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.codigo = params.codigo;
      this.service.cuentaYaActiva(this.codigo).subscribe(res => {
        if (res) {
          this.alert.showInfoMessage('Activo', 'El usuario ya se encuentra activo.')
            .then(() => {
              // TODO: Redireccionar al login.
              this.router.navigateByUrl("/home");
            });
        } else {
          // TODO: Mostrar mensaje de usuario no encontrado.
        }
      });
    });
  }

}
