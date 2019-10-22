import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerificarRoutingModule } from './verificar-routing.module';
import { FrmVerificarComponent } from './frm-verificar/frm-verificar.component';
import { MatchListComponent } from './match-list/match-list.component';
import { NotMatchListComponent } from './not-match-list/not-match-list.component';
import { NotExistsListComponent } from './not-exists-list/not-exists-list.component';

@NgModule({
  declarations: [FrmVerificarComponent, MatchListComponent, NotMatchListComponent, NotExistsListComponent],
  imports: [
    CommonModule
  ], exports: [
    FrmVerificarComponent
  ]
})
export class VerificarModule { }
