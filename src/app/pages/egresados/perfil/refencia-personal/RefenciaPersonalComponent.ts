import { Component, OnInit, Input } from '@angular/core';
import { ReferenciaPersonalModel } from 'src/app/shared/modelos/referencia-personal.model';
import { MatDialog, MatDialogConfig } from '@angular/material';
@Component({
  selector: 'app-refencia-personal',
  templateUrl: './refencia-personal.component.html',
  styleUrls: ['./refencia-personal.component.css']
})
export class RefenciaPersonalComponent implements OnInit {
  columnas: string[] = ['nombres', 'parentesco', 'celular', 'acciones'];
  
  @Input()
  public referidos: ReferenciaPersonalModel[];
    
  constructor(private dialog: MatDialog) { }
  
  ngOnInit() { }
  
  verReferido(referido: ReferenciaPersonalModel){

  }
  eliminarReferido(referido: ReferenciaPersonalModel){
    
  }
  abrirDialogo(referido: ReferenciaPersonalModel) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = true;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = referido;
    dialogConfig.maxHeight = '600px';
    /*const dialogRef = this.dialog.open(,dialogConfig);
    dialogRef.afterClosed().subscribe(response => {
      console.log(response);
    });*/
  }
}
