var express = require('express');
var router = express.Router();

var Region = require('../../models/region-model').Region;
var async = require('async');


//router.get('/user/:username', require('./user-route').getOne);
router.use('/users', require('./users-route'));
router.use('/banks', require('./banks-route'));
router.use('/ipoteka', require('./ipoteka-route'));
router.get('/regions', function(req, res, next){
    async.waterfall([
        function (callback) {
            var query = Region.find({});
            query.select('region_num region_center');
            query.sort({region_center: 1});
            //{region_num:1, region_center:1, name:0, okrug:0},
            query.exec(function (err, regions) {
                if (err) throw new Error;
                //console.log(regions);
                callback(null, regions);
            });
        }
    ],
    function (err,regions) {
    if (err) {
        console.log('Произошла ошибка при выборки данных Regions');
        res.redirect('/');
    } else {
        
        res.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});
        var json = JSON.stringify(
            {data: regions}
            
        );
        res.end(json);
    }}
    );
});


module.exports = router;
