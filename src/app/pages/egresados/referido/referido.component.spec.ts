import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferidoComponent } from './referido.component';

describe('ReferidoComponent', () => {
  let component: ReferidoComponent;
  let fixture: ComponentFixture<ReferidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
