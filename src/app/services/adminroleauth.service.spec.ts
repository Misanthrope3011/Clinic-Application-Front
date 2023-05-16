import {TestBed} from '@angular/core/testing';
import {AdminRoleAuth} from './adminroleauth.service'

describe('AdminRoleAuth', () => {
  let service: AdminRoleAuth;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminRoleAuth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
