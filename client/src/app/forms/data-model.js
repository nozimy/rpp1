"use strict";
var Bank = (function () {
    function Bank() {
        this.bank_num = 0;
        this.region_num = 0;
        this.shortName = '';
        this.fullName = '';
    }
    return Bank;
}());
exports.Bank = Bank;
exports.banks = [
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
exports.currencies = ['Любая', 'RUR', 'USD', 'EUR'];
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
exports.aims = [
    { key: 'ALL', value: 'Любая' },
    { key: 'ROOM', value: 'Покупка комнаты' },
    { key: 'FLAT', value: 'Покупка квартиры' },
    { key: 'HOUSE', value: 'Покупка дома' },
    { key: 'LAND', value: 'Покупка земли' },
    { key: 'IMPROVE', value: 'Улучшение жилищных условий' },
    { key: 'REPAIR', value: 'Ремонт жилья' },
    { key: 'REFINANCE', value: 'Перекредитование' },
    { key: 'NOPURPOSE', value: 'Нецелевой кредит' }
];
exports.houseMarkets = [
    { key: 'ALL', value: 'Любая' },
    { key: 'FIRST', value: 'Первичный' },
    { key: 'SECOND', value: 'Вторичный' },
];
exports.accredits = ['Любая', 'Да', 'Нет'];
exports.loansecurities = [
    { key: 'ALL', value: 'Любое' },
    { key: 'NEW', value: 'Приобретаемая недвижимость' },
    { key: 'OWN', value: 'Имеющаяся недвижимость' },
    { key: 'OTHER', value: 'Особые условия' }
];
exports.incconfirms = [
    { key: 'ALL', value: 'Любое' },
    { key: 'OFFICIAL', value: 'Официальными документами' },
    { key: 'UNOFFICIAL', value: 'Справкой по форме банка' },
    { key: 'VERBAL', value: 'Устно работодателем' },
    { key: 'NOTREQUIRED', value: 'Не требуется' }
];
exports.requireds = [
    { key: 'ALL', value: 'Любое' },
    { key: 'REQUIRED', value: 'Требуется' },
    { key: 'NOTREQUIRED', value: 'Не требуется' }
];
exports.paymenttypes = [
    { key: 'ALL', value: 'Любое' },
    { key: 'ANNUIT', value: 'Аннуитетные' },
    { key: 'DIFF', value: 'Дифференцированные' },
    { key: 'OTHER', value: 'Особые условия' }
];
exports.Indexes = [
    { key: 'RATE', value: 'Ставке' },
    { key: 'CREDITPERIOD', value: 'Максимальному сроку' },
    { key: 'FIRSTPAYMENT', value: 'Первоначальному взносу' },
    { key: 'SUMCREDIT', value: 'Максимальной сумме кредита' }
];
