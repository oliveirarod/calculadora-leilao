import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AuctionRadioButtonComponent } from '@components/auction-radio-button/auction-radio-button.component';
import { RadioOption } from '@shared/interfaces/radio-option.interface';

@Component({
  selector: 'app-auction-input',
  standalone: true,
  imports: [FormsModule, CommonModule, AuctionRadioButtonComponent],
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
  @Input() inputType: string = '';
  @Input() radioOptions?: RadioOption[] = [];

  value: number  | null = null;

  protected handleInputChange(event: Event | number): void {
    const currentValue =
      typeof event === 'number'
        ? event
        : (event.target as HTMLInputElement).value;

    console.log('currentValue', currentValue);
    console.log('tipo', typeof currentValue);

    this.value = Number(currentValue);

    this.onChange(this.value);
    this.onTouched();
  }

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
