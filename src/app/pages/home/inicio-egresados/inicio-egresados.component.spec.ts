import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioEgresadosComponent } from './inicio-egresados.component';

describe('InicioEgresadosComponent', () => {
  let component: InicioEgresadosComponent;
  let fixture: ComponentFixture<InicioEgresadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioEgresadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioEgresadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
