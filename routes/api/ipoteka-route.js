var express = require('express');
var router = express.Router();
var Ipoteka = require('../../models/ipoteka-model').Ipoteka;
var IpotekaError = require('../../models/ipoteka-model').IpotekaError;
var async = require('async');

router.get('/', function(req, res, next){getLimit(req, res, next)});
router.get('/:ipoteka_num', function(req, res, next){getOne(req, res, next)});
router.post('/', function(req, res, next){postIpoteka(req, res, next)});
router.delete('/', function(req, res, next){deleteIpoteka(req, res, next)});
router.put('/', function(req, res, next){putIpoteka(req, res, next)});

function getLimit(req, res, next) {
    async.waterfall([
        function (callback) {
            Ipoteka.find({})
            .limit(req.params.limit)
            //.select({_id:1, bank_num:1, region_num:1, shortName:1, fullName:1})
            .exec( function (err, ipoteka) {
                if (err) throw new Error;
                console.log(ipoteka);
                callback(null, ipoteka);
            });
        }
    ],
    function (err,ipoteka) {
    if (err) {
        console.log('Произошла ошибка при выборки данных Ipoteka');
        res.redirect('/');
    } else {
        
        res.writeHead(200, {"Content-Type": "application/json"});
        var json = JSON.stringify(
            {data: ipoteka}
            
        );
        res.end(json);
    }}
    );
};

function getOne(req, res, next) {

    async.waterfall([
        function (callback) {
            Ipoteka.findOne({ipoteka_num: req.params.ipoteka_num}, function (err, ipoteka) {
                if (err) throw new Error;
                //console.log(user);
                callback(null, ipoteka);
            });
        }
    ],
    function (err,ipoteka) {
    if (err) {
        console.log('Произошла ошибка');
        res.redirect('/');
    } else {
        //res.writeHead(200, {"Content-Type": "application/json"});
        var json = JSON.stringify({
            data: ipoteka
        });
        res.end(json);
    }}
    );


};
function postIpoteka(req, res, next){
    res.send('This is not implemented now');
}
function deleteIpoteka(req, res, next){
    res.send('This is not implemented now');
}
function putIpoteka(req, res, next){
    res.send('This is not implemented now');
}

module.exports = router;
