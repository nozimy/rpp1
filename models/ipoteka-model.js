var mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    ipoteka_num: { type: Number, unique: true,required: true }, //id Ипотеки

    bank_num: { type: Number, required: true }, // id Банка
    region_num: { type: Number, required: true },// id Региона
    aim: { type: [String],  trim: true },// Цель кредитования
    houseMarket: { type: [String] }, // рынок недвижимости
    buildingIsAccredited: {type: Boolean}, // новостройка аккредитована или не аккредитовано банком

    currency: { type: [String]}, //•	валюта кредита (RUR, USD, EUR);
    creditRate: { type: Number, min: 0, max: 100  }, // •	ставка кредита
    creditSecurity: { type: [String], trim: true }, //•	обеспечение кредита
    creditTerm: { type: Number, min: 1, max: 100 }, //•	срок кредита
    creditAmount: Schema.Types.Mixed, //•	размер кредита {major: 1, minor:  222, currency: 'RUR'} = 1.222 RUR
    downPayment: { type: Number, min: 0, max: 100 }, //•	первоначальный взнос
    incomeCheck: { type: [String], trim: true }, //•	подтверждение дохода
    periodOfExam: {  type: Number, min: 1  }, //•	срок рассмотрения заявки

    borrowerAge: { type: Number, min: 18, max: 120  }, //•	возраст заемщика
    registrationIsRequired: { type: Boolean }, //•	регистрация по месту получения кредита
    rusResidenceRequired: { type: Boolean }, //•	гражданство РФ (требуется или нет);
    payment: {  type: [String] },  //•	платежи
    prePayment: { type: Number } //•	досрочное погашение без санкция после указанных месяцев.
});

exports.Ipoteka = mongoose.model('Ipoteka', schema);
