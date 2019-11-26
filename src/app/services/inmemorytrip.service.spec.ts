import { TestBed } from '@angular/core/testing';

import { InMemoryTripService } from './inmemorytrip.service';

describe('InmemorytripService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InMemoryTripService = TestBed.get(InMemoryTripService);
    expect(service).toBeTruthy();
  });
});
