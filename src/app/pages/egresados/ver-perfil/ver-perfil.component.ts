import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EgresadoModel } from 'src/app/shared/modelos/egresado.model';
import { AuthService } from 'src/app/shared/servicios/auth/auth.service';
import { Observable } from 'rxjs';
import { PerfilService } from 'src/app/shared/servicios/egresados/perfil.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-ver-perfil',
  templateUrl: './ver-perfil.component.html',
  styleUrls: ['./ver-perfil.component.css']
})
export class VerPerfilComponent implements OnInit, AfterViewInit  {
  egresado : EgresadoModel;
  private egresadoObservable$: Observable<EgresadoModel>;
  isLoading = true;

  constructor(private auth: AuthService, private perfilService: PerfilService) {}

  ngOnInit() {
    var correo=this.auth.userEmail;
    console.log('correo '+correo);
    this.egresadoObservable$ = this.perfilService.perfilEgresado(correo).pipe(
      map(response => { return response.data;} ));
  }
  ngAfterViewInit() {}

}
