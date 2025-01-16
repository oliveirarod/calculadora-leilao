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
      placeholder: 'Informe o valor da avaliação',
      inputType: 'number'
    },
    auctionPurchaseValue: {
      label: 'Valor de compra do imóvel',
      placeholder: 'Informe o valor que deseja comprar o imóvel',
      inputType: 'number'
    },
    auctioneersFeePercentage: {
      label: 'Modalidade do leilão (Taxa do leiloeiro)',
      inputType: 'radio',
      radioOptions: [
        {
          label: 'Leilão tradicional (5%)',
          inputName: 'auctioneersFeePercentage-5',
          value: 5
        },
        {
          label: 'Venda direta (0%)',
          inputName: 'auctioneersFeePercentage-0',
          value: 0
        }
      ]
    },
    realEstateAgencySale: {
      label: 'Venda com agência imobiliária?',
      inputType: 'radio',
      radioOptions: [
        {
          label: 'Sim',
          inputName: 'realEstateAgencySale-true',
          value: true
        },
        {
          label: 'Nao',
          inputName: 'realEstateAgencySale-false',
          value: false
        }
      ]
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
      appraisalValue: [null, Validators.required],
      auctionPurchaseValue: [null, Validators.required],
      auctioneersFeePercentage: [5, Validators.required],
      realEstateAgencySale: [false, Validators.required],
    });
  }

  protected getFormControlNames(): string[] {
    return Object.keys(this.auctionForm.controls);
  }
}
