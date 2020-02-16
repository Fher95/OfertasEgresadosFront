import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEstadoOfertaComponent } from './dialog-estado-oferta.component';

describe('DialogEstadoOfertaComponent', () => {
  let component: DialogEstadoOfertaComponent;
  let fixture: ComponentFixture<DialogEstadoOfertaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEstadoOfertaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEstadoOfertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
