import { Component } from '@angular/core';

import { AuctionFormComponent } from '@components/auction-form/auction-form.component';
import { ResultsSectionComponent } from '@components/results-section/results-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AuctionFormComponent, ResultsSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor() {}
}
