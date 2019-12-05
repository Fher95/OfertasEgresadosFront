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
  MatChipsModule,
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
  MatTooltipModule,
  MatSnackBarModule
} from '@angular/material';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const MaterialComponents = [
  MatButtonModule,
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatButtonToggleModule,
  MatListModule,
  MatSelectModule,
  MatExpansionModule,
  MatIconModule,
  MatChipsModule,
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
  MatTooltipModule,
  MatSnackBarModule,
]

@NgModule({
  declarations: [],
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
