import { Component, OnInit, Input } from '@angular/core';
import { ReferenciaPersonalModel } from 'src/app/shared/modelos/referencia-personal.model';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertService } from 'src/app/shared/servicios/common/alert.service';
import { ReferidoPerfilComponent } from '../referido-perfil/referido-perfil.component';
import { NuevaReferenciaComponent } from '../nueva-referencia/nueva-referencia.component';
import { Referido } from 'src/app/shared/modelos/referido';
@Component({
  selector: 'app-refencia-personal',
  templateUrl: './refencia-personal.component.html',
  styleUrls: ['./refencia-personal.component.css']
})
export class RefenciaPersonalComponent implements OnInit {
  columnas: string[] = ['nombres', 'parentesco', 'celular', 'acciones'];
  
  @Input()
  public referidos: Referido[];

  varReferido : Referido;
    
  constructor(private dialog: MatDialog,private alert: AlertService) { }
  
  ngOnInit() { }
  
  agregarReferido(){
    console.log('entro agregar');
    /*const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = true;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.varReferido;
    dialogConfig.maxHeight = '1000px';
    const dialogRef = this.dialog.open(NuevaReferenciaComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(
      resultado => {  
        console.log('resul '+resultado);
        console.log('No creo que funcione '+this.varReferido.nombre);
      }
    );*/
  
/*        var bandera:boolean=true;
        if(!this.referidos) {
          this.referidos = [];
        }
        this.referidos.forEach(element => {
          if(element.correo==resultado.correo){
            bandera=false;
          }
        });
        if(bandera){
          this.referidos.push(resultado);
          if(this.referidos.length!=0){
            this.alert.showSuccesMessage('','Referencia agregada exitosamente.');
          }
        }
        else{
          this.alert.showErrorMessage('','La referencia personal ya existe.');
        }*/
  }

  eliminarReferido(referido: Referido){
    console.log('Referido a eliminar: ' + referido);
    if(this.referidos.length>2){
      const index = this.referidos.indexOf(referido);
      if(index >= 0) {
        this.referidos.splice(index, 1);
        console.log('Referido eliminado');
      }
    }
    else{
      this.alert.showErrorMessage('Error','No se puede eliminar, debe tener mínimo dos referencias.');
    }
  }

  verReferido(referido: Referido) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = true;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = referido;
    dialogConfig.maxHeight = '1000px';
    const dialogRef = this.dialog.open(ReferidoPerfilComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(response => {
      console.log(response);
    });
  }
}
