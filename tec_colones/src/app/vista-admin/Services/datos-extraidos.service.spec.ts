import { TestBed } from '@angular/core/testing';

import { DatosExtraidosService } from './datos-extraidos.service';

describe('DatosExtraidosService', () => {
  let service: DatosExtraidosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosExtraidosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
