var express             = require('express');
var router              = express.Router();
var log                 = require('./../../lib/log')(module);
var Ipoteka             = require('../../models/ipoteka-model').Ipoteka;
var IpotekaError        = require('../../models/ipoteka-model').IpotekaError;
var async               = require('async');

router.get('/', function(req, res, next){getLimit(req, res, next)});
router.get('/search', function(req, res, next){getByParam(req, res, next)});
//router.get('/ipoteki_info', function(req, res, next){getInfo(req, res, next)});

router.get('/:ipoteka_num', function(req, res, next){getOne(req, res, next)});
//router.get('/query', function(req, res, next){getIpotekiByParam(req, res, next)});
router.post('/', function(req, res, next){postIpoteka(req, res, next)});
router.delete('/:ipoteka_num', function(req, res, next){deleteIpoteka(req, res, next)});
router.put('/', function(req, res, next){putIpoteka(req, res, next)});

function getLimit(req, res, next) {
    console.log("begin   IPOTEKI function getLimit(req, res, next)");
    async.waterfall([
        function (callback) {
            Ipoteka.find({})
            .limit(req.params.limit)
            //.select({_id:1, ...})
            .exec( function (err, ipoteki) {
                if (err) throw new Error;
                console.log(ipoteki);
                callback(null, ipoteki);
            });
        }
    ],
    function (err,ipoteki) {
    if (err) {
        console.log('Произошла ошибка при выборки данных Ipoteka');
        res.redirect('/');
    } else {
        
        res.writeHead(200, {"Content-Type": "application/json"});
        var json = JSON.stringify(
            {data: ipoteki}
            
        );
        res.end(json);
    }}
    );
};

function getByParam(req, res, next) {
    console.log("begin   IPOTEKI function getLimit(req, res, next)");
    async.waterfall([
        function (callback) {
            var q_obj = {};
                req.query.bank_num              ? q_obj.bank_num =       req.query.bank_num : '';
                req.query.region_num            ? q_obj.region_num =     req.query.region_num  : '';
                req.query.aim                   ? q_obj.aim =            req.query.aim  : '';
                req.query.houseMarket           ? q_obj.houseMarket =    req.query.houseMarket  : '';
                
                req.query.buildingIsAccredited  ? q_obj.buildingIsAccredited = req.query.buildingIsAccredited : '';
                req.query.currency              ? q_obj.currency =       req.query.currency : '';
                req.query.creditRate            ? q_obj.creditRateFrom = { $lte: req.query.creditRate } : '';
                req.query.creditRate            ? q_obj.creditRateTo =   { $gte: req.query.creditRate } : '';
                req.query.creditSecurity        ? q_obj.creditSecurity = req.query.creditSecurity : '';
                req.query.creditTermFrom        ? q_obj.creditTermFrom =  { $lte: req.query.creditTermFrom } : '';
                req.query.creditTermTo          ? q_obj.creditTermTo =    { $gte: req.query.creditTermTo } : '';
                req.query.creditAmount          ? q_obj.creditAmountFrom =    { $lte: req.query.creditAmount } : '';
                req.query.creditAmount          ? q_obj.creditAmountTo =      { $gte: req.query.creditAmount } : '';
                req.query.downPayment           ? q_obj.downPayment =         { $lte: req.query.downPayment } : '';
                req.query.incomeCheck           ? q_obj.incomeCheck =         req.query.incomeCheck : '';
                req.query.periodOfExam          ? q_obj.periodOfExam =        { $lte:  req.query.periodOfExam } : '';
                req.query.borrowerAge           ? q_obj.borrowerAgeFrom =     { $lte: req.query.borrowerAge } : '';
                req.query.borrowerAge           ? q_obj.borrowerAgeTo =       { $gte: req.query.borrowerAge } : '';
                req.query.registrationIsRequired ? q_obj.registrationIsRequired =  req.query.registrationIsRequired : '';
                req.query.rusResidenceRequired   ? q_obj.rusResidenceRequired =    req.query.rusResidenceRequired : '';
                req.query.payment               ? q_obj.payment =         req.query.payment : '';
                req.query.prePayment            ? q_obj.prePayment =      { $gte: req.query.prePayment } : '';
                
                console.log(q_obj);
                /////////////////
                // bank_num:       req.query.bank_num,
                // region_num:     req.query.region_num,
                // aim:            req.query.aim,
                // houseMarket:    req.query.houseMarket,
                // buildingIsAccredited: req.query.buildingIsAccredited,
                // currency:       req.query.currency,
                // creditRateFrom: { $lte: req.query.creditRate },
                // creditRateTo:   { $gte: req.query.creditRate },
                // creditSecurity: req.query.creditSecurity,
                // creditTermFrom: { $lte: req.query.creditTermFrom },
                // creditTermTo:   { $gte: req.query.creditTermTo },
                // creditAmountFrom:   { $lte: req.query.creditAmount },
                // creditAmountTo:     { $gte: req.query.creditAmount },
                // downPayment:        { $lte: req.query.downPayment },
                // incomeCheck:        req.query.incomeCheck,
                // periodOfExam:       { $lte:  req.query.periodOfExam },
                // borrowerAgeFrom:    { $lte: req.query.borrowerAge },
                // borrowerAgeTo:      { $gte: req.query.borrowerAge },
                // registrationIsRequired: req.query.registrationIsRequired,
                // rusResidenceRequired:   req.query.rusResidenceRequired,
                // payment:        req.query.payment,
                // prePayment:     { $gte: req.query.prePayment }
                /////////////////
            
            Ipoteka.find(q_obj)
            //.limit(req.params.limit)
            //.select({_id:1, ...})
            .exec( function (err, ipoteki) {
                if (err) throw new Error;
                console.log(ipoteki);
                callback(null, ipoteki);
            });
        }
    ],
    function (err,ipoteki) {
    if (err) {
        console.log('Произошла ошибка при выборки данных Ipoteka');
        res.redirect('/');
    } else {
        
        res.writeHead(200, {"Content-Type": "application/json"});
        var json = JSON.stringify(
            {data: ipoteki}
            
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
    
    console.log("IPOTEKI begin   function postIpoteka(req, res, next)");
    
    if (req.body){
        
        Ipoteka.createNew(req.body, function ( err, resultIpoteka ) {
        
        
            
            if (!err) {
                console.log("begin   if (!err) {}");
                log.info("ipoteka created");
                var ipotekaJSON = JSON.stringify({
                    data: resultIpoteka
                });
                return res.end(ipotekaJSON);
                
            } else {
                console.log("begin   if (!err) {}  } ELSE {");
                console.log(err);
                if(err.name == 'ValidationError') {
                    console.log("IPOTEKI begin   if(err.name == 'ValidationError')");
                    res.statusCode = 400;
                    res.send({ error: 'Validation error' });
                }if(err == IpotekaError) {
                    console.log("IPOTEKI begin   if(err == IpotekaError)");
                    res.statusCode = 400;
                    res.send({ error: 'Record with the same ipoteka_num is already existed in database'});
                } 
                // else {
                //     console.log("IPOTEKI begin   res.statusCode = 500; res.send({ error: 'Server error' });");
                //     res.statusCode = 500;
                //     res.send({ error: 'Server error' });
                //     // log.error('Internal error(%d): %s',res.statusCode,err.message);
                // }
                
            }
        });
    }
}

function deleteIpoteka(req, res, next){
    res.send('This is not implemented now');
}

function putIpoteka(req, res, next){
    res.send('This is not implemented now');
}

module.exports = router;
