import { Injectable } from '@angular/core';
import { FeesService } from './fees.service';

@Injectable({
  providedIn: 'root'
})
export class FinancialCalculationService {

  constructor(
    private feesService: FeesService
  ) { }

  /**
   * Calculate notary fees based on the property purchase price.
   * @param purchasePrice - The auction purchase price.
   * @returns The calculated notary fees.
   */
  calculateNotaryFees(purchasePrice: number): number {
    return this.feesService.getNotaryFeesValue(purchasePrice);
  }

  /**
   * Calculate auctioneer's fees based on the purchase price and the fee percentage.
   * @param purchasePrice - The auction purchase price.
   * @param feePercentage - The auctioneer's fee percentage.
   * @returns The calculated auctioneer's fee.
   */
  calculateAuctioneerFees(purchasePrice: number, feePercentage: number): number {
    const auctioneerFee = purchasePrice * (feePercentage / 100);
    return parseFloat(auctioneerFee.toFixed(2));
  }

  /**
   * Calculate the total investment for the auction.
   * @param purchasePrice - The auction purchase price.
   * @param feePercentage - The auctioneer's fee percentage.
   * @returns The total investment.
   */
  calculateTotalInvestment(purchasePrice: number, feePercentage: number): number {
    const auctioneerFees = this.calculateAuctioneerFees(purchasePrice, feePercentage);
    const notaryFees = this.calculateNotaryFees(purchasePrice);
    const totalInvestment = purchasePrice + auctioneerFees + notaryFees;

    return parseFloat(totalInvestment.toFixed(2)) || 0;
  }

  /**
   * Calculate the potential gross profit from the auction.
   * @param appraisalValue - The appraised value of the property.
   * @param purchasePrice - The auction purchase price.
   * @param feePercentage - The auctioneer's fee percentage.
   * @returns The potential gross profit.
   */
  calculatePotentialGrossProfit(appraisalValue: number, purchasePrice: number, feePercentage: number): number {
    const totalInvestment = this.calculateTotalInvestment(purchasePrice, feePercentage);
    const grossProfit = appraisalValue - totalInvestment;
    return parseFloat(grossProfit.toFixed(2)) || 0;
  }

  /**
   * Calculate the income tax based on the potential gross profit.
   * @param appraisalValue - The appraised value of the property.
   * @param purchasePrice - The auction purchase price.
   * @param feePercentage - The auctioneer's fee percentage.
   * @returns The calculated income tax.
   */
  calculateIncomeTax(appraisalValue: number, purchasePrice: number, feePercentage: number): number {
    const grossProfit = this.calculatePotentialGrossProfit(appraisalValue, purchasePrice, feePercentage);
    return grossProfit * 0.15;
  }

  /**
   * Calculate the real estate agency's sale fee.
   * @param appraisalValue - The appraised value of the property.
   * @param purchasePrice - The auction purchase price.
   * @param feePercentage - The auctioneer's fee percentage.
   * @returns The real estate agency's sale fee.
   */
  calculateRealEstateAgencyFee(appraisalValue: number, purchasePrice: number, feePercentage: number): number {
    const grossProfit = this.calculatePotentialGrossProfit(appraisalValue, purchasePrice, feePercentage);
    return this.feesService.getRealEstateAgencyFeeValue(grossProfit);
  }

  /**
   * Calculate the net profit after deducting the real estate agency's fees.
   * @param appraisalValue - The appraised value of the property.
   * @param purchasePrice - The auction purchase price.
   * @param feePercentage - The auctioneer's fee percentage.
   * @returns The net profit after real estate fees.
   */
  calculateNetProfitAfterAgencyFee(appraisalValue: number, purchasePrice: number, feePercentage: number): number {
    const grossProfit = this.calculatePotentialGrossProfit(appraisalValue, purchasePrice, feePercentage);
    const agencyFee = this.calculateRealEstateAgencyFee(appraisalValue, purchasePrice, feePercentage);
    const netProfit = grossProfit - agencyFee;

    return parseFloat(netProfit.toFixed(2)) || 0;
  }
}
