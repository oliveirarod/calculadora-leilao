import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';

import { AuctionService } from '@services/auction.service';
import { AuctionDetail } from '@shared/interfaces/auction-detail.interface';
import { AuctionValues } from '@shared/interfaces/auction-values.interface';

@Component({
  selector: 'app-result-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result-display.component.html',
  styleUrl: './result-display.component.scss',
})
export class ResultDisplayComponent implements OnChanges {
  @Input() auctionValues!: AuctionValues;
  auctionDetails: AuctionDetail[] = [];

  constructor(private auctionService: AuctionService) {}

  ngOnChanges(): void {
    this.updateFeeDetails();
  }

  private updateFeeDetails(): void {
    const details: AuctionDetail[] = [
      {
        description: 'Taxa do leiloeiro',
        value: this.getAuctioneersFeePercentage(),
      },
      { description: 'Taxas de cartório', value: this.getNotaryFees() },
      { description: 'Imposto de Renda', value: this.getIncomeTax() },
      {
        description: 'Ganho potencial (bruto)',
        value: this.getPotentialGrossProfit(),
        isProfit: true,
      },
      {
        description: 'Ganho potencial (liquido)',
        value: this.getPotentialNetProfit(),
        isProfit: true,
      },
    ];

    this.auctionDetails = details.filter((detail) => detail.value > 0);
  }

  private getAuctioneersFeePercentage(): number {
    return this.auctionService.getAuctioneersFee(
      this.auctionValues?.auctionPurchaseValue,
      this.auctionValues?.auctioneersFeePercentage
    );
  }

  private getNotaryFees(): number {
    return this.auctionService.getNotaryFees(
      this.auctionValues?.auctionPurchaseValue
    );
  }

  protected getTotalValue(): number {
    return this.auctionService.getTotalInvested(
      this.auctionValues?.auctionPurchaseValue,
      this.auctionValues?.auctioneersFeePercentage
    );
  }

  protected getPotentialGrossProfit(): number {
    return this.auctionService.getPotentialGrossProfit(
      this.auctionValues?.appraisalValue,
      this.auctionValues?.auctionPurchaseValue,
      this.auctionValues?.auctioneersFeePercentage
    );
  }

  protected getIncomeTax(): number {
    return this.auctionService.getIncomeTax(
      this.auctionValues?.appraisalValue,
      this.auctionValues?.auctionPurchaseValue,
      this.auctionValues?.auctioneersFeePercentage
    );
  }

  protected getPotentialNetProfit(): number {
    return this.getPotentialGrossProfit() - this.getIncomeTax();
  }
}
