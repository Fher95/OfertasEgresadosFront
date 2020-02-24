import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaReferenciaComponent } from './nueva-referencia.component';

describe('NuevaReferenciaComponent', () => {
  let component: NuevaReferenciaComponent;
  let fixture: ComponentFixture<NuevaReferenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaReferenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaReferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
