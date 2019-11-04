import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertasActivasComponent } from './ofertas-activas.component';

describe('OfertasActivasComponent', () => {
  let component: OfertasActivasComponent;
  let fixture: ComponentFixture<OfertasActivasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfertasActivasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertasActivasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
