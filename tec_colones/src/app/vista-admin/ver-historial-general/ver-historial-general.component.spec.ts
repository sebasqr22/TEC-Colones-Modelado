import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerHistorialGeneralComponent } from './ver-historial-general.component';

describe('VerHistorialGeneralComponent', () => {
  let component: VerHistorialGeneralComponent;
  let fixture: ComponentFixture<VerHistorialGeneralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerHistorialGeneralComponent]
    });
    fixture = TestBed.createComponent(VerHistorialGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
