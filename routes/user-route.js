var User = require('../models/user-model').User;
var AuthError = require('../models/user-model').AuthError;
var async = require('async');
var path = require('path');
var util = require('util');
var fs = require('fs');

exports.create = function (req, res, next) {

};

exports.getOne = function (req, res, next) {

    async.waterfall([
        function (callback) {
            User.findOne({username: req.params.username}, function (err, user) {
                if (err) throw new Error;
                //console.log(user);
                callback(null, user);
            });
        }
    ],
    function (err,user) {
    if (err) {
        console.log('Произошла ошибка');
        res.redirect('/');
    } else {
        res.writeHead(200, {"Content-Type": "application/json"});
        var json = JSON.stringify({
            user: user
        });
        res.end(json);
    }}
    );


};





