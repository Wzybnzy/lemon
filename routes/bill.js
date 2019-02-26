var express = require('express');
var router = express.Router();
var billApi = require('./billApi/index.js');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

//添加账单
router.post('/addbill', billApi.addBill);

//查询账单
router.get('/getbill', billApi.getBill);

module.exports = router;