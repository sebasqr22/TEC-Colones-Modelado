import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionTecColonesComponent } from './asignacion-tec-colones.component';

describe('AsignacionTecColonesComponent', () => {
  let component: AsignacionTecColonesComponent;
  let fixture: ComponentFixture<AsignacionTecColonesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsignacionTecColonesComponent]
    });
    fixture = TestBed.createComponent(AsignacionTecColonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
