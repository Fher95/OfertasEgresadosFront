import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavEgresadosComponent } from './nav-egresados.component';

describe('NavEgresadosComponent', () => {
  let component: NavEgresadosComponent;
  let fixture: ComponentFixture<NavEgresadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavEgresadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavEgresadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
