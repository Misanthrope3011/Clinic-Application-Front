import { TestBed } from '@angular/core/testing';

import { DoctorManagerService } from './doctor-manager.service';

describe('DoctorManagerService', () => {
  let service: DoctorManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
