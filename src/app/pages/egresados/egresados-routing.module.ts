import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { PreRegistroComponent } from './pre-registro/pre-registro.component';

const routes: Routes = [
    { path: 'pre-registro', component: PreRegistroComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class EgresadosRoutingModule { }