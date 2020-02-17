import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarRegistroComponent } from './confirmar-registro.component';

describe('ConfirmarRegistroComponent', () => {
  let component: ConfirmarRegistroComponent;
  let fixture: ComponentFixture<ConfirmarRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmarRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
