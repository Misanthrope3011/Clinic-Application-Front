import { TestBed } from '@angular/core/testing';

import { PatientManagerService } from './patient-manager.service';

describe('PatientManagerService', () => {
  let service: PatientManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
