import { TestBed } from '@angular/core/testing';

import { LLamaImageProviderService } from './llamaimageprovider.service';

describe('ImageProviderService', () => {
  let service: LLamaImageProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LLamaImageProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
