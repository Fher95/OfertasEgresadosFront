import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeOfertasComponent } from './home-ofertas.component';

describe('HomeOfertasComponent', () => {
  let component: HomeOfertasComponent;
  let fixture: ComponentFixture<HomeOfertasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeOfertasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeOfertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
