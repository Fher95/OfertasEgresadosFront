import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertasPublicadasComponent } from './ofertas-publicadas.component';

describe('OfertasPublicadasComponent', () => {
  let component: OfertasPublicadasComponent;
  let fixture: ComponentFixture<OfertasPublicadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfertasPublicadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertasPublicadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
