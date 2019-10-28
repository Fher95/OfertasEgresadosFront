import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatButtonToggleModule,
  MatListModule,
  MatSelectModule,
  MatExpansionModule,
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatToolbarModule,
  MatDialogModule,

} from '@angular/material';

const MaterialComponents = [
  MatButtonModule,
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatButtonToggleModule,
  MatListModule,
  MatSelectModule,
  MatExpansionModule,
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatToolbarModule,
  MatDialogModule,
]

@NgModule({
  declarations: [],
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
