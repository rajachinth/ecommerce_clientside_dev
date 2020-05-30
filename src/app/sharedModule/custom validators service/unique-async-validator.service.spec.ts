import { TestBed } from '@angular/core/testing';

import { UniqueAsyncValidatorService } from './unique-async-validator.service';

describe('UniqueAsyncValidatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UniqueAsyncValidatorService = TestBed.get(UniqueAsyncValidatorService);
    expect(service).toBeTruthy();
  });
});
