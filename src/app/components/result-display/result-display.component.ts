import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

import { AuctionService } from '@services/auction.service';
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

  ngOnChanges(): void {}

  constructor(private auctionService: AuctionService) {}

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
    return this.auctionService.getTotalValue(
      this.auctionValues?.auctionPropertyValue,
      this.auctionValues?.auctioneersFeePercentage
    );
  }
}
