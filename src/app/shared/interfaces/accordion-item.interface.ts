import { TemplateRef, Type } from "@angular/core";

export interface AccordionSection {
	title: string;
	component: Type<any>;
}