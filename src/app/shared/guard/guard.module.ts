import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../servicios/auth/auth.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [AuthService]
})
export class GuardModule { }
