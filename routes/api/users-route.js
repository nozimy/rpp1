var express = require('express');
var router = express.Router();
var User = require('../../models/user-model').User;
var AuthError = require('../../models/user-model').AuthError;
var async = require('async');


router.get('/', function(req, res, next){getLimit(req, res, next)});
router.get('/:username', function(req, res, next){getOne(req, res, next)});

router.get('/:n/nnn/:nn/nn/:y', function(req, res) {
    res.send('This is not implemented now '+ req.params.nnn);
});

function getLimit(req, res, next) {
    async.waterfall([
        function (callback) {
            User.find({})
            .limit(req.params.limit)
            .select({_id:1, username:1, firstName:1, lastName:1, phone:1, birthDate:1, created:1})
            //.select({username:1})
            .exec( function (err, users) {
                if (err) throw new Error;
                console.log(users);
                callback(null, users);
            });
        }
    ],
    function (err,users) {
    if (err) {
        console.log('Произошла ошибка при выборки данных Users');
        res.redirect('/');
    } else {
        
        res.writeHead(200, {"Content-Type": "application/json"});
        var json = JSON.stringify(
            {data: users}
            //users
        );
        //res.writeHead('Access-Control-Allow-Origin: http://rpp-nozimy.c9users.io:8081/'); //rpp-nozimy.c9users.io
        //res.writeHead('Access-Control-Allow-Credentials: true');
        //res.writeHead('Access-Control-Expose-Headers: Header');
        
        res.end(json);
    }}
    );
};


function getOne(req, res, next) {

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
        //res.writeHead(200, {"Content-Type": "application/json"});
        var json = JSON.stringify({
            user: user
        });
        res.end(json);
    }}
    );


};
module.exports = router;

