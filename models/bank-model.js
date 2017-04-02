
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

exports.Bank = mongoose.model('Bank', schema);
