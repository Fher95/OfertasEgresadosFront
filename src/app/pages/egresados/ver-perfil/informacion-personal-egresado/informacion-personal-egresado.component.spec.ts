import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionPersonalEgresadoComponent } from './informacion-personal-egresado.component';

describe('InformacionPersonalEgresadoComponent', () => {
  let component: InformacionPersonalEgresadoComponent;
  let fixture: ComponentFixture<InformacionPersonalEgresadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacionPersonalEgresadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionPersonalEgresadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
