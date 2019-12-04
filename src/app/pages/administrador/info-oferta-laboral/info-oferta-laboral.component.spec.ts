import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoOfertaLaboralComponent } from './info-oferta-laboral.component';

describe('InfoOfertaLaboralComponent', () => {
  let component: InfoOfertaLaboralComponent;
  let fixture: ComponentFixture<InfoOfertaLaboralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoOfertaLaboralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoOfertaLaboralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
