import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabajoActualEgresadoComponent } from './trabajo-actual-egresado.component';

describe('TrabajoActualEgresadoComponent', () => {
  let component: TrabajoActualEgresadoComponent;
  let fixture: ComponentFixture<TrabajoActualEgresadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrabajoActualEgresadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabajoActualEgresadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
