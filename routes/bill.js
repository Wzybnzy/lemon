var express = require('express');
var router = express.Router();
var billApi = require('./billApi/index.js');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/addbill', billApi.addBill);


module.exports = router;