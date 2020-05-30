import { TestBed } from '@angular/core/testing';

import { DefaultserviceService } from './defaultservice.service';

describe('DefaultserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DefaultserviceService = TestBed.get(DefaultserviceService);
    expect(service).toBeTruthy();
  });
});
