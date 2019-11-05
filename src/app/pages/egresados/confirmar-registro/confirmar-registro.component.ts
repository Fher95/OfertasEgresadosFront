import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmar-registro',
  templateUrl: './confirmar-registro.component.html',
  styleUrls: ['./confirmar-registro.component.css']
})
export class ConfirmarRegistroComponent implements OnInit {
  private auxPassword: String;
  private Password: String;

  private msgError: String;

  constructor() { }

  confirmar(){
    if(this.Password==this.auxPassword){

    }else{
      this.msgError='Las contraseñas no coinciden';
    }
  }

  ngOnInit() {
  }

}
