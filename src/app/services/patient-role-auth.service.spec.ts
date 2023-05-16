import {TestBed} from '@angular/core/testing';

import {PatientRoleAuth} from './patient-role-auth.service';

describe('AdminRoleAuth', () => {
  let service: PatientRoleAuth;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientRoleAuth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
