import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSolicitudesEmpresaComponent } from './listar-solicitudes-empresa.component';

describe('ListarSolicitudesEmpresaComponent', () => {
  let component: ListarSolicitudesEmpresaComponent;
  let fixture: ComponentFixture<ListarSolicitudesEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarSolicitudesEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarSolicitudesEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
