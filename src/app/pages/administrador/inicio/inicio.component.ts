import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/servicios/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  showSideBar: boolean = true;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  toogleSidebar() {
    this.showSideBar = !this.showSideBar;
  }
  
  onLogout() {
    this.auth.logout();
    this.router.navigateByUrl('/home');
  }
}
