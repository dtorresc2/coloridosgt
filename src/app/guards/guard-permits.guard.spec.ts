import { TestBed } from '@angular/core/testing';

import { GuardPermitsGuard } from './guard-permits.guard';

describe('GuardPermitsGuard', () => {
  let guard: GuardPermitsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardPermitsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
