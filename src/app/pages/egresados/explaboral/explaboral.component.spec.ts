import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplaboralComponent } from './explaboral.component';

describe('ExplaboralComponent', () => {
  let component: ExplaboralComponent;
  let fixture: ComponentFixture<ExplaboralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExplaboralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplaboralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
