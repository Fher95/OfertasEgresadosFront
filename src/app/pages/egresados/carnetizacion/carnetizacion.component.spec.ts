import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarnetizacionComponent } from './carnetizacion.component';

describe('CarnetizacionComponent', () => {
  let component: CarnetizacionComponent;
  let fixture: ComponentFixture<CarnetizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarnetizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarnetizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
