import { EventoModel } from 'src/app/shared/modelos/evento.model';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventosSharedService {
  seleccionEvento = new Subject<EventoModel>();

  constructor() {}
}
