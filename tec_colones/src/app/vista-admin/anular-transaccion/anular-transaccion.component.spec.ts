import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnularTransaccionComponent } from './anular-transaccion.component';

describe('AnularTransaccionComponent', () => {
  let component: AnularTransaccionComponent;
  let fixture: ComponentFixture<AnularTransaccionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnularTransaccionComponent]
    });
    fixture = TestBed.createComponent(AnularTransaccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
