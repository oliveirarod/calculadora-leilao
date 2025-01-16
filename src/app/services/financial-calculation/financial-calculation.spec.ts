import { TestBed } from '@angular/core/testing';

import { FinancialCalculationService } from './financial-calculation.service';

describe('FinancialCalculationService', () => {
  let service: FinancialCalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancialCalculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
