import { Injectable } from '@angular/core';

import { FeesService } from './fees.service';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  constructor(
    private feesService: FeesService
  ) { }

  getNotaryFees(propertyValue: number): number {
    return this.feesService.getNotaryFeesValue(propertyValue);
  }

  getAuctioneersFee(propertyValue: number, auctioneersFeePercentage: number): number {
    const auctioneersFee = propertyValue * (auctioneersFeePercentage / 100);

    return parseFloat(auctioneersFee.toFixed(2));
  }

  getTotalValue(propertyValue: number, auctioneersFeePercentage: number): number {
    const auctioneersFee = this.getAuctioneersFee(propertyValue, auctioneersFeePercentage);
    const notaryFees = this.getNotaryFees(propertyValue);

    const totalValue = propertyValue + auctioneersFee + notaryFees;

    return parseFloat(totalValue.toFixed(2));
  }
}
