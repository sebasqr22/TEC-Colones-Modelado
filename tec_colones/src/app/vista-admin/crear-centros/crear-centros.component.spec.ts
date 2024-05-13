import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCentrosComponent } from './crear-centros.component';

describe('CrearCentrosComponent', () => {
  let component: CrearCentrosComponent;
  let fixture: ComponentFixture<CrearCentrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearCentrosComponent]
    });
    fixture = TestBed.createComponent(CrearCentrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
