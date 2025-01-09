import { Injectable } from '@angular/core';

import { FeesService } from './fees.service';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  constructor(
    private feesService: FeesService
  ) { }

  getNotaryFees(auctionPurchaseValue: number): number {
    return this.feesService.getNotaryFeesValue(auctionPurchaseValue);
  }

  getAuctioneersFee(auctionPurchaseValue: number, auctioneersFeePercentage: number): number {
    const auctioneersFee = auctionPurchaseValue * (auctioneersFeePercentage / 100);

    return parseFloat(auctioneersFee.toFixed(2));
  }

  getTotalInvested(auctionPurchaseValue: number, auctioneersFeePercentage: number): number {
    const auctioneersFee = this.getAuctioneersFee(auctionPurchaseValue, auctioneersFeePercentage);
    const notaryFees = this.getNotaryFees(auctionPurchaseValue);

    const potentialProfit = auctionPurchaseValue + auctioneersFee + notaryFees;

    return parseFloat(potentialProfit.toFixed(2)) || 0;
  }

  getPotentialGrossProfit(
    appraisalValue: number, 
    auctionPurchaseValue: number, 
    auctioneersFeePercentage: number
  ): number {

    const totalInvested = this.getTotalInvested(
      auctionPurchaseValue,
      auctioneersFeePercentage
    );
    const potentialProfit = appraisalValue - totalInvested;

    return parseFloat(potentialProfit.toFixed(2)) || 0;
  }

  getIncomeTax(
    appraisalValue: number, 
    auctionPurchaseValue: number, 
    auctioneersFeePercentage: number
  ): number {

    const potentialProfit = this.getPotentialGrossProfit(
      appraisalValue, 
      auctionPurchaseValue, 
      auctioneersFeePercentage
    );

    return potentialProfit * 0.15;
  }
}
