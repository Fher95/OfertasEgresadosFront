import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterEgresadosComponent } from './footer-egresados.component';

describe('FooterEgresadosComponent', () => {
  let component: FooterEgresadosComponent;
  let fixture: ComponentFixture<FooterEgresadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterEgresadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterEgresadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
