import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/shared/servicios/common/alert.service';
import { AuthService } from 'src/app/shared/servicios/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-ofertas',
  templateUrl: './home-ofertas.component.html',
  styleUrls: ['./home-ofertas.component.css']
})
export class HomeOfertasComponent implements OnInit {

  constructor(private alert: AlertService, private auth: AuthService,
    private router: Router) { }

  ngOnInit() {    
  }  
}

