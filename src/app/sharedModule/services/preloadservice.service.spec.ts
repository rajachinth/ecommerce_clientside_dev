import { TestBed } from '@angular/core/testing';

import { PreloadserviceService } from './preloadservice.service';

describe('PreloadserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PreloadserviceService = TestBed.get(PreloadserviceService);
    expect(service).toBeTruthy();
  });
});
