import { TestBed } from '@angular/core/testing';

import { ExpertloginGuardService } from './expertlogin-guard.service';

describe('ExpertloginGuardService', () => {
  let service: ExpertloginGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpertloginGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
