'use strict';
var mongoose = require('mongoose');
var config = require('../config');

mongoose.Promise = global.Promise;

mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options'))
    .catch(err => { // mongoose connection error will be handled here
        console.error('Connecting to MongoDB error:', err.stack);
        process.exit(1);
});


module.exports = mongoose;