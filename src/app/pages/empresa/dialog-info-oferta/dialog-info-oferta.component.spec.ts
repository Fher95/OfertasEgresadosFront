import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInfoOfertaComponent } from './dialog-info-oferta.component';

describe('DialogInfoOfertaComponent', () => {
  let component: DialogInfoOfertaComponent;
  let fixture: ComponentFixture<DialogInfoOfertaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogInfoOfertaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogInfoOfertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
