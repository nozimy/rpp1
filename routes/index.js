var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', require('./main').get);

router.get('/users', require('./users').get);

router.get('/err', function(req, res, next) {
//asdfa()
    throw new Error("my error /err");
});

router.get('/bootstraptheme', require('./bootstraptheme').get);
router.get('/signin', require('./signin').get);

// router.get('/', function(req, res, next) {
//   res.render('index', {title: 'Express' });
//
// });
router.get('/user/:username', require('./user-route').getOne);



module.exports = router;
