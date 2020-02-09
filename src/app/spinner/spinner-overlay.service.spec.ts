import { TestBed } from '@angular/core/testing';

import { SpinnerOverlayService } from './spinner-overlay.service';
import { OverlayModule } from '@angular/cdk/overlay';

describe('SpinnerOverlayService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      OverlayModule
    ]
  }));

  it('should be created', () => {
    const service: SpinnerOverlayService = TestBed.get(SpinnerOverlayService);
    expect(service).toBeTruthy();
  });
});
