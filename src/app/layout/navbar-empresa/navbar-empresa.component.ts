import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-empresa',
  templateUrl: './navbar-empresa.component.html',
  styleUrls: ['./navbar-empresa.component.css']
})
export class NavbarEmpresaComponent implements OnInit {

  @Input() id:string;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  onIncio(){
    this.router.navigate(['/']);
  }
  onMisOfertas(){
    let ruta = 'empresa/' + this.id + '/ofertasActivas';
    this.router.navigate([ruta]);
  }
  onPublicarOferta(){
    let ruta = 'empresa/' + this.id + '/historialOfertas';
    this.router.navigate(['']);
  }
  onMiHistorialOfertas(){
    let ruta = 'empresa/' + this.id + '/historialOfertas';
    this.router.navigate([ruta]);
  }

}
