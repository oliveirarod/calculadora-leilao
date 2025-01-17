import { Component } from '@angular/core';

import { AuctionFormComponent } from '@components/auction-form/auction-form.component';
import { ResultDisplayComponent } from '@components/result-display/result-display.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AuctionFormComponent, ResultDisplayComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor() {}
}
