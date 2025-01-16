import { Injectable } from '@angular/core';

import { FeesService } from './fees.service';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  constructor(
    private feesService: FeesService
  ) { }

  // Notary fees are calculated based on the auction purchase value
  getNotaryFees(auctionPurchaseValue: number): number {
    return this.feesService.getNotaryFeesValue(auctionPurchaseValue);
  }

  // Auctioneers fee is calculated based on the auction purchase value and the auctioneers fee percentage
  getAuctioneersFee(auctionPurchaseValue: number, auctioneersFeePercentage: number): number {
    const auctioneersFee = auctionPurchaseValue * (auctioneersFeePercentage / 100);

    return parseFloat(auctioneersFee.toFixed(2));
  }

  // Total invested is the sum of the auction purchase value, the auctioneers fee, and the notary fees
  getTotalInvested(auctionPurchaseValue: number, auctioneersFeePercentage: number): number {
    const auctioneersFee = this.getAuctioneersFee(auctionPurchaseValue, auctioneersFeePercentage);
    const notaryFees = this.getNotaryFees(auctionPurchaseValue);

    const potentialProfit = auctionPurchaseValue + auctioneersFee + notaryFees;

    return parseFloat(potentialProfit.toFixed(2)) || 0;
  }

  // Potential gross profit is the difference between the appraisal value and the total invested
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

  // Income tax is 15% of the potential gross profit
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

  getRealEstateAgencySaleValue(
    appraisalValue: number,
    auctionPurchaseValue: number,
    auctioneersFeePercentage: number,
  ): number {
    const potentialGrossProfit = this.getPotentialGrossProfit(
      appraisalValue,
      auctionPurchaseValue,
      auctioneersFeePercentage
    );

    return this.feesService.getRealEstateAgencyFeeValue(potentialGrossProfit);
  }

  getProfitWithRealEstateAgency(
    appraisalValue: number,
    auctionPurchaseValue: number,
    auctioneersFeePercentage: number,
  ): number {

    const potentialGrossProfit = this.getPotentialGrossProfit(
      appraisalValue,
      auctionPurchaseValue,
      auctioneersFeePercentage
    );

    const realEstateFeeAmount = this.getRealEstateAgencySaleValue(
      appraisalValue,
      auctionPurchaseValue,
      auctioneersFeePercentage
    );

    const netProfitAfterRealEstateFee = potentialGrossProfit - realEstateFeeAmount;

    return parseFloat(netProfitAfterRealEstateFee.toFixed(2)) || 0;
  }
}
