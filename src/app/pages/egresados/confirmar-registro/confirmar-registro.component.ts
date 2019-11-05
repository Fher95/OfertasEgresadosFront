import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmarEmailService } from 'src/app/shared/servicios/egresados/confirmar-email.service';

@Component({
  selector: 'app-confirmar-registro',
  templateUrl: './confirmar-registro.component.html',
  styleUrls: ['./confirmar-registro.component.css']
})
export class ConfirmarRegistroComponent implements OnInit {
  private auxPassword: string;
  private Password: string;
  private codigo: string;

  private msgError: String;

  constructor() { }

  confirmar(){
    if(this.Password==this.auxPassword){
      /*this.service.validar(this.codigo, this.Password, this.auxPassword).subscribe(data => {

      });*/
    }else{
      this.msgError='Las contraseñas no coinciden';
    }
  }

  ngOnInit() {
    /*this.route.paramMap.subscribe(params => {
      this.codigo = params.get('codigo');
    });*/
  }

}
