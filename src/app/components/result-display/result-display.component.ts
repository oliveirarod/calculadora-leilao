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

  updateFeeDetails(): void {
    const details: AuctionDetail[] = [
      { description: 'Taxa do leiloeiro', value: this.getAuctioneersFeePercentage() },
      { description: 'Taxas de cartório', value: this.getNotaryFees() }
    ];

    this.auctionDetails = details.filter(detail => detail.value > 0);
  }

  getAuctioneersFeePercentage(): number {
    return this.auctionService.getAuctioneersFee(
      this.auctionValues?.auctionPropertyValue,
      this.auctionValues?.auctioneersFeePercentage
    );
  }

  getNotaryFees(): number {
    return this.auctionService.getNotaryFees(
      this.auctionValues?.auctionPropertyValue
    );
  }

  getTotalValue(): number {
    return this.auctionService.getTotalInvested(
      this.auctionValues?.auctionPropertyValue,
      this.auctionValues?.auctioneersFeePercentage
    );
  }
}
