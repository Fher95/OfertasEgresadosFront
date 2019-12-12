import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjustesAdministradorComponent } from './ajustes-administrador.component';

describe('AjustesAdministradorComponent', () => {
  let component: AjustesAdministradorComponent;
  let fixture: ComponentFixture<AjustesAdministradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjustesAdministradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjustesAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
