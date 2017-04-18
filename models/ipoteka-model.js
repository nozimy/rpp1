var async = require('async');
var util = require('util');

var mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    ipoteka_num: { type: Number, unique: true,required: true }, //id Ипотеки

    bank_num: { type: Number, required: true }, // id Банка
    region_num: { type: Number, required: true },// id Региона
    aim: { type: [String],  trim: true },// Цель кредитования
    houseMarket: { type: [String] }, // рынок недвижимости
    buildingIsAccredited: {type: String}, // новостройка аккредитована или не аккредитовано банком

    currency: { type: [String]}, //•	валюта кредита (RUR, USD, EUR);
    creditRate: { type: Number, min: 0, max: 100  }, // •	ставка кредита
    creditSecurity: { type: [String], trim: true }, //•	обеспечение кредита
    creditTermFrom: { type: Number, min: 1, max: 100 }, //•	срок кредита
    creditTermTo: { type: Number, min: 1, max: 100 }, //•	срок кредита
    creditAmount: Schema.Types.Mixed, //•	размер кредита {major: 1, minor:  222, currency: 'RUR'} = 1.222 RUR
    downPayment: { type: Number, min: 0, max: 100 }, //•	первоначальный взнос
    incomeCheck: { type: [String], trim: true }, //•	подтверждение дохода
    periodOfExam: {  type: Number, min: 1  }, //•	срок рассмотрения заявки

    borrowerAge: { type: Number, min: 18, max: 120  }, //•	возраст заемщика
    registrationIsRequired: { type: String }, //•	регистрация по месту получения кредита
    rusResidenceRequired: { type: String }, //•	гражданство РФ (требуется или нет);
    payment: {  type: [String] },  //•	платежи
    prePayment: { type: Number } //•	досрочное погашение без санкция после указанных месяцев.
});


schema.statics.createNew = function(ipotekaSetup, callback) {
    var Ipoteka = this;

    async.waterfall([
        function(callback) {
            Ipoteka.findOne({ipoteka_num: ipotekaSetup.ipoteka_num}, callback); // Проверим существует ли уже такая запись
        },
        function(ipoteka, callback) {
            if (ipoteka) {
                // Если такая запись уже существует
                callback(new IpotekaError("Такая запись уже существует"));
            } else {
                // Если такой записи еще нет в базе
                var ipoteka = new Ipoteka({
                    ipoteka_num:    ipotekaSetup.ipoteka_num,
                    bank_num:       ipotekaSetup.bank_num,
                    region_num:     ipotekaSetup.region_num,
                    aim:            ipotekaSetup.aim,
                    houseMarket:    ipotekaSetup.houseMarket,
                    buildingIsAccredited:   ipotekaSetup.buildingIsAccredited,
                    currency:       ipotekaSetup.currency,
                    creditRate:     ipotekaSetup.creditRate,
                    creditSecurity:     ipotekaSetup.creditSecurity,
                    creditTerm:     ipotekaSetup.creditTerm,
                    creditAmount:   ipotekaSetup.creditAmount,
                    downPayment:    ipotekaSetup.downPayment,
                    incomeCheck:    ipotekaSetup.incomeCheck,
                    periodOfExam:   ipotekaSetup.periodOfExam,
                    borrowerAge:    ipotekaSetup.borrowerAge,
                    registrationIsRequired: ipotekaSetup.registrationIsRequired,
                    rusResidenceRequired:   ipotekaSetup.rusResidenceRequired,
                    payment:        ipotekaSetup.payment,
                    prePayment:     ipotekaSetup.prePayment
                });
                ipoteka.save(function(err) {
                    if (err) throw err;
                });
            }
        }
    ], callback);
};

function IpotekaError(message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, IpotekaError);

    this.message = message;
}
util.inherits(IpotekaError, Error);

IpotekaError.prototype.name = 'IpotekaError';

exports.IpotekaError = IpotekaError;


exports.Ipoteka = mongoose.model('Ipoteka', schema);
