import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCentrosComponent } from './ver-centros.component';

describe('VerCentrosComponent', () => {
  let component: VerCentrosComponent;
  let fixture: ComponentFixture<VerCentrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerCentrosComponent]
    });
    fixture = TestBed.createComponent(VerCentrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
