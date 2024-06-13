import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerHistorialCentrosComponent } from './ver-historial-centros.component';

describe('VerHistorialCentrosComponent', () => {
  let component: VerHistorialCentrosComponent;
  let fixture: ComponentFixture<VerHistorialCentrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerHistorialCentrosComponent]
    });
    fixture = TestBed.createComponent(VerHistorialCentrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
