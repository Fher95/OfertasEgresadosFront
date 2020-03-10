import { Component, OnInit, Input } from '@angular/core';
import { EgresadoModel } from 'src/app/shared/modelos/egresado.model';
import { EgresadoSharedService } from 'src/app/pages/administrador/egresados/perfil-egresado/egresado.shared.service';
import { DiscapacidadInterface } from 'src/app/shared/modelos/discapacidadInterface';

@Component({
  selector: 'app-informacion-personal-egresado',
  templateUrl: './informacion-personal-egresado.component.html',
  styleUrls: ['./informacion-personal-egresado.component.css']
})
export class InformacionPersonalEgresadoComponent implements OnInit {
  nombreCompleto = '';
  discapacidades = '';
  isLoadingResults = false;
  @Input()
  public egresado: EgresadoModel;
  constructor(private sharedService: EgresadoSharedService) {}

  ngOnInit() {

  }
}
