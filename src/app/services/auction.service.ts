import { Injectable } from '@angular/core';
import { FeesService } from './fees.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  constructor(
    private feesService: FeesService
  ) { }

  getTotalValue(propertyValue: number, auctioneersFeePercentage: number): number {
    const auctioneersFee = propertyValue * (auctioneersFeePercentage / 100);
    const notaryFees = this.feesService.getNotaryFeesValue(propertyValue);

    const totalValue = propertyValue + auctioneersFee + notaryFees;

    return parseFloat(totalValue.toFixed(2));
  }
}
