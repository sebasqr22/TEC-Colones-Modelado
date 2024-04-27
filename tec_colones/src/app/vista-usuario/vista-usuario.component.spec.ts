import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaUsuarioComponent } from './vista-usuario.component';

describe('VistaUsuarioComponent', () => {
  let component: VistaUsuarioComponent;
  let fixture: ComponentFixture<VistaUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaUsuarioComponent]
    });
    fixture = TestBed.createComponent(VistaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
