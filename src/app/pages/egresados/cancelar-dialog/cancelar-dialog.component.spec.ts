import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelarDialogComponent } from './cancelar-dialog.component';

describe('CancelarDialogComponent', () => {
  let component: CancelarDialogComponent;
  let fixture: ComponentFixture<CancelarDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelarDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
