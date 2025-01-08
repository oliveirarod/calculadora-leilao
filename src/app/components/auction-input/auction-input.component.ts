import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-auction-input',
  standalone: true,
  imports: [],
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

  value: any;

  handleInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.value = Number(input.value);

    this.onChange(this.value);
    this.onTouched();
  }

  // ControlValueAccessor methods
  onChange = (value: number) => {};
  onTouched = () => {};

  writeValue(value: number): void {
    console.log('value', value);
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
