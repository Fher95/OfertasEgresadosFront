import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSolicitudEmpresaComponent } from './info-solicitud-empresa.component';

describe('InfoSolicitudEmpresaComponent', () => {
  let component: InfoSolicitudEmpresaComponent;
  let fixture: ComponentFixture<InfoSolicitudEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoSolicitudEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoSolicitudEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
