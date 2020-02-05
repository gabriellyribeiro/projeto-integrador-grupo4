import { TestBed } from '@angular/core/testing';

import { VendedorService } from './vendedor.service';

describe('VendedorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VendedorService = TestBed.get(VendedorService);
    expect(service).toBeTruthy();
  });
});
