import { InputTypesEnum } from '@shared/enums/input-types.enum';
import { InputConfig } from '@shared/interfaces/input-config.interface';

/**
 * `inputConfigs` é uma constante que define os detalhes de cada campo do formulário de leilão.
 * 
 * Cada configuração de entrada é representada por um objeto que especifica:
 *    - label: O rótulo do campo de entrada.
 *    - placeholder: O texto de placeholder do campo de entrada (se aplicável).
 *    - inputType: O tipo de entrada, que pode ser `InputTypesEnum.CURRENCY` ou `InputTypesEnum.RADIO`.
 *    - radioOptions: Um array de opções para campos do tipo rádio (se aplicável), contendo:
 *        - label: O rótulo da opção de rádio.
 *        - inputName: O nome do campo de entrada da opção de rádio.
 *        - value: O valor da opção de rádio.
 */
export const inputConfigs: Record<string, InputConfig>[] = [
  {
    appraisalValue: {
      label: 'Valor da avaliação',
      placeholder: 'Informe o valor da avaliação',
      inputType: InputTypesEnum.CURRENCY,
    },
  },
  {
    auctionPurchaseValue: {
      label: 'Valor de compra do imóvel',
      placeholder: 'Informe o valor que deseja comprar o imóvel',
      inputType: InputTypesEnum.CURRENCY,
    },
  },
  {
    auctioneersFeePercentage: {
      label: 'Modalidade do leilão (Taxa do leiloeiro)',
      inputType: InputTypesEnum.RADIO,
      radioOptions: [
        {
          label: 'Leilão tradicional (5%)',
          inputName: 'auctioneersFeePercentage-5',
          value: 5,
        },
        {
          label: 'Venda direta (0%)',
          inputName: 'auctioneersFeePercentage-0',
          value: 0,
        },
      ],
    },
  },
  {
    realEstateAgencySale: {
      label: 'Venda com agência imobiliária?',
      inputType: InputTypesEnum.RADIO,
      radioOptions: [
        {
          label: 'Sim',
          inputName: 'realEstateAgencySale-true',
          value: true,
        },
        {
          label: 'Nao',
          inputName: 'realEstateAgencySale-false',
          value: false,
        },
      ],
    },
  },
];
