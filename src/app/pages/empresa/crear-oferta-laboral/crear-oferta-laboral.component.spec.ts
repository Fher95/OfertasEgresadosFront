import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearOfertaLaboralComponent } from './crear-oferta-laboral.component';

describe('CrearOfertaLaboralComponent', () => {
  let component: CrearOfertaLaboralComponent;
  let fixture: ComponentFixture<CrearOfertaLaboralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearOfertaLaboralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearOfertaLaboralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
