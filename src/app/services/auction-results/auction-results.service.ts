import { Injectable, OnInit } from '@angular/core';
import { AuctionFormService } from '@services/auction-form/auction-form.service';

import { FinancialCalculationService } from '@services/financial-calculation/financial-calculation.service';
import { AuctionResultsValue } from '@shared/interfaces/auction-results-values.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuctionResultsService {
  private auctionResultsValueSubject = new BehaviorSubject<AuctionResultsValue>({
    auctionPurchaseValue: 0,
    auctioneersFeePercentage: 0,
    appraisalValue: 0,
    realEstateAgencySale: false,
    potentialProfit: 0,
    totalInvested: 0,
  });

  auctionResultsValue$ = this.auctionResultsValueSubject.asObservable();

  constructor(
    private financialCalculationService: FinancialCalculationService,
    private auctionFormService: AuctionFormService
  ) {
    this.setupAuctionFormListener();
  }

  private setupAuctionFormListener(): void {
    this.auctionFormService.form$.subscribe((form: any) => {
      const updatedValue = {
        ...this.auctionResultsValueSubject.value,
        ...form,
      };
      this.auctionResultsValueSubject.next(updatedValue);
    });
  }

  getAuctioneersFeePercentage(): number {
    const { auctionPurchaseValue, auctioneersFeePercentage } = this.auctionResultsValueSubject.value;

    return this.financialCalculationService.calculateAuctioneerFees(
      auctionPurchaseValue,
      auctioneersFeePercentage
    );
  }

  getNotaryFees(): number {
    return this.financialCalculationService.calculateNotaryFees(
      this.auctionResultsValueSubject.value.auctionPurchaseValue
    );
  }

  getTotalValue(): number {
    const { auctionPurchaseValue, auctioneersFeePercentage } = this.auctionResultsValueSubject.value;

    return this.financialCalculationService.calculateTotalInvestment(
      auctionPurchaseValue,
      auctioneersFeePercentage
    );
  }

  getPotentialGrossProfit(): number {
    const { appraisalValue, auctionPurchaseValue, auctioneersFeePercentage } = this.auctionResultsValueSubject.value;

    return this.financialCalculationService.calculatePotentialGrossProfit(
      appraisalValue,
      auctionPurchaseValue,
      auctioneersFeePercentage
    );
  }

  getIncomeTax(): number {
    const { appraisalValue, auctionPurchaseValue, auctioneersFeePercentage } = this.auctionResultsValueSubject.value;

    return this.financialCalculationService.calculateIncomeTax(
      appraisalValue,
      auctionPurchaseValue,
      auctioneersFeePercentage
    );
  }

  getRealEstateAgencySaleValue(): number {
    const { realEstateAgencySale, appraisalValue, auctionPurchaseValue, auctioneersFeePercentage } =
      this.auctionResultsValueSubject.value;

    if (!realEstateAgencySale) return 0;

    return this.financialCalculationService.calculateRealEstateAgencyFee(
      appraisalValue,
      auctionPurchaseValue,
      auctioneersFeePercentage
    );
  }

  getProfitWithRealEstateAgency(): number {
    const { appraisalValue, auctionPurchaseValue, auctioneersFeePercentage } = this.auctionResultsValueSubject.value;

    return this.financialCalculationService.calculateNetProfitAfterAgencyFee(
      appraisalValue,
      auctionPurchaseValue,
      auctioneersFeePercentage
    );
  }

  getPotentialNetProfit(): number {
    const grossProfit = this.auctionResultsValueSubject.value.realEstateAgencySale
      ? this.getProfitWithRealEstateAgency()
      : this.getPotentialGrossProfit();

    return grossProfit - this.getIncomeTax();
  }
}
