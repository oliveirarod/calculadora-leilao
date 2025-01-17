import { CommonModule } from "@angular/common";
import { Component } from '@angular/core';
import { AuctionFormService } from '@services/auction-form/auction-form.service';
import { AuctionResultsService } from '@services/auction-results/auction-results.service';
import { AuctionResultDetail } from '@shared/interfaces/auction-detail.interface';
import { AuctionResultsValue } from '@shared/interfaces/auction-results-values.interface';

@Component({
  selector: 'app-cost-results-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cost-results-table.component.html',
  styleUrl: './cost-results-table.component.scss'
})
export class CostResultsTableComponent {

  auctionResultDetails: AuctionResultDetail[] = [];

  constructor(
    private auctionFormService: AuctionFormService,
    private auctionResultsService: AuctionResultsService
  ) {}

  ngOnInit(): void {
    this.auctionResultsService.auctionResultsValue$.subscribe(() => {
      this.updateResultDetails();
    });
  }

  private updateResultDetails(): void {
    const details: AuctionResultDetail[] = [
      this.createDetail('Taxa do leiloeiro (5%)', this.auctionResultsService.getAuctioneersFeePercentage()),
      this.createDetail('Taxas de cartório (6,5%)', this.auctionResultsService.getNotaryFees()),
      this.createDetail('Ganho potencial (bruto)', this.auctionResultsService.getPotentialGrossProfit(), true),
      this.createDetail('Custo com imobiliária (6%)', this.auctionResultsService.getRealEstateAgencySaleValue()),
      this.createDetail('Imposto de Renda (15%)', this.auctionResultsService.getIncomeTax()),
      this.createDetail('Ganho potencial (líquido)', this.auctionResultsService.getPotentialNetProfit(), true),
    ];

    this.auctionResultDetails = details.filter((detail) => detail.value > 0);
  }

  private createDetail(description: string, value: number, isProfit = false): AuctionResultDetail {
    return { description, value, isProfit };
  }
}
