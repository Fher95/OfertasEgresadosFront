import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFinalModificarComponent } from './dialog-final-modificar.component';

describe('DialogFinalModificarComponent', () => {
  let component: DialogFinalModificarComponent;
  let fixture: ComponentFixture<DialogFinalModificarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogFinalModificarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFinalModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
