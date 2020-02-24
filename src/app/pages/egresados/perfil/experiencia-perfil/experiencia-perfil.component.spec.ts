import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienciaPerfilComponent } from './experiencia-perfil.component';

describe('ExperienciaPerfilComponent', () => {
  let component: ExperienciaPerfilComponent;
  let fixture: ComponentFixture<ExperienciaPerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperienciaPerfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienciaPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
