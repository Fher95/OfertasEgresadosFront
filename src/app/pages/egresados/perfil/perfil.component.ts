import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EgresadoModel } from 'src/app/shared/modelos/egresado.model';
import { Observable } from 'rxjs';
import { EgresadoService } from 'src/app/shared/servicios/admin/egresado.service';
import { map } from 'rxjs/operators';
import { PerfilService } from 'src/app/shared/servicios/egresados/perfil.service';
import { AuthService } from 'src/app/shared/servicios/auth/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  egresado: EgresadoModel = new EgresadoModel;
  private egresadoObservable$: Observable<EgresadoModel>;

  constructor(private auth: AuthService, private perfilService: PerfilService) {}

  ngOnInit() {
    var correo=this.auth.userEmail;
    console.log('correo '+correo);
    this.egresadoObservable$ = this.perfilService.perfilEgresado(correo).pipe(
      map(response => { return response.data;} ));
  }
}