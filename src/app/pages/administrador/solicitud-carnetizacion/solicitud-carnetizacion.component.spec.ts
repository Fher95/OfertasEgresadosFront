import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudCarnetizacionComponent } from './solicitud-carnetizacion.component';

describe('SolicitudCarnetizacionComponent', () => {
  let component: SolicitudCarnetizacionComponent;
  let fixture: ComponentFixture<SolicitudCarnetizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudCarnetizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudCarnetizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
