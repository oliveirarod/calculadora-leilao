import { TestBed } from '@angular/core/testing';

import { AuctionResultsService } from './auction-results.service';

describe('AuctionResultsService', () => {
  let service: AuctionResultsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuctionResultsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
