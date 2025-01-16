import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AuctionFormService } from '@services/auction-form/auction-form.service';

import { FinancialCalculationService } from '@services/financial-calculation/financial-calculation.service';
import { AuctionResultDetail } from '@shared/interfaces/auction-detail.interface';
import { AuctionValues } from '@shared/interfaces/auction-values.interface';

@Component({
  selector: 'app-result-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result-display.component.html',
  styleUrl: './result-display.component.scss',
})
export class ResultDisplayComponent implements OnInit {
  auctionValues: AuctionValues = {
    auctionPurchaseValue: 0,
    auctioneersFeePercentage: 0,
    appraisalValue: 0,
    realEstateAgencySale: false,
    potentialProfit: 0,
    totalInvested: 0,
  };
  AuctionResultDetails: AuctionResultDetail[] = [];

  constructor(
    private financialCalculationService: FinancialCalculationService,
    private auctionFormService: AuctionFormService
  ) {}

  ngOnInit(): void {
    this.auctionFormService.form$.subscribe((form: Record<string, any>) => {
      this.auctionValues = {
        ...this.auctionValues,
        ...form,
      };

      this.updateResultDetails();
    });
  }

  private updateResultDetails(): void {
    const details: AuctionResultDetail[] = [
      this.createDetail('Taxa do leiloeiro', this.getAuctioneersFeePercentage()),
      this.createDetail('Taxas de cartório', this.getNotaryFees()),
      this.createDetail('Ganho potencial (bruto)', this.getPotentialGrossProfit(), true),
      this.createDetail('Custo com imobiliária', this.getRealEstateAgencySaleValue()),
      this.createDetail('Imposto de Renda', this.getIncomeTax()),
      this.createDetail('Ganho potencial (líquido)', this.getPotentialNetProfit(), true),
    ];

    this.AuctionResultDetails = details.filter((detail) => detail.value > 0);
  }

  private createDetail(description: string, value: number, isProfit = false): AuctionResultDetail {
    return { description, value, isProfit };
  }

  private getAuctioneersFeePercentage(): number {
    const { auctionPurchaseValue, auctioneersFeePercentage } = this.auctionValues;

    return this.financialCalculationService.calculateAuctioneerFees(
      auctionPurchaseValue,
      auctioneersFeePercentage
    );
  }

  private getNotaryFees(): number {
    return this.financialCalculationService.calculateNotaryFees(
      this.auctionValues?.auctionPurchaseValue
    );
  }

  protected getTotalValue(): number {
    const { auctionPurchaseValue, auctioneersFeePercentage } = this.auctionValues;

    return this.financialCalculationService.calculateTotalInvestment(
      auctionPurchaseValue,
      auctioneersFeePercentage
    );
  }

  protected getPotentialGrossProfit(): number {
    const { appraisalValue, auctionPurchaseValue, auctioneersFeePercentage } = this.auctionValues;

    return this.financialCalculationService.calculatePotentialGrossProfit(
      appraisalValue,
      auctionPurchaseValue,
      auctioneersFeePercentage
    );
  }

  protected getIncomeTax(): number {
    const { appraisalValue, auctionPurchaseValue, auctioneersFeePercentage } = this.auctionValues;

    return this.financialCalculationService.calculateIncomeTax(
      appraisalValue,
      auctionPurchaseValue,
      auctioneersFeePercentage
    );
  }

  protected getRealEstateAgencySaleValue(): number {
    const { realEstateAgencySale, appraisalValue, auctionPurchaseValue, auctioneersFeePercentage } =
      this.auctionValues;

    if (!realEstateAgencySale) return 0;

    return this.financialCalculationService.calculateRealEstateAgencyFee(
      appraisalValue,
      auctionPurchaseValue,
      auctioneersFeePercentage
    );
  }

  protected getProfitWithRealEstateAgency(): number {
    const { appraisalValue, auctionPurchaseValue, auctioneersFeePercentage } = this.auctionValues;

    return this.financialCalculationService.calculateNetProfitAfterAgencyFee(
      appraisalValue,
      auctionPurchaseValue,
      auctioneersFeePercentage
    );
  }

  protected getPotentialNetProfit(): number {
    const grossProfit = this.auctionValues.realEstateAgencySale
      ? this.getProfitWithRealEstateAgency()
      : this.getPotentialGrossProfit();

    return grossProfit - this.getIncomeTax();
  }
}
