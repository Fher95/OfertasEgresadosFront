import { NgModule } from "@angular/core";
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/shared/servicios/auth/auth.service';
import { MaterialModule } from 'src/app/layout/material/material.module';
import { CommonModule } from '@angular/common';
import { AlertService } from 'src/app/shared/servicios/common/alert.service';

@NgModule({
    declarations:[LoginComponent, LogoutComponent],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        CommonModule
    ],
    providers: [AuthService, AlertService]
})
export class AuthModule{ }