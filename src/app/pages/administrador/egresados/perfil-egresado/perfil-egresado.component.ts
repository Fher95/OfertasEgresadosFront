import { ListaGradosComponent } from './lista-grados/lista-grados.component';
import { InformarcionPersonalComponent } from './informarcion-personal/informarcion-personal.component';
import { EgresadoModel } from './../../../../shared/modelos/egresado.model';
import { map, finalize } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { EgresadoSharedService } from './egresado.shared.service';
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChildren,
  QueryList,
  AfterContentInit
} from '@angular/core';
import { EgresadoService } from 'src/app/shared/servicios/admin/egresado.service';
import { Subscription, Observable } from 'rxjs';
import { GradoModel } from 'src/app/shared/modelos/grado.model';
import { GradoService } from 'src/app/shared/servicios/egresados/grado.service';

@Component({
  selector: 'app-perfil-egresado',
  templateUrl: './perfil-egresado.component.html',
  styleUrls: ['./perfil-egresado.component.css']
})
export class PerfilEgresadoComponent implements OnInit, AfterViewInit {
  egresado: EgresadoModel;
  private egresadoObservable$: Observable<EgresadoModel>;

  isLoading = true;

  constructor(
    private egresadosService: EgresadoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.egresadoObservable$ = this.egresadosService.getById(id).pipe(
        map(response => {
          console.log(response);
          return response.data;
        })
      );
    });
  }

  ngAfterViewInit() {}
}
