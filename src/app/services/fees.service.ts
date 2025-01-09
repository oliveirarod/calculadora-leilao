import { Injectable } from '@angular/core';
import { NotaryFees } from '@shared/enums/notary-fees.enum';

@Injectable({
  providedIn: 'root',
})
export class FeesService {
  constructor() {}

  getNotaryFeesValue(auctionPurchaseValue: number): number {
    const ITBI = auctionPurchaseValue * NotaryFees.ITBI_PERCENTAGE;
    const publicDeedFee = auctionPurchaseValue * NotaryFees.PUBLIC_DEED_FEE;
    const propertyRegistrationFee = auctionPurchaseValue * NotaryFees.PROPERTY_REGISTRATION_FEE;
    const otherExpenses = auctionPurchaseValue * NotaryFees.OTHER_EXPENSES;

    const totalNotaryFees = Number(
      ITBI + publicDeedFee + propertyRegistrationFee + otherExpenses
    );

    return totalNotaryFees;
  }
}
