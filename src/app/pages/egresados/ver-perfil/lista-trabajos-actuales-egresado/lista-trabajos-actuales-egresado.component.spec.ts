import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTrabajosActualesEgresadoComponent } from './lista-trabajos-actuales-egresado.component';

describe('ListaTrabajosActualesEgresadoComponent', () => {
  let component: ListaTrabajosActualesEgresadoComponent;
  let fixture: ComponentFixture<ListaTrabajosActualesEgresadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaTrabajosActualesEgresadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTrabajosActualesEgresadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
