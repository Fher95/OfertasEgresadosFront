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
  MatTabsModule,
  MatMenuModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatGridListModule
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
  MatTabsModule,
  MatMenuModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,  
  MatGridListModule,
]

@NgModule({
  declarations: [],
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
