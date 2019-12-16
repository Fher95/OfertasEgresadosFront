import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizacionComponent } from './localizacion.component';

describe('LocalizacionComponent', () => {
  let component: LocalizacionComponent;
  let fixture: ComponentFixture<LocalizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
