import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialOfertasComponent } from './historial-ofertas.component';

describe('HistorialOfertasComponent', () => {
  let component: HistorialOfertasComponent;
  let fixture: ComponentFixture<HistorialOfertasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialOfertasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialOfertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
