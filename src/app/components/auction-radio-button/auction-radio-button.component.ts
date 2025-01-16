import { Component, EventEmitter, Input, Output } from '@angular/core';

import { RadioOption } from '@shared/interfaces/radio-option.interface';

@Component({
  selector: 'app-auction-radio-button',
  standalone: true,
  imports: [],
  templateUrl: './auction-radio-button.component.html',
  styleUrl: './auction-radio-button.component.scss'
})
export class AuctionRadioButtonComponent {
  @Input() label: string = '';
  @Input() radioOptions: RadioOption[] = [];
  @Input() value!: number | boolean | null;

  @Output() valueChange = new EventEmitter<number | boolean>();

  protected handleRadioChange(value: number | boolean): void {
    this.valueChange.emit(value);
  }
}
