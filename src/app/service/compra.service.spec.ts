import { TestBed } from '@angular/core/testing';

import { CompraService } from './compra.service';

describe('CompraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompraService = TestBed.get(CompraService);
    expect(service).toBeTruthy();
  });
});
