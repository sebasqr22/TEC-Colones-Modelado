import { TestBed } from '@angular/core/testing';

import { ElementosPantallaService } from './elementos-pantalla.service';

describe('ElementosPantallaService', () => {
  let service: ElementosPantallaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElementosPantallaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
