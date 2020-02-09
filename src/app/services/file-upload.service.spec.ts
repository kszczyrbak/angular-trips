import { TestBed } from '@angular/core/testing';

import { FileUploadService } from './file-upload.service';
import { HttpClientModule } from '@angular/common/http';

describe('FileUploadService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: FileUploadService = TestBed.get(FileUploadService);
    expect(service).toBeTruthy();
  });
});
