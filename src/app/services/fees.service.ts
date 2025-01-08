import { Injectable } from '@angular/core';
import { NotaryFees } from '@shared/enums/notary-fees.enum';

@Injectable({
  providedIn: 'root',
})
export class FeesService {
  constructor() {}

  getNotaryFeesValue(propertyValue: number): number {
    const ITBI = propertyValue * NotaryFees.ITBI_PERCENTAGE;
    const publicDeedFee = propertyValue * NotaryFees.PUBLIC_DEED_FEE;
    const propertyRegistrationFee = propertyValue * NotaryFees.PROPERTY_REGISTRATION_FEE;
    const otherExpenses = propertyValue * NotaryFees.OTHER_EXPENSES;

    const totalNotaryFees = Number(
      ITBI + publicDeedFee + propertyRegistrationFee + otherExpenses
    );

    return totalNotaryFees;
  }
}
