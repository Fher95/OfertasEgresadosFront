import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenciaEgresadoComponent } from './referencia-egresado.component';

describe('ReferenciaEgresadoComponent', () => {
  let component: ReferenciaEgresadoComponent;
  let fixture: ComponentFixture<ReferenciaEgresadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferenciaEgresadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenciaEgresadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
