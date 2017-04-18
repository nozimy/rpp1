var express         = require('express');
var router          = express.Router();
var log             = require('./../../lib/log')(module);
var Bank            = require('../../models/bank-model').Bank;
var BankError       = require('../../models/bank-model').BankError;
var async           = require('async');

router.get('/', function(req, res, next){getLimit(req, res, next)});
router.get('/:bank_num', function(req, res, next){getOne(req, res, next)});
router.post('/', function(req, res, next){postBank(req, res, next)});
router.delete('/:bank_num', function(req, res, next){deleteBank(req, res, next)});
router.put('/', function(req, res, next){putBank(req, res, next)});


function getLimit(req, res, next) {
    async.waterfall([
        function (callback) {
            var findParams = {};
            if (req.query.region_num){
                findParams = {"region_num":req.query.region_num};
            }
            console.log(findParams);
            Bank.find(findParams)
            .limit(req.params.limit)
            .select({_id:1, bank_num:1, region_num:1, shortName:1, fullName:1})
            .exec( function (err, banks) {
                if (err) throw new Error;
                console.log(banks);
                callback(null, banks);
            });
        }
    ],
    function (err,banks) {
    if (err) {
        console.log('Произошла ошибка при выборки данных Banks');
        res.redirect('/');
    } else {
        
        res.writeHead(200, {"Content-Type": "application/json"});
        var json = JSON.stringify(
            {data: banks}
            
        );
        res.end(json);
    }}
    );
};


function getOne(req, res, next) {

    async.waterfall([
        function (callback) {
            Bank.findOne({bank_num: req.params.bank_num}, function (err, bank) {
                if (err) throw new Error;
                //console.log(user);
                callback(null, bank);
            });
        }
    ],
    function (err,bank) {
    if (err) {
        console.log('Произошла ошибка');
        res.redirect('/');
    } else {
        //res.writeHead(200, {"Content-Type": "application/json"});
        var json = JSON.stringify({
            data: bank
        });
        res.end(json);
    }}
    );


};

function postBank(req, res, next){
    
    if (req.body){
        //var bank = new Bank(req.body);
        Bank.createNew(req.body, function ( err, resultBank ) {
        
        //bank.save(function (err) {
            
            if (!err) {
                log.info("bank created");
                var bankJSON = JSON.stringify({
                    data: resultBank
                });
                return res.end(bankJSON);
                // return res.send({ status: 'OK', bankJSON });
            } else {
                console.log(err);
                if(err.name == 'ValidationError') {
                    res.statusCode = 400;
                    res.send({ error: 'Validation error' });
                }if(err.name == 'BankError') {
                    res.statusCode = 400;
                    res.send({ error: 'Record with the same bank_num is already existed in database'});
                } else {
                    res.statusCode = 500;
                    res.send({ error: 'Server error' });
                    log.error('Internal error(%d): %s',res.statusCode,err.message);
                }
                
            }
        });
    }
    // async.waterfall([
    //     function (callback) {
    //         Bank.findOne({bank_num: req.params.bank_num}, function (err, bank) {
    //             if (err) throw new Error;
    //             //console.log(user);
    //             callback(null, bank);
    //         });
    //     }
    // ],
    // function (err,bank) {
    // if (err) {
    //     console.log('Произошла ошибка');
    //     res.redirect('/');
    // } else {
    //     //res.writeHead(200, {"Content-Type": "application/json"});
    //     var json = JSON.stringify({
    //         bank: bank
    //     });
    //     res.end(json);
    // }}
    // );
    // console.log(req.body);
    // console.log(req.cookies);
    
    // res.json(req.body);
    // res.end(req.body);
}
function deleteBank(req, res, next){
    async.waterfall([
        function (callback) {
            Bank.findOne({"bank_num": req.params.bank_num}, function (err, bank) {
                if (err) throw new Error;
                bank.remove();
                //console.log(user);
                callback(null);
            });
        }
    ],
    function (err) {
    if (err) {
        console.log('Произошла ошибка');
        res.redirect('/');
    } else {
        //res.writeHead(200, {"Content-Type": "application/json"});
        // var json = JSON.stringify({
        //     data: bank
        // });
        res.end();
    }}
    );
}
function putBank(req, res, next){
    res.send('This is not implemented now');
}


module.exports = router;