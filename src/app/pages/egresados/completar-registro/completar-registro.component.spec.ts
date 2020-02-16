import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletarRegistroComponent } from './completar-registro.component';

describe('CompletarRegistroComponent', () => {
  let component: CompletarRegistroComponent;
  let fixture: ComponentFixture<CompletarRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletarRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletarRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
