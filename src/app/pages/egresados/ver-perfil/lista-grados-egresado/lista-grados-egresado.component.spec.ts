import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaGradosEgresadoComponent } from './lista-grados-egresado.component';

describe('ListaGradosEgresadoComponent', () => {
  let component: ListaGradosEgresadoComponent;
  let fixture: ComponentFixture<ListaGradosEgresadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaGradosEgresadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaGradosEgresadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
