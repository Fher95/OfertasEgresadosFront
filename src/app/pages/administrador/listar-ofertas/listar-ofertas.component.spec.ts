import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarOfertasComponent } from './listar-ofertas.component';

describe('ListarOfertasComponent', () => {
  let component: ListarOfertasComponent;
  let fixture: ComponentFixture<ListarOfertasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarOfertasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarOfertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
