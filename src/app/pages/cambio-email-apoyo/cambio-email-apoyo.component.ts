import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApoyoService } from 'src/app/shared/servicios/egresados/apoyo.service';
import { AlertService } from 'src/app/shared/servicios/common/alert.service';

@Component({
  selector: 'app-cambio-email-apoyo',
  templateUrl: './cambio-email-apoyo.component.html',
  styleUrls: ['./cambio-email-apoyo.component.css']
})
export class CambioEmailApoyoComponent implements OnInit {
  private codigo: string;
  constructor(
    private route: ActivatedRoute,
    private service: ApoyoService,
    private alert: AlertService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log('Se accede a params correctamente');
      const codigo = params.codigo;
      this.service.activarEmail(codigo).subscribe(
        res => {
          this.alert.showSuccesMessage('Éxito', res.data.mensaje).then(res => {
            console.log('Cambio de correo éxitoso');
            this.router.navigateByUrl('/login');
            return;
          });
        },
        err => {
          console.log(err);
          this.alert.showErrorMessage('Error', err.error.mensaje).then(res => {
            console.log('Error al cambiar el correo');
            this.router.navigateByUrl('/home');
            return;
          });
        }
      );
    });
  }
}
