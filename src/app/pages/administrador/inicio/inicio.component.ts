import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  showSideBar: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  toogleSidebar() {
    this.showSideBar = !this.showSideBar;
  }

}
