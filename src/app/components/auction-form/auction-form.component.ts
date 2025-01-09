import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuctionInputComponent } from '@components/auction-input/auction-input.component';
import { ResultDisplayComponent } from "../result-display/result-display.component";
import { AuctionValues } from '@shared/interfaces/auction-values.interface';
import { InputConfig } from '@shared/interfaces/input-config.interface';

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

  protected inputConfigs: Record<string, InputConfig> = {
    appraisalValue: {
      label: 'Valor da avaliação',
      placeholder: 'Informe o valor da avaliação'
    },
    auctionPurchaseValue: {
      label: 'Valor de compra do imóvel',
      placeholder: 'Informe o valor que deseja comprar o imóvel'
    },
    auctioneersFeePercentage: {
      label: 'Taxa do leiloeiro (%)',
      placeholder: 'Informe a porcentagem da taxa do leiloeiro'
    }
  };

  constructor(
    private form: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();

    this.auctionForm.valueChanges.subscribe((values) => {
      this.auctionFormValues = values as AuctionValues;
    });
  }

  protected createForm(): void {
    this.auctionForm = this.form.group({
      appraisalValue: [0, Validators.required],
      auctionPurchaseValue: [0, Validators.required],
      auctioneersFeePercentage: [5, Validators.required],
    });
  }

  protected getFormControlNames(): string[] {
    return Object.keys(this.auctionForm.controls);
  }
}
