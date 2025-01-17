import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { AccordionComponent } from '@components/accordion/accordion.component';
import { AuctionResultsService } from '@services/auction-results/auction-results.service';
import { AuctionResultsValue } from '@shared/interfaces/auction-results-values.interface';

@Component({
  selector: 'app-results-section',
  standalone: true,
  imports: [CommonModule, AccordionComponent],
  templateUrl: './results-section.component.html',
  styleUrl: './results-section.component.scss',
})
export class ResultsSectionComponent implements OnInit {
  auctionResultsValue!: AuctionResultsValue;

  constructor(
    private auctionResultsService: AuctionResultsService,
  ) {}

  ngOnInit(): void {
    this.auctionResultsService.auctionResultsValue$.subscribe((value: AuctionResultsValue) => {
      console.log(value);
      this.auctionResultsValue = value;
    });
  }

  protected getTotalValue(): number {
    return this.auctionResultsService.getTotalValue();
  }

  protected getPotentialNetProfit(): number {
    return this.auctionResultsService.getPotentialNetProfit();
  }
}
