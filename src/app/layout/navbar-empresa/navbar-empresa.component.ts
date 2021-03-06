import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/servicios/auth/auth.service';
import { EmpresaService } from 'src/app/shared/servicios/empresa/empresa.service';
import { MatSnackBar, MatDialog, MatDialogRef } from '@angular/material';
import { AlertService } from 'src/app/shared/servicios/common/alert.service';

@Component({
  selector: 'app-navbar-empresa',
  templateUrl: './navbar-empresa.component.html',
  styleUrls: ['./navbar-empresa.component.css']
})
export class NavbarEmpresaComponent implements OnInit {

  @Input() id:string;
  constructor(
    private router: Router,
    public dialog: MatDialog,
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

  openDialog() {
    const dial = this.dialog.open(DialogContactoComponent, {
      width: '40vw'
    });
    this.dialogAbierto(dial);
  }

  dialogAbierto(dial: MatDialogRef<DialogContactoComponent, any>) {
    dial.afterClosed().subscribe((result) => {

    });
  }

}


@Component({
  selector: 'app-dialog-postulado',
  templateUrl: 'dialog-contacto.html',
})
export class DialogContactoComponent {  

  constructor(
    private empresaService: EmpresaService,
    private _snackBar: MatSnackBar,
    private alert: AlertService) { }

  ngOnInit() {
    
  }
}