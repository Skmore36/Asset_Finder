import { TestBed } from '@angular/core/testing';

import { AssetDetailsService } from './asset-details.service';

describe('AssetDetailsService', () => {
  let service: AssetDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
