import { RadioOption } from "./radio-option.interface";
import { InputTypesEnum } from "@shared/enums/input-types.enum";

export interface InputConfig {
  label: string;
  placeholder?: string;
  inputType: InputTypesEnum.CURRENCY | InputTypesEnum.RADIO;
  radioOptions?: RadioOption[];
}
