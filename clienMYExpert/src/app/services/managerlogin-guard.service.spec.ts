import { TestBed } from '@angular/core/testing';

import { ManagerloginGuardService } from './managerlogin-guard.service';

describe('ManagerloginGuardService', () => {
  let service: ManagerloginGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerloginGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
