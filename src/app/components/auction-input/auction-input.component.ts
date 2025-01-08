import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MaskTypes } from '@shared/enums/mask-types.enum';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-auction-input',
  standalone: true,
  imports: [NgxMaskDirective],
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
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() mask: MaskTypes = MaskTypes.CURRENCY;

  value: string = '';

  handleInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.value = input.value;
    const formattedValue = this.formatCurrency(this.value);

    this.onChange(formattedValue);
    this.onTouched();
  }

  private formatCurrency(value: string): number {
    const numericValue = parseFloat(value.replace(/\D/g, '').replace(',', '.'));

    return isNaN(numericValue) ? 0 : Math.min(numericValue, 100);
  }

  // ControlValueAccessor methods
  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    console.log('value', value);
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Mask methods
  handleInputMask(): string {
    return this.mask === MaskTypes.CURRENCY ? 'separator.2' : 'separator.0';
  }

  handleInputPrefix(): string {
    return this.mask === MaskTypes.CURRENCY ? 'R$ ' : '';
  }

  handleInputSuffix(): string {
    return this.mask === MaskTypes.PERCENTAGE ? '%' : '';
  }
}
