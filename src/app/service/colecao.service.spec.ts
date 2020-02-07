import { TestBed } from '@angular/core/testing';

import { ColecaoService } from './colecao.service';

describe('ColecaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ColecaoService = TestBed.get(ColecaoService);
    expect(service).toBeTruthy();
  });
});
