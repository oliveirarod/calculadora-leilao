import { CommonModule } from '@angular/common';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

import { accordionSections } from '@shared/constants/accordion-sections.constants';
import { AccordionSection } from '@shared/interfaces/accordion-item.interface';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [CommonModule, NgbAccordionModule],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss'
})
export class AccordionComponent {
  accordionSections: AccordionSection[] = accordionSections;
}
