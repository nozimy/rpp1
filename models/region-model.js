
var mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    region_num: {
        type: Number,
        unique: true,
        required: true
    },
    name:{type: String, required: true}
});

exports.Region = mongoose.model('Region', schema);
