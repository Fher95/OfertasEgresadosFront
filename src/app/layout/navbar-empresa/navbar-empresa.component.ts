import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/servicios/auth/auth.service';

@Component({
  selector: 'app-navbar-empresa',
  templateUrl: './navbar-empresa.component.html',
  styleUrls: ['./navbar-empresa.component.css']
})
export class NavbarEmpresaComponent implements OnInit {

  @Input() id:string;
  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  onIncio(){
    this.router.navigate(['/home']);
  }
  onPublicarOferta(){
    let ruta = 'empresa/' + this.id + '/crearOfertaLaboral';
    this.router.navigate([ruta]);
  }
  onMisOfertas(){
    let ruta = 'empresa/' + this.id + '/misOfertas';
    this.router.navigate([ruta]);
  }
  onPerfil(){
    let ruta = 'empresa/' + this.id + '/datosEmpresa';
    this.router.navigate([ruta]);
  }
  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/home');
  }

}
