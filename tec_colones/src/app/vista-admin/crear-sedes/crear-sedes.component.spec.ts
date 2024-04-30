import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearSedesComponent } from './crear-sedes.component';

describe('CrearSedesComponent', () => {
  let component: CrearSedesComponent;
  let fixture: ComponentFixture<CrearSedesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearSedesComponent]
    });
    fixture = TestBed.createComponent(CrearSedesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
