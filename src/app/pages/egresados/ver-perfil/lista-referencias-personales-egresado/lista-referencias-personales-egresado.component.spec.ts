import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaReferenciasPersonalesEgresadoComponent } from './lista-referencias-personales-egresado.component';

describe('ListaReferenciasPersonalesEgresadoComponent', () => {
  let component: ListaReferenciasPersonalesEgresadoComponent;
  let fixture: ComponentFixture<ListaReferenciasPersonalesEgresadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaReferenciasPersonalesEgresadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaReferenciasPersonalesEgresadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
