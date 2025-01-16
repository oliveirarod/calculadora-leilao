import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { AuctionInputComponent } from '@components/auction-input/auction-input.component';
import { AuctionFormService } from '@services/auction-form.service';
import { inputConfigs } from '@shared/constants/auction-form-input-configs.constant';
import { InputConfig } from '@shared/interfaces/input-config.interface';

@Component({
  selector: 'app-auction-form',
  standalone: true,
  imports: [ReactiveFormsModule, AuctionInputComponent],
  templateUrl: './auction-form.component.html',
  styleUrl: './auction-form.component.scss',
})
export class AuctionFormComponent implements OnInit {
  protected auctionForm!: FormGroup;
  protected inputConfigs: Record<string, InputConfig>[] = inputConfigs;

  constructor(
    private form: FormBuilder,
    private auctionFormService: AuctionFormService
  ) {}

  ngOnInit(): void {
    this.createForm();

    this.auctionFormService.updateForm(this.auctionForm);

    this.auctionForm.valueChanges.subscribe((values) => {
      this.auctionFormService.updateForm(values);
    })
  }

  protected createForm(): void {
    /**
     * When adding a new formControl, make sure to configure it in the inputConfigs constant.
     */
    this.auctionForm = this.form.group({
      appraisalValue: [null, Validators.required],
      auctionPurchaseValue: [null, Validators.required],
      auctioneersFeePercentage: [5, Validators.required],
      realEstateAgencySale: [false, Validators.required],
    });
  }

  protected getFormControlName(inputConfig: Record<string, InputConfig>): any {
    return Object.keys(inputConfig)[0];
  }
}
