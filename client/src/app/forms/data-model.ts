export class Bank {
  bank_num = 0;
  region_num = 0;
  shortName = '';
  fullName = '';
}


export const banks: Bank[] = [
  {
    bank_num: 1,
    region_num: 77,
    shortName: 'DeltaCredit',
    fullName: 'ЗАО "Коммерческий банк ДельтаКредит"'
  },
  {
    bank_num: 2,
    region_num: 77,
    shortName: 'Абсолют Банк',
    fullName: 'ЗАО Акционерный коммерческий банк "Абсолют Банк"'
  },
  {
    bank_num: 3,
    region_num: 77,
    shortName: 'Адмиралтейский',
    fullName: 'ООО Коммерческий банк "Адмиралтейский"'
  }
];

export const currencies = ['Любая', 'RUR', 'USD', 'EUR'];

// export const aims = [
//   'Любая',
//   'Покупка комнаты',
//   'Покупка квартиры',
//   'Покупка дома',
//   'Покупка земли',
//   'Улучшение жилищных условий',
//   'Ремонт жилья',
//   'Перекредитование',
//   'Нецелевой кредит'
// ];
export const aims = [
  {key: 'ALL', value:'Любая'},
  {key :'ROOM', value: 'Покупка комнаты'},
  {key :'FLAT', value:'Покупка квартиры'},
  {key :'HOUSE', value:'Покупка дома'},
  {key :'LAND', value:'Покупка земли'},
  {key :'IMPROVE', value:'Улучшение жилищных условий'},
  {key :'REPAIR', value:'Ремонт жилья'},
  {key :'REFINANCE', value: 'Перекредитование'},
  {key :'NOPURPOSE', value: 'Нецелевой кредит'}
];

export const houseMarkets = [
  {key: 'ALL', value:'Любая'},
  {key: 'FIRST', value:'Первичный'},
  {key: 'SECOND', value:'Вторичный'},
];
export const accredits = ['Любая','Да','Нет'];

export const loansecurities = [
  {key: 'ALL', value:'Любое'},
  {key: 'NEW', value:'Приобретаемая недвижимость'},
  {key: 'OWN', value:'Имеющаяся недвижимость'},
  {key: 'OTHER', value:'Особые условия'}
];
export const incconfirms = [
  {key: 'ALL', value:'Любое'},
  {key: 'OFFICIAL', value:'Официальными документами'},
  {key: 'UNOFFICIAL', value:'Справкой по форме банка'},
  {key: 'VERBAL', value:'Устно работодателем'},
  {key: 'NOTREQUIRED', value:'Не требуется'}
];

export const requireds = [
  {key: 'ALL', value:'Любое'},
  {key: 'REQUIRED', value:'Требуется'},
  {key: 'NOTREQUIRED', value:'Не требуется'}
];

export const paymenttypes = [
  {key: 'ALL', value:'Любое'},
  {key: 'ANNUIT', value:'Аннуитетные'},
  {key: 'DIFF', value:'Дифференцированные'},
  {key: 'OTHER', value:'Особые условия'}
];
export const Indexes = [
  {key: 'RATE', value:'Ставке'},
  {key: 'CREDITPERIOD', value:'Максимальному сроку'},
  {key: 'FIRSTPAYMENT', value:'Первоначальному взносу'},
  {key: 'SUMCREDIT', value:'Максимальной сумме кредита'}
];