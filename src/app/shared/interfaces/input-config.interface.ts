import { RadioOption } from "./radio-option.interface";

export interface InputConfig {
  label: string;
  placeholder?: string;
  inputType: 'number' | 'radio';
  radioOptions?: RadioOption[];
}
