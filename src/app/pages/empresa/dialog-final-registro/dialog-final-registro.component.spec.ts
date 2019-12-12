import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFinalRegistroComponent } from './dialog-final-registro.component';

describe('DialogFinalRegistroComponent', () => {
  let component: DialogFinalRegistroComponent;
  let fixture: ComponentFixture<DialogFinalRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogFinalRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFinalRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
