import { TestBed } from '@angular/core/testing';

import { LlaveService } from './llave.service';

describe('LlaveService', () => {
  let service: LlaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LlaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
