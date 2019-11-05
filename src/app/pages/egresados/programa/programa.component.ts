import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-programa',
  templateUrl: './programa.component.html',
  styleUrls: ['./programa.component.css']
})
export class ProgramaComponent implements OnInit {

  facultad = new FormControl('', [Validators.required]);

  programa = new FormControl('', [Validators.required]);

  constructor() { }

  ngOnInit() {
  }

}
