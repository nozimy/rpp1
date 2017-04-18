var async = require('async');
var util = require('util');

var mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    bank_num: {
        type: Number,
        unique: true,
        required: true
    },
    region_num: { type: Number, required: true },// id Региона
    shortName:{type: String},
    fullName:{type: String, required: true}
    });



schema.statics.createNew = function(bankSetup, callback) {
    var Bank = this;

    async.waterfall([
        function(callback) {
            Bank.findOne({bank_num: bankSetup.bank_num}, callback); // Проверим существует ли уже такая запись
            //callback(null, bank);
        },
        function(bank, callback) {
            if (bank) {
                // Если такая запись уже существует
                callback(new BankError("Такая запись со схожим bank_num уже существует в базе данных"));
            } else {
                // Если такой записи еще нет в базе
                var bank = new Bank({
                    bank_num: bankSetup.bank_num,
                    region_num: bankSetup.region_num,
                    shortName: bankSetup.shortName,
                    fullName: bankSetup.fullName
                });
                bank.save(function(err) {
                    if (err) throw err;
                    // return bank;
                });
                callback(null, bank);
            }
        }
    ], callback);
};

function BankError(message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, BankError);

    this.message = message;
}
util.inherits(BankError, Error);

BankError.prototype.name = 'BankError';

exports.BankError = BankError;

exports.Bank = mongoose.model('Bank', schema);