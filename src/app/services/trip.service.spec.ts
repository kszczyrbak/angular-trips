import { TestBed } from '@angular/core/testing';

import { TripService } from './trip.service';
import { HttpClientModule } from '@angular/common/http';

describe('TripService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: TripService = TestBed.get(TripService);
    expect(service).toBeTruthy();
  });
});
