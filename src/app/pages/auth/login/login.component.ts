import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/shared/servicios/auth/auth.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/servicios/common/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /* form: FormGroup; */

  email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  password: FormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);

  constructor(
    private auth: AuthService,
    private router: Router,
    private alert: AlertService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    //TODO: Realizar login.
    this.auth.login(this.email.value, this.password.value).subscribe(response => {
      // Redireccionar a home.
      this.router.navigateByUrl('/home');
    }, error => {
      // Mostrar mensaje de error
      this.alert.showErrorMessage('Error', 'Por favor verifique su email y password.')
    });
  }

  resetForm() {
    this.email.setValue('');
    this.password.setValue('');
  }

}
