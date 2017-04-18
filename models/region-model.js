var async = require('async');
var util = require('util');

var mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    region_num: {
        type: Number,
        unique: true,
        required: true
    },
    name:{type: String, required: true},
    region_center: {type: String},
    okrug: {type: String}
});

schema.statics.createNew = function(regionSetup, callback) {
    var Region = this;

    async.waterfall([
        function(callback) {
            Region.findOne({region_num: regionSetup.region_num}, callback); // Проверим существует ли уже такая запись
        },
        function(region, callback) {
            if (region) {
                // Если такая запись уже существует
                callback(new RegionError("Такая запись уже существует"));
            } else {
                // Если такой записи еще нет в базе
                var region = new Region({
                    region_num: regionSetup.region_num,
                    name: regionSetup.name,
                    region_center: regionSetup.region_center || '',
                    okrug: regionSetup.okrug || ''
                });
                region.save(function(err) {
                    if (err) throw err;
                });
            }
        }
    ], callback);
};

exports.Region = mongoose.model('Region', schema);

function RegionError(message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, RegionError);

    this.message = message;
}
util.inherits(RegionError, Error);

RegionError.prototype.name = 'RegionError';

exports.RegionError = RegionError;
