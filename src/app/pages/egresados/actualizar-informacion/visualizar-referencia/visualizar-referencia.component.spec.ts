import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarReferenciaComponent } from './visualizar-referencia.component';

describe('VisualizarReferenciaComponent', () => {
  let component: VisualizarReferenciaComponent;
  let fixture: ComponentFixture<VisualizarReferenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarReferenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarReferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
