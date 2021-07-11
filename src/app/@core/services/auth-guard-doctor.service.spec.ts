import { TestBed } from '@angular/core/testing';

import { AuthGuardDoctorService } from './auth-guard-doctor.service';

describe('AuthGuardDoctorService', () => {
  let service: AuthGuardDoctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuardDoctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
