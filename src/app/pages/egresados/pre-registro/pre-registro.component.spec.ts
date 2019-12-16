import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreRegistroComponent } from './pre-registro.component';


describe('PreRegistroComponent', () => {
  let component: PreRegistroComponent;
  let fixture: ComponentFixture<PreRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
