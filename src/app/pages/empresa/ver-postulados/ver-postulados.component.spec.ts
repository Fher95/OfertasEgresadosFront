import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPostuladosComponent } from './ver-postulados.component';

describe('VerPostuladosComponent', () => {
  let component: VerPostuladosComponent;
  let fixture: ComponentFixture<VerPostuladosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerPostuladosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerPostuladosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
