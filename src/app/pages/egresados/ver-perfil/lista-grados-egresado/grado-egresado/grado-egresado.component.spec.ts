import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradoEgresadoComponent } from './grado-egresado.component';

describe('GradoEgresadoComponent', () => {
  let component: GradoEgresadoComponent;
  let fixture: ComponentFixture<GradoEgresadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradoEgresadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradoEgresadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
