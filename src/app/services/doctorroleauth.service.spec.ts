import {TestBed} from '@angular/core/testing';

import {DoctorRoleAuth} from './doctorroleauth.service';

describe('DoctorroleauthService', () => {
  let service: DoctorRoleAuth;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorRoleAuth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
