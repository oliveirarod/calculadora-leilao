import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionRadioButtonComponent } from './auction-radio-button.component';

describe('AuctionRadioButtonComponent', () => {
  let component: AuctionRadioButtonComponent;
  let fixture: ComponentFixture<AuctionRadioButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuctionRadioButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuctionRadioButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
