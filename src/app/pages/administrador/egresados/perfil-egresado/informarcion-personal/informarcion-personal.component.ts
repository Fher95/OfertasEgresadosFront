import { EgresadoModel } from './../../../../../shared/modelos/egresado.model';
import { Subscription } from 'rxjs';
import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  Input
} from '@angular/core';
import { EgresadoSharedService } from '../egresado.shared.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-informacion-personal',
  templateUrl: './informarcion-personal.component.html',
  styleUrls: ['./informarcion-personal.component.css']
})
export class InformarcionPersonalComponent implements OnInit {
  nombreCompleto = 'Nombre completo';
  isLoadingResults = false;
  @Input()
  public egresado: EgresadoModel;
  constructor(private sharedService: EgresadoSharedService) {}

  ngOnInit() {}
}
