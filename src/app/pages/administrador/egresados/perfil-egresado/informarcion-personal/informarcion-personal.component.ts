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
import { DiscapacidadInterface } from 'src/app/shared/modelos/discapacidadInterface';

@Component({
  selector: 'app-informacion-personal',
  templateUrl: './informarcion-personal.component.html',
  styleUrls: ['./informarcion-personal.component.css']
})
export class InformarcionPersonalComponent implements OnInit {
  nombreCompleto = '';
  discapacidades = '';
  isLoadingResults = false;
  @Input()
  public egresado: EgresadoModel;
  constructor(private sharedService: EgresadoSharedService) {}

  ngOnInit() {

  }

  getDiscapacidades(discapacidades: DiscapacidadInterface[]): string {
    let retstr = discapacidades.map(d => d.Nombre).join(', ');
    console.log('Discapacidades: ', retstr);
    return retstr;
  }
}
