import { TestBed } from '@angular/core/testing';

import { ProductformService } from './productform.service';

describe('ProductformService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductformService = TestBed.get(ProductformService);
    expect(service).toBeTruthy();
  });
});
