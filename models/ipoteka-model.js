var async = require('async');
var util = require('util');

var mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    ipoteka_num:            { type: Number, unique: true,required: true }, //id Ипотеки
    ipoteka_name:           { type: String, required: true}, //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    bank_num:               { type: Number, required: true }, // id Банка
    region_num:             { type: Number, required: true },// id Региона
    aim:                    { type: [String]},// Цель кредитования. //Массив!
    houseMarket:            { type: String }, // рынок недвижимости
    buildingIsAccredited:   {type: String}, // новостройка аккредитована или не аккредитовано банком

    currency:           { type: String}, //•	валюта кредита (RUR, USD, EUR);
    creditRateFrom:     { type: Number, min: 0, max: 100  }, // •	ставка кредита % // от - до%
    creditRateTo:       { type: Number, min: 0, max: 100  },
    creditSecurity:     { type: String, trim: true }, //•	обеспечение кредита
    creditTermFrom:     { type: Number, min: 1, max: 100 }, //•	срок кредита (лет)
    creditTermTo:       { type: Number, min: 1, max: 100 }, //•	срок кредита (лет)
    creditAmountFrom:   { type: Number },
    creditAmountTo:     { type: Number },//•	размер кредита {major: 1, minor:  222, currency: 'RUR'} = 1.222 RUR // от - до (ден. ед.)
    downPayment:        { type: Number, min: 0, max: 100 }, //•	первоначальный взнос %
    incomeCheck:        { type: [String], trim: true }, //•	подтверждение дохода //Массив !!
    periodOfExam:       { type: Number }, //•	срок рассмотрения заявки

    borrowerAgeFrom:            { type: Number, min: 18, max: 100  }, //•	возраст заемщика от - до
    borrowerAgeTo:              { type: Number, min: 18, max: 100  },
    registrationIsRequired:     { type: String }, //•	регистрация по месту получения кредита
    rusResidenceRequired:       { type: String }, //•	гражданство РФ (требуется или нет);
    payment:                    { type: String },  //•	платежи
    prePayment:                 { type: Number }, //•	досрочное погашение без санкция после указанных месяцев.
    updated:                    { type: Date,  default: Date.now}
});


schema.statics.createNew = function(ipotekaSetup, callback) {
    var Ipoteka = this;
    
    console.log("IPOTEKA schema.statics.createNew BEGIN");

    async.waterfall([
        function(callback) {
        //     Ipoteka.findOne({"ipoteka_num": ipotekaSetup.ipoteka_num}, callback); // Проверим существует ли уже такая запись
                //var countOfCollections;
                Ipoteka.count({}, function(err, c){
                    if (err) {
                        //console.log('Error during counting collections in Ipoteka document');
                        callback(new IpotekaError("Error during counting collections in Ipoteka document"));
                    } else {
                        //countOfCollections = c;
                        console.log(c);
                        callback(null, c);
                    }
                });
         },
        function(countOfCollections, callback) { //ipoteka, 
            if (countOfCollections === null) {
                
                // Если такая запись уже существует
                //callback(new IpotekaError("Такая запись  со схожим ipoteka_num уже существует"));
                callback(new IpotekaError("Error during counting collections in Ipoteka Document"));
            } else {
                
                // Если такой записи еще нет в базе
                var ipoteka = new Ipoteka({
                    ipoteka_num:    1 + countOfCollections,
                    ipoteka_name:   ipotekaSetup.ipoteka_name,
                    
                    bank_num:       ipotekaSetup.bank_num,
                    region_num:     ipotekaSetup.region_num,
                    aim:            ipotekaSetup.aim,
                    houseMarket:    ipotekaSetup.houseMarket,
                    buildingIsAccredited:   ipotekaSetup.buildingIsAccredited,
                    currency:       ipotekaSetup.currency,
                    creditRateFrom:     ipotekaSetup.creditRateFrom,
                    creditRateTo:     ipotekaSetup.creditRateTo,
                    
                    creditSecurity:     ipotekaSetup.creditSecurity,
                    creditTermFrom:     ipotekaSetup.creditTermFrom,
                    creditTermTo:       ipotekaSetup.creditTermTo,
                    creditAmountFrom:   ipotekaSetup.creditAmountFrom,
                    creditAmountTo:   ipotekaSetup.creditAmountTo,
                    
                    downPayment:    ipotekaSetup.downPayment,
                    incomeCheck:    ipotekaSetup.incomeCheck,
                    periodOfExam:   ipotekaSetup.periodOfExam,
                    borrowerAgeFrom:    ipotekaSetup.borrowerAgeFrom,
                    borrowerAgeTo:    ipotekaSetup.borrowerAgeTo,
                    
                    registrationIsRequired: ipotekaSetup.registrationIsRequired,
                    rusResidenceRequired:   ipotekaSetup.rusResidenceRequired,
                    payment:        ipotekaSetup.payment,
                    prePayment:     ipotekaSetup.prePayment,
                    
                    updated: new Date
                });
                ipoteka.save(function(err) {
                    if (err) throw err;
                });
                console.log("IPOTEKA schema.statics.createNew END");
                callback(null, ipoteka);
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
