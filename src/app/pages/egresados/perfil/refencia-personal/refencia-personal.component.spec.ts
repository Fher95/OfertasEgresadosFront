import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefenciaPersonalComponent } from './refencia-personal.component';

describe('RefenciaPersonalComponent', () => {
  let component: RefenciaPersonalComponent;
  let fixture: ComponentFixture<RefenciaPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefenciaPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefenciaPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
