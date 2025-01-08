import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuctionInputComponent } from '@components/auction-input/auction-input.component';
import { ResultDisplayComponent } from "../result-display/result-display.component";
import { AuctionValues } from '@shared/interfaces/auction-values.interface';

@Component({
  selector: 'app-auction-form',
  standalone: true,
  imports: [ReactiveFormsModule, AuctionInputComponent, ResultDisplayComponent],
  templateUrl: './auction-form.component.html',
  styleUrl: './auction-form.component.scss',
})
export class AuctionFormComponent implements OnInit {
  protected auctionForm!: FormGroup;
  protected auctionFormValues!: AuctionValues;

  constructor(
    private form: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();

    this.auctionForm.valueChanges.subscribe((values) => {
      this.auctionFormValues = values as AuctionValues;
    });
  }

  createForm(): void {
    this.auctionForm = this.form.group({
      auctionPropertyValue: [0, Validators.required],
      auctioneersFeePercentage: [5],
    });
  }
}
