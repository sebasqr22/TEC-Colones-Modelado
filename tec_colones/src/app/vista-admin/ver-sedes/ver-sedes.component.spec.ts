import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerSedesComponent } from './ver-sedes.component';

describe('VerSedesComponent', () => {
  let component: VerSedesComponent;
  let fixture: ComponentFixture<VerSedesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerSedesComponent]
    });
    fixture = TestBed.createComponent(VerSedesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
