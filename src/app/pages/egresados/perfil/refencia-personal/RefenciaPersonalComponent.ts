import { Component, OnInit, Input } from '@angular/core';
import { ReferenciaPersonalModel } from 'src/app/shared/modelos/referencia-personal.model';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Referido } from 'src/app/shared/modelos/referido';
import { AlertService } from 'src/app/shared/servicios/common/alert.service';
import { ReferidoPerfilComponent } from '../referido-perfil/referido-perfil.component';
@Component({
  selector: 'app-refencia-personal',
  templateUrl: './refencia-personal.component.html',
  styleUrls: ['./refencia-personal.component.css']
})
export class RefenciaPersonalComponent implements OnInit {
  columnas: string[] = ['nombres', 'parentesco', 'celular', 'acciones'];
  
  @Input()
  public referidos: ReferenciaPersonalModel[];

  varReferido : Referido;
    
  constructor(private dialog: MatDialog,private alert: AlertService) { }
  
  ngOnInit() { }
  
  agregarReferido(){
    /*console.log('entro agregar');
    this.dialog.open.afterClosed().subscribe(
      resultado => {  this.varReferido = resultado;
      }
    );
    console.log('Referido: '+this.varReferido.nombres);
    console.log('referido a agregar'+resultado.nombres);
        var bandera:boolean=true;
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

  eliminarReferido(referido: ReferenciaPersonalModel){
    /*console.log('Referido a eliminar: ' + referido);
    const index = this.referidos.indexOf(referido);
    if(index >= 0) {
      this.referidos.splice(index, 1);
      this.dataReferidos = new MatTableDataSource<any>(this.referidos);
      console.log('Referido eliminado');
    }*/
  }

  verReferido(referido: ReferenciaPersonalModel) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = true;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = referido;
    dialogConfig.maxHeight = '600px';
    const dialogRef = this.dialog.open(ReferidoPerfilComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(response => {
      console.log(response);
    });
  }
}
