import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearMaterialesComponent } from './crear-materiales.component';

describe('CrearMaterialesComponent', () => {
  let component: CrearMaterialesComponent;
  let fixture: ComponentFixture<CrearMaterialesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearMaterialesComponent]
    });
    fixture = TestBed.createComponent(CrearMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
