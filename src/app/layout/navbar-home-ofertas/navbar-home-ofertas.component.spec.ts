import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarHomeOfertasComponent } from './navbar-home-ofertas.component';

describe('NavbarHomeOfertasComponent', () => {
  let component: NavbarHomeOfertasComponent;
  let fixture: ComponentFixture<NavbarHomeOfertasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarHomeOfertasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarHomeOfertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
