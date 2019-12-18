import { EgresadoModel } from './../../../../shared/modelos/egresado.model';
import { Subject, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class EgresadoSharedService {
  private egresadoSource = new BehaviorSubject<EgresadoModel>(null);
  currentEgresado = this.egresadoSource.asObservable();

  constructor() {}

  setEgresado(egresado: EgresadoModel) {
    this.egresadoSource.next(egresado);
  }
}
