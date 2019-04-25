import { TestBed } from '@angular/core/testing';

import { SeviciService } from './sevici.service';

describe('SeviciService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SeviciService = TestBed.get(SeviciService);
    expect(service).toBeTruthy();
  });
});
