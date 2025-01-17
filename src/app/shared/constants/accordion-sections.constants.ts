import { AccordionSection } from "@shared/interfaces/accordion-item.interface";
import { CostResultsTableComponent } from '@components/results-section/cost-results-table/cost-results-table.component';
import { AuctionFormComponent } from "@components/auction-form/auction-form.component";

/**
 * `accordionSections` é uma constante que define as seções do acordeão para a interface do usuário.
 * 
 * Cada seção do acordeão é representada por um objeto que especifica:
 *    - title: O título da seção do acordeão.
 *    - component: O componente Angular que será renderizado dentro da seção do acordeão.
 */
export const accordionSections: AccordionSection[] = [
	{
		title: 'Detalhes dos custos',
		component: CostResultsTableComponent
	}
];