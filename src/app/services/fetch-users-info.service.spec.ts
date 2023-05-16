import {TestBed} from '@angular/core/testing';

import {FetchUsersInfoService} from './fetch-users-info.service';

describe('FetchUsersInfoService', () => {
  let service: FetchUsersInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchUsersInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
