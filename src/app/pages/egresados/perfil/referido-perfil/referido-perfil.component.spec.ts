import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferidoPerfilComponent } from './referido-perfil.component';

describe('ReferidoPerfilComponent', () => {
  let component: ReferidoPerfilComponent;
  let fixture: ComponentFixture<ReferidoPerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferidoPerfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferidoPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
