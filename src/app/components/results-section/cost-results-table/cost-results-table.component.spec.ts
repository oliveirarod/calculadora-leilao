import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostResultsTableComponent } from './cost-results-table.component';

describe('CostResultsTableComponent', () => {
  let component: CostResultsTableComponent;
  let fixture: ComponentFixture<CostResultsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostResultsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostResultsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
