import { TestBed } from '@angular/core/testing';

import { FinanzaService } from './finanza.service';

describe('FinanzaService', () => {
  let service: FinanzaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinanzaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
