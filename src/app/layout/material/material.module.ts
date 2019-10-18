import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatButtonToggleModule,
  MatListModule,
  MatTableModule,
  MatPaginatorModule,

} from '@angular/material';

const MaterialComponents = [
  MatButtonModule,
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatButtonToggleModule,
  MatListModule,
  MatTableModule,
  MatPaginatorModule
]

@NgModule({
  declarations: [],
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
