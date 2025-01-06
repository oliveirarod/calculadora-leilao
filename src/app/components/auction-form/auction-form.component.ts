import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { AuctionInputComponent } from '@components/auction-input/auction-input.component';
import { AuctionService } from '@services/auction.service';

@Component({
  selector: 'app-auction-form',
  standalone: true,
  imports: [ReactiveFormsModule, AuctionInputComponent],
  templateUrl: './auction-form.component.html',
  styleUrl: './auction-form.component.scss',
})
export class AuctionFormComponent implements OnInit {
  protected auctionForm!: FormGroup;
  protected totalValue!: number;

  constructor(
    private form: FormBuilder,
    private auctionService: AuctionService
  ) {}

  ngOnInit(): void {
    this.createForm();

    this.auctionForm.valueChanges.subscribe(() => {
      this.totalValue = this.getTotalValue();
    });
  }

  createForm(): void {
    this.auctionForm = this.form.group({
      auctionPropertyValue: [],
      auctioneersFeePercentage: [5],
    });
  }

  getTotalValue(): any {
    const propertyValue = Number(
      this.auctionForm.get('auctionPropertyValue')?.value
    );

    const auctioneersFeePercentage = Number(
      this.auctionForm.get('auctioneersFeePercentage')?.value
    );

    return this.auctionService.getTotalValue(
      propertyValue,
      auctioneersFeePercentage
    );
  }
}
