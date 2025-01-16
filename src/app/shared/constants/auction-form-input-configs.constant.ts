import { InputConfig } from '@shared/interfaces/input-config.interface';

export const inputConfigs: Record<string, InputConfig>[] = [
  {
    appraisalValue: {
      label: 'Valor da avaliação',
      placeholder: 'Informe o valor da avaliação',
      inputType: 'number',
    },
  },
  {
    auctionPurchaseValue: {
      label: 'Valor de compra do imóvel',
      placeholder: 'Informe o valor que deseja comprar o imóvel',
      inputType: 'number',
    },
  },
  {
    auctioneersFeePercentage: {
      label: 'Modalidade do leilão (Taxa do leiloeiro)',
      inputType: 'radio',
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
      inputType: 'radio',
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
