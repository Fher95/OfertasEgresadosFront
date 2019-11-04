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
  MatRadioModule,
  MatTabsModule
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
  MatRadioModule,
  MatTabsModule
]

@NgModule({
  declarations: [],
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
