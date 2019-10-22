import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrmVerificarComponent } from './frm-verificar/frm-verificar.component';
import { MatchListComponent } from './match-list/match-list.component';
import { NotExistsListComponent } from './not-exists-list/not-exists-list.component';

const routes: Routes = [
  {
    path: 'egresados-admin',
    children: [
      {
        path: 'verificar',
        component: FrmVerificarComponent,
        children: [
          {
            path: 'match-list',
            component: MatchListComponent
          }, {
            path: 'not-exist',
            component: NotExistsListComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerificarRoutingModule { }
