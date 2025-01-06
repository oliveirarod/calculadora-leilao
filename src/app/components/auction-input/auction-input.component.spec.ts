import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionInputComponent } from './auction-input.component';

describe('InputComponent', () => {
  let component: AuctionInputComponent;
  let fixture: ComponentFixture<AuctionInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuctionInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuctionInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
