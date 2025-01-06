import { Component } from '@angular/core';

import { AuctionFormComponent } from '@components/auction-form/auction-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AuctionFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor() {}
}
