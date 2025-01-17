import { TestBed } from '@angular/core/testing';

import { AuctionFormService } from './auction-form.service';

describe('AuctionFormService', () => {
  let service: AuctionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuctionFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
