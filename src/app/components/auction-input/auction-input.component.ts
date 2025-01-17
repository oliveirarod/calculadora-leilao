import { Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

import { AuctionRadioButtonComponent } from '@components/auction-radio-button/auction-radio-button.component';
import { InputTypesEnum } from '@shared/enums/input-types.enum';
import { InputConfig } from '@shared/interfaces/input-config.interface';
import { RadioOption } from '@shared/interfaces/radio-option.interface';

@Component({
  selector: 'app-auction-input',
  standalone: true,
  imports: [FormsModule, NgxMaskDirective, AuctionRadioButtonComponent],
  templateUrl: './auction-input.component.html',
  styleUrl: './auction-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AuctionInputComponent),
      multi: true,
    },
  ],
})
export class AuctionInputComponent implements ControlValueAccessor {
  @Input() inputConfig!: Record<string, InputConfig>;

  currencyInputType = InputTypesEnum.CURRENCY;
  radioInputType = InputTypesEnum.RADIO;
  value: any = null;

  protected handleInputChange(newValue: any): void {
    const value =
      newValue instanceof Event
        ? (newValue.target as HTMLInputElement).value
        : newValue;

    this.value = this.getFormattedValue(value);

    this.onChange(this.value);
    this.onTouched();
  }

  private getFormattedValue(
    value: boolean | number | string
  ): boolean | number | string {
    if (typeof value === 'boolean' || typeof value === 'number') {
      return value;
    }

    const rawValue = value.replace(/[^\d,]/g, '').replace(',', '.');
    return rawValue.length > 0 ? Number(rawValue) : 0;
  }

  protected get inputType(): string {
    return Object.values(this.inputConfig)[0].inputType;
  }

  protected get label(): string {
    return Object.values(this.inputConfig)[0].label;
  }

  protected get placeholder(): string | undefined {
    return Object.values(this.inputConfig)[0].placeholder;
  }

  protected get radioOptions(): RadioOption[] | undefined {
    return Object.values(this.inputConfig)[0].radioOptions;
  }

  // ControlValueAccessor implementation
  onChange = (value: number) => {};
  onTouched = () => {};

  writeValue(value: number): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
