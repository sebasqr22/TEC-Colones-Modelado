import { TestBed } from '@angular/core/testing';

import { FechaHoraService } from './fecha-hora.service';

describe('FechaHoraService', () => {
  let service: FechaHoraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FechaHoraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
