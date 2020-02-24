import { Component, OnInit, Input, Inject } from '@angular/core';
import { ExperienciaModel } from 'src/app/shared/modelos/experiencia.model';

@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html',
  styleUrls: ['./experiencia-laboral.component.css']
})
export class ExperienciaLaboralComponent implements OnInit {
  columnas : string[] = ['cargo','nombreEmpresa','sector', 'acciones'];

  @Input()
  public experiencia: ExperienciaModel;

  constructor() { }

  ngOnInit() {
  }

  agregarExperiencia(){

  }
  verExperiencia(){

  }


}
