import { Component, OnInit } from '@angular/core';
import { CatalogosService } from 'src/app/shared/servicios/common/catalogos.service';
import { DiscapacidadInterface } from 'src/app/shared/modelos/discapacidadInterface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-informacion',
  templateUrl: './actualizar-informacion.component.html',
  styleUrls: ['./actualizar-informacion.component.css']
})
export class ActualizarInformacionComponent implements OnInit {

  discapacidades:DiscapacidadInterface[];

  estadosCiviles: string[] = ['Soltero(a)', 'Casado(a)', 'Viudo(a)', 'Union Libre', 'Separado(a)', 'Comprometido(a)', 'Divorciado(a)'];
  
  pruebas: string[] = ['a','b','c','d','Otra(s)'];
  value: string='Holi';


  constructor(private router:Router,private catalogoService:CatalogosService) {
    
   }

  ngOnInit() {
    this.obtenerDiscapacidades();
  }

  obtenerDiscapacidades(){
    this.catalogoService.getDiscapacidad();
  }
  irPerfil(){
    this.router.navigate(['egresados/perfil']);
  }

}
