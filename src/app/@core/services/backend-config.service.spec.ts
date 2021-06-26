import { TestBed } from '@angular/core/testing';

import { BackendConfigService } from './backend-config.service';

describe('BackendConfigService', () => {
  let service: BackendConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
