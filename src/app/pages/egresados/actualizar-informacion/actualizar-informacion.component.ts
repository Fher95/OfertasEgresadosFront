import { Component, OnInit } from '@angular/core';
import { CatalogosService } from 'src/app/shared/servicios/common/catalogos.service';
import { DiscapacidadInterface } from 'src/app/shared/modelos/discapacidadInterface';

@Component({
  selector: 'app-actualizar-informacion',
  templateUrl: './actualizar-informacion.component.html',
  styleUrls: ['./actualizar-informacion.component.css']
})
export class ActualizarInformacionComponent implements OnInit {

  discapacidades:DiscapacidadInterface[];
  pruebas: string[] = ['a','b','c','d'];


  constructor(private catalogoService:CatalogosService) { }

  ngOnInit() {
    this.obtenerDiscapacidades();
  }

  obtenerDiscapacidades(){
    this.catalogoService.getDiscapacidad();
  }

}
